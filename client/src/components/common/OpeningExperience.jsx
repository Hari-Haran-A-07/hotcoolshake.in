import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TripleWaveEmblem } from './TripleWaveLogo';
import { Volume2, VolumeX, SkipForward, Sparkles } from 'lucide-react';

export const OpeningExperience = ({ onComplete }) => {
  const [phase, setPhase] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [fillPercentage, setFillPercentage] = useState(0);
  const [temperatureState, setTemperatureState] = useState('HOT'); // 'HOT' | 'COOL'
  const canvasRef = useRef(null);

  // Accelerated progression through the 12 cinematic phases
  useEffect(() => {
    // Phase 1 -> 2: Minimal to Centered Bottle
    const t1 = setTimeout(() => setPhase(2), 500);

    // Phase 3 & 4 & 5: Stream & Liquid Filling with Viscosity
    const t2 = setTimeout(() => {
      setPhase(3);
      let fill = 0;
      const fillInterval = setInterval(() => {
        fill += 2.5;
        setFillPercentage(Math.min(fill, 100));
        if (fill >= 50 && phase < 6) {
          setPhase(6); // Phase 6: Bubbles & turbulence
        }
        if (fill >= 100) {
          clearInterval(fillInterval);
          setPhase(7); // Phase 7: Steam effect
          setTimeout(() => {
            setTemperatureState('COOL');
            setPhase(8); // Phase 8: Frost / Condensation
          }, 900);
          setTimeout(() => setPhase(9), 1700); // Phase 9: Triple-Wave Emblem forms
          setTimeout(() => setPhase(10), 2400); // Phase 10: HOT COOL SHAKE logo
          setTimeout(() => setPhase(11), 3100); // Phase 11: Tagline
          setTimeout(() => {
            setPhase(12); // Phase 12: Transition to homepage
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600);
          }, 3900);
        }
      }, 40);
    }, 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  // Canvas turbulence & bubble physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let particles = [];
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * 120,
        y: Math.random() * 200,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (phase >= 5 && fillPercentage > 10) {
        particles.forEach((p) => {
          p.y -= p.speed;
          if (p.y < 0) {
            p.y = 180;
            p.x = Math.random() * 120;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = temperatureState === 'HOT' ? 'rgba(238, 220, 198, 0.4)' : 'rgba(244, 232, 209, 0.6)';
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [phase, fillPercentage, temperatureState]);

  const handleSkip = () => {
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {phase <= 12 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F4E8D1] text-[#2A1B16] overflow-hidden select-none"
        >
          {/* Subtle Atmospheric Radial Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F4E8D1] via-[#EEDCC6]/50 to-[#F4E8D1]" />
          
          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#2A1B16_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Top Controls Bar */}
          <div className="absolute top-6 right-6 z-30 flex items-center space-x-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2.5 rounded-full bg-[#3C2A21]/10 hover:bg-[#3C2A21]/20 text-[#2A1B16] transition-colors"
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleSkip}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#2A1B16] text-[#F4E8D1] text-xs font-mono tracking-wider font-semibold hover:bg-[#3C2A21] shadow-md transition-all"
            >
              <span>ENTER NOW</span>
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center Stage Bottle & Animation */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Stream Flowing Down (Phases 3, 4, 5, 6) */}
            {phase >= 3 && fillPercentage < 100 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 110, opacity: 1 }}
                className="w-2 rounded-full bg-gradient-to-b from-[#2A1B16] to-[#3C2A21] absolute -top-28 left-1/2 -translate-x-1/2 z-20 shadow-sm"
              />
            )}

            {/* Steam Effect for HOT Phase (Phase 7) */}
            <AnimatePresence>
              {phase === 7 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -25, scale: 1.1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none"
                >
                  <div className="w-12 h-16 bg-gradient-to-t from-[#EEDCC6]/50 to-transparent blur-md rounded-full" />
                  <span className="text-[10px] font-mono tracking-widest text-[#3C2A21] font-bold uppercase mt-1">
                    THERMAL 68°C
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Frost & Condensation for COOL Phase (Phase 8) */}
            <AnimatePresence>
              {phase === 8 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none"
                >
                  <div className="flex space-x-1">
                    <Sparkles className="w-4 h-4 text-[#3C2A21] animate-pulse" />
                    <Sparkles className="w-3 h-3 text-[#3C2A21] animate-ping" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#3C2A21] font-bold uppercase mt-1">
                    CRYOGENIC 04°C
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Centered Realistic Bottle Silhouette (Phase 2+) */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-36 h-72 rounded-[32px] border-4 border-[#2A1B16] bg-[#F4E8D1]/40 shadow-espresso-dark overflow-hidden flex flex-col justify-end p-1.5 backdrop-blur-sm"
            >
              {/* Bottle Cap */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#2A1B16] rounded-b-md z-30 border-b border-[#EEDCC6]/40 flex items-center justify-center">
                <div className="w-8 h-1 bg-[#EEDCC6]/40 rounded-full" />
              </div>

              {/* Glass Highlight Reflection */}
              <div className="absolute top-4 left-3 w-3 h-48 bg-gradient-to-b from-white/60 via-white/10 to-transparent rounded-full z-20 pointer-events-none" />

              {/* Liquid Canvas for Bubbles & Viscosity */}
              <canvas
                ref={canvasRef}
                width={140}
                height={280}
                className="absolute inset-0 z-10 pointer-events-none"
              />

              {/* Viscous Coffee Liquid Rising Level */}
              <motion.div
                className="w-full rounded-[24px] bg-gradient-to-t from-[#2A1B16] via-[#3C2A21] to-[#4D362B] relative overflow-hidden"
                style={{ height: `${fillPercentage}%` }}
                transition={{ ease: 'easeOut' }}
              >
                {/* Surface Crema Wave */}
                <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-[#C68B59] via-[#EEDCC6] to-[#C68B59] opacity-80 animate-pulse" />
              </motion.div>

              {/* Emblem Stamp on Bottle (Phase 9+) */}
              {phase >= 9 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                >
                  <div className="p-2 rounded-full bg-[#2A1B16]/90 border border-[#EEDCC6] shadow-md">
                    <TripleWaveEmblem size={44} />
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Orbiting Triple-Wave Rings (Phase 9+) */}
            {phase >= 9 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1.2, rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute w-80 h-80 rounded-full border border-dashed border-[#3C2A21]/30 pointer-events-none"
              />
            )}
          </div>

          {/* Brand Typography & Tagline Reveal (Phases 10, 11) */}
          <div className="mt-8 text-center h-20 flex flex-col items-center justify-center">
            {phase >= 10 && (
              <motion.h1
                initial={{ y: 20, opacity: 0, letterSpacing: '0.2em' }}
                animate={{ y: 0, opacity: 1, letterSpacing: '0.3em' }}
                transition={{ duration: 0.6 }}
                className="font-display font-black text-2xl sm:text-3xl text-[#2A1B16] uppercase"
              >
                HOT COOL SHAKE
              </motion.h1>
            )}

            {phase >= 11 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-mono text-xs sm:text-sm tracking-[0.35em] text-[#3C2A21] uppercase font-bold mt-2"
              >
                HOT. COOL. YOUR WAY.
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpeningExperience;
