import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { TripleWaveEmblem } from '../../components/common/TripleWaveLogo';
import { MapPin, ArrowRight } from 'lucide-react';

export const LocationOrderStrip = () => {
  const { startPageTransition } = usePageLoader();

  return (
    <section className="py-20 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden border-t border-b border-[#EEDCC6]/15">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-radial-coffee opacity-85 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-[40px] bg-gradient-to-r from-[#3C2A21] via-[#2A1B16] to-[#3C2A21] p-8 sm:p-14 border-2 border-[#EEDCC6]/30 shadow-coffee-card flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-6 text-center lg:text-left">
            <div className="hidden sm:flex p-4 rounded-3xl bg-[#2A1B16] border border-[#EEDCC6]/30 shadow-cream-glow flex-shrink-0">
              <TripleWaveEmblem size={64} animate />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-3 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30">
                <MapPin className="w-3.5 h-3.5 text-[#EEDCC6]" />
                <span>PICKUP IN-STORE OR PRECISION DELIVERY</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
                READY TO EXPERIENCE YOUR <span className="text-brand-gradient">CUSTOM CUP?</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans max-w-xl">
                Visit our Flagship Roasteries in Mumbai, Singapore, Dubai, London, and New York, or craft your custom bottle online for rapid dispatch.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto flex-shrink-0">
            <button
              onClick={() => startPageTransition('/make-your-coffee', 'COFFEE LAB')}
              data-cursor="create"
              className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-brand-gradient text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-cream-glow hover:brightness-105 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>MAKE YOUR COFFEE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => startPageTransition('/locations', 'STORE LOCATOR')}
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-[#3C2A21] hover:bg-[#3C2A21]/80 text-[#F4E8D1] font-mono text-xs font-bold tracking-widest uppercase border border-[#EEDCC6]/30 hover:border-[#EEDCC6] transition-all duration-300 transform hover:-translate-y-0.5"
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
