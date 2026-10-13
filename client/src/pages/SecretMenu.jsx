import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, Key, ShoppingBag, Eye, Zap, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { updatePageMeta } from '../utils/seo';

const SECRET_CREATIONS = [
  {
    id: 'sec-001',
    name: 'Cryo-Smoked Bourbon Vanilla Cold Drip',
    category: 'CRYOGENIC COLD',
    temperature: 'Sub-Zero Cryo Chill (-2°C)',
    base: 'Ethiopian Yirgacheffe Grade 1',
    vessel: 'Signature 500ml Double-Wall Titanium Flask',
    notes: 'Smoked oak barrel stave extraction, Madagascar vanilla caviar, nitrogen velvet foam.',
    price: 14.50,
    rarity: 'VAULT TIER 1',
  },
  {
    id: 'sec-002',
    name: 'Kyoto 24H Saffron Geisha Cloud',
    category: 'SLOW EXTRACT',
    temperature: 'Cellar Chill (+4°C)',
    base: 'Panama Hacienda La Esmeralda Geisha',
    vessel: 'Kyoto Hand-Blown Borosilicate Flask (750ml)',
    notes: 'Kashmiri saffron cold blossom steep, single-origin botanical sugar, floral jasmine aroma.',
    price: 18.00,
    rarity: 'LEGENDARY RESERVE',
  },
  {
    id: 'sec-003',
    name: 'Zero-Kelvin Velvet Pistachio Cortado',
    category: 'HOT EMULSION',
    temperature: 'Precision Thermal Scald (68°C)',
    base: 'Sumatra Mandheling Dark Silk',
    vessel: 'Matte Onyx Ceramic Tumbler (350ml)',
    notes: 'Bronte Sicilian pistachio paste, triple-filtered oat microfoam, crushed sea salt.',
    price: 12.00,
    rarity: 'VAULT TIER 2',
  },
  {
    id: 'sec-004',
    name: 'Midnight Obsidian Nitro Shake',
    category: 'LUXURY SHAKE',
    temperature: 'Gelato Vortex (-4°C)',
    base: 'Colombian Huila Decaf & Raw Cacao',
    vessel: 'Thermal Vacuum Shake Shaker (500ml)',
    notes: '85% Single-origin Ecuadorian dark chocolate, activated charcoal crema, hazelnut praline.',
    price: 13.50,
    rarity: 'LIMITED NIGHTDROP',
  },
];

export const SecretMenu = () => {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('hcs_vault_unlocked') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [errorShake, setErrorShake] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    updatePageMeta({
      title: 'Secret Connoisseur Vault',
      description: 'Exclusive underground barista creations, rare single-origin extractions, and secret drink vault.',
    });
  }, []);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode.trim().toUpperCase() === 'CHAMBERX' || passcode.trim().toUpperCase() === 'BARISTA') {
      setIsUnlocked(true);
      sessionStorage.setItem('hcs_vault_unlocked', 'true');
    } else {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 600);
    }
  };

  const handleQuickAdd = (drink, e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const startPos = rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : null;

    addToCart(
      {
        _id: drink.id,
        name: drink.name,
        price: drink.price,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
        category: drink.category,
      },
      1,
      {
        bottle: drink.vessel,
        temperature: drink.temperature,
        customBlend: true,
      },
      startPos
    );
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-[#F4E8D1]">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/20 text-xs font-mono text-[#C49A45] tracking-widest uppercase">
          {isUnlocked ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5" />}
          <span>UNDERGROUND BARISTA VAULT</span>
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
          Secret Connoisseur Archive
        </h1>
        <p className="text-xs sm:text-sm font-mono text-[#EEDCC6]/70 leading-relaxed">
          Unreleased molecular formulas crafted by our Lead Sensory Chemists. Available exclusively by clearance.
        </p>
      </div>

      {!isUnlocked ? (
        <motion.div
          animate={errorShake ? { x: [-10, 10, -10, 10, 0] } : {}}
          className="mt-12 max-w-md mx-auto p-8 rounded-2xl bg-[#3C2A21]/50 border border-[#EEDCC6]/20 shadow-2xl text-center space-y-6"
        >
          <div className="p-4 rounded-full bg-[#1C120C] border border-[#EEDCC6]/20 w-16 h-16 mx-auto flex items-center justify-center text-[#C49A45]">
            <Key className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold">Access Code Required</h3>
            <p className="text-xs font-mono text-[#EEDCC6]/60 mt-1">
              Hint: Enter code <span className="text-[#C49A45] font-bold">CHAMBERX</span> or ask your flagship barista.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <input
              type="text"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="ENTER CLEARANCE KEY"
              className="w-full text-center px-4 py-3 rounded-xl bg-[#1C120C] border border-[#EEDCC6]/30 text-sm font-mono font-bold tracking-widest text-[#EEDCC6] placeholder-[#EEDCC6]/30 focus:outline-none focus:border-[#C49A45] uppercase"
            />
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#C49A45] to-[#EEDCC6] text-[#2A1B16] font-mono font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
            >
              Authorize Access
            </button>
          </form>
        </motion.div>
      ) : (
        <div className="mt-14 space-y-8">
          <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>CLEARANCE GRANTED: VIP BARISTA PRIVILEGES ACTIVE</span>
            </div>
            <button
              onClick={() => {
                sessionStorage.removeItem('hcs_vault_unlocked');
                setIsUnlocked(false);
              }}
              className="hover:underline"
            >
              Lock Vault
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SECRET_CREATIONS.map((drink) => (
              <div
                key={drink.id}
                className="p-6 rounded-2xl bg-[#3C2A21]/30 border border-[#EEDCC6]/15 hover:border-[#EEDCC6]/35 transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C49A45]/20 border border-[#C49A45]/30 text-[10px] font-mono font-bold text-[#C49A45]">
                      {drink.rarity}
                    </span>
                    <span className="font-mono text-sm font-bold text-[#EEDCC6]">
                      ${drink.price.toFixed(2)}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#F4E8D1]">{drink.name}</h3>

                  <div className="text-xs font-mono space-y-1 text-[#EEDCC6]/70">
                    <p><span className="text-[#EEDCC6]/40 uppercase">Extraction:</span> {drink.temperature}</p>
                    <p><span className="text-[#EEDCC6]/40 uppercase">Bean Base:</span> {drink.base}</p>
                    <p><span className="text-[#EEDCC6]/40 uppercase">Vessel:</span> {drink.vessel}</p>
                  </div>

                  <p className="text-xs font-sans text-[#EEDCC6]/90 leading-relaxed bg-[#2A1B16]/60 p-3 rounded-lg border border-[#EEDCC6]/10">
                    {drink.notes}
                  </p>
                </div>

                <button
                  onClick={(e) => handleQuickAdd(drink, e)}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/25 hover:bg-[#EEDCC6] hover:text-[#2A1B16] text-xs font-mono font-bold transition-all shadow-md group"
                >
                  <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>COMMISSION TO ORDER BAG (${drink.price.toFixed(2)})</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecretMenu;
