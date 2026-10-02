import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { TripleWaveEmblem } from '../../components/common/TripleWaveLogo';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export const StorySection = () => {
  const { startPageTransition } = usePageLoader();

  return (
    <section className="py-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden border-b border-[#EEDCC6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Imagery Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[36px] overflow-hidden bg-[#3C2A21] border border-[#EEDCC6]/25 shadow-espresso-dark">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop"
                alt="Specialty Roasting Craftsmanship"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B16] via-transparent to-transparent" />

              {/* Inset Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#2A1B16]/90 backdrop-blur-md border border-[#EEDCC6]/30 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <TripleWaveEmblem size={36} />
                  <div>
                    <div className="font-display font-bold text-sm text-[#F4E8D1]">
                      ESTABLISHED 2025
                    </div>
                    <div className="text-[10px] font-mono text-[#EEDCC6]">
                      AN INTERNATIONAL COFFEE VISION
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs font-bold text-[#EEDCC6]">100% DIRECT TRADE</div>
                  <div className="text-[9px] font-mono text-[#EEDCC6]/70">SINGLE ORIGIN LOTS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Manifesto */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
              <Compass className="w-4 h-4" />
              <span>THE BRAND MANIFESTO</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-[#F4E8D1] uppercase leading-tight">
              COFFEE WITHOUT LIMITS.
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#EEDCC6]/85 font-sans leading-relaxed">
              <p>
                HOT COOL SHAKE was founded on a singular conviction: that coffee should never be constrained by traditional temperature barriers or rigid menu boards.
              </p>
              <p>
                We fuse world-class agronomy with digital micro-calibration. By sourcing rare micro-lots from volcanic elevations across Ethiopia, Guatemala, and Sumatra, we give customers the digital canvas to design their bespoke beverage at exact cryogenic or thermal points.
              </p>
              <p className="italic text-[#EEDCC6] font-serif text-sm sm:text-base border-l-2 border-[#EEDCC6] pl-4 py-1">
                "From your imagination to your cup — hot, cool, or vortex blended. Always your way."
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => startPageTransition('/story', 'COFFEE WITHOUT LIMITS')}
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#EEDCC6] hover:bg-[#F4E8D1] text-[#2A1B16] font-mono text-xs sm:text-sm font-black tracking-widest uppercase shadow-coffee-glow hover:shadow-2xl transition-all"
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
