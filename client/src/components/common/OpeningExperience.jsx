import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TripleWaveEmblem } from './TripleWaveLogo';
import { Sparkles, SkipForward } from 'lucide-react';

export const OpeningExperience = ({ onComplete }) => {
  // Sequence steps:
  // 1: Ribbons separate & floating into center
  // 2: Merge into Triple-Wave Emblem with glow
  // 3: Wordmark "HOT"
  // 4: Wordmark "COOL"
  // 5: Wordmark "SHAKE"
  // 6: Full Logo & Tagline Zoom Scale & Transition into Homepage
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Step 1: Ribbons begin separate (0s)
    // Step 2: Ribbons merge at 1.0s
    const t1 = setTimeout(() => setStep(2), 1000);
    // Step 3: "HOT" appears at 1.7s
    const t2 = setTimeout(() => setStep(3), 1700);
    // Step 4: "COOL" appears at 2.2s
    const t3 = setTimeout(() => setStep(4), 2200);
    // Step 5: "SHAKE" appears at 2.7s
    const t4 = setTimeout(() => setStep(5), 2700);
    // Step 6: Full merged lockup scales & dissolves into homepage (3.4s -> 4.0s)
    const t5 = setTimeout(() => setStep(6), 3400);
    const t6 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#071A2B] text-[#F7FAF9] overflow-hidden select-none"
      >
        {/* Deep Navy Atmosphere with Ambient Light Beams */}
        <div className="absolute inset-0 bg-radial-navy opacity-95 pointer-events-none" />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#67D9D0_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

        {/* Ambient Glows */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#B8783E]/20 via-[#67D9D0]/20 to-transparent blur-3xl pointer-events-none"
        />

        {/* Skip Button */}
        <div className="absolute top-6 right-6 z-30">
          <button
            onClick={handleSkip}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#0B2538] hover:bg-[#168C8A]/20 text-[#67D9D0] border border-[#67D9D0]/30 text-xs font-mono tracking-widest uppercase transition-all duration-300"
          >
            <span>SKIP INTRO</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center Stage: The Triple-Wave Ribbons Merging Animation */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Separate Ribbons Phase (Step 1) */}
          {step === 1 && (
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Ribbon 1: STEAM (Rising, Warm Bronze) */}
              <motion.div
                initial={{ x: -90, y: -60, opacity: 0, scale: 0.6, rotate: -25 }}
                animate={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="absolute flex flex-col items-center"
              >
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <path
                    d="M 22 45 C 18 36, 20 28, 30 22 C 38 18, 36 10, 30 4 C 36 8, 42 16, 36 24 C 28 32, 30 40, 34 44 Z"
                    fill="url(#preloaderSteam)"
                  />
                  <defs>
                    <linearGradient id="preloaderSteam" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#B8783E" />
                      <stop offset="100%" stopColor="#D6A06A" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[9px] font-mono tracking-widest text-[#D6A06A] uppercase font-bold mt-1">
                  HOT • STEAM
                </span>
              </motion.div>

              {/* Ribbon 2: ICE CRYSTAL (Angular, Ice Teal) */}
              <motion.div
                initial={{ x: 90, y: -60, opacity: 0, scale: 0.6, rotate: 30 }}
                animate={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="absolute flex flex-col items-center"
              >
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <path
                    d="M 30 8 L 46 20 L 40 40 L 26 28 L 36 20 Z"
                    fill="url(#preloaderIce)"
                  />
                  <defs>
                    <linearGradient id="preloaderIce" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#168C8A" />
                      <stop offset="100%" stopColor="#67D9D0" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[9px] font-mono tracking-widest text-[#67D9D0] uppercase font-bold mt-1">
                  COOL • CRYO
                </span>
              </motion.div>

              {/* Ribbon 3: VORTEX (Dynamic, Bronze to Teal) */}
              <motion.div
                initial={{ x: 0, y: 80, opacity: 0, scale: 0.6, rotate: 180 }}
                animate={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="absolute flex flex-col items-center"
              >
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <path
                    d="M 16 24 C 22 16, 40 16, 46 28 C 50 36, 42 48, 30 50 C 20 52, 14 42, 18 34 C 20 28, 28 26, 32 30 C 26 32, 22 36, 24 42 C 26 46, 36 44, 38 38 Z"
                    fill="url(#preloaderVortex)"
                  />
                  <defs>
                    <linearGradient id="preloaderVortex" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#B8783E" />
                      <stop offset="50%" stopColor="#D6A06A" />
                      <stop offset="100%" stopColor="#67D9D0" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[9px] font-mono tracking-widest text-[#F7FAF9] uppercase font-bold mt-1">
                  SHAKE • VORTEX
                </span>
              </motion.div>
            </div>
          )}

          {/* Unified Merged Triple-Wave Emblem (Step 2+) */}
          {step >= 2 && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -30 }}
              animate={{
                scale: step >= 6 ? 1.25 : 1,
                opacity: 1,
                rotate: 0,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center justify-center"
            >
              {/* Radial Energy Burst */}
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="absolute w-32 h-32 rounded-full border-2 border-[#67D9D0] pointer-events-none"
              />

              {/* The Master Emblem */}
              <div className="p-4 rounded-full bg-[#0B2538] border-2 border-[#B8783E] shadow-bronze-glow">
                <TripleWaveEmblem size={84} animate />
              </div>
            </motion.div>
          )}

          {/* Sequence Words: HOT -> COOL -> SHAKE */}
          <div className="mt-8 flex flex-col items-center justify-center min-h-[110px]">
            <div className="flex items-center space-x-3 sm:space-x-4 text-2xl sm:text-4xl font-display font-black tracking-widest uppercase">
              {step >= 3 && (
                <motion.span
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="text-bronze-gradient"
                >
                  HOT
                </motion.span>
              )}

              {step >= 4 && (
                <>
                  <span className="text-[#A8B0B4]/40 font-mono text-sm">•</span>
                  <motion.span
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="text-teal-gradient"
                  >
                    COOL
                  </motion.span>
                </>
              )}

              {step >= 5 && (
                <>
                  <span className="text-[#A8B0B4]/40 font-mono text-sm">•</span>
                  <motion.span
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="text-brand-gradient"
                  >
                    SHAKE
                  </motion.span>
                </>
              )}
            </div>

            {/* Tagline Subtitle */}
            {step >= 5 && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-3 font-mono text-[11px] sm:text-xs tracking-[0.3em] text-[#A8B0B4] uppercase font-bold text-center"
              >
                YOUR COFFEE. YOUR TEMPERATURE. YOUR CREATION.
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OpeningExperience;
