import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { TripleWaveEmblem } from '../../components/common/TripleWaveLogo';
import { ArrowRight, Compass, Flame, Snowflake, RotateCw } from 'lucide-react';

export const StorySection = () => {
  const { startPageTransition } = usePageLoader();

  return (
    <section className="py-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden border-t border-[#EEDCC6]/15">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-radial-coffee opacity-90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[40px] overflow-hidden bg-[#3C2A21] border-2 border-[#EEDCC6]/30 shadow-coffee-card">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop"
                alt="Specialty Roasting Craftsmanship"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B16] via-[#2A1B16]/30 to-transparent" />

              {/* Inset Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#2A1B16]/95 backdrop-blur-md border border-[#EEDCC6]/30 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <TripleWaveEmblem size={38} />
                  <div>
                    <div className="font-display font-bold text-sm text-[#F4E8D1]">
                      ESTABLISHED 2026
                    </div>
                    <div className="text-[10px] font-mono text-[#EEDCC6]">
                      HOT COOL SHAKE BRAND SYSTEM
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs font-bold text-[#EEDCC6]">100% DIRECT ORIGIN</div>
                  <div className="text-[9px] font-mono text-[#EEDCC6]/70">SUSTAINABLE HARVESTS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Manifesto (Section 32) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
              <Compass className="w-4 h-4 text-[#EEDCC6]" />
              <span>BRAND PHILOSOPHY & MANIFESTO</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-[#F4E8D1] uppercase leading-tight">
              MORE THAN <span className="text-brand-gradient">COFFEE.</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#EEDCC6]/80 font-sans leading-relaxed">
              <p>
                HOT COOL SHAKE exists to liberate coffee from rigid menus and outdated categories. We believe the customer is the ultimate creator.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#3C2A21] border border-[#EEDCC6]/20">
                  <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#EEDCC6] uppercase mb-1">
                    <Flame className="w-3.5 h-3.5 text-[#EEDCC6]" />
                    <span>HOT</span>
                  </div>
                  <p className="text-[11px] text-[#EEDCC6]/75">Traditional coffee warmth and deep thermal extraction.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#3C2A21] border border-[#EEDCC6]/20">
                  <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#F4E8D1] uppercase mb-1">
                    <Snowflake className="w-3.5 h-3.5 text-[#F4E8D1]" />
                    <span>COOL</span>
                  </div>
                  <p className="text-[11px] text-[#EEDCC6]/75">Modern refreshment with sub-zero cryo locking.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#3C2A21] border border-[#EEDCC6]/20">
                  <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#EEDCC6] uppercase mb-1">
                    <RotateCw className="w-3.5 h-3.5 text-[#EEDCC6]" />
                    <span>SHAKE</span>
                  </div>
                  <p className="text-[11px] text-[#EEDCC6]/75">Personal expression with sonic vortex blending.</p>
                </div>
              </div>

              <p className="italic text-[#F4E8D1] font-sans text-sm sm:text-base border-l-2 border-[#EEDCC6] pl-4 py-1">
                "From your imagination to your cup — engineered with precision agronomy and digital craft."
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => startPageTransition('/story', 'OUR STORY')}
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-brand-gradient text-[#2A1B16] font-mono text-xs sm:text-sm font-black tracking-widest uppercase shadow-cream-glow hover:brightness-105 transition-all"
              >
                <span>READ FULL STORY & TIMELINE</span>
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
