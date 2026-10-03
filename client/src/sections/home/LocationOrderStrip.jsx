import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { TripleWaveEmblem } from '../../components/common/TripleWaveLogo';
import { MapPin, ArrowRight, Truck, Sparkles, Coffee } from 'lucide-react';

export const LocationOrderStrip = () => {
  const { startPageTransition } = usePageLoader();

  return (
    <section className="py-20 bg-[#071A2B] text-[#F7FAF9] relative overflow-hidden border-t border-b border-[#B8783E]/20">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-radial-navy opacity-85 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-[40px] bg-gradient-to-r from-[#0B2538] via-[#071A2B] to-[#0B2538] p-8 sm:p-14 border-2 border-[#B8783E]/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-6 text-center lg:text-left">
            <div className="hidden sm:flex p-4 rounded-3xl bg-[#071A2B] border border-[#B8783E]/40 shadow-bronze-glow flex-shrink-0">
              <TripleWaveEmblem size={64} animate />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#67D9D0] uppercase font-bold px-3 py-1 rounded-full bg-[#0B2538] border border-[#67D9D0]/30">
                <MapPin className="w-3.5 h-3.5 text-[#B8783E]" />
                <span>EXPERIENCE IN PERSON OR ORDER DIRECT TO YOUR DOOR</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-[#F7FAF9] uppercase">
                READY TO CREATE YOUR <span className="text-brand-gradient">SIGNATURE CUP?</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#A8B0B4] font-sans max-w-xl">
                Visit our Flagship Roastery Labs in Mumbai, Singapore, Dubai, London, and New York, or configure your custom bottle online for precision climate-locked dispatch.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button
              onClick={() => startPageTransition('/make-your-coffee', 'VIRTUAL COFFEE LAB')}
              data-cursor="create"
              className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>MAKE YOUR COFFEE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => startPageTransition('/locations', 'STORE LOCATOR')}
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-[#0B2538] hover:bg-[#0B2538]/80 text-[#F7FAF9] font-mono text-xs font-bold tracking-widest uppercase border border-[#67D9D0]/30 hover:border-[#67D9D0] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>FIND A LOCATION</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationOrderStrip;
