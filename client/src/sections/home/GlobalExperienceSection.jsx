import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../services/api';
import { usePageLoader } from '../../context/LoadingContext';
import { Globe, MapPin, Clock, Phone, Sparkles, ArrowRight } from 'lucide-react';

export const GlobalExperienceSection = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { startPageTransition } = usePageLoader();

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const res = await api.getLocations();
        if (res.success && res.locations.length > 0) {
          setLocations(res.locations);
          setSelectedLocation(res.locations[0]);
        }
      } catch (e) {
        console.warn('Locations load error:', e);
      }
    };
    loadLocations();
  }, []);

  const getCityTime = (timezone) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone || 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(new Date());
    } catch {
      return '12:00 PM';
    }
  };

  return (
    <section className="py-24 bg-[#F4E8D1] text-[#2A1B16] relative overflow-hidden border-b border-[#3C2A21]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#3C2A21] uppercase font-bold px-3 py-1 rounded-full bg-[#EEDCC6] border border-[#3C2A21]/20">
            <Globe className="w-3.5 h-3.5" />
            <span>INTERNATIONAL PRESENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[#2A1B16] uppercase">
            COFFEE FOR EVERYWHERE.
          </h2>
          <p className="text-xs sm:text-sm text-[#3C2A21]/80 font-sans">
            Our Flagship Roastery Labs span major international hubs, bringing bespoke custom coffee to global connoisseurs.
          </p>
        </div>

        {/* Global Hubs Grid / Interactive Map Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: City Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-mono font-bold tracking-widest text-[#3C2A21] uppercase mb-2 px-1">
              SELECT FLAGSHIP LAB
            </h3>
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {locations.map((loc) => {
                const isSelected = selectedLocation?._id === loc._id;
                return (
                  <button
                    key={loc._id || loc.name}
                    onClick={() => setSelectedLocation(loc)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#2A1B16] text-[#F4E8D1] border-[#2A1B16] shadow-espresso-dark'
                        : 'bg-[#EEDCC6]/50 hover:bg-[#EEDCC6] text-[#2A1B16] border-[#3C2A21]/15'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-xl ${
                          isSelected ? 'bg-[#3C2A21] text-[#EEDCC6]' : 'bg-[#EEDCC6] text-[#3C2A21]'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm leading-tight">
                          {loc.city}, {loc.country}
                        </h4>
                        <span className={`text-[11px] font-mono ${isSelected ? 'text-[#EEDCC6]' : 'text-[#3C2A21]/70'}`}>
                          {loc.name}
                        </span>
                      </div>
                    </div>

                    {/* Local Time Display */}
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-xs font-mono font-bold">
                        <Clock className="w-3 h-3 opacity-60" />
                        <span>{getCityTime(loc.timezone)}</span>
                      </div>
                      <span className={`text-[10px] font-mono uppercase ${isSelected ? 'text-[#EEDCC6]' : 'text-[#3C2A21]/60'}`}>
                        {loc.region}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Flagship Inspection Card */}
          <div className="lg:col-span-7">
            {selectedLocation && (
              <motion.div
                key={selectedLocation._id || selectedLocation.name}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-[36px] bg-[#2A1B16] text-[#F4E8D1] border border-[#EEDCC6]/25 shadow-2xl space-y-6"
              >
                {/* Flagship Photo & Overlay */}
                <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-[#3C2A21] border border-[#EEDCC6]/20">
                  <img
                    src={selectedLocation.image}
                    alt={selectedLocation.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B16] via-[#2A1B16]/30 to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#EEDCC6] text-[#2A1B16] text-[10px] font-mono font-bold uppercase">
                    FLAGSHIP ROASTERY LAB
                  </div>
                </div>

                {/* Details Header */}
                <div className="space-y-1">
                  <h3 className="text-2xl font-display font-black text-[#F4E8D1]">
                    {selectedLocation.name}
                  </h3>
                  <p className="text-xs font-mono text-[#EEDCC6]">
                    {selectedLocation.address}, {selectedLocation.city}, {selectedLocation.country}
                  </p>
                </div>

                {/* Features Tags */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold text-[#EEDCC6] uppercase tracking-wider block">
                    LABORATORY CAPABILITIES & AMENITIES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedLocation.features?.map((f, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/20 text-xs font-mono text-[#F4E8D1]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Opening Hours & Capacity */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#EEDCC6]/15 text-xs font-mono">
                  <div>
                    <span className="text-[#EEDCC6]/70 block">OPERATING HOURS</span>
                    <span className="font-bold text-[#F4E8D1]">{selectedLocation.openingHours}</span>
                  </div>
                  <div>
                    <span className="text-[#EEDCC6]/70 block">AUTOMATED CAPACITY</span>
                    <span className="font-bold text-[#EEDCC6]">{selectedLocation.labCapacity}</span>
                  </div>
                </div>

                {/* Explore Full Locations Page CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => startPageTransition('/locations', 'GLOBAL FLAGSHIP HUBS')}
                    className="w-full py-3.5 rounded-full bg-[#EEDCC6] hover:bg-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-bold tracking-widest uppercase shadow-coffee-glow transition-all flex items-center justify-center space-x-2"
                  >
                    <span>VIEW ALL GLOBAL HUBS ON MAP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalExperienceSection;
