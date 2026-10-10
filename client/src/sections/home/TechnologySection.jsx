import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import {
  Cpu,
  Smartphone,
  Flame,
  Snowflake,
  ShieldCheck,
  Truck,
  ArrowRight,
  Zap,
  RotateCw,
  Wallet,
  Sparkles,
} from 'lucide-react';

export const TechnologySection = () => {
  const { startPageTransition } = usePageLoader();
  const [activeNode, setActiveNode] = useState(1);

  const architectureNodes = [
    {
      id: 1,
      title: 'THERMAL VOLATILE EXTRACTION',
      subtitle: '68°C Precision Headspace',
      icon: Flame,
      desc: 'Computer-controlled induction extraction heating water to 93.5°C at 11 bars pressure, serving hot beverages at calibrated 68°C to bloom aromatics.',
    },
    {
      id: 2,
      title: 'SUB-ZERO CRYOGENIC LOCK',
      subtitle: '04°C Flash Heat Exchange',
      icon: Snowflake,
      desc: 'Rapid cryogenic heat exchangers drop espresso temperature to 04°C in 2.4 seconds, trapping delicate floral notes with zero ice dilution.',
    },
    {
      id: 3,
      title: 'SONIC VORTEX HOMOGENIZATION',
      subtitle: 'Micro-Fluidic Agitation',
      icon: RotateCw,
      desc: 'A high-frequency vortex rotor binds single-estate extracts with organic oat and dairy molecules into microscopic velvet crema.',
    },
    {
      id: 4,
      title: 'COFFEE IN YOUR POCKET (APP)',
      subtitle: 'Mobile Order Ahead & Wallet',
      icon: Smartphone,
      desc: 'Configure custom creations, earn Shake Points, track temperature telemetry live, and unlock exclusive VIP roastery drops from your mobile device.',
    },
    {
      id: 5,
      title: 'OPTICAL TDS REFRACTOMETRY',
      subtitle: 'Laser Quality Sensor',
      icon: ShieldCheck,
      desc: 'Laser sensors measure Total Dissolved Solids (TDS) and verify airtight vacuum seal integrity before the bottle is released.',
    },
    {
      id: 6,
      title: 'CLIMATE-LOCKED DISPATCH',
      subtitle: 'Active Telemetry EV Fleet',
      icon: Truck,
      desc: 'Electric delivery fleet equipped with active dual-temperature thermal compartments maintains your custom bottle at strict drinking calibration.',
    },
  ];

  return (
    <section className="py-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden border-t border-[#EEDCC6]/15">
      {/* Ambient background atmosphere */}
      <div className="absolute inset-0 bg-radial-coffee opacity-90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30">
            <Cpu className="w-3.5 h-3.5 text-[#EEDCC6]" />
            <span>MOLECULAR EXTRACTION & DIGITAL EXPERIENCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            TECHNOLOGY & <span className="text-brand-gradient">DIGITAL CRAFT.</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans">
            Explore the engineering pipeline connecting your digital customizer to precision laboratory brewing, mobile wallet, and climate-locked dispatch.
          </p>
        </div>

        {/* System Architecture Grid */}
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
                    ? 'bg-[#3C2A21] border-[#EEDCC6] shadow-cream-glow'
                    : 'bg-[#3C2A21]/70 border-[#EEDCC6]/20 hover:border-[#EEDCC6]/50 shadow-coffee-card'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-[#EEDCC6]">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="font-mono text-xs font-bold text-[#EEDCC6]">
                    PHASE 0{node.id}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-[#F4E8D1] mb-1 uppercase">
                  {node.title}
                </h3>
                <div className="text-[11px] font-mono font-bold text-[#EEDCC6] uppercase tracking-wider mb-2">
                  {node.subtitle}
                </div>
                <p className="text-xs text-[#EEDCC6]/80 font-sans leading-relaxed">
                  {node.desc}
                </p>

                <div className="mt-4 pt-4 border-t border-[#2A1B16] flex items-center justify-between text-[10px] font-mono text-[#EEDCC6]/70">
                  <span className="flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-[#EEDCC6]" />
                    <span>CALIBRATED TELEMETRY</span>
                  </span>
                  <span className={isSelected ? 'text-[#F4E8D1] font-bold' : ''}>
                    {isSelected ? 'ACTIVE PHASE' : 'CLICK TO INSPECT'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technology Page CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => startPageTransition('/technology', 'DIGITAL TECHNOLOGY')}
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-[#3C2A21] hover:bg-[#EEDCC6] text-[#F4E8D1] hover:text-[#2A1B16] border border-[#EEDCC6]/30 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300"
          >
            <span>EXPLORE APP & CRYO-TECH INNOVATIONS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
