import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TripleWaveEmblem } from '../../components/common/TripleWaveLogo';
import {
  Cpu,
  Radio,
  Sparkles,
  Flame,
  Snowflake,
  RotateCw,
  Crown,
  ArrowRight,
  ShieldCheck,
  Globe,
  Layers,
  Activity,
} from 'lucide-react';

export const BillionDollarInnovationStrip = () => {
  const navigate = useNavigate();

  const innovations = [
    {
      id: 'alchemist',
      title: 'AURA-AI™ Molecular Alchemist',
      badge: 'AI SENSORY ENGINE',
      icon: Cpu,
      desc: 'Fine-tune 6-axis taste lipids, caffeine velocity curves, and molecular volatile blooms with quantum mathematical repeatability.',
      action: 'LAUNCH ALCHEMIST',
      route: '/alchemist',
      tag: '6-AXIS RADAR',
    },
    {
      id: 'telemetry',
      title: 'AERO-GRID™ Global Telemetry',
      badge: 'SATELLITE COMMAND',
      icon: Globe,
      desc: 'Real-time telemetry tracking 14,800+ automated dual chambers, cryogenic silos, and zero-emission autonomous fleets worldwide.',
      action: 'VIEW COMMAND CENTER',
      route: '/telemetry',
      tag: '8 GLOBAL HUBS',
    },
    {
      id: 'chamber',
      title: 'CHAMBER-X™ Thermodynamics',
      badge: '04°C CRYO / 68°C STEAM',
      icon: Flame,
      desc: 'Induction steam blooms at 9.2-bar pressure and cryogenic nitrogen flash-chills in 1.4 seconds with zero ice dilution.',
      action: 'EXPLORE SCIENCE',
      route: '/technology',
      tag: '±0.05°C PRECISION',
    },
    {
      id: 'rewards',
      title: 'Quantum VIP Sovereign Circle',
      badge: '$1B PASSPORT VAULT',
      icon: Crown,
      desc: 'Holographic biometric cards, direct reserve bean allocations, private roastery tasting vaults, and zero-queue laser dispensing.',
      action: 'EXPLORE VIP PERKS',
      route: '/rewards',
      tag: 'BIOMETRIC PASS',
    },
  ];

  return (
    <section className="py-24 bg-[#1E120E] text-[#F4E8D1] relative overflow-hidden border-y border-[#EEDCC6]/20">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#EEDCC6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#3C2A21]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Strip Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#EEDCC6] animate-spin-slow" />
            <span>THE $1 BILLION USD COFFEE INFRASTRUCTURE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase"
          >
            INNOVATION ON A <br />
            <span className="text-brand-gradient">MONUMENTAL SCALE.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#EEDCC6]/80 font-sans leading-relaxed"
          >
            We engineered every layer from scratch — custom thermodynamics, satellite telemetry networks, AI flavor synthesis, and circular zero-waste packaging.
          </motion.p>
        </div>

        {/* 4 Massive Architectural Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {innovations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-7 rounded-[32px] bg-[#2A1B16] border border-[#EEDCC6]/25 shadow-2xl flex flex-col justify-between hover:border-[#EEDCC6]/60 hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-[#3C2A21] text-[#EEDCC6] border border-[#EEDCC6]/30 group-hover:bg-[#EEDCC6] group-hover:text-[#2A1B16] transition-colors shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[9px] font-mono font-black text-[#EEDCC6] px-2.5 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/20 uppercase">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#EEDCC6]/70 uppercase font-bold block mb-1">
                      {item.badge}
                    </span>
                    <h3 className="font-display font-black text-xl text-[#F4E8D1] uppercase group-hover:text-[#EEDCC6] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#EEDCC6]/75 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EEDCC6]/15">
                  <button
                    onClick={() => navigate(item.route)}
                    className="w-full py-3 rounded-full bg-[#3C2A21] group-hover:bg-brand-gradient text-[#EEDCC6] group-hover:text-[#2A1B16] font-mono text-[11px] font-bold tracking-widest uppercase transition-all flex items-center justify-center space-x-2"
                  >
                    <span>{item.action}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BillionDollarInnovationStrip;
