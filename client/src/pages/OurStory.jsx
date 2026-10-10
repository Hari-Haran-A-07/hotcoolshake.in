import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Coffee,
  ShieldCheck,
  Flame,
  Snowflake,
  RotateCw,
  Globe2,
  Award,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export const OurStory = () => {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#EEDCC6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#3C2A21]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        {/* Story Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 shadow-sm"
          >
            <Compass className="w-3.5 h-3.5 text-[#EEDCC6]" />
            <span>BRAND MANIFESTO & ORIGIN PHILOSOPHY</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase"
          >
            MORE THAN COFFEE. <br />
            <span className="text-[#EEDCC6]">YOUR CREATION.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#EEDCC6]/80 font-sans leading-relaxed"
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
          className="p-8 sm:p-12 rounded-[32px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center backdrop-blur-md"
        >
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
            <div className="p-8 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/40 shadow-xl">
              <TripleWaveEmblem size={110} animate />
            </div>
            <div>
              <h3 className="font-display font-black text-2xl text-[#F4E8D1]">
                THE TRIPLE-WAVE EMBLEM
              </h3>
              <p className="text-xs font-mono text-[#EEDCC6] uppercase tracking-widest mt-1">
                STEAM • CRYSTAL • VORTEX
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm text-[#EEDCC6]/80 font-sans leading-relaxed">
            <p>
              The HOT COOL SHAKE visual identity is built around three interlocking fluid ribbons forming a continuous isometric harmony:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/25 flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-[#3C2A21] text-[#EEDCC6] shrink-0 mt-0.5 border border-[#EEDCC6]/20">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#EEDCC6] uppercase tracking-wide">
                    RIBBON 01 — HOT (Rising Steam)
                  </h4>
                  <p className="text-xs text-[#EEDCC6]/70 mt-1 leading-relaxed">
                    Smooth, organic flowing form representing thermal bloom at 68°C. Releases volatile aromatic compounds, dark chocolate notes, and dense hazelnut crema.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/25 flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-[#3C2A21] text-[#EEDCC6] shrink-0 mt-0.5 border border-[#EEDCC6]/20">
                  <Snowflake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#EEDCC6] uppercase tracking-wide">
                    RIBBON 02 — COOL (Ice Crystal)
                  </h4>
                  <p className="text-xs text-[#EEDCC6]/70 mt-1 leading-relaxed">
                    Sharp, crystalline contours celebrating our 24-hour nitrogen flash chill at 04°C for absolute crispness and zero ice dilution.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/25 flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-[#3C2A21] text-[#EEDCC6] shrink-0 mt-0.5 border border-[#EEDCC6]/20">
                  <RotateCw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#EEDCC6] uppercase tracking-wide">
                    RIBBON 03 — SHAKE (Centrifugal Vortex)
                  </h4>
                  <p className="text-xs text-[#EEDCC6]/70 mt-1 leading-relaxed">
                    Circular dynamic spiral embodying acoustic vortex agitation, unifying espresso, artisan syrups, and micro-aerated milk into a silky emulsion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pillars of Craftsmanship */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-display font-black text-[#F4E8D1] uppercase">
              OUR PILLARS OF CRAFTSMANSHIP
            </h2>
            <p className="text-xs sm:text-sm text-[#EEDCC6]/80">
              How we unite ethical origin agriculture with aerospace-grade beverage engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 rounded-3xl bg-[#3C2A21]/70 border border-[#EEDCC6]/20 hover:border-[#EEDCC6]/50 transition-all shadow-lg">
              <div className="h-56 rounded-2xl overflow-hidden bg-[#2A1B16] relative">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
                  alt="Single-Origin Terroir"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B16] via-transparent to-transparent" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#EEDCC6] font-bold">PILLAR 01</div>
                <h3 className="font-display font-bold text-xl text-[#F4E8D1]">
                  SINGLE-ORIGIN VOLCANIC LOTS
                </h3>
                <p className="text-xs text-[#EEDCC6]/75 font-sans leading-relaxed">
                  We partner directly with micro-lot farmers in Antigua, Yirgacheffe, and Sumatra. Every harvest batch is cupped and verified for scores exceeding 86+ SCA points.
                </p>
              </div>
            </div>

            <div className="space-y-4 p-6 rounded-3xl bg-[#3C2A21]/70 border border-[#EEDCC6]/20 hover:border-[#EEDCC6]/50 transition-all shadow-lg">
              <div className="h-56 rounded-2xl overflow-hidden bg-[#2A1B16] relative">
                <img
                  src="https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop"
                  alt="Precision Thermal Lock"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B16] via-transparent to-transparent" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#EEDCC6] font-bold">PILLAR 02</div>
                <h3 className="font-display font-bold text-xl text-[#F4E8D1]">
                  THERMODYNAMIC PRECISION
                </h3>
                <p className="text-xs text-[#EEDCC6]/75 font-sans leading-relaxed">
                  Custom vacuum-insulated vessels and precision automated extraction cells ensure your beverage locks in ideal temperature without dilution for hours.
                </p>
              </div>
            </div>

            <div className="space-y-4 p-6 rounded-3xl bg-[#3C2A21]/70 border border-[#EEDCC6]/20 hover:border-[#EEDCC6]/50 transition-all shadow-lg">
              <div className="h-56 rounded-2xl overflow-hidden bg-[#2A1B16] relative">
                <img
                  src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=800&auto=format&fit=crop"
                  alt="Customer Alchemist"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B16] via-transparent to-transparent" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#EEDCC6] font-bold">PILLAR 03</div>
                <h3 className="font-display font-bold text-xl text-[#F4E8D1]">
                  THE CUSTOMER AS ALCHEMIST
                </h3>
                <p className="text-xs text-[#EEDCC6]/75 font-sans leading-relaxed">
                  No rigid rules. You select the vessel, single-origin bean, botanicals, sweetness profile, and exact temperature to engineer your personal masterpiece.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Journey Timeline */}
        <div className="p-8 sm:p-12 rounded-[32px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 space-y-8 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#F4E8D1] uppercase">
              THE JOURNEY: FROM SOIL TO SIP
            </h3>
            <p className="text-xs text-[#EEDCC6]/80">
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
              <div key={st.step} className="p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20 space-y-2">
                <span className="text-xs font-mono font-bold text-[#EEDCC6]">{st.step}</span>
                <h4 className="font-display font-bold text-sm text-[#F4E8D1]">{st.title}</h4>
                <p className="text-[11px] text-[#EEDCC6]/70 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-4 space-y-4">
          <h3 className="font-display font-bold text-xl text-[#F4E8D1]">
            READY TO DESIGN YOUR SIGNATURE BLEND?
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/make-your-coffee"
              className="px-8 py-4 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase hover:bg-[#F4E8D1] shadow-xl transition-all inline-flex items-center space-x-2"
            >
              <span>ENTER THE COFFEE LAB</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/menu"
              className="px-8 py-4 rounded-full bg-[#3C2A21] hover:bg-[#2A1B16] text-[#F4E8D1] border border-[#EEDCC6]/30 font-mono text-xs font-bold tracking-widest uppercase transition-all"
            >
              EXPLORE OUR MENU
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
