import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  AlertCircle, 
  X, 
  Sparkles, 
  Loader2, 
  FileUp, 
  Check, 
  HelpCircle,
  Camera,
  RefreshCw
} from 'lucide-react';
import PredictionDashboard from '../components/PredictionDashboard';

const MAX_SIZE_MB = 10;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

export default function DetectionSection({ backendStatus }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileValidation = (file) => {
    setErrorMessage(null);
    if (!file) return false;

    // Check mime type or extension
    const extension = file.name.split('.').pop().toLowerCase();
    const validExt = ['jpg', 'jpeg', 'png', 'webp'].includes(extension);

    if (!ALLOWED_TYPES.includes(file.type) && !validExt) {
      setErrorMessage(`Unsupported file format. Please upload JPG, JPEG, PNG, or WebP.`);
      return false;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setErrorMessage(`File size exceeds ${MAX_SIZE_MB}MB limit. (${(file.size / (1024 * 1024)).toFixed(1)}MB)`);
      return false;
    }

    return true;
  };

  const processFile = (file) => {
    if (handleFileValidation(file)) {
      setSelectedFile(file);
      setPredictionResult(null);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleClearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setPredictionResult(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDetectDisease = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select or drop a cotton leaf image first.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // First try proxy /api/predict then direct localhost:8000/predict
      let response;
      try {
        response = await fetch('/api/predict', {
          method: 'POST',
          body: formData,
        });
      } catch (err) {
        // Fallback directly to localhost:8000 if vite proxy had an issue
        response = await fetch('http://127.0.0.1:8000/predict', {
          method: 'POST',
          body: formData,
        });
      }

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || `Server returned error status ${response.status}`);
      }

      const data = await response.json();
      setPredictionResult(data);
    } catch (err) {
      console.error('Detection request failed:', err);
      setErrorMessage(
        err.message || 'Unable to connect to AI server. Please verify backend is running on port 8000.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="detect" className="py-20 md:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#14532D] border border-emerald-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>AI Diagnostic Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14532D] tracking-tight">
            Detect Cotton Leaf Disease
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Upload a clear, focused photograph of a cotton leaf. Our fine-tuned MobileNetV2 model will evaluate patterns to deliver an instant diagnostic report.
          </p>
        </div>

        {/* Backend Degraded / Offline Notice if applicable */}
        {backendStatus === 'degraded' && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-amber-900 text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                Backend server is reachable, but the trained Keras model is still initializing or reloading.
              </span>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="text-xs font-bold text-amber-700 underline ml-2"
            >
              Refresh
            </button>
          </div>
        )}

        {/* Error Banner */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start justify-between text-rose-900 text-sm animate-in fade-in">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Error:</span> {errorMessage}
              </div>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="p-1 hover:bg-rose-100 rounded-lg text-rose-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Conditional Rendering: Show Prediction Result or Upload Box */}
        {predictionResult ? (
          <PredictionDashboard
            result={predictionResult}
            imagePreview={previewUrl}
            onReset={handleClearImage}
          />
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-950/10 shadow-xl shadow-emerald-950/5">
            
            {/* Hidden native input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              className="hidden"
              onChange={handleInputChange}
            />

            {!previewUrl ? (
              /* Dropzone empty state */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? 'border-[#16A34A] bg-emerald-50/70 scale-[0.99]'
                    : 'border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/30'
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-100 flex items-center justify-center text-[#14532D]">
                  <Upload className="w-8 h-8 text-[#16A34A]" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  Drag and drop your cotton leaf image here
                </h3>
                <p className="text-sm text-slate-500 mt-1.5">
                  or click to browse from your device
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium text-slate-600">
                    JPG, JPEG, PNG, WebP
                  </span>
                  <span>•</span>
                  <span>Max file size: 10 MB</span>
                  <span>•</span>
                  <span>RGB 224 × 224 Auto-Resize</span>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-[#14532D] hover:bg-[#114324] shadow-sm transition-all"
                  >
                    <FileUp className="w-4 h-4" />
                    <span>Browse Files</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Selected Image Preview State */
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="relative w-44 h-44 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                    <img
                      src={previewUrl}
                      alt="Selected Leaf Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 w-full flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Image Ready
                        </span>
                        <button
                          onClick={handleClearImage}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Remove image"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <h4 className="text-base font-bold text-slate-800 mt-2 truncate">
                        {selectedFile?.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Size: {(selectedFile?.size / 1024).toFixed(1)} KB • Type: {selectedFile?.type}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs font-semibold text-[#14532D] hover:underline flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" /> Change Image
                      </button>
                      <span className="text-slate-300">•</span>
                      <button
                        onClick={handleClearImage}
                        className="text-xs font-semibold text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Detect Disease Action Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Inference runs locally using trained MobileNetV2</span>
                  </div>

                  <button
                    onClick={handleDetectDisease}
                    disabled={isLoading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#14532D] via-[#16A34A] to-[#15803D] hover:shadow-lg hover:shadow-emerald-900/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Analyzing Leaf Features...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 text-lime-300" />
                        <span>Detect Disease</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Quick Helper Tips */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-500">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">1</span>
                <span>Photograph a single cotton leaf in bright, natural daylight.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">2</span>
                <span>Keep the leaf flat and focused to capture veins and spots.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">3</span>
                <span>Avoid extreme shadows, severe motion blur, or heavy glare.</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
