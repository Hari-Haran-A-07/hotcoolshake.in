import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import {
  Gift,
  Sparkles,
  CreditCard,
  CheckCircle2,
  Send,
  Search,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

export const GiftCards = () => {
  const { addToCart } = useCart();
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('SIGNATURE_ESPRESSO');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [checkCode, setCheckCode] = useState('');
  const [balanceResult, setBalanceResult] = useState(null);
  const [isCheckingBalance, setIsCheckingBalance] = useState(false);

  const amounts = [25, 50, 75, 100, 150];

  const themes = [
    {
      id: 'SIGNATURE_ESPRESSO',
      name: 'Signature Obsidian',
      bgClass: 'bg-gradient-to-br from-[#2A1B16] via-[#3C2A21] to-[#2A1B16] border-[#EEDCC6]/50',
      accent: '#EEDCC6',
    },
    {
      id: 'WARM_CREAM',
      name: 'Warm Crema Luxe',
      bgClass: 'bg-gradient-to-br from-[#3C2A21] via-[#5C3D2E] to-[#2A1B16] border-[#EEDCC6]/70',
      accent: '#F4E8D1',
    },
    {
      id: 'CRYO_SUBZERO',
      name: 'Sub-Zero Cryo',
      bgClass: 'bg-gradient-to-br from-[#2A1B16] via-[#3C2A21] to-[#1E252B] border-[#EEDCC6]/40',
      accent: '#EEDCC6',
    },
    {
      id: 'TRIPLE_WAVE',
      name: 'Triple-Wave Emblem',
      bgClass: 'bg-gradient-to-br from-[#3C2A21] via-[#2A1B16] to-[#3C2A21] border-[#EEDCC6]',
      accent: '#EEDCC6',
    },
  ];

  const activeTheme = themes.find((t) => t.id === selectedTheme) || themes[0];
  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleAddToCart = (e) => {
    if (!recipientEmail || finalAmount <= 0) {
      alert('Please enter recipient email and a valid amount.');
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    addToCart(
      {
        _id: `giftcard-${Date.now()}`,
        name: `HOT COOL SHAKE Digital Gift Card ($${finalAmount.toFixed(2)})`,
        price: finalAmount,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
        category: 'GIFT_CARD',
      },
      1,
      {
        recipient: recipientName,
        recipientEmail: recipientEmail,
        sender: senderName,
        theme: activeTheme.name,
      },
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    );
  };

  const handleCheckBalance = async (e) => {
    e.preventDefault();
    if (!checkCode) return;
    setIsCheckingBalance(true);
    try {
      const res = await api.checkGiftCardBalance(checkCode);
      if (res.success) {
        setBalanceResult(res.giftCard);
      } else {
        setBalanceResult({ error: res.message || 'Gift card code not found' });
      }
    } catch (err) {
      setBalanceResult({ error: 'Gift card not found or invalid code' });
    } finally {
      setIsCheckingBalance(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#EEDCC6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#3C2A21]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase shadow-sm">
            <Gift className="w-3.5 h-3.5 text-[#EEDCC6]" />
            <span>DIGITAL COFFEE EXPERIENCES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            GIFT THE <span className="text-[#EEDCC6]">EXPERIENCE</span>
          </h1>

          <p className="text-base sm:text-lg font-sans text-[#EEDCC6]/80 font-normal leading-relaxed">
            Send an instant digital gift card with a personalized message. Redeemable online in our Coffee Lab or at any global Roastery.
          </p>
        </div>

        {/* Main Grid: Card Designer Left & Preview Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: GIFT CARD BUILDER */}
          <div className="lg:col-span-7 bg-[#3C2A21]/70 border border-[#EEDCC6]/25 rounded-[32px] p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase text-[#EEDCC6] font-bold block">01 • SELECT VALUE</span>
              <h2 className="text-2xl font-display font-black text-[#F4E8D1] uppercase">
                CHOOSE DENOMINATION
              </h2>
            </div>

            {/* Amount Buttons */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-3 rounded-2xl font-mono text-sm font-black transition-all ${
                    selectedAmount === amt && !customAmount
                      ? 'bg-[#EEDCC6] text-[#2A1B16] shadow-md ring-2 ring-[#EEDCC6]/40'
                      : 'bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/20 hover:border-[#EEDCC6]/50'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div>
              <label className="text-xs font-mono uppercase text-[#EEDCC6]/80 block mb-1">
                Or Custom Amount ($10 – $500)
              </label>
              <input
                type="number"
                min="10"
                max="500"
                placeholder="Enter custom amount..."
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
              />
            </div>

            {/* Select Theme */}
            <div className="space-y-2 pt-2 border-t border-[#EEDCC6]/20">
              <span className="text-xs font-mono uppercase text-[#EEDCC6] font-bold block">
                02 • SELECT CARD DESIGN
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTheme(t.id)}
                    className={`p-3 rounded-2xl border text-xs font-mono font-bold transition-all text-left ${
                      selectedTheme === t.id
                        ? 'bg-[#2A1B16] border-[#EEDCC6] text-[#F4E8D1] ring-1 ring-[#EEDCC6]'
                        : 'bg-[#2A1B16]/50 border-[#EEDCC6]/15 text-[#EEDCC6]/60 hover:border-[#EEDCC6]/40'
                    }`}
                  >
                    <div className="w-full h-3 rounded-full mb-2 bg-[#EEDCC6]/40" />
                    <span className="truncate block">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Details Form */}
            <div className="space-y-3 pt-2 border-t border-[#EEDCC6]/20">
              <span className="text-xs font-mono uppercase text-[#EEDCC6] font-bold block">
                03 • RECIPIENT INFORMATION
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                    Recipient Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Taylor"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                    Recipient Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                    Your Name (Sender)
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                    Personalized Message
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Here's a special sensory coffee experience on me..."
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase hover:bg-[#F4E8D1] shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD GIFT CARD TO ORDER • ${finalAmount.toFixed(2)}</span>
              </button>
            </div>
          </div>

          {/* RIGHT: LIVE CARD PREVIEW & BALANCE CHECK */}
          <div className="lg:col-span-5 space-y-8">
            {/* Live Digital Card Preview */}
            <div className="bg-[#3C2A21]/70 border border-[#EEDCC6]/25 rounded-[32px] p-6 sm:p-8 space-y-6 text-center">
              <span className="text-xs font-mono uppercase text-[#EEDCC6] font-bold block">
                LIVE CARD PREVIEW
              </span>

              <div className={`w-full aspect-[1.6/1] rounded-3xl p-6 sm:p-8 border-2 shadow-2xl flex flex-col justify-between text-left relative overflow-hidden ${activeTheme.bgClass}`}>
                <div className="flex justify-between items-start">
                  <TripleWaveEmblem size={36} />
                  <span className="font-mono font-black text-2xl text-[#F4E8D1]">
                    ${finalAmount.toFixed(2)}
                  </span>
                </div>

                <div>
                  <div className="text-[9px] font-mono text-[#EEDCC6]/70 uppercase tracking-widest">
                    DIGITAL COFFEE EXPERIENCE CARD
                  </div>
                  <div className="font-display font-black text-lg text-[#F4E8D1] truncate">
                    {recipientName || 'Valued Recipient'}
                  </div>
                  {giftMessage && (
                    <p className="text-[11px] font-sans text-[#EEDCC6]/90 line-clamp-1 italic mt-0.5">
                      "{giftMessage}"
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-end border-t border-[#EEDCC6]/20 pt-2 text-[9px] font-mono text-[#EEDCC6]">
                  <span>HOT COOL SHAKE</span>
                  <span>CODE: •••• •••• •••• 9281</span>
                </div>
              </div>

              <div className="text-xs font-mono text-[#EEDCC6]/70 flex items-center justify-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#EEDCC6]" />
                <span>Instant email delivery with claim code</span>
              </div>
            </div>

            {/* Check Card Balance */}
            <div className="bg-[#3C2A21]/70 border border-[#EEDCC6]/25 rounded-[32px] p-6 sm:p-8 space-y-4">
              <h3 className="font-display font-bold text-lg text-[#F4E8D1] uppercase">
                CHECK GIFT CARD BALANCE
              </h3>
              <form onSubmit={handleCheckBalance} className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter 16-digit card code..."
                  value={checkCode}
                  onChange={(e) => setCheckCode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                />
                <button
                  type="submit"
                  disabled={isCheckingBalance}
                  className="w-full py-3 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-[#EEDCC6] font-mono text-xs font-bold uppercase hover:bg-[#3C2A21] transition-all flex items-center justify-center space-x-2"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{isCheckingBalance ? 'CHECKING...' : 'CHECK BALANCE'}</span>
                </button>
              </form>

              {balanceResult && (
                <div className="p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs font-mono">
                  {balanceResult.error ? (
                    <span className="text-red-300">{balanceResult.error}</span>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-[#EEDCC6]/70">Active Balance:</div>
                      <div className="text-xl font-bold text-[#EEDCC6]">
                        ${balanceResult.balance?.toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCards;
