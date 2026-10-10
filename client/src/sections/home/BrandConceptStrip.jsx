import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Snowflake, RotateCw } from 'lucide-react';

export const BrandConceptStrip = () => {
  const pillars = [
    {
      title: 'HOT',
      subtitle: 'Warm Handcrafted Coffee',
      motionDesc: 'UPWARD RISING MOTION',
      description:
        'Crafted at calibrated 68°C thermal extraction to bloom full aromatic depth, dark cocoa undertones, and velvety crema density.',
      badge: '68°C THERMAL EXTRACTION',
      icon: Flame,
      animClass: 'animate-steam',
      motionType: 'upward',
    },
    {
      title: 'COOL',
      subtitle: 'Refreshing Chilled Coffee',
      motionDesc: 'DOWNWARD FLOATING MOTION',
      description:
        'Cryogenically flash-chilled to 04°C, locking micro-bubbles and natural sweetness with zero ice dilution or oxidation.',
      badge: '04°C CRYOGENIC LOCK',
      icon: Snowflake,
      animClass: '',
      motionType: 'floating',
    },
    {
      title: 'SHAKE',
      subtitle: 'Personalized Blended Coffee Experience',
      motionDesc: 'ROTATIONAL VORTEX MOTION',
      description:
        'Sonic vortex homogenization binding rare single-estate espresso with artisan gelato and organic essences into pure velvet.',
      badge: 'SONIC VORTEX ALCHEMY',
      icon: RotateCw,
      animClass: 'animate-vortex',
      motionType: 'vortex',
    },
  ];

  return (
    <section className="py-20 bg-[#2A1B16] relative overflow-hidden border-t border-b border-[#EEDCC6]/15">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-radial-coffee opacity-85 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Strip Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
            THE TRIPLE-WAVE PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase text-[#F4E8D1]">
            HOT + COOL + <span className="text-brand-gradient">SHAKE</span>
          </h2>
          <p className="text-sm text-[#EEDCC6]/80 font-sans">
            Three distinct sensory dimensions engineered into one cohesive international brand.
          </p>
        </div>

        {/* 3 Pillar Cards with Signature Motion Language (Section 63) */}
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
                className="p-8 rounded-3xl bg-[#3C2A21]/90 border border-[#EEDCC6]/20 shadow-coffee-card hover:border-[#EEDCC6]/60 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  {/* Icon with Motion Characteristic */}
                  <div className="p-3.5 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-[#EEDCC6]">
                    <Icon className={`w-6 h-6 ${p.animClass}`} />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#EEDCC6] px-2.5 py-1 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/20">
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-4xl font-display font-black tracking-tight uppercase text-[#F4E8D1]">
                  {p.title}
                </h3>

                <h4 className="text-xs font-mono font-bold tracking-wider text-[#EEDCC6] mt-1 mb-1">
                  {p.subtitle}
                </h4>

                <div className="text-[10px] font-mono text-[#EEDCC6]/60 uppercase tracking-widest mb-3">
                  MOTION: {p.motionDesc}
                </div>

                <p className="text-xs sm:text-sm text-[#EEDCC6]/85 leading-relaxed font-sans">
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
