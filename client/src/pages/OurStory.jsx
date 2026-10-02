import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../context/LoadingContext';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import { Compass, Sparkles, ArrowRight, Award, Coffee, ShieldCheck } from 'lucide-react';

export const OurStory = () => {
  const { startPageTransition } = usePageLoader();

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-luxury opacity-90 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#EEDCC6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* Story Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30">
            <Compass className="w-3.5 h-3.5" />
            <span>BRAND GENESIS & PHILOSOPHY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            COFFEE WITHOUT LIMITS.
          </h1>
          <p className="text-sm sm:text-base text-[#EEDCC6]/80 font-sans leading-relaxed">
            The story of an international coffee concept born from the intersection of volcanic agronomy, precision thermodynamics, and bespoke customer creativity.
          </p>
        </div>

        {/* Triple-Wave Emblem Deep Dive */}
        <div className="p-8 sm:p-12 rounded-[40px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
            <div className="p-6 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/40 shadow-coffee-glow">
              <TripleWaveEmblem size={96} animate />
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

          <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-[#EEDCC6]/85 font-sans leading-relaxed">
            <p>
              The HOT COOL SHAKE insignia is composed of three interlocking fluid ribbons forming an isometric circle:
            </p>
            <ul className="space-y-2.5">
              <li className="flex items-start space-x-3">
                <span className="font-mono text-xs font-bold text-[#EEDCC6] bg-[#2A1B16] px-2 py-0.5 rounded-md">HOT</span>
                <span><strong>Rising Steam Ribbon:</strong> Capturing the thermal bloom at 68°C that unlocks dark cocoa, toasted hazelnut, and deep cremas.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="font-mono text-xs font-bold text-[#EEDCC6] bg-[#2A1B16] px-2 py-0.5 rounded-md">COOL</span>
                <span><strong>Ice Crystal Facet:</strong> Honoring our 24-hour sub-zero nitrogen slow-drip extraction at 04°C for pristine clarity and zero bitterness.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="font-mono text-xs font-bold text-[#EEDCC6] bg-[#2A1B16] px-2 py-0.5 rounded-md">SHAKE</span>
                <span><strong>Centrifugal Vortex Ribbon:</strong> Representing high-velocity molecular aeration blending gelato, espresso, and rare botanical syrups into velvet silk.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Editorial Photo Essay & Craftsmanship Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 p-6 rounded-3xl bg-[#3C2A21]/50 border border-[#EEDCC6]/15">
            <div className="h-56 rounded-2xl overflow-hidden bg-[#2A1B16]">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
                alt="Single-Origin Volcanic Sourcing"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-display font-bold text-xl text-[#F4E8D1]">
              1. DIRECT SINGLE-ORIGIN
            </h3>
            <p className="text-xs text-[#EEDCC6]/80 font-sans leading-relaxed">
              We work exclusively with micro-lot farmers in Antigua, Yirgacheffe, and Sumatra. Every harvest batch is verified for soil health, elevation, and cup score above 88 points.
            </p>
          </div>

          <div className="space-y-4 p-6 rounded-3xl bg-[#3C2A21]/50 border border-[#EEDCC6]/15">
            <div className="h-56 rounded-2xl overflow-hidden bg-[#2A1B16]">
              <img
                src="https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop"
                alt="Thermal Precision Engineering"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-display font-bold text-xl text-[#F4E8D1]">
              2. PRECISION THERMAL LOCK
            </h3>
            <p className="text-xs text-[#EEDCC6]/80 font-sans leading-relaxed">
              Our vessels eliminate single-use waste forever. Engineered with aerospace titanium and double-walled vacuum insulation, your drink remains exactly at 04°C or 68°C for over 24 hours.
            </p>
          </div>

          <div className="space-y-4 p-6 rounded-3xl bg-[#3C2A21]/50 border border-[#EEDCC6]/15">
            <div className="h-56 rounded-2xl overflow-hidden bg-[#2A1B16]">
              <img
                src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=800&auto=format&fit=crop"
                alt="Customer Co-Creation"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-display font-bold text-xl text-[#F4E8D1]">
              3. YOU ARE THE ALCHEMIST
            </h3>
            <p className="text-xs text-[#EEDCC6]/80 font-sans leading-relaxed">
              No predetermined rules. Whether you crave Madagascar vanilla at sub-zero with oat cream or dark chocolate mocha at 68°C, our virtual laboratory gives you complete creative mastery.
            </p>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center pt-8">
          <button
            onClick={() => startPageTransition('/make-your-coffee', 'VIRTUAL COFFEE LAB')}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#EEDCC6] to-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-coffee-glow hover:shadow-2xl transition-all"
          >
            <span>STEP INTO THE COFFEE LAB</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
