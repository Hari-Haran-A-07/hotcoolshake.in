import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { usePageLoader } from '../context/LoadingContext';
import { Globe, MapPin, Clock, Phone, Sparkles, Navigation, ArrowRight } from 'lucide-react';

export const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [activeLocation, setActiveLocation] = useState(null);
  const [activeRegion, setActiveRegion] = useState('ALL');
  const { startPageTransition } = usePageLoader();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getLocations();
        if (res.success && res.locations.length > 0) {
          setLocations(res.locations);
          setActiveLocation(res.locations[0]);
        }
      } catch (e) {
        console.warn('Locations load error:', e);
      }
    };
    load();
  }, []);

  const regions = ['ALL', 'ASIA', 'MIDDLE_EAST', 'EUROPE', 'NORTH_AMERICA', 'OCEANIA'];

  const filteredLocations = activeRegion === 'ALL'
    ? locations
    : locations.filter((l) => l.region === activeRegion);

  const getCityTime = (timezone) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone || 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date());
    } catch {
      return '12:00:00 PM';
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#F4E8D1] text-[#2A1B16] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#3C2A21] uppercase font-bold px-4 py-1.5 rounded-full bg-[#EEDCC6] border border-[#3C2A21]/20">
            <Globe className="w-3.5 h-3.5" />
            <span>GLOBAL ROASTERY NETWORK</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#2A1B16] uppercase">
            INTERNATIONAL HUBS.
          </h1>
          <p className="text-xs sm:text-sm text-[#3C2A21]/80 font-sans">
            Explore our state-of-the-art automated flagships across Mumbai, Singapore, Dubai, London, New York, Tokyo, and Sydney.
          </p>

          {/* Region Tabs */}
          <div className="flex items-center justify-center space-x-2 pt-4 overflow-x-auto pb-1 no-scrollbar">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setActiveRegion(reg)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all ${
                  activeRegion === reg
                    ? 'bg-[#2A1B16] text-[#F4E8D1]'
                    : 'bg-[#EEDCC6]/70 text-[#2A1B16] hover:bg-[#EEDCC6] border border-[#3C2A21]/15'
                }`}
              >
                {reg.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Hub Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Location Cards List */}
          <div className="lg:col-span-5 space-y-3">
            {filteredLocations.map((loc) => {
              const isSelected = activeLocation?._id === loc._id;
              return (
                <motion.div
                  key={loc._id || loc.name}
                  onClick={() => setActiveLocation(loc)}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#2A1B16] text-[#F4E8D1] border-[#2A1B16] shadow-espresso-dark'
                      : 'bg-[#EEDCC6]/50 hover:bg-[#EEDCC6] text-[#2A1B16] border-[#3C2A21]/15'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div
                      className={`p-3 rounded-2xl ${
                        isSelected ? 'bg-[#3C2A21] text-[#EEDCC6]' : 'bg-[#EEDCC6] text-[#3C2A21]'
                      }`}
                    >
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base leading-tight">
                        {loc.name}
                      </h3>
                      <span className={`text-xs font-mono ${isSelected ? 'text-[#EEDCC6]' : 'text-[#3C2A21]/70'}`}>
                        {loc.city}, {loc.country}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono text-xs font-bold">
                      {getCityTime(loc.timezone)}
                    </div>
                    <span className={`text-[10px] font-mono uppercase ${isSelected ? 'text-[#EEDCC6]' : 'text-[#3C2A21]/60'}`}>
                      {loc.region}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Selected Hub Showcase Detail */}
          <div className="lg:col-span-7">
            {activeLocation && (
              <motion.div
                key={activeLocation._id || activeLocation.name}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-10 rounded-[40px] bg-[#2A1B16] text-[#F4E8D1] border border-[#EEDCC6]/25 shadow-2xl space-y-6"
              >
                {/* Image */}
                <div className="relative h-64 sm:h-72 w-full rounded-3xl overflow-hidden bg-[#3C2A21] border border-[#EEDCC6]/20 shadow-espresso-dark">
                  <img
                    src={activeLocation.image}
                    alt={activeLocation.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B16] via-[#2A1B16]/30 to-transparent" />
                  <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#EEDCC6] text-[#2A1B16] text-[10px] font-mono font-bold uppercase">
                    GLOBAL FLAGSHIP ROASTERY
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <h2 className="text-3xl font-display font-black text-[#F4E8D1]">
                    {activeLocation.name}
                  </h2>
                  <p className="text-xs font-mono text-[#EEDCC6]">
                    {activeLocation.address}, {activeLocation.city}, {activeLocation.country}
                  </p>
                </div>

                {/* Capabilities */}
                <div className="space-y-2.5">
                  <span className="text-xs font-mono font-bold text-[#EEDCC6] uppercase tracking-wider block">
                    FLAGSHIP SPECIFICATIONS & AMENITIES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeLocation.features?.map((f, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/20 text-xs font-mono text-[#F4E8D1]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Telemetry Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#EEDCC6]/15 text-xs font-mono">
                  <div>
                    <span className="text-[#EEDCC6]/70 block">LOCAL TIME</span>
                    <span className="font-bold text-[#F4E8D1]">{getCityTime(activeLocation.timezone)}</span>
                  </div>
                  <div>
                    <span className="text-[#EEDCC6]/70 block">OPERATING HOURS</span>
                    <span className="font-bold text-[#F4E8D1]">{activeLocation.openingHours}</span>
                  </div>
                  <div>
                    <span className="text-[#EEDCC6]/70 block">LAB CAPACITY</span>
                    <span className="font-bold text-[#EEDCC6]">{activeLocation.labCapacity}</span>
                  </div>
                </div>

                {/* Order Pickup from here CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => startPageTransition('/make-your-coffee', `VIRTUAL LAB (${activeLocation.city.toUpperCase()})`)}
                    className="w-full py-4 rounded-full bg-[#EEDCC6] hover:bg-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-coffee-glow transition-all flex items-center justify-center space-x-2"
                  >
                    <span>CRAFT CUSTOM COFFEE FOR THIS HUB</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
