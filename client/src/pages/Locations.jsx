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
    <div className="min-h-screen pt-28 pb-24 bg-[#071A2B] text-[#F7FAF9] relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-radial-navy opacity-95 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#D6A06A] uppercase font-bold px-4 py-1.5 rounded-full bg-[#0B2538] border border-[#B8783E]/30">
            <Globe className="w-3.5 h-3.5 text-[#67D9D0]" />
            <span>GLOBAL ROASTERY NETWORK</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F7FAF9] uppercase">
            STORE <span className="text-brand-gradient">LOCATOR.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A8B0B4] font-sans">
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
                    ? 'bg-brand-gradient text-[#071A2B] shadow-bronze-glow'
                    : 'bg-[#0B2538] text-[#A8B0B4] hover:text-[#F7FAF9] border border-white/10'
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
                      ? 'bg-[#0B2538] text-[#F7FAF9] border-[#67D9D0] shadow-teal-glow'
                      : 'bg-[#0B2538]/50 hover:bg-[#0B2538] text-[#F7FAF9] border-[#B8783E]/20'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div
                      className={`p-3 rounded-2xl ${
                        isSelected ? 'bg-brand-gradient text-[#071A2B]' : 'bg-[#071A2B] text-[#D6A06A]'
                      }`}
                    >
                      <MapPin className="w-5 h-5" />
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-base leading-tight">
                        {loc.city}, {loc.country}
                      </h3>
                      <span className={`text-xs font-mono ${isSelected ? 'text-[#67D9D0]' : 'text-[#A8B0B4]'}`}>
                        {loc.name}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-[#F7FAF9]">
                      {getCityTime(loc.timezone)}
                    </div>
                    <span className="text-[10px] font-mono text-[#D6A06A] uppercase">
                      {loc.region}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Selected Hub Inspection Card */}
          <div className="lg:col-span-7">
            {activeLocation && (
              <motion.div
                key={activeLocation._id || activeLocation.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 sm:p-10 rounded-[40px] bg-[#0B2538] text-[#F7FAF9] border-2 border-[#B8783E]/40 shadow-2xl space-y-6"
              >
                {/* Photo */}
                <div className="relative h-64 w-full rounded-3xl overflow-hidden bg-[#071A2B] border border-white/10">
                  <img
                    src={activeLocation.image}
                    alt={activeLocation.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-brand-gradient text-[#071A2B] text-[10px] font-mono font-black uppercase shadow-md">
                    FLAGSHIP ROASTERY LAB
                  </div>
                </div>

                {/* Location Meta */}
                <div className="space-y-1">
                  <h2 className="text-3xl font-display font-black text-[#F7FAF9] uppercase">
                    {activeLocation.name}
                  </h2>
                  <p className="text-xs font-mono text-[#D6A06A]">
                    {activeLocation.address}, {activeLocation.city}, {activeLocation.country}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold text-[#67D9D0] uppercase tracking-wider block">
                    AUTOMATION LAB FEATURES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeLocation.features?.map((f, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1 rounded-full bg-[#071A2B] border border-[#B8783E]/30 text-xs font-mono text-[#F7FAF9]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Operating Info */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                  <div>
                    <span className="text-[#A8B0B4] block uppercase">OPERATING HOURS</span>
                    <span className="font-bold text-[#F7FAF9]">{activeLocation.openingHours}</span>
                  </div>
                  <div>
                    <span className="text-[#A8B0B4] block uppercase">AUTOMATED CAPACITY</span>
                    <span className="font-bold text-[#67D9D0]">{activeLocation.labCapacity}</span>
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => startPageTransition('/make-your-coffee', `DISPATCH FROM ${activeLocation.city.toUpperCase()}`)}
                    data-cursor="create"
                    className="flex-1 py-4 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>ORDER FROM THIS HUB</span>
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
