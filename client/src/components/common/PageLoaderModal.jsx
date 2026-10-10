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
        className="fixed inset-0 z-[9990] flex items-center justify-center bg-[#2A1B16] text-[#F4E8D1] overflow-hidden select-none"
      >
        {/* Ambient Coffee & Steam Atmosphere */}
        <div className="absolute inset-0 bg-radial-coffee opacity-95 pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#EEDCC6_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

        {/* Floating Steam Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-[#EEDCC6]/20 to-[#3C2A21]/30 rounded-full blur-3xl animate-pulse-glow" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
          {/* Pulsing Triple-Wave Emblem */}
          <div className="relative mb-6">
            <div className="absolute -inset-4 rounded-full bg-[#EEDCC6]/15 blur-xl animate-ping opacity-30" />
            <motion.div
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="relative p-4 rounded-full bg-[#3C2A21] border-2 border-[#EEDCC6] shadow-cream-glow"
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
            <span className="text-[10px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-3 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30">
              HOT COOL SHAKE
            </span>
          </motion.div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F4E8D1] font-display mt-2 mb-1 uppercase">
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
              className="text-xs font-mono tracking-widest text-[#EEDCC6] uppercase flex items-center justify-center space-x-2 font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EEDCC6] animate-spin-slow" />
              <span>{currentMessage || 'PREPARING YOUR EXPERIENCE...'}</span>
            </motion.p>
          </div>

          {/* Gradient Liquid Fill Progress Bar */}
          <div className="w-full max-w-xs mt-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-[#EEDCC6]/80 mb-2">
              <span>EXPERIENCE INITIALIZATION</span>
              <span className="font-bold text-[#F4E8D1]">{progress}%</span>
            </div>
            
            <div className="relative h-2 w-full bg-[#3C2A21] rounded-full overflow-hidden border border-[#EEDCC6]/30 p-0.5">
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
            className="mt-8 flex items-center space-x-2 px-5 py-2 text-xs font-mono tracking-wider text-[#EEDCC6]/80 hover:text-[#F4E8D1] bg-[#3C2A21]/90 hover:bg-[#3C2A21] border border-[#EEDCC6]/30 rounded-full transition-all duration-200"
          >
            <span>PROCEED IMMEDIATELY</span>
            <FastForward className="w-3.5 h-3.5 text-[#EEDCC6]" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageLoaderModal;
