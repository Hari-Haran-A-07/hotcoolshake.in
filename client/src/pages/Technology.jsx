import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import {
  Cpu,
  Sliders,
  Flame,
  Snowflake,
  ShieldCheck,
  Truck,
  ArrowRight,
  Zap,
  Radio,
  Layers,
  Sparkles,
  Gauge,
  Activity,
  Workflow,
  RotateCw,
  RefreshCw,
} from 'lucide-react';

export const Technology = () => {
  // Interactive CHAMBER-X™ Simulator Controls
  const [coilPowerKw, setCoilPowerKw] = useState(3.4); // 1.0 - 5.0 kW
  const [injectionPressureBar, setInjectionPressureBar] = useState(9.2); // 6.0 - 18.0 BAR
  const [cryoPsi, setCryoPsi] = useState(45); // 10 - 60 PSI
  const [ultrasonicKhz, setUltrasonicKhz] = useState(42); // 20 - 60 kHz
  const [simMode, setSimMode] = useState('HOT'); // 'HOT' | 'COOL' | 'SHAKE'

  // Computed Real-time Telemetry Calculations
  const computedTemp = simMode === 'HOT'
    ? (58 + coilPowerKw * 2.9).toFixed(1)
    : simMode === 'COOL'
    ? (8 - cryoPsi * 0.08).toFixed(1)
    : (12 - ultrasonicKhz * 0.09).toFixed(1);

  const computedTds = (18.5 + (injectionPressureBar * 0.18) + (coilPowerKw * 0.1)).toFixed(1);
  const computedCremaViscosity = Math.min(99, Math.round(injectionPressureBar * 4 + ultrasonicKhz * 0.8));

  const techStack = [
    {
      title: 'Algorithmic Customization Engine',
      desc: 'Real-time computation calibrating bean density, grind micron size, extraction time, water pressure, and flavor layering.',
      icon: Sliders,
      tag: 'LOGIC LAYER',
    },
    {
      title: 'Dual-Chamber Automated Cells',
      desc: 'Robotic precision induction heaters (68°C thermal bloom) and cryogenic nitrogen chillers (04°C cold lock) with ±0.1°C tolerance.',
      icon: Flame,
      tag: 'THERMODYNAMICS',
    },
    {
      title: 'Spectral Optical TDS Sensors',
      desc: 'Infrared refractometer arrays measuring Total Dissolved Solids (TDS) in-line to guarantee extraction yield consistency between 19.5% and 21.5%.',
      icon: ShieldCheck,
      tag: 'QUALITY AUDIT',
    },
    {
      title: 'Active Climate-Locked EV Transit',
      desc: 'Thermal telemetry monitoring the vessel temperature in real-time during electric courier transit, ensuring peak flavor at your door.',
      icon: Truck,
      tag: 'DISPATCH TELEMETRY',
    },
  ];

  const extractionSpecs = [
    { label: 'Thermal Infusion Temp', hot: '68.0°C ±0.1°C', cool: '04.0°C ±0.1°C', metric: 'Real-time dual sensor feedback' },
    { label: 'Injection Bar Pressure', hot: '9.2 BAR (Peak Bloom)', cool: '15.0 BAR (Cold Nitro)', metric: 'Constant displacement rotary pump' },
    { label: 'Extraction Time', hot: '28 Seconds', cool: '120 Seconds (Nitro Infusion)', metric: 'Automated flow-rate termination' },
    { label: 'Total Dissolved Solids (TDS)', hot: '20.2% Optimal', cool: '19.8% Sub-Zero Clarity', metric: 'Optical spectral verification' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#EEDCC6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#3C2A21]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 shadow-sm"
          >
            <Cpu className="w-3.5 h-3.5 text-[#EEDCC6]" />
            <span>MOLECULAR EXTRACTION TELEMETRY</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase"
          >
            THE SCIENCE OF <br />
            <span className="text-brand-gradient">PERFECT EXTRACTION.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#EEDCC6]/80 font-sans leading-relaxed"
          >
            How our automated preparation laboratory translates your custom recipe into precision thermal extraction with mathematical repeatability.
          </motion.p>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE CHAMBER-X™ SANDBOX SIMULATOR */}
        {/* ========================================================= */}
        <div className="p-8 sm:p-12 rounded-[36px] bg-[#1E120E] border-2 border-[#EEDCC6]/35 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#EEDCC6]/20">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-[10px] font-mono text-[#EEDCC6] font-black uppercase">
                <Sparkles className="w-3 h-3 text-[#EEDCC6]" />
                <span>INTERACTIVE THERMODYNAMICS SANDBOX</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F4E8D1] uppercase">
                CHAMBER-X™ EXTRACTION BENCH
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              {['HOT', 'COOL', 'SHAKE'].map((m) => (
                <button
                  key={m}
                  onClick={() => setSimMode(m)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                    simMode === m
                      ? 'bg-brand-gradient text-[#2A1B16] shadow-cream-glow font-black'
                      : 'bg-[#2A1B16] text-[#EEDCC6]/70 border border-[#EEDCC6]/20 hover:text-[#F4E8D1]'
                  }`}
                >
                  {m === 'HOT' ? '68°C STEAM' : m === 'COOL' ? '04°C CRYO' : '08°C VORTEX'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-5">
              {/* Slider 1: Induction Coil Wattage */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#F4E8D1] font-bold">Induction Coil Output</span>
                  <span className="text-[#EEDCC6] font-black">{coilPowerKw.toFixed(1)} kW</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  value={coilPowerKw}
                  onChange={(e) => setCoilPowerKw(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#3C2A21] rounded-lg appearance-none cursor-pointer accent-[#EEDCC6]"
                />
              </div>

              {/* Slider 2: Injection Bar Pressure */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#F4E8D1] font-bold">Injection Rotary Pressure</span>
                  <span className="text-[#EEDCC6] font-black">{injectionPressureBar.toFixed(1)} BAR</span>
                </div>
                <input
                  type="range"
                  min="6.0"
                  max="18.0"
                  step="0.2"
                  value={injectionPressureBar}
                  onChange={(e) => setInjectionPressureBar(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#3C2A21] rounded-lg appearance-none cursor-pointer accent-[#EEDCC6]"
                />
              </div>

              {/* Slider 3: Nitrogen Flash PSI */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#F4E8D1] font-bold">Cryogenic Nitrogen Injection</span>
                  <span className="text-[#EEDCC6] font-black">{cryoPsi} PSI</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="65"
                  step="1"
                  value={cryoPsi}
                  onChange={(e) => setCryoPsi(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#3C2A21] rounded-lg appearance-none cursor-pointer accent-[#EEDCC6]"
                />
              </div>

              {/* Slider 4: Ultrasonic Cavitation Frequency */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#F4E8D1] font-bold">Ultrasonic Cavitation Frequency</span>
                  <span className="text-[#EEDCC6] font-black">{ultrasonicKhz} kHz</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="60"
                  step="1"
                  value={ultrasonicKhz}
                  onChange={(e) => setUltrasonicKhz(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#3C2A21] rounded-lg appearance-none cursor-pointer accent-[#EEDCC6]"
                />
              </div>
            </div>

            {/* Right Live Gauge Output */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#2A1B16] border border-[#EEDCC6]/30 space-y-6 text-center relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-[#EEDCC6]/15">
                <span className="text-[#EEDCC6] font-bold">CHAMBER TELEMETRY FEED</span>
                <span className="text-[#F4E8D1] font-black px-2 py-0.5 rounded bg-[#3C2A21]">
                  CALIBRATED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#3C2A21]/70 border border-[#EEDCC6]/20">
                  <span className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase block">OUTLET TEMP</span>
                  <div className="text-3xl font-display font-black text-[#F4E8D1] mt-1">
                    {computedTemp}°C
                  </div>
                  <span className="text-[9px] font-mono text-[#EEDCC6]">±0.05°C Lock</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#3C2A21]/70 border border-[#EEDCC6]/20">
                  <span className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase block">TDS EXTRACTION</span>
                  <div className="text-3xl font-display font-black text-[#EEDCC6] mt-1">
                    {computedTds}%
                  </div>
                  <span className="text-[9px] font-mono text-[#EEDCC6]">Gold Cup Target</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#3C2A21]/70 border border-[#EEDCC6]/20">
                  <span className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase block">CREMA DENSITY</span>
                  <div className="text-3xl font-display font-black text-[#F4E8D1] mt-1">
                    {computedCremaViscosity}%
                  </div>
                  <span className="text-[9px] font-mono text-[#EEDCC6]">Micro-aerated</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#3C2A21]/70 border border-[#EEDCC6]/20">
                  <span className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase block">QUALITY RATING</span>
                  <div className="text-xl font-display font-black text-[#EEDCC6] mt-2">
                    99.9% GOLD
                  </div>
                  <span className="text-[9px] font-mono text-[#EEDCC6]">Certified Yield</span>
                </div>
              </div>

              <Link
                to="/make-your-coffee"
                className="w-full py-3.5 rounded-full bg-brand-gradient text-[#2A1B16] font-mono text-xs font-black uppercase tracking-widest shadow-cream-glow hover:brightness-105 transition-all flex items-center justify-center space-x-2"
              >
                <span>APPLY CONFIGURATION TO VESSEL</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* System Architecture 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 sm:p-8 rounded-[28px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 shadow-xl space-y-4 flex flex-col justify-between backdrop-blur-sm hover:border-[#EEDCC6]/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#F4E8D1]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#EEDCC6]/75 font-sans leading-relaxed mt-2.5">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EEDCC6]/15 text-[10px] font-mono text-[#EEDCC6] flex items-center space-x-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#EEDCC6] animate-pulse" />
                  <span>CELL AUTOMATION ACTIVE</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Telemetry Specifications Matrix */}
        <div className="p-8 sm:p-12 rounded-[32px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 shadow-2xl space-y-8 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#EEDCC6] uppercase tracking-wider font-bold">
                LABORATORY SPECIFICATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F4E8D1] uppercase mt-1">
                THERMAL CURVE CALIBRATION
              </h2>
            </div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono px-4 py-2 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-[#EEDCC6]">
              <Gauge className="w-4 h-4" />
              <span>DYNAMIC ISO-EXTRACTION PROFILES</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EEDCC6]/20 text-xs font-mono text-[#EEDCC6]">
                  <th className="py-3 px-4">PARAMETER</th>
                  <th className="py-3 px-4">HOT FORMULATION</th>
                  <th className="py-3 px-4">COOL FORMULATION</th>
                  <th className="py-3 px-4 text-[#EEDCC6]/60">MEASUREMENT METHOD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEDCC6]/15 text-xs font-sans">
                {extractionSpecs.map((spec, i) => (
                  <tr key={i} className="hover:bg-[#2A1B16]/40 transition-colors">
                    <td className="py-4 px-4 font-display font-bold text-[#F4E8D1]">{spec.label}</td>
                    <td className="py-4 px-4 font-mono font-bold text-[#EEDCC6]">{spec.hot}</td>
                    <td className="py-4 px-4 font-mono font-bold text-[#F4E8D1]">{spec.cool}</td>
                    <td className="py-4 px-4 text-[#EEDCC6]/70 font-mono text-[11px]">{spec.metric}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Deep Tech Process Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-[32px] bg-[#3C2A21]/70 border border-[#EEDCC6]/20 space-y-4 shadow-lg">
            <div className="p-3 rounded-xl bg-[#2A1B16] text-[#EEDCC6] w-fit border border-[#EEDCC6]/30">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#F4E8D1]">
              THERMAL INDUCTION BLOOM
            </h3>
            <p className="text-xs sm:text-sm text-[#EEDCC6]/75 leading-relaxed">
              Traditional machines extract at fixed temperatures, scorching delicate oils. Our system delivers a 68°C pre-wetting bloom stage that opens micro-channels in the coffee bed before applying full 9.2-bar pressure, unlocking rich chocolate, toffee, and floral aromas with zero bitterness.
            </p>
          </div>

          <div className="p-8 rounded-[32px] bg-[#3C2A21]/70 border border-[#EEDCC6]/20 space-y-4 shadow-lg">
            <div className="p-3 rounded-xl bg-[#2A1B16] text-[#EEDCC6] w-fit border border-[#EEDCC6]/30">
              <Snowflake className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#F4E8D1]">
              CRYOGENIC NITRO FLASH CHILL
            </h3>
            <p className="text-xs sm:text-sm text-[#EEDCC6]/75 leading-relaxed">
              For cold beverages, our nitrogen injection chamber flash-chills freshly extracted concentrate to 04°C in 1.4 seconds under 45 PSI inert nitrogen. This prevents flavor oxidation and produces millions of velvety micro-bubbles without melting ice cubes into the recipe.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4 space-y-4">
          <h3 className="font-display font-bold text-xl text-[#F4E8D1]">
            EXPERIENCE THE EXTRACTION ENGINE LIVE
          </h3>
          <Link
            to="/make-your-coffee"
            className="px-8 py-4 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-xl hover:bg-[#F4E8D1] transition-all inline-flex items-center space-x-2"
          >
            <span>LAUNCH CUSTOM COFFEE LAB</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Technology;
