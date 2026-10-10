import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  const metrics = [
    {
      value: '100%',
      label: 'Circular Thermal Vessels',
      sub: 'Zero single-use paper or plastic cups utilized across our entire global flagship network.',
    },
    {
      value: '+45%',
      label: 'Direct Trade Premium',
      sub: 'Paid above global commodity minimums directly to micro-lot farm families.',
    },
    {
      value: '98.4%',
      label: 'Closed-Loop Water Recovery',
      sub: 'Multi-stage reverse-osmosis filtration with regenerative recycling.',
    },
    {
      value: '0 g',
      label: 'Net Carbon per Extraction',
      sub: 'Offset via certified agroforestry biodiversity projects in Colombia and Ethiopia.',
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#EEDCC6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#3C2A21]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 shadow-sm"
          >
            <Leaf className="w-3.5 h-3.5 text-[#EEDCC6]" />
            <span>CIRCULAR PLANETARY ETHICS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase"
          >
            BETTER COFFEE. <br />
            <span className="text-[#EEDCC6]">BETTER FUTURE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#EEDCC6]/80 font-sans leading-relaxed"
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
              className="p-8 rounded-[28px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 shadow-xl space-y-3 backdrop-blur-sm hover:border-[#EEDCC6]/50 transition-all"
            >
              <div className="font-display font-black text-4xl sm:text-5xl text-[#EEDCC6]">
                {m.value}
              </div>
              <h3 className="font-mono text-xs font-bold text-[#F4E8D1] uppercase tracking-wider">
                {m.label}
              </h3>
              <p className="text-xs text-[#EEDCC6]/75 font-sans leading-relaxed">
                {m.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Deep Dive Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-[32px] bg-[#3C2A21]/70 border border-[#EEDCC6]/20 space-y-4 shadow-lg">
            <div className="p-3.5 rounded-2xl bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30 w-fit">
              <Recycle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#F4E8D1]">
              1. 100% CIRCULAR VESSEL PROGRAM
            </h3>
            <p className="text-xs sm:text-sm text-[#EEDCC6]/75 font-sans leading-relaxed">
              Every HOT COOL SHAKE beverage is served in an aerospace titanium-coated or borosilicate vessel that can be cleaned, sanitized, and refilled at any global flagship roastery with zero single-use trash.
            </p>
          </div>

          <div className="p-8 rounded-[32px] bg-[#3C2A21]/70 border border-[#EEDCC6]/20 space-y-4 shadow-lg">
            <div className="p-3.5 rounded-2xl bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30 w-fit">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#F4E8D1]">
              2. SHADE-GROWN AGROECOLOGY
            </h3>
            <p className="text-xs sm:text-sm text-[#EEDCC6]/75 font-sans leading-relaxed">
              We exclusively source Arabica varietals cultivated under natural multi-strata forest canopies. This shields fragile soil from erosion, preserves native wildlife habitats, and eliminates synthetic chemicals.
            </p>
          </div>

          <div className="p-8 rounded-[32px] bg-[#3C2A21]/70 border border-[#EEDCC6]/20 space-y-4 shadow-lg">
            <div className="p-3.5 rounded-2xl bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30 w-fit">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#F4E8D1]">
              3. 100% SOLAR ROASTING & EV DISPATCH
            </h3>
            <p className="text-xs sm:text-sm text-[#EEDCC6]/75 font-sans leading-relaxed">
              Our micro-lot roasters and extraction laboratory cells are 100% powered by local renewable solar arrays. Intra-city deliveries are dispatched in climate-locked electric vehicles with zero tailpipe emissions.
            </p>
          </div>
        </div>

        {/* Reusable Vessel Lifecycle Infographic Box */}
        <div className="p-8 sm:p-12 rounded-[32px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#EEDCC6] uppercase tracking-wider font-bold">
                CLOSED-LOOP INITIATIVE
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-[#F4E8D1] uppercase mt-1">
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
              <div key={st.num} className="p-5 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20 space-y-2">
                <span className="text-xs font-mono font-bold text-[#EEDCC6]">{st.num}</span>
                <h4 className="font-display font-bold text-sm text-[#F4E8D1]">{st.title}</h4>
                <p className="text-xs text-[#EEDCC6]/70 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4 space-y-4">
          <h3 className="font-display font-bold text-xl text-[#F4E8D1]">
            JOIN THE ZERO-WASTE REVOLUTION
          </h3>
          <Link
            to="/make-your-coffee"
            className="px-8 py-4 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-xl hover:bg-[#F4E8D1] transition-all inline-flex items-center space-x-2"
          >
            <span>ORDER IN A REUSABLE VESSEL</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
