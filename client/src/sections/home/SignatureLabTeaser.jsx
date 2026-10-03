import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { TripleWaveEmblem } from '../../components/common/TripleWaveLogo';
import {
  Sparkles,
  ArrowRight,
  Layers,
  Thermometer,
  Sliders,
  Award,
  CheckCircle2,
} from 'lucide-react';

export const SignatureLabTeaser = () => {
  const { startPageTransition } = usePageLoader();

  const steps = [
    {
      num: '01',
      title: 'CHOOSE YOUR BOTTLE',
      desc: 'Select from 5 realistic ergonomic vessels engineered for thermal retention.',
    },
    {
      num: '02',
      title: 'CHOOSE YOUR FLAVOUR',
      desc: 'Explore 15 single-origin bases, rare botanical essences, and organic infusions.',
    },
    {
      num: '03',
      title: 'CHOOSE TEMPERATURE',
      desc: 'Calibrate between 68°C Thermal Bloom or 04°C Sub-Zero Cryogenic Lock.',
    },
    {
      num: '04',
      title: 'REALISTIC PREPARATION',
      desc: 'Watch real-time automated chamber simulation and retrieve your bespoke bottle.',
    },
  ];

  return (
    <section className="py-24 bg-[#071A2B] text-[#F7FAF9] relative overflow-hidden border-t border-[#B8783E]/20">
      {/* Radial Atmosphere */}
      <div className="absolute inset-0 bg-radial-navy opacity-90 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#67D9D0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B8783E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 lg:p-16 rounded-[40px] bg-[#0B2538]/80 border-2 border-[#B8783E]/40 shadow-2xl relative overflow-hidden">
          {/* Subtle Corner Badge */}
          <div className="absolute top-6 right-6 opacity-30 pointer-events-none">
            <TripleWaveEmblem size={120} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#071A2B] border border-[#67D9D0]/30 text-xs font-mono text-[#67D9D0] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#B8783E]" />
                <span>SIGNATURE INTERACTIVE EXPERIENCE</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase leading-tight text-[#F7FAF9]">
                MAKE YOUR <span className="text-brand-gradient">COFFEE.</span>
              </h2>

              <p className="text-lg sm:text-xl font-mono text-[#D6A06A] font-bold">
                "Don't just order coffee. Create your own."
              </p>

              <p className="text-sm sm:text-base text-[#A8B0B4] leading-relaxed max-w-xl">
                Enter our flagship interactive laboratory. Choose your ergonomic vessel, calibrate single-origin extracts, select temperature dynamics, and watch your creation come alive in real-time.
              </p>

              {/* Steps List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {steps.map((st) => (
                  <div
                    key={st.num}
                    className="p-4 rounded-2xl bg-[#071A2B]/80 border border-[#B8783E]/20 flex items-start space-x-3"
                  >
                    <span className="font-mono text-sm font-black text-[#67D9D0] bg-[#0B2538] px-2 py-0.5 rounded-lg border border-[#67D9D0]/30">
                      {st.num}
                    </span>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-[#F7FAF9] tracking-wider uppercase">
                        {st.title}
                      </h4>
                      <p className="text-[11px] text-[#A8B0B4] mt-0.5 leading-snug">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => startPageTransition('/make-your-coffee', 'VIRTUAL COFFEE LAB')}
                  data-cursor="create"
                  className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs sm:text-sm font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>START CREATING NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Visual: Interactive Lab Hologram Bottle */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex flex-col items-center"
              >
                {/* Holographic Glowing Ring */}
                <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#B8783E]/20 via-[#67D9D0]/20 to-transparent blur-2xl pointer-events-none" />

                <div className="relative w-44 sm:w-52 h-84 sm:h-92 rounded-[40px] border-4 border-[#67D9D0]/40 bg-[#071A2B]/90 shadow-2xl p-2.5 flex flex-col justify-end backdrop-blur-md">
                  {/* Cap */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-18 h-6 bg-[#0B2538] rounded-b-xl border-b border-[#67D9D0]/40 flex items-center justify-center">
                    <div className="w-8 h-1 bg-[#B8783E]/60 rounded-full" />
                  </div>

                  {/* Liquid Base */}
                  <div className="w-full h-3/4 rounded-[30px] bg-brand-gradient relative overflow-hidden flex items-center justify-center shadow-inner">
                    <div className="p-3 rounded-full bg-[#071A2B]/90 border border-[#F7FAF9]/40 shadow-lg">
                      <TripleWaveEmblem size={48} animate />
                    </div>
                  </div>

                  {/* Bottom Label */}
                  <div className="absolute bottom-3 inset-x-4 flex justify-between items-center text-[9px] font-mono text-[#071A2B] font-black z-30">
                    <span className="bg-[#F7FAF9]/90 px-1.5 py-0.5 rounded">CUSTOM-001</span>
                    <span className="bg-[#F7FAF9]/90 px-1.5 py-0.5 rounded">HOT & COOL</span>
                  </div>
                </div>

                <div className="w-40 h-4 bg-black/50 rounded-full blur-md mt-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureLabTeaser;
