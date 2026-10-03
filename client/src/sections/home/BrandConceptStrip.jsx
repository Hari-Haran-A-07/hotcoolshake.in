import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Snowflake, RotateCw, Sparkles } from 'lucide-react';

export const BrandConceptStrip = () => {
  const pillars = [
    {
      title: 'HOT',
      subtitle: 'Heat • Energy • Thermal Extraction',
      description:
        'Crafted at a precise 68°C to bloom full aromatic volatiles, single-origin caramel undertones, and velvety crema density.',
      color: '#B8783E',
      gradientClass: 'text-bronze-gradient',
      borderClass: 'border-[#B8783E]/40',
      icon: Flame,
      badge: 'THERMAL 68°C',
    },
    {
      title: 'COOL',
      subtitle: 'Ice • Refreshment • Cryogenic Lock',
      description:
        'Sub-zero flash chilled to 04°C, preserving delicate floral aromatics and nitrogen micro-bubbles with zero thermal degradation.',
      color: '#67D9D0',
      gradientClass: 'text-teal-gradient',
      borderClass: 'border-[#67D9D0]/40',
      icon: Snowflake,
      badge: 'CRYOGENIC 04°C',
    },
    {
      title: 'SHAKE',
      subtitle: 'Vortex • Mixing • Infinite Alchemy',
      description:
        'Sonic vortex homogenization that binds rare single-estate extracts with organic dairy and custom syrups into a velvety elixir.',
      color: '#D6A06A',
      gradientClass: 'text-brand-gradient',
      borderClass: 'border-[#D6A06A]/40',
      icon: RotateCw,
      badge: 'SONIC VORTEX',
    },
  ];

  return (
    <section className="py-20 bg-[#071A2B] relative overflow-hidden border-t border-b border-[#B8783E]/20">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-radial-navy opacity-80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Strip Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-[#D6A06A] uppercase">
            THE TRIPLE-WAVE PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight uppercase text-[#F7FAF9]">
            HOT + COOL + <span className="text-brand-gradient">SHAKE</span>
          </h2>
          <p className="text-sm text-[#A8B0B4]">
            Three fluid dimensions interlocking into one extraordinary beverage experience.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`p-8 rounded-3xl bg-[#0B2538]/70 border ${p.borderClass} shadow-luxury-card hover:translate-y-[-4px] transition-all duration-300 relative group overflow-hidden`}
              >
                {/* Subtle top glow */}
                <div
                  className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: p.color }}
                />

                <div className="flex items-center justify-between mb-6">
                  <div
                    className="p-3.5 rounded-2xl bg-[#071A2B] border border-white/10"
                    style={{ color: p.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#A8B0B4] px-2.5 py-1 rounded-full bg-[#071A2B] border border-white/5">
                    {p.badge}
                  </span>
                </div>

                <h3 className={`text-3xl sm:text-4xl font-display font-black tracking-tight uppercase ${p.gradientClass}`}>
                  {p.title}
                </h3>

                <h4 className="text-xs font-mono font-bold tracking-wider text-[#F7FAF9]/90 mt-1 mb-3">
                  {p.subtitle}
                </h4>

                <p className="text-xs sm:text-sm text-[#A8B0B4] leading-relaxed">
                  {p.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandConceptStrip;
