import React from 'react';
import { UploadCloud, Sliders, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Upload Leaf Image',
      subtitle: 'Input Capture',
      description:
        'Photograph or select any cotton leaf image. Supports standard smartphone or camera formats (JPG, PNG, WebP) up to 10 MB.',
      icon: UploadCloud,
      color: 'text-emerald-700 bg-emerald-100'
    },
    {
      step: '02',
      title: 'Image Preprocessing',
      subtitle: 'Tensor Standardization',
      description:
        'The backend converts images to 3-channel RGB, applies high-order bilinear resampling to 224 × 224 pixels, and scales tensor values.',
      icon: Sliders,
      color: 'text-teal-700 bg-teal-100'
    },
    {
      step: '03',
      title: 'MobileNetV2 Analysis',
      subtitle: 'Neural Feature Extraction',
      description:
        'Depthwise separable convolutions scan textures, veins, chlorosis rings, and necrotic lesions across inverted residual bottlenecks.',
      icon: Cpu,
      color: 'text-lime-700 bg-lime-100'
    },
    {
      step: '04',
      title: 'Condition & Confidence',
      subtitle: 'Agronomic Diagnostic',
      description:
        'A Softmax probability distribution ranks all 7 condition categories, outputting certainty score, disease profile, and preventive advice.',
      icon: CheckCircle2,
      color: 'text-[#14532D] bg-emerald-100'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#14532D] border border-emerald-200 mb-3">
            <Cpu className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Workflow & Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14532D] tracking-tight">
            How LeafSense AI Works
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            From field photograph to precision diagnostic breakdown in four streamlined, transparent steps.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step}
                className="relative bg-white rounded-3xl p-7 border border-emerald-950/10 shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-300 group-hover:text-emerald-500/40 transition-colors">
                    {item.step}
                  </span>
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#16A34A] mb-1">
                    {item.subtitle}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom step progression indicator */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Step {index + 1} of 4</span>
                  {index < 3 ? (
                    <ArrowRight className="w-4 h-4 text-emerald-600 opacity-60 group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <span className="text-emerald-600 font-bold">Complete</span>
                  )}
                </div>
              </div>
            );
          })}

        </div>

        {/* Bottom architecture callout */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#14532D] to-emerald-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-lime-300 shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Powered by MobileNetV2 Architecture
              </h4>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                Lightweight, high-throughput convolutional network optimized for real-time edge and web deployment.
              </p>
            </div>
          </div>
          <a
            href="#detect"
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-white text-[#14532D] hover:bg-emerald-50 transition-colors shrink-0"
          >
            Test an Image Now
          </a>
        </div>

      </div>
    </section>
  );
}
