import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { TripleWaveEmblem } from './TripleWaveLogo';
import {
  Bot,
  Sparkles,
  Send,
  X,
  Flame,
  Snowflake,
  RotateCw,
  ShoppingBag,
  ArrowRight,
  Coffee,
  Check,
  Zap,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';

export const AiSommelierModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Greetings. I am **CUPERTINO-7™**, the Lead Quantum Sommelier for HOT COOL SHAKE. How may I engineer your sensory coffee experience today?",
      suggestions: [
        'Design a high-energy morning elixir',
        'Recommend a zero-acidity evening cold brew',
        'What is 04°C Cryo Flash Chill vs 68°C Steam?',
        'Craft a custom molecular shake for focus',
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const knowledgeBase = [
    {
      keywords: ['morning', 'energy', 'caffeine', 'wake', 'high octane', 'strong', 'boost'],
      response: `For peak cognitive alertness and bioavailable sustained velocity, I recommend our **Obsidian Double Nitro Bloom**:
- **Thermal Base**: Single-Origin Ethiopian Yirgacheffe + 11-Bar Italian Espresso
- **Temperature**: 68°C Thermal Steam Bloom
- **Flavor Profile**: Madagascar Vanilla Bean + Dark Roasted Hazelnut
- **Aroma Resonance**: 94/100 | TDS Extraction: 20.8% | Peak Release: 3.5 hrs`,
      recommendation: {
        name: 'Obsidian Double Nitro Bloom',
        temp: 'HOT (68°C)',
        price: 11.50,
        bottle: 'Premium Obsidian Flask',
        flavors: ['Madagascar Vanilla Bean', 'Dark Roasted Hazelnut Paste'],
      },
    },
    {
      keywords: ['cold', 'cryo', 'evening', 'smooth', 'zero-acidity', 'chill', 'refreshing'],
      response: `For smooth velvety refreshment with zero astringency, our **Cryo Kyoto Cloud 04°C** is engineered via 18-hour sub-zero cryogenic extraction:
- **Thermal Base**: Sub-Zero Kyoto Cryo Concentrate
- **Temperature**: 04°C Flash Nitrogen Chill (Zero Ice Dilution)
- **Flavor Profile**: Smoked Sea Salt Caramel + Sicilian Green Pistachio
- **TDS Clarity**: 19.9% | Velvet Silk Texture`,
      recommendation: {
        name: 'Cryo Kyoto Cloud 04°C',
        temp: 'COOL (04°C)',
        price: 12.25,
        bottle: 'Cryo Frost Hydro Vessel',
        flavors: ['Smoked Sea Salt Caramel', 'Sicilian Green Pistachio'],
      },
    },
    {
      keywords: ['difference', 'vs', 'steam', 'hot cool', 'explain', 'temperature'],
      response: `Our **Dual-Chamber Thermodynamics** redefines extraction physics:
1. **HOT (68°C Steam Bloom)**: Opens delicate lipid channels under 9.2-bar pressure, unlocking caramelized sugars, toffee, and floral volatiles with zero burnt polyphenols.
2. **COOL (04°C Cryo Chill)**: Concentrates fresh extraction at 45 PSI nitrogen, cooling it in 1.4 seconds without melting ice cubes.
3. **SHAKE (08°C Sonic Vortex)**: Ultrasonic cavitation creates billions of 5-micron micro-foam bubbles for silk texture.`,
    },
    {
      keywords: ['shake', 'focus', 'brain', 'molecular', 'velvet', 'alpha'],
      response: `For sustained alpha-wave focus, I recommend the **Sonic Velvet Cacao Vortex**:
- **Base**: Nitro Velvet Micro-Aerated Concentrate
- **Temperature**: 08°C Sonic Vortex
- **Essences**: Single-Origin Belgian Cacao + Toasted Coconut Silk + Cardamom Saffron
- **Brainwave Resonance**: 432Hz Tuned Foam Viscosity`,
      recommendation: {
        name: 'Sonic Velvet Cacao Vortex',
        temp: 'SHAKE (08°C)',
        price: 13.00,
        bottle: 'Signature Warm Bronze Vessel',
        flavors: ['Single-Origin Belgian Cacao', 'Toasted Coconut Silk'],
      },
    },
  ];

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let match = knowledgeBase.find((item) =>
        item.keywords.some((k) => lower.includes(k))
      );

      let aiResponseText = match
        ? match.response
        : `Analyzing your profile across 100,000+ sensory formulas... Based on your request for "${text}", I have calibrated a bespoke molecular infusion of Single-Origin Arabica, Madagascar Bourbon Vanilla, and cryogenic micro-emulsification.`;

      let recommendation = match ? match.recommendation : {
        name: 'Bespoke Sommelier Reserve',
        temp: 'COOL (04°C)',
        price: 11.75,
        bottle: 'Premium Obsidian Flask',
        flavors: ['Madagascar Bourbon Vanilla', 'Smoked Sea Salt Caramel'],
      };

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponseText,
        recommendation,
        suggestions: [
          'Design another molecular blend',
          'Explore Global Telemetry',
          'Take me to Make Your Coffee Lab',
        ],
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleQuickAdd = (rec) => {
    addToCart({
      _id: `ai-rec-${Date.now()}`,
      name: rec.name,
      customBlendTitle: rec.name,
      price: rec.price,
      image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop',
      temperature: rec.temp.includes('HOT') ? 'HOT' : rec.temp.includes('COOL') ? 'COOL' : 'SHAKE',
      bottle: { name: rec.bottle, price: rec.price },
      flavors: rec.flavors.map((f) => ({ name: f, intensity: 'MEDIUM' })),
    });
  };

  return (
    <>
      {/* Floating Holographic Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center space-x-2.5 px-4 sm:px-5 py-3 rounded-full bg-brand-gradient text-[#2A1B16] font-mono text-xs font-black tracking-widest shadow-cream-glow border-2 border-[#EEDCC6] uppercase transition-all duration-300"
      >
        <div className="relative">
          <Bot className="w-4 h-4 text-[#2A1B16]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#3C2A21] animate-ping" />
        </div>
        <span className="hidden sm:inline">AI SOMMELIER</span>
        <span className="sm:hidden">AI</span>
      </motion.button>

      {/* Sommelier Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              className="w-full sm:max-w-xl h-[85vh] sm:h-[680px] bg-[#2A1B16] rounded-t-[32px] sm:rounded-[32px] border border-[#EEDCC6]/30 shadow-2xl flex flex-col overflow-hidden text-[#F4E8D1]"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 bg-[#3C2A21]/90 border-b border-[#EEDCC6]/20 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-2xl bg-brand-gradient text-[#2A1B16] shadow-md">
                    <TripleWaveEmblem size={22} theme="dark" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-display font-black text-sm text-[#F4E8D1] tracking-wider">
                        CUPERTINO-7™ AI SOMMELIER
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#EEDCC6] text-[#2A1B16] text-[9px] font-mono font-black">
                        ONLINE
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-[#EEDCC6]/70">
                      $1B Quantum Sensory Neural Intelligence
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-[#2A1B16] text-[#EEDCC6]/70 hover:text-[#F4E8D1] border border-transparent hover:border-[#EEDCC6]/20 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Conversation Stream */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                {messages.map((m) => {
                  const isAi = m.sender === 'ai';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`max-w-[85%] p-4 rounded-2xl text-xs font-sans leading-relaxed ${
                          isAi
                            ? 'bg-[#3C2A21] border border-[#EEDCC6]/25 text-[#F4E8D1] rounded-tl-sm'
                            : 'bg-[#EEDCC6] text-[#2A1B16] font-medium rounded-tr-sm shadow-md'
                        }`}
                      >
                        {m.text.split('\n').map((line, idx) => (
                          <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>
                            {line}
                          </p>
                        ))}

                        {/* Interactive Recommendation Card inside message */}
                        {m.recommendation && (
                          <div className="mt-3 p-3.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 space-y-2 text-[#F4E8D1]">
                            <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                              <span className="text-[#EEDCC6]">{m.recommendation.name}</span>
                              <span>${m.recommendation.price.toFixed(2)}</span>
                            </div>
                            <div className="text-[10px] font-mono text-[#EEDCC6]/70">
                              {m.recommendation.temp} • {m.recommendation.bottle}
                            </div>
                            <div className="pt-2 flex items-center space-x-2">
                              <button
                                onClick={() => handleQuickAdd(m.recommendation)}
                                className="flex-1 py-2 rounded-lg bg-brand-gradient text-[#2A1B16] font-mono text-[10px] font-black uppercase flex items-center justify-center space-x-1"
                              >
                                <ShoppingBag className="w-3 h-3" />
                                <span>ADD TO BAG</span>
                              </button>
                              <button
                                onClick={() => {
                                  setIsOpen(false);
                                  navigate('/make-your-coffee');
                                }}
                                className="px-3 py-2 rounded-lg bg-[#3C2A21] text-[#EEDCC6] border border-[#EEDCC6]/30 font-mono text-[10px] font-bold uppercase hover:text-[#F4E8D1]"
                              >
                                OPEN IN LAB
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* AI Quick Suggestion Chips */}
                      {isAi && m.suggestions && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-full">
                          {m.suggestions.map((sug, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleSendMessage(sug)}
                              className="px-3 py-1 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-[10px] font-mono text-[#EEDCC6]/80 hover:text-[#F4E8D1] hover:border-[#EEDCC6] transition-all text-left"
                            >
                              + {sug}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center space-x-2 text-[#EEDCC6]/70 p-3 bg-[#3C2A21] rounded-2xl w-fit text-xs font-mono">
                    <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-[#EEDCC6]" />
                    <span>Synthesizing flavor alchemy...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Bottom Input Area */}
              <div className="p-3 sm:p-4 bg-[#3C2A21]/90 border-t border-[#EEDCC6]/20">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask about flavor profiles, cryogenic temps, or custom recipes..."
                    className="flex-1 px-4 py-3 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] placeholder-[#EEDCC6]/40 focus:outline-none focus:border-[#EEDCC6]"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="p-3 rounded-2xl bg-brand-gradient text-[#2A1B16] font-bold shadow-md hover:brightness-105 disabled:opacity-40 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiSommelierModal;
