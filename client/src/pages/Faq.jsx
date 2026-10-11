import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import {
  Search,
  ChevronDown,
  HelpCircle,
  Cpu,
  Sparkles,
  Truck,
  Award,
  Leaf,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Flame,
  Snowflake,
} from 'lucide-react';

const FAQ_DATA = [
  {
    id: 'tech-1',
    category: 'TECH',
    question: 'What is Chamber-X™ Thermodynamic Induction Technology?',
    answer:
      'Chamber-X™ is our proprietary thermodynamic extraction technology engineered in Silicon Valley and Switzerland. It uses rapid electromagnetic induction to heat single-origin extractions to exactly 68°C in 1.8 seconds, or cryogenic sonic vortex chilling to flash-cool beverages down to 04°C without ice dilution.',
  },
  {
    id: 'tech-2',
    category: 'TECH',
    question: 'How do cryogenic drinks maintain 04°C during courier transit?',
    answer:
      'All cool beverages are hermetically sealed inside double-walled thermal retention vessels and transported in climate-controlled electric pods with real-time IoT temperature telemetry. You can watch live thermal telemetry directly on the Track Order page.',
  },
  {
    id: 'lab-1',
    category: 'LAB',
    question: 'Can I customize my own coffee blend from scratch?',
    answer:
      'Yes! In our Virtual Coffee Lab (/make-your-coffee), you can select your base vessel (such as our Obsidian Cryo Tumbler), choose single-origin bean bases, infuse exotic flavor particles (Madagascar Vanilla, Himalayan Salted Caramel, Dark Cacao Terpenes), and dial in temperature, sweetness, and microfoam viscosity.',
  },
  {
    id: 'lab-2',
    category: 'LAB',
    question: 'Are your thermal bottles reusable?',
    answer:
      'Yes, all HOT COOL SHAKE bottles are manufactured from food-grade recycled surgical titanium and aerospace vacuum insulation. Bring your bottle into any of our flagship roasteries worldwide for a 15% discount on refills and complimentary sonic sanitization.',
  },
  {
    id: 'delivery-1',
    category: 'DELIVERY',
    question: 'Where do you deliver and what are the delivery times?',
    answer:
      'We operate flagship roasteries in London, New York, Tokyo, Dubai, Paris, and Singapore with a guaranteed 20-minute metropolitan radius delivery using our zero-emission electric vehicle fleet.',
  },
  {
    id: 'delivery-2',
    category: 'DELIVERY',
    question: 'How do I access digital thermal receipts for business expenses?',
    answer:
      'Every order includes an itemized digital thermal tax invoice that can be viewed and printed directly from your Order Tracking page or User Account dashboard.',
  },
  {
    id: 'rewards-1',
    category: 'REWARDS',
    question: 'How does the HOT COOL Inner Circle rewards system work?',
    answer:
      'You earn 10 points for every dollar spent. Points can be redeemed for limited-edition seasonal roasts, titanium travel bottles, VIP tasting masterclasses, and secret off-menu creations.',
  },
  {
    id: 'rewards-2',
    category: 'REWARDS',
    question: 'Can digital gift cards be gifted internationally?',
    answer:
      'Yes, HOT COOL SHAKE Digital Gift Cards are universal across all global flagship stores and currencies. Codes are delivered instantly via email with personalized encryption and QR access.',
  },
  {
    id: 'ethics-1',
    category: 'ETHICS',
    question: 'What are your sustainability and fair-trade standards?',
    answer:
      '100% of our coffee beans are directly traded with partner cooperatives in Ethiopia, Colombia, Brazil, and Guatemala. We pay an average of 180% above standard Fair Trade minimums and invest 5% of net profits into clean solar irrigation infrastructure.',
  },
];

const CATEGORIES = [
  { id: 'ALL', name: 'All Questions', icon: HelpCircle },
  { id: 'TECH', name: 'Chamber-X™ Tech', icon: Cpu },
  { id: 'LAB', name: 'Coffee Lab & Bottles', icon: Sparkles },
  { id: 'DELIVERY', name: 'Delivery & Telemetry', icon: Truck },
  { id: 'REWARDS', name: 'Rewards & Gift Cards', icon: Award },
  { id: 'ETHICS', name: 'Sourcing & Ethics', icon: Leaf },
];

export const Faq = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState('tech-1');

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#2A1B16] text-[#F4E8D1] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/20 text-xs font-mono text-[#EEDCC6]">
            <TripleWaveEmblem className="w-3.5 h-3.5" />
            <span>KNOWLEDGE BASE & SUPPORT CONCIERGE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            FREQUENTLY ASKED <span className="text-[#EEDCC6]">QUESTIONS</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-mono">
            Everything you need to know about Chamber-X™ thermodynamics, bespoke flavor tailoring, global delivery, and rewards.
          </p>

          {/* Search Input */}
          <div className="relative max-w-xl mx-auto pt-2">
            <Search className="w-4 h-4 text-[#EEDCC6]/60 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search answers, temperature questions, beans..."
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-[#3C2A21]/80 border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] placeholder-[#EEDCC6]/50 focus:outline-none focus:border-[#EEDCC6] shadow-xl"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar justify-start sm:justify-center">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all flex-shrink-0 ${
                  isSelected
                    ? 'bg-[#EEDCC6] text-[#2A1B16] font-black shadow-md'
                    : 'bg-[#3C2A21]/60 text-[#EEDCC6]/70 hover:text-[#F4E8D1] border border-[#EEDCC6]/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#3C2A21]/40 border border-[#EEDCC6]/20 space-y-3">
              <HelpCircle className="w-8 h-8 text-[#EEDCC6]/40 mx-auto" />
              <p className="text-sm font-mono text-[#EEDCC6]">No answers found matching &quot;{searchQuery}&quot;.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('ALL'); }}
                className="text-xs font-mono text-[#EEDCC6] underline hover:text-[#F4E8D1]"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'bg-[#3C2A21] border-[#EEDCC6] shadow-xl'
                      : 'bg-[#3C2A21]/50 border-[#EEDCC6]/20 hover:border-[#EEDCC6]/40'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between space-x-4"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/20 text-[#EEDCC6] font-bold">
                        {faq.category}
                      </span>
                      <h3 className="font-display font-bold text-base text-[#F4E8D1]">
                        {faq.question}
                      </h3>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-[#EEDCC6] shrink-0 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-5 text-xs font-mono text-[#EEDCC6]/85 leading-relaxed border-t border-[#EEDCC6]/10 pt-3"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Concierge Escalation Strip */}
        <div className="p-8 rounded-[32px] bg-gradient-to-r from-[#3C2A21] to-[#2A1B16] border border-[#EEDCC6]/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display font-bold text-lg uppercase text-[#F4E8D1]">
              STILL HAVE QUESTIONS?
            </h3>
            <p className="text-xs font-mono text-[#EEDCC6]/80">
              Our 24/7 master barista concierge and AURA-AI™ sommelier are on standby.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#F4E8D1] transition-all flex items-center space-x-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>CONTACT CONCIERGE</span>
            </Link>
            <Link
              to="/alchemist"
              className="px-5 py-2.5 rounded-full bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/30 font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#3C2A21] transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#EEDCC6]" />
              <span>AI ALCHEMIST</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
