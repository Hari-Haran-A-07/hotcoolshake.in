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
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#2A1B16] text-[#F4E8D1] overflow-hidden"
      >
        {/* Ambient Coffee Steam & Vignette */}
        <div className="absolute inset-0 bg-radial-luxury opacity-90" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#EEDCC6_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Floating Steam Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#EEDCC6]/5 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
          {/* Pulsing Triple-Wave Emblem with Golden Glow */}
          <div className="relative mb-8">
            <div className="absolute -inset-4 rounded-full bg-[#EEDCC6]/10 blur-xl animate-ping opacity-30" />
            <motion.div
              animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="relative p-3 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 shadow-coffee-glow"
            >
              <TripleWaveEmblem size={76} />
            </motion.div>
          </div>

          {/* Experience Title */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-2"
          >
            <span className="text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-3 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/20">
              HOT COOL SHAKE • LAB TRANSITION
            </span>
          </motion.div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F4E8D1] font-display mt-2 mb-1">
            {experienceTitle}
          </h3>

          {/* Rotating Micro-Copy */}
          <div className="h-6 overflow-hidden my-3">
            <motion.p
              key={currentMessage}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-mono tracking-wider text-[#EEDCC6]/80 flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EEDCC6] animate-spin-slow" />
              <span>{currentMessage}</span>
            </motion.p>
          </div>

          {/* Viscous Coffee Liquid Fill Progress Bar */}
          <div className="w-full max-w-xs mt-4">
            <div className="flex justify-between items-center text-[11px] font-mono text-[#EEDCC6]/70 mb-2">
              <span>EXTRACTION TELEMETRY</span>
              <span className="font-bold text-[#F4E8D1]">{progress}%</span>
            </div>
            
            <div className="relative h-2 w-full bg-[#3C2A21] rounded-full overflow-hidden border border-[#EEDCC6]/30 p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#3C2A21] via-[#EEDCC6] to-[#F4E8D1] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>

          {/* Fast-Forward / Skip Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={skipLoader}
            className="mt-8 flex items-center space-x-2 px-4 py-2 text-xs font-mono tracking-wider text-[#EEDCC6]/70 hover:text-[#F4E8D1] bg-[#3C2A21]/60 hover:bg-[#3C2A21] border border-[#EEDCC6]/20 rounded-full transition-all duration-200"
          >
            <span>FAST-FORWARD</span>
            <FastForward className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageLoaderModal;
