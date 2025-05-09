import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Team from '@/components/Team';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AIAssistant from '@/components/AIAssistant/AIAssistant';
import { initScrollAnimation } from '@/utils/scrollAnimation';
import { useTheme } from '@/context/theme/ThemeContext';

const TeamPage = () => {
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    // Initialize scroll animations
    const cleanup = initScrollAnimation();
    
    document.title = "Our Team | PrisolTech";
    
    return () => {
      cleanup();
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className={`bg-gradient-to-r ${
          resolvedTheme === 'dark' 
            ? 'from-gray-900 via-gray-800 to-gray-900 text-white' 
            : 'from-blue-50 via-blue-100 to-blue-50'
        } py-16`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center fade-in">
              <h1 className={`text-4xl md:text-5xl font-bold ${
                resolvedTheme === 'dark' ? 'text-white' : 'text-prisol-dark-blue'
              } mb-6 relative inline-block`}>
                Our Team
                <span className="absolute bottom-0 left-0 w-full h-1 bg-prisol-blue transform scale-x-50 origin-center"></span>
              </h1>
              <p className={`text-xl ${
                resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              } mx-auto leading-relaxed`}>
                Meet the talented professionals behind PrisolTech's success. Our diverse team brings together expertise in 
                technology, business strategy, and innovation to deliver exceptional solutions for our clients.
              </p>
            </div>
          </div>
        </div>
        <Team isFullPage={true} />
      </div>
      <Footer />
      <ScrollToTop />
      <AIAssistant />
    </div>
  );
};

export default TeamPage;
