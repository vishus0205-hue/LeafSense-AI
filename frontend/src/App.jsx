import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import DetectionSection from './sections/DetectionSection';
import ExploreSection from './sections/ExploreSection';
import HowItWorksSection from './sections/HowItWorksSection';
import AboutSection from './sections/AboutSection';
import Footer from './components/Footer';

export default function App() {
  const [backendStatus, setBackendStatus] = useState('connecting'); // 'healthy' | 'degraded' | 'offline' | 'connecting'
  const [healthData, setHealthData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const checkHealth = async () => {
      try {
        let res;
        try {
          res = await fetch('/api/health');
        } catch {
          res = await fetch('http://127.0.0.1:8000/health');
        }

        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setHealthData(data);
            setBackendStatus(data.model_loaded ? 'healthy' : 'degraded');
          }
        } else {
          if (isMounted) setBackendStatus('degraded');
        }
      } catch (err) {
        if (isMounted) setBackendStatus('offline');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 15000); // Check every 15s

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-[#1E293B]">
      {/* Navigation */}
      <Navbar backendStatus={backendStatus} />

      {/* Main Sections */}
      <main className="flex-1">
        <HeroSection />
        <DetectionSection backendStatus={backendStatus} />
        <ExploreSection />
        <HowItWorksSection />
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
