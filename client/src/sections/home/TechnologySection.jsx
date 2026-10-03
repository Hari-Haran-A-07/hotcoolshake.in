import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import {
  Cpu,
  User,
  Sliders,
  Server,
  Flame,
  Snowflake,
  ShieldCheck,
  Truck,
  ArrowRight,
  Zap,
  RotateCw,
} from 'lucide-react';

export const TechnologySection = () => {
  const { startPageTransition } = usePageLoader();
  const [activeNode, setActiveNode] = useState(1);

  const architectureNodes = [
    {
      id: 1,
      title: 'PRECISION THERMAL INFUSION',
      subtitle: '68°C Volatile Bloom',
      icon: Flame,
      color: '#B8783E',
      desc: 'Computer-controlled induction extraction heating water to 93.5°C at 11 bars pressure, serving hot drinks at an ideal 68°C to maximize aromatic headspace.',
    },
    {
      id: 2,
      title: 'CRYOGENIC FLASH CHILL',
      subtitle: '04°C Sub-Zero Lock',
      icon: Snowflake,
      color: '#67D9D0',
      desc: 'Rapid heat exchangers drop espresso temperature from 90°C to 04°C in under 2.4 seconds, trapping delicate floral notes without ice dilution.',
    },
    {
      id: 3,
      title: 'SONIC VORTEX HOMOGENIZATION',
      subtitle: 'Micro-Fluidic Agitation',
      icon: RotateCw,
      color: '#D6A06A',
      desc: 'A high-frequency sonic vortex rotor blends single-estate extracts with organic oat and dairy molecules, creating microscopic velvet foam.',
    },
    {
      id: 4,
      title: 'REAL-TIME RECIPE ENGINE',
      subtitle: 'Algorithmic Ratio Sync',
      icon: Sliders,
      color: '#67D9D0',
      desc: 'Calculates exact gram weights, botanical syrup viscosity, and temperature offsets in fractions of a second based on customer lab choices.',
    },
    {
      id: 5,
      title: 'OPTICAL TDS REFRACTOMETRY',
      subtitle: 'Laser Quality Sensor',
      icon: ShieldCheck,
      color: '#B8783E',
      desc: 'Laser sensors measure Total Dissolved Solids (TDS) and verify airtight vacuum sealing before the bottle is released.',
    },
    {
      id: 6,
      title: 'CLIMATE-LOCKED EV TRANSIT',
      subtitle: 'Active Telemetry Dispatch',
      icon: Truck,
      color: '#168C8A',
      desc: 'Electric delivery fleet equipped with active dual-temperature thermal compartments keeps your custom bottle at strict calibrated temperature.',
    },
  ];

  return (
    <section className="py-24 bg-[#071A2B] text-[#F7FAF9] relative overflow-hidden border-t border-[#B8783E]/20">
      {/* Ambient background atmosphere */}
      <div className="absolute inset-0 bg-radial-navy opacity-90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#67D9D0] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#0B2538] border border-[#67D9D0]/30">
            <Cpu className="w-3.5 h-3.5 text-[#B8783E]" />
            <span>MOLECULAR EXTRACTION & CRYO ENGINEERING</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[#F7FAF9] uppercase">
            THE TECHNOLOGY BEHIND <span className="text-brand-gradient">YOUR CUP.</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#A8B0B4] font-sans">
            Explore the engineering pipeline connecting your digital customizer to precision laboratory brewing and climate-locked dispatch.
          </p>
        </div>

        {/* System Architecture Interactive Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architectureNodes.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = activeNode === node.id;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => setActiveNode(node.id)}
                className={`p-6 sm:p-8 rounded-3xl border cursor-pointer transition-all duration-300 relative ${
                  isSelected
                    ? 'bg-[#0B2538] border-[#67D9D0] shadow-teal-glow'
                    : 'bg-[#0B2538]/50 border-[#B8783E]/20 hover:border-[#67D9D0]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-3 rounded-2xl bg-[#071A2B] border border-white/10"
                    style={{ color: node.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="font-mono text-xs font-bold text-[#A8B0B4]">
                    PHASE 0{node.id}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-[#F7FAF9] mb-1">
                  {node.title}
                </h3>
                <div className="text-[11px] font-mono font-bold text-[#D6A06A] uppercase tracking-wider mb-2">
                  {node.subtitle}
                </div>
                <p className="text-xs text-[#A8B0B4] font-sans leading-relaxed">
                  {node.desc}
                </p>

                {/* Animated Flow Connector Indicator */}
                <div className="mt-4 pt-4 border-t border-[#071A2B] flex items-center justify-between text-[10px] font-mono text-[#A8B0B4]">
                  <span className="flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-[#67D9D0]" />
                    <span>PRECISION TELEMETRY</span>
                  </span>
                  <span className={isSelected ? 'text-[#67D9D0] font-bold' : ''}>
                    {isSelected ? 'INSPECTING' : 'CLICK TO EXPAND'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technology Page CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => startPageTransition('/technology', 'THE TECHNOLOGY BEHIND YOUR CUP')}
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-[#0B2538] hover:bg-brand-gradient text-[#F7FAF9] hover:text-[#071A2B] border border-[#67D9D0]/30 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300"
          >
            <span>EXPLORE FULL TECHNOLOGY WHITE-PAPER</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
