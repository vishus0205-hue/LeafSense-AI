import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Bug, 
  FlaskConical, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search,
  CheckCircle2,
  Info
} from 'lucide-react';
import { DISEASE_CLASSES, DISEASE_DETAILS } from '../data/diseasesData';

export default function ExploreSection() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);

  const filterOptions = [
    'All',
    'Bacterial & Viral',
    'Pests & Insects',
    'Abiotic & Chemical',
    'Optimal Health'
  ];

  const getFilterCategory = (categoryName) => {
    if (categoryName.includes('Bacterial') || categoryName.includes('Viral')) return 'Bacterial & Viral';
    if (categoryName.includes('Insect') || categoryName.includes('Pest')) return 'Pests & Insects';
    if (categoryName.includes('Nutritional') || categoryName.includes('Chemical') || categoryName.includes('Variation')) return 'Abiotic & Chemical';
    if (categoryName.includes('Optimal')) return 'Optimal Health';
    return 'Other';
  };

  const filteredDiseases = DISEASE_CLASSES.filter((name) => {
    const details = DISEASE_DETAILS[name];
    const categoryGroup = getFilterCategory(details.category);

    const matchesFilter = selectedFilter === 'All' || categoryGroup === selectedFilter;
    const matchesSearch = 
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      details.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      details.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const toggleExpand = (name) => {
    setExpandedCard(expandedCard === name ? null : name);
  };

  return (
    <section id="explore" className="py-20 md:py-28 bg-[#F1F5F1]/50 border-y border-emerald-950/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-[#14532D] border border-emerald-200 mb-3">
            <Info className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Cotton Pathogen & Condition Atlas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14532D] tracking-tight">
            Explore 7 Cotton Leaf Conditions
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Understand the distinction between infectious bacterial or viral diseases, insect feeding damage, herbicide chemical injuries, nutritional deficiencies, and healthy foliage.
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-[#14532D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search condition or symptoms..."
              className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent"
            />
          </div>

        </div>

        {/* Condition Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map((name) => {
            const data = DISEASE_DETAILS[name];
            const isExpanded = expandedCard === name;
            const isHealthy = name === 'Healthy Leaf';

            return (
              <div
                key={name}
                className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${data.badgeBg}`}>
                      {data.category}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                      data.severity === 'Critical' 
                        ? 'bg-red-100 text-red-800' 
                        : data.severity === 'High'
                        ? 'bg-orange-100 text-orange-800'
                        : data.severity === 'Moderate'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {data.severity === 'None' ? 'Optimal' : `${data.severity} Impact`}
                    </span>
                  </div>

                  {/* Title & Pathogen */}
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {name}
                  </h3>
                  <div className="text-xs font-medium text-slate-400 italic mt-0.5">
                    {data.pathogen}
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {data.description}
                  </p>

                  {/* Symptoms List (preview) */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Key Visible Symptoms:
                    </h4>
                    <ul className="space-y-1.5">
                      {(isExpanded ? data.symptoms : data.symptoms.slice(0, 2)).map((symptom, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Management List (shown when expanded) */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in duration-200">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        Agronomic Prevention & Control:
                      </h4>
                      <ul className="space-y-1.5">
                        {data.management.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime-600 mt-1.5 shrink-0" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card Toggle Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => toggleExpand(name)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#14532D] hover:text-[#16A34A] transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Show Less' : 'Full Management Guide'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <a
                    href="#detect"
                    className="text-xs font-semibold text-slate-400 hover:text-emerald-700"
                  >
                    Test Leaf &rarr;
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredDiseases.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-700">No condition matches your search</h4>
            <p className="text-xs text-slate-500 mt-1">
              Try searching with another keyword or resetting the category filter.
            </p>
            <button
              onClick={() => {
                setSelectedFilter('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
