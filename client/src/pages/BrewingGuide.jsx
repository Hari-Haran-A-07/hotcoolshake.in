import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import {
  Coffee,
  Flame,
  Snowflake,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Sliders,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Scale,
  Thermometer,
  Layers,
} from 'lucide-react';

const BREW_METHODS = [
  {
    id: 'v60',
    name: 'V60 Pour Over',
    subTitle: 'Precision Spiral Conical Extraction',
    category: 'HOT',
    temperature: '94°C',
    ratio: '1:16',
    defaultDose: 18,
    grind: 'Medium-Fine (Table Salt)',
    totalTimeSeconds: 180,
    flavorProfile: 'Ultra-clean clarity, highlighted floral florals & delicate citrus notes.',
    steps: [
      { name: 'Rinse & Pre-Heat', time: 15, instruction: 'Rinse filter paper with 94°C water to eliminate paper taste and pre-heat vessel.' },
      { name: 'The Bloom', time: 45, instruction: 'Pour 50g water in spiral motion. Wait 45s for CO2 degassing and flavor unlocking.' },
      { name: 'First Continuous Pour', time: 60, instruction: 'Slowly pour up to 180g in clockwise concentric circles, keeping slurry level.' },
      { name: 'Final Drawdown', time: 60, instruction: 'Top up to final weight (288g) and let gravity finish the pristine extraction.' },
    ],
  },
  {
    id: 'cryo-press',
    name: 'Chamber-X™ Cryo Press',
    subTitle: 'Sub-Zero Acoustic Vacuum Drip',
    category: 'COOL',
    temperature: '04°C',
    ratio: '1:10',
    defaultDose: 30,
    grind: 'Coarse Sand (Sea Salt)',
    totalTimeSeconds: 240,
    flavorProfile: 'Zero astringency, dense velvet body, rich dark chocolate & berry sweetness.',
    steps: [
      { name: 'Cryo-Chill Chamber', time: 30, instruction: 'Ensure Chamber-X extraction vessel is calibrated to 04°C sub-ambient lock.' },
      { name: 'Cold Saturation', time: 60, instruction: 'Saturate coffee bed with chilled purified mountain spring water.' },
      { name: 'Acoustic Pulse Agitation', time: 90, instruction: 'Engage gentle ultrasonic soundwave pulse to draw aromatics without heat.' },
      { name: 'Hermetic Nitrogen Lock', time: 60, instruction: 'Seal under nitrogen layer for 60s to lock volatile terpene aromatics.' },
    ],
  },
  {
    id: 'aeropress',
    name: 'AeroPress Inverted',
    subTitle: 'High-Velocity Atmospheric Pressure',
    category: 'HOT',
    temperature: '86°C',
    ratio: '1:14',
    defaultDose: 16,
    grind: 'Fine-Medium',
    totalTimeSeconds: 120,
    flavorProfile: 'Full-bodied syrupy mouthfeel, sweet caramel undertones, low perceived acidity.',
    steps: [
      { name: 'Invert & Load Dose', time: 20, instruction: 'Set chamber upside down, add 16g coffee, pour 100g water at 86°C.' },
      { name: 'Stir & Agitate', time: 30, instruction: 'Gently paddle stir back-and-forth 5 times for uniform saturation.' },
      { name: 'Cap & Invert', time: 30, instruction: 'Rinse paper filter, lock cap securely, flip onto serving carafe at 50s.' },
      { name: 'Gentle Plunge', time: 40, instruction: 'Depress plunger gently over 30s. Stop when you hear the initial air hiss.' },
    ],
  },
  {
    id: 'french-press',
    name: 'French Press Immersion',
    subTitle: 'Traditional Metal Mesh Extraction',
    category: 'HOT',
    temperature: '92°C',
    ratio: '1:15',
    defaultDose: 30,
    grind: 'Coarse Crystal',
    totalTimeSeconds: 240,
    flavorProfile: 'Heavy decadent body, rich natural oils, dark toffee and hazelnut notes.',
    steps: [
      { name: 'Pre-infuse Coffee', time: 30, instruction: 'Add coarse grinds, pour 100g water, gently immerse without pressing.' },
      { name: 'Full Steep', time: 120, instruction: 'Pour remaining water up to 450g. Place lid with plunger pulled up.' },
      { name: 'Crust Break & Skim', time: 30, instruction: 'Stir the top crust and skim surface foam with two spoons for ultra smoothness.' },
      { name: 'Smooth Mesh Press', time: 60, instruction: 'Gently press filter straight down without force. Decant immediately.' },
    ],
  },
  {
    id: 'nitro-cold-drip',
    name: 'Nitro Cold Drip Tower',
    subTitle: 'Gravity Slow-Drop Microfoam Infusion',
    category: 'COOL',
    temperature: '02°C',
    ratio: '1:8',
    defaultDose: 40,
    grind: 'Coarse',
    totalTimeSeconds: 180,
    flavorProfile: 'Guinness-like cascading microfoam, creamy vanilla sweetness, zero bitterness.',
    steps: [
      { name: 'Slow-Drip Alignment', time: 30, instruction: 'Align glass drip valve to 1 drop every 1.5 seconds over icy slurry bed.' },
      { name: 'Bed Hydration', time: 60, instruction: 'Observe uniform percolation through Japanese cotton circular filter.' },
      { name: 'Micro-Screen Aeration', time: 50, instruction: 'Pass concentrated nectar through dual mesh micro-strainer.' },
      { name: 'Nitrogen Micro-Vortex', time: 40, instruction: 'Charge with pressurized nitrogen tap for 10s and swirl into chilled glass.' },
    ],
  },
];

