import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import {
  Globe,
  Sparkles,
  Flame,
  Snowflake,
  RotateCw,
  Compass,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Coffee,
  Layers,
  Wind,
} from 'lucide-react';

export const OurCoffee = () => {
  const [activeOrigin, setActiveOrigin] = useState('ETHIOPIA');
  const [activeStep, setActiveStep] = useState(1);

  const origins = [
    {
      id: 'ETHIOPIA',
      country: 'Ethiopia',
      region: 'Yirgacheffe & Guji Highlands',
      altitude: '1,950m – 2,200m',
      variety: 'Heirloom Arabica',
      process: 'Natural & Washed Sun-Dried',
      notes: ['Bergamot', 'Jasmine Flower', 'Wild Blueberry', 'Black Tea'],
      description:
        'The birthplace of coffee. High-elevation ancient forest varieties produce unmatched floral aromatics and bright citrus elegance.',
      coordinates: '6.1629° N, 38.2058° E',
      image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'COLOMBIA',
      country: 'Colombia',
      region: 'Huila & Nariño Volcanic Slopes',
      altitude: '1,700m – 2,050m',
      variety: 'Pink Bourbon, Castillo',
      process: 'Washed Extended Fermentation',
      notes: ['Dulce de Leche', 'Red Apple', 'Milk Chocolate', 'Cane Sugar'],
      description:
        'Volcanic mineral soils provide deeply balanced sweetness, syrupy body, and a vibrant red apple acidity.',
      coordinates: '2.5359° N, 75.5277° W',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'BRAZIL',
      country: 'Brazil',
      region: 'Minas Gerais & Cerrado Mineiro',
      altitude: '1,100m – 1,350m',
      variety: 'Yellow Bourbon, Catuai',
      process: 'Pulped Natural',
      notes: ['Toasted Hazelnut', 'Dark Cocoa', 'Brown Sugar', 'Creamy Praline'],
      description:
        'The cornerstone of our espresso blends. Dense creamy mouthfeel with rich toasted nut and low acid profile.',
      coordinates: '18.5122° S, 44.5550° W',
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'INDIA',
      country: 'India',
      region: 'Chikmagalur & Baba Budan Giri',
      altitude: '1,300m – 1,600m',
      variety: 'Kent, S795 Shade-Grown',
      process: 'Monsooned & Fully Washed',
      notes: ['Green Cardamom', 'Clove', 'Dark Chocolate', 'Malted Toffee'],
      description:
        'Shade-grown under rainforest canopies alongside cardamom and pepper vines, infusing delicate natural spice notes.',
      coordinates: '13.3161° N, 75.7720° E',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'INDONESIA',
      country: 'Indonesia',
      region: 'Sumatra Lake Toba',
      altitude: '1,400m – 1,700m',
      variety: 'Typica, Ateng',
      process: 'Giling Basah (Wet-Hulled)',
      notes: ['Cedar Wood', 'Earthy Dark Cacao', 'Sweet Tobacco', 'Black Truffle'],
      description:
        'Famous wet-hulled processing yielding unparalleled body, low acidity, and deep forest earthy complexity.',
      coordinates: '2.6845° N, 98.8756° E',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'VIETNAM',
      country: 'Vietnam',
      region: 'Da Lat Central Highlands',
      altitude: '1,500m – 1,650m',
      variety: 'Specialty Catimor Arabica',
      process: 'Honey Process',
      notes: ['Roasted Cashew', 'Caramelized Fig', 'Vanilla Pod', 'Spiced Honey'],
      description:
        'High-altitude specialty micro-lots bringing incredible buttery nut aromas and heavy caramel sweetness to cold brews.',
      coordinates: '11.9404° N, 108.4583° E',
      image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const journeySteps = [
    {
      step: 1,
      title: 'Bean Selection',
      subtitle: 'Top 1% Specialty Arabica',
      desc: 'We curate exclusively from single-estate micro-lots scoring 86+ on the international Q-Grader scale.',
    },
    {
      step: 2,
      title: 'Ethical Direct Trade',
      subtitle: 'Living Wages for Farmers',
      desc: '100% direct-trade contracts paying 40% above fair-trade minimums to preserve biodiversity and soil health.',
    },
    {
      step: 3,
      title: 'Precision Roasting',
      subtitle: 'Zero-Emission Convection',
      desc: 'Air-convection fluid bed roasters calibrated to 0.1°C temperature curves to preserve origin terroir.',
    },
    {
      step: 4,
      title: 'Micron Grind Calibration',
      subtitle: 'Laser Particle Analysis',
      desc: 'Industrial titanium flat burrs produce exact unimodal particle distributions for perfect extraction.',
    },
    {
      step: 5,
      title: 'Dual-Mode Extraction',
      subtitle: 'Thermal 9-Bar vs Cryo Kyoto',
      desc: 'High-pressure 93°C Italian extraction for Hot, and 24-hour slow drip Sub-Zero Kyoto extraction for Cool.',
    },
    {
      step: 6,
      title: 'Vortex Micro-Blending',
      subtitle: 'Nitro & Aeration Systems',
      desc: 'High-speed acoustic vortex chambers infuse botanical flavours without altering espresso crema integrity.',
    },
    {
      step: 7,
      title: 'Bespoke Customization',
      subtitle: 'Architected by You',
      desc: 'Real-time calibration of sweetness, plant milks, botanical syrups, and functional infusions.',
    },
    {
      step: 8,
      title: 'Thermal Sealed Service',
      subtitle: 'Zero Dilution Guarantee',
      desc: 'Sealed in double-wall borosilicate or titanium vessels to maintain exact calibrated temperature.',
    },
  ];

  const currentOrigin = origins.find((o) => o.id === activeOrigin) || origins[0];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#EEDCC6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#3C2A21]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase shadow-sm">
            <Globe className="w-3.5 h-3.5 text-[#EEDCC6]" />
            <span>COFFEE WITHOUT BORDERS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            OUR COFFEE <span className="text-[#EEDCC6]">MASTERY</span>
          </h1>

          <p className="text-base sm:text-lg font-sans text-[#EEDCC6]/80 font-normal leading-relaxed">
            From volcanic highland micro-farms to our zero-emission roasting chambers. Discover how precision science meets ethical craft.
          </p>
        </div>

        {/* SECTION 1: GLOBAL ORIGIN EXPLORER */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EEDCC6]/20 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-[#EEDCC6] font-bold block">ORIGIN TERROIR</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F4E8D1] uppercase">
                THE GLOBAL COFFEE BELT
              </h2>
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {origins.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setActiveOrigin(o.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
                    activeOrigin === o.id
                      ? 'bg-[#EEDCC6] text-[#2A1B16] shadow-md'
                      : 'bg-[#3C2A21] text-[#EEDCC6]/70 hover:text-[#F4E8D1] border border-[#EEDCC6]/20'
                  }`}
                >
                  {o.country}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Origin Showcase Card */}
          <div className="bg-[#3C2A21]/70 border border-[#EEDCC6]/30 rounded-[32px] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 relative min-h-[340px] bg-[#2A1B16]">
                <img
                  src={currentOrigin.image}
                  alt={currentOrigin.country}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B16] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#2A1B16]/90 border border-[#EEDCC6]/30 text-[10px] font-mono text-[#EEDCC6] mb-2">
                    <Compass className="w-3 h-3 text-[#EEDCC6]" />
                    <span>GPS: {currentOrigin.coordinates}</span>
                  </div>
                  <h3 className="text-3xl font-display font-black text-[#F4E8D1] uppercase">
                    {currentOrigin.country}
                  </h3>
                  <p className="text-xs text-[#EEDCC6] font-mono">
                    {currentOrigin.region}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-sm font-sans text-[#F4E8D1] leading-relaxed">
                    {currentOrigin.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2 border-t border-[#EEDCC6]/20">
                    <div>
                      <span className="text-[#EEDCC6]/60 uppercase block">ELEVATION</span>
                      <span className="font-bold text-[#F4E8D1]">{currentOrigin.altitude}</span>
                    </div>
                    <div>
                      <span className="text-[#EEDCC6]/60 uppercase block">VARIETY</span>
                      <span className="font-bold text-[#F4E8D1]">{currentOrigin.variety}</span>
                    </div>
                    <div>
                      <span className="text-[#EEDCC6]/60 uppercase block">PROCESSING</span>
                      <span className="font-bold text-[#F4E8D1]">{currentOrigin.process}</span>
                    </div>
                    <div>
                      <span className="text-[#EEDCC6]/60 uppercase block">ROAST PROFILE</span>
                      <span className="font-bold text-[#EEDCC6]">Custom Convection Light-Medium</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-mono uppercase text-[#EEDCC6] font-bold block mb-2">
                      TASTING NOTES MATRIX
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentOrigin.notes.map((note, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EEDCC6]/20 flex justify-between items-center">
                  <Link
                    to="/make-your-coffee"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black uppercase tracking-wider hover:bg-[#F4E8D1] transition-all"
                  >
                    <span>BREW WITH THIS ORIGIN</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[10px] font-mono text-[#EEDCC6]/60 uppercase">
                    100% DIRECT TRADE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: 8-STEP BEAN TO CUP JOURNEY */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase text-[#EEDCC6] font-bold tracking-widest block">
              THE EXTRACTION PIPELINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#F4E8D1] uppercase">
              8 STEPS FROM SEED TO VESSEL
            </h2>
            <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans">
              Our automated process maintains molecular flavor fidelity at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeySteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-[28px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 space-y-3 hover:border-[#EEDCC6]/50 transition-all shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 font-mono text-xs font-black text-[#EEDCC6] flex items-center justify-center mb-4">
                    {String(step.step).padStart(2, '0')}
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#F4E8D1]">
                    {step.title}
                  </h3>
                  <div className="text-[11px] font-mono text-[#EEDCC6] font-bold mb-2">
                    {step.subtitle}
                  </div>
                  <p className="text-xs text-[#EEDCC6]/75 font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: ETHICAL COMMITMENT BANNER */}
        <div className="bg-[#3C2A21] border border-[#EEDCC6]/30 rounded-[32px] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono uppercase text-[#EEDCC6] font-bold block">
                SUSTAINABILITY & DIRECT TRADE
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-[#F4E8D1] uppercase">
                COFFEE THAT HONORS THE EARTH & GROWERS
              </h2>
              <p className="text-sm text-[#EEDCC6]/80 font-sans leading-relaxed">
                By bypassing predatory commodity coffee brokers, 100% of our beans come from partner farms where workers earn living wages and farms practice regenerative agroforestry.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                to="/sustainability"
                className="w-full py-3.5 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black uppercase text-center tracking-wider hover:bg-[#F4E8D1] transition-all shadow-md"
              >
                VIEW SUSTAINABILITY REPORT
              </Link>
              <Link
                to="/menu"
                className="w-full py-3.5 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-[#EEDCC6] font-mono text-xs font-bold uppercase text-center tracking-wider hover:bg-[#3C2A21] transition-all"
              >
                EXPLORE FULL MENU
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCoffee;
