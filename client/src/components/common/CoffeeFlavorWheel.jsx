import React, { useState } from 'react';
import { Sparkles, Info } from 'lucide-react';

const FLAVOR_CATEGORIES = [
  {
    name: 'Fruity & Citrus',
    color: 'from-amber-500 to-orange-400',
    notes: ['Bergamot', 'Dried Apricot', 'Cranberry', 'Blood Orange'],
    description: 'Bright, lively acidity with vibrant sparkling fruit highlights.',
  },
  {
    name: 'Nutty & Cocoa',
    color: 'from-yellow-700 to-amber-800',
    notes: ['Roasted Hazelnut', 'Belgian Dark Chocolate', 'Toasted Almond', 'Cacao Nibs'],
    description: 'Deep, decadent richness with velvet body and earthy undertones.',
  },
  {
    name: 'Sweet & Caramelly',
    color: 'from-amber-400 to-yellow-600',
    notes: ['Madagascar Vanilla', 'Salted Butter Caramel', 'Molasses', 'Brown Sugar'],
    description: 'Silky smooth, lingering sweet finish reminiscent of confectioneries.',
  },
  {
    name: 'Floral & Botanical',
    color: 'from-rose-400 to-pink-500',
    notes: ['Jasmine Blossom', 'Lavender Essence', 'Chamomile', 'Orange Blossom'],
    description: 'Delicate, ethereal aromatics with aromatic high-frequency bouquet.',
  },
  {
    name: 'Spiced & Exotic',
    color: 'from-red-600 to-amber-700',
    notes: ['Ceylon Cinnamon', 'Cardamom Pod', 'Nutmeg', 'Star Anise'],
    description: 'Warming, intense aromatics providing depth to thermal preparations.',
  },
];

export default function CoffeeFlavorWheel({ onSelectNote }) {
  const [activeCategory, setActiveCategory] = useState(FLAVOR_CATEGORIES[0]);

  return (
    <div className="bg-[#3C2A21]/40 border border-[#EEDCC6]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#EEDCC6]/70 uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-300" /> Sensory Aroma Spectrum
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F4E8D1] mt-1">Coffee Flavor Wheel Explorer</h3>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FLAVOR_CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all ${
              activeCategory.name === cat.name
                ? 'bg-[#EEDCC6] text-[#2A1B16] font-bold shadow-lg scale-105'
                : 'bg-[#2A1B16]/80 text-[#F4E8D1]/80 hover:bg-[#3C2A21] border border-[#EEDCC6]/20'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Detail Showcase */}
      <div className="p-5 rounded-2xl bg-[#2A1B16]/70 border border-[#EEDCC6]/15">
        <p className="text-xs text-[#EEDCC6]/80 italic mb-4 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-amber-300" /> {activeCategory.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {activeCategory.notes.map((note) => (
            <button
              key={note}
              onClick={() => onSelectNote && onSelectNote(note)}
              className="p-3 rounded-xl bg-[#3C2A21]/80 border border-[#EEDCC6]/10 text-center hover:border-[#EEDCC6] hover:scale-105 transition-all text-xs font-mono text-[#F4E8D1]"
            >
              + {note}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
