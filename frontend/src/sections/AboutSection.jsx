import React from 'react';
import { 
  Award, 
  BarChart, 
  Cpu, 
  Database, 
  Layers, 
  Target, 
  CheckCircle2, 
  ShieldAlert,
  BrainCircuit,
  FileSpreadsheet
} from 'lucide-react';

export default function AboutSection() {
  const metrics = [
    { label: 'Validation Accuracy', value: '95.33%', icon: Award, desc: 'Peak epoch performance' },
    { label: 'Test Accuracy', value: '94.70%', icon: Target, desc: 'Unseen holdout evaluation' },
    { label: 'Macro F1-Score', value: '94.10%', icon: BarChart, desc: 'Balanced class harmonic mean' },
    { label: 'Correct Test Predictions', value: '304 / 321', icon: CheckCircle2, desc: 'Held-out test set accuracy' },
    { label: 'Dataset Field Images', value: '2,137', icon: Database, desc: 'Augmented cotton leaves' },
    { label: 'Classification Classes', value: '7', icon: Layers, desc: 'Diseases, pests & injuries' },
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#14532D] border border-emerald-200 mb-3">
            <BrainCircuit className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Research & Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14532D] tracking-tight">
            About LeafSense AI
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            LeafSense AI is an intelligent agricultural decision-support platform designed to help cotton growers, agronomists, and crop scouts detect leaf distress rapidly and accurately.
          </p>
        </div>

        {/* Narrative & Architecture Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          <div className="lg:col-span-7 space-y-5 text-slate-700 text-base leading-relaxed">
            <h3 className="text-2xl font-bold text-[#14532D]">
              Fine-Tuned MobileNetV2 Vision Pipeline
            </h3>
            <p>
              Traditional visual inspection in cotton fields is labor-intensive, subjective, and prone to misdiagnosis between insect scorches (such as Jassid hopperburn) and pathogenic infections (such as Bacterial Blight). 
            </p>
            <p>
              LeafSense AI leverages <strong>transfer learning with MobileNetV2</strong>, an architecture renowned for inverted residual blocks and linear bottlenecks. Pre-trained on ImageNet, the model was fine-tuned on curated agricultural cotton leaf datasets, optimizing convolutional filters to identify fine-grained foliar venation irregularities, necrotic lesion shapes, and chlorotic patches.
            </p>
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-sm text-[#14532D] flex items-start gap-3">
              <Cpu className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Edge-Optimized Efficiency:</span> With a compact parameter footprint and depthwise separable convolutions, MobileNetV2 delivers rapid inference times (&lt;150ms on standard CPUs) without sacrificing feature discrimination across subtle disease stages.
              </div>
            </div>
          </div>

          {/* Model Specification Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#14532D] via-[#0F3D1F] to-[#0A2914] rounded-3xl p-7 text-white shadow-xl">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-5">
              <div className="w-10 h-10 rounded-xl bg-lime-400/20 flex items-center justify-center text-lime-300">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Model Specifications</h4>
                <p className="text-xs text-emerald-300">Trained MobileNetV2 Keras Artifact</p>
              </div>
            </div>

            <dl className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <dt className="text-slate-300">Base Architecture</dt>
                <dd className="font-mono font-semibold text-lime-300">MobileNetV2 (Alpha 1.0)</dd>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <dt className="text-slate-300">Input Resolution</dt>
                <dd className="font-mono font-semibold text-white">224 × 224 × 3 (RGB)</dd>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <dt className="text-slate-300">Target Categories</dt>
                <dd className="font-semibold text-white">7 Discrete Classes</dd>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <dt className="text-slate-300">Loss Function</dt>
                <dd className="font-mono font-semibold text-white">Categorical Crossentropy</dd>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <dt className="text-slate-300">Top-1 Accuracy</dt>
                <dd className="font-bold text-lime-300">94.70% (Test Set)</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-300">Model Format</dt>
                <dd className="font-mono font-semibold text-emerald-200">Keras v3 / HDF5 (.keras)</dd>
              </div>
            </dl>
          </div>

        </div>

        {/* Evaluation Metrics Grid */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#14532D]">
              Experimental Evaluation Metrics
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Rigorous empirical evaluation conducted across train, validation, and holdout test splits
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.label}
                  className="bg-white rounded-2xl p-5 border border-slate-200 text-center shadow-xs hover:border-emerald-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-[#14532D] tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-1">
                    {m.label}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {m.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scientific / Agronomic Disclaimer Callout */}
        <div className="p-5 rounded-3xl bg-slate-100/80 border border-slate-200 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-slate-600 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-800">Academic & Agronomic Notice:</span> The statistics above represent recorded experimental evaluation metrics on benchmark cotton leaf datasets. Real-world performance may vary based on ambient lighting, leaf angle, camera sensor noise, and multi-disease co-infections. LeafSense AI serves as an exploratory advisory aid and does not substitute for accredited plant pathology laboratory testing.
          </div>
        </div>

      </div>
    </section>
  );
}
