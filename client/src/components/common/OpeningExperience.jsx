import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TripleWaveEmblem } from './TripleWaveLogo';
import { FastForward } from 'lucide-react';

export const OpeningExperience = ({ onComplete }) => {
  // Master 5-second branded sequence:
  // 0-1s: Dark #2A1B16 screen
  // 1-2s: Triple-Wave emblem appears
  // 2-3s: Steam ribbon animates (HOT)
  // 3-4s: Ice crystal & vortex ribbons animate (COOL & SHAKE)
  // 4-5s: HOT COOL SHAKE wordmark appears -> liquid transition -> new page
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 1000); // 1s
    const t2 = setTimeout(() => setPhase(3), 2000); // 2s
    const t3 = setTimeout(() => setPhase(4), 3000); // 3s
    const t4 = setTimeout(() => setPhase(5), 4000); // 4s
    const t5 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 5000); // 5s

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
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
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#2A1B16] text-[#F4E8D1] overflow-hidden select-none"
      >
        {/* Deep Coffee Atmosphere with Radial Glow */}
        <div className="absolute inset-0 bg-radial-coffee opacity-95 pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#EEDCC6_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

        {/* Ambient Steam / Aroma Glow */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#EEDCC6]/20 via-[#3C2A21]/30 to-transparent blur-3xl pointer-events-none"
        />

        {/* Skip Button */}
        <div className="absolute top-6 right-6 z-30">
          <button
            onClick={handleSkip}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#3C2A21] hover:bg-[#EEDCC6] hover:text-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30 text-xs font-mono tracking-widest uppercase transition-all duration-300"
          >
            <span>SKIP INTRO</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center Stage: The Branded 5-Second Emblem Animation */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Phase 2+: Triple-Wave Emblem Reveal */}
          {phase >= 2 && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -20 }}
              animate={{
                scale: phase === 5 ? 1.2 : 1,
                opacity: 1,
                rotate: 0,
              }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center justify-center"
            >
              {/* Radial Energy Expansion Ring */}
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute w-36 h-36 rounded-full border-2 border-[#EEDCC6] pointer-events-none"
              />

              {/* Master Emblem */}
              <div className="p-4 rounded-full bg-[#3C2A21] border-2 border-[#EEDCC6] shadow-cream-glow">
                <TripleWaveEmblem size={96} animate />
              </div>
            </motion.div>
          )}

          {/* Phase 3 & 4 Ribbon Subtitles & Indicator */}
          <div className="mt-8 flex flex-col items-center justify-center min-h-[110px]">
            {/* Step 3: HOT Steam Ribbon */}
            <div className="flex items-center space-x-3 sm:space-x-4 text-2xl sm:text-4xl font-display font-black tracking-widest uppercase">
              {phase >= 3 && (
                <motion.span
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="text-brand-gradient"
                >
                  HOT
                </motion.span>
              )}

              {phase >= 4 && (
                <>
                  <span className="text-[#EEDCC6]/40 font-mono text-sm">•</span>
                  <motion.span
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="text-[#F4E8D1]"
                  >
                    COOL
                  </motion.span>
                  <span className="text-[#EEDCC6]/40 font-mono text-sm">•</span>
                  <motion.span
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="text-brand-gradient"
                  >
                    SHAKE
                  </motion.span>
                </>
              )}
            </div>

            {/* Phase 5: HOT COOL SHAKE Wordmark & Tagline */}
            {phase >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mt-3 space-y-1"
              >
                <div className="font-mono text-xs tracking-[0.35em] text-[#EEDCC6] uppercase font-bold">
                  COFFEE, REIMAGINED AROUND YOUR TASTE
                </div>
                <div className="text-[9px] font-mono tracking-widest text-[#EEDCC6]/60 uppercase">
                  ENTER THE COFFEE LABORATORY
                </div>
              </motion.div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-48 h-1 bg-[#3C2A21] rounded-full overflow-hidden mt-4 border border-[#EEDCC6]/20">
            <motion.div
              className="h-full bg-brand-gradient rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(phase / 5) * 100}%` }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OpeningExperience;
