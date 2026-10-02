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
} from 'lucide-react';

export const TechnologySection = () => {
  const { startPageTransition } = usePageLoader();
  const [activeNode, setActiveNode] = useState(1);

  const architectureNodes = [
    {
      id: 1,
      title: 'CUSTOMER INTERFACE',
      subtitle: 'Digital Lab OS',
      icon: User,
      desc: 'Intuitive touch & mobile laboratory allowing continuous calibration of base roasts, botanical syrups, and thermodynamic states.',
    },
    {
      id: 2,
      title: 'CUSTOMIZATION ENGINE',
      subtitle: 'Algorithmic Ratio Sync',
      icon: Sliders,
      desc: 'Calculates exact gram weight, extraction pressures (9 to 15 bars), and micro-flavor layering in fractions of a second.',
    },
    {
      id: 3,
      title: 'SMART DISPATCH API',
      subtitle: 'REST / Telemetry Cloud',
      icon: Server,
      desc: 'Transmits calibrated recipes instantly to the closest Flagship Roastery Hub using encrypted low-latency protocols.',
    },
    {
      id: 4,
      title: 'PRECISION BREWING CORE',
      subtitle: 'Thermal / Cryo Induction',
      icon: Flame,
      desc: 'Dual-chamber automated robotic cells execute instant flash heating to 68°C or positive-pressure cryogenic sub-zero cooling to 04°C.',
    },
    {
      id: 5,
      title: 'SPECTRAL QUALITY CHECK',
      subtitle: 'Optical & Sensor Analysis',
      icon: ShieldCheck,
      desc: 'Laser-guided refractometers measure Total Dissolved Solids (TDS) and verify vacuum hermetic sealing before dispatch.',
    },
    {
      id: 6,
      title: 'CLIMATE-LOCKED TRANSIT',
      subtitle: 'EV Courier Telemetry',
      icon: Truck,
      desc: 'Electric vehicles equipped with active climate compartments deliver your vessel at calibrated temperature.',
    },
  ];

  return (
    <section className="py-24 bg-[#3C2A21] text-[#F4E8D1] relative overflow-hidden border-b border-[#EEDCC6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-3 py-1 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>INTERACTIVE SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            THE TECHNOLOGY BEHIND YOUR COFFEE.
          </h2>
          <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans">
            Explore the real-time engineering pipeline connecting your digital creation to precision laboratory extraction.
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
                    ? 'bg-[#2A1B16] border-[#EEDCC6] shadow-coffee-glow'
                    : 'bg-[#2A1B16]/60 border-[#EEDCC6]/15 hover:border-[#EEDCC6]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-2xl ${
                      isSelected
                        ? 'bg-[#EEDCC6] text-[#2A1B16]'
                        : 'bg-[#3C2A21] text-[#EEDCC6]'
                    } transition-colors`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="font-mono text-xs font-bold text-[#EEDCC6]/60">
                    STEP 0{node.id}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-[#F4E8D1] mb-1">
                  {node.title}
                </h3>
                <div className="text-[11px] font-mono font-bold text-[#EEDCC6] uppercase tracking-wider mb-2">
                  {node.subtitle}
                </div>
                <p className="text-xs text-[#EEDCC6]/80 font-sans leading-relaxed">
                  {node.desc}
                </p>

                {/* Animated Flow Connector Indicator */}
                <div className="mt-4 pt-4 border-t border-[#EEDCC6]/10 flex items-center justify-between text-[10px] font-mono text-[#EEDCC6]/70">
                  <span className="flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-[#EEDCC6]" />
                    <span>ACTIVE TELEMETRY</span>
                  </span>
                  <span>{isSelected ? 'INSPECTING' : 'CLICK TO VIEW'}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technology Page CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => startPageTransition('/technology', 'THE TECHNOLOGY BEHIND YOUR CUP')}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#2A1B16] hover:bg-[#EEDCC6] text-[#F4E8D1] hover:text-[#2A1B16] border border-[#EEDCC6]/30 font-mono text-xs font-bold tracking-widest uppercase transition-all"
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
