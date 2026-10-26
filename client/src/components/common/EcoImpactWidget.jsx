import React from 'react';
import { Leaf, Droplets, Sparkles, ShieldCheck } from 'lucide-react';
import { calculateEcoSavings } from '../../utils/ecoImpact';

export default function EcoImpactWidget({ orderCount = 3 }) {
  const savings = calculateEcoSavings(orderCount);

  return (
    <div className="p-5 rounded-3xl bg-gradient-to-br from-[#2A1B16] to-[#3C2A21] border border-emerald-500/30 shadow-xl text-[#F4E8D1] font-mono">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Leaf className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#EEDCC6]">Eco-Vessel Impact</h4>
            <p className="text-[10px] text-[#F4E8D1]/60">Single-use plastic diversion</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[10px] text-emerald-300 font-bold">
          Zero Waste Partner
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center my-3">
        <div className="p-2.5 rounded-2xl bg-[#2A1B16]/80 border border-[#EEDCC6]/10">
          <span className="text-lg font-bold text-emerald-400 block">{savings.cupsAvoided}</span>
          <span className="text-[9px] text-[#EEDCC6]/70 uppercase">Cups Saved</span>
        </div>

        <div className="p-2.5 rounded-2xl bg-[#2A1B16]/80 border border-[#EEDCC6]/10">
          <span className="text-lg font-bold text-sky-400 block">{savings.waterSavedLiters}L</span>
          <span className="text-[9px] text-[#EEDCC6]/70 uppercase">Water Preserved</span>
        </div>

        <div className="p-2.5 rounded-2xl bg-[#2A1B16]/80 border border-[#EEDCC6]/10">
          <span className="text-lg font-bold text-amber-300 block">{savings.co2SavedKg}kg</span>
          <span className="text-[9px] text-[#EEDCC6]/70 uppercase">CO₂ Offset</span>
        </div>
      </div>

      <p className="text-[10px] text-[#EEDCC6]/60 text-center italic mt-2 flex items-center justify-center gap-1">
        <ShieldCheck className="w-3 h-3 text-emerald-400" /> Every reusable bottle craft contributes to global reforestation.
      </p>
    </div>
  );
}
