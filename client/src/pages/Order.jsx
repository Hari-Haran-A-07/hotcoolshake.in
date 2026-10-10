import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import {
  MapPin,
  Truck,
  Clock,
  Navigation,
  ArrowRight,
  Coffee,
  Sparkles,
  CheckCircle2,
  Search,
} from 'lucide-react';

export const Order = () => {
  const navigate = useNavigate();
  const [fulfillmentType, setFulfillmentType] = useState('PICKUP'); // 'PICKUP' | 'DELIVERY'
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.getLocations();
        if (res.success && res.locations?.length > 0) {
          setLocations(res.locations);
          setSelectedLocation(res.locations[0]);
        } else {
          const defaultLocs = [
            {
              _id: 'loc-1',
              name: 'London Mayfair Flagship Roastery Lab',
              address: '14 New Bond Street',
              city: 'London',
              country: 'United Kingdom',
              phone: '+44 20 7946 0912',
              openingHours: '06:00 AM - 11:00 PM Daily',
              coordinates: { latitude: 51.5098, longitude: -0.1444 },
              amenities: ['Nitro Tap Lab', 'Custom Extraction Chamber', 'EV Curbside Pickup', 'Bespoke Cupping Room'],
              waitEstimate: '5-8 mins',
            },
            {
              _id: 'loc-2',
              name: 'Singapore Marina Bay Sands Innovation Bar',
              address: '10 Bayfront Avenue, B2-88',
              city: 'Singapore',
              country: 'Singapore',
              phone: '+65 6688 8868',
              openingHours: '07:00 AM - Midnight Daily',
              coordinates: { latitude: 1.2838, longitude: 103.8591 },
              amenities: ['Kyoto Cold Drip Towers', 'Interactive Alchemy Station', 'Mobile Express Locker'],
              waitEstimate: '3-6 mins',
            },
            {
              _id: 'loc-3',
              name: 'Tokyo Shibuya Zero-Emission Roastery',
              address: '1-23-10 Jinnan, Shibuya-ku',
              city: 'Tokyo',
              country: 'Japan',
              phone: '+81 3 5456 7890',
              openingHours: '06:30 AM - 10:30 PM Daily',
              coordinates: { latitude: 35.6617, longitude: 139.7013 },
              amenities: ['Automated Pour-Over Bar', 'Quiet Sensory Room', 'Bicycle Drive-Thru'],
              waitEstimate: '4-7 mins',
            },
            {
              _id: 'loc-4',
              name: 'Mumbai BKC Precision Experience Hub',
              address: 'G Block, Bandra Kurla Complex',
              city: 'Mumbai',
              country: 'India',
              phone: '+91 22 2650 1234',
              openingHours: '07:00 AM - 11:30 PM Daily',
              coordinates: { latitude: 19.0657, longitude: 72.8687 },
              amenities: ['Monsooned Malabar Tasting Bar', 'Outdoor Garden Terrace', 'Express Dispatch'],
              waitEstimate: '6-10 mins',
            },
            {
              _id: 'loc-5',
              name: 'New York SoHo Digital Atelier',
              address: '482 Broome Street',
              city: 'New York',
              country: 'United States',
              phone: '+1 212 555 0192',
              openingHours: '06:00 AM - 10:00 PM Daily',
              coordinates: { latitude: 40.7223, longitude: -74.0003 },
              amenities: ['Curated Single-Origin Flights', 'Cold-Foam Lab', 'Smart Order Lockers'],
              waitEstimate: '5-9 mins',
            },
          ];
          setLocations(defaultLocs);
          setSelectedLocation(defaultLocs[0]);
        }
      } catch (err) {
        console.warn('Locations fetch fallback handled:', err);
      }
    };
    fetchLocations();
  }, []);

  const filteredLocations = locations.filter(
    (loc) =>
      loc.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProceedToMenu = () => {
    // Save order mode into sessionStorage for Cart and Checkout to inherit
    sessionStorage.setItem('hcs_order_mode', fulfillmentType);
    if (fulfillmentType === 'PICKUP' && selectedLocation) {
      sessionStorage.setItem('hcs_pickup_location', JSON.stringify(selectedLocation));
    } else if (fulfillmentType === 'DELIVERY') {
      sessionStorage.setItem('hcs_delivery_address', deliveryAddress);
    }
    navigate('/menu');
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#EEDCC6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#3C2A21]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase shadow-sm">
            <Coffee className="w-3.5 h-3.5 text-[#EEDCC6]" />
            <span>START YOUR ORDER</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            HOW WOULD YOU LIKE YOUR <span className="text-[#EEDCC6]">COFFEE?</span>
          </h1>

          <p className="text-sm font-sans text-[#EEDCC6]/80 leading-relaxed">
            Choose in-store pickup at our automated roastery chambers or zero-emission EV courier delivery directly to your door.
          </p>
        </div>

        {/* Fulfillment Type Toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <button
            type="button"
            onClick={() => setFulfillmentType('PICKUP')}
            className={`p-6 rounded-3xl border-2 transition-all duration-300 text-left flex items-start space-x-4 ${
              fulfillmentType === 'PICKUP'
                ? 'bg-[#3C2A21] border-[#EEDCC6] shadow-xl ring-2 ring-[#EEDCC6]/30'
                : 'bg-[#3C2A21]/40 border-[#EEDCC6]/20 hover:border-[#EEDCC6]/40'
            }`}
          >
            <div className="p-3 rounded-2xl bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30 flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-[#F4E8D1]">IN-STORE PICKUP</h3>
                {fulfillmentType === 'PICKUP' && <CheckCircle2 className="w-4 h-4 text-[#EEDCC6]" />}
              </div>
              <p className="text-xs text-[#EEDCC6]/70 mt-1">
                Order ahead & pick up from automated temperature-locked lockers in 5-8 mins.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setFulfillmentType('DELIVERY')}
            className={`p-6 rounded-3xl border-2 transition-all duration-300 text-left flex items-start space-x-4 ${
              fulfillmentType === 'DELIVERY'
                ? 'bg-[#3C2A21] border-[#EEDCC6] shadow-xl ring-2 ring-[#EEDCC6]/30'
                : 'bg-[#3C2A21]/40 border-[#EEDCC6]/20 hover:border-[#EEDCC6]/40'
            }`}
          >
            <div className="p-3 rounded-2xl bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30 flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-[#F4E8D1]">EV COURIER DELIVERY</h3>
                {fulfillmentType === 'DELIVERY' && <CheckCircle2 className="w-4 h-4 text-[#EEDCC6]" />}
              </div>
              <p className="text-xs text-[#EEDCC6]/70 mt-1">
                Delivered in vacuum insulated vessels with live GPS and thermal telemetry.
              </p>
            </div>
          </button>
        </div>

        {/* Dynamic Section based on Type */}
        {fulfillmentType === 'PICKUP' ? (
          <div className="bg-[#3C2A21]/60 border border-[#EEDCC6]/25 rounded-[32px] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-display font-bold text-[#F4E8D1] uppercase">
                  SELECT PICKUP ROASTERY LOCATION
                </h2>
                <p className="text-xs text-[#EEDCC6]/70 font-sans">
                  Showing all active global hubs with live automated chamber capacity.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#EEDCC6]/60" />
                <input
                  type="text"
                  placeholder="Filter by city or street..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                />
              </div>
            </div>

            {/* Location Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLocations.map((loc) => {
                const isSelected = selectedLocation?._id === loc._id || selectedLocation?.name === loc.name;
                return (
                  <div
                    key={loc._id || loc.name}
                    onClick={() => setSelectedLocation(loc)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#2A1B16] border-[#EEDCC6] shadow-md ring-1 ring-[#EEDCC6]'
                        : 'bg-[#2A1B16]/60 border-[#EEDCC6]/15 hover:border-[#EEDCC6]/40'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-display font-bold text-sm sm:text-base text-[#F4E8D1]">
                          {loc.name}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-[9px] font-mono text-[#EEDCC6] font-bold">
                          {loc.waitEstimate || '5-8 mins'}
                        </span>
                      </div>
                      <p className="text-xs text-[#EEDCC6]/70 mt-1">
                        {loc.address}, {loc.city}
                      </p>
                      <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#EEDCC6] mt-2">
                        <Clock className="w-3 h-3 text-[#EEDCC6]" />
                        <span>{loc.openingHours}</span>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#EEDCC6]/15 flex justify-between items-center text-[10px] font-mono">
                      <span className="text-[#EEDCC6]/60">{loc.phone}</span>
                      <span className={`font-bold uppercase ${isSelected ? 'text-[#EEDCC6]' : 'text-[#EEDCC6]/40'}`}>
                        {isSelected ? '✓ SELECTED STORE' : 'TAP TO SELECT'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-[#3C2A21]/60 border border-[#EEDCC6]/25 rounded-[32px] p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
            <div>
              <h2 className="text-xl font-display font-bold text-[#F4E8D1] uppercase">
                ENTER YOUR DELIVERY ADDRESS
              </h2>
              <p className="text-xs text-[#EEDCC6]/70 font-sans">
                Our temperature-controlled fleet guarantees 68°C Hot or 04°C Sub-Zero Cool delivery.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-[#EEDCC6] block mb-1 font-bold">
                  Street Address & Unit *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 100 Queen Street, Apartment 4B"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-[#EEDCC6] block mb-1 font-bold">
                  Delivery Notes / Gate Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leave with concierge or call upon arrival"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={handleProceedToMenu}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black uppercase tracking-widest hover:bg-[#F4E8D1] shadow-xl transition-all flex items-center justify-center space-x-2"
          >
            <span>VIEW MENU & START SELECTION</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            to="/make-your-coffee"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-[#EEDCC6] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#2A1B16] transition-all text-center flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-[#EEDCC6]" />
            <span>CUSTOMIZE IN COFFEE LAB</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Order;
