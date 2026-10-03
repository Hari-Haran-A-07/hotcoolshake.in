import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { TripleWaveEmblem } from '../../components/common/TripleWaveLogo';
import {
  Play,
  Pause,
  RotateCcw,
  Flame,
  Snowflake,
  Sparkles,
  ArrowRight,
  Droplet,
  Sliders,
  Volume2,
  VolumeX,
} from 'lucide-react';

export const CoffeeAutomationSection = () => {
  const { startPageTransition } = usePageLoader();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTemp, setActiveTemp] = useState('HOT'); // 'HOT' | 'COOL'
  const [animationStage, setAnimationStage] = useState(1); // 1 to 5 (Pour, Fill, Crema, Vortex, Ready)
  const [fillLevel, setFillLevel] = useState(0);
  const canvasRef = useRef(null);

  // Simulation sequence loop
  useEffect(() => {
    if (!isPlaying) return;

    let fill = 0;
    const interval = setInterval(() => {
      fill += 1.5;
      if (fill > 100) {
        fill = 100;
        setAnimationStage(5); // Final product centered & ready
      } else if (fill > 75) {
        setAnimationStage(4); // Swirling vortex & temperature effect
      } else if (fill > 40) {
        setAnimationStage(3); // Crema & bubbles
      } else if (fill > 10) {
        setAnimationStage(2); // Coffee pouring
      } else {
        setAnimationStage(1); // Empty vessel
      }
      setFillLevel(fill);
    }, 60);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Restart sequence
  const handleRestart = () => {
    setFillLevel(0);
    setAnimationStage(1);
    setIsPlaying(true);
  };

  // Canvas particle dynamics (bubbles and vortex stream)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    canvas.width = 160;
    canvas.height = 320;

    const bubbles = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height - Math.random() * (fillLevel * 2.8),
      radius: Math.random() * 2.5 + 1,
      speedY: Math.random() * 1.5 + 0.5,
      drift: (Math.random() - 0.5) * 1.2,
      opacity: Math.random() * 0.7 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (fillLevel > 15) {
        const liquidTop = canvas.height - (fillLevel / 100) * 260;

        bubbles.forEach((b) => {
          b.y -= b.speedY;
          b.x += b.drift;

          if (b.y < liquidTop) {
            b.y = canvas.height - 10;
            b.x = Math.random() * canvas.width;
          }

          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fillStyle = activeTemp === 'HOT'
            ? `rgba(214, 160, 106, ${b.opacity * 0.7})`
            : `rgba(103, 217, 208, ${b.opacity * 0.8})`;
          ctx.fill();
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [fillLevel, activeTemp]);

  const stages = [
    { num: 1, name: 'VESSEL ALIGNED', desc: 'Precision double-wall thermal bottle positioned.' },
    { num: 2, name: 'VISCOUS POUR', desc: 'Single-origin espresso extract streams into container.' },
    { num: 3, name: 'CREMA & MICRO-BUBBLES', desc: 'Dense aromatic crema builds across liquid surface.' },
    { num: 4, name: 'VORTEX BLENDING', desc: 'Sonic vortex mixes flavors and stabilizes temperature.' },
    { num: 5, name: 'SIGNATURE READY', desc: 'Laser-sealed and calibrated for immediate dispatch.' },
  ];

  return (
    <section className="py-24 bg-[#071A2B] text-[#F7FAF9] relative overflow-hidden border-t border-[#B8783E]/20">
      {/* Ambient background atmosphere */}
      <div className="absolute inset-0 bg-radial-navy opacity-90 pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#B8783E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-[#67D9D0]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0B2538] border border-[#67D9D0]/30 text-xs font-mono text-[#67D9D0] uppercase">
            <Droplet className="w-3.5 h-3.5 text-[#67D9D0]" />
            <span>REALISTIC COFFEE AUTOMATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight uppercase text-[#F7FAF9]">
            THE ART OF FLUID <span className="text-brand-gradient">PRECISION</span>
          </h2>

          <p className="text-sm sm:text-base text-[#A8B0B4] leading-relaxed">
            Witness our automated preparation choreography: from the viscosity of unadulterated espresso extraction to dense golden crema and cryogenic stabilization.
          </p>
        </div>

        {/* Two-Column Showcase: Stage Controller & Interactive 3D Bottle/Video Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Timeline Steps & Interactive Modes */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0B2538] border border-[#B8783E]/30">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono text-[#A8B0B4]">SIMULATE TEMPERATURE:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTemp('HOT')}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                      activeTemp === 'HOT'
                        ? 'bg-[#B8783E] text-[#071A2B] shadow-bronze-glow'
                        : 'text-[#A8B0B4] hover:text-[#F7FAF9]'
                    }`}
                  >
                    HOT 68°C
                  </button>
                  <button
                    onClick={() => setActiveTemp('COOL')}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                      activeTemp === 'COOL'
                        ? 'bg-[#67D9D0] text-[#071A2B] shadow-teal-glow'
                        : 'text-[#A8B0B4] hover:text-[#F7FAF9]'
                    }`}
                  >
                    COOL 04°C
                  </button>
                </div>
              </div>

              {/* Play / Pause / Restart */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full bg-[#071A2B] text-[#F7FAF9] border border-[#67D9D0]/30 hover:border-[#67D9D0]"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#67D9D0]" />}
                </button>
                <button
                  onClick={handleRestart}
                  className="p-2 rounded-full bg-[#071A2B] text-[#F7FAF9] border border-[#B8783E]/30 hover:border-[#B8783E]"
                  title="Restart Animation"
                >
                  <RotateCcw className="w-4 h-4 text-[#D6A06A]" />
                </button>
              </div>
            </div>

            {/* Stages Vertical Timeline */}
            <div className="space-y-3">
              {stages.map((stage) => {
                const isActive = animationStage === stage.num;
                const isPassed = animationStage > stage.num;
                return (
                  <div
                    key={stage.num}
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? 'bg-[#0B2538] border-[#67D9D0] shadow-teal-glow'
                        : isPassed
                        ? 'bg-[#0B2538]/60 border-[#B8783E]/40 text-[#A8B0B4]'
                        : 'bg-[#071A2B]/80 border-[#0B2538] text-[#A8B0B4]/60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                          isActive
                            ? 'bg-[#67D9D0] text-[#071A2B]'
                            : isPassed
                            ? 'bg-[#B8783E] text-[#071A2B]'
                            : 'bg-[#071A2B] border border-[#0B2538]'
                        }`}
                      >
                        {stage.num}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#F7FAF9]">
                            {stage.name}
                          </h4>
                          {isActive && (
                            <span className="text-[10px] font-mono text-[#67D9D0] animate-pulse">
                              ACTIVE CHOREOGRAPHY
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#A8B0B4] mt-0.5">{stage.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Call To Action */}
            <div className="pt-2">
              <button
                onClick={() => startPageTransition('/make-your-coffee', 'CREATE YOUR CUP')}
                data-cursor="create"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs sm:text-sm font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>CREATE YOUR CUP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Realistic Pouring Container & Video Integration Container */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            {/* Ambient Aura */}
            <div
              className={`absolute w-80 h-80 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
                activeTemp === 'HOT' ? 'bg-[#B8783E]/20' : 'bg-[#67D9D0]/20'
              }`}
            />

            {/* Vessel & Pour Stream Assembly */}
            <div className="relative flex flex-col items-center">
              {/* Viscous Coffee Stream Pours From Above */}
              {fillLevel > 5 && fillLevel < 98 && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 110 }}
                  className={`w-3 rounded-full absolute -top-24 left-1/2 -translate-x-1/2 z-30 shadow-lg ${
                    activeTemp === 'HOT'
                      ? 'bg-gradient-to-b from-[#B8783E] via-[#D6A06A] to-[#071A2B]'
                      : 'bg-gradient-to-b from-[#168C8A] via-[#67D9D0] to-[#071A2B]'
                  }`}
                />
              )}

              {/* Steam plume for HOT */}
              {activeTemp === 'HOT' && fillLevel > 30 && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-20 pointer-events-none z-40">
                  <div className="w-full h-full bg-gradient-to-t from-[#B8783E]/40 to-transparent blur-md rounded-full animate-steam" />
                </div>
              )}

              {/* Container Body */}
              <motion.div
                animate={{
                  rotate: fillLevel >= 95 ? [0, 2, -2, 0] : 0,
                  scale: fillLevel >= 95 ? 1.02 : 1,
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-48 sm:w-56 h-88 sm:h-96 rounded-[44px] border-4 border-[#B8783E]/40 bg-[#0B2538]/75 shadow-2xl overflow-hidden flex flex-col justify-end p-2.5 backdrop-blur-md"
              >
                {/* Cap & Spout */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-7 bg-[#071A2B] rounded-b-xl border-b-2 border-[#B8783E]/50 flex items-center justify-center z-30">
                  <div className="w-10 h-1 bg-[#67D9D0]/60 rounded-full" />
                </div>

                {/* Condensation for COOL */}
                {activeTemp === 'COOL' && fillLevel > 30 && (
                  <div className="absolute inset-0 bg-[radial-gradient(#67D9D0_1px,transparent_1px)] [background-size:6px_6px] opacity-35 z-25 pointer-events-none" />
                )}

                {/* Glass Light Reflection Strip */}
                <div className="absolute top-6 left-4 w-3.5 h-64 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-full z-20 pointer-events-none" />

                {/* Internal Liquid Canvas for Micro-Bubbles */}
                <canvas
                  ref={canvasRef}
                  width={160}
                  height={320}
                  className="absolute inset-0 z-15 pointer-events-none"
                />

                {/* Rising Liquid Column */}
                <div
                  className={`w-full rounded-[34px] relative overflow-hidden flex items-center justify-center transition-all ${
                    activeTemp === 'HOT'
                      ? 'bg-gradient-to-t from-[#071A2B] via-[#15191C] to-[#B8783E]/70'
                      : 'bg-gradient-to-t from-[#071A2B] via-[#0B2538] to-[#168C8A]/75'
                  }`}
                  style={{ height: `${Math.max(fillLevel, 4)}%` }}
                >
                  {/* Crema Wave Layer */}
                  {fillLevel > 15 && (
                    <div
                      className={`absolute top-0 inset-x-0 h-4 bg-gradient-to-r opacity-90 animate-pulse ${
                        activeTemp === 'HOT'
                          ? 'from-[#B8783E] via-[#D6A06A] to-[#B8783E]'
                          : 'from-[#168C8A] via-[#67D9D0] to-[#168C8A]'
                      }`}
                    />
                  )}

                  {/* Emblem inside bottle when filled */}
                  {fillLevel >= 80 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="p-3 rounded-full bg-[#071A2B]/90 border border-[#B8783E]/60 shadow-md z-30"
                    >
                      <TripleWaveEmblem size={52} animate />
                    </motion.div>
                  )}
                </div>

                {/* Telemetry Footer */}
                <div className="absolute bottom-3 inset-x-4 flex justify-between items-center text-[9px] font-mono text-[#A8B0B4] z-30">
                  <span>CAPACITY: 500ML</span>
                  <span className={activeTemp === 'HOT' ? 'text-[#D6A06A]' : 'text-[#67D9D0]'}>
                    {fillLevel < 100 ? `FILLING: ${Math.floor(fillLevel)}%` : 'CHAMBER READY'}
                  </span>
                </div>
              </motion.div>

              {/* Floor Shadow */}
              <div className="w-52 h-5 bg-black/60 rounded-full blur-md mt-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoffeeAutomationSection;
