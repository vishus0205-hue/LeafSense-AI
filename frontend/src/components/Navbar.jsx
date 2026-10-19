import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X, Sparkles, Activity, ShieldCheck, Microscope } from 'lucide-react';

export default function Navbar({ backendStatus }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Detect Disease', href: '#detect' },
    { name: 'Explore Diseases', href: '#explore' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-sm py-3'
          : 'bg-white/80 backdrop-blur-md py-4 border-b border-emerald-950/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#14532D] to-[#16A34A] flex items-center justify-center text-white shadow-md shadow-emerald-900/15 group-hover:scale-105 transition-transform duration-200">
              <Leaf className="w-5 h-5 text-emerald-200" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-[#14532D]">
                  LeafSense<span className="text-[#16A34A]">.ai</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  MobileNetV2
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 tracking-wide">
                Smarter Detection. Healthier Crops.
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#14532D] hover:bg-emerald-50/60 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action & Status */}
          <div className="hidden md:flex items-center gap-4">
            {/* Backend status indicator */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                backendStatus === 'healthy'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : backendStatus === 'degraded'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
              title={backendStatus === 'healthy' ? 'AI Engine Ready' : 'Connecting to AI Engine'}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  backendStatus === 'healthy'
                    ? 'bg-emerald-500 animate-pulse'
                    : backendStatus === 'degraded'
                    ? 'bg-amber-500'
                    : 'bg-slate-400'
                }`}
              />
              <span>{backendStatus === 'healthy' ? 'Model Live' : 'Connecting...'}</span>
            </div>

            <a
              href="#detect"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#14532D] via-[#16A34A] to-[#15803D] hover:from-[#114324] hover:to-[#166534] rounded-xl shadow-sm hover:shadow-md hover:shadow-emerald-900/20 active:scale-[0.98] transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-lime-300" />
              <span>Try Detection</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#detect"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#14532D] rounded-lg"
            >
              Scan
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-emerald-950/10 px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-[#14532D]"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">AI Service Status</span>
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                  backendStatus === 'healthy'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    backendStatus === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
                <span>{backendStatus === 'healthy' ? 'Model Live' : 'Connecting'}</span>
              </div>
            </div>
            <a
              href="#detect"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#14532D] to-[#16A34A] shadow-md shadow-emerald-900/15"
            >
              Detect Disease Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
