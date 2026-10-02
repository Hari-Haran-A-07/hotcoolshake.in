import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { usePageLoader } from '../context/LoadingContext';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import {
  Sparkles,
  Sliders,
  Flame,
  Snowflake,
  Check,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  RotateCw,
  Clock,
  Thermometer,
  ShieldCheck,
  Truck,
  Download,
  Share2,
  RefreshCw,
  Droplet,
  Layers,
  Award,
} from 'lucide-react';

export const MakeYourCoffee = () => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { startPageTransition } = usePageLoader();

  // Wizard Stage: 1: Bottle, 2: Flavors & Base, 3: Condition (Hot/Cool), 4: Automation Chamber, 5: Location, 6: Final Result
  const [currentStep, setCurrentStep] = useState(1);

  // Data from Backend
  const [bottles, setBottles] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [loadingCatalog, setLoadingCatalog] = useState(true);

  // Selected State
  const [selectedBottle, setSelectedBottle] = useState(null);
  const [selectedRoastBase, setSelectedRoastBase] = useState('Signature Italian Espresso Base');
  const [selectedFlavors, setSelectedFlavors] = useState([]); // [{ name, intensity, colorHex }]
  const [selectedCondition, setSelectedCondition] = useState('COOL'); // 'COOL' | 'HOT'
  const [selectedMilk, setSelectedMilk] = useState('Velvet Silk Oat Milk');
  const [selectedSweetness, setSelectedSweetness] = useState('50% Pure Maple');
  const [selectedToppings, setSelectedToppings] = useState(['Cold Foam Float']);
  const [creatorName, setCreatorName] = useState(user?.name || 'Master Alchemist');
  const [blendTitle, setBlendTitle] = useState('Obsidian Cryo Velvet');

  // Automation Chamber Simulation State (Step 4)
  const [chamberStatus, setChamberStatus] = useState('INIT'); // 'INIT' | 'RUNNING' | 'COMPLETED'
  const [chamberProgress, setChamberProgress] = useState(0);
  const [chamberTemp, setChamberTemp] = useState(22); // starts room temp 22°C
  const [simulatedMinutes, setSimulatedMinutes] = useState(0);

  // Delivery Details (Step 5)
  const [locationForm, setLocationForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.defaultAddress?.street || '',
    city: user?.defaultAddress?.city || 'London',
    postalCode: user?.defaultAddress?.postalCode || 'W1K 7AA',
  });

  // Saved Custom Coffee Result (Step 6)
  const [savedCustomCoffee, setSavedCustomCoffee] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Canvas ref for liquid rendering
  const canvasRef = useRef(null);

  // Load Bottles and Flavors from API
  useEffect(() => {
    const fetchLabData = async () => {
      try {
        const [bottlesRes, flavorsRes] = await Promise.all([
          api.getBottles(),
          api.getFlavors(),
        ]);

        if (bottlesRes.success && bottlesRes.bottles.length > 0) {
          setBottles(bottlesRes.bottles);
          setSelectedBottle(bottlesRes.bottles[1] || bottlesRes.bottles[0]);
        }

        if (flavorsRes.success && flavorsRes.flavors.length > 0) {
          setFlavors(flavorsRes.flavors);
          // Preselect 2 signature flavors
          setSelectedFlavors([
            { name: 'Madagascar Vanilla Bean', intensity: 'STRONG', colorHex: '#F4E8D1' },
            { name: 'Smoked Sea Salt Caramel', intensity: 'MEDIUM', colorHex: '#C68B59' },
          ]);
        }
      } catch (err) {
        console.warn('Failed to load lab data, using defaults:', err);
      } finally {
        setLoadingCatalog(false);
      }
    };

    fetchLabData();
  }, []);

  // Compute Live Pricing
  const basePrice = selectedBottle?.price || 9.50;
  const flavorExtra = selectedFlavors.length * 1.25;
  const toppingsExtra = selectedToppings.length * 0.75;
  const computedTotal = Number((basePrice + flavorExtra + toppingsExtra).toFixed(2));

  // Handle Flavor Selection & Intensity Toggle
  const toggleFlavor = (flavor) => {
    const exists = selectedFlavors.find((f) => f.name === flavor.name);
    if (exists) {
      setSelectedFlavors(selectedFlavors.filter((f) => f.name !== flavor.name));
    } else {
      if (selectedFlavors.length >= 4) return; // limit max 4
      setSelectedFlavors([
        ...selectedFlavors,
        { name: flavor.name, intensity: 'MEDIUM', colorHex: flavor.colorHex || '#3C2A21' },
      ]);
    }
  };

  const updateFlavorIntensity = (flavorName, intensity) => {
    setSelectedFlavors(
      selectedFlavors.map((f) => (f.name === flavorName ? { ...f, intensity } : f))
    );
  };

  // Step 4: Chamber Automation Cycle
  const runChamberSimulation = () => {
    setChamberStatus('RUNNING');
    setChamberProgress(0);
    const targetTemp = selectedCondition === 'COOL' ? 4 : 68;
    const startTemp = 22;

    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setChamberProgress(p);

      // Temperature interpolation
      const currentT = Math.round(startTemp + ((targetTemp - startTemp) * p) / 100);
      setChamberTemp(currentT);

      // Simulated minutes elapsed
      const maxMins = selectedCondition === 'COOL' ? 18 : 10;
      setSimulatedMinutes(Math.round((maxMins * p) / 100));

      if (p >= 100) {
        clearInterval(interval);
        setChamberStatus('COMPLETED');
        setTimeout(() => {
          setCurrentStep(5); // Proceed to Step 5: Location
        }, 1200);
      }
    }, 60);
  };

  // Step 5 -> 6: Save Custom Coffee to MongoDB
  const handleFinalizeCreation = async () => {
    setIsSaving(true);
    try {
      const payload = {
        creatorName,
        customBlendTitle: blendTitle || 'Custom Laboratory Blend',
        bottle: {
          bottleId: selectedBottle?._id,
          name: selectedBottle?.name || 'Signature Thermal Vessel',
          capacity: selectedBottle?.capacity || '500ml',
          price: selectedBottle?.price || 9.50,
          image: selectedBottle?.image,
        },
        roastBase: selectedRoastBase,
        flavors: selectedFlavors,
        condition: selectedCondition,
        temperature: selectedCondition === 'COOL' ? '04°C' : '68°C',
        milkBase: selectedMilk,
        sweetnessLevel: selectedSweetness,
        toppings: selectedToppings,
        calculatedPrice: computedTotal,
      };

      const res = await api.createCustomCoffee(payload);
      if (res.success) {
        setSavedCustomCoffee(res.customCoffee);
        setCurrentStep(6); // Show Final Creation Result
      }
    } catch (e) {
      console.error('Failed to persist custom coffee:', e);
      // Fallback local creation
      setSavedCustomCoffee({
        creatorName,
        customBlendTitle: blendTitle,
        bottle: selectedBottle,
        condition: selectedCondition,
        temperature: selectedCondition === 'COOL' ? '04°C' : '68°C',
        flavors: selectedFlavors,
        calculatedPrice: computedTotal,
      });
      setCurrentStep(6);
    } finally {
      setIsSaving(false);
    }
  };

  // Step 6: Order My Coffee
  const handleOrderCustomCoffee = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    addToCart(
      {
        _id: savedCustomCoffee?._id || `custom-${Date.now()}`,
        name: blendTitle || 'HOT COOL SHAKE Lab Creation',
        customBlendTitle: blendTitle,
        price: computedTotal,
        image: selectedBottle?.image || 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop',
        temperature: selectedCondition,
        bottle: selectedBottle,
        flavors: selectedFlavors,
        milkBase: selectedMilk,
        sweetnessLevel: selectedSweetness,
      },
      1,
      {
        bottle: selectedBottle?.name,
        flavors: selectedFlavors.map((f) => `${f.name} (${f.intensity})`),
        condition: `${selectedCondition} (${selectedCondition === 'COOL' ? '04°C' : '68°C'})`,
        milk: selectedMilk,
        sweetness: selectedSweetness,
      },
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    );
  };

  const stepsList = [
    { num: 1, title: 'BOTTLE' },
    { num: 2, title: 'FLAVORS' },
    { num: 3, title: 'TEMPERATURE' },
    { num: 4, title: 'AUTOMATION' },
    { num: 5, title: 'LOCATION' },
    { num: 6, title: 'REVEAL' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Ambient background styling */}
      <div className="absolute inset-0 bg-radial-luxury opacity-90 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#EEDCC6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Lab Top Header & Progress Stepper */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
            <Sparkles className="w-4 h-4 text-[#EEDCC6]" />
            <span>VIRTUAL COFFEE LABORATORY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            MAKE YOUR COFFEE.
          </h1>
          <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans">
            "Create it. Customize it. Make it yours."
          </p>

          {/* Stepper Bar */}
          <div className="pt-6">
            <div className="flex items-center justify-between max-w-2xl mx-auto relative">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#3C2A21] -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-[#EEDCC6] -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%` }}
              />

              {stepsList.map((s) => {
                const isPassed = s.num < currentStep;
                const isCurrent = s.num === currentStep;
                return (
                  <button
                    key={s.num}
                    onClick={() => {
                      if (s.num < currentStep) setCurrentStep(s.num);
                    }}
                    className="relative z-10 flex flex-col items-center group focus:outline-none"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isPassed
                          ? 'bg-[#EEDCC6] text-[#2A1B16]'
                          : isCurrent
                          ? 'bg-[#2A1B16] text-[#F4E8D1] border-2 border-[#EEDCC6] shadow-coffee-glow'
                          : 'bg-[#3C2A21] text-[#EEDCC6]/50 border border-[#EEDCC6]/20'
                      }`}
                    >
                      {isPassed ? <Check className="w-4 h-4" /> : s.num}
                    </div>
                    <span
                      className={`text-[9px] font-mono tracking-widest uppercase mt-1.5 font-bold ${
                        isCurrent ? 'text-[#F4E8D1]' : 'text-[#EEDCC6]/60'
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Lab Workspace Layout (Dual Pane: Interactive Form Left, Live Bottle Visual Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: STEP WIZARD INTERFACE */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 bg-[#3C2A21]/70 backdrop-blur-md rounded-[36px] p-6 sm:p-8 border border-[#EEDCC6]/25 shadow-2xl space-y-6">
            {/* STEP 1: CHOOSE YOUR BOTTLE */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase block">
                    STEP 01
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#F4E8D1]">
                    CHOOSE YOUR VESSEL
                  </h2>
                  <p className="text-xs text-[#EEDCC6]/75 font-sans mt-1">
                    Select your thermal vacuum flask. Each vessel is laser-etched and calibrated for sub-zero cryo or piping hot heat retention.
                  </p>
                </div>

                <div className="space-y-3">
                  {bottles.map((bottle) => {
                    const isSelected = selectedBottle?._id === bottle._id || selectedBottle?.name === bottle.name;
                    return (
                      <div
                        key={bottle._id || bottle.name}
                        onClick={() => setSelectedBottle(bottle)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#2A1B16] border-[#EEDCC6] shadow-coffee-glow'
                            : 'bg-[#2A1B16]/50 border-[#EEDCC6]/15 hover:border-[#EEDCC6]/40'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#3C2A21] border border-[#EEDCC6]/20 flex-shrink-0">
                            <img
                              src={bottle.image}
                              alt={bottle.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-display font-bold text-sm sm:text-base text-[#F4E8D1]">
                                {bottle.name}
                              </h3>
                              {bottle.badge && (
                                <span className="px-2 py-0.5 rounded-full bg-[#EEDCC6] text-[#2A1B16] text-[9px] font-mono font-bold uppercase">
                                  {bottle.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-mono text-[#EEDCC6]">
                              {bottle.capacity} • {bottle.thermalRetention}
                            </div>
                            <p className="text-[11px] text-[#EEDCC6]/70 font-sans line-clamp-1">
                              {bottle.description}
                            </p>
                          </div>
                        </div>

                        <div className="text-right pl-3">
                          <span className="font-mono font-bold text-base text-[#F4E8D1] block">
                            ${bottle.price?.toFixed(2)}
                          </span>
                          <span className={`text-[10px] font-mono uppercase ${isSelected ? 'text-[#EEDCC6] font-bold' : 'text-[#EEDCC6]/50'}`}>
                            {isSelected ? 'SELECTED' : 'SELECT'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#EEDCC6] hover:bg-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-coffee-glow transition-all"
                  >
                    <span>NEXT: CHOOSE FLAVORS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: CHOOSE YOUR COFFEE FLAVOR & BASE */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase block">
                    STEP 02
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#F4E8D1]">
                    CHOOSE YOUR FLAVOR ALCHEMY
                  </h2>
                  <p className="text-xs text-[#EEDCC6]/75 font-sans mt-1">
                    Select up to 4 botanical and dessert essences. Toggle intensity between Light, Medium, and Strong for each layer.
                  </p>
                </div>

                {/* Base Roast Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold tracking-wider text-[#EEDCC6] uppercase block">
                    PRIMARY ESPRESSO EXTRACTION BASE
                  </label>
                  <select
                    value={selectedRoastBase}
                    onChange={(e) => setSelectedRoastBase(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  >
                    <option value="Signature Italian Espresso Base">Signature Italian Dark Espresso (9 Bars)</option>
                    <option value="Sub-Zero Cold Brew Concentrate">Sub-Zero 24h Kyoto Cold Brew Extract</option>
                    <option value="Single-Origin Ethiopian Blonde">Ethiopian Yirgacheffe Blonde Roast (Floral & Bright)</option>
                    <option value="Nitro Velvet Crema Base">Nitro Aerated Velvet Crema Base</option>
                  </select>
                </div>

                {/* Global Flavor Library Chips */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#EEDCC6] font-bold uppercase">
                      GLOBAL FLAVOR LIBRARY ({selectedFlavors.length}/4 SELECTED)
                    </span>
                    <span className="text-[#EEDCC6]/60">+ $1.25 per flavor</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
                    {flavors.map((flv) => {
                      const isChosen = selectedFlavors.some((f) => f.name === flv.name);
                      return (
                        <button
                          key={flv.name}
                          type="button"
                          onClick={() => toggleFlavor(flv)}
                          className={`p-3 rounded-2xl border text-left text-xs font-mono transition-all flex flex-col justify-between ${
                            isChosen
                              ? 'bg-[#2A1B16] border-[#EEDCC6] text-[#F4E8D1] shadow-coffee-glow'
                              : 'bg-[#2A1B16]/50 border-[#EEDCC6]/15 text-[#EEDCC6]/70 hover:border-[#EEDCC6]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <span className="font-bold truncate">{flv.name.split(' ')[0]}</span>
                            {isChosen && <Check className="w-3.5 h-3.5 text-[#EEDCC6]" />}
                          </div>
                          <span className="text-[10px] text-[#EEDCC6]/60 truncate">
                            {flv.category}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Intensity Controls for Selected Flavors */}
                {selectedFlavors.length > 0 && (
                  <div className="space-y-3 p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20">
                    <span className="text-[11px] font-mono font-bold tracking-widest text-[#EEDCC6] uppercase block">
                      INTENSITY CALIBRATION
                    </span>
                    <div className="space-y-2.5">
                      {selectedFlavors.map((f) => (
                        <div key={f.name} className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#F4E8D1] font-bold truncate max-w-[140px]">
                            {f.name}
                          </span>
                          <div className="flex items-center space-x-1.5">
                            {['LIGHT', 'MEDIUM', 'STRONG'].map((level) => (
                              <button
                                key={level}
                                type="button"
                                onClick={() => updateFlavorIntensity(f.name, level)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                                  f.intensity === level
                                    ? 'bg-[#EEDCC6] text-[#2A1B16]'
                                    : 'bg-[#3C2A21] text-[#EEDCC6]/60 hover:text-[#F4E8D1]'
                                }`}
                              >
                                {level}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center space-x-2 text-xs font-mono text-[#EEDCC6]/70 hover:text-[#F4E8D1]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>

                  <button
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#EEDCC6] hover:bg-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-coffee-glow transition-all"
                  >
                    <span>NEXT: CHOOSE CONDITION</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: CHOOSE YOUR CONDITION (HOT vs COOL) */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase block">
                    STEP 03
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#F4E8D1]">
                    CHOOSE YOUR CONDITION
                  </h2>
                  <p className="text-xs text-[#EEDCC6]/75 font-sans mt-1">
                    Select your thermal state. HOT activates induction steam bloom (68°C); COOL activates positive-pressure sub-zero chilling (04°C).
                  </p>
                </div>

                {/* Two Giant Interactive Choices */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* HOT CHOICE */}
                  <div
                    onClick={() => setSelectedCondition('HOT')}
                    className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                      selectedCondition === 'HOT'
                        ? 'bg-[#2A1B16] border-[#EEDCC6] shadow-coffee-glow'
                        : 'bg-[#2A1B16]/60 border-[#EEDCC6]/20 hover:border-[#EEDCC6]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-2xl bg-[#3C2A21] text-[#EEDCC6]">
                          <Flame className="w-6 h-6 animate-pulse" />
                        </div>
                        <span className="font-mono text-xl font-black text-[#EEDCC6]">
                          68°C
                        </span>
                      </div>

                      <h3 className="text-2xl font-display font-black text-[#F4E8D1] uppercase">
                        HOT
                      </h3>
                      <p className="text-xs text-[#EEDCC6]/80 font-sans mt-2 leading-relaxed">
                        Thermal steam bloom, rich extracted crema, heated to calibrated drinking temperature.
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#EEDCC6]/15 text-[10px] font-mono text-[#EEDCC6]">
                      {selectedCondition === 'HOT' ? '✓ SELECTED STATE' : 'SELECT HOT'}
                    </div>
                  </div>

                  {/* COOL CHOICE */}
                  <div
                    onClick={() => setSelectedCondition('COOL')}
                    className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                      selectedCondition === 'COOL'
                        ? 'bg-[#2A1B16] border-[#EEDCC6] shadow-coffee-glow'
                        : 'bg-[#2A1B16]/60 border-[#EEDCC6]/20 hover:border-[#EEDCC6]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-2xl bg-[#3C2A21] text-[#EEDCC6]">
                          <Snowflake className="w-6 h-6 animate-pulse" />
                        </div>
                        <span className="font-mono text-xl font-black text-[#EEDCC6]">
                          04°C
                        </span>
                      </div>

                      <h3 className="text-2xl font-display font-black text-[#F4E8D1] uppercase">
                        COOL
                      </h3>
                      <p className="text-xs text-[#EEDCC6]/80 font-sans mt-2 leading-relaxed">
                        Cryogenic sub-zero refrigeration, zero ice dilution, locked under nitrogen pressure.
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#EEDCC6]/15 text-[10px] font-mono text-[#EEDCC6]">
                      {selectedCondition === 'COOL' ? '✓ SELECTED STATE' : 'SELECT COOL'}
                    </div>
                  </div>
                </div>

                {/* Milk & Sweetness Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div>
                    <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                      Artisan Milk Base
                    </label>
                    <select
                      value={selectedMilk}
                      onChange={(e) => setSelectedMilk(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] focus:outline-none"
                    >
                      <option>Velvet Silk Oat Milk</option>
                      <option>California Almond Cream</option>
                      <option>Whole Organic Dairy</option>
                      <option>Cold-Pressed Coconut Milk</option>
                      <option>Pure Black Extract (No Milk)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                      Sweetness Level
                    </label>
                    <select
                      value={selectedSweetness}
                      onChange={(e) => setSelectedSweetness(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] focus:outline-none"
                    >
                      <option>0% Pure Unsweetened</option>
                      <option>25% Hint of Raw Cane</option>
                      <option>50% Balanced Maple</option>
                      <option>100% Full Indulgence</option>
                    </select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center space-x-2 text-xs font-mono text-[#EEDCC6]/70 hover:text-[#F4E8D1]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentStep(4);
                      runChamberSimulation();
                    }}
                    className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#EEDCC6] hover:bg-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-coffee-glow transition-all"
                  >
                    <span>START AUTOMATION CYCLE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: REALISTIC ACCELERATED AUTOMATION CHAMBER */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-4"
              >
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase block">
                    STEP 04 • ROBOTIC EXTRACTION AUTOMATION
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#F4E8D1] mt-1">
                    {selectedCondition === 'COOL'
                      ? 'YOUR COFFEE IS GOING CHILLED.'
                      : 'YOUR COFFEE IS BEING PERFECTLY HEATED.'}
                  </h2>
                  <p className="text-xs text-[#EEDCC6]/80 font-sans mt-1">
                    {selectedCondition === 'COOL'
                      ? 'Simulating positive-pressure cryogenic chamber refrigeration (15-20 min equivalent).'
                      : 'Simulating precision induction thermal chamber bloom (10-12 min equivalent).'}
                  </p>
                </div>

                {/* Chamber Animation Display */}
                <div className="p-8 rounded-3xl bg-[#2A1B16] border border-[#EEDCC6]/30 shadow-espresso-dark space-y-6 relative overflow-hidden">
                  {/* Chamber Door Glow */}
                  <div className="flex justify-center items-center space-x-8">
                    <div className="flex flex-col items-center">
                      <Thermometer className="w-6 h-6 text-[#EEDCC6] animate-bounce" />
                      <span className="font-display font-black text-3xl sm:text-4xl text-[#F4E8D1] mt-1">
                        {String(chamberTemp).padStart(2, '0')}°C
                      </span>
                      <span className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase">
                        TARGET: {selectedCondition === 'COOL' ? '04°C' : '68°C'}
                      </span>
                    </div>

                    <div className="h-12 w-px bg-[#EEDCC6]/20" />

                    <div className="flex flex-col items-center">
                      <Clock className="w-6 h-6 text-[#EEDCC6] animate-spin-slow" />
                      <span className="font-display font-black text-3xl sm:text-4xl text-[#F4E8D1] mt-1">
                        00:{String(simulatedMinutes).padStart(2, '0')}:00
                      </span>
                      <span className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase">
                        SIMULATED TIME
                      </span>
                    </div>
                  </div>

                  {/* Chamber Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-[#EEDCC6]">
                      <span>CHAMBER CYCLE STATUS</span>
                      <span className="font-bold">{chamberProgress}%</span>
                    </div>
                    <div className="h-3 w-full bg-[#3C2A21] rounded-full overflow-hidden border border-[#EEDCC6]/30 p-0.5">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#3C2A21] via-[#EEDCC6] to-[#F4E8D1] rounded-full"
                        style={{ width: `${chamberProgress}%` }}
                      />
                    </div>
                  </div>

                  {chamberStatus === 'COMPLETED' ? (
                    <div className="p-3 rounded-xl bg-[#3C2A21] border border-emerald-500/40 text-[#EEDCC6] font-mono text-xs flex items-center justify-center space-x-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>YOUR COFFEE IS READY • QUALITY CHECK 99.8% VERIFIED</span>
                    </div>
                  ) : (
                    <div className="text-xs font-mono text-[#EEDCC6]/70 animate-pulse">
                      EXTRACTION ACTIVE • VISCOSITY & HERMETIC LOCK ENGAGED...
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#EEDCC6] hover:bg-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-coffee-glow transition-all"
                  >
                    <span>PROCEED TO LOCATION DISPATCH</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: LOCATION EXPERIENCE & ROUTE */}
            {currentStep === 5 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase block">
                    STEP 05
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#F4E8D1]">
                    DELIVERY TO YOUR SELECTED LOCATION
                  </h2>
                  <p className="text-xs text-[#EEDCC6]/75 font-sans mt-1">
                    Enter your destination telemetry. Our electric courier will transport your thermal vessel with live climate tracking.
                  </p>
                </div>

                {/* Animated Route Journey Tracker */}
                <div className="p-5 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/25 space-y-3">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#EEDCC6] uppercase block">
                    YOUR COFFEE JOURNEY ROUTE
                  </span>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#EEDCC6]/80 overflow-x-auto pb-2">
                    <span className="font-bold text-[#F4E8D1]">COFFEE LAB</span>
                    <span>→</span>
                    <span className="font-bold text-[#F4E8D1]">PREPARATION</span>
                    <span>→</span>
                    <span className="font-bold text-[#F4E8D1]">QUALITY CHECK</span>
                    <span>→</span>
                    <span>DISPATCH</span>
                    <span>→</span>
                    <span>YOUR LOCATION</span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                      Creator / Recipient Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      placeholder="Sophia Laurent"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                      Blend Creation Name
                    </label>
                    <input
                      type="text"
                      value={blendTitle}
                      onChange={(e) => setBlendTitle(e.target.value)}
                      placeholder="e.g. Obsidian Cryo Velvet"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={locationForm.phone}
                      onChange={(e) => setLocationForm({ ...locationForm, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                      City / Roastery Hub *
                    </label>
                    <input
                      type="text"
                      required
                      value={locationForm.city}
                      onChange={(e) => setLocationForm({ ...locationForm, city: e.target.value })}
                      placeholder="London, New York, Mumbai..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={locationForm.address}
                      onChange={(e) => setLocationForm({ ...locationForm, address: e.target.value })}
                      placeholder="450 Innovation Way, Suite 100"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center space-x-2 text-xs font-mono text-[#EEDCC6]/70 hover:text-[#F4E8D1]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>

                  <button
                    onClick={handleFinalizeCreation}
                    disabled={isSaving}
                    className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#EEDCC6] hover:bg-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-coffee-glow transition-all disabled:opacity-50"
                  >
                    <span>{isSaving ? 'ENCRYPTING RECIPE...' : 'FINALIZE & REVEAL'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 6: FINAL COFFEE RESULT & CREATION SHOWCASE */}
            {currentStep === 6 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase block">
                    STEP 06 • LAB CREATION COMPLETE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#F4E8D1] mt-1">
                    YOUR CUSTOM CREATION
                  </h2>
                  <p className="text-xs text-[#EEDCC6]/80 font-sans">
                    Your bespoke formula is telemetrically saved and verified for preparation.
                  </p>
                </div>

                {/* Telemetry Certificate Card */}
                <div className="p-6 rounded-3xl bg-[#2A1B16] border border-[#EEDCC6]/30 space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-[#EEDCC6]/15">
                    <div>
                      <h3 className="font-display font-black text-xl text-[#F4E8D1]">
                        "{blendTitle || 'Signature Lab Reserve'}"
                      </h3>
                      <span className="text-xs font-mono text-[#EEDCC6]">
                        Formulated for: {creatorName}
                      </span>
                    </div>

                    <div className="px-3 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono font-bold text-[#EEDCC6]">
                      {selectedCondition === 'COOL' ? '04°C CHILLED' : '68°C HEATED'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-[#EEDCC6]/60 uppercase block">VESSEL:</span>
                      <span className="font-bold text-[#F4E8D1]">{selectedBottle?.name}</span>
                    </div>

                    <div>
                      <span className="text-[#EEDCC6]/60 uppercase block">EXTRACTION BASE:</span>
                      <span className="font-bold text-[#F4E8D1]">{selectedRoastBase.split(' ')[0]}</span>
                    </div>

                    <div className="col-span-2">
                      <span className="text-[#EEDCC6]/60 uppercase block">FLAVOR LAYERS:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {selectedFlavors.map((f, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/20 text-[10px] text-[#F4E8D1]"
                          >
                            {f.name} ({f.intensity})
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[#EEDCC6]/60 uppercase block">MILK / SWEETNESS:</span>
                      <span className="font-bold text-[#F4E8D1]">
                        {selectedMilk.split(' ')[0]} • {selectedSweetness.split(' ')[0]}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#EEDCC6]/60 uppercase block">TOTAL CHARGE:</span>
                      <span className="font-bold text-base text-[#EEDCC6]">
                        ${computedTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Action CTAs */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleOrderCustomCoffee}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#EEDCC6] to-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-coffee-glow hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ORDER MY COFFEE • ${computedTotal.toFixed(2)}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="py-3 rounded-full bg-[#3C2A21] hover:bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30 font-mono text-xs font-bold uppercase transition-all flex items-center justify-center space-x-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>CREATE ANOTHER</span>
                    </button>

                    <button
                      onClick={() => alert(`Recipe "${blendTitle}" recipe card generated and ready for print.`)}
                      className="py-3 rounded-full bg-[#3C2A21] hover:bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30 font-mono text-xs font-bold uppercase transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>DOWNLOAD RECIPE</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: REALISTIC 3D / CANVAS LIVE BOTTLE PREVIEW */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full p-8 rounded-[36px] bg-gradient-to-b from-[#3C2A21] to-[#2A1B16] border border-[#EEDCC6]/25 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
              {/* Telemetry Badge Top */}
              <div className="w-full flex items-center justify-between pb-4 border-b border-[#EEDCC6]/15 text-xs font-mono text-[#EEDCC6]">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold uppercase">LIVE LAB SIMULATION</span>
                </div>
                <span>{selectedCondition === 'COOL' ? '04°C' : '68°C'}</span>
              </div>

              {/* Central Large Realistic Animated Bottle */}
              <div className="my-8 relative flex flex-col items-center">
                {/* Steam or Ice Float */}
                {selectedCondition === 'HOT' ? (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex space-x-1 pointer-events-none">
                    <Flame className="w-5 h-5 text-[#EEDCC6] animate-pulse" />
                    <Flame className="w-4 h-4 text-[#EEDCC6] animate-bounce" />
                  </div>
                ) : (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex space-x-1 pointer-events-none">
                    <Snowflake className="w-5 h-5 text-[#EEDCC6] animate-spin-slow" />
                    <Snowflake className="w-4 h-4 text-[#EEDCC6] animate-pulse" />
                  </div>
                )}

                {/* Physical Vessel Container */}
                <div className="relative w-44 h-84 rounded-[36px] border-4 border-[#EEDCC6]/40 bg-[#2A1B16] shadow-espresso-dark overflow-hidden flex flex-col justify-end p-2 backdrop-blur-md">
                  {/* Spout */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#3C2A21] rounded-b-xl border-b border-[#EEDCC6]/30 flex items-center justify-center z-30">
                    <div className="w-8 h-1 bg-[#EEDCC6]/40 rounded-full" />
                  </div>

                  {/* Glass Reflection */}
                  <div className="absolute top-4 left-3 w-3 h-60 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-full z-20 pointer-events-none" />

                  {/* Multi-layered Coffee Liquid */}
                  <div className="w-full h-4/5 rounded-[28px] bg-gradient-to-t from-[#2A1B16] via-[#3C2A21] to-[#604233] relative overflow-hidden flex flex-col items-center justify-center p-2">
                    {/* Dynamic Flavor Color Layers */}
                    {selectedFlavors.map((flv, idx) => (
                      <div
                        key={idx}
                        className="absolute inset-x-0 h-4 opacity-50 blur-sm pointer-events-none"
                        style={{
                          top: `${20 + idx * 18}%`,
                          backgroundColor: flv.colorHex || '#EEDCC6',
                        }}
                      />
                    ))}

                    {/* Laser Etched Custom Blend Name Plate */}
                    <div className="p-2.5 rounded-2xl bg-[#2A1B16]/90 border border-[#EEDCC6]/40 shadow-md max-w-[120px] z-20">
                      <TripleWaveEmblem size={32} />
                      <div className="text-[8px] font-mono text-[#EEDCC6] uppercase truncate mt-1">
                        {blendTitle || 'HOT COOL SHAKE'}
                      </div>
                      <div className="text-[7px] font-mono text-[#F4E8D1] opacity-75">
                        {creatorName}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floor Shadow */}
                <div className="w-40 h-4 bg-black/60 rounded-full blur-md mt-4" />
              </div>

              {/* Real-time Alchemy Summary */}
              <div className="w-full space-y-2 pt-2 border-t border-[#EEDCC6]/15 text-left">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#EEDCC6]/70">Selected Vessel:</span>
                  <span className="font-bold text-[#F4E8D1]">{selectedBottle?.name || 'Signature'}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#EEDCC6]/70">Flavor Layers:</span>
                  <span className="font-bold text-[#EEDCC6]">{selectedFlavors.length} Essences</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#EEDCC6]/70">Temperature Mode:</span>
                  <span className="font-bold text-[#F4E8D1]">
                    {selectedCondition} ({selectedCondition === 'COOL' ? '04°C' : '68°C'})
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-display font-bold text-[#F4E8D1] pt-2 border-t border-[#EEDCC6]/10">
                  <span>ESTIMATED CHARGE:</span>
                  <span className="text-base text-[#EEDCC6] font-mono">${computedTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeYourCoffee;
