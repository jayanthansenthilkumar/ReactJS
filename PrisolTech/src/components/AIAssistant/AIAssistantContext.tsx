
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AIAssistantContextType {
  isOpen: boolean;
  toggleAIAssistant: () => void;
  openAIAssistant: () => void;
  closeAIAssistant: () => void;
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext);
  if (context === undefined) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
};

interface AIAssistantProviderProps {
  children: ReactNode;
}

export const AIAssistantProvider = ({ children }: AIAssistantProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAIAssistant = () => {
    setIsOpen(prev => !prev);
  };

  const openAIAssistant = () => {
    setIsOpen(true);
  };

  const closeAIAssistant = () => {
    setIsOpen(false);
  };

  return (
    <AIAssistantContext.Provider value={{ isOpen, toggleAIAssistant, openAIAssistant, closeAIAssistant }}>
      {children}
    </AIAssistantContext.Provider>
  );
};
