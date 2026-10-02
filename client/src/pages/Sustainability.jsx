import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../context/LoadingContext';
import { Leaf, Recycle, Droplet, Sun, ShieldCheck, ArrowRight, TreePine, Sparkles } from 'lucide-react';

export const Sustainability = () => {
  const { startPageTransition } = usePageLoader();

  const metrics = [
    { value: '100%', label: 'Circular Thermal Vessels', sub: 'Zero single-use paper or plastic cups utilized in our flagship network.' },
    { value: '+45%', label: 'Direct Trade Premium', sub: 'Paid above global fair trade minimums directly to micro-lot farm families.' },
    { value: '98.4%', label: 'Closed-Loop Water Recovery', sub: 'Reverse-osmosis filtration with regenerative grey-water cycling.' },
    { value: '0 g', label: 'Net Carbon per Automated Extraction', sub: 'Offset via regenerative agroforestry projects in Colombia & Ethiopia.' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-luxury opacity-90 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#EEDCC6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30">
            <Leaf className="w-3.5 h-3.5" />
            <span>CIRCULAR PLANETARY ETHICS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            SUSTAINABILITY AT SCALE.
          </h1>
          <p className="text-sm sm:text-base text-[#EEDCC6]/80 font-sans leading-relaxed">
            We believe the future of luxury coffee is intrinsically regenerative. From tree to thermal vessel, every step is audited for minimal ecological footprint and maximum agricultural prosperity.
          </p>
        </div>

        {/* 4 Large Visual Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#3C2A21]/70 border border-[#EEDCC6]/20 shadow-card-lux space-y-3"
            >
              <div className="font-display font-black text-4xl sm:text-5xl text-[#F4E8D1]">
                {m.value}
              </div>
              <h3 className="font-mono text-xs font-bold text-[#EEDCC6] uppercase tracking-wider">
                {m.label}
              </h3>
              <p className="text-xs text-[#EEDCC6]/75 font-sans leading-relaxed">
                {m.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Deep Dive Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-[36px] bg-[#3C2A21]/50 border border-[#EEDCC6]/15 space-y-4">
            <div className="p-3.5 rounded-2xl bg-[#2A1B16] text-[#EEDCC6] w-fit">
              <Recycle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#F4E8D1]">
              1. CIRCULAR VESSEL REUSE
            </h3>
            <p className="text-xs text-[#EEDCC6]/80 font-sans leading-relaxed">
              Every HOT COOL SHAKE customer receives their drink in an aerospace titanium-coated or borosilicate vessel that can be cleaned, scanned, and refilled at any global flagship with zero waste.
            </p>
          </div>

          <div className="p-8 rounded-[36px] bg-[#3C2A21]/50 border border-[#EEDCC6]/15 space-y-4">
            <div className="p-3.5 rounded-2xl bg-[#2A1B16] text-[#EEDCC6] w-fit">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#F4E8D1]">
              2. VOLCANIC SHADE-GROWN AGROECOLOGY
            </h3>
            <p className="text-xs text-[#EEDCC6]/80 font-sans leading-relaxed">
              We only source Arabica lots cultivated under natural jungle canopy. This preserves bird migratory corridors and avoids synthetic nitrogen fertilizers.
            </p>
          </div>

          <div className="p-8 rounded-[36px] bg-[#3C2A21]/50 border border-[#EEDCC6]/15 space-y-4">
            <div className="p-3.5 rounded-2xl bg-[#2A1B16] text-[#EEDCC6] w-fit">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#F4E8D1]">
              3. 100% SOLAR ROASTING & EV FLEETS
            </h3>
            <p className="text-xs text-[#EEDCC6]/80 font-sans leading-relaxed">
              Our flagship thermal chambers are powered by local rooftop solar arrays, and regional dispatches are carried exclusively in climate-controlled electric shuttles.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <button
            onClick={() => startPageTransition('/make-your-coffee', 'VIRTUAL COFFEE LAB')}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#EEDCC6] hover:bg-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-coffee-glow transition-all"
          >
            <span>ORDER IN A 100% CIRCULAR VESSEL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
