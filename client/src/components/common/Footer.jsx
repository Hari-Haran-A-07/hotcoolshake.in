import React, { useState } from 'react';
import { TripleWaveLogo } from './TripleWaveLogo';
import { usePageLoader } from '../../context/LoadingContext';
import { ArrowRight, CheckCircle2, Shield, Sparkles, Share2, Globe, Send, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { startPageTransition } = usePageLoader();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  const navColumns = [
    {
      title: 'EXPERIENCES',
      links: [
        { label: 'Virtual Coffee Lab', path: '/make-your-coffee', title: 'VIRTUAL COFFEE LAB' },
        { label: 'Beverage Menu', path: '/menu', title: 'INTERNATIONAL MENU' },
        { label: 'Track Active Order', path: '/track-order/HCS-2025-01042', title: 'ORDER TELEMETRY' },
        { label: 'Single-Origin Roasts', path: '/menu?category=hot-coffee', title: 'HOT SPECIALTIES' },
        { label: 'Sub-Zero Nitro Chills', path: '/menu?category=cool-coffee', title: 'COOL SPECIALTIES' },
      ],
    },
    {
      title: 'BRAND & STORY',
      links: [
        { label: 'Our Story', path: '/story', title: 'COFFEE WITHOUT LIMITS' },
        { label: 'Global Flagships', path: '/locations', title: 'FLAGSHIP LOCATIONS' },
        { label: 'Sustainability & Circularity', path: '/sustainability', title: 'SUSTAINABLE ROASTING' },
        { label: 'The Technology', path: '/technology', title: 'EXTRACTION ARCHITECTURE' },
        { label: 'Concierge & Inquiries', path: '/contact', title: 'CUSTOMER CONCIERGE' },
      ],
    },
    {
      title: 'GLOBAL HUBS',
      links: [
        { label: 'Mumbai Flagship Lab (BKC)', path: '/locations', title: 'MUMBAI ROASTERY' },
        { label: 'Singapore Marina Bay', path: '/locations', title: 'SINGAPORE HUB' },
        { label: 'Dubai Downtown Boulevard', path: '/locations', title: 'DUBAI RESERVE' },
        { label: 'London Mayfair Innovation Hub', path: '/locations', title: 'LONDON LAB' },
        { label: 'New York SoHo Concept', path: '/locations', title: 'NEW YORK LAB' },
      ],
    },
  ];

  return (
    <footer className="bg-[#2A1B16] text-[#F4E8D1] border-t border-[#EEDCC6]/15 relative overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 bg-radial-luxury opacity-60 pointer-events-none" />

      {/* Top Newsletter & Brand Banner Strip */}
      <div className="border-b border-[#EEDCC6]/15 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-3 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>HOT COOL SHAKE DISPATCH</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F4E8D1] tracking-tight">
                GET THE LATEST FROM HOT COOL SHAKE.
              </h3>
              <p className="text-xs sm:text-sm text-[#EEDCC6]/75 font-sans max-w-md">
                Receive secret sensory formulas, invitations to limited harvest micro-lots, and flagship laboratory launches.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="flex items-center space-x-2 p-4 rounded-2xl bg-[#3C2A21] border border-[#EEDCC6]/40 text-[#EEDCC6]">
                  <CheckCircle2 className="w-5 h-5 text-[#EEDCC6]" />
                  <span className="text-sm font-mono font-medium">
                    Welcome to the Circle. Check your inbox for your first curated brew formula.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your international email..."
                    required
                    className="flex-1 px-5 py-3.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-[#F4E8D1] placeholder-[#EEDCC6]/40 text-sm font-sans focus:outline-none focus:border-[#EEDCC6] focus:ring-1 focus:ring-[#EEDCC6]"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[#EEDCC6] hover:bg-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-bold tracking-widest uppercase shadow-coffee-glow hover:shadow-lg transition-all duration-200"
                  >
                    <span>JOIN CIRCLE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Identity Column */}
          <div className="lg:col-span-2 space-y-4">
            <TripleWaveLogo theme="dark" size="lg" />
            
            <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans leading-relaxed max-w-sm mt-3">
              An international premium coffee and beverage experience where customers discover, customize, and create their own coffee.
            </p>

            <div className="pt-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] font-extrabold text-[#EEDCC6] block">
                "HOT. COOL. YOUR WAY."
              </span>
            </div>

            {/* Social Channels */}
            <div className="flex items-center space-x-3 pt-3">
              {[
                { icon: Globe, label: 'Global Portal' },
                { icon: Share2, label: 'Share Experience' },
                { icon: MessageCircle, label: 'Community' },
                { icon: Send, label: 'Telegram Concierge' },
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    aria-label={s.label}
                    onClick={() => startPageTransition('/contact', 'COMMUNITY PORTAL')}
                    className="p-2.5 rounded-full bg-[#3C2A21] text-[#EEDCC6] hover:text-[#2A1B16] hover:bg-[#EEDCC6] transition-all border border-[#EEDCC6]/20"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nav Columns */}
          {navColumns.map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <button
                      onClick={() => startPageTransition(link.path, link.title)}
                      className="text-xs text-[#EEDCC6]/75 hover:text-[#F4E8D1] transition-colors font-sans hover:underline text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Copyright & Legal Strip */}
      <div className="border-t border-[#EEDCC6]/15 bg-[#2A1B16]/80 relative z-10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#EEDCC6]/60">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} HOT COOL SHAKE. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => startPageTransition('/contact', 'PRIVACY PROTOCOL')} className="hover:text-[#F4E8D1]">
              PRIVACY POLICY
            </button>
            <button onClick={() => startPageTransition('/contact', 'TERMS OF SERVICE')} className="hover:text-[#F4E8D1]">
              TERMS OF SERVICE
            </button>
            <button onClick={() => startPageTransition('/sustainability', 'ETHICAL DISCLOSURE')} className="hover:text-[#F4E8D1]">
              CIRCULAR ETHICS
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
