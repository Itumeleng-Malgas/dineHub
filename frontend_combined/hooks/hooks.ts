"use client"
import React, { useState } from 'react';
  
// Hook to detect if the device is mobile
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

// Hook to open and close forms modal
export const useToggleState = () => {
  const [isTrue, setIsTrue] = useState<boolean>(false);

  const toggleState = () => setIsTrue(prev => !prev);
  return { isTrue, toggleState };
};