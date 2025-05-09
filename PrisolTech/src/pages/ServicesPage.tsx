import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import CTA from '@/components/CTA';
import AIAssistant from '@/components/AIAssistant/AIAssistant';
import { initScrollAnimation } from '@/utils/scrollAnimation';
import { useTheme } from '@/context/theme/ThemeContext';

const ServicesPage = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  useEffect(() => {
    // Initialize scroll animations
    const cleanup = initScrollAnimation();
    
    document.title = "Services | PrisolTech";
    
    return () => {
      cleanup();
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className={`bg-gradient-to-r ${
          isDark 
            ? 'from-gray-900 via-gray-800 to-gray-900' 
            : 'from-blue-50 via-blue-100 to-blue-50'
        } py-16`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center fade-in">
              <h1 className={`text-4xl md:text-5xl font-bold ${
                isDark ? 'text-white' : 'text-prisol-dark-blue'
              } mb-6 relative inline-block`}>
                IT Services
                <span className="absolute bottom-0 left-0 w-full h-1 bg-prisol-blue transform scale-x-50 origin-center"></span>
              </h1>
              <p className={`text-xl ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mx-auto leading-relaxed`}>
                Explore our comprehensive range of cutting-edge IT solutions designed to transform your business operations, 
                enhance efficiency, and drive sustainable growth in today's digital landscape.
              </p>
            </div>
          </div>
        </div>
        <Services isFullPage={true} />
        <CTA />
      </div>
      <Footer />
      <ScrollToTop />
      <AIAssistant />
    </div>
  );
};

export default ServicesPage;
