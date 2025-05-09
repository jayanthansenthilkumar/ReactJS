import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AIAssistant from '@/components/AIAssistant/AIAssistant';
import { initScrollAnimation } from '@/utils/scrollAnimation';
import { useTheme } from '@/context/theme/ThemeContext';

const AboutPage = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  useEffect(() => {
    // Initialize scroll animations
    const cleanup = initScrollAnimation();
    
    document.title = "About Us | PrisolTech";
    
    return () => {
      cleanup();
    };
  }, []);
  
  return (
    <div className={`min-h-screen ${isDark ? 'text-gray-200' : ''}`}>
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
                About Us
                <span className="absolute bottom-0 left-0 w-full h-1 bg-prisol-blue transform scale-x-50 origin-center"></span>
              </h1>
              <p className={`text-xl ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mx-auto leading-relaxed`}>
                Learn about our journey, our core values, and the specialized expertise that has established us 
                as a trusted partner and leading provider of innovative IT solutions since 2025.
              </p>
            </div>
          </div>
        </div>
        <About isFullPage={true} />
      </div>
      <Footer />
      <ScrollToTop />
      <AIAssistant />
    </div>
  );
};

export default AboutPage;
