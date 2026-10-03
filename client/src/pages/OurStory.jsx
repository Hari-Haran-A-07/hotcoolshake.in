import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../context/LoadingContext';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Coffee,
  ShieldCheck,
  Flame,
  Snowflake,
  Wind,
  Globe2,
  Award,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export const OurStory = () => {
  const { startPageTransition } = usePageLoader();

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#071A2B] text-[#F7FAF9] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-navy opacity-90 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-radial-glow pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#67D9D0]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#B8783E]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        {/* Story Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#D6A06A] uppercase font-bold px-4 py-1.5 rounded-full bg-[#0B2538] border border-[#B8783E]/30"
          >
            <Compass className="w-3.5 h-3.5 text-[#B8783E]" />
            <span>BRAND MANIFESTO & ORIGIN PHILOSOPHY</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F7FAF9] uppercase"
          >
            COFFEE REDEFINED. <br />
            <span className="text-gradient-brand">YOUR CREATION.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#A8B0B4] font-sans leading-relaxed"
          >
            HOT COOL SHAKE is an international coffee brand engineered at the crossroads of single-origin terroir agronomy, precision thermodynamic extraction, and customer co-creation.
          </motion.p>
        </div>

        {/* Triple-Wave Emblem Deep Dive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-[40px] bg-[#0B2538]/80 border border-[#B8783E]/25 shadow-luxury-card grid grid-cols-1 lg:grid-cols-12 gap-10 items-center backdrop-blur-md"
        >
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
            <div className="p-8 rounded-full bg-[#071A2B] border border-[#B8783E]/40 shadow-luxury">
              <TripleWaveEmblem size={110} animate />
            </div>
            <div>
              <h3 className="font-display font-black text-2xl text-[#F7FAF9]">
                THE TRIPLE-WAVE EMBLEM
              </h3>
              <p className="text-xs font-mono text-[#67D9D0] uppercase tracking-widest mt-1">
                STEAM • CRYSTAL • VORTEX
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm text-[#A8B0B4] font-sans leading-relaxed">
            <p>
              The HOT COOL SHAKE visual identity is built around three interlocking fluid ribbons forming a continuous isometric harmony:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#071A2B]/80 border border-[#B8783E]/30 flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-[#B8783E]/15 text-[#B8783E] shrink-0 mt-0.5">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#D6A06A] uppercase tracking-wide">
                    RIBBON 01 — HOT (Rising Steam)
                  </h4>
                  <p className="text-xs text-[#A8B0B4] mt-1 leading-relaxed">
                    Smooth, organic flowing form representing thermal bloom at 68°C. Releases volatile aromatic compounds, dark chocolate notes, and dense hazelnut crema.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#071A2B]/80 border border-[#67D9D0]/30 flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-[#67D9D0]/15 text-[#67D9D0] shrink-0 mt-0.5">
                  <Snowflake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#67D9D0] uppercase tracking-wide">
                    RIBBON 02 — COOL (Ice Crystal)
                  </h4>
                  <p className="text-xs text-[#A8B0B4] mt-1 leading-relaxed">
                    Sharp, geometric crystalline contours celebrating our 24-hour nitrogen flash chill at 04°C for absolute crispness and crisp fruit clarity.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#071A2B]/80 border border-[#168C8A]/30 flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-[#168C8A]/20 text-[#67D9D0] shrink-0 mt-0.5">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#D6A06A] uppercase tracking-wide">
                    RIBBON 03 — SHAKE (Centrifugal Vortex)
                  </h4>
                  <p className="text-xs text-[#A8B0B4] mt-1 leading-relaxed">
                    Circular dynamic spiral embodying molecular vortex agitation, unifying espresso, artisan syrups, and micro-aerated milk into a silky emulsion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pillars of Craftsmanship */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-display font-black text-[#F7FAF9] uppercase">
              OUR PILLARS OF CRAFTSMANSHIP
            </h2>
            <p className="text-xs sm:text-sm text-[#A8B0B4]">
              How we unite ethical origin agriculture with aerospace-grade beverage engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 rounded-3xl bg-[#0B2538]/60 border border-[#B8783E]/20 hover:border-[#B8783E]/50 transition-all">
              <div className="h-56 rounded-2xl overflow-hidden bg-[#071A2B] relative">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
                  alt="Single-Origin Terroir"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-transparent to-transparent" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#D6A06A] font-bold">PILLAR 01</div>
                <h3 className="font-display font-bold text-xl text-[#F7FAF9]">
                  SINGLE-ORIGIN VOLCANIC LOTS
                </h3>
                <p className="text-xs text-[#A8B0B4] font-sans leading-relaxed">
                  We partner directly with micro-lot farmers in Antigua, Yirgacheffe, and Sumatra. Every harvest batch is cupped and verified for scores exceeding 88 SCA points.
                </p>
              </div>
            </div>

            <div className="space-y-4 p-6 rounded-3xl bg-[#0B2538]/60 border border-[#67D9D0]/20 hover:border-[#67D9D0]/50 transition-all">
              <div className="h-56 rounded-2xl overflow-hidden bg-[#071A2B] relative">
                <img
                  src="https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop"
                  alt="Precision Thermal Lock"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-transparent to-transparent" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#67D9D0] font-bold">PILLAR 02</div>
                <h3 className="font-display font-bold text-xl text-[#F7FAF9]">
                  THERMODYNAMIC PRECISION
                </h3>
                <p className="text-xs text-[#A8B0B4] font-sans leading-relaxed">
                  Custom vacuum-insulated vessels and precision automated extraction cells ensure your beverage locks in ideal temperature without dilution for hours.
                </p>
              </div>
            </div>

            <div className="space-y-4 p-6 rounded-3xl bg-[#0B2538]/60 border border-[#B8783E]/20 hover:border-[#B8783E]/50 transition-all">
              <div className="h-56 rounded-2xl overflow-hidden bg-[#071A2B] relative">
                <img
                  src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=800&auto=format&fit=crop"
                  alt="Customer Alchemist"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-transparent to-transparent" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#D6A06A] font-bold">PILLAR 03</div>
                <h3 className="font-display font-bold text-xl text-[#F7FAF9]">
                  THE CUSTOMER AS ALCHEMIST
                </h3>
                <p className="text-xs text-[#A8B0B4] font-sans leading-relaxed">
                  No rigid rules. You select the vessel, single-origin bean, botanicals, sweetness profile, and exact temperature to engineer your personal masterpiece.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Journey Timeline */}
        <div className="p-8 sm:p-12 rounded-[40px] bg-[#0B2538]/60 border border-[#67D9D0]/20 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#F7FAF9] uppercase">
              THE JOURNEY: FROM SOIL TO SIP
            </h3>
            <p className="text-xs text-[#A8B0B4]">
              Trace our 5-step seed-to-cup lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'High-Altitude Harvest', desc: 'Handpicked shade-grown Arabica cherries above 1,800m.' },
              { step: '02', title: 'Solar Drying & Roasting', desc: 'Custom micro-batch roast curves tailored to bean density.' },
              { step: '03', title: 'Digital Formulation', desc: 'Customers calibrate recipes via the Make Your Coffee lab.' },
              { step: '04', title: 'Precision Extraction', desc: 'Dual-thermal robotic cells brew at calibrated 68°C or 04°C.' },
              { step: '05', title: 'Circular Bottle Delivery', desc: 'Zero-waste reusable vessel dispatched via climate EV.' },
            ].map((st) => (
              <div key={st.step} className="p-4 rounded-2xl bg-[#071A2B] border border-[#B8783E]/20 space-y-2">
                <span className="text-xs font-mono font-bold text-[#67D9D0]">{st.step}</span>
                <h4 className="font-display font-bold text-sm text-[#F7FAF9]">{st.title}</h4>
                <p className="text-[11px] text-[#A8B0B4] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-4 space-y-4">
          <h3 className="font-display font-bold text-xl text-[#F7FAF9]">
            READY TO DESIGN YOUR SIGNATURE BLEND?
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => startPageTransition('/make-your-coffee', 'MAKE YOUR COFFEE')}
              className="px-8 py-4 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase hover:brightness-110 shadow-luxury transition-all inline-flex items-center space-x-2"
            >
              <span>ENTER THE COFFEE LAB</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => startPageTransition('/menu', 'INTERNATIONAL MENU')}
              className="px-8 py-4 rounded-full bg-[#0B2538] hover:bg-[#0B2538]/80 text-[#F7FAF9] border border-[#B8783E]/40 font-mono text-xs font-bold tracking-widest uppercase transition-all"
            >
              EXPLORE OUR MENU
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
