import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import {
  Globe,
  Radio,
  Activity,
  Cpu,
  Flame,
  Snowflake,
  Truck,
  ShieldCheck,
  Zap,
  Clock,
  MapPin,
  RefreshCw,
  Layers,
  Thermometer,
  Gauge,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const GlobalTelemetry = () => {
  const navigate = useNavigate();

  // Simulated Global Real-time Counters
  const [activeExtractions, setActiveExtractions] = useState(14892);
  const [activeDrones, setActiveDrones] = useState(842);
  const [co2OffsetKg, setCo2OffsetKg] = useState(48291.4);
  const [selectedHub, setSelectedHub] = useState('tokyo');

  // Live Telemetry Event Stream Ticker
  const [telemetryLogs, setTelemetryLogs] = useState([
    { id: 1, time: '22:18:40 UTC', hub: 'TOKYO GINZA', msg: 'Cryo Cell #03 Nitrogen Flash Chill 04.0°C Verified TDS 20.2%' },
    { id: 2, time: '22:18:32 UTC', hub: 'MILAN HQ', msg: 'Induction Bloom 68.0°C Single-Origin Ethiopian Extraction Complete' },
    { id: 3, time: '22:18:25 UTC', hub: 'NEW YORK', msg: 'Autonomous EV Courier #412 En Route to Wall St (Lock Temp: 67.8°C)' },
    { id: 4, time: '22:18:18 UTC', hub: 'DUBAI DOWNTOWN', msg: 'Sonic Vortex Cavitation 08.0°C Saffron Infusion Dispensed' },
    { id: 5, time: '22:18:09 UTC', hub: 'LONDON MAYFAIR', msg: 'Optical Refractometer Calibration: 20.4% Optimal Extraction Standard' },
  ]);

  // Periodic counter bumps to feel authentically alive
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveExtractions((prev) => prev + Math.floor(Math.random() * 5) - 1);
      setActiveDrones((prev) => Math.max(800, prev + Math.floor(Math.random() * 3) - 1));
      setCo2OffsetKg((prev) => +(prev + 0.15).toFixed(1));

      // Append new random telemetry log
      const hubs = ['TOKYO GINZA', 'MILAN HQ', 'NEW YORK', 'DUBAI DOWNTOWN', 'LONDON MAYFAIR', 'SINGAPORE', 'ZURICH CRYO'];
      const actions = [
        'Dual-Chamber Cell Status: Nominal (±0.05°C)',
        'Ultrasonic Vortex 5-Micron Foam Micro-Dispensed',
        'Borosilicate Thermal Vessel RFID Tag Linked',
        'Zero-Emission Drone Flight Path Confirmed',
        'Direct Single-Origin Nitrogen Seal Activated',
      ];
      const randomHub = hubs[Math.floor(Math.random() * hubs.length)];
      const randomAct = actions[Math.floor(Math.random() * actions.length)];
      const d = new Date();
      const timeStr = `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}:${String(d.getUTCSeconds()).padStart(2, '0')} UTC`;

      setTelemetryLogs((prev) => [
        { id: Date.now(), time: timeStr, hub: randomHub, msg: randomAct },
        ...prev.slice(0, 7),
      ]);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  const globalHubs = [
    {
      id: 'milan',
      name: 'Milan Flagship Roastery HQ',
      country: 'Italy',
      coords: { x: '49%', y: '33%' },
      status: 'OPERATIONAL',
      activeChambers: 32,
      curTempHot: '68.1°C',
      curTempCool: '04.0°C',
      tds: '20.4%',
      activeDrones: 124,
      specialty: 'Single-Origin Ethiopian Natural & Obsidian Roast',
      desc: 'European central innovation lab with 32 automated thermal induction cells and botanical cryogenic distillation arrays.',
    },
    {
      id: 'tokyo',
      name: 'Tokyo Ginza Molecular Lab',
      country: 'Japan',
      coords: { x: '78%', y: '39%' },
      status: 'OPERATIONAL',
      activeChambers: 48,
      curTempHot: '68.0°C',
      curTempCool: '03.9°C',
      tds: '20.6%',
      activeDrones: 198,
      specialty: 'Kyoto Sub-Zero Cold Extract & Matcha Velvet',
      desc: 'Flagship Asian roastery with sub-zero cryo tunnels and robotic precision magnetic beverage dispensers.',
    },
    {
      id: 'newyork',
      name: 'New York Hudson Yards Reserve',
      country: 'United States',
      coords: { x: '27%', y: '36%' },
      status: 'OPERATIONAL',
      activeChambers: 40,
      curTempHot: '68.2°C',
      curTempCool: '04.1°C',
      tds: '20.3%',
      activeDrones: 165,
      specialty: 'Smoked Sea Salt Caramel & High-Velocity Espresso',
      desc: 'High-volume Manhattan nexus servicing autonomous zero-emission EV delivery and rooftop drone hubs.',
    },
    {
      id: 'london',
      name: 'London Mayfair Connoisseur Hub',
      country: 'United Kingdom',
      coords: { x: '46%', y: '29%' },
      status: 'OPERATIONAL',
      activeChambers: 24,
      curTempHot: '68.0°C',
      curTempCool: '04.0°C',
      tds: '20.5%',
      activeDrones: 92,
      specialty: 'Madagascar Bourbon Bean & Velvet Silk Crema',
      desc: 'Luxury concierge salon with VIP biometric tasting vaults and bespoke formula archival.',
    },
    {
      id: 'dubai',
      name: 'Dubai Downtown Thermal Apex',
      country: 'United Arab Emirates',
      coords: { x: '58%', y: '44%' },
      status: 'OPERATIONAL',
      activeChambers: 28,
      curTempHot: '68.4°C',
      curTempCool: '03.8°C',
      tds: '20.7%',
      activeDrones: 140,
      specialty: 'Cardamom Saffron Spiced & Gold Leaf Cold Crema',
      desc: 'Architectural marvel roastery with climate-locked subterranean cryogenic silos.',
    },
    {
      id: 'singapore',
      name: 'Singapore Marina Bay Bio-Lab',
      country: 'Singapore',
      coords: { x: '72%', y: '56%' },
      status: 'OPERATIONAL',
      activeChambers: 30,
      curTempHot: '68.0°C',
      curTempCool: '04.0°C',
      tds: '20.2%',
      activeDrones: 110,
      specialty: 'Pistachio Silk & Cold-Pressed Botanical Terpenes',
      desc: 'Equatorial flagship powered 100% by solar microgrids and zero-waste circular loops.',
    },
    {
      id: 'zurich',
      name: 'Zurich Cryo Research Center',
      country: 'Switzerland',
      coords: { x: '48%', y: '31%' },
      status: 'OPERATIONAL',
      activeChambers: 18,
      curTempHot: '68.0°C',
      curTempCool: '03.7°C',
      tds: '20.8%',
      activeDrones: 45,
      specialty: 'Alpine Glacier Sub-Zero Concentrate',
      desc: 'Deep science thermodynamic laboratory testing next-generation nitrogen cavitation physics.',
    },
  ];

  const currentHub = globalHubs.find((h) => h.id === selectedHub) || globalHubs[0];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Ambient background lightings */}
      <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-[#EEDCC6]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Header Title */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#EEDCC6]/20">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase shadow-sm">
              <Radio className="w-3.5 h-3.5 text-[#EEDCC6] animate-pulse" />
              <span>AERO-GRID™ SATELLITE COMMAND CENTER</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
              GLOBAL LIVE <span className="text-brand-gradient">TELEMETRY.</span>
            </h1>
            <p className="text-sm text-[#EEDCC6]/80 font-sans max-w-xl">
              Real-time monitoring of our 1-billion dollar international network: automated thermal extraction chambers, cryogenic flash cooling, and autonomous zero-emission delivery fleets.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3.5 rounded-2xl bg-[#3C2A21] border border-[#EEDCC6]/30 text-right">
              <span className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase block">NETWORK ACCURACY</span>
              <span className="text-lg font-mono font-black text-[#EEDCC6]">99.88% TDS YIELD</span>
            </div>
            <button
              onClick={() => navigate('/make-your-coffee')}
              className="px-6 py-3.5 rounded-2xl bg-brand-gradient text-[#2A1B16] font-mono text-xs font-black uppercase tracking-wider shadow-cream-glow hover:brightness-105 transition-all"
            >
              LAUNCH EXTRACTION
            </button>
          </div>
        </div>

        {/* 4-Stat Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-[28px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 shadow-xl space-y-2 backdrop-blur-sm">
            <div className="flex items-center justify-between text-[#EEDCC6]">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider">ACTIVE EXTRACTIONS</span>
              <Flame className="w-4 h-4 text-[#EEDCC6] animate-pulse" />
            </div>
            <div className="text-3xl font-display font-black text-[#F4E8D1]">
              {activeExtractions.toLocaleString()}
            </div>
            <div className="text-[10px] font-mono text-[#EEDCC6]/60">
              Live automated chambers brewing
            </div>
          </div>

          <div className="p-6 rounded-[28px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 shadow-xl space-y-2 backdrop-blur-sm">
            <div className="flex items-center justify-between text-[#EEDCC6]">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider">CRYO TEMP / HOT BLOOM</span>
              <Snowflake className="w-4 h-4 text-[#F4E8D1] animate-spin-slow" />
            </div>
            <div className="text-3xl font-display font-black text-[#EEDCC6]">
              04.0°C / 68.0°C
            </div>
            <div className="text-[10px] font-mono text-[#EEDCC6]/60">
              ±0.05°C precision thermal lock
            </div>
          </div>

          <div className="p-6 rounded-[28px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 shadow-xl space-y-2 backdrop-blur-sm">
            <div className="flex items-center justify-between text-[#EEDCC6]">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider">AUTONOMOUS COURIERS</span>
              <Truck className="w-4 h-4 text-[#EEDCC6]" />
            </div>
            <div className="text-3xl font-display font-black text-[#F4E8D1]">
              {activeDrones} IN TRANSIT
            </div>
            <div className="text-[10px] font-mono text-[#EEDCC6]/60">
              Zero-emission climate locked EV & drones
            </div>
          </div>

          <div className="p-6 rounded-[28px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 shadow-xl space-y-2 backdrop-blur-sm">
            <div className="flex items-center justify-between text-[#EEDCC6]">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider">CIRCULAR CO₂ OFFSET</span>
              <ShieldCheck className="w-4 h-4 text-[#EEDCC6]" />
            </div>
            <div className="text-3xl font-display font-black text-[#EEDCC6]">
              {co2OffsetKg.toLocaleString()} KG
            </div>
            <div className="text-[10px] font-mono text-[#EEDCC6]/60">
              100% net-zero circular ecosystem
            </div>
          </div>
        </div>

        {/* Interactive Global Map Grid & Selected Hub View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* World Map Container */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-[32px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEDCC6]/20">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#EEDCC6]">
                <Globe className="w-4 h-4 text-[#EEDCC6] animate-spin-slow" />
                <span>INTERACTIVE SATELLITE ROASTERY GRID</span>
              </div>
              <span className="text-[10px] font-mono text-[#F4E8D1] bg-[#2A1B16] px-3 py-1 rounded-full border border-[#EEDCC6]/20">
                8 FLAGSHIP SATELLITES
              </span>
            </div>

            {/* Stylized Dark Holographic Map Surface */}
            <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-[#1E120E] border border-[#EEDCC6]/20 overflow-hidden flex items-center justify-center">
              {/* Grid Lines */}
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#EEDCC6_1px,transparent_1px),linear-gradient(to_bottom,#EEDCC6_1px,transparent_1px)] [background-size:40px_40px]" />

              {/* Pulsating Orbit Rings */}
              <div className="absolute w-72 h-72 rounded-full border border-[#EEDCC6]/10 animate-ping pointer-events-none" />

              {/* Center Watermark */}
              <div className="opacity-10 pointer-events-none">
                <TripleWaveEmblem size={160} />
              </div>

              {/* Interactive Node Pins */}
              {globalHubs.map((hub) => {
                const isSelected = selectedHub === hub.id;
                return (
                  <button
                    key={hub.id}
                    onClick={() => setSelectedHub(hub.id)}
                    style={{ left: hub.coords.x, top: hub.coords.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-20"
                  >
                    <div className="relative flex items-center justify-center">
                      <span
                        className={`absolute w-7 h-7 rounded-full transition-all ${
                          isSelected ? 'bg-[#EEDCC6]/40 animate-ping' : 'group-hover:bg-[#EEDCC6]/20'
                        }`}
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#EEDCC6] border-[#2A1B16] scale-125 shadow-cream-glow'
                            : 'bg-[#2A1B16] border-[#EEDCC6] hover:scale-110'
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2A1B16]" />
                      </div>

                      {/* Tooltip Label */}
                      <span
                        className={`absolute -top-7 whitespace-nowrap px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase transition-all ${
                          isSelected
                            ? 'bg-[#EEDCC6] text-[#2A1B16] shadow-md scale-105'
                            : 'bg-[#2A1B16]/90 text-[#F4E8D1] border border-[#EEDCC6]/30 group-hover:block hidden'
                        }`}
                      >
                        {hub.name.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Hub Filter Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {globalHubs.map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => setSelectedHub(hub.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                    selectedHub === hub.id
                      ? 'bg-[#EEDCC6] text-[#2A1B16] font-bold shadow-sm'
                      : 'bg-[#2A1B16] text-[#EEDCC6]/70 border border-[#EEDCC6]/20 hover:text-[#F4E8D1]'
                  }`}
                >
                  {hub.name.split(' ')[0]} ({hub.country})
                </button>
              ))}
            </div>
          </div>

          {/* Selected Hub Detail Card */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-[32px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 shadow-2xl space-y-6 backdrop-blur-md">
            <div className="space-y-1 pb-4 border-b border-[#EEDCC6]/20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold text-[#EEDCC6] tracking-wider">
                  TELEMETRY PROFILE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30 text-[9px] font-mono font-bold">
                  {currentHub.status}
                </span>
              </div>
              <h3 className="text-xl font-display font-black text-[#F4E8D1] uppercase">
                {currentHub.name}
              </h3>
              <p className="text-xs text-[#EEDCC6]/70 font-sans">
                {currentHub.desc}
              </p>
            </div>

            {/* Live Chamber Gauges */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20 space-y-1">
                <span className="text-[#EEDCC6]/60 text-[10px]">CHAMBERS:</span>
                <div className="text-base font-black text-[#F4E8D1]">{currentHub.activeChambers} DUAL CELLS</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20 space-y-1">
                <span className="text-[#EEDCC6]/60 text-[10px]">EXTRACTION TDS:</span>
                <div className="text-base font-black text-[#EEDCC6]">{currentHub.tds} YIELD</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20 space-y-1">
                <span className="text-[#EEDCC6]/60 text-[10px]">HOT INDUCTION:</span>
                <div className="text-base font-black text-[#F4E8D1]">{currentHub.curTempHot}</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20 space-y-1">
                <span className="text-[#EEDCC6]/60 text-[10px]">CRYO FLASH:</span>
                <div className="text-base font-black text-[#F4E8D1]">{currentHub.curTempCool}</div>
              </div>
            </div>

            {/* Specialty Batch */}
            <div className="p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/25 space-y-1 text-xs font-mono">
              <span className="text-[10px] text-[#EEDCC6] font-bold uppercase tracking-wider block">
                FLAGSHIP SIGNATURE BATCH:
              </span>
              <p className="font-bold text-[#F4E8D1]">{currentHub.specialty}</p>
            </div>

            {/* Action */}
            <button
              onClick={() => navigate('/make-your-coffee')}
              className="w-full py-4 rounded-full bg-brand-gradient text-[#2A1B16] font-mono text-xs font-black uppercase tracking-widest shadow-cream-glow hover:brightness-105 transition-all flex items-center justify-center space-x-2"
            >
              <span>CONNECT VESSEL TO {currentHub.name.split(' ')[0].toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Streaming Telemetry Terminal Logs */}
        <div className="p-6 sm:p-8 rounded-[32px] bg-[#1E120E] border border-[#EEDCC6]/20 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EEDCC6]/15 text-xs font-mono">
            <div className="flex items-center space-x-2 text-[#EEDCC6]">
              <Activity className="w-4 h-4 text-[#EEDCC6] animate-pulse" />
              <span className="font-bold uppercase tracking-wider">LIVE HIGH-VELOCITY TELEMETRY BUS (ENCRYPTED)</span>
            </div>
            <span className="text-[10px] text-[#EEDCC6]/60">REFRESH RATE: 2.8s</span>
          </div>

          <div className="space-y-2 max-h-44 overflow-y-auto pr-2 font-mono text-xs">
            {telemetryLogs.map((log) => (
              <div key={log.id} className="flex items-start space-x-3 text-[11px] hover:bg-[#2A1B16] p-1.5 rounded-lg transition-colors">
                <span className="text-[#EEDCC6]/60 font-bold whitespace-nowrap">[{log.time}]</span>
                <span className="text-[#EEDCC6] font-black px-2 py-0.5 rounded bg-[#3C2A21] whitespace-nowrap">
                  {log.hub}
                </span>
                <span className="text-[#F4E8D1]/90">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalTelemetry;
