import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../context/LoadingContext';
import {
  Cpu,
  Sliders,
  Flame,
  Snowflake,
  ShieldCheck,
  Truck,
  ArrowRight,
  Zap,
  Radio,
  Layers,
  Sparkles,
  Gauge,
  Activity,
  Workflow,
} from 'lucide-react';

export const Technology = () => {
  const { startPageTransition } = usePageLoader();

  const techStack = [
    {
      title: 'Algorithmic Customization Engine',
      desc: 'Real-time computation calibrating bean density, grind micron size, extraction time, water pressure, and flavor layering.',
      icon: Sliders,
      tag: 'LOGIC LAYER',
      color: 'text-[#D6A06A]',
      border: 'border-[#B8783E]/30',
    },
    {
      title: 'Dual-Chamber Automated Cells',
      desc: 'Robotic precision induction heaters (68°C thermal bloom) and cryogenic nitrogen chillers (04°C cold lock) with ±0.1°C tolerance.',
      icon: Flame,
      tag: 'THERMODYNAMICS',
      color: 'text-[#B8783E]',
      border: 'border-[#B8783E]/30',
    },
    {
      title: 'Spectral Optical TDS Sensors',
      desc: 'Infrared refractometer arrays measuring Total Dissolved Solids (TDS) in-line to guarantee extraction yield consistency between 19.5% and 21.5%.',
      icon: ShieldCheck,
      tag: 'QUALITY AUDIT',
      color: 'text-[#67D9D0]',
      border: 'border-[#67D9D0]/30',
    },
    {
      title: 'Active Climate-Locked EV Transit',
      desc: 'Thermal telemetry monitoring the vessel temperature in real-time during electric courier transit, ensuring peak flavor at your door.',
      icon: Truck,
      tag: 'DISPATCH TELEMETRY',
      color: 'text-[#168C8A]',
      border: 'border-[#168C8A]/30',
    },
  ];

  const extractionSpecs = [
    { label: 'Thermal Infusion Temp', hot: '68.0°C ±0.1°C', cool: '04.0°C ±0.1°C', metric: 'Real-time dual sensor feedback' },
    { label: 'Injection Bar Pressure', hot: '9.2 BAR (Peak Bloom)', cool: '15.0 BAR (Cold Nitro)', metric: 'Constant displacement rotary pump' },
    { label: 'Extraction Time', hot: '28 Seconds', cool: '120 Seconds (Nitro Infusion)', metric: 'Automated flow-rate termination' },
    { label: 'Total Dissolved Solids (TDS)', hot: '20.2% Optimal', cool: '19.8% Sub-Zero Clarity', metric: 'Optical spectral verification' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#071A2B] text-[#F7FAF9] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-navy opacity-90 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#67D9D0]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 rounded-full bg-[#B8783E]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#67D9D0] uppercase font-bold px-4 py-1.5 rounded-full bg-[#0B2538] border border-[#67D9D0]/30"
          >
            <Cpu className="w-3.5 h-3.5 text-[#67D9D0]" />
            <span>MOLECULAR EXTRACTION TELEMETRY</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F7FAF9] uppercase"
          >
            THE SCIENCE OF <br />
            <span className="text-gradient-brand">PERFECT EXTRACTION.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#A8B0B4] font-sans leading-relaxed"
          >
            How our automated preparation laboratory translates your custom recipe into precision thermal extraction with mathematical repeatability.
          </motion.p>
        </div>

        {/* System Architecture 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`p-6 sm:p-8 rounded-[32px] bg-[#0B2538]/80 border ${item.border} shadow-luxury-card space-y-4 flex flex-col justify-between backdrop-blur-sm`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-[#071A2B] text-[#67D9D0] border border-[#67D9D0]/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#071A2B] text-[#D6A06A] border border-[#B8783E]/30">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#F7FAF9]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A8B0B4] font-sans leading-relaxed mt-2.5">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#071A2B] text-[10px] font-mono text-[#67D9D0] flex items-center space-x-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#67D9D0] animate-pulse" />
                  <span>CELL AUTOMATION ACTIVE</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Telemetry Specifications Matrix */}
        <div className="p-8 sm:p-12 rounded-[40px] bg-[#0B2538]/70 border border-[#B8783E]/25 shadow-luxury-card space-y-8 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#D6A06A] uppercase tracking-wider font-bold">
                LABORATORY SPECIFICATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F7FAF9] uppercase mt-1">
                THERMAL CURVE CALIBRATION
              </h2>
            </div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono px-4 py-2 rounded-full bg-[#071A2B] border border-[#67D9D0]/30 text-[#67D9D0]">
              <Gauge className="w-4 h-4" />
              <span>DYNAMIC ISO-EXTRACTION PROFILES</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#071A2B] text-xs font-mono text-[#D6A06A]">
                  <th className="py-3 px-4">PARAMETER</th>
                  <th className="py-3 px-4 text-[#B8783E]">HOT FORMULATION</th>
                  <th className="py-3 px-4 text-[#67D9D0]">COOL FORMULATION</th>
                  <th className="py-3 px-4 text-[#A8B0B4]">MEASUREMENT METHOD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#071A2B] text-xs font-sans">
                {extractionSpecs.map((spec, i) => (
                  <tr key={i} className="hover:bg-[#071A2B]/40 transition-colors">
                    <td className="py-4 px-4 font-display font-bold text-[#F7FAF9]">{spec.label}</td>
                    <td className="py-4 px-4 font-mono font-bold text-[#D6A06A]">{spec.hot}</td>
                    <td className="py-4 px-4 font-mono font-bold text-[#67D9D0]">{spec.cool}</td>
                    <td className="py-4 px-4 text-[#A8B0B4] font-mono text-[11px]">{spec.metric}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Deep Tech Process Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-[36px] bg-[#0B2538]/50 border border-[#B8783E]/20 space-y-4">
            <div className="p-3 rounded-xl bg-[#071A2B] text-[#B8783E] w-fit">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#F7FAF9]">
              THERMAL INDUCTION BLOOM
            </h3>
            <p className="text-xs sm:text-sm text-[#A8B0B4] leading-relaxed">
              Traditional machines extract at fixed temperatures, scorching delicate oils. Our system delivers a 68°C pre-wetting bloom stage that opens micro-channels in the coffee bed before applying full 9.2-bar pressure, unlocking rich chocolate, toffee, and floral aromas with zero bitterness.
            </p>
          </div>

          <div className="p-8 rounded-[36px] bg-[#0B2538]/50 border border-[#67D9D0]/20 space-y-4">
            <div className="p-3 rounded-xl bg-[#071A2B] text-[#67D9D0] w-fit">
              <Snowflake className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#F7FAF9]">
              CRYOGENIC NITRO FLASH CHILL
            </h3>
            <p className="text-xs sm:text-sm text-[#A8B0B4] leading-relaxed">
              For cold beverages, our nitrogen injection chamber flash-chills freshly extracted concentrate to 04°C in 1.4 seconds under 45 PSI inert nitrogen. This prevents flavor oxidation and produces millions of velvety micro-bubbles without melting ice cubes into the recipe.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4 space-y-4">
          <h3 className="font-display font-bold text-xl text-[#F7FAF9]">
            EXPERIENCE THE EXTRACTION ENGINE LIVE
          </h3>
          <button
            onClick={() => startPageTransition('/make-your-coffee', 'MAKE YOUR COFFEE')}
            className="px-8 py-4 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase shadow-luxury hover:brightness-110 transition-all inline-flex items-center space-x-2"
          >
            <span>LAUNCH CUSTOM COFFEE LAB</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Technology;
