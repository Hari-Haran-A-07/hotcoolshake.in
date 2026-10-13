import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('hcs_a11y_contrast') === 'true';
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    return localStorage.getItem('hcs_a11y_reduced_motion') === 'true' ||
      (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  });

  const [largeFont, setLargeFont] = useState(() => {
    return localStorage.getItem('hcs_a11y_large_font') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('hcs_a11y_contrast', highContrast);
    if (highContrast) {
      document.documentElement.classList.add('hcs-high-contrast');
    } else {
      document.documentElement.classList.remove('hcs-high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('hcs_a11y_reduced_motion', reducedMotion);
    if (reducedMotion) {
      document.documentElement.classList.add('hcs-reduced-motion');
    } else {
      document.documentElement.classList.remove('hcs-reduced-motion');
    }
  }, [reducedMotion]);

  useEffect(() => {
    localStorage.setItem('hcs_a11y_large_font', largeFont);
    if (largeFont) {
      document.documentElement.classList.add('hcs-large-font');
    } else {
      document.documentElement.classList.remove('hcs-large-font');
    }
  }, [largeFont]);

  const toggleHighContrast = () => setHighContrast((prev) => !prev);
  const toggleReducedMotion = () => setReducedMotion((prev) => !prev);
  const toggleLargeFont = () => setLargeFont((prev) => !prev);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        reducedMotion,
        largeFont,
        toggleHighContrast,
        toggleReducedMotion,
        toggleLargeFont,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export default AccessibilityContext;
