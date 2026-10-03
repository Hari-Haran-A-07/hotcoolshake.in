import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { TripleWaveEmblem } from './TripleWaveLogo';
import { Sparkles, FastForward } from 'lucide-react';

export const PageLoaderModal = () => {
  const { isLoading, progress, currentMessage, experienceTitle, skipLoader } = usePageLoader();

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[9990] flex items-center justify-center bg-[#071A2B] text-[#F7FAF9] overflow-hidden"
      >
        {/* Ambient Deep Navy & Glowing Atmosphere */}
        <div className="absolute inset-0 bg-radial-navy opacity-95" />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#67D9D0_1px,transparent_1px)] [background-size:28px_28px]" />

        {/* Floating Steam/Cryo Glow Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-[#B8783E]/20 to-[#67D9D0]/20 rounded-full blur-3xl animate-pulse-glow" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
          {/* Pulsing Triple-Wave Emblem with Bronze/Teal Aura */}
          <div className="relative mb-8">
            <div className="absolute -inset-4 rounded-full bg-[#67D9D0]/15 blur-xl animate-ping opacity-30" />
            <motion.div
              animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="relative p-4 rounded-full bg-[#0B2538] border-2 border-[#B8783E] shadow-bronze-glow"
            >
              <TripleWaveEmblem size={80} />
            </motion.div>
          </div>

          {/* Brand Tag */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-2"
          >
            <span className="text-[10px] font-mono tracking-widest text-[#D6A06A] uppercase font-bold px-3 py-1 rounded-full bg-[#0B2538] border border-[#B8783E]/30">
              HOT COOL SHAKE
            </span>
          </motion.div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F7FAF9] font-display mt-2 mb-1 uppercase">
            {experienceTitle || 'PREPARING YOUR EXPERIENCE...'}
          </h3>

          {/* Rotating Micro-Copy */}
          <div className="h-6 overflow-hidden my-3">
            <motion.p
              key={currentMessage}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-mono tracking-widest text-[#67D9D0] uppercase flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B8783E] animate-spin-slow" />
              <span>{currentMessage || 'PREPARING YOUR EXPERIENCE...'}</span>
            </motion.p>
          </div>

          {/* Gradient Liquid Fill Progress Bar */}
          <div className="w-full max-w-xs mt-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-[#A8B0B4] mb-2">
              <span>EXPERIENCE INITIALIZATION</span>
              <span className="font-bold text-[#67D9D0]">{progress}%</span>
            </div>
            
            <div className="relative h-2 w-full bg-[#0B2538] rounded-full overflow-hidden border border-[#67D9D0]/30 p-0.5">
              <motion.div
                className="h-full bg-brand-gradient rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>

          {/* Skip Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={skipLoader}
            className="mt-8 flex items-center space-x-2 px-5 py-2 text-xs font-mono tracking-wider text-[#A8B0B4] hover:text-[#F7FAF9] bg-[#0B2538]/80 hover:bg-[#0B2538] border border-[#B8783E]/30 rounded-full transition-all duration-200"
          >
            <span>PROCEED IMMEDIATELY</span>
            <FastForward className="w-3.5 h-3.5 text-[#67D9D0]" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageLoaderModal;
