import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useLoading } from '@/context/LoadingContext';
import { useTheme } from '@/context/theme/ThemeContext';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const Loader = ({ className, ...props }: LoaderProps) => {
  const { isLoading } = useLoading();
  const { resolvedTheme } = useTheme();
  const [counter, setCounter] = useState(0);
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    if (!isLoading) return;
    
    // Reset counter when loader shows
    setCounter(0);
    
    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // 20ms * 100 = ~2s to complete

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500",
        isDark 
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700" 
          : "bg-gradient-to-br from-white via-blue-50 to-blue-100",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
      {...props}
    >
      <div className="relative mb-8">
        {/* Simple background pattern */}
        <div className="absolute -z-10 inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full animate-pulse">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full border border-prisol-blue dark:border-prisol-light-blue"></div>
            <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 rounded-full border border-prisol-light-blue dark:border-prisol-blue"></div>
          </div>
        </div>
        
        {/* Main loader animation */}
        <div className="flex items-center justify-center">
          <div className="relative w-24 h-24">
            {/* Spinning rings */}
            <div className="absolute inset-0 border-2 border-t-prisol-blue dark:border-t-prisol-light-blue border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 border-2 border-r-prisol-light-blue dark:border-r-prisol-blue border-t-transparent border-b-transparent border-l-transparent rounded-full animate-reverse-spin" style={{ animationDuration: '1.5s' }}></div>
            <div className="absolute inset-1 border-2 border-b-prisol-dark-blue dark:border-b-blue-400 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
            
            {/* Counter display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-prisol-dark-blue'}`}>
                {counter}<span className="text-xs">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-bold">
          <span className={isDark ? "text-white" : "text-prisol-dark-blue"}>Prisol</span>
          <span className={isDark ? "text-prisol-light-blue" : "text-prisol-blue"}>Tech</span>
        </div>
        
        <div className="mt-2 flex items-center justify-center">
          <span className={`mr-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Loading</span>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className={`w-1 h-1 rounded-full animate-bounce ${isDark ? 'bg-prisol-light-blue' : 'bg-prisol-blue'}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes reverse-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
