import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import {
  Globe,
  MapPin,
  Sparkles,
  Flame,
  Snowflake,
  Wind,
  Compass,
  ArrowRight,
  Droplet,
} from 'lucide-react';

export const GlobalExperienceSection = () => {
  const { startPageTransition } = usePageLoader();

  const worldOrigins = [
    {
      country: 'Brazil',
      region: 'Cerrado Mineiro (Altitude 1,150m)',
      tagline: 'Sun-Drenched Chocolate Velvet',
      flavourProfile: ['Dark Cocoa', 'Roasted Hazelnut', 'Brown Cane Sugar'],
      roastStyle: 'Medium-Dark Artisan Roast',
      aroma: 'Dense toasted praline with sweet caramel finish',
      recommendedPrep: 'Sonic Vortex Shake & Cortado',
      temperatureRec: 'HOT 68°C',
      coordinates: { x: 34, y: 70 },
      flag: '🇧🇷',
      color: '#B8783E',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    },
    {
      country: 'Colombia',
      region: 'Huila Micro-Lot (Altitude 1,850m)',
      tagline: 'Silky Citrus & Golden Honey',
      flavourProfile: ['Red Apple', 'Caramelized Honey', 'Tangerine Zest'],
      roastStyle: 'Medium Blonde Espresso Roast',
      aroma: 'Bright floral jasmine with sweet stone-fruit bloom',
      recommendedPrep: 'Precision Thermal Pour-Over',
      temperatureRec: 'HOT 68°C',
      coordinates: { x: 28, y: 55 },
      flag: '🇨🇴',
      color: '#D6A06A',
      image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=800&auto=format&fit=crop',
    },
    {
      country: 'Ethiopia',
      region: 'Yirgacheffe Gedeo (Altitude 2,100m)',
      tagline: 'Wild Bergamot & Jasmine Bloom',
      flavourProfile: ['Bergamot Oil', 'Wild Peach', 'White Jasmine'],
      roastStyle: 'Light Nordic Thermal Roast',
      aroma: 'Perfumed floral lavender and crisp Meyer lemon',
      recommendedPrep: 'Cryogenic Nitro Flash Chill',
      temperatureRec: 'COOL 04°C',
      coordinates: { x: 58, y: 54 },
      flag: '🇪🇹',
      color: '#67D9D0',
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
    },
    {
      country: 'India',
      region: 'Chikmagalur Malabar (Altitude 1,300m)',
      tagline: 'Monsooned Cardamom & Earthy Spice',
      flavourProfile: ['Green Cardamom', 'Toasted Walnut', 'Clove Bark'],
      roastStyle: 'Full City Dark Roast',
      aroma: 'Warm monsoon earth, dark molasses and sweet pipe smoke',
      recommendedPrep: 'Thermal Double Extraction with Silk Oat Milk',
      temperatureRec: 'HOT 68°C',
      coordinates: { x: 70, y: 48 },
      flag: '🇮🇳',
      color: '#B8783E',
      image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop',
    },
    {
      country: 'Indonesia',
      region: 'Sumatra Lake Toba (Altitude 1,500m)',
      tagline: 'Volcanic Cedar & Dark Molasses',
      flavourProfile: ['Smoked Cedar', '70% Dark Cocoa', 'Black Truffle'],
      roastStyle: 'Wet-Hulled Dark Roast',
      aroma: 'Heavy syrupy body with earthy pine forest notes',
      recommendedPrep: 'Obsidian Velvet Cold Brew',
      temperatureRec: 'COOL 04°C',
      coordinates: { x: 79, y: 60 },
      flag: '🇮🇩',
      color: '#168C8A',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop',
    },
    {
      country: 'Vietnam',
      region: 'Da Lat Central Highlands (Altitude 1,600m)',
      tagline: 'Rich Robusta & Sweet Condensed Foam',
      flavourProfile: ['Roasted Butter', 'Dense Dark Fudge', 'Sweet Malt'],
      roastStyle: 'High-Altitude French Roast',
      aroma: 'Intense roasted chicory and bittersweet dark chocolate',
      recommendedPrep: 'Vortex Iced Cloud Shake',
      temperatureRec: 'COOL 04°C',
      coordinates: { x: 77, y: 50 },
      flag: '🇻🇳',
      color: '#D6A06A',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
    },
    {
      country: 'Costa Rica',
      region: 'Tarrazú Los Santos (Altitude 1,900m)',
      tagline: 'Crisp Green Apple & Brown Butter',
      flavourProfile: ['Crisp Apple', 'Brown Butter', 'Sugared Almond'],
      roastStyle: 'Honey-Processed Medium Roast',
      aroma: 'Fresh orchard blossom with vanilla wafer sweetness',
      recommendedPrep: 'Sub-Zero Cryo Sparkling Infusion',
      temperatureRec: 'COOL 04°C',
      coordinates: { x: 26, y: 52 },
      flag: '🇨🇷',
      color: '#67D9D0',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const [selectedOrigin, setSelectedOrigin] = useState(worldOrigins[2]); // Default Ethiopia

  return (
    <section className="py-24 bg-[#071A2B] text-[#F7FAF9] relative overflow-hidden border-t border-[#B8783E]/20">
      {/* Ambient background atmosphere */}
      <div className="absolute inset-0 bg-radial-navy opacity-90 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B8783E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#67D9D0]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0B2538] border border-[#67D9D0]/30 text-xs font-mono text-[#67D9D0] uppercase">
            <Globe className="w-3.5 h-3.5 text-[#B8783E]" />
            <span>INTERNATIONAL FLAVOUR EXPEDITION</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-[#F7FAF9]">
            COFFEE WITHOUT <span className="text-brand-gradient">BORDERS.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#A8B0B4] leading-relaxed">
            From volcanic Ethiopian peaks to high-altitude Costa Rican cloud forests. Discover the terroir, roast alchemy, and precision temperatures calibrated for each world origin.
          </p>
        </div>

        {/* Interactive World Map & Country Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Country Pills & Origin Details */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-wrap gap-2 pb-2">
              {worldOrigins.map((orig) => {
                const isSelected = selectedOrigin.country === orig.country;
                return (
                  <button
                    key={orig.country}
                    onClick={() => setSelectedOrigin(orig)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 ${
                      isSelected
                        ? 'bg-brand-gradient text-[#071A2B] shadow-bronze-glow font-black scale-105'
                        : 'bg-[#0B2538] text-[#A8B0B4] hover:text-[#F7FAF9] border border-[#B8783E]/20 hover:border-[#67D9D0]/40'
                    }`}
                  >
                    <span>{orig.flag}</span>
                    <span>{orig.country}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Origin Detailed Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedOrigin.country}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-8 rounded-[36px] bg-[#0B2538]/80 border-2 border-[#B8783E]/30 shadow-luxury-card space-y-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{selectedOrigin.flag}</span>
                      <h3 className="text-2xl sm:text-3xl font-display font-black text-[#F7FAF9] uppercase">
                        {selectedOrigin.country}
                      </h3>
                    </div>
                    <p className="text-xs font-mono text-[#D6A06A] mt-1 font-semibold">
                      {selectedOrigin.region}
                    </p>
                  </div>

                  <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#071A2B] text-[#67D9D0] border border-[#67D9D0]/40">
                    {selectedOrigin.temperatureRec.includes('HOT') ? (
                      <Flame className="w-3 h-3 text-[#B8783E]" />
                    ) : (
                      <Snowflake className="w-3 h-3 text-[#67D9D0]" />
                    )}
                    <span>{selectedOrigin.temperatureRec}</span>
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-base font-display font-bold text-[#F7FAF9] italic">
                  "{selectedOrigin.tagline}"
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[#071A2B] border border-[#B8783E]/20">
                    <span className="text-[10px] font-mono text-[#A8B0B4] block uppercase">ROAST STYLE</span>
                    <span className="text-xs font-mono font-bold text-[#F7FAF9] mt-0.5 block">
                      {selectedOrigin.roastStyle}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#071A2B] border border-[#67D9D0]/20">
                    <span className="text-[10px] font-mono text-[#A8B0B4] block uppercase">RECOMMENDED PREP</span>
                    <span className="text-xs font-mono font-bold text-[#67D9D0] mt-0.5 block">
                      {selectedOrigin.recommendedPrep}
                    </span>
                  </div>
                </div>

                {/* Aroma & Flavour Notes */}
                <div className="space-y-3 pt-2">
                  <div>
                    <span className="text-[10px] font-mono text-[#A8B0B4] uppercase tracking-wider block mb-1">
                      AROMA CHARACTERISTICS
                    </span>
                    <p className="text-xs text-[#F7FAF9]/90 font-sans leading-relaxed bg-[#071A2B]/60 p-3 rounded-xl border border-white/5">
                      {selectedOrigin.aroma}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#A8B0B4] uppercase tracking-wider block mb-1.5">
                      FLAVOUR NOTES PROFILE
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedOrigin.flavourProfile.map((note, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono text-[#071A2B] bg-[#D6A06A] px-3 py-1 rounded-full font-bold shadow-sm"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA to customize with this origin */}
                <div className="pt-4 border-t border-[#071A2B]">
                  <button
                    onClick={() => startPageTransition('/make-your-coffee', `CRAFT ${selectedOrigin.country.toUpperCase()} CREATION`)}
                    data-cursor="create"
                    className="w-full py-3.5 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>BREW WITH {selectedOrigin.country.toUpperCase()} BEANS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: World Origin Image & Interactive Map Visualizer */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative h-80 sm:h-96 w-full rounded-[36px] overflow-hidden bg-[#0B2538] border-2 border-[#67D9D0]/30 shadow-2xl">
              <img
                src={selectedOrigin.image}
                alt={selectedOrigin.country}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-[#071A2B]/40 to-transparent" />

              {/* Map Coordinates Telemetry Overlay */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center bg-[#071A2B]/85 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#B8783E]/30 text-xs font-mono">
                <span className="text-[#67D9D0] font-bold flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>ORIGIN: {selectedOrigin.country.toUpperCase()}</span>
                </span>
                <span className="text-[#A8B0B4]">DIRECT TRADE • 100% ETHICAL</span>
              </div>

              {/* Interactive Country Pin Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#071A2B]/90 backdrop-blur-md border border-[#67D9D0]/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#D6A06A] uppercase block">TERROIR HIGHLIGHT</span>
                  <span className="font-display font-bold text-sm text-[#F7FAF9]">
                    {selectedOrigin.region}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#67D9D0] uppercase block">CALIBRATION</span>
                  <span className="font-mono text-xs font-bold text-[#F7FAF9]">
                    {selectedOrigin.temperatureRec}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick World Origins Summary Strip */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-[#0B2538] border border-[#B8783E]/20">
                <div className="text-lg font-display font-black text-[#67D9D0]">7</div>
                <div className="text-[10px] font-mono text-[#A8B0B4] uppercase">Continents Covered</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0B2538] border border-[#B8783E]/20">
                <div className="text-lg font-display font-black text-[#D6A06A]">100%</div>
                <div className="text-[10px] font-mono text-[#A8B0B4] uppercase">Single-Estate Lots</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0B2538] border border-[#B8783E]/20">
                <div className="text-lg font-display font-black text-[#F7FAF9]">04°C-68°C</div>
                <div className="text-[10px] font-mono text-[#A8B0B4] uppercase">Tailored Temperatures</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalExperienceSection;
