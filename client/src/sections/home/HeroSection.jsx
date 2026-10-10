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
  Droplets,
  Zap,
  Play,
} from 'lucide-react';

export const HeroSection = () => {
  const { startPageTransition } = usePageLoader();
  const [activeTempMode, setActiveTempMode] = useState('HOT'); // 'HOT' | 'COOL'
  const [pourProgress, setPourProgress] = useState(0); // 0 to 100 for simulated pour
  const [isPouring, setIsPouring] = useState(true);
  const canvasRef = useRef(null);

  // Pour animation sequence
  useEffect(() => {
    let interval;
    const startPour = () => {
      setPourProgress(0);
      setIsPouring(true);
      let p = 0;
      interval = setInterval(() => {
        p += 2;
        setPourProgress(Math.min(p, 100));
        if (p >= 100) {
          clearInterval(interval);
          setIsPouring(false);
        }
      }, 50);
    };

    startPour();
    return () => clearInterval(interval);
  }, [activeTempMode]);

  // Ambient floating particles canvas:
  // HOT: UPWARD rising steam particles
  // COOL: DOWNWARD / FLOATING ice crystal particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
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
          ? `rgba(238, 220, 198, ${p.opacity * 0.7})`
          : `rgba(244, 232, 209, ${p.opacity * 0.8})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [activeTempMode]);

  return (
    <section className="relative min-h-screen pt-28 sm:pt-32 pb-20 flex items-center justify-center bg-[#2A1B16] text-[#F4E8D1] overflow-hidden">
      {/* Background Radial Luxury Gradient */}
      <div className="absolute inset-0 bg-radial-coffee opacity-95 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#EEDCC6_1px,transparent_1px)] [background-size:32px_32px]" />

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
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#EEDCC6] animate-spin-slow" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
                THE INTERNATIONAL COFFEE EXPERIENCE
              </span>
            </motion.div>

            {/* Main Headline (Master Prompt Section 10) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight uppercase leading-none text-[#F4E8D1]">
                HOT.<br />
                COOL.<br />
                <span className="text-brand-gradient">SHAKE.</span>
              </h1>
              <p className="text-base sm:text-xl font-mono font-bold tracking-widest text-[#EEDCC6] uppercase pt-2">
                COFFEE, REIMAGINED AROUND YOUR TASTE.
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base text-[#EEDCC6]/85 font-sans leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Discover precision thermal extraction, sub-zero cryogenic chilling, and sonic vortex beverage blending. Customize your vessel, craft your flavor alchemy, and order ahead for pickup or zero-emission delivery.
            </motion.p>

            {/* Interactive Temperature Mode Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="inline-flex p-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/25 shadow-md"
            >
              <button
                type="button"
                onClick={() => setActiveTempMode('HOT')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all ${
                  activeTempMode === 'HOT'
                    ? 'bg-[#EEDCC6] text-[#2A1B16] shadow-cream-glow font-black'
                    : 'text-[#F4E8D1]/70 hover:text-[#F4E8D1]'
                }`}
              >
                <Flame className={`w-4 h-4 ${activeTempMode === 'HOT' ? 'text-[#2A1B16]' : 'text-[#EEDCC6]'}`} />
                <span>HOT (68°C STEAM)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTempMode('COOL')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all ${
                  activeTempMode === 'COOL'
                    ? 'bg-[#F4E8D1] text-[#2A1B16] shadow-cream-glow font-black'
                    : 'text-[#F4E8D1]/70 hover:text-[#F4E8D1]'
                }`}
              >
                <Snowflake className={`w-4 h-4 ${activeTempMode === 'COOL' ? 'text-[#2A1B16]' : 'text-[#F4E8D1]'}`} />
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
                onClick={() => startPageTransition('/make-your-coffee', 'COFFEE LAB')}
                data-cursor="create"
                className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-brand-gradient text-[#2A1B16] font-mono text-xs sm:text-sm font-black tracking-widest uppercase shadow-cream-glow hover:brightness-105 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <span>MAKE YOUR COFFEE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => startPageTransition('/menu', 'EXPLORE MENU')}
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-[#3C2A21] hover:bg-[#3C2A21]/80 text-[#F4E8D1] font-mono text-xs sm:text-sm font-bold tracking-widest uppercase border border-[#EEDCC6]/30 hover:border-[#EEDCC6] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>EXPLORE THE MENU</span>
              </button>
            </motion.div>

            {/* Quick Stats Metric Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#3C2A21] text-center lg:text-left">
              <div>
                <div className="text-xl sm:text-2xl font-display font-black text-[#F4E8D1]">15+</div>
                <div className="text-[10px] font-mono text-[#EEDCC6]/80 uppercase">Global Flavours</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-display font-black text-[#EEDCC6]">04°C / 68°C</div>
                <div className="text-[10px] font-mono text-[#EEDCC6]/80 uppercase">Thermal Precision</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-display font-black text-[#F4E8D1]">100%</div>
                <div className="text-[10px] font-mono text-[#EEDCC6]/80 uppercase">Circular Eco Vessels</div>
              </div>
            </div>
          </div>

          {/* Right Column: Center Interactive Beverage Bottle Automation */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            {/* Ambient Back Glow */}
            <div
              className={`absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
                activeTempMode === 'HOT' ? 'bg-[#EEDCC6]/15' : 'bg-[#F4E8D1]/15'
              }`}
            />

            {/* Orbiting Triple-Wave Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
              className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-[#EEDCC6]/20 border-dashed pointer-events-none"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 p-2 rounded-full bg-[#2A1B16] border border-[#EEDCC6] shadow-md">
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
                className={`mb-4 px-4 py-1.5 rounded-full bg-[#3C2A21] border shadow-lg flex items-center space-x-2 text-xs font-mono font-bold ${
                  activeTempMode === 'HOT'
                    ? 'border-[#EEDCC6] text-[#EEDCC6] shadow-cream-glow'
                    : 'border-[#F4E8D1] text-[#F4E8D1] shadow-cream-glow'
                }`}
              >
                {activeTempMode === 'HOT' ? (
                  <>
                    <Flame className="w-4 h-4 text-[#EEDCC6] animate-pulse" />
                    <span>THERMAL EXTRACTION • 68°C</span>
                  </>
                ) : (
                  <>
                    <Snowflake className="w-4 h-4 text-[#F4E8D1] animate-pulse" />
                    <span>CRYOGENIC CHILL • 04°C</span>
                  </>
                )}
              </motion.div>

              {/* Realistic Animated Vessel with Liquid Pour & Fill Automation */}
              <div className="relative w-52 sm:w-60 h-96 sm:h-[420px] rounded-[48px] border-4 border-[#EEDCC6]/40 bg-[#3C2A21]/80 shadow-2xl overflow-hidden flex flex-col justify-end p-3 backdrop-blur-lg">
                {/* Simulated Coffee Stream Entering Bottle during Pour */}
                {isPouring && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: '50%', opacity: 0.85 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-3 bg-gradient-to-b from-[#EEDCC6] via-[#2A1B16] to-[#3C2A21] rounded-full z-30 pointer-events-none shadow-md"
                  />
                )}

                {/* Cap & Spout */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-22 h-7 bg-[#2A1B16] rounded-b-xl border-b-2 border-[#EEDCC6]/50 flex items-center justify-center z-30">
                  <div className="w-12 h-1 bg-[#EEDCC6]/60 rounded-full" />
                </div>

                {/* Steam effect if HOT (Rising upward) */}
                {activeTempMode === 'HOT' && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-20 pointer-events-none z-40">
                    <div className="w-full h-full bg-gradient-to-t from-[#EEDCC6]/40 via-[#F4E8D1]/20 to-transparent blur-md rounded-full animate-steam" />
                  </div>
                )}

                {/* Condensation & frost if COOL */}
                {activeTempMode === 'COOL' && (
                  <div className="absolute inset-0 bg-[radial-gradient(#F4E8D1_1px,transparent_1px)] [background-size:8px_8px] opacity-25 z-25 pointer-events-none" />
                )}

                {/* Glass Light Reflection Strip */}
                <div className="absolute top-6 left-4 w-3.5 h-72 bg-gradient-to-b from-white/35 via-white/10 to-transparent rounded-full z-20 pointer-events-none" />

                {/* Liquid Level with Turbulence & Waves */}
                <motion.div
                  className={`w-full rounded-[38px] relative overflow-hidden flex items-center justify-center transition-all duration-700 ${
                    activeTempMode === 'HOT'
                      ? 'bg-gradient-to-t from-[#1E120E] via-[#2A1B16] to-[#3C2A21]'
                      : 'bg-gradient-to-t from-[#1E120E] via-[#2A1B16] to-[#4A352B]'
                  }`}
                  style={{ height: `${Math.max(pourProgress, 25)}%` }}
                >
                  {/* Crema Surface Turbulence */}
                  <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-[#EEDCC6]/40 via-[#F4E8D1]/60 to-[#EEDCC6]/40 animate-pulse" />

                  {/* Bubbles rising inside liquid */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                      animate={{ y: [20, -40], opacity: [0, 0.8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute bottom-4 left-1/3 w-2 h-2 rounded-full bg-[#EEDCC6]/60"
                    />
                    <motion.div
                      animate={{ y: [30, -50], opacity: [0, 0.6, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.6, ease: 'linear' }}
                      className="absolute bottom-6 right-1/3 w-1.5 h-1.5 rounded-full bg-[#F4E8D1]/60"
                    />
                  </div>

                  {/* Centered Laser Etched Triple-Wave Logo */}
                  <div className="p-3.5 rounded-full bg-[#2A1B16]/90 border border-[#EEDCC6]/40 shadow-md z-10">
                    <TripleWaveEmblem size={56} animate />
                  </div>
                </motion.div>

                {/* Bottom Telemetry Plate */}
                <div className="absolute bottom-3 inset-x-4 flex justify-between items-center text-[9px] font-mono text-[#EEDCC6]/80 z-30">
                  <span>HCS-500ML</span>
                  <span className="text-[#EEDCC6] font-bold">
                    {activeTempMode === 'HOT' ? 'THERMAL BLOOM' : 'CRYO NITRO'}
                  </span>
                </div>
              </div>

              {/* Floor Shadow */}
              <div className="w-52 h-5 bg-black/70 rounded-full blur-md mt-4" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
