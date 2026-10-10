import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Globe, MapPin, Clock, Phone, Sparkles, Navigation, ArrowRight } from 'lucide-react';

export const Locations = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [activeLocation, setActiveLocation] = useState(null);
  const [activeRegion, setActiveRegion] = useState('ALL');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getLocations();
        if (res.success && res.locations.length > 0) {
          setLocations(res.locations);
          setActiveLocation(res.locations[0]);
        } else {
          const defaultLocs = [
            {
              _id: 'loc-1',
              name: 'London Mayfair Flagship Roastery Lab',
              address: '14 New Bond Street',
              city: 'London',
              country: 'United Kingdom',
              region: 'EUROPE',
              timezone: 'Europe/London',
              phone: '+44 20 7946 0912',
              openingHours: '06:00 AM - 11:00 PM Daily',
              labCapacity: '350 Custom Formulations / Hour',
              features: ['Nitro Tap Lab', 'Custom Extraction Chamber', 'EV Curbside Pickup', 'Bespoke Cupping Room'],
              image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
            },
            {
              _id: 'loc-2',
              name: 'Singapore Marina Bay Sands Innovation Bar',
              address: '10 Bayfront Avenue, B2-88',
              city: 'Singapore',
              country: 'Singapore',
              region: 'ASIA',
              timezone: 'Asia/Singapore',
              phone: '+65 6688 8868',
              openingHours: '07:00 AM - Midnight Daily',
              labCapacity: '420 Custom Formulations / Hour',
              features: ['Kyoto Cold Drip Towers', 'Interactive Alchemy Station', 'Mobile Express Locker'],
              image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop',
            },
            {
              _id: 'loc-3',
              name: 'Tokyo Shibuya Zero-Emission Roastery',
              address: '1-23-10 Jinnan, Shibuya-ku',
              city: 'Tokyo',
              country: 'Japan',
              region: 'ASIA',
              timezone: 'Asia/Tokyo',
              phone: '+81 3 5456 7890',
              openingHours: '06:30 AM - 10:30 PM Daily',
              labCapacity: '300 Custom Formulations / Hour',
              features: ['Automated Pour-Over Bar', 'Quiet Sensory Room', 'Bicycle Drive-Thru'],
              image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop',
            },
            {
              _id: 'loc-4',
              name: 'Mumbai BKC Precision Experience Hub',
              address: 'G Block, Bandra Kurla Complex',
              city: 'Mumbai',
              country: 'India',
              region: 'ASIA',
              timezone: 'Asia/Kolkata',
              phone: '+91 22 2650 1234',
              openingHours: '07:00 AM - 11:30 PM Daily',
              labCapacity: '500 Custom Formulations / Hour',
              features: ['Monsooned Malabar Tasting Bar', 'Outdoor Garden Terrace', 'Express Dispatch'],
              image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
            },
            {
              _id: 'loc-5',
              name: 'New York SoHo Digital Atelier',
              address: '482 Broome Street',
              city: 'New York',
              country: 'United States',
              region: 'NORTH_AMERICA',
              timezone: 'America/New_York',
              phone: '+1 212 555 0192',
              openingHours: '06:00 AM - 10:00 PM Daily',
              labCapacity: '380 Custom Formulations / Hour',
              features: ['Curated Single-Origin Flights', 'Cold-Foam Lab', 'Smart Order Lockers'],
              image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
            },
          ];
          setLocations(defaultLocs);
          setActiveLocation(defaultLocs[0]);
        }
      } catch (e) {
        console.warn('Locations load error:', e);
      }
    };
    load();
  }, []);

  const regions = ['ALL', 'ASIA', 'EUROPE', 'NORTH_AMERICA', 'MIDDLE_EAST'];

  const filteredLocations = activeRegion === 'ALL'
    ? locations
    : locations.filter((l) => l.region === activeRegion);

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

  const handleOrderFromHub = () => {
    if (activeLocation) {
      sessionStorage.setItem('hcs_order_mode', 'PICKUP');
      sessionStorage.setItem('hcs_pickup_location', JSON.stringify(activeLocation));
    }
    navigate('/make-your-coffee');
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#EEDCC6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#3C2A21]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-[#EEDCC6]" />
            <span>GLOBAL ROASTERY NETWORK</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            FIND A <span className="text-[#EEDCC6]">STORE</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans">
            Explore our state-of-the-art automated flagships across London, Singapore, Tokyo, Mumbai, and New York.
          </p>

          {/* Region Tabs */}
          <div className="flex items-center justify-center space-x-2 pt-4 overflow-x-auto pb-1 no-scrollbar">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setActiveRegion(reg)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all ${
                  activeRegion === reg
                    ? 'bg-[#EEDCC6] text-[#2A1B16] shadow-md'
                    : 'bg-[#3C2A21] text-[#EEDCC6]/70 hover:text-[#F4E8D1] border border-[#EEDCC6]/20'
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
                      ? 'bg-[#3C2A21] text-[#F4E8D1] border-[#EEDCC6] shadow-xl ring-2 ring-[#EEDCC6]/30'
                      : 'bg-[#3C2A21]/50 hover:bg-[#3C2A21] text-[#F4E8D1] border-[#EEDCC6]/20'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div
                      className={`p-3 rounded-2xl ${
                        isSelected ? 'bg-[#EEDCC6] text-[#2A1B16]' : 'bg-[#2A1B16] text-[#EEDCC6]'
                      }`}
                    >
                      <MapPin className="w-5 h-5" />
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-base leading-tight">
                        {loc.city}, {loc.country}
                      </h3>
                      <span className={`text-xs font-mono ${isSelected ? 'text-[#EEDCC6]' : 'text-[#EEDCC6]/70'}`}>
                        {loc.name}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-[#F4E8D1]">
                      {getCityTime(loc.timezone)}
                    </div>
                    <span className="text-[10px] font-mono text-[#EEDCC6] uppercase">
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
                className="p-8 sm:p-10 rounded-[32px] bg-[#3C2A21]/80 text-[#F4E8D1] border-2 border-[#EEDCC6]/30 shadow-2xl space-y-6"
              >
                {/* Photo */}
                <div className="relative h-64 w-full rounded-3xl overflow-hidden bg-[#2A1B16] border border-[#EEDCC6]/20">
                  <img
                    src={activeLocation.image}
                    alt={activeLocation.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B16] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#EEDCC6] text-[#2A1B16] text-[10px] font-mono font-black uppercase shadow-md">
                    FLAGSHIP ROASTERY LAB
                  </div>
                </div>

                {/* Location Meta */}
                <div className="space-y-1">
                  <h2 className="text-3xl font-display font-black text-[#F4E8D1] uppercase">
                    {activeLocation.name}
                  </h2>
                  <p className="text-xs font-mono text-[#EEDCC6]">
                    {activeLocation.address}, {activeLocation.city}, {activeLocation.country}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold text-[#EEDCC6] uppercase tracking-wider block">
                    AUTOMATION LAB FEATURES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeLocation.features?.map((f, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Operating Info */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#EEDCC6]/20 text-xs font-mono">
                  <div>
                    <span className="text-[#EEDCC6]/70 block uppercase">OPERATING HOURS</span>
                    <span className="font-bold text-[#F4E8D1]">{activeLocation.openingHours}</span>
                  </div>
                  <div>
                    <span className="text-[#EEDCC6]/70 block uppercase">AUTOMATED CAPACITY</span>
                    <span className="font-bold text-[#EEDCC6]">{activeLocation.labCapacity}</span>
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleOrderFromHub}
                    className="flex-1 py-4 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-xl hover:bg-[#F4E8D1] transition-all flex items-center justify-center space-x-2"
                  >
                    <span>ORDER FROM THIS STORE</span>
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
