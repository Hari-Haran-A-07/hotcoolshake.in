import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { TripleWaveEmblem } from '../../components/common/TripleWaveLogo';
import {
  Sparkles,
  Flame,
  Snowflake,
  ArrowRight,
  Coffee,
  RotateCw,
  Compass,
  Zap,
} from 'lucide-react';

export const HeroSection = () => {
  const { startPageTransition } = usePageLoader();
  const [activeTempMode, setActiveTempMode] = useState('HOT'); // 'HOT' | 'COOL'
  const [bottleAngle, setBottleAngle] = useState(0);
  const canvasRef = useRef(null);

  // Auto slow rotation & particles
  useEffect(() => {
    let animId;
    let angle = 0;
    const updateRotation = () => {
      angle = (angle + 0.25) % 360;
      setBottleAngle(angle);
      animId = requestAnimationFrame(updateRotation);
    };
    animId = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Ambient floating particles canvas (steam particles for HOT, ice sparkles for COOL)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: activeTempMode === 'HOT' ? -Math.random() * 0.9 - 0.3 : Math.random() * 0.6 + 0.2,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (activeTempMode === 'HOT' && p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        } else if (activeTempMode === 'COOL' && p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = activeTempMode === 'HOT'
          ? `rgba(214, 160, 106, ${p.opacity * 0.8})`
          : `rgba(103, 217, 208, ${p.opacity * 0.85})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTempMode]);

  return (
    <section className="relative min-h-screen pt-28 sm:pt-32 pb-16 flex items-center justify-center bg-[#071A2B] text-[#F7FAF9] overflow-hidden">
      {/* Background Radial Luxury Gradient */}
      <div className="absolute inset-0 bg-radial-navy opacity-95 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#67D9D0_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Floating Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bold Editorial Typography & Interactive Controls */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0B2538] border border-[#B8783E]/40 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#67D9D0] animate-spin-slow" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#D6A06A] uppercase">
                THE BESPOKE COFFEE REVOLUTION
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-1"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight uppercase leading-none text-[#F7FAF9]">
                HOT.<br />
                COOL.<br />
                <span className="text-brand-gradient">SHAKE.</span>
              </h1>
              <p className="text-lg sm:text-xl font-mono font-bold tracking-widest text-[#D6A06A] uppercase pt-3">
                "Your coffee. Your temperature. Your flavour. Your creation."
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base text-[#A8B0B4] font-sans leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Step into an international coffee laboratory where precision thermal extraction meets sub-zero cryogenic chilling and sonic vortex blending. Don't just settle for an ordinary drink. Engineer your signature cup.
            </motion.p>

            {/* Interactive Temperature Mode Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="inline-flex p-1.5 rounded-full bg-[#0B2538] border border-[#67D9D0]/25 shadow-md"
            >
              <button
                type="button"
                onClick={() => setActiveTempMode('HOT')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all ${
                  activeTempMode === 'HOT'
                    ? 'bg-[#B8783E] text-[#071A2B] shadow-bronze-glow font-black'
                    : 'text-[#F7FAF9]/70 hover:text-[#F7FAF9]'
                }`}
              >
                <Flame className={`w-4 h-4 ${activeTempMode === 'HOT' ? 'text-[#071A2B]' : 'text-[#B8783E]'}`} />
                <span>HOT (68°C STEAM)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTempMode('COOL')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all ${
                  activeTempMode === 'COOL'
                    ? 'bg-[#67D9D0] text-[#071A2B] shadow-teal-glow font-black'
                    : 'text-[#F7FAF9]/70 hover:text-[#F7FAF9]'
                }`}
              >
                <Snowflake className={`w-4 h-4 ${activeTempMode === 'COOL' ? 'text-[#071A2B]' : 'text-[#67D9D0]'}`} />
                <span>COOL (04°C CRYO)</span>
              </button>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
            >
              <button
                onClick={() => startPageTransition('/make-your-coffee', 'VIRTUAL COFFEE LAB')}
                data-cursor="create"
                className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs sm:text-sm font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <span>MAKE YOUR COFFEE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => startPageTransition('/menu', 'INTERNATIONAL MENU')}
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-[#0B2538] hover:bg-[#0B2538]/80 text-[#F7FAF9] font-mono text-xs sm:text-sm font-bold tracking-widest uppercase border border-[#67D9D0]/30 hover:border-[#67D9D0] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>EXPLORE OUR COFFEE</span>
              </button>
            </motion.div>

            {/* Quick Stats Metric Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#0B2538] text-center lg:text-left">
              <div>
                <div className="text-xl sm:text-2xl font-display font-black text-[#F7FAF9]">15+</div>
                <div className="text-[10px] font-mono text-[#A8B0B4] uppercase">Global Flavours</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-display font-black text-[#67D9D0]">04°C / 68°C</div>
                <div className="text-[10px] font-mono text-[#A8B0B4] uppercase">Precision Dual Range</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-display font-black text-[#D6A06A]">100%</div>
                <div className="text-[10px] font-mono text-[#A8B0B4] uppercase">Circular Eco Vessels</div>
              </div>
            </div>
          </div>

          {/* Right Column: Center Interactive Beverage Bottle Visualization */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            {/* Ambient Back Glow */}
            <div
              className={`absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
                activeTempMode === 'HOT' ? 'bg-[#B8783E]/20' : 'bg-[#67D9D0]/20'
              }`}
            />

            {/* Orbiting Triple-Wave Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-[#B8783E]/25 border-dashed pointer-events-none"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 p-2 rounded-full bg-[#071A2B] border border-[#67D9D0] shadow-md">
                <TripleWaveEmblem size={24} />
              </div>
            </motion.div>

            {/* Central Bottle Display */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-20 flex flex-col items-center"
            >
              {/* Temperature Badge Floating */}
              <motion.div
                key={activeTempMode}
                initial={{ scale: 0.8, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className={`mb-4 px-4 py-1.5 rounded-full bg-[#0B2538] border shadow-lg flex items-center space-x-2 text-xs font-mono font-bold ${
                  activeTempMode === 'HOT'
                    ? 'border-[#B8783E] text-[#D6A06A] shadow-bronze-glow'
                    : 'border-[#67D9D0] text-[#67D9D0] shadow-teal-glow'
                }`}
              >
                {activeTempMode === 'HOT' ? (
                  <>
                    <Flame className="w-4 h-4 text-[#B8783E] animate-pulse" />
                    <span>THERMAL INFUSION • 68°C</span>
                  </>
                ) : (
                  <>
                    <Snowflake className="w-4 h-4 text-[#67D9D0] animate-pulse" />
                    <span>CRYOGENIC CHILL • 04°C</span>
                  </>
                )}
              </motion.div>

              {/* Realistic Animated Vessel */}
              <div className="relative w-48 sm:w-56 h-88 sm:h-96 rounded-[44px] border-4 border-[#B8783E]/40 bg-[#0B2538]/80 shadow-2xl overflow-hidden flex flex-col justify-end p-2.5 backdrop-blur-lg">
                {/* Cap & Spout */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-7 bg-[#071A2B] rounded-b-xl border-b-2 border-[#B8783E]/50 flex items-center justify-center z-30">
                  <div className="w-10 h-1 bg-[#67D9D0]/60 rounded-full" />
                </div>

                {/* Steam effect if HOT */}
                {activeTempMode === 'HOT' && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-16 pointer-events-none z-40">
                    <div className="w-full h-full bg-gradient-to-t from-[#B8783E]/40 to-transparent blur-md rounded-full animate-steam" />
                  </div>
                )}

                {/* Condensation & frost if COOL */}
                {activeTempMode === 'COOL' && (
                  <div className="absolute inset-0 bg-[radial-gradient(#67D9D0_1px,transparent_1px)] [background-size:8px_8px] opacity-25 z-25 pointer-events-none" />
                )}

                {/* Glass Light Reflection Strip */}
                <div className="absolute top-6 left-4 w-3.5 h-64 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-full z-20 pointer-events-none" />

                {/* Liquid Base with Viscous Wave */}
                <div
                  className={`w-full h-4/5 rounded-[34px] relative overflow-hidden flex items-center justify-center transition-all duration-700 ${
                    activeTempMode === 'HOT'
                      ? 'bg-gradient-to-t from-[#071A2B] via-[#15191C] to-[#B8783E]/60'
                      : 'bg-gradient-to-t from-[#071A2B] via-[#0B2538] to-[#168C8A]/70'
                  }`}
                >
                  {/* Internal Crema Motion */}
                  <div
                    className={`absolute top-0 inset-x-0 h-4 bg-gradient-to-r opacity-80 animate-pulse ${
                      activeTempMode === 'HOT'
                        ? 'from-[#B8783E] via-[#D6A06A] to-[#B8783E]'
                        : 'from-[#168C8A] via-[#67D9D0] to-[#168C8A]'
                    }`}
                  />

                  {/* Centered Laser Etched Triple-Wave Logo */}
                  <div className="p-3.5 rounded-full bg-[#071A2B]/90 border border-[#B8783E]/50 shadow-md">
                    <TripleWaveEmblem size={56} animate />
                  </div>
                </div>

                {/* Bottom Telemetry Plate */}
                <div className="absolute bottom-3 inset-x-4 flex justify-between items-center text-[9px] font-mono text-[#A8B0B4] z-30">
                  <span>HCS-500ML</span>
                  <span className={activeTempMode === 'HOT' ? 'text-[#D6A06A]' : 'text-[#67D9D0]'}>
                    {activeTempMode === 'HOT' ? 'THERMAL BLOOM' : 'CRYO NITRO'}
                  </span>
                </div>
              </div>

              {/* Floor Shadow */}
              <div className="w-48 h-5 bg-black/60 rounded-full blur-md mt-4" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
