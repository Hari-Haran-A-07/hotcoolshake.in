import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { Leaf, Recycle, Droplet, Sun, ArrowRight } from 'lucide-react';

export const SustainabilitySection = () => {
  const { startPageTransition } = usePageLoader();

  const initiatives = [
    {
      title: 'REUSABLE CIRCULAR BOTTLES',
      desc: 'Our borosilicate glass and titanium flasks are engineered for lifetime circular reuse, eliminating single-use waste.',
      icon: Recycle,
      metric: '0%',
      metricLabel: 'Single-Use Plastic',
    },
    {
      title: 'RESPONSIBLE SOURCING',
      desc: '100% of single-origin coffee lots purchased through direct-trade contracts paying well above Fair Trade baseline.',
      icon: Leaf,
      metric: '+45%',
      metricLabel: 'Above Base Rates',
    },
    {
      title: 'COFFEE GROUNDS REUSE',
      desc: 'Spent espresso grounds are converted into organic soil nutrients and bio-composite packaging.',
      icon: Droplet,
      metric: '98%',
      metricLabel: 'Byproduct Upcycled',
    },
    {
      title: 'ENERGY-EFFICIENT ROASTERIES',
      desc: 'Every flagship roastery lab and virtual preparation line operates on certified solar power and grid renewables.',
      icon: Sun,
      metric: '100%',
      metricLabel: 'Renewable Power',
    },
  ];

  return (
    <section className="py-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden border-t border-[#EEDCC6]/15">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-radial-coffee opacity-90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header (Section 37) */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-3 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30">
            <Leaf className="w-3.5 h-3.5 text-[#EEDCC6]" />
            <span>CIRCULAR COMMITMENT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            BETTER COFFEE. <span className="text-brand-gradient">BETTER FUTURE.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans">
            Luxury coffee must be regenerative. We uphold uncompromising ethics across sourcing, reusable vessels, and zero-emission dispatch.
          </p>
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initiatives.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-[#3C2A21]/80 border border-[#EEDCC6]/20 hover:border-[#EEDCC6]/50 shadow-coffee-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="p-3.5 rounded-2xl bg-[#2A1B16] text-[#EEDCC6] w-fit mb-6 border border-[#EEDCC6]/30">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="font-display font-black text-3xl sm:text-4xl text-[#F4E8D1] mb-1">
                    {item.metric}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-[#EEDCC6] uppercase tracking-wider mb-4">
                    {item.metricLabel}
                  </div>

                  <h3 className="font-display font-bold text-base text-[#F4E8D1] mb-2 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#EEDCC6]/80 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#2A1B16] text-[10px] font-mono text-[#EEDCC6]/70">
                  CIRCULAR AUDIT VERIFIED
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => startPageTransition('/sustainability', 'SUSTAINABILITY')}
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-brand-gradient text-[#2A1B16] font-mono text-xs font-bold tracking-widest uppercase shadow-cream-glow hover:brightness-105 transition-all"
          >
            <span>EXPLORE OUR SUSTAINABILITY REPORT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
