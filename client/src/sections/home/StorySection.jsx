import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { TripleWaveEmblem } from '../../components/common/TripleWaveLogo';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export const StorySection = () => {
  const { startPageTransition } = usePageLoader();

  return (
    <section className="py-24 bg-[#071A2B] text-[#F7FAF9] relative overflow-hidden border-t border-[#B8783E]/20">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-radial-navy opacity-90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Imagery Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[40px] overflow-hidden bg-[#0B2538] border-2 border-[#B8783E]/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop"
                alt="Specialty Roasting Craftsmanship"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-[#071A2B]/30 to-transparent" />

              {/* Inset Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#071A2B]/90 backdrop-blur-md border border-[#B8783E]/30 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <TripleWaveEmblem size={38} />
                  <div>
                    <div className="font-display font-bold text-sm text-[#F7FAF9]">
                      ESTABLISHED 2026
                    </div>
                    <div className="text-[10px] font-mono text-[#D6A06A]">
                      INTERNATIONAL COFFEE VISION
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs font-bold text-[#67D9D0]">100% DIRECT TRADE</div>
                  <div className="text-[9px] font-mono text-[#A8B0B4]">SINGLE ORIGIN HARVESTS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Manifesto */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0B2538] border border-[#B8783E]/30 text-xs font-mono font-bold tracking-widest text-[#D6A06A] uppercase">
              <Compass className="w-4 h-4 text-[#67D9D0]" />
              <span>THE BRAND MANIFESTO</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-[#F7FAF9] uppercase leading-tight">
              COFFEE WITHOUT <span className="text-brand-gradient">LIMITS.</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#A8B0B4] font-sans leading-relaxed">
              <p>
                HOT COOL SHAKE was founded on a singular conviction: that coffee should never be constrained by traditional temperature barriers or rigid menu boards.
              </p>
              <p>
                We fuse world-class agronomy with digital micro-calibration. By sourcing rare micro-lots from volcanic elevations across Ethiopia, Guatemala, Colombia, and Sumatra, we give customers the digital canvas to design their bespoke beverage at exact cryogenic or thermal points.
              </p>
              <p className="italic text-[#F7FAF9] font-sans text-sm sm:text-base border-l-2 border-[#B8783E] pl-4 py-1">
                "From your imagination to your cup — hot, cool, or vortex blended. Always your creation."
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => startPageTransition('/story', 'COFFEE WITHOUT LIMITS')}
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs sm:text-sm font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all"
              >
                <span>READ FULL STORY & PHILOSOPHY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
