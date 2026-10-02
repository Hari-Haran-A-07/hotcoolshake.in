import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { TripleWaveEmblem } from '../../components/common/TripleWaveLogo';
import {
  Sparkles,
  ArrowRight,
  Sliders,
  Layers,
  Flame,
  Snowflake,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

export const SignatureLabTeaser = () => {
  const { startPageTransition } = usePageLoader();

  const labSteps = [
    { step: '01', title: 'CHOOSE BOTTLE', desc: 'Select from 5 thermal vessels including Classic Borosilicate & Obsidian Titanium.' },
    { step: '02', title: 'CALIBRATE FLAVORS', desc: 'Blend 15+ rare flavors (Madagascar Vanilla, Pistachio, Maple) with intensity sliders.' },
    { step: '03', title: 'SET TEMPERATURE', desc: 'Choose Cryogenic 04°C Chilled or Precision Thermal 68°C Heated extraction.' },
    { step: '04', title: 'AUTOMATION CHAMBER', desc: 'Simulate virtual refrigeration or induction heating chambers with live telemetry.' },
  ];

  return (
    <section className="py-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden border-b border-[#EEDCC6]/20">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#EEDCC6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3C2A21]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Lab Concept */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
              <Sparkles className="w-4 h-4" />
              <span>THE SIGNATURE EXPERIENCE</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-[#F4E8D1] uppercase leading-tight">
              MAKE YOUR COFFEE.<br />
              <span className="text-[#EEDCC6]">VIRTUAL LABORATORY.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#EEDCC6]/80 font-sans leading-relaxed">
              Step into our interactive digital coffee laboratory. Treat customization like an alchemical craft: select your vacuum-sealed vessel, calibrate single-origin espresso bases, layer rare botanical syrups, and watch the automated temperature cycle unfold before dispatch.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {labSteps.map((s) => (
                <div
                  key={s.step}
                  className="p-4 rounded-2xl bg-[#3C2A21]/50 border border-[#EEDCC6]/15 space-y-1.5"
                >
                  <div className="flex items-center space-x-2 text-[#EEDCC6] font-mono text-xs font-bold">
                    <span>STEP {s.step}</span>
                    <span>•</span>
                    <span className="text-[#F4E8D1]">{s.title}</span>
                  </div>
                  <p className="text-xs text-[#EEDCC6]/70 font-sans">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => startPageTransition('/make-your-coffee', 'VIRTUAL COFFEE LAB')}
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#EEDCC6] to-[#F4E8D1] text-[#2A1B16] font-mono text-xs sm:text-sm font-black tracking-widest uppercase shadow-coffee-glow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <span>ENTER LAB & CRAFT YOUR COFFEE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Virtual Lab Interactive Preview Card */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 rounded-[36px] bg-gradient-to-b from-[#3C2A21] to-[#2A1B16] border border-[#EEDCC6]/30 shadow-2xl relative overflow-hidden"
            >
              {/* Lab Interface Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#EEDCC6]/15">
                <div className="flex items-center space-x-3">
                  <TripleWaveEmblem size={36} />
                  <div>
                    <div className="font-display font-bold text-sm text-[#F4E8D1]">
                      COFFEE LAB OS v4.2
                    </div>
                    <div className="text-[10px] font-mono text-[#EEDCC6]/70">
                      LIVE CALIBRATION ACTIVE
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-[10px] font-mono text-[#EEDCC6] flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Lab Visual Simulation */}
              <div className="my-8 py-8 px-6 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20 flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-44 rounded-2xl border-2 border-[#EEDCC6]/40 bg-[#3C2A21] overflow-hidden flex flex-col justify-end p-1 shadow-espresso-dark">
                    <div className="w-full h-3/4 bg-gradient-to-t from-[#2A1B16] via-[#3C2A21] to-[#C68B59] rounded-xl flex items-center justify-center">
                      <TripleWaveEmblem size={28} />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-3 px-2 py-0.5 rounded-full bg-[#EEDCC6] text-[#2A1B16] text-[9px] font-mono font-bold">
                    04°C CHILLED
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-display font-bold text-[#F4E8D1]">
                    SIGNATURE OBSIDIAN FLASK (550ML)
                  </div>
                  <div className="text-xs font-mono text-[#EEDCC6]">
                    Madagascar Vanilla (Strong) + Sea Salt Caramel (Medium)
                  </div>
                </div>

                {/* Telemetry Progress */}
                <div className="w-full max-w-xs space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-[#EEDCC6]/70">
                    <span>CYRO-INDUCTION PROGRESS</span>
                    <span className="text-[#F4E8D1] font-bold">100% COMPLETE</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#3C2A21] rounded-full overflow-hidden border border-[#EEDCC6]/20">
                    <div className="h-full w-full bg-[#EEDCC6] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Interactive CTA */}
              <button
                onClick={() => startPageTransition('/make-your-coffee', 'VIRTUAL COFFEE LAB')}
                className="w-full py-3.5 rounded-2xl bg-[#3C2A21] hover:bg-[#EEDCC6] text-[#F4E8D1] hover:text-[#2A1B16] font-mono text-xs font-bold tracking-widest uppercase border border-[#EEDCC6]/30 transition-all flex items-center justify-center space-x-2"
              >
                <span>OPEN FULL INTERACTIVE LAB</span>
                <Sliders className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureLabTeaser;