export const BrewingGuide = () => {
  const [selectedMethodId, setSelectedMethodId] = useState('v60');
  const [dose, setDose] = useState(18);
  const [ratioMultiplier, setRatioMultiplier] = useState(16);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentMethod = BREW_METHODS.find((m) => m.id === selectedMethodId) || BREW_METHODS[0];

  // Auto-calibrate when method changes
  useEffect(() => {
    setDose(currentMethod.defaultDose);
    const ratioNum = parseInt(currentMethod.ratio.split(':')[1], 10) || 15;
    setRatioMultiplier(ratioNum);
    setIsTimerRunning(false);
    setTimerSeconds(0);
    setCurrentStepIndex(0);
  }, [selectedMethodId]);

  // Live Timer Interval
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          const next = prev + 1;
          // Calculate step index based on elapsed seconds
          let cumulative = 0;
          for (let i = 0; i < currentMethod.steps.length; i++) {
            cumulative += currentMethod.steps[i].time;
            if (next <= cumulative) {
              setCurrentStepIndex(i);
              break;
            }
          }
          if (next >= currentMethod.totalTimeSeconds) {
            setIsTimerRunning(false);
            return currentMethod.totalTimeSeconds;
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, currentMethod]);

  const waterWeight = dose * ratioMultiplier;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
    setCurrentStepIndex(0);
  };

  return (
    <div className="min-h-screen bg-[#2A1B16] text-[#F4E8D1] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/20 text-xs font-mono text-[#EEDCC6]">
            <TripleWaveEmblem className="w-3.5 h-3.5" />
            <span>BARISTA ACADEMY & EXTRACTION LAB</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            MASTER THE <span className="text-[#EEDCC6]">EXTRACTION</span>
          </h1>
          <p className="text-base sm:text-lg text-[#EEDCC6]/80 font-mono">
            Scientific calibration, thermodynamic control, and sensory precision. Perfect every cup at home using our flagship master roaster standards.
          </p>
        </div>

        {/* Method Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {BREW_METHODS.map((method) => {
            const isSelected = method.id === selectedMethodId;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethodId(method.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#3C2A21] border-[#EEDCC6] shadow-xl text-[#F4E8D1]'
                    : 'bg-[#2A1B16] border-[#EEDCC6]/20 text-[#EEDCC6]/70 hover:border-[#EEDCC6]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      method.category === 'HOT'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}
                  >
                    {method.category === 'HOT' ? 'HOT (THERMAL)' : 'COOL (CRYO)'}
                  </span>
                  <span className="text-xs font-mono text-[#EEDCC6] font-bold">{method.temperature}</span>
                </div>
                <h3 className="font-bold text-sm tracking-wide font-display text-[#F4E8D1]">
                  {method.name}
                </h3>
                <p className="text-[11px] font-mono text-[#EEDCC6]/60 line-clamp-1 mt-1">
                  {method.subTitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Calibration Calculator & Parameters */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-[32px] bg-[#3C2A21]/70 border border-[#EEDCC6]/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-display uppercase text-[#F4E8D1]">
                    {currentMethod.name}
                  </h2>
                  <p className="text-xs font-mono text-[#EEDCC6]/70">{currentMethod.subTitle}</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20">
                  {currentMethod.category === 'HOT' ? (
                    <Flame className="w-6 h-6 text-amber-400" />
                  ) : (
                    <Snowflake className="w-6 h-6 text-cyan-400" />
                  )}
                </div>
              </div>

              {/* Flavor Profile Note */}
              <div className="p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20 flex items-start space-x-3 text-xs font-mono text-[#EEDCC6]/90">
                <Sparkles className="w-4 h-4 text-[#EEDCC6] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F4E8D1]">Aromatics & Cup Profile:</strong> {currentMethod.flavorProfile}
                </span>
              </div>

              {/* Calibration Sliders */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#EEDCC6]/70 flex items-center space-x-1.5">
                    <Scale className="w-4 h-4 text-[#EEDCC6]" />
                    <span>COFFEE DOSE:</span>
                  </span>
                  <span className="font-bold text-[#EEDCC6] text-sm">{dose}g</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="50"
                  step="1"
                  value={dose}
                  onChange={(e) => setDose(Number(e.target.value))}
                  className="w-full accent-[#EEDCC6] h-1.5 bg-[#2A1B16] rounded-lg cursor-pointer"
                />

                <div className="flex items-center justify-between font-mono text-xs pt-2">
                  <span className="text-[#EEDCC6]/70 flex items-center space-x-1.5">
                    <Sliders className="w-4 h-4 text-[#EEDCC6]" />
                    <span>BREW RATIO (1:{ratioMultiplier}):</span>
                  </span>
                  <span className="font-bold text-[#EEDCC6] text-sm">
                    {ratioMultiplier < 12 ? 'Intense' : ratioMultiplier > 16 ? 'Delicate' : 'Golden Standard'}
                  </span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="18"
                  step="1"
                  value={ratioMultiplier}
                  onChange={(e) => setRatioMultiplier(Number(e.target.value))}
                  className="w-full accent-[#EEDCC6] h-1.5 bg-[#2A1B16] rounded-lg cursor-pointer"
                />
              </div>

              {/* Metric Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#EEDCC6]/20 text-center font-mono">
                <div className="p-3 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20">
                  <div className="text-[10px] text-[#EEDCC6]/60 uppercase">WATER WEIGHT</div>
                  <div className="text-lg font-bold text-[#F4E8D1] mt-0.5">{waterWeight}g</div>
                  <div className="text-[9px] text-[#EEDCC6]/50">approx {waterWeight}ml</div>
                </div>
                <div className="p-3 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20">
                  <div className="text-[10px] text-[#EEDCC6]/60 uppercase">TARGET TEMP</div>
                  <div className="text-lg font-bold text-[#EEDCC6] mt-0.5">{currentMethod.temperature}</div>
                  <div className="text-[9px] text-[#EEDCC6]/50">Calibrated</div>
                </div>
                <div className="p-3 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20">
                  <div className="text-[10px] text-[#EEDCC6]/60 uppercase">GRIND CALIBRATION</div>
                  <div className="text-xs font-bold text-[#F4E8D1] mt-1 line-clamp-1">{currentMethod.grind}</div>
                  <div className="text-[9px] text-[#EEDCC6]/50">Micron Spec</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#2A1B16]/50 border border-[#EEDCC6]/15 flex items-center justify-between text-xs font-mono">
                <span className="text-[#EEDCC6]/70">Explore single-origin beans dialed for this method:</span>
                <Link
                  to="/coffee"
                  className="text-[#EEDCC6] font-bold hover:underline flex items-center space-x-1"
                >
                  <span>ORIGINS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Live Extraction Timer & Phase Steps */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-[32px] bg-[#3C2A21]/70 border border-[#EEDCC6]/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Timer className="w-5 h-5 text-[#EEDCC6]" />
                  <h3 className="font-display font-bold text-xl uppercase tracking-wider text-[#F4E8D1]">
                    EXTRACTION TIMING MATRIX
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#EEDCC6]/60">
                  Total Target: {formatTime(currentMethod.totalTimeSeconds)}
                </span>
              </div>

              {/* Huge Timer Display */}
              <div className="p-8 rounded-3xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-center relative overflow-hidden">
                <div className="text-6xl sm:text-7xl font-mono font-black tracking-tight text-[#EEDCC6]">
                  {formatTime(timerSeconds)}
                </div>
                <div className="text-xs font-mono uppercase text-[#EEDCC6]/60 mt-2 tracking-widest">
                  {timerSeconds >= currentMethod.totalTimeSeconds
                    ? 'EXTRACTION COMPLETE — SAVOR THE MOMENT'
                    : isTimerRunning
                    ? 'ACTIVE EXTRACTION IN PROGRESS'
                    : 'READY FOR WATER CONTACT'}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#3C2A21] h-2 rounded-full mt-6 overflow-hidden">
                  <motion.div
                    className="h-full bg-[#EEDCC6]"
                    style={{
                      width: `${Math.min(100, (timerSeconds / currentMethod.totalTimeSeconds) * 100)}%`,
                    }}
                  />
                </div>

                {/* Timer Controls */}
                <div className="flex items-center justify-center space-x-4 mt-6">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`px-8 py-3.5 rounded-full font-mono font-bold text-xs uppercase tracking-widest flex items-center space-x-2 transition-all shadow-xl ${
                      isTimerRunning
                        ? 'bg-amber-600 text-white hover:bg-amber-500'
                        : 'bg-[#EEDCC6] text-[#2A1B16] hover:bg-[#F4E8D1]'
                    }`}
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>PAUSE</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>START TIMER</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleResetTimer}
                    className="p-3.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-[#EEDCC6] hover:text-[#F4E8D1] transition-all"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Extraction Steps List */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold tracking-wider text-[#EEDCC6] uppercase">
                  EXTRACTION PHASES
                </h4>

                <div className="space-y-2.5">
                  {currentMethod.steps.map((st, idx) => {
                    const isCurrent = idx === currentStepIndex && isTimerRunning;
                    const isPassed = timerSeconds > 0 && idx < currentStepIndex;

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border transition-all flex items-start space-x-3 text-xs font-mono ${
                          isCurrent
                            ? 'bg-[#3C2A21] border-[#EEDCC6] shadow-lg text-[#F4E8D1]'
                            : isPassed
                            ? 'bg-[#2A1B16]/50 border-[#EEDCC6]/10 text-[#EEDCC6]/50'
                            : 'bg-[#2A1B16] border-[#EEDCC6]/20 text-[#EEDCC6]/80'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                            isPassed
                              ? 'bg-[#EEDCC6] text-[#2A1B16]'
                              : isCurrent
                              ? 'bg-[#EEDCC6] text-[#2A1B16] animate-pulse'
                              : 'bg-[#3C2A21] text-[#EEDCC6]'
                          }`}
                        >
                          {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#F4E8D1]">{st.name}</span>
                            <span className="text-[10px] text-[#EEDCC6]/60">({st.time}s)</span>
                          </div>
                          <p className="text-[11px] text-[#EEDCC6]/70 mt-1 leading-relaxed">
                            {st.instruction}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BrewingGuide;
