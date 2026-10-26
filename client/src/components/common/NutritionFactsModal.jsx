import React from 'react';
import { X, Zap, Heart, ShieldAlert, Award } from 'lucide-react';

export default function NutritionFactsModal({ isOpen, onClose, item = {} }) {
  if (!isOpen) return null;

  const nutrition = item.nutrition || {
    calories: 140,
    caffeineMg: 150,
    sugarsG: 12,
    fatG: 3.5,
    proteinG: 4.0,
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-[#2A1B16] border border-[#EEDCC6]/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#F4E8D1] overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#EEDCC6]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EEDCC6]/20">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#EEDCC6]/70 uppercase">HOT COOL SHAKE LABS</span>
            <h3 className="text-xl font-serif font-bold text-[#F4E8D1]">{item.name || 'Artisanal Blend'}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#3C2A21] flex items-center justify-center hover:bg-[#EEDCC6]/20 transition-colors"
            aria-label="Close nutrition facts modal"
          >
            <X className="w-5 h-5 text-[#EEDCC6]" />
          </button>
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="p-4 rounded-2xl bg-[#3C2A21]/60 border border-[#EEDCC6]/15 flex flex-col items-center justify-center text-center">
            <Heart className="w-5 h-5 text-[#EEDCC6] mb-1" />
            <span className="text-2xl font-bold font-mono text-[#F4E8D1]">{nutrition.calories}</span>
            <span className="text-xs text-[#EEDCC6]/70 uppercase tracking-wider">Calories (kcal)</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#3C2A21]/60 border border-[#EEDCC6]/15 flex flex-col items-center justify-center text-center">
            <Zap className="w-5 h-5 text-amber-400 mb-1" />
            <span className="text-2xl font-bold font-mono text-amber-300">{nutrition.caffeineMg} mg</span>
            <span className="text-xs text-[#EEDCC6]/70 uppercase tracking-wider">Caffeine Boost</span>
          </div>
        </div>

        {/* Nutritional Breakdown Bars */}
        <div className="space-y-3 font-mono text-xs mb-6">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-[#EEDCC6]/80">Sugars</span>
              <span>{nutrition.sugarsG}g</span>
            </div>
            <div className="w-full bg-[#3C2A21] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#EEDCC6] h-full" style={{ width: `${Math.min(nutrition.sugarsG * 4, 100)}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-[#EEDCC6]/80">Protein</span>
              <span>{nutrition.proteinG}g</span>
            </div>
            <div className="w-full bg-[#3C2A21] h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full" style={{ width: `${Math.min(nutrition.proteinG * 8, 100)}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-[#EEDCC6]/80">Total Fat</span>
              <span>{nutrition.fatG}g</span>
            </div>
            <div className="w-full bg-[#3C2A21] h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-500/80 h-full" style={{ width: `${Math.min(nutrition.fatG * 6, 100)}%` }} />
            </div>
          </div>
        </div>

        {/* Footer info badge */}
        <div className="pt-4 border-t border-[#EEDCC6]/10 flex items-center justify-between text-[11px] text-[#EEDCC6]/60">
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-400" /> 100% Single-Origin Arabica
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-[#EEDCC6]" /> Lab Certified
          </span>
        </div>
      </div>
    </div>
  );
}
