"use client"
import React, { createContext, useContext, ReactNode } from 'react';
import { useToggleState } from '@/hooks/hooks';

interface ToggleContextType {
  isTrue: boolean;
  toggleState: () => void;
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

interface ToggleProviderProps {
  children: ReactNode;
}

export const ToggleProvider: React.FC<ToggleProviderProps> = ({ children }) => {
  const toggle = useToggleState();
  return (
    <ToggleContext.Provider value={toggle}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = (): ToggleContextType => {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error('useToggle must be used within a ToggleProvider');
  }
  return context;
};