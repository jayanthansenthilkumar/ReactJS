import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@/context/theme/ThemeContext';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  setIsLoading: () => {},
  showLoader: () => {},
  hideLoader: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { resolvedTheme } = useTheme(); // Get the current resolved theme

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  // Handle page transition loading
  useEffect(() => {
    showLoader();
    
    // Simulate minimum loading time for better UX
    const timer = setTimeout(() => {
      hideLoader();
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Initial app load
  useEffect(() => {
    // Hide loader after initial load
    const timer = setTimeout(() => {
      hideLoader();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, showLoader, hideLoader }}>
      {children}
    </LoadingContext.Provider>
  );
};
