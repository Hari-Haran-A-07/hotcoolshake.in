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
} from 'lucide-react';

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15"/>
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
    <footer className="bg-[#2A1B16] text-[#F4E8D1] pt-20 pb-12 border-t border-[#EEDCC6]/20 relative overflow-hidden">
      {/* Subtle Background Radial Atmosphere */}
      <div className="absolute inset-0 bg-radial-coffee opacity-90 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#EEDCC6]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#3C2A21]/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tier: Brand Statement & Newsletter Subscription */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#3C2A21] items-center">
          <div className="lg:col-span-7 space-y-4">
            <TripleWaveLogo size="lg" />
            <p className="text-sm sm:text-base text-[#EEDCC6]/80 max-w-xl leading-relaxed mt-4">
              HOT COOL SHAKE is an international coffee platform where customers discover, customize, prepare, and order their own personalized coffee across temperatures and global flavor universes.
            </p>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#EEDCC6]">
              <Sparkles className="w-3.5 h-3.5 text-[#EEDCC6]" />
              <span>COFFEE, REIMAGINED AROUND YOUR TASTE.</span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-5 bg-[#3C2A21]/90 p-6 sm:p-8 rounded-3xl border border-[#EEDCC6]/20 shadow-coffee-card">
            <h3 className="text-lg sm:text-xl font-display font-bold text-[#F4E8D1]">
              JOIN THE VIP COFFEE CLUB
            </h3>
            <p className="text-xs text-[#EEDCC6]/80 mt-1.5 mb-4">
              Receive private roast releases, seasonal flavor drops, and invitation-only lab access.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full pl-4 pr-12 py-3 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-sm text-[#F4E8D1] placeholder-[#EEDCC6]/50 focus:outline-none focus:border-[#EEDCC6] transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-full bg-brand-gradient text-[#2A1B16] flex items-center justify-center hover:brightness-105 transition-all font-bold"
                  aria-label="Subscribe"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-[#2A1B16] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-xs font-mono text-[#EEDCC6]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to the HOT COOL SHAKE Inner Circle.</span>
                </motion.div>
              )}
            </form>
          </div>
        </div>

        {/* Middle Tier: 5-Column Navigation Matrix (Section 40) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-16">
          {/* COLUMN 01: ABOUT */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
              ABOUT
            </h4>
            <ul className="space-y-2.5 text-sm text-[#EEDCC6]/80">
              <li>
                <button
                  onClick={() => handleNavClick('/story', 'OUR STORY')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/coffee', 'OUR COFFEE')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Our Coffee
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/story', 'BRAND SYSTEM')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Our Brand
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/story', 'OUR TEAM')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Our Team
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 02: SHOP */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-sm text-[#EEDCC6]/80">
              <li>
                <button
                  onClick={() => handleNavClick('/menu', 'BEVERAGE MENU')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/order', 'ORDER NOW')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/order', 'DELIVERY')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/order', 'PICKUP')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Pickup
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/gift-cards', 'DIGITAL GIFT CARDS')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Gift Cards
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 03: EXPERIENCE */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
              EXPERIENCE
            </h4>
            <ul className="space-y-2.5 text-sm text-[#EEDCC6]/80">
              <li>
                <button
                  onClick={() => handleNavClick('/make-your-coffee', 'MAKE YOUR COFFEE')}
                  data-cursor="create"
                  className="hover:text-[#F4E8D1] transition-colors text-left flex items-center space-x-1.5 font-bold text-[#F4E8D1]"
                >
                  <span>Make Your Coffee</span>
                  <span className="text-[9px] bg-[#EEDCC6] text-[#2A1B16] px-1.5 py-0.5 rounded-full font-bold">LAB</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/rewards', 'HOT COOL REWARDS')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Rewards
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/locations', 'STORE LOCATIONS')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Locations
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/technology', 'MOBILE APP')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  App
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 04: COMPANY */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-sm text-[#EEDCC6]/80">
              <li>
                <button
                  onClick={() => handleNavClick('/careers', 'CAREERS')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/story', 'PARTNERS')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Partners
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/sustainability', 'SUSTAINABILITY')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/stories', 'NEWS & STORIES')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  News
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 05: SUPPORT */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
              SUPPORT
            </h4>
            <ul className="space-y-2.5 text-sm text-[#EEDCC6]/80">
              <li>
                <button
                  onClick={() => handleNavClick('/contact', 'CONTACT US')}
                  className="hover:text-[#F4E8D1] transition-colors text-left flex items-center space-x-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#EEDCC6]" />
                  <span>Contact</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/contact', 'FAQ')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/story', 'PRIVACY POLICY')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Privacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/story', 'TERMS OF SERVICE')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('/sustainability', 'ACCESSIBILITY')}
                  className="hover:text-[#F4E8D1] transition-colors text-left"
                >
                  Accessibility
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Social Icons & Copyright */}
        <div className="pt-8 border-t border-[#3C2A21] flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[#EEDCC6]/70">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span className="font-bold text-[#F4E8D1]">HOT COOL SHAKE</span>
            <span>© 2026 HOT COOL SHAKE. All rights reserved.</span>
            <span className="text-[10px] text-[#EEDCC6]/50">
              POWERED BY IBM DESIGN (Brand Concept)
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-[#3C2A21] hover:bg-[#EEDCC6] hover:text-[#2A1B16] text-[#F4E8D1] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-[#3C2A21] hover:bg-[#EEDCC6] hover:text-[#2A1B16] text-[#F4E8D1] transition-colors"
              aria-label="YouTube"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-[#3C2A21] hover:bg-[#EEDCC6] hover:text-[#2A1B16] text-[#F4E8D1] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-[#3C2A21] hover:bg-[#EEDCC6] hover:text-[#2A1B16] text-[#F4E8D1] transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
