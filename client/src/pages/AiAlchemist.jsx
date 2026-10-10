import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import {
  Sparkles,
  Cpu,
  Flame,
  Snowflake,
  RotateCw,
  Sliders,
  Activity,
  Zap,
  Check,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Share2,
  Layers,
  Heart,
  Award,
} from 'lucide-react';

export const AiAlchemist = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const canvasRef = useRef(null);

  // 6-Axis Sensory Sliders
  const [roastDepth, setRoastDepth] = useState(82); // 0 - 100
  const [aciditySpark, setAciditySpark] = useState(25); // 0 - 100
  const [velvetCrema, setVelvetCrema] = useState(90); // 0 - 100
  const [botanicalBloom, setBotanicalBloom] = useState(70); // 0 - 100
  const [cryoCrispness, setCryoCrispness] = useState(65); // 0 - 100
  const [sweetnessResonance, setSweetnessResonance] = useState(40); // 0 - 100

  // Thermal Mode
  const [thermalMode, setThermalMode] = useState('HOT'); // 'HOT' | 'COOL' | 'SHAKE'
  const [activePreset, setActivePreset] = useState('BILLIONAIRE_FOCUS');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisSuccess, setSynthesisSuccess] = useState(false);

  // Presets definition
  const neuralPresets = [
    {
      id: 'BILLIONAIRE_FOCUS',
      title: 'Billionaire High-Octane Focus',
      tag: 'ALPHA-WAVE VELOCITY',
      temp: 'HOT',
      stats: { roast: 88, acidity: 15, crema: 95, botanical: 60, cryo: 20, sweetness: 35 },
      notes: ['Dark Belgian Truffle', 'Madagascar Bourbon Bean', 'Smoked Salt'],
      caffeine: '240mg Bioavailable',
      price: 13.50,
      bottle: 'Premium Obsidian Flask',
    },
    {
      id: 'CRYO_ZEN',
      title: 'Sub-Zero Alpine Cryo Zen',
      tag: '04°C NITRO CLOUD',
      temp: 'COOL',
      stats: { roast: 45, acidity: 40, crema: 75, botanical: 92, cryo: 98, sweetness: 50 },
      notes: ['Sicilian Green Pistachio', 'Wild Highland Peppermint', 'Cold Kyoto Extract'],
      caffeine: '180mg Sustained',
      price: 14.00,
      bottle: 'Cryo Frost Hydro Vessel',
    },
    {
      id: 'SONIC_VELVET',
      title: 'Sonic Velvet Cavitation Shake',
      tag: '08°C MICRO-AERATION',
      temp: 'SHAKE',
      stats: { roast: 70, acidity: 20, crema: 98, botanical: 85, cryo: 60, sweetness: 65 },
      notes: ['Toasted Coconut Silk', 'Smoked Sea Salt Caramel', 'Almond Praline'],
      caffeine: '200mg Micro-Dispersed',
      price: 14.50,
      bottle: 'Signature Warm Bronze Vessel',
    },
    {
      id: 'MIDNIGHT_CONNOISSEUR',
      title: 'Midnight Reserve Connoisseur',
      tag: 'SINGLE-ORIGIN RARITY',
      temp: 'HOT',
      stats: { roast: 94, acidity: 10, crema: 88, botanical: 78, cryo: 10, sweetness: 20 },
      notes: ['Cardamom Saffron Pod', 'Swiss Dark Mocha', 'Ethiopian Blonde Extract'],
      caffeine: '260mg Extended Release',
      price: 16.00,
      bottle: 'Classic Glass Lab',
    },
  ];

  const applyPreset = (preset) => {
    setActivePreset(preset.id);
    setThermalMode(preset.temp);
    setRoastDepth(preset.stats.roast);
    setAciditySpark(preset.stats.acidity);
    setVelvetCrema(preset.stats.crema);
    setBotanicalBloom(preset.stats.botanical);
    setCryoCrispness(preset.stats.cryo);
    setSweetnessResonance(preset.stats.sweetness);
  };

  // Real-time Canvas Molecular Particle Physics
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

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: thermalMode === 'HOT' ? -Math.random() * 1.2 - 0.2 : thermalMode === 'SHAKE' ? (Math.random() - 0.5) * 2 : Math.random() * 0.8 + 0.2,
      hue: thermalMode === 'HOT' ? 30 : thermalMode === 'COOL' ? 200 : 45,
      alpha: Math.random() * 0.7 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 60%, 75%, ${p.alpha * 0.6})`;
        ctx.fill();

        // Draw molecular bonding lines between nearby particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(238, 220, 198, ${0.15 * (1 - dist / 60)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [thermalMode]);

  // Handle Neural Blend Synthesis
  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setSynthesisSuccess(false);
    setTimeout(() => {
      setIsSynthesizing(false);
      setSynthesisSuccess(true);
    }, 1200);
  };

  const currentPresetData = neuralPresets.find((p) => p.id === activePreset) || neuralPresets[0];

  const handleAddToCartDirect = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    addToCart(
      {
        _id: `neural-${Date.now()}`,
        name: currentPresetData.title,
        customBlendTitle: currentPresetData.title,
        price: currentPresetData.price,
        image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop',
        temperature: thermalMode,
        bottle: { name: currentPresetData.bottle, price: currentPresetData.price },
        flavors: currentPresetData.notes.map((n) => ({ name: n, intensity: 'STRONG' })),
      },
      1,
      {
        formula: 'AURA-AI™ Neural Synthesis',
        roast: `${roastDepth}%`,
        tds: '20.4% Optimal',
        temperature: thermalMode,
      },
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    );
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-radial-coffee opacity-90 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EEDCC6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#3C2A21]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase shadow-cream-glow"
          >
            <Cpu className="w-3.5 h-3.5 text-[#EEDCC6] animate-spin-slow" />
            <span>AURA-AI™ SENSORY NEURAL MATRIX</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-[#F4E8D1] uppercase"
          >
            MOLECULAR <span className="text-brand-gradient">ALCHEMIST.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#EEDCC6]/85 font-sans leading-relaxed"
          >
            Fine-tune flavor lipids, extraction curves, and bioavailable energy release with mathematical precision on our billion-dollar quantum neural engine.
          </motion.p>
        </div>

        {/* Neural Presets Selector Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {neuralPresets.map((preset) => {
            const isSel = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className={`p-5 rounded-3xl border text-left transition-all duration-300 flex flex-col justify-between ${
                  isSel
                    ? 'bg-[#3C2A21] border-[#EEDCC6] shadow-cream-glow ring-1 ring-[#EEDCC6]'
                    : 'bg-[#3C2A21]/50 border-[#EEDCC6]/15 hover:border-[#EEDCC6]/40 hover:bg-[#3C2A21]/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono font-black text-[#EEDCC6] px-2 py-0.5 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/20 uppercase">
                      {preset.tag}
                    </span>
                    <span className="text-xs font-mono font-black text-[#F4E8D1]">
                      ${preset.price.toFixed(2)}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-sm text-[#F4E8D1] uppercase">
                    {preset.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {preset.notes.slice(0, 2).map((n, i) => (
                      <span key={i} className="text-[9px] font-mono text-[#EEDCC6]/70">
                        • {n}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#EEDCC6]/15 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#EEDCC6]">{preset.caffeine}</span>
                  <span className={`font-bold ${isSel ? 'text-[#F4E8D1]' : 'text-[#EEDCC6]/40'}`}>
                    {isSel ? 'CALIBRATED' : 'APPLY'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Dual-Panel Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================= */}
          {/* LEFT: 6-AXIS SENSORY MATRIX CONTROLS */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-[32px] bg-[#3C2A21]/80 backdrop-blur-xl border border-[#EEDCC6]/25 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#EEDCC6]/20">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
                  NEURAL SENSORY MATRIX
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-black text-[#F4E8D1] uppercase mt-0.5">
                  CALIBRATE BIO-FLAVOR AXES
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                {['HOT', 'COOL', 'SHAKE'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setThermalMode(m)}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-all ${
                      thermalMode === m
                        ? 'bg-[#EEDCC6] text-[#2A1B16] shadow-sm font-black'
                        : 'bg-[#2A1B16] text-[#EEDCC6]/70 border border-[#EEDCC6]/20'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="space-y-4">
              {/* Roast Depth */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#F4E8D1] font-bold flex items-center space-x-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#EEDCC6]" />
                    <span>Roast Depth (Pyrazine Level)</span>
                  </span>
                  <span className="text-[#EEDCC6] font-bold">{roastDepth}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={roastDepth}
                  onChange={(e) => setRoastDepth(Number(e.target.value))}
                  className="w-full h-2 bg-[#2A1B16] rounded-lg appearance-none cursor-pointer accent-[#EEDCC6]"
                />
                <div className="flex justify-between text-[9px] font-mono text-[#EEDCC6]/50">
                  <span>Blonde Floral</span>
                  <span>Medium Amber</span>
                  <span>Midnight Obsidian</span>
                </div>
              </div>

              {/* Acidity Spark */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#F4E8D1] font-bold flex items-center space-x-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#EEDCC6]" />
                    <span>Acidity Spark (Citric / Malic Lift)</span>
                  </span>
                  <span className="text-[#EEDCC6] font-bold">{aciditySpark}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={aciditySpark}
                  onChange={(e) => setAciditySpark(Number(e.target.value))}
                  className="w-full h-2 bg-[#2A1B16] rounded-lg appearance-none cursor-pointer accent-[#EEDCC6]"
                />
                <div className="flex justify-between text-[9px] font-mono text-[#EEDCC6]/50">
                  <span>Zero-Astringency</span>
                  <span>Crisp Citrus</span>
                  <span>High Brightness</span>
                </div>
              </div>

              {/* Velvet Crema */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#F4E8D1] font-bold flex items-center space-x-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-[#EEDCC6]" />
                    <span>Velvet Micro-Foam Viscosity</span>
                  </span>
                  <span className="text-[#EEDCC6] font-bold">{velvetCrema}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={velvetCrema}
                  onChange={(e) => setVelvetCrema(Number(e.target.value))}
                  className="w-full h-2 bg-[#2A1B16] rounded-lg appearance-none cursor-pointer accent-[#EEDCC6]"
                />
                <div className="flex justify-between text-[9px] font-mono text-[#EEDCC6]/50">
                  <span>Clean Fluid</span>
                  <span>Silky Body</span>
                  <span>Dense Crema Velvet</span>
                </div>
              </div>

              {/* Botanical Bloom */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#F4E8D1] font-bold flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#EEDCC6]" />
                    <span>Botanical & Terpene Bloom</span>
                  </span>
                  <span className="text-[#EEDCC6] font-bold">{botanicalBloom}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={botanicalBloom}
                  onChange={(e) => setBotanicalBloom(Number(e.target.value))}
                  className="w-full h-2 bg-[#2A1B16] rounded-lg appearance-none cursor-pointer accent-[#EEDCC6]"
                />
                <div className="flex justify-between text-[9px] font-mono text-[#EEDCC6]/50">
                  <span>Single Note</span>
                  <span>Harmonic Bouquet</span>
                  <span>Multi-Layered Bloom</span>
                </div>
              </div>

              {/* Cryo Crispness */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#F4E8D1] font-bold flex items-center space-x-1.5">
                    <Snowflake className="w-3.5 h-3.5 text-[#EEDCC6]" />
                    <span>Cryogenic Sub-Zero Clarity</span>
                  </span>
                  <span className="text-[#EEDCC6] font-bold">{cryoCrispness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cryoCrispness}
                  onChange={(e) => setCryoCrispness(Number(e.target.value))}
                  className="w-full h-2 bg-[#2A1B16] rounded-lg appearance-none cursor-pointer accent-[#EEDCC6]"
                />
                <div className="flex justify-between text-[9px] font-mono text-[#EEDCC6]/50">
                  <span>Warm Ambient</span>
                  <span>Chilled 08°C</span>
                  <span>Flash Cryo 04°C</span>
                </div>
              </div>
            </div>

            {/* Synthesize Action */}
            <div className="pt-4 border-t border-[#EEDCC6]/20 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSynthesize}
                disabled={isSynthesizing}
                className="flex-1 py-4 rounded-full bg-brand-gradient text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-cream-glow hover:brightness-105 transition-all flex items-center justify-center space-x-2"
              >
                {isSynthesizing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin-slow text-[#2A1B16]" />
                    <span>QUANTUM SYNTHESIS IN PROGRESS...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4 text-[#2A1B16]" />
                    <span>SYNTHESIZE NEURAL BLEND</span>
                  </>
                )}
              </button>

              <button
                onClick={() => navigate('/make-your-coffee')}
                className="px-6 py-4 rounded-full bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30 font-mono text-xs font-bold uppercase hover:bg-[#3C2A21] transition-all"
              >
                OPEN IN 3D LAB
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT: MOLECULAR PARTICLE SIMULATOR & TELEMETRY */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-[32px] bg-[#3C2A21]/80 backdrop-blur-xl border border-[#EEDCC6]/25 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-[#EEDCC6]/20 text-xs font-mono">
                <span className="text-[#EEDCC6] font-bold uppercase flex items-center space-x-1.5">
                  <Activity className="w-4 h-4 text-[#EEDCC6] animate-pulse" />
                  <span>MOLECULAR FLUID CAVITATION</span>
                </span>
                <span className="text-[#F4E8D1]">
                  {thermalMode === 'HOT' ? '68°C STEAM' : thermalMode === 'COOL' ? '04°C CRYO' : '08°C VORTEX'}
                </span>
              </div>

              {/* Canvas Molecular Particle Visualizer */}
              <div className="relative w-full h-64 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20 overflow-hidden flex items-center justify-center">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                <div className="relative z-10 p-3 rounded-full bg-[#2A1B16]/90 border border-[#EEDCC6]/40 text-center backdrop-blur-md">
                  <TripleWaveEmblem size={44} animate />
                  <div className="text-[9px] font-mono text-[#EEDCC6] font-black uppercase mt-1">
                    TDS: 20.4%
                  </div>
                </div>
              </div>

              {/* Telemetry Computed Breakdown */}
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-[#EEDCC6]/10">
                  <span className="text-[#EEDCC6]/70">Extraction Index:</span>
                  <span className="text-[#F4E8D1] font-bold">20.4% (Gold Cup Standard)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#EEDCC6]/10">
                  <span className="text-[#EEDCC6]/70">Caffeine Velocity:</span>
                  <span className="text-[#EEDCC6] font-bold">{currentPresetData.caffeine}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#EEDCC6]/10">
                  <span className="text-[#EEDCC6]/70">Aroma Volatiles:</span>
                  <span className="text-[#F4E8D1] font-bold">Pyrazines, Guaiacol, Terpenes</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#EEDCC6]/10">
                  <span className="text-[#EEDCC6]/70">Formula Hash:</span>
                  <span className="text-[#EEDCC6] font-mono text-[10px]">
                    #HCS-AI-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                </div>
              </div>

              {/* Direct Add to Cart Action */}
              <button
                onClick={handleAddToCartDirect}
                className="w-full py-4 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase hover:bg-[#F4E8D1] shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ORDER SYNTHESIZED BLEND • ${currentPresetData.price.toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAlchemist;
