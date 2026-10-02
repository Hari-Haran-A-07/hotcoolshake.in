import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingContext = createContext();

const LUXURY_MESSAGES = [
  'PREPARING YOUR EXPERIENCE',
  'CRAFTING YOUR COFFEE JOURNEY',
  'ROASTING THE EXPERIENCE',
  'CALIBRATING THERMAL PRECISION',
  'BALANCING THE SINGLE-ORIGIN AROMA',
  'ALMOST READY',
];

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [targetPath, setTargetPath] = useState(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [experienceTitle, setExperienceTitle] = useState('HOT COOL SHAKE');

  const navigate = useNavigate();

  const startPageTransition = (toPath, customTitle = null) => {
    // If navigating to current path, do nothing
    if (window.location.pathname === toPath) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      navigate(toPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setTargetPath(toPath);
    setExperienceTitle(customTitle || 'HOT COOL SHAKE');
    setProgress(0);
    setMessageIndex(0);
    setIsLoading(true);
  };

  const skipLoader = () => {
    if (targetPath) {
      navigate(targetPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsLoading(false);
    setProgress(100);
  };

  useEffect(() => {
    let progressTimer;
    let messageTimer;

    if (isLoading) {
      const duration = 3800; // 3.8s cinematic experience
      const interval = 40;
      const step = 100 / (duration / interval);

      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 98) {
            clearInterval(progressTimer);
            setTimeout(() => {
              if (targetPath) {
                navigate(targetPath);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              setIsLoading(false);
            }, 300);
            return 100;
          }
          return Math.min(prev + step, 99);
        });
      }, interval);

      messageTimer = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % LUXURY_MESSAGES.length);
      }, 900);
    }

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, [isLoading, targetPath, navigate]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        progress: Math.floor(progress),
        currentMessage: LUXURY_MESSAGES[messageIndex],
        experienceTitle,
        startPageTransition,
        skipLoader,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const usePageLoader = () => useContext(LoadingContext);
