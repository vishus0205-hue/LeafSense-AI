# LeafSense AI 🌿

> **Smarter Detection. Healthier Crops.**

An intelligent, full-stack cotton leaf disease classification platform powered by a fine-tuned **MobileNetV2** deep learning architecture and a high-performance **FastAPI** backend with a modern **React + Vite + Tailwind CSS** interface.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Model Architecture & Preprocessing](#model-architecture--preprocessing)
- [Experimental Evaluation Metrics](#experimental-evaluation-metrics)
- [Cotton Leaf Conditions (7 Classes)](#cotton-leaf-conditions-7-classes)
- [Technology Stack](#technology-stack)
- [Project Directory Structure](#project-directory-structure)
- [API Documentation](#api-documentation)
- [Local Setup & Running Instructions](#local-setup--running-instructions)
- [Troubleshooting & FAQ](#troubleshooting--faq)
- [Agronomic Limitations & Disclaimer](#agronomic-limitations--disclaimer)

---

## 🌟 Overview

Cotton (*Gossypium hirsutum*) is a vital global commercial crop vulnerable to debilitating foliar pathogens, sap-sucking insect pests, and nutrient imbalances. Accurate, early identification in the field is critical for targeted interventions.

**LeafSense AI** bridges the gap between machine learning computer vision and precision agriculture:
- **Instant Diagnostics:** Classifies uploaded cotton leaf images within milliseconds.
- **Multi-Class Probabilities:** Visualizes exact Softmax output distribution across 7 distinct cotton conditions using interactive charts.
- **Agronomic Guidance:** Distinguishes between bacterial blights, viral vectors, sap-sucking pests (Jassids), chemical herbicide burns, and nutrient deficiencies.
- **Healthy Crop Detection:** Specifically celebrates healthy foliage with positive maintenance recommendations rather than disease alerts.

---

## 🚀 Key Features

- **Modern Glassmorphic UI:** Built with Tailwind CSS, subtle mesh gradients, and rich forest-green palettes (`#14532D`, `#16A34A`, `#84CC16`).
- **Interactive Drag & Drop:** Upload JPG, JPEG, PNG, or WebP leaf photos up to 10 MB with instant client-side preview, file validation, and change/remove options.
- **Real-Time Model Health Indicator:** Live polling of backend service and model readiness directly in the navigation bar.
- **Visual Probability Dashboard:** Powered by Recharts, showing confidence percentages, severity indicators, visible symptoms, and actionable management strategies.
- **Cotton Condition Explorer:** Searchable and filterable reference encyclopedia covering all 7 trained conditions.
- **Mobile Responsive:** Full support for desktop, tablet, and smartphone screens with responsive navigation drawers.

---

## 🧠 Model Architecture & Preprocessing

- **Base Network:** MobileNetV2 (Alpha 1.0) with depthwise separable convolutions and inverted residual bottlenecks.
- **Input Resolution:** `224 × 224 × 3` (RGB).
- **Output:** 7-neuron dense output layer with Softmax activation function.
- **Internal Preprocessing Pipeline:**
  1. Image decoded and standardized to 3-channel RGB.
  2. High-order bilinear resampling to 224 × 224 pixels.
  3. Float32 tensor conversion in the `[0.0, 255.0]` range.
  4. Internal model layers (`true_divide` and `subtract`) automatically map values to the MobileNetV2 `[-1.0, 1.0]` standard.

---

## 📊 Experimental Evaluation Metrics

Recorded empirical performance on curated cotton leaf datasets:

| Metric | Score | Details |
| :--- | :--- | :--- |
| **Validation Accuracy** | **95.33%** | Peak validation epoch score |
| **Test Accuracy** | **94.70%** | Unseen holdout test evaluation |
| **Macro F1-Score** | **94.10%** | Balanced harmonic mean across classes |
| **Test Predictions** | **304 / 321** | Correct classifications on unseen test set |
| **Dataset Size** | **2,137** | Original augmented field images |
| **Condition Classes** | **7** | Discrete agricultural classification categories |

> *Note: These are recorded experimental research metrics, not an absolute guarantee of real-world field accuracy under extreme lighting or sensor noise.*

---

## 🏷️ Cotton Leaf Conditions (7 Classes)

Exact class index order (0 to 6):

| Index | Category Name | Classification Type | Primary Cause / Pathogen |
| :---: | :--- | :--- | :--- |
| **0** | **Bacterial Blight** | Bacterial Disease | *Xanthomonas citri pv. malvacearum* |
| **1** | **Curl Virus** | Viral Disease | *Cotton Leaf Curl Virus (CLCuV)* / Whitefly vector |
| **2** | **Healthy Leaf** | Optimal Foliage | No pathogen present |
| **3** | **Herbicide Growth Damage** | Chemical Injury | Accidental spray drift or 2,4-D / glyphosate residue |
| **4** | **Leaf Hopper Jassids** | Insect Pest | *Amrasca biguttula biguttula* (Hopperburn) |
| **5** | **Leaf Redding** | Abiotic Disorder | Magnesium deficiency / sudden low night temperature |
| **6** | **Leaf Variegation** | Genetic / Abiotic | Somatic chimera or localized chlorophyll anomaly |

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS (v4) with curated agricultural HSL tokens
- **Icons:** Lucide React
- **Animations:** Framer Motion & CSS keyframe transitions
- **Data Visualization:** Recharts
- **Networking:** Native Fetch API with Vite reverse proxy

### Backend
- **Framework:** FastAPI
- **ASGI Server:** Uvicorn
- **Deep Learning:** TensorFlow 2.21 + Keras 3.15
- **Image Processing:** Pillow (PIL) + NumPy
- **Form Handling:** python-multipart
- **Model Format:** Keras 3 Native Archive (`.keras`)

---

## 📁 Project Directory Structure

```text
Cotton Disease Detection/
├── final_cotton_disease_model.keras    # Trained MobileNetV2 model artifact (root backup)
├── .gitignore                          # Standard project gitignore
├── README.md                           # Documentation & guides
│
├── backend/
│   ├── models/
│   │   └── final_cotton_disease_model.keras  # Loaded model file
│   ├── main.py                         # FastAPI endpoints, preprocessing & inference logic
│   ├── requirements.txt                # Python backend dependencies
│   ├── .env.example                    # Environment variable configuration template
│   └── venv/                           # Python isolated virtual environment
│
└── frontend/
    ├── index.html                      # HTML5 entry with Plus Jakarta Sans & Outfit fonts
    ├── package.json                    # Node dependencies and build scripts
    ├── vite.config.js                  # Vite configuration & backend proxy (/api -> :8000)
    └── src/
        ├── App.jsx                     # Top-level application layout & health polling
        ├── main.jsx                    # React DOM root entry
        ├── index.css                   # Tailwind CSS styling, utilities & scrollbars
        ├── data/
        │   └── diseasesData.js         # Comprehensive 7-disease profiles, symptoms & management
        ├── components/
        │   ├── Navbar.jsx              # Responsive header with live model status badge
        │   ├── PredictionDashboard.jsx # Recharts probability distribution, metrics & guidance
        │   └── Footer.jsx              # Forest-green footer with credits & agronomic disclaimer
        └── sections/
            ├── HeroSection.jsx         # Hero showcase with metrics & call-to-actions
            ├── DetectionSection.jsx    # Drag-and-drop file upload & inference runner
            ├── ExploreSection.jsx      # Filterable & searchable 7-condition cards
            ├── HowItWorksSection.jsx   # 4-step workflow pipeline
            └── AboutSection.jsx        # Model evaluation metrics & architecture details
```

---

## 📡 API Documentation

### 1. `GET /health`
Returns backend health status, loaded model name, tensor shapes, and category mappings.

**Example Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "model_name": "final_cotton_disease_model.keras",
  "input_shape": "(None, 224, 224, 3)",
  "output_shape": "(None, 7)",
  "classes_count": 7,
  "classes": [
    "Bacterial Blight",
    "Curl Virus",
    "Healthy Leaf",
    "Herbicide Growth Damage",
    "Leaf Hopper Jassids",
    "Leaf Redding",
    "Leaf Variegation"
  ],
  "preprocessing_internal": true
}
```

### 2. `POST /predict`
Accepts a cotton leaf photograph as `multipart/form-data` with field name `file`.

**Request Validation:**
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
- Max file size: `10 MB`
- Automatically validates image decoding with Pillow and converts to 224 × 224 RGB.

**Example Response:**
```json
{
  "predicted_class": "Healthy Leaf",
  "confidence": 0.9520,
  "probabilities": {
    "Bacterial Blight": 0.0078,
    "Curl Virus": 0.0054,
    "Healthy Leaf": 0.9520,
    "Herbicide Growth Damage": 0.0121,
    "Leaf Hopper Jassids": 0.0115,
    "Leaf Redding": 0.0062,
    "Leaf Variegation": 0.0050
  }
}
```

---

## 💻 Local Setup & Running Instructions

### Prerequisites
- Python 3.10 – 3.13
- Node.js 18+ and npm

### 1. Backend Setup & Run
From the project workspace root:
```powershell
# Navigate to backend directory
cd backend

# Create virtual environment (if not already created)
python -m venv venv

# Activate virtual environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Windows Command Prompt:
.\venv\Scripts\activate.bat

# Install requirements
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --host 127.0.0.1 --port 8000
```
The backend API is now live at: `http://127.0.0.1:8000` (Interactive Swagger Docs at `http://127.0.0.1:8000/docs`).

### 2. Frontend Setup & Run
In a new terminal window:
```powershell
# Navigate to frontend directory
cd frontend

# Install node dependencies
npm install

# Start development server
npm run dev
```
The frontend is now live at: `http://127.0.0.1:5173`.

### 3. Production Build Validation
To verify production bundle build:
```powershell
cd frontend
npm run build
```

---

## ❓ Troubleshooting & FAQ

1. **Model file missing?**
   - Ensure `final_cotton_disease_model.keras` is placed in `backend/models/final_cotton_disease_model.keras`.
2. **CORS Errors?**
   - Ensure you access the frontend at `http://localhost:5173` or `http://127.0.0.1:5173`. The backend is preconfigured to permit these origins.
3. **Internal Preprocessing?**
   - The model contains internal `true_divide` and `subtract` operations. Do not apply external normalization; the backend passes `[0, 255]` float32 tensors directly to avoid double scaling.

---

## ⚠️ Agronomic Limitations & Disclaimer

**LeafSense AI is an artificial intelligence decision-support tool, not an accredited agronomic laboratory.**
- Machine learning models operate via statistical pattern matching on 2D digital imagery.
- Factors such as sensor glare, heavy shadows, leaf wetness, or multiple concurrent conditions can influence prediction certainty.
- Always cross-reference AI findings with on-site visual crop scouting and certified local agricultural extension specialists before undertaking expensive chemical applications.
