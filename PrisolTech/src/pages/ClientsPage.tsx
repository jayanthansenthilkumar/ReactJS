import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Clients from '@/components/Clients';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AIAssistant from '@/components/AIAssistant/AIAssistant';
import { initScrollAnimation } from '@/utils/scrollAnimation';
import { useTheme } from '@/context/theme/ThemeContext';

const ClientsPage = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  useEffect(() => {
    // Initialize scroll animations
    const cleanup = initScrollAnimation();
    
    document.title = "Clients | PrisolTech";
    
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
                Success Stories
                <span className="absolute bottom-0 left-0 w-full h-1 bg-prisol-blue transform scale-x-50 origin-center"></span>
              </h1>
              <p className={`text-xl ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mx-auto leading-relaxed`}>
                Discover the businesses that trust PrisolTech for their strategic IT solutions and hear 
                first-hand accounts of how our partnership has transformed their operations and driven remarkable results.
              </p>
            </div>
          </div>
        </div>
        <Clients isFullPage={true} />
      </div>
      <Footer />
      <ScrollToTop />
      <AIAssistant />
    </div>
  );
};

export default ClientsPage;
