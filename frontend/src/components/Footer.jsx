import React from 'react';
import { Leaf, Heart, ExternalLink, ShieldAlert, Cpu } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#0F381E] to-[#0A2614] text-white pt-16 pb-12 border-t border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center text-slate-950 shadow-md">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                LeafSense<span className="text-lime-400">.ai</span>
              </span>
            </div>
            
            <p className="text-sm font-medium text-emerald-200">
              Smarter Detection. Healthier Crops.
            </p>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An intelligent cotton leaf disease and distress classification system powered by fine-tuned MobileNetV2 deep learning. Engineered for reliable diagnostic decision support in modern agriculture.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-lime-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#home" className="hover:text-lime-300 transition-colors">Home</a>
              </li>
              <li>
                <a href="#detect" className="hover:text-lime-300 transition-colors">Detect Disease</a>
              </li>
              <li>
                <a href="#explore" className="hover:text-lime-300 transition-colors">Explore 7 Conditions</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-lime-300 transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#about" className="hover:text-lime-300 transition-colors">Evaluation & Architecture</a>
              </li>
            </ul>
          </div>

          {/* Tech Stack & Credits */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-lime-400">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-emerald-200 border border-white/10">MobileNetV2</span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-emerald-200 border border-white/10">TensorFlow / Keras 3</span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-emerald-200 border border-white/10">FastAPI</span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-emerald-200 border border-white/10">Uvicorn</span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-emerald-200 border border-white/10">React 19 + Vite</span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-emerald-200 border border-white/10">Tailwind CSS</span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-emerald-200 border border-white/10">Recharts</span>
            </div>
            <p className="text-[11px] text-slate-400 pt-2">
              Trained model: <code className="text-lime-300">final_cotton_disease_model.keras</code> (24.4 MB)
            </p>
          </div>

        </div>

        {/* AI Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-start gap-2 max-w-2xl text-[11px] leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Agronomic Advisory Notice:</strong> LeafSense AI is a machine learning research tool. Predictions should be evaluated alongside visual crop scouting and consultation with certified plant pathologists before chemical applications.
            </span>
          </div>

          <div className="text-[11px] text-slate-400 shrink-0 text-center md:text-right">
            &copy; {currentYear} LeafSense AI. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
