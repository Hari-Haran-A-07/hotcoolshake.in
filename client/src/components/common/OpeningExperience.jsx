import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TripleWaveEmblem } from './TripleWaveLogo';
import { Volume2, VolumeX, SkipForward, Sparkles, Flame, Snowflake } from 'lucide-react';

export const OpeningExperience = ({ onComplete }) => {
  const [phase, setPhase] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [fillPercentage, setFillPercentage] = useState(0);
  const [temperatureState, setTemperatureState] = useState('HOT'); // 'HOT' | 'COOL'
  const canvasRef = useRef(null);

  // Cinematic progression through the 12 opening phases
  useEffect(() => {
    // Phase 1 -> 2: Dark Minimal Space to Bottle Appearance
    const t1 = setTimeout(() => setPhase(2), 400);

    // Phase 3, 4, 5: Viscous Stream & Coffee Pours into Vessel
    const t2 = setTimeout(() => {
      setPhase(3);
      let fill = 0;
      const fillInterval = setInterval(() => {
        fill += 2.5;
        setFillPercentage(Math.min(fill, 100));

        // Phase 6: Turbulence & Bubble Physics
        if (fill >= 45 && phase < 6) {
          setPhase(6);
        }

        // Phase 7: Steam (HOT) & Phase 8: Condensation (COOL)
        if (fill >= 100) {
          clearInterval(fillInterval);
          setPhase(7); // Hot Steam
          setTimeout(() => {
            setTemperatureState('COOL');
            setPhase(8); // Cryo Condensation & Frost
          }, 900);
          setTimeout(() => setPhase(9), 1700); // Triple-Wave Emblem reveals
          setTimeout(() => setPhase(10), 2400); // HOT COOL SHAKE Logo
          setTimeout(() => setPhase(11), 3100); // Tagline: "HOT. COOL. YOUR WAY."
          setTimeout(() => {
            setPhase(12); // Smooth Fade & Homepage Reveal
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 700);
          }, 4000);
        }
      }, 40);
    }, 1100);

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
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * 140,
        y: Math.random() * 260,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1.8 + 0.6,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (phase >= 4 && fillPercentage > 10) {
        particles.forEach((p) => {
          p.y -= p.speed;
          if (p.y < 280 - (fillPercentage / 100) * 260) {
            p.y = 260;
            p.x = Math.random() * 140;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle =
            temperatureState === 'HOT'
              ? `rgba(238, 220, 198, ${p.opacity * 0.6})`
              : `rgba(244, 232, 209, ${p.opacity * 0.75})`;
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
          exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#2A1B16] text-[#F4E8D1] overflow-hidden select-none"
        >
          {/* Minimal Dark Ambient Radial Espresso Glow */}
          <div className="absolute inset-0 bg-radial-luxury opacity-95 pointer-events-none" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#EEDCC6_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

          {/* Top Controls Bar */}
          <div className="absolute top-6 right-6 z-30 flex items-center space-x-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2.5 rounded-full bg-[#3C2A21] hover:bg-[#3C2A21]/80 text-[#EEDCC6] border border-[#EEDCC6]/20 transition-colors"
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleSkip}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#EEDCC6] text-[#2A1B16] text-xs font-mono tracking-wider font-bold hover:bg-[#F4E8D1] shadow-coffee-glow transition-all"
            >
              <span>ENTER EXPERIENCE</span>
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center Stage Bottle & Liquid Animation */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Viscous Liquid Pour Stream (Phases 3, 4, 5, 6) */}
            {phase >= 3 && fillPercentage < 100 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 130, opacity: 1 }}
                className="w-2.5 rounded-full bg-gradient-to-b from-[#EEDCC6] via-[#3C2A21] to-[#2A1B16] absolute -top-32 left-1/2 -translate-x-1/2 z-20 shadow-md"
              />
            )}

            {/* Steam Effect for HOT Phase (Phase 7) */}
            <AnimatePresence>
              {phase === 7 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -30, scale: 1.1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none"
                >
                  <div className="w-14 h-16 bg-gradient-to-t from-[#EEDCC6]/40 to-transparent blur-md rounded-full" />
                  <div className="flex items-center space-x-1 mt-1 text-[#EEDCC6]">
                    <Flame className="w-3.5 h-3.5 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest font-bold uppercase">
                      THERMAL BLOOM 68°C
                    </span>
                  </div>
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
                  <div className="flex items-center space-x-1.5 text-[#EEDCC6]">
                    <Snowflake className="w-4 h-4 animate-spin-slow" />
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#EEDCC6] font-bold uppercase mt-1">
                    CRYOGENIC LOCK 04°C
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Centered Realistic Bottle Silhouette (Phase 2+) */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-40 h-80 rounded-[38px] border-4 border-[#EEDCC6]/40 bg-[#3C2A21]/70 shadow-espresso-dark overflow-hidden flex flex-col justify-end p-2 backdrop-blur-md"
            >
              {/* Bottle Cap */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-18 h-6 bg-[#2A1B16] rounded-b-xl z-30 border-b border-[#EEDCC6]/40 flex items-center justify-center">
                <div className="w-9 h-1 bg-[#EEDCC6]/40 rounded-full" />
              </div>

              {/* Glass Highlight Reflection */}
              <div className="absolute top-4 left-3 w-3.5 h-56 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-full z-20 pointer-events-none" />

              {/* Liquid Canvas for Turbulence & Bubbles */}
              <canvas
                ref={canvasRef}
                width={150}
                height={300}
                className="absolute inset-0 z-10 pointer-events-none"
              />

              {/* Viscous Coffee Liquid Rising Level */}
              <motion.div
                className="w-full rounded-[28px] bg-gradient-to-t from-[#2A1B16] via-[#3C2A21] to-[#543A2C] relative overflow-hidden"
                style={{ height: `${fillPercentage}%` }}
                transition={{ ease: 'easeOut' }}
              >
                {/* Surface Crema Wave */}
                <div className="absolute top-0 inset-x-0 h-3.5 bg-gradient-to-r from-[#C68B59] via-[#EEDCC6] to-[#C68B59] opacity-80 animate-pulse" />
              </motion.div>

              {/* Emblem Stamp on Bottle (Phase 9+) */}
              {phase >= 9 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 14 }}
                  className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                >
                  <div className="p-3 rounded-full bg-[#2A1B16]/95 border border-[#EEDCC6] shadow-coffee-glow">
                    <TripleWaveEmblem size={52} />
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Orbiting Triple-Wave Rings (Phase 9+) */}
            {phase >= 9 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1.15, rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute w-84 h-84 rounded-full border border-dashed border-[#EEDCC6]/20 pointer-events-none"
              />
            )}
          </div>

          {/* Brand Typography & Tagline Reveal (Phases 10, 11) */}
          <div className="mt-8 text-center h-24 flex flex-col items-center justify-center">
            {phase >= 10 && (
              <motion.h1
                initial={{ y: 20, opacity: 0, letterSpacing: '0.2em' }}
                animate={{ y: 0, opacity: 1, letterSpacing: '0.3em' }}
                transition={{ duration: 0.6 }}
                className="font-display font-black text-3xl sm:text-4xl text-[#F4E8D1] uppercase"
              >
                HOT COOL SHAKE
              </motion.h1>
            )}

            {phase >= 11 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-mono text-xs sm:text-sm tracking-[0.35em] text-[#EEDCC6] uppercase font-bold mt-2"
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
