
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
  showSidebar?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children,
  hideFooter = false,
  showSidebar = false
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Set sidebar to open by default on desktop
  useEffect(() => {
    if (!isMobile && showSidebar) {
      setIsSidebarOpen(true);
    }
  }, [isMobile, showSidebar]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        toggleSidebar={toggleSidebar} 
        isLoggedIn={showSidebar}
      />
      
      <div className="flex flex-1">
        {showSidebar && <Sidebar isOpen={isSidebarOpen} />}
        
        <main className={`flex-1 transition-all duration-300 ${showSidebar ? 'md:ml-64' : ''}`}>
          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && isMobile && showSidebar && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}
          
          <div className="container mx-auto p-4">
            {children}
          </div>
        </main>
      </div>
      
      {!hideFooter && <Footer />}
    </div>
  );
};

export default AppLayout;
