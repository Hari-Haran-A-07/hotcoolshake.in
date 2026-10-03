import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TripleWaveLogo } from './TripleWaveLogo';
import { usePageLoader } from '../../context/LoadingContext';
import { api } from '../../services/api';
import {
  Send,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Share2,
} from 'lucide-react';

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);


export const Footer = () => {
  const { startPageTransition } = usePageLoader();
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setIsSubmitting(true);
    try {
      // Newsletter submission via api or mock fallback
      if (api.subscribeNewsletter) {
        await api.subscribeNewsletter({ email: emailInput });
      }
      setIsSuccess(true);
      setEmailInput('');
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.warn('Newsletter submission fallback handled', err);
      setIsSuccess(true);
      setEmailInput('');
      setTimeout(() => setIsSuccess(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavClick = (path, title) => {
    startPageTransition(path, title);
  };

  return (
    <footer className="bg-[#071A2B] text-[#F7FAF9] pt-20 pb-12 border-t border-[#B8783E]/25 relative overflow-hidden">
      {/* Subtle Background Radial Atmosphere */}
      <div className="absolute inset-0 bg-radial-navy opacity-90 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#67D9D0]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#B8783E]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tier: Brand Statement & Newsletter Subscription */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#0B2538]/80 items-center">
          <div className="lg:col-span-7 space-y-4">
            <TripleWaveLogo size="lg" />
            <p className="text-sm sm:text-base text-[#A8B0B4] max-w-xl leading-relaxed mt-4">
              HOT COOL SHAKE is a futuristic international coffee experience where customers discover, customize, prepare and order their own personalized coffee across temperatures and global flavor universes.
            </p>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#D6A06A]">
              <Sparkles className="w-3.5 h-3.5 text-[#B8783E]" />
              <span>YOUR COFFEE. YOUR TEMPERATURE. YOUR FLAVOUR. YOUR CREATION.</span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-5 bg-[#0B2538]/80 p-6 sm:p-8 rounded-3xl border border-[#67D9D0]/20 shadow-luxury-card">
            <h3 className="text-lg sm:text-xl font-display font-bold text-[#F7FAF9]">
              JOIN THE VIP COFFEE CLUB
            </h3>
            <p className="text-xs text-[#A8B0B4] mt-1.5 mb-4">
              Receive private tasting releases, international origin lots, and invitation-only lab access.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your VIP email address..."
                  required
                  className="w-full pl-4 pr-12 py-3 rounded-full bg-[#071A2B] border border-[#B8783E]/30 text-sm text-[#F7FAF9] placeholder-[#A8B0B4]/60 focus:outline-none focus:border-[#67D9D0] transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-full bg-brand-gradient text-[#071A2B] flex items-center justify-center hover:brightness-110 transition-all"
                  aria-label="Subscribe"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-[#071A2B] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-xs font-mono text-[#67D9D0]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to the HOT COOL SHAKE Inner Circle.</span>
                </motion.div>
              )}
            </form>
          </div>
        </div>

        {/* Middle Tier: 5-Column Navigation Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-16">
          {/* Col 1: Experience */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#D6A06A] uppercase">
              EXPERIENCE
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8B0B4]">
              <li>
                <button
                  onClick={() => handleNavClick('/make-your-coffee', 'MAKE YOUR COFFEE')}
                  data-cursor="create"
                  className="hover:text-[#67D9D0] transition-colors text-left flex items-center space-x-1.5"
                >
                  <span>Make Your Coffee</span>
                  <span className="text-[9px] bg-[#B8783E] text-[#071A2B] px-1.5 py-0.5 rounded-full font-bold">LAB</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/menu', 'INTERNATIONAL MENU')}
                  className="hover:text-[#67D9D0] transition-colors text-left"
                >
                  Beverage Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/track-order', 'ORDER STATUS TRACKER')}
                  className="hover:text-[#67D9D0] transition-colors text-left"
                >
                  Track Live Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/technology', 'TECHNOLOGY')}
                  className="hover:text-[#67D9D0] transition-colors text-left"
                >
                  Sonic Vortex Blending
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Brand & Story */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#D6A06A] uppercase">
              THE BRAND
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8B0B4]">
              <li>
                <button
                  onClick={() => handleNavClick('/story', 'OUR STORY')}
                  className="hover:text-[#67D9D0] transition-colors text-left"
                >
                  Our Story & Manifesto
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/story', 'TRIPLE-WAVE EMBLEM')}
                  className="hover:text-[#67D9D0] transition-colors text-left"
                >
                  Triple-Wave Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/sustainability', 'SUSTAINABILITY')}
                  className="hover:text-[#67D9D0] transition-colors text-left"
                >
                  100% Circular Steel
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/technology', 'PRECISION EXTRACTION')}
                  className="hover:text-[#67D9D0] transition-colors text-left"
                >
                  Cryogenic Technology
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Global Flagships */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#D6A06A] uppercase">
              FLAGSHIPS
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8B0B4]">
              <li>
                <button
                  onClick={() => handleNavClick('/locations', 'STORE LOCATOR')}
                  className="hover:text-[#67D9D0] transition-colors text-left"
                >
                  Mumbai • BKC Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/locations', 'STORE LOCATOR')}
                  className="hover:text-[#67D9D0] transition-colors text-left"
                >
                  Singapore • Marina Bay
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/locations', 'STORE LOCATOR')}
                  className="hover:text-[#67D9D0] transition-colors text-left"
                >
                  Dubai • Downtown Blvd
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/locations', 'STORE LOCATOR')}
                  className="hover:text-[#67D9D0] transition-colors text-left"
                >
                  London • Mayfair Roastery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Concierge & Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#D6A06A] uppercase">
              CONCIERGE
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8B0B4]">
              <li>
                <button
                  onClick={() => handleNavClick('/contact', 'CONCIERGE')}
                  className="hover:text-[#67D9D0] transition-colors text-left flex items-center space-x-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#B8783E]" />
                  <span>VIP Inquiries</span>
                </button>
              </li>
              <li>
                <span className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#67D9D0]" />
                  <span>+1 (800) 468-2665</span>
                </span>
              </li>
              <li>
                <span className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D6A06A]" />
                  <span>Global Flagship Hub</span>
                </span>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/admin', 'ADMIN LOGIN')}
                  className="hover:text-[#D6A06A] transition-colors text-left text-xs font-mono flex items-center space-x-1 mt-2 text-[#A8B0B4]/60"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Management Console</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Social & Community */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#D6A06A] uppercase">
              SOCIAL & DISPATCH
            </h4>
            <div className="flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#0B2538] hover:bg-[#B8783E] text-[#F7FAF9] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#0B2538] hover:bg-[#67D9D0] hover:text-[#071A2B] text-[#F7FAF9] transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#0B2538] hover:bg-[#168C8A] text-[#F7FAF9] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#0B2538] hover:bg-[#B8783E] text-[#F7FAF9] transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] font-mono text-[#A8B0B4]/70 leading-relaxed mt-2">
              Zero-Emission EV Dispatch Fleet. Calibrated thermal transport for maximum flavor integrity.
            </p>
          </div>
        </div>

        {/* Bottom Tier: Disclaimers, Legal & Copyright */}
        <div className="pt-8 border-t border-[#0B2538] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A8B0B4]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span>© 2026 HOT COOL SHAKE. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[10px] text-[#A8B0B4]/75">
              Notice: "POWERED BY IBM DESIGN" is a brand concept placeholder only.
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => handleNavClick('/story', 'PRIVACY POLICY')} className="hover:text-[#67D9D0] transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleNavClick('/story', 'TERMS OF SERVICE')} className="hover:text-[#67D9D0] transition-colors">
              Terms of Service
            </button>
            <button onClick={() => handleNavClick('/sustainability', 'CIRCULAR CODE')} className="hover:text-[#67D9D0] transition-colors">
              Ethics & Circularity
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
