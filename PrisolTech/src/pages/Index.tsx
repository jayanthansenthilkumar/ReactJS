import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Products from '@/components/Products';
import Team from '@/components/Team';
import Clients from '@/components/Clients';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AIAssistant from '@/components/AIAssistant/AIAssistant';
import { initScrollAnimation } from '@/utils/scrollAnimation';
import { useTheme } from '@/context/theme/ThemeContext';

const Index = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    // Initialize scroll animations
    const cleanup = initScrollAnimation();
    
    document.title = "Home | PrisolTech";
    
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <div className={`${isDark ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-white to-blue-50'} py-4`}>
        <About />
      </div>
      <div className={`${isDark ? 'bg-gray-800' : 'bg-blue-50'} py-4`}>
        <Services />
      </div>
      <div className={`${isDark ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-blue-50 to-white'} py-4`}>
        <Products />
      </div>
      <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} py-4`}>
        <Team />
      </div>
      <div className={`${isDark ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'py-4'}`}>
        <Clients />
      </div>
      <div className={`${isDark ? 'bg-gradient-to-b from-gray-800 to-gray-700' : 'bg-gradient-to-b from-white to-blue-50'} py-4`}>
        <CTA />
      </div>
      <div className={`${isDark ? 'bg-gray-700' : 'bg-blue-50'} py-4`}>
        <Contact />
      </div>
      <Footer />
      <ScrollToTop />
      <AIAssistant />
    </div>
  );
};

export default Index;
