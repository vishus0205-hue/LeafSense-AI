import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, CheckCircle2, ChevronRight, BarChart3, Sprout } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden subtle-mesh">
      {/* Decorative ambient blurred glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-48 right-10 w-72 h-72 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#14532D] border border-emerald-200/80 mb-6 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#16A34A]" />
              <span className="tracking-wide">AI-Powered Precision Agriculture</span>
              <span className="text-emerald-400">|</span>
              <span className="text-emerald-700 font-bold">MobileNetV2 Fine-Tuned</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#14532D] leading-[1.12]">
              Healthy Leaves. <br />
              <span className="bg-gradient-to-r from-[#16A34A] to-[#84CC16] bg-clip-text text-transparent">
                Smarter Farming.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Discover the power of artificial intelligence in cotton farming. Upload a cotton leaf image and let LeafSense AI identify potential diseases and leaf conditions in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#detect"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#14532D] via-[#16A34A] to-[#15803D] hover:shadow-lg hover:shadow-emerald-900/20 active:scale-[0.98] transition-all duration-200 group"
              >
                <Sparkles className="w-5 h-5 text-lime-300 group-hover:rotate-12 transition-transform" />
                <span>Detect Disease</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#explore"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-[#14532D] bg-white border border-emerald-900/15 hover:bg-emerald-50/70 hover:border-emerald-300 transition-all duration-200 shadow-xs"
              >
                <span>Explore Features</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#14532D]">95.33%</div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">Val Accuracy</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#16A34A]">7 Classes</div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">Cotton Conditions</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-800">&lt; 1.5s</div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">Instant Inference</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Card / Interactive Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Glassmorphic Showcase Card */}
              <div className="relative rounded-3xl bg-gradient-to-b from-white/95 to-emerald-50/80 p-6 sm:p-7 shadow-2xl shadow-emerald-950/10 border border-emerald-100">
                {/* Header of card */}
                <div className="flex items-center justify-between pb-4 border-b border-emerald-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-[#14532D]">
                      <Sprout className="w-5 h-5 text-[#16A34A]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Cotton Leaf Diagnostic</h4>
                      <p className="text-[11px] text-slate-500">Live MobileNetV2 Vision Pipeline</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Real-time
                  </span>
                </div>

                {/* Leaf Visual Artwork Representation */}
                <div className="my-5 relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#14532D] via-[#0F381E] to-[#0B2A16] p-6 text-white text-center shadow-inner">
                  {/* Background grid lines */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#84CC16_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Central Graphic */}
                  <div className="relative z-10 flex flex-col items-center justify-center py-4">
                    <div className="relative w-28 h-28 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3 shadow-lg group">
                      <div className="absolute inset-2 rounded-xl border border-dashed border-lime-400/50 animate-spin" style={{ animationDuration: '24s' }} />
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-[#16A34A] to-[#84CC16] flex items-center justify-center shadow-lg">
                        <Cpu className="w-9 h-9 text-white" />
                      </div>
                    </div>
                    
                    <span className="text-xs uppercase tracking-widest text-lime-300 font-semibold mb-1">
                      Input Tensor: 224 × 224 × 3
                    </span>
                    <h5 className="text-base font-bold text-white tracking-tight">
                      Deep Feature Extraction
                    </h5>
                    <p className="text-xs text-emerald-200/80 mt-1 max-w-xs">
                      Identifies angular lesions, vein thickening, jassid burns, and foliage chlorosis
                    </p>
                  </div>

                  {/* Corner Target Points */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-lime-400" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-lime-400" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-lime-400" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-lime-400" />
                </div>

                {/* Simulated classification breakdown preview */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Healthy Leaf Confidence
                    </span>
                    <span className="font-bold text-emerald-700">95.0%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-lime-500 h-2 rounded-full w-[95%]" />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500">Other condition probabilities</span>
                    <span className="text-slate-500">&lt; 5.0% aggregate</span>
                  </div>
                </div>

                {/* Bottom floating badge */}
                <div className="mt-5 pt-4 border-t border-emerald-100/80 flex items-center justify-between text-[11px] text-slate-600">
                  <span className="flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Validated on 2,137 Field Images
                  </span>
                  <span className="text-emerald-700 font-semibold">Ready for Crop Scouting</span>
                </div>
              </div>

              {/* Decorative Floating mini badge 1 */}
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-emerald-100 hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-lime-100 flex items-center justify-center text-lime-700">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">94.70% Test Acc</div>
                  <div className="text-[10px] text-slate-500">304/321 Correct</div>
                </div>
              </div>

              {/* Decorative Floating mini badge 2 */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-emerald-100 hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Agronomic Safety</div>
                  <div className="text-[10px] text-slate-500">Preventive Guidance</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
