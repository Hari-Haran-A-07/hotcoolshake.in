import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { useCart } from '../../context/CartContext';
import { Sparkles, Flame, Snowflake, RotateCw, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

export const RecommendationQuizSection = () => {
  const [mood, setMood] = useState('ENERGIZED');
  const [temperature, setTemperature] = useState('COOL');
  const [flavor, setFlavor] = useState('BOLD');
  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const { startPageTransition } = usePageLoader();
  const { addToCart } = useCart();

  const moods = ['ENERGIZED', 'RELAXED', 'FOCUSED', 'REFRESHED', 'INDULGENT'];
  const temperatures = ['HOT', 'COOL'];
  const flavors = ['SWEET', 'BOLD', 'CREAMY', 'NUTTY', 'CHOCOLATE', 'FRUITY'];

  const calculateRecommendation = () => {
    // Engine logic matching mood, temperature, and flavor
    let match = {
      name: 'Sub-Zero Nitro Cold Brew',
      slug: 'sub-zero-nitro-cold-brew',
      tagline: 'High caffeine velocity with cascading nitrogen micro-foam',
      temperature: 'COOL',
      price: 6.75,
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop',
      notes: ['Dark Cocoa', 'Crisp Finish', '100% Pure Origin'],
    };

    if (temperature === 'HOT') {
      if (flavor === 'SWEET' || flavor === 'CREAMY') {
        match = {
          name: 'Smoked Caramel Flat White',
          slug: 'smoked-caramel-flat-white',
          tagline: 'Micro-textured foam infused with slow-simmered caramel',
          temperature: 'HOT',
          price: 6.25,
          image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=800&auto=format&fit=crop',
          notes: ['Brown Butter', 'Sea Salt', '68°C Steam Bloom'],
        };
      } else if (flavor === 'CHOCOLATE') {
        match = {
          name: 'Obsidian Velvet Cortado',
          slug: 'obsidian-velvet-cortado',
          tagline: 'Intense double ristretto cut with silky chocolate oat milk',
          temperature: 'HOT',
          price: 5.75,
          image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop',
          notes: ['Dark Cocoa', 'Roasted Walnut', 'Antigua Lot'],
        };
      } else {
        match = {
          name: 'Madagascar Vanilla Bean Latte',
          slug: 'madagascar-vanilla-bean-latte',
          tagline: 'Bourbon vanilla caviar bloomed into espresso',
          temperature: 'HOT',
          price: 6.50,
          image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
          notes: ['Bourbon Vanilla', 'Smooth Crema', 'Ethiopian Roast'],
        };
      }
    } else {
      if (flavor === 'NUTTY' || mood === 'INDULGENT') {
        match = {
          name: 'Glacier Pistachio Iced Cloud',
          slug: 'glacier-pistachio-iced-cloud',
          tagline: 'Bronte pistachio cold foam over single-origin espresso',
          temperature: 'COOL',
          price: 7.25,
          image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop',
          notes: ['Sicilian Pistachio', 'Himalayan Salt', '04°C Cryo'],
        };
      } else if (mood === 'INDULGENT' || flavor === 'CHOCOLATE') {
        match = {
          name: 'Triple-Wave Espresso Velvet Shake',
          slug: 'triple-wave-espresso-velvet-shake',
          tagline: 'Vortex-blended espresso, Madagascar gelato, and cocoa nibs',
          temperature: 'SHAKE',
          price: 7.95,
          image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop',
          notes: ['Gelato Base', 'Cocoa Nibs', 'Vortex Blended'],
        };
      }
    }

    setRecommendedProduct(match);
    setHasCalculated(true);
  };

  const handleOrderRecommendation = (e) => {
    if (!recommendedProduct) return;
    const rect = e.currentTarget.getBoundingClientRect();
    addToCart(recommendedProduct, 1, {}, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <section className="py-20 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden border-t border-[#EEDCC6]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#3C2A21] rounded-[40px] p-8 sm:p-12 border-2 border-[#EEDCC6]/20 shadow-coffee-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Interactive Quiz Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#EEDCC6]" />
                <span>PERSONALIZED RECOMMENDATION ENGINE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-[#F4E8D1]">
                FIND YOUR <span className="text-brand-gradient">PERFECT COFFEE</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans">
                Tell us your current mood, temperature preference, and favorite flavor notes. Our algorithm calibrates the optimal cup.
              </p>

              {/* Step 1: Mood */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-wider text-[#EEDCC6] uppercase block">
                  01 • WHAT IS YOUR MOOD?
                </span>
                <div className="flex flex-wrap gap-2">
                  {moods.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMood(m)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                        mood === m
                          ? 'bg-[#EEDCC6] text-[#2A1B16] shadow-md font-black'
                          : 'bg-[#2A1B16] text-[#EEDCC6]/80 hover:text-[#F4E8D1] border border-[#EEDCC6]/20'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Temperature */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-wider text-[#EEDCC6] uppercase block">
                  02 • TEMPERATURE STATE
                </span>
                <div className="flex gap-3">
                  {temperatures.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTemperature(t)}
                      className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                        temperature === t
                          ? 'bg-[#EEDCC6] text-[#2A1B16] shadow-md font-black'
                          : 'bg-[#2A1B16] text-[#EEDCC6]/80 hover:text-[#F4E8D1] border border-[#EEDCC6]/20'
                      }`}
                    >
                      {t === 'HOT' ? <Flame className="w-4 h-4" /> : <Snowflake className="w-4 h-4" />}
                      <span>{t}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Flavor */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-wider text-[#EEDCC6] uppercase block">
                  03 • PRIMARY FLAVOR DESIRE
                </span>
                <div className="flex flex-wrap gap-2">
                  {flavors.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFlavor(f)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                        flavor === f
                          ? 'bg-[#EEDCC6] text-[#2A1B16] shadow-md font-black'
                          : 'bg-[#2A1B16] text-[#EEDCC6]/80 hover:text-[#F4E8D1] border border-[#EEDCC6]/20'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit / Match CTA */}
              <div className="pt-2">
                <button
                  onClick={calculateRecommendation}
                  className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-full bg-brand-gradient text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-cream-glow hover:brightness-105 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>CALCULATE MY MATCH</span>
                </button>
              </div>
            </div>

            {/* Right: Recommendation Result Card */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                {recommendedProduct ? (
                  <motion.div
                    key={recommendedProduct.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-6 sm:p-8 rounded-3xl bg-[#2A1B16] border-2 border-[#EEDCC6]/40 shadow-2xl space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#EEDCC6]">
                      <span className="flex items-center space-x-1.5 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-[#EEDCC6]" />
                        <span>OPTIMAL MATCH FOUND</span>
                      </span>
                      <span>${recommendedProduct.price.toFixed(2)}</span>
                    </div>

                    <div className="h-48 rounded-2xl overflow-hidden bg-[#3C2A21] border border-[#EEDCC6]/20">
                      <img
                        src={recommendedProduct.image}
                        alt={recommendedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="text-2xl font-display font-black text-[#F4E8D1] uppercase">
                        {recommendedProduct.name}
                      </h3>
                      <p className="text-xs text-[#EEDCC6]/80 font-sans mt-1">
                        {recommendedProduct.tagline}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {recommendedProduct.notes.map((n, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono text-[#EEDCC6] bg-[#3C2A21] px-2.5 py-0.5 rounded-full border border-[#EEDCC6]/20"
                        >
                          {n}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button
                        onClick={handleOrderRecommendation}
                        className="flex-grow py-3 rounded-full bg-brand-gradient text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-md hover:brightness-105 transition-all"
                      >
                        ORDER THIS CREATION
                      </button>
                      <button
                        onClick={() => startPageTransition('/make-your-coffee', 'COFFEE LAB')}
                        className="p-3 rounded-full bg-[#3C2A21] text-[#EEDCC6] hover:bg-[#EEDCC6] hover:text-[#2A1B16] transition-colors"
                        title="Customize in Lab"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-8 rounded-3xl bg-[#2A1B16]/60 border border-[#EEDCC6]/20 text-center space-y-3 py-16">
                    <Sparkles className="w-8 h-8 text-[#EEDCC6] mx-auto animate-pulse" />
                    <h3 className="font-display font-bold text-lg text-[#F4E8D1]">
                      CALIBRATE YOUR CUP
                    </h3>
                    <p className="text-xs font-sans text-[#EEDCC6]/70 max-w-xs mx-auto">
                      Select your parameters on the left to reveal your bespoke beverage recommendation.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationQuizSection;
