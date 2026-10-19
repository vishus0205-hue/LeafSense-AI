import io
import os
import sys
import logging
from typing import Dict, Any

from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import numpy as np
from PIL import Image

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("LeafSenseBackend")

# Model class labels in exact order (0 to 6)
CLASS_NAMES = [
    "Bacterial Blight",
    "Curl Virus",
    "Healthy Leaf",
    "Herbicide Growth Damage",
    "Leaf Hopper Jassids",
    "Leaf Redding",
    "Leaf Variegation"
]

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB
ALLOWED_MIME_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg"
}

app = FastAPI(
    title="LeafSense AI - Backend API",
    description="Intelligent cotton leaf disease classification API powered by MobileNetV2",
    version="1.0.0"
)

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for model storage and metadata
model = None
model_name = "final_cotton_disease_model.keras"
model_has_preprocessing = True
model_input_shape = None
model_output_shape = None


def find_model_path() -> str:
    """Find the path to the trained model file."""
    potential_paths = [
        os.path.join(os.path.dirname(__file__), "models", "final_cotton_disease_model.keras"),
        os.path.join(os.path.dirname(__file__), "final_cotton_disease_model.keras"),
        os.path.join(os.path.dirname(__file__), "..", "final_cotton_disease_model.keras"),
        os.path.join(os.getcwd(), "models", "final_cotton_disease_model.keras"),
        os.path.join(os.getcwd(), "backend", "models", "final_cotton_disease_model.keras"),
        os.path.join(os.getcwd(), "final_cotton_disease_model.keras")
    ]
    for p in potential_paths:
        abs_p = os.path.abspath(p)
        if os.path.isfile(abs_p):
            return abs_p
    return ""


@app.on_event("startup")
def load_disease_model():
    """Load TensorFlow Keras model once at startup and inspect architecture."""
    global model, model_has_preprocessing, model_input_shape, model_output_shape, model_name
    model_path = find_model_path()
    if not model_path:
        logger.error("Model file final_cotton_disease_model.keras not found in any search path!")
        return

    logger.info(f"Loading trained Keras model from: {model_path}")
    try:
        import tensorflow as tf
        import keras

        # Load the model without compilation for fast inference
        model = keras.models.load_model(model_path, compile=False)
        model_name = os.path.basename(model_path)
        model_input_shape = str(model.input_shape)
        model_output_shape = str(model.output_shape)
        logger.info(f"Model successfully loaded. Input shape: {model_input_shape}, Output shape: {model_output_shape}")

        # Check config layers and layer objects for preprocessing operations
        has_prep = False
        try:
            cfg = model.get_config()
            cfg_layers = [l.get("name", "").lower() for l in cfg.get("layers", [])]
            if any(term in name for name in cfg_layers for term in ["divide", "subtract", "rescaling", "preprocess", "normalization"]):
                has_prep = True
        except Exception as e:
            logger.warning(f"Could not inspect get_config(): {e}")

        if not has_prep:
            for layer in model.layers:
                layer_name = layer.name.lower()
                layer_type = layer.__class__.__name__.lower()
                if any(term in layer_name or term in layer_type for term in ["divide", "subtract", "rescaling", "preprocess", "normalization"]):
                    has_prep = True
                    break

        model_has_preprocessing = has_prep
        logger.info(f"Model internal preprocessing layers detected: {model_has_preprocessing}")

    except Exception as e:
        logger.exception(f"Failed to load Keras model: {e}")
        model = None


@app.get("/health")
def health_check() -> Dict[str, Any]:
    """Return backend server status and model loading state."""
    model_loaded = model is not None
    return {
        "status": "healthy" if model_loaded else "degraded",
        "model_loaded": model_loaded,
        "model_name": model_name if model_loaded else None,
        "input_shape": model_input_shape,
        "output_shape": model_output_shape,
        "classes_count": len(CLASS_NAMES),
        "classes": CLASS_NAMES,
        "preprocessing_internal": model_has_preprocessing
    }


def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """
    Preprocess image according to training specs:
    - RGB conversion
    - Resize to 224 x 224
    - Float32 conversion
    - Initial pixel values between 0.0 and 255.0
    - If model does NOT contain internal preprocessing, apply mobilenet_v2 preprocessing
    """
    try:
        img = Image.open(io.BytesIO(image_bytes))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid image format or corrupted file: {str(e)}"
        )

    # Convert to RGB (handles RGBA, Grayscale, CMYK, etc.)
    if img.mode != "RGB":
        img = img.convert("RGB")

    # Resize to 224x224 using Bilinear filter
    img = img.resize((224, 224), Image.Resampling.BILINEAR)

    # Convert to float32 numpy array [0.0, 255.0]
    img_array = np.array(img, dtype=np.float32)

    # If preprocessing is NOT included inside the model, scale to [-1, 1]
    if not model_has_preprocessing:
        img_array = (img_array / 127.5) - 1.0

    # Expand dims for batch: (1, 224, 224, 3)
    img_batch = np.expand_dims(img_array, axis=0)
    return img_batch


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Accept an uploaded cotton leaf image and return classification results.
    """
    global model
    if model is None:
        load_disease_model()
        if model is None:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Trained model is not available or failed to load. Please verify backend/models/final_cotton_disease_model.keras"
            )

    # Validate file type
    content_type = file.content_type or ""
    filename = (file.filename or "").lower()
    valid_ext = filename.endswith((".jpg", ".jpeg", ".png", ".webp"))
    if content_type not in ALLOWED_MIME_TYPES and not valid_ext:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file type '{content_type}'. Please upload a JPG, JPEG, PNG, or WebP image."
        )

    # Read image contents
    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty."
        )

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File size exceeds maximum allowed limit of 10 MB ({len(contents)} bytes received)."
        )

    # Preprocess image
    img_tensor = preprocess_image(contents)

    # Run actual model inference
    try:
        raw_predictions = model.predict(img_tensor, verbose=0)
        
        # Squeeze batch dimension
        prob_vector = raw_predictions[0]

        # Apply softmax if model outputs raw logits (sum doesn't equal ~1.0)
        prob_sum = float(np.sum(prob_vector))
        if prob_sum < 0.98 or prob_sum > 1.02 or np.any(prob_vector < 0):
            exp_preds = np.exp(prob_vector - np.max(prob_vector))
            prob_vector = exp_preds / np.sum(exp_preds)

        # Find top predicted class
        top_idx = int(np.argmax(prob_vector))
        predicted_class = CLASS_NAMES[top_idx]
        confidence = float(prob_vector[top_idx])

        # Build probabilities dictionary with all 7 classes
        probabilities_dict = {}
        for idx, class_name in enumerate(CLASS_NAMES):
            probabilities_dict[class_name] = round(float(prob_vector[idx]), 4)

        confidence = round(confidence, 4)

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "predicted_class": predicted_class,
                "confidence": confidence,
                "probabilities": probabilities_dict
            }
        )

    except Exception as e:
        logger.exception("Error during model inference")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error executing model inference: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=False)
