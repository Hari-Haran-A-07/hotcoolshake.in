import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../context/LoadingContext';
import {
  Leaf,
  Recycle,
  Droplet,
  Sun,
  ShieldCheck,
  ArrowRight,
  TreePine,
  Sparkles,
  Zap,
  Globe2,
} from 'lucide-react';

export const Sustainability = () => {
  const { startPageTransition } = usePageLoader();

  const metrics = [
    {
      value: '100%',
      label: 'Circular Thermal Vessels',
      sub: 'Zero single-use paper or plastic cups utilized across our entire global flagship network.',
      color: 'text-[#67D9D0]',
    },
    {
      value: '+45%',
      label: 'Direct Trade Premium',
      sub: 'Paid above global fair trade minimums directly to micro-lot farm families.',
      color: 'text-[#D6A06A]',
    },
    {
      value: '98.4%',
      label: 'Closed-Loop Water Recovery',
      sub: 'Multi-stage reverse-osmosis filtration with regenerative grey-water cycling.',
      color: 'text-[#67D9D0]',
    },
    {
      value: '0 g',
      label: 'Net Carbon per Extraction',
      sub: 'Offset via certified agroforestry biodiversity projects in Colombia and Ethiopia.',
      color: 'text-[#B8783E]',
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#071A2B] text-[#F7FAF9] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-navy opacity-90 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-[#67D9D0]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#B8783E]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#67D9D0] uppercase font-bold px-4 py-1.5 rounded-full bg-[#0B2538] border border-[#67D9D0]/30"
          >
            <Leaf className="w-3.5 h-3.5 text-[#67D9D0]" />
            <span>CIRCULAR PLANETARY ETHICS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F7FAF9] uppercase"
          >
            SUSTAINABILITY <br />
            <span className="text-gradient-brand">WITHOUT COMPROMISE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#A8B0B4] font-sans leading-relaxed"
          >
            We believe the future of luxury coffee is intrinsically regenerative. From volcanic soil to aerospace-grade reusable vessels, every step is audited for zero waste and maximum agricultural prosperity.
          </motion.p>
        </div>

        {/* 4 Large Visual Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-[32px] bg-[#0B2538]/80 border border-[#B8783E]/20 shadow-luxury-card space-y-3 backdrop-blur-sm hover:border-[#67D9D0]/40 transition-all"
            >
              <div className={`font-display font-black text-4xl sm:text-5xl ${m.color}`}>
                {m.value}
              </div>
              <h3 className="font-mono text-xs font-bold text-[#F7FAF9] uppercase tracking-wider">
                {m.label}
              </h3>
              <p className="text-xs text-[#A8B0B4] font-sans leading-relaxed">
                {m.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Deep Dive Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-[36px] bg-[#0B2538]/60 border border-[#67D9D0]/20 space-y-4">
            <div className="p-3.5 rounded-2xl bg-[#071A2B] text-[#67D9D0] border border-[#67D9D0]/20 w-fit">
              <Recycle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#F7FAF9]">
              1. 100% CIRCULAR VESSEL PROGRAM
            </h3>
            <p className="text-xs sm:text-sm text-[#A8B0B4] font-sans leading-relaxed">
              Every HOT COOL SHAKE beverage is served in an aerospace titanium-coated or borosilicate vessel that can be cleaned, sanitized, and refilled at any global flagship roastery with zero single-use trash.
            </p>
          </div>

          <div className="p-8 rounded-[36px] bg-[#0B2538]/60 border border-[#B8783E]/20 space-y-4">
            <div className="p-3.5 rounded-2xl bg-[#071A2B] text-[#D6A06A] border border-[#B8783E]/20 w-fit">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#F7FAF9]">
              2. SHADE-GROWN AGROECOLOGY
            </h3>
            <p className="text-xs sm:text-sm text-[#A8B0B4] font-sans leading-relaxed">
              We exclusively source Arabica varietals cultivated under natural multi-strata forest canopies. This shields fragile soil from erosion, preserves native wildlife habitats, and eliminates synthetic chemicals.
            </p>
          </div>

          <div className="p-8 rounded-[36px] bg-[#0B2538]/60 border border-[#168C8A]/20 space-y-4">
            <div className="p-3.5 rounded-2xl bg-[#071A2B] text-[#67D9D0] border border-[#168C8A]/30 w-fit">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#F7FAF9]">
              3. 100% SOLAR ROASTING & EV DISPATCH
            </h3>
            <p className="text-xs sm:text-sm text-[#A8B0B4] font-sans leading-relaxed">
              Our micro-lot roasters and extraction laboratory cells are 100% powered by local renewable solar arrays. Intra-city deliveries are dispatched in climate-locked electric vehicles with zero tailpipe emissions.
            </p>
          </div>
        </div>

        {/* Reusable Vessel Lifecycle Infographic Box */}
        <div className="p-8 sm:p-12 rounded-[40px] bg-[#0B2538]/80 border border-[#B8783E]/25 shadow-luxury-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#D6A06A] uppercase tracking-wider font-bold">
                CLOSED-LOOP INITIATIVE
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-[#F7FAF9] uppercase mt-1">
                HOW THE REUSABLE BOTTLE ECOSYSTEM WORKS
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { num: '01', title: 'Choose Your Bottle', desc: 'Select Classic Glass, Frosted Steel, or Titanium at checkout.' },
              { num: '02', title: 'Enjoy On The Move', desc: 'Vacuum insulation keeps 04°C or 68°C locked for up to 24 hours.' },
              { num: '03', title: 'Return or Refill', desc: 'Drop off at any flagship kiosk or swap via courier dispatch.' },
              { num: '04', title: 'Medical-Grade Clean', desc: 'Automated ultraviolet sanitization prepares vessel for next cycle.' },
            ].map((st) => (
              <div key={st.num} className="p-5 rounded-2xl bg-[#071A2B] border border-[#67D9D0]/20 space-y-2">
                <span className="text-xs font-mono font-bold text-[#67D9D0]">{st.num}</span>
                <h4 className="font-display font-bold text-sm text-[#F7FAF9]">{st.title}</h4>
                <p className="text-xs text-[#A8B0B4] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4 space-y-4">
          <h3 className="font-display font-bold text-xl text-[#F7FAF9]">
            JOIN THE ZERO-WASTE REVOLUTION
          </h3>
          <button
            onClick={() => startPageTransition('/make-your-coffee', 'MAKE YOUR COFFEE')}
            className="px-8 py-4 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase shadow-luxury hover:brightness-110 transition-all inline-flex items-center space-x-2"
          >
            <span>ORDER IN A REUSABLE VESSEL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
