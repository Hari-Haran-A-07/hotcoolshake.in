import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import {
  Globe,
  MapPin,
  Flame,
  Snowflake,
  ArrowRight,
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
      flag: '🇧🇷',
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
      flag: '🇨🇴',
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
      flag: '🇪🇹',
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
    },
    {
      country: 'India',
      region: 'Chikmagalur Malabar (Altitude 1,300m)',
      tagline: 'Monsooned Cardamom & Earthy Spice',
      flavourProfile: ['Green Cardamom', 'Toasted Walnut', 'Clove Bark'],
      roastStyle: 'Full City Dark Roast',
      aroma: 'Warm monsoon earth, dark molasses and sweet spice',
      recommendedPrep: 'Thermal Double Extraction with Silk Oat Milk',
      temperatureRec: 'HOT 68°C',
      flag: '🇮🇳',
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
      flag: '🇮🇩',
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
      flag: '🇻🇳',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const [selectedOrigin, setSelectedOrigin] = useState(worldOrigins[2]); // Default Ethiopia

  return (
    <section className="py-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden border-t border-[#EEDCC6]/15">
      {/* Ambient background atmosphere */}
      <div className="absolute inset-0 bg-radial-coffee opacity-90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono text-[#EEDCC6] uppercase font-bold">
            <Globe className="w-3.5 h-3.5 text-[#EEDCC6]" />
            <span>INTERNATIONAL COFFEE ORIGINS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-[#F4E8D1]">
            COFFEE WITHOUT <span className="text-brand-gradient">BORDERS.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#EEDCC6]/80 leading-relaxed font-sans">
            From volcanic Ethiopian peaks to high-altitude Colombian ridges. Discover the terroir, roast alchemy, and precision temperatures calibrated for each world origin.
          </p>
        </div>

        {/* Interactive Country Navigator */}
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
                        ? 'bg-brand-gradient text-[#2A1B16] shadow-cream-glow font-black scale-105'
                        : 'bg-[#3C2A21] text-[#EEDCC6]/80 hover:text-[#F4E8D1] border border-[#EEDCC6]/20'
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
                className="p-8 rounded-[36px] bg-[#3C2A21] border-2 border-[#EEDCC6]/30 shadow-coffee-card space-y-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{selectedOrigin.flag}</span>
                      <h3 className="text-2xl sm:text-3xl font-display font-black text-[#F4E8D1] uppercase">
                        {selectedOrigin.country}
                      </h3>
                    </div>
                    <p className="text-xs font-mono text-[#EEDCC6] mt-1 font-semibold">
                      {selectedOrigin.region}
                    </p>
                  </div>

                  <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30">
                    {selectedOrigin.temperatureRec.includes('HOT') ? (
                      <Flame className="w-3 h-3 text-[#EEDCC6]" />
                    ) : (
                      <Snowflake className="w-3 h-3 text-[#F4E8D1]" />
                    )}
                    <span>{selectedOrigin.temperatureRec}</span>
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-base font-display font-bold text-[#F4E8D1] italic">
                  "{selectedOrigin.tagline}"
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20">
                    <span className="text-[10px] font-mono text-[#EEDCC6]/70 block uppercase">ROAST STYLE</span>
                    <span className="text-xs font-mono font-bold text-[#F4E8D1] mt-0.5 block">
                      {selectedOrigin.roastStyle}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20">
                    <span className="text-[10px] font-mono text-[#EEDCC6]/70 block uppercase">RECOMMENDED PREP</span>
                    <span className="text-xs font-mono font-bold text-[#EEDCC6] mt-0.5 block">
                      {selectedOrigin.recommendedPrep}
                    </span>
                  </div>
                </div>

                {/* Aroma & Flavour Notes */}
                <div className="space-y-3 pt-2">
                  <div>
                    <span className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase tracking-wider block mb-1">
                      AROMA CHARACTERISTICS
                    </span>
                    <p className="text-xs text-[#F4E8D1]/90 font-sans leading-relaxed bg-[#2A1B16] p-3 rounded-xl border border-[#EEDCC6]/15">
                      {selectedOrigin.aroma}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase tracking-wider block mb-1.5">
                      FLAVOUR NOTES PROFILE
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedOrigin.flavourProfile.map((note, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono text-[#2A1B16] bg-[#EEDCC6] px-3 py-1 rounded-full font-bold shadow-sm"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA to customize with this origin */}
                <div className="pt-4 border-t border-[#2A1B16]">
                  <button
                    onClick={() => startPageTransition('/make-your-coffee', `CRAFT ${selectedOrigin.country.toUpperCase()} CREATION`)}
                    data-cursor="create"
                    className="w-full py-3.5 rounded-full bg-brand-gradient text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-cream-glow hover:brightness-105 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>BREW WITH {selectedOrigin.country.toUpperCase()} LOTS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: World Origin Image */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative h-80 sm:h-96 w-full rounded-[36px] overflow-hidden bg-[#3C2A21] border-2 border-[#EEDCC6]/30 shadow-coffee-card">
              <img
                src={selectedOrigin.image}
                alt={selectedOrigin.country}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B16] via-[#2A1B16]/40 to-transparent" />

              {/* Map Coordinates Telemetry Overlay */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center bg-[#2A1B16]/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#EEDCC6]/30 text-xs font-mono">
                <span className="text-[#EEDCC6] font-bold flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>ORIGIN: {selectedOrigin.country.toUpperCase()}</span>
                </span>
                <span className="text-[#EEDCC6]/80">DIRECT TRADE • 100% ETHICAL</span>
              </div>

              {/* Terroir & Calibration Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#2A1B16]/95 backdrop-blur-md border border-[#EEDCC6]/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase block">TERROIR HIGHLIGHT</span>
                  <span className="font-display font-bold text-sm text-[#F4E8D1]">
                    {selectedOrigin.region}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#EEDCC6] uppercase block">CALIBRATION</span>
                  <span className="font-mono text-xs font-bold text-[#F4E8D1]">
                    {selectedOrigin.temperatureRec}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick World Origins Summary Strip */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-[#3C2A21] border border-[#EEDCC6]/20">
                <div className="text-lg font-display font-black text-[#F4E8D1]">6</div>
                <div className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase">Global Origins</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#3C2A21] border border-[#EEDCC6]/20">
                <div className="text-lg font-display font-black text-[#EEDCC6]">100%</div>
                <div className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase">Traceable Lots</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#3C2A21] border border-[#EEDCC6]/20">
                <div className="text-lg font-display font-black text-[#F4E8D1]">04°C - 68°C</div>
                <div className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase">Range Calibrated</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalExperienceSection;
