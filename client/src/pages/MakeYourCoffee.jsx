import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { usePageLoader } from '../context/LoadingContext';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import {
  Sparkles,
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
  MapPin,
  RefreshCw,
  Download,
  Droplet,
  Layers,
  Zap,
} from 'lucide-react';

export const MakeYourCoffee = () => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { startPageTransition } = usePageLoader();

  // Wizard Steps:
  // 1: Choose Your Bottle (Classic Glass, Premium Black, Frost Bottle, Signature Bronze, Travel Bottle)
  // 2: Choose Flavour Universe (Espresso, Latte, Mocha, Caramel, Vanilla, Hazelnut, Chocolate, Coconut, Almond, Pistachio, Mint, Special Edition)
  // 3: Choose Temperature (HOT 68°C vs COOL 04°C)
  // 4: Live Interactive Preparation Simulation (5-stage Hot/Cool timeline with timers)
  // 5: Store Location & Delivery Hub (configured STORE_LOCATION)
  // 6: Coffee Creation Summary ("YOUR CREATION" with Add to Order & Create Another)
  const [currentStep, setCurrentStep] = useState(1);

  // Backend Catalog Data
  const [bottles, setBottles] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [activeFlavorCategory, setActiveFlavorCategory] = useState('ALL');
  const [loadingCatalog, setLoadingCatalog] = useState(true);

  // User Selections
  const [selectedBottle, setSelectedBottle] = useState(null);
  const [selectedCoffeeBase, setSelectedCoffeeBase] = useState('Signature Italian Espresso Base');
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedTemperature, setSelectedTemperature] = useState('HOT'); // 'HOT' | 'COOL'
  const [selectedMilk, setSelectedMilk] = useState('Velvet Silk Oat Milk');
  const [selectedSweetness, setSelectedSweetness] = useState('50% Pure Maple');
  const [selectedAddons, setSelectedAddons] = useState(['Velvet Crema Float']);
  const [creatorName, setCreatorName] = useState(user?.name || 'Master Alchemist');
  const [creationTitle, setCreationTitle] = useState('Obsidian Velvet Infusion');

  // Interactive Layer Animation (Coffee -> Milk -> Syrup -> Flavour -> Foam)
  const [activeIngredientLayer, setActiveIngredientLayer] = useState(1);

  // Preparation Simulation (Step 4)
  const [simStage, setSimStage] = useState(1); // 1 to 5
  const [simProgress, setSimProgress] = useState(0);
  const [simTemp, setSimTemp] = useState(22);
  const [simMinutes, setSimMinutes] = useState(0);
  const [isSimRunning, setIsSimRunning] = useState(false);

  // Location / Store Delivery (Step 5)
  const [storeLocation, setStoreLocation] = useState({
    hubName: 'Global Flagship Roastery Lab (Central)',
    address: 'One BKC / Marina Bay / Mayfair Flagship',
    city: 'Flagship Roastery',
    hours: '06:00 AM - 12:00 AM Daily',
    pickupStatus: 'Ready in 10-15 mins after preparation',
  });
  const [customerAddress, setCustomerAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.defaultAddress?.street || '',
    city: user?.defaultAddress?.city || 'London',
    postalCode: user?.defaultAddress?.postalCode || 'W1K 7AA',
  });

  // Saved Order State
  const [savedCustomCoffee, setSavedCustomCoffee] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load Bottles and Flavours from API
  useEffect(() => {
    const fetchLabData = async () => {
      try {
        const [bottlesRes, flavorsRes, locationsRes] = await Promise.all([
          api.getBottles(),
          api.getFlavors(),
          api.getLocations(),
        ]);

        if (bottlesRes.success && bottlesRes.bottles.length > 0) {
          setBottles(bottlesRes.bottles);
          setSelectedBottle(bottlesRes.bottles[1] || bottlesRes.bottles[0]);
        } else {
          // Fallback default bottles
          setBottles([
            {
              name: 'Classic Glass Lab',
              capacity: '450ml',
              material: 'Hand-blown Borosilicate Glass',
              thermalRetention: 'Hot 6h / Cold 12h',
              price: 7.50,
              badge: 'Timeless',
              image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
            },
            {
              name: 'Premium Black Flask',
              capacity: '500ml',
              material: 'Matte Obsidian Triple-Layer Steel',
              thermalRetention: 'Hot 12h / Cold 24h',
              price: 9.50,
              badge: 'Signature',
              image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop',
            },
            {
              name: 'Frost Hydro Bottle',
              capacity: '600ml',
              material: 'Copper Core Double Wall',
              thermalRetention: 'Cold 32h / Ice-Lock',
              price: 11.00,
              badge: 'Sub-Zero Cryo',
              image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop',
            },
            {
              name: 'Signature Bronze Vessel',
              capacity: '550ml',
              material: 'Titanium-Alloy with Warm Bronze Finish',
              thermalRetention: 'Hot 18h / Cold 36h',
              price: 13.50,
              badge: 'Masterpiece',
              image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop',
            },
            {
              name: 'Travel Active Tumbler',
              capacity: '750ml',
              material: 'Impact Resilient Polymer & Steel',
              thermalRetention: 'Hot 10h / Cold 20h',
              price: 10.00,
              badge: 'Endurance',
              image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
            },
          ]);
          setSelectedBottle({
            name: 'Premium Black Flask',
            capacity: '500ml',
            material: 'Matte Obsidian Triple-Layer Steel',
            price: 9.50,
            image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop',
          });
        }

        if (flavorsRes.success && flavorsRes.flavors.length > 0) {
          setFlavors(flavorsRes.flavors);
          setSelectedFlavors([
            { name: 'Madagascar Vanilla Bean', category: 'VANILLA', intensity: 'STRONG', colorHex: '#F7FAF9' },
            { name: 'Smoked Sea Salt Caramel', category: 'CARAMEL', intensity: 'MEDIUM', colorHex: '#D6A06A' },
          ]);
        }

        if (locationsRes.success && locationsRes.locations.length > 0) {
          const firstLoc = locationsRes.locations[0];
          setStoreLocation({
            hubName: firstLoc.name,
            address: firstLoc.address,
            city: firstLoc.city,
            hours: firstLoc.openingHours,
            pickupStatus: 'Active Automated Chamber Ready',
          });
        }
      } catch (err) {
        console.warn('Lab data fetch fallback handled:', err);
      } finally {
        setLoadingCatalog(false);
      }
    };

    fetchLabData();
  }, []);

  // Compute live price
  const basePrice = selectedBottle?.price || 9.50;
  const flavorPrice = selectedFlavors.length * 1.25;
  const addonsPrice = selectedAddons.length * 0.75;
  const computedTotal = Number((basePrice + flavorPrice + addonsPrice).toFixed(2));

  // Flavor categories according to prompt:
  // ESPRESSO, LATTE, MOCHA, CARAMEL, VANILLA, HAZELNUT, CHOCOLATE, COCONUT, ALMOND, PISTACHIO, MINT, SPECIAL EDITION
  const flavorCategories = [
    'ALL',
    'ESPRESSO',
    'LATTE',
    'MOCHA',
    'CARAMEL',
    'VANILLA',
    'HAZELNUT',
    'CHOCOLATE',
    'COCONUT',
    'ALMOND',
    'PISTACHIO',
    'MINT',
    'SPECIAL EDITION',
  ];

  const filteredFlavors = activeFlavorCategory === 'ALL'
    ? flavors
    : flavors.filter((f) => f.category?.toUpperCase() === activeFlavorCategory || f.name.toUpperCase().includes(activeFlavorCategory));

  const toggleFlavor = (flv) => {
    const exists = selectedFlavors.find((f) => f.name === flv.name);
    if (exists) {
      setSelectedFlavors(selectedFlavors.filter((f) => f.name !== flv.name));
    } else {
      if (selectedFlavors.length >= 4) return;
      setSelectedFlavors([
        ...selectedFlavors,
        {
          name: flv.name,
          category: flv.category || 'SPECIAL EDITION',
          intensity: 'MEDIUM',
          colorHex: flv.colorHex || '#B8783E',
        },
      ]);
      // Trigger layer animation step
      setActiveIngredientLayer((prev) => (prev % 5) + 1);
    }
  };

  const updateFlavorIntensity = (flavorName, intensity) => {
    setSelectedFlavors(
      selectedFlavors.map((f) => (f.name === flavorName ? { ...f, intensity } : f))
    );
  };

  // Run Chamber Simulation (Step 4)
  const runChamberSimulation = () => {
    setIsSimRunning(true);
    setSimStage(1);
    setSimProgress(0);
    const targetTemp = selectedTemperature === 'COOL' ? 4 : 68;
    const startTemp = 22;

    let p = 0;
    const interval = setInterval(() => {
      p += 2.5;
      setSimProgress(Math.min(p, 100));

      const currentT = Math.round(startTemp + ((targetTemp - startTemp) * p) / 100);
      setSimTemp(currentT);

      const maxMins = selectedTemperature === 'COOL' ? 18 : 10;
      setSimMinutes(Math.round((maxMins * p) / 100));

      if (p >= 80) setSimStage(5); // Ready
      else if (p >= 60) setSimStage(4); // Final Blend / Cooling
      else if (p >= 40) setSimStage(3); // Heating / Chilling
      else if (p >= 20) setSimStage(2); // Ingredients Prepared / Blended
      else setSimStage(1); // Order received

      if (p >= 100) {
        clearInterval(interval);
        setIsSimRunning(false);
      }
    }, 60);
  };

  // Finalize Creation (Step 5 -> 6)
  const handleFinalize = async () => {
    setIsSaving(true);
    try {
      const payload = {
        creatorName,
        customBlendTitle: creationTitle || 'Bespoke Laboratory Creation',
        bottle: {
          bottleId: selectedBottle?._id,
          name: selectedBottle?.name || 'Signature Thermal Vessel',
          capacity: selectedBottle?.capacity || '500ml',
          price: selectedBottle?.price || 9.50,
          image: selectedBottle?.image,
        },
        coffeeBase: selectedCoffeeBase,
        flavors: selectedFlavors,
        temperature: selectedTemperature === 'COOL' ? '04°C' : '68°C',
        condition: selectedTemperature,
        milkBase: selectedMilk,
        sweetnessLevel: selectedSweetness,
        addons: selectedAddons,
        calculatedPrice: computedTotal,
        estimatedPrepTime: selectedTemperature === 'HOT' ? '10 mins' : '18 mins',
      };

      const res = await api.createCustomCoffee(payload);
      if (res.success) {
        setSavedCustomCoffee(res.customCoffee);
      }
    } catch (e) {
      console.warn('Custom coffee persistence handled locally:', e);
      setSavedCustomCoffee({
        creatorName,
        customBlendTitle: creationTitle,
        bottle: selectedBottle,
        temperature: selectedTemperature === 'COOL' ? '04°C' : '68°C',
        condition: selectedTemperature,
        flavors: selectedFlavors,
        calculatedPrice: computedTotal,
        estimatedPrepTime: selectedTemperature === 'HOT' ? '10 mins' : '18 mins',
      });
    } finally {
      setIsSaving(false);
      setCurrentStep(6);
    }
  };

  // Add customized coffee to cart
  const handleAddToCart = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    addToCart(
      {
        _id: savedCustomCoffee?._id || `custom-${Date.now()}`,
        name: creationTitle || 'HOT COOL SHAKE Custom Creation',
        customBlendTitle: creationTitle,
        price: computedTotal,
        image: selectedBottle?.image || 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop',
        temperature: selectedTemperature,
        bottle: selectedBottle,
        flavors: selectedFlavors,
        milkBase: selectedMilk,
        sweetnessLevel: selectedSweetness,
      },
      1,
      {
        bottle: selectedBottle?.name,
        flavors: selectedFlavors.map((f) => `${f.name} (${f.intensity})`),
        temperature: `${selectedTemperature} (${selectedTemperature === 'COOL' ? '04°C' : '68°C'})`,
        milk: selectedMilk,
        sweetness: selectedSweetness,
      },
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    );
  };

  const stepsList = [
    { num: 1, title: 'BOTTLE' },
    { num: 2, title: 'FLAVOUR' },
    { num: 3, title: 'TEMPERATURE' },
    { num: 4, title: 'PREPARATION' },
    { num: 5, title: 'LOCATION' },
    { num: 6, title: 'YOUR CREATION' },
  ];

  // Preparation Stage Titles (Hot vs Cool)
  const hotStages = [
    'STAGE 01: ORDER RECEIVED',
    'STAGE 02: INGREDIENTS PREPARED',
    'STAGE 03: COFFEE HEATING (10 MINS)',
    'STAGE 04: FINAL BLEND',
    'STAGE 05: YOUR HOT COFFEE IS READY',
  ];

  const coolStages = [
    'STAGE 01: ORDER RECEIVED',
    'STAGE 02: COFFEE BLENDED',
    'STAGE 03: CHILLING (15-20 MINS)',
    'STAGE 04: FINAL COOLING',
    'STAGE 05: YOUR COOL COFFEE IS READY',
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#071A2B] text-[#F7FAF9] relative overflow-hidden">
      {/* Ambient background atmosphere */}
      <div className="absolute inset-0 bg-radial-navy opacity-90 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#67D9D0_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Lab Top Header & Progress Stepper */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0B2538] border border-[#B8783E]/30 text-xs font-mono font-bold tracking-widest text-[#D6A06A] uppercase">
            <Sparkles className="w-4 h-4 text-[#67D9D0]" />
            <span>SIGNATURE INTERACTIVE EXPERIENCE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-[#F7FAF9] uppercase">
            MAKE YOUR <span className="text-brand-gradient">COFFEE</span>
          </h1>
          <p className="text-sm font-mono text-[#D6A06A] font-bold">
            "Don't just order coffee. Create your own."
          </p>

          {/* Stepper Bar */}
          <div className="pt-6">
            <div className="flex items-center justify-between max-w-2xl mx-auto relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#0B2538] -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-brand-gradient -translate-y-1/2 z-0 transition-all duration-500"
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
                          ? 'bg-brand-gradient text-[#071A2B]'
                          : isCurrent
                          ? 'bg-[#071A2B] text-[#F7FAF9] border-2 border-[#67D9D0] shadow-teal-glow'
                          : 'bg-[#0B2538] text-[#A8B0B4]/60 border border-[#B8783E]/20'
                      }`}
                    >
                      {isPassed ? <Check className="w-4 h-4" /> : s.num}
                    </div>
                    <span
                      className={`text-[9px] font-mono tracking-widest uppercase mt-1.5 font-bold ${
                        isCurrent ? 'text-[#67D9D0]' : 'text-[#A8B0B4]/60'
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

        {/* Main Lab Workspace Layout (Dual Pane) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: STEP WIZARD FORM */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 bg-[#0B2538]/75 backdrop-blur-md rounded-[36px] p-6 sm:p-8 border-2 border-[#B8783E]/30 shadow-2xl space-y-6">
            {/* STEP 1: CHOOSE YOUR BOTTLE */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#D6A06A] uppercase block">
                    STEP 01
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F7FAF9] uppercase">
                    CHOOSE YOUR BOTTLE
                  </h2>
                  <p className="text-xs text-[#A8B0B4] font-sans mt-1">
                    Select your realistic ergonomic vessel. Double-wall thermal retention engineered for pure hot and cool stability.
                  </p>
                </div>

                <div className="space-y-3">
                  {bottles.map((bottle) => {
                    const isSelected = selectedBottle?.name === bottle.name;
                    return (
                      <div
                        key={bottle.name}
                        onClick={() => setSelectedBottle(bottle)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#071A2B] border-[#67D9D0] shadow-teal-glow'
                            : 'bg-[#071A2B]/60 border-[#B8783E]/20 hover:border-[#67D9D0]/40'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#0B2538] border border-white/10 flex-shrink-0">
                            <img
                              src={bottle.image}
                              alt={bottle.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-display font-bold text-sm sm:text-base text-[#F7FAF9]">
                                {bottle.name}
                              </h3>
                              {bottle.badge && (
                                <span className="px-2 py-0.5 rounded-full bg-brand-gradient text-[#071A2B] text-[9px] font-mono font-black uppercase">
                                  {bottle.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-mono text-[#D6A06A]">
                              {bottle.capacity} • {bottle.thermalRetention}
                            </div>
                            <p className="text-[11px] text-[#A8B0B4] font-sans line-clamp-1">
                              {bottle.material}
                            </p>
                          </div>
                        </div>

                        <div className="text-right pl-3">
                          <span className="font-mono font-black text-base text-[#F7FAF9] block">
                            ${bottle.price?.toFixed(2)}
                          </span>
                          <span className={`text-[10px] font-mono uppercase ${isSelected ? 'text-[#67D9D0] font-bold' : 'text-[#A8B0B4]/60'}`}>
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
                    className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all"
                  >
                    <span>NEXT: CHOOSE FLAVOUR</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: CHOOSE YOUR COFFEE FLAVOUR */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#D6A06A] uppercase block">
                    STEP 02
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F7FAF9] uppercase">
                    CHOOSE YOUR COFFEE FLAVOUR
                  </h2>
                  <p className="text-xs text-[#A8B0B4] font-sans mt-1">
                    Explore our flavour universe. Adding flavours layers botanical essences, milk, and syrups into your vessel in real-time.
                  </p>
                </div>

                {/* Primary Roast Base */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold tracking-wider text-[#D6A06A] uppercase block">
                    PRIMARY ESPRESSO BASE
                  </label>
                  <select
                    value={selectedCoffeeBase}
                    onChange={(e) => setSelectedCoffeeBase(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#071A2B] border border-[#B8783E]/30 text-xs font-mono text-[#F7FAF9] focus:outline-none focus:border-[#67D9D0]"
                  >
                    <option value="Signature Italian Espresso Base">Signature Italian Dark Roast (11 Bars Pressure)</option>
                    <option value="Sub-Zero Cold Brew Concentrate">Sub-Zero Kyoto Cryo Concentrate</option>
                    <option value="Single-Origin Ethiopian Blonde">Ethiopian Yirgacheffe Blonde Extract</option>
                    <option value="Nitro Velvet Crema Base">Nitro Micro-Aerated Velvet Base</option>
                  </select>
                </div>

                {/* Flavour Categories Filter */}
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 no-scrollbar">
                  {flavorCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveFlavorCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-bold whitespace-nowrap uppercase transition-all ${
                        activeFlavorCategory === cat
                          ? 'bg-brand-gradient text-[#071A2B]'
                          : 'bg-[#071A2B] text-[#A8B0B4] hover:text-[#F7FAF9] border border-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Flavour Cards Grid */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#67D9D0] font-bold uppercase">
                      FLAVOUR ESSENCES ({selectedFlavors.length}/4 SELECTED)
                    </span>
                    <span className="text-[#A8B0B4]">+ $1.25 per flavour</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
                    {filteredFlavors.map((flv) => {
                      const isChosen = selectedFlavors.some((f) => f.name === flv.name);
                      return (
                        <button
                          key={flv.name}
                          type="button"
                          onClick={() => toggleFlavor(flv)}
                          className={`p-3 rounded-2xl border text-left text-xs font-mono transition-all flex flex-col justify-between ${
                            isChosen
                              ? 'bg-[#071A2B] border-[#67D9D0] text-[#F7FAF9] shadow-teal-glow'
                              : 'bg-[#071A2B]/60 border-[#B8783E]/20 text-[#A8B0B4] hover:border-[#67D9D0]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <span className="font-bold truncate">{flv.name.split(' ')[0]}</span>
                            {isChosen && <Check className="w-3.5 h-3.5 text-[#67D9D0]" />}
                          </div>
                          <span className="text-[9px] text-[#D6A06A] truncate">
                            {flv.category || 'SPECIALTY'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Intensity Calibration */}
                {selectedFlavors.length > 0 && (
                  <div className="space-y-3 p-4 rounded-2xl bg-[#071A2B] border border-[#B8783E]/25">
                    <span className="text-[11px] font-mono font-bold tracking-widest text-[#D6A06A] uppercase block">
                      INTENSITY CALIBRATION
                    </span>
                    <div className="space-y-2.5">
                      {selectedFlavors.map((f) => (
                        <div key={f.name} className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#F7FAF9] font-bold truncate max-w-[140px]">
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
                                    ? 'bg-[#67D9D0] text-[#071A2B]'
                                    : 'bg-[#0B2538] text-[#A8B0B4] hover:text-[#F7FAF9]'
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
                    className="inline-flex items-center space-x-2 text-xs font-mono text-[#A8B0B4] hover:text-[#F7FAF9]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>

                  <button
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all"
                  >
                    <span>NEXT: CHOOSE TEMPERATURE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: CHOOSE TEMPERATURE */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#D6A06A] uppercase block">
                    STEP 03
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F7FAF9] uppercase">
                    CHOOSE TEMPERATURE
                  </h2>
                  <p className="text-xs text-[#A8B0B4] font-sans mt-1">
                    Select your thermal state. HOT initiates thermal extraction (68°C); COOL initiates cryogenic flash chilling (04°C).
                  </p>
                </div>

                {/* HOT vs COOL Choice Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* HOT */}
                  <div
                    onClick={() => setSelectedTemperature('HOT')}
                    className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                      selectedTemperature === 'HOT'
                        ? 'bg-[#071A2B] border-[#B8783E] shadow-bronze-glow'
                        : 'bg-[#071A2B]/60 border-[#B8783E]/20 hover:border-[#B8783E]/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-2xl bg-[#0B2538] text-[#B8783E] border border-[#B8783E]/40">
                          <Flame className="w-6 h-6 animate-pulse" />
                        </div>
                        <span className="font-mono text-xl font-black text-[#D6A06A]">
                          68°C
                        </span>
                      </div>

                      <h3 className="text-2xl font-display font-black text-[#F7FAF9] uppercase">
                        HOT
                      </h3>
                      <p className="text-xs text-[#A8B0B4] font-sans mt-2 leading-relaxed">
                        Thermal steam bloom, rich extracted crema, heated to calibrated drinking temperature. (10 min simulation)
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#B8783E]/20 text-[10px] font-mono text-[#D6A06A]">
                      {selectedTemperature === 'HOT' ? '✓ SELECTED THERMAL STATE' : 'SELECT HOT'}
                    </div>
                  </div>

                  {/* COOL */}
                  <div
                    onClick={() => setSelectedTemperature('COOL')}
                    className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                      selectedTemperature === 'COOL'
                        ? 'bg-[#071A2B] border-[#67D9D0] shadow-teal-glow'
                        : 'bg-[#071A2B]/60 border-[#67D9D0]/20 hover:border-[#67D9D0]/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-2xl bg-[#0B2538] text-[#67D9D0] border border-[#67D9D0]/40">
                          <Snowflake className="w-6 h-6 animate-pulse" />
                        </div>
                        <span className="font-mono text-xl font-black text-[#67D9D0]">
                          04°C
                        </span>
                      </div>

                      <h3 className="text-2xl font-display font-black text-[#F7FAF9] uppercase">
                        COOL
                      </h3>
                      <p className="text-xs text-[#A8B0B4] font-sans mt-2 leading-relaxed">
                        Cryogenic sub-zero refrigeration, zero ice dilution, locked under nitrogen pressure. (15-20 min simulation)
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#67D9D0]/20 text-[10px] font-mono text-[#67D9D0]">
                      {selectedTemperature === 'COOL' ? '✓ SELECTED CRYO STATE' : 'SELECT COOL'}
                    </div>
                  </div>
                </div>

                {/* Milk & Sweetness */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div>
                    <label className="text-[11px] font-mono text-[#D6A06A] uppercase block mb-1">
                      Artisan Milk Base
                    </label>
                    <select
                      value={selectedMilk}
                      onChange={(e) => setSelectedMilk(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs font-mono text-[#F7FAF9] focus:outline-none"
                    >
                      <option>Velvet Silk Oat Milk</option>
                      <option>California Almond Cream</option>
                      <option>Whole Organic Dairy</option>
                      <option>Cold-Pressed Coconut Milk</option>
                      <option>Pure Black Extract (No Milk)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#D6A06A] uppercase block mb-1">
                      Sweetness Calibration
                    </label>
                    <select
                      value={selectedSweetness}
                      onChange={(e) => setSelectedSweetness(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs font-mono text-[#F7FAF9] focus:outline-none"
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
                    className="inline-flex items-center space-x-2 text-xs font-mono text-[#A8B0B4] hover:text-[#F7FAF9]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentStep(4);
                      runChamberSimulation();
                    }}
                    className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all"
                  >
                    <span>START PREPARATION SIMULATION</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: LIVE PREPARATION SIMULATION */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-4"
              >
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#D6A06A] uppercase block">
                    STEP 04 • {selectedTemperature === 'HOT' ? 'HOT PREPARATION EXPERIENCE' : 'COOL PREPARATION EXPERIENCE'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F7FAF9] uppercase mt-1">
                    {selectedTemperature === 'HOT' ? 'HEATING YOUR BESPOKE CUP' : 'CHILLING YOUR BESPOKE CUP'}
                  </h2>
                  <p className="text-xs text-[#A8B0B4] font-sans mt-1">
                    Connected to laboratory telemetry. Representing {selectedTemperature === 'HOT' ? '10 minutes precision heating' : '15-20 minutes cryogenic chilling'}.
                  </p>
                </div>

                {/* Live Simulation Timeline Box */}
                <div className="p-8 rounded-3xl bg-[#071A2B] border-2 border-[#B8783E]/40 shadow-2xl space-y-6">
                  {/* Gauge Display */}
                  <div className="flex justify-center items-center space-x-8">
                    <div className="flex flex-col items-center">
                      <Thermometer className="w-6 h-6 text-[#67D9D0] animate-bounce" />
                      <span className="font-display font-black text-3xl sm:text-4xl text-[#F7FAF9] mt-1">
                        {String(simTemp).padStart(2, '0')}°C
                      </span>
                      <span className="text-[10px] font-mono text-[#D6A06A] uppercase font-bold tracking-wider">
                        {selectedTemperature === 'HOT' ? 'INDUCTION HEAT 68°C' : 'CRYOGENIC 04°C'}
                      </span>
                    </div>

                    <div className="h-12 w-px bg-white/10" />

                    <div className="flex flex-col items-center">
                      <Clock className="w-6 h-6 text-[#D6A06A] animate-spin-slow" />
                      <span className="font-display font-black text-3xl sm:text-4xl text-[#F7FAF9] mt-1">
                        00:{String(simMinutes).padStart(2, '0')}:00
                      </span>
                      <span className="text-[10px] font-mono text-[#A8B0B4] uppercase">
                        {selectedTemperature === 'HOT' ? '10 MIN SIMULATION' : '15-20 MIN SIMULATION'}
                      </span>
                    </div>
                  </div>

                  {/* 5-Stage Live Progress */}
                  <div className="space-y-3 text-left">
                    {(selectedTemperature === 'HOT' ? hotStages : coolStages).map((stName, sIdx) => {
                      const stageNum = sIdx + 1;
                      const isDone = simStage >= stageNum;
                      const isCurrent = simStage === stageNum;
                      return (
                        <div
                          key={sIdx}
                          className={`p-3 rounded-xl border transition-all text-xs font-mono flex items-center justify-between ${
                            isCurrent
                              ? 'bg-[#0B2538] border-[#67D9D0] text-[#67D9D0] shadow-teal-glow'
                              : isDone
                              ? 'bg-[#0B2538]/50 border-[#B8783E]/40 text-[#D6A06A]'
                              : 'bg-[#071A2B] border-white/5 text-[#A8B0B4]/40'
                          }`}
                        >
                          <span>{stName}</span>
                          {isDone && <Check className="w-4 h-4" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-[#A8B0B4]">
                      <span>CHAMBER COMPLETION</span>
                      <span className="font-bold text-[#67D9D0]">{Math.floor(simProgress)}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-[#0B2538] rounded-full overflow-hidden border border-[#67D9D0]/30 p-0.5">
                      <motion.div
                        className="h-full bg-brand-gradient rounded-full"
                        style={{ width: `${simProgress}%` }}
                      />
                    </div>
                  </div>

                  {simStage === 5 && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-3.5 rounded-xl bg-[#0B2538] border border-[#67D9D0] text-[#67D9D0] font-mono text-xs flex items-center justify-center space-x-2"
                    >
                      <Check className="w-4 h-4" />
                      <span className="font-bold uppercase tracking-wider">
                        {selectedTemperature === 'HOT' ? 'YOUR HOT COFFEE IS READY' : 'YOUR COOL COFFEE IS READY'}
                      </span>
                    </motion.div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all"
                  >
                    <span>NEXT: STORE & DISPATCH</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: STORE LOCATION & DISPATCH */}
            {currentStep === 5 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#D6A06A] uppercase block">
                    STEP 05
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F7FAF9] uppercase">
                    STORE LOCATION & PICKUP
                  </h2>
                  <p className="text-xs text-[#A8B0B4] font-sans mt-1">
                    Select your nearest configured store location or enter delivery details for zero-emission EV transport.
                  </p>
                </div>

                {/* Configured Store Location Box */}
                <div className="p-5 rounded-2xl bg-[#071A2B] border border-[#B8783E]/30 space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#67D9D0] font-bold">
                    <MapPin className="w-4 h-4" />
                    <span>CONFIGURED STORE LOCATION:</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#F7FAF9]">
                    {storeLocation.hubName}
                  </h3>
                  <p className="text-xs text-[#A8B0B4]">
                    {storeLocation.address}, {storeLocation.city}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-2 border-t border-white/10 text-[#D6A06A]">
                    <span>HOURS: {storeLocation.hours}</span>
                    <span className="text-right text-[#67D9D0]">STATUS: {storeLocation.pickupStatus}</span>
                  </div>
                </div>

                {/* Delivery Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[11px] font-mono text-[#A8B0B4] uppercase block mb-1">
                      Recipient Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] focus:outline-none focus:border-[#67D9D0]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#A8B0B4] uppercase block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerAddress.phone}
                      onChange={(e) => setCustomerAddress({ ...customerAddress, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] focus:outline-none focus:border-[#67D9D0]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-mono text-[#A8B0B4] uppercase block mb-1">
                      Delivery Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerAddress.address}
                      onChange={(e) => setCustomerAddress({ ...customerAddress, address: e.target.value })}
                      placeholder="450 Innovation Way, Suite 100"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] focus:outline-none focus:border-[#67D9D0]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#A8B0B4] uppercase block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerAddress.city}
                      onChange={(e) => setCustomerAddress({ ...customerAddress, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] focus:outline-none focus:border-[#67D9D0]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#A8B0B4] uppercase block mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerAddress.postalCode}
                      onChange={(e) => setCustomerAddress({ ...customerAddress, postalCode: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] focus:outline-none focus:border-[#67D9D0]"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="inline-flex items-center space-x-2 text-xs font-mono text-[#A8B0B4] hover:text-[#F7FAF9]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>BACK</span>
                  </button>

                  <button
                    onClick={handleFinalize}
                    disabled={isSaving}
                    className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    <span>{isSaving ? 'ENCRYPTING CREATION...' : 'FINALIZE & SUMMARY'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 6: COFFEE CREATION SUMMARY */}
            {currentStep === 6 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#D6A06A] uppercase block">
                    STEP 06 • SUMMARY
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F7FAF9] uppercase mt-1">
                    YOUR CREATION
                  </h2>
                  <p className="text-xs text-[#67D9D0] font-mono uppercase tracking-wider">
                    HOT COOL SHAKE BESPOKE RECIPE #{(Math.random() * 10000).toFixed(0).padStart(5, '0')}
                  </p>
                </div>

                {/* Summary Matrix Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#071A2B] border-2 border-[#B8783E]/40 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <h3 className="font-display font-black text-xl sm:text-2xl text-[#F7FAF9]">
                        "{creationTitle}"
                      </h3>
                      <span className="text-xs font-mono text-[#D6A06A]">
                        Formulated by: {creatorName}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-[#0B2538] border border-[#67D9D0]/50 text-[#67D9D0] text-xs font-mono font-bold uppercase">
                      STATUS: READY
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-[#A8B0B4] uppercase block">BOTTLE:</span>
                      <span className="font-bold text-[#F7FAF9]">{selectedBottle?.name} ({selectedBottle?.capacity})</span>
                    </div>

                    <div>
                      <span className="text-[#A8B0B4] uppercase block">COFFEE BASE:</span>
                      <span className="font-bold text-[#F7FAF9]">{selectedCoffeeBase.split(' ')[0]}</span>
                    </div>

                    <div>
                      <span className="text-[#A8B0B4] uppercase block">TEMPERATURE:</span>
                      <span className="font-bold text-[#67D9D0]">
                        {selectedTemperature} ({selectedTemperature === 'COOL' ? '04°C' : '68°C'})
                      </span>
                    </div>

                    <div>
                      <span className="text-[#A8B0B4] uppercase block">ESTIMATED PREP TIME:</span>
                      <span className="font-bold text-[#D6A06A]">
                        {selectedTemperature === 'HOT' ? '10 mins' : '18 mins'}
                      </span>
                    </div>

                    <div className="col-span-2">
                      <span className="text-[#A8B0B4] uppercase block">FLAVOURS:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {selectedFlavors.map((f, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-full bg-[#0B2538] border border-[#B8783E]/30 text-[10px] text-[#F7FAF9]"
                          >
                            {f.name} ({f.intensity})
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[#A8B0B4] uppercase block">MILK / SWEETNESS:</span>
                      <span className="font-bold text-[#F7FAF9]">
                        {selectedMilk.split(' ')[0]} • {selectedSweetness.split(' ')[0]}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#A8B0B4] uppercase block">PRICE:</span>
                      <span className="font-black text-lg text-[#67D9D0]">
                        ${computedTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Summary Action CTAs */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO ORDER • ${computedTotal.toFixed(2)}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="py-3 rounded-full bg-[#071A2B] hover:bg-[#0B2538] text-[#D6A06A] border border-[#B8783E]/30 font-mono text-xs font-bold uppercase transition-all flex items-center justify-center space-x-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>CREATE ANOTHER</span>
                    </button>

                    <button
                      onClick={() => alert(`Recipe card for "${creationTitle}" downloaded.`)}
                      className="py-3 rounded-full bg-[#071A2B] hover:bg-[#0B2538] text-[#67D9D0] border border-[#67D9D0]/30 font-mono text-xs font-bold uppercase transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>DOWNLOAD CARD</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: 3D REALISTIC LIVE BOTTLE PREVIEW */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full p-8 rounded-[36px] bg-[#0B2538]/85 border-2 border-[#B8783E]/30 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
              {/* Telemetry Badge Top */}
              <div className="w-full flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-[#D6A06A]">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#67D9D0] animate-ping" />
                  <span className="font-bold uppercase">LIVE LAB SIMULATION</span>
                </div>
                <span className="text-[#67D9D0] font-bold">
                  {selectedTemperature === 'COOL' ? '04°C CRYO' : '68°C THERMAL'}
                </span>
              </div>

              {/* Central Large Realistic Animated Bottle */}
              <div className="my-8 relative flex flex-col items-center">
                {/* Steam or Ice Float */}
                {selectedTemperature === 'HOT' ? (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex space-x-1 pointer-events-none">
                    <Flame className="w-5 h-5 text-[#B8783E] animate-pulse" />
                    <Flame className="w-4 h-4 text-[#D6A06A] animate-bounce" />
                  </div>
                ) : (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex space-x-1 pointer-events-none">
                    <Snowflake className="w-5 h-5 text-[#67D9D0] animate-spin-slow" />
                    <Snowflake className="w-4 h-4 text-[#67D9D0] animate-pulse" />
                  </div>
                )}

                {/* Physical Vessel Container */}
                <div className="relative w-48 h-88 rounded-[40px] border-4 border-[#B8783E]/40 bg-[#071A2B] shadow-2xl overflow-hidden flex flex-col justify-end p-2.5 backdrop-blur-md">
                  {/* Spout */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-18 h-6 bg-[#0B2538] rounded-b-xl border-b border-[#B8783E]/40 flex items-center justify-center z-30">
                    <div className="w-8 h-1 bg-[#67D9D0]/60 rounded-full" />
                  </div>

                  {/* Glass Reflection */}
                  <div className="absolute top-4 left-3 w-3 h-64 bg-gradient-to-b from-white/40 via-white/10 to-transparent rounded-full z-20 pointer-events-none" />

                  {/* Multi-layered Coffee Liquid */}
                  <div
                    className={`w-full h-4/5 rounded-[30px] relative overflow-hidden flex flex-col items-center justify-center p-2 transition-all duration-700 ${
                      selectedTemperature === 'HOT'
                        ? 'bg-gradient-to-t from-[#071A2B] via-[#15191C] to-[#B8783E]/70'
                        : 'bg-gradient-to-t from-[#071A2B] via-[#0B2538] to-[#168C8A]/75'
                    }`}
                  >
                    {/* Crema Top */}
                    <div
                      className={`absolute top-0 inset-x-0 h-3.5 bg-gradient-to-r opacity-90 animate-pulse ${
                        selectedTemperature === 'HOT'
                          ? 'from-[#B8783E] via-[#D6A06A] to-[#B8783E]'
                          : 'from-[#168C8A] via-[#67D9D0] to-[#168C8A]'
                      }`}
                    />

                    {/* Dynamic Flavor Color Layers */}
                    {selectedFlavors.map((flv, idx) => (
                      <div
                        key={idx}
                        className="absolute inset-x-0 h-4 opacity-40 blur-sm pointer-events-none"
                        style={{
                          top: `${20 + idx * 16}%`,
                          backgroundColor: flv.colorHex || '#67D9D0',
                        }}
                      />
                    ))}

                    {/* Laser Etched Custom Blend Name Plate */}
                    <div className="p-2.5 rounded-2xl bg-[#071A2B]/90 border border-[#B8783E]/40 shadow-md max-w-[130px] z-20">
                      <TripleWaveEmblem size={34} />
                      <div className="text-[8px] font-mono text-[#D6A06A] uppercase truncate mt-1">
                        {creationTitle || 'HOT COOL SHAKE'}
                      </div>
                      <div className="text-[7px] font-mono text-[#F7FAF9] opacity-75">
                        {creatorName}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floor Shadow */}
                <div className="w-44 h-4 bg-black/60 rounded-full blur-md mt-4" />
              </div>

              {/* Real-time Alchemy Summary */}
              <div className="w-full space-y-2 pt-2 border-t border-white/10 text-left">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#A8B0B4]">Selected Vessel:</span>
                  <span className="font-bold text-[#F7FAF9]">{selectedBottle?.name || 'Classic Glass'}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#A8B0B4]">Flavour Layers:</span>
                  <span className="font-bold text-[#D6A06A]">{selectedFlavors.length} Essences</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#A8B0B4]">Temperature Mode:</span>
                  <span className="font-bold text-[#67D9D0]">
                    {selectedTemperature} ({selectedTemperature === 'COOL' ? '04°C' : '68°C'})
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-display font-bold text-[#F7FAF9] pt-2 border-t border-white/10">
                  <span>TOTAL ESTIMATE:</span>
                  <span className="text-base text-[#67D9D0] font-mono font-black">${computedTotal.toFixed(2)}</span>
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
