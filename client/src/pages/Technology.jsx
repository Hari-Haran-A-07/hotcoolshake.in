import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../context/LoadingContext';
import {
  Cpu,
  Sliders,
  Server,
  Flame,
  Snowflake,
  ShieldCheck,
  Truck,
  ArrowRight,
  Zap,
  Radio,
  Layers,
  Sparkles,
} from 'lucide-react';

export const Technology = () => {
  const { startPageTransition } = usePageLoader();

  const techStack = [
    { title: 'Customization Engine', desc: 'Real-time alchemical computation calibrating extraction time, water pressure, and flavor density.', icon: Sliders },
    { title: 'Dual-Chamber Automated Cells', desc: 'Robotic induction heaters (68°C) and cryogenic nitrogen chillers (04°C) with 0.1°C precision.', icon: Flame },
    { title: 'Refractometer Spectral QA', desc: 'Optical sensors measuring Total Dissolved Solids (TDS) ensuring consistent extraction perfection.', icon: ShieldCheck },
    { title: 'Active Climate-Locked Transit', desc: 'Thermal telemetry monitoring the vessel temperature in real-time during EV courier delivery.', icon: Truck },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#3C2A21] text-[#F4E8D1] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-luxury opacity-80 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#EEDCC6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-4 py-1.5 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30">
            <Cpu className="w-3.5 h-3.5" />
            <span>MOLECULAR EXTRACTION TELEMETRY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            THE TECHNOLOGY BEHIND YOUR COFFEE.
          </h1>
          <p className="text-sm sm:text-base text-[#EEDCC6]/80 font-sans leading-relaxed">
            How we translate your customized digital recipe into precision laboratory extraction in under 3 minutes with zero human error.
          </p>
        </div>

        {/* System Architecture Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 rounded-[36px] bg-[#2A1B16] border border-[#EEDCC6]/20 shadow-card-lux space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="p-3.5 rounded-2xl bg-[#3C2A21] text-[#EEDCC6] w-fit mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#F4E8D1]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#EEDCC6]/80 font-sans leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EEDCC6]/10 text-[10px] font-mono text-[#EEDCC6]/70 flex items-center space-x-1.5">
                  <Radio className="w-3.5 h-3.5 text-[#EEDCC6]" />
                  <span>IOT AUTOMATION ACTIVE</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deep Tech Process Explanation */}
        <div className="p-8 sm:p-12 rounded-[40px] bg-[#2A1B16] border border-[#EEDCC6]/25 shadow-2xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F4E8D1] uppercase">
            REVOLUTIONIZING THE EXTRACTION CURVE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#EEDCC6]/85 font-sans leading-relaxed">
            <p>
              Traditional coffee machines extract coffee at arbitrary fixed water temperatures and pressure profiles. HOT COOL SHAKE replaces this with dynamic algorithmic thermal curve mapping.
            </p>
            <p>
              When a customer selects "Sub-Zero Nitro Cold Brew with Madagascar Vanilla", our IoT cell initiates negative pressure degassing, injects food-grade nitrogen at 45 PSI, and chills the output fluid instantly to 04°C without dilution.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => startPageTransition('/make-your-coffee', 'VIRTUAL COFFEE LAB')}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#EEDCC6] hover:bg-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-coffee-glow transition-all"
          >
            <span>TEST THE CUSTOMIZATION ENGINE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Technology;
