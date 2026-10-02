import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { TripleWaveEmblem } from '../../components/common/TripleWaveLogo';
import {
  Sparkles,
  Flame,
  Snowflake,
  ArrowRight,
  Coffee,
  RotateCw,
  Award,
  Zap,
} from 'lucide-react';

export const HeroSection = () => {
  const { startPageTransition } = usePageLoader();
  const [activeTempMode, setActiveTempMode] = useState('COOL'); // 'COOL' | 'HOT'
  const [bottleAngle, setBottleAngle] = useState(0);
  const canvasRef = useRef(null);

  // Auto slow rotation & particles
  useEffect(() => {
    let animId;
    let angle = 0;
    const updateRotation = () => {
      angle = (angle + 0.3) % 360;
      setBottleAngle(angle);
      animId = requestAnimationFrame(updateRotation);
    };
    animId = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Ambient floating particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.8 - 0.2,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = canvas.height;
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
    return () => cancelAnimationFrame(animId);
  }, [activeTempMode]);

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center bg-[#2A1B16] text-[#F4E8D1] overflow-hidden">
      {/* Background Radial Atmosphere */}
      <div className="absolute inset-0 bg-radial-luxury opacity-95 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#EEDCC6_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Floating Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Huge Luxury Typography & CTAs */}
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
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight uppercase leading-none text-[#F4E8D1]">
                HOT.<br />
                COOL.<br />
                <span className="text-[#EEDCC6] text-stroke-subtle">SHAKE.</span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-mono font-bold tracking-widest text-[#EEDCC6] uppercase pt-2">
                YOUR COFFEE. YOUR WAY.
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base text-[#EEDCC6]/85 font-sans leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Discover a new generation of coffee crafted around the way you want to drink it. Calibrate single-origin extracts, rare flavor notes, and precision temperatures in our virtual laboratory.
            </motion.p>

            {/* Interactive Temperature Mode Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="inline-flex p-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/20 shadow-md"
            >
              <button
                type="button"
                onClick={() => setActiveTempMode('HOT')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all ${
                  activeTempMode === 'HOT'
                    ? 'bg-[#2A1B16] text-[#EEDCC6] shadow-coffee-glow border border-[#EEDCC6]/30'
                    : 'text-[#EEDCC6]/60 hover:text-[#F4E8D1]'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-[#EEDCC6]" />
                <span>HOT (68°C)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTempMode('COOL')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all ${
                  activeTempMode === 'COOL'
                    ? 'bg-[#2A1B16] text-[#EEDCC6] shadow-coffee-glow border border-[#EEDCC6]/30'
                    : 'text-[#EEDCC6]/60 hover:text-[#F4E8D1]'
                }`}
              >
                <Snowflake className="w-3.5 h-3.5 text-[#EEDCC6]" />
                <span>COOL (04°C)</span>
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
                className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#EEDCC6] to-[#F4E8D1] text-[#2A1B16] font-mono text-xs sm:text-sm font-black tracking-widest uppercase shadow-coffee-glow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <span>MAKE YOUR COFFEE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => startPageTransition('/menu', 'INTERNATIONAL MENU')}
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-[#3C2A21] hover:bg-[#3C2A21]/80 text-[#F4E8D1] font-mono text-xs sm:text-sm font-bold tracking-widest uppercase border border-[#EEDCC6]/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>EXPLORE MENU</span>
              </button>
            </motion.div>

            {/* Quick Stats Metric Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#EEDCC6]/15 text-center lg:text-left">
              <div>
                <div className="text-xl sm:text-2xl font-display font-black text-[#F4E8D1]">15+</div>
                <div className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase">Global Flavors</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-display font-black text-[#F4E8D1]">04°C / 68°C</div>
                <div className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase">Calibrated Range</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-display font-black text-[#F4E8D1]">100%</div>
                <div className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase">Circular Steel</div>
              </div>
            </div>
          </div>

          {/* Right Column: Center Interactive Beverage Bottle Visualization */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            {/* Ambient Back Glow */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#EEDCC6]/10 blur-3xl pointer-events-none animate-pulse-slow" />

            {/* Orbiting Triple-Wave Badge */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
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
              transition={{ duration: 1 }}
              className="relative z-20 flex flex-col items-center"
            >
              {/* Temperature Badge Floating */}
              <motion.div
                key={activeTempMode}
                initial={{ scale: 0.8, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="mb-4 px-4 py-1.5 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/40 shadow-coffee-glow flex items-center space-x-2 text-xs font-mono font-bold text-[#EEDCC6]"
              >
                {activeTempMode === 'HOT' ? (
                  <>
                    <Flame className="w-4 h-4 text-[#EEDCC6] animate-pulse" />
                    <span>THERMAL EXTRACT • 68°C</span>
                  </>
                ) : (
                  <>
                    <Snowflake className="w-4 h-4 text-[#EEDCC6] animate-pulse" />
                    <span>CRYOGENIC CHILL • 04°C</span>
                  </>
                )}
              </motion.div>

              {/* Realistic Animated Vessel */}
              <div className="relative w-44 sm:w-52 h-84 sm:h-96 rounded-[42px] border-4 border-[#EEDCC6]/30 bg-[#3C2A21]/70 shadow-espresso-dark overflow-hidden flex flex-col justify-end p-2 backdrop-blur-md">
                {/* Cap & Spout */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-7 bg-[#2A1B16] rounded-b-xl border-b-2 border-[#EEDCC6]/40 flex items-center justify-center z-30">
                  <div className="w-10 h-1.5 bg-[#EEDCC6]/40 rounded-full" />
                </div>

                {/* Glass Light Reflection Strip */}
                <div className="absolute top-6 left-4 w-3.5 h-64 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-full z-20 pointer-events-none" />

                {/* Liquid Base with Viscous Wave */}
                <div
                  className="w-full h-4/5 rounded-[32px] bg-gradient-to-t from-[#2A1B16] via-[#3C2A21] to-[#543A2C] relative overflow-hidden flex items-center justify-center"
                >
                  {/* Internal Crema Motion */}
                  <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-[#C68B59] via-[#EEDCC6] to-[#C68B59] opacity-70 animate-pulse" />

                  {/* Centered Laser Etched Triple-Wave Logo */}
                  <div className="p-3 rounded-full bg-[#2A1B16]/90 border border-[#EEDCC6]/40 shadow-md">
                    <TripleWaveEmblem size={56} animate />
                  </div>
                </div>

                {/* Bottom Telemetry Plate */}
                <div className="absolute bottom-3 inset-x-4 flex justify-between items-center text-[9px] font-mono text-[#EEDCC6]/70 z-30">
                  <span>HCS-500ML</span>
                  <span>{activeTempMode === 'HOT' ? 'HOT INFUSION' : 'CRYO LOCK'}</span>
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
