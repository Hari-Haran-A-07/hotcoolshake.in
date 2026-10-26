import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function BaristaTipSelector({ subtotal = 0, onTipChange }) {
  const [selectedTip, setSelectedTip] = useState(15); // 15% default

  const handleSelect = (percent) => {
    setSelectedTip(percent);
    const amount = Math.round(subtotal * (percent / 100) * 100) / 100;
    if (onTipChange) onTipChange({ percentage: percent, amount });
  };

  const handleRoundUp = () => {
    setSelectedTip('round_up');
    const nextDollar = Math.ceil(subtotal);
    const diff = Math.round((nextDollar - subtotal) * 100) / 100;
    const amount = diff === 0 ? 1.0 : diff;
    if (onTipChange) onTipChange({ percentage: 0, amount, isRoundUp: true });
  };

  return (
    <div className="p-4 rounded-2xl bg-[#3C2A21]/60 border border-[#EEDCC6]/20">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono font-bold text-[#EEDCC6] flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> Barista Appreciation Pool
        </span>
        <span className="text-[10px] font-mono text-[#EEDCC6]/60">100% to our craft baristas</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[10, 15, 20].map((pct) => (
          <button
            key={pct}
            type="button"
            onClick={() => handleSelect(pct)}
            className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              selectedTip === pct
                ? 'bg-[#EEDCC6] text-[#2A1B16] scale-105 shadow-md'
                : 'bg-[#2A1B16]/80 text-[#F4E8D1] border border-[#EEDCC6]/15 hover:border-[#EEDCC6]'
            }`}
          >
            {pct}%
          </button>
        ))}

        <button
          type="button"
          onClick={handleRoundUp}
          className={`py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1 ${
            selectedTip === 'round_up'
              ? 'bg-[#EEDCC6] text-[#2A1B16] scale-105 shadow-md'
              : 'bg-[#2A1B16]/80 text-[#F4E8D1] border border-[#EEDCC6]/15 hover:border-[#EEDCC6]'
          }`}
        >
          <Sparkles className="w-3 h-3 text-amber-300" /> Round Up
        </button>
      </div>
    </div>
  );
}
