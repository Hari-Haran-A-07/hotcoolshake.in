import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { TripleWaveEmblem } from '../../components/common/TripleWaveLogo';
import { MapPin, ArrowRight, Truck, Sparkles, Coffee } from 'lucide-react';

export const LocationOrderStrip = () => {
  const { startPageTransition } = usePageLoader();

  return (
    <section className="py-20 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden border-t border-b border-[#EEDCC6]/20">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-radial-luxury opacity-80 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-[40px] bg-gradient-to-r from-[#3C2A21] via-[#2A1B16] to-[#3C2A21] p-8 sm:p-14 border border-[#EEDCC6]/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-6 text-center lg:text-left">
            <div className="hidden sm:flex p-4 rounded-3xl bg-[#2A1B16] border border-[#EEDCC6]/30 shadow-coffee-glow flex-shrink-0">
              <TripleWaveEmblem size={64} animate />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-3 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/20">
                <MapPin className="w-3.5 h-3.5 text-[#EEDCC6]" />
                <span>EXPERIENCE IN PERSON OR AT YOUR DOOR</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
                READY FOR YOUR PERFECT CUP?
              </h3>
              <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans max-w-xl">
                Visit our Flagship Roastery Labs in London, New York, Singapore, Dubai, and Mumbai, or order instant precision delivery to your doorstep.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button
              onClick={() => startPageTransition('/make-your-coffee', 'VIRTUAL COFFEE LAB')}
              className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#EEDCC6] to-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-coffee-glow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>MAKE YOUR COFFEE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => startPageTransition('/locations', 'GLOBAL FLAGSHIP HUBS')}
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-[#2A1B16] hover:bg-[#3C2A21] text-[#F4E8D1] font-mono text-xs font-bold tracking-widest uppercase border border-[#EEDCC6]/30 transition-all duration-300 transform hover:-translate-y-0.5"
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
