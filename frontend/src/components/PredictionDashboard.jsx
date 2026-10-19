import React, { useMemo } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  RotateCcw, 
  Info, 
  Activity, 
  Sparkles, 
  HelpCircle,
  FileCheck,
  Bug,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { DISEASE_DETAILS } from '../data/diseasesData';

export default function PredictionDashboard({ 
  result, 
  imagePreview, 
  onReset 
}) {
  const { predicted_class, confidence, probabilities } = result;

  const details = useMemo(() => {
    return DISEASE_DETAILS[predicted_class] || {
      category: 'Leaf Condition',
      severity: 'Unknown',
      description: 'Cotton leaf condition evaluated by the MobileNetV2 classification model.',
      symptoms: ['Visual alterations on foliage structure or coloration.'],
      management: ['Conduct visual inspection and consult agricultural extension specialists.'],
      color: '#16A34A',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    };
  }, [predicted_class]);

  const isHealthy = predicted_class === 'Healthy Leaf';

  // Format probabilities for Recharts
  const chartData = useMemo(() => {
    if (!probabilities) return [];
    return Object.entries(probabilities).map(([name, prob]) => {
      const percentage = Number((prob * 100).toFixed(1));
      const isTop = name === predicted_class;
      return {
        name,
        shortName: name.length > 14 ? name.substring(0, 12) + '...' : name,
        percentage,
        isTop,
        color: isTop ? (isHealthy ? '#16A34A' : '#DC2626') : '#94A3B8'
      };
    }).sort((a, b) => b.percentage - a.percentage);
  }, [probabilities, predicted_class, isHealthy]);

  const confidencePercentage = Math.round(confidence * 100);

  return (
    <div className="w-full bg-white rounded-3xl border border-emerald-900/10 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      
      {/* Top Banner Header */}
      <div className={`px-6 py-5 sm:px-8 border-b ${
        isHealthy 
          ? 'bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-white' 
          : 'bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isHealthy ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
            }`}>
              {isHealthy ? <ShieldCheck className="w-7 h-7" /> : <AlertTriangle className="w-7 h-7" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
                  Diagnosis Result
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/15">
                  {details.category}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                {predicted_class}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-emerald-200">Confidence Score</div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {confidencePercentage}%
              </div>
            </div>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/15 hover:bg-white/25 active:scale-95 transition-all border border-white/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Analyze Another</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="p-6 sm:p-8 space-y-8">
        
        {/* Row 1: Image + Primary Stats + Quick Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Image & Confidence Meter */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-square max-h-80 w-full mx-auto group shadow-inner">
              <img
                src={imagePreview}
                alt="Analyzed Cotton Leaf"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
                <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md font-mono">
                  Input: 224 × 224 RGB
                </span>
                <span className="bg-emerald-600/90 backdrop-blur-md px-2.5 py-1 rounded-md font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Inferred
                </span>
              </div>
            </div>

            {/* Confidence Progress Bar */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" /> Model Certainty
                </span>
                <span className="text-[#14532D] font-bold">{confidencePercentage}% match</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    confidencePercentage >= 80 
                      ? 'bg-gradient-to-r from-emerald-500 to-[#16A34A]' 
                      : confidencePercentage >= 50
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
                      : 'bg-gradient-to-r from-rose-500 to-red-500'
                  }`}
                  style={{ width: `${confidencePercentage}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                {confidencePercentage >= 85
                  ? 'Strong diagnostic signal matched against trained feature vectors.'
                  : 'Moderate diagnostic signal. Cross-referencing field visual symptoms is recommended.'}
              </p>
            </div>
          </div>

          {/* Description & Agronomic Information */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Health Notice or Disease Summary */}
            {isHealthy ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#14532D]">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-bold text-[#14532D]">Crops Appear Healthy</h4>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                      LeafSense AI did not detect common signs of bacterial blight, viral curl, jassid burns, or herbicide injury. Foliage indicates healthy chlorophyll distribution and normal turgor.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-bold text-amber-900">Detected Condition Alert</h4>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                      {details.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Symptoms Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-3">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Characteristic Visible Symptoms</span>
              </h4>
              <ul className="space-y-2">
                {details.symptoms.map((symptom, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Preventive Guidance */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>General Preventive & Management Guidance</span>
              </h4>
              <ul className="space-y-2">
                {details.management.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-600 mt-2 shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Row 2: Comprehensive Probability Distribution Chart */}
        <div className="pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                <span>Multi-Class Prediction Probabilities</span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Exact probability output generated by MobileNetV2 Softmax layer across all 7 categories
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 self-start sm:self-auto">
              Sum = 100%
            </span>
          </div>

          {/* Recharts Bar Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis 
                  type="number" 
                  domain={[0, 100]} 
                  unit="%" 
                  tick={{ fontSize: 11, fill: '#64748B' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="shortName" 
                  width={140}
                  tick={{ fontSize: 12, fill: '#334155', fontWeight: 500 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Probability']}
                  labelFormatter={(name) => {
                    const fullItem = chartData.find(d => d.shortName === name);
                    return fullItem ? fullItem.name : name;
                  }}
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '12px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)'
                  }}
                />
                <Bar 
                  dataKey="percentage" 
                  radius={[0, 8, 8, 0]}
                  barSize={18}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.isTop ? (isHealthy ? '#16A34A' : '#EF4444') : '#CBD5E1'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Probability legend cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mt-4">
            {chartData.map((item) => (
              <div 
                key={item.name}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  item.isTop 
                    ? 'bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-400' 
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="text-[11px] font-semibold text-slate-600 truncate" title={item.name}>
                  {item.name}
                </div>
                <div className={`text-sm font-extrabold mt-0.5 ${
                  item.isTop ? 'text-emerald-700' : 'text-slate-800'
                }`}>
                  {item.percentage}%
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* AI Disclaimer Footnote */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-500">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>AI Prediction Disclaimer:</strong> LeafSense AI is a deep learning decision-support tool. Model predictions reflect statistical pattern recognition and are not absolute diagnostic guarantees. Always confirm critical crop issues with certified agronomists or local agricultural extension offices before making expensive spraying decisions.
          </p>
        </div>

      </div>

    </div>
  );
}
