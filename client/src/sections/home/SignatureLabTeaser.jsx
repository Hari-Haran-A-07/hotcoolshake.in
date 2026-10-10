import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { TripleWaveEmblem } from '../../components/common/TripleWaveLogo';
import {
  Sparkles,
  ArrowRight,
  Droplet,
  Flame,
  Snowflake,
  RotateCw,
} from 'lucide-react';

export const SignatureLabTeaser = () => {
  const { startPageTransition } = usePageLoader();

  const steps = [
    {
      num: '01',
      title: 'CHOOSE YOUR BOTTLE',
      desc: 'Classic, Signature, Slim, Premium, or Travel vessel with 3D rotation and thermal retention.',
    },
    {
      num: '02',
      title: 'CHOOSE YOUR FLAVOR',
      desc: 'Global flavor library: Madagascar vanilla, smoked caramel, pistachio, dark mocha, and single roasts.',
    },
    {
      num: '03',
      title: 'CHOOSE CONDITION',
      desc: '68°C Thermal Steam Bloom or 04°C Sub-Zero Cryogenic flash chilling.',
    },
    {
      num: '04',
      title: 'PREPARATION AUTOMATION',
      desc: 'Accelerated thermal simulation: Coffee pour, flavor blend, temperature lock, and quality check.',
    },
  ];

  return (
    <section className="py-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden border-t border-[#EEDCC6]/15">
      {/* Radial Atmosphere */}
      <div className="absolute inset-0 bg-radial-coffee opacity-90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 lg:p-16 rounded-[40px] bg-[#3C2A21] border-2 border-[#EEDCC6]/30 shadow-coffee-card relative overflow-hidden">
          {/* Background Emblem Watermark */}
          <div className="absolute top-6 right-6 opacity-20 pointer-events-none">
            <TripleWaveEmblem size={130} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#EEDCC6] uppercase font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#EEDCC6]" />
                <span>THE SIGNATURE EXPERIENCE</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase leading-tight text-[#F4E8D1]">
                MAKE YOUR <span className="text-brand-gradient">COFFEE.</span>
              </h2>

              <p className="text-base sm:text-lg font-mono text-[#EEDCC6] font-bold tracking-widest uppercase">
                YOU CREATE IT. WE CRAFT IT.
              </p>

              <p className="text-sm sm:text-base text-[#EEDCC6]/80 leading-relaxed max-w-xl font-sans">
                Step into our interactive coffee laboratory. Select your custom ergonomic vessel, calibrate single-origin extracts, choose your thermal state, and watch the preparation unfold in real-time.
              </p>

              {/* Steps List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {steps.map((st) => (
                  <div
                    key={st.num}
                    className="p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20 flex items-start space-x-3"
                  >
                    <span className="font-mono text-sm font-black text-[#2A1B16] bg-[#EEDCC6] px-2 py-0.5 rounded-lg">
                      {st.num}
                    </span>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-[#F4E8D1] tracking-wider uppercase">
                        {st.title}
                      </h4>
                      <p className="text-[11px] text-[#EEDCC6]/75 mt-0.5 leading-snug font-sans">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => startPageTransition('/make-your-coffee', 'COFFEE LAB')}
                  data-cursor="create"
                  className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-brand-gradient text-[#2A1B16] font-mono text-xs sm:text-sm font-black tracking-widest uppercase shadow-cream-glow hover:brightness-105 transition-all duration-300 transform hover:-translate-y-0.5"
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
                <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#EEDCC6]/20 via-[#3C2A21]/30 to-transparent blur-2xl pointer-events-none" />

                <div className="relative w-48 sm:w-56 h-88 sm:h-96 rounded-[44px] border-4 border-[#EEDCC6]/40 bg-[#2A1B16]/95 shadow-2xl p-3 flex flex-col justify-end backdrop-blur-md">
                  {/* Cap */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#3C2A21] rounded-b-xl border-b border-[#EEDCC6]/40 flex items-center justify-center">
                    <div className="w-10 h-1 bg-[#EEDCC6]/60 rounded-full" />
                  </div>

                  {/* Liquid Base */}
                  <div className="w-full h-3/4 rounded-[34px] bg-coffee-gradient relative overflow-hidden flex items-center justify-center shadow-inner border border-[#EEDCC6]/20">
                    <div className="p-3.5 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/50 shadow-lg">
                      <TripleWaveEmblem size={52} animate />
                    </div>
                  </div>

                  {/* Bottom Label */}
                  <div className="absolute bottom-3 inset-x-4 flex justify-between items-center text-[9px] font-mono text-[#EEDCC6] font-bold z-30">
                    <span className="bg-[#3C2A21] px-2 py-0.5 rounded border border-[#EEDCC6]/20">LAB-001</span>
                    <span className="bg-[#3C2A21] px-2 py-0.5 rounded border border-[#EEDCC6]/20">HOT • COOL • SHAKE</span>
                  </div>
                </div>

                <div className="w-44 h-4 bg-black/60 rounded-full blur-md mt-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureLabTeaser;
