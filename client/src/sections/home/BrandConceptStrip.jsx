import React from 'react';
import { motion } from 'framer-motion';
import { TripleWaveEmblem } from '../../components/common/TripleWaveLogo';
import { Flame, Snowflake, Wind, Sparkles } from 'lucide-react';

export const BrandConceptStrip = () => {
  const pillars = [
    {
      title: 'HOT',
      subtitle: 'Thermal Extraction (68°C)',
      description: 'Precision thermal bloom extracting rich cocoa, toasted nuts, and aromatic crema without bitterness.',
      icon: Flame,
      color: '#EEDCC6',
    },
    {
      title: 'COOL',
      subtitle: 'Sub-Zero Cryo-Brew (04°C)',
      description: '24-hour slow steep under positive nitrogen pressure, locking in floral brightness and silky natural sweetness.',
      icon: Snowflake,
      color: '#F4E8D1',
    },
    {
      title: 'SHAKE',
      subtitle: 'Vortex Micro-Blend',
      description: 'Centrifugal vortex aeration fusing single-estate espresso with organic gelato and botanical extracts.',
      icon: Wind,
      color: '#EEDCC6',
    },
  ];

  return (
    <section className="py-16 bg-[#3C2A21] text-[#F4E8D1] border-y border-[#EEDCC6]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-3 py-1 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE TRIPLE-WAVE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#F4E8D1] tracking-tight">
            ONE COFFEE. INFINITE POSSIBILITIES.
          </h2>
          <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans">
            Every creation is calibrated across three fundamental temperature and viscosity states.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-[#2A1B16] border border-[#EEDCC6]/20 hover:border-[#EEDCC6]/50 shadow-card-lux transition-all duration-300 group relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-[#3C2A21] text-[#EEDCC6] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-black text-[#EEDCC6]/30 group-hover:text-[#EEDCC6] transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-black text-[#F4E8D1] uppercase tracking-wide">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono font-bold text-[#EEDCC6] tracking-wider uppercase mb-3">
                    {pillar.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EEDCC6]/10 flex items-center justify-between text-[11px] font-mono text-[#EEDCC6]/70">
                  <span>TELEMETRY READY</span>
                  <span className="font-bold uppercase group-hover:underline">LEARN MORE →</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandConceptStrip;
