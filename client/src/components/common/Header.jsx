import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TripleWaveLogo } from './TripleWaveLogo';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { usePageLoader } from '../../context/LoadingContext';
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  User as UserIcon,
  Sparkles,
  ShieldCheck,
  Search,
  Coffee,
  Globe,
  Truck,
  Leaf,
  Cpu,
  Mail,
  Award,
  BookOpen,
  Gift,
  Briefcase,
} from 'lucide-react';

export const Header = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItemsCount, setIsCartOpen, flyingItem } = useCart();
  const { user, isAdmin, openAuthModal, logout } = useAuth();
  const { startPageTransition } = usePageLoader();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop navigation links from Master Prompt
  const navLinks = [
    { name: 'MENU', path: '/menu', icon: Coffee, title: 'MENU & BEVERAGES' },
    { name: 'MAKE YOUR COFFEE', path: '/make-your-coffee', icon: Sparkles, highlight: true, title: 'COFFEE LAB' },
    { name: 'AI ALCHEMIST', path: '/alchemist', icon: Cpu, badge: 'AI', title: 'AURA-AI™ SENSORY MATRIX' },
    { name: 'TELEMETRY', path: '/telemetry', icon: Radio, title: 'AERO-GRID™ GLOBAL SATELLITE' },
    { name: 'OUR STORY', path: '/story', icon: BookOpen, title: 'THE HOT COOL SHAKE STORY' },
    { name: 'LOCATIONS', path: '/locations', icon: Globe, title: 'FIND A STORE' },
    { name: 'REWARDS', path: '/rewards', icon: Award, title: 'HOT COOL REWARDS' },
    { name: 'OUR COFFEE', path: '/coffee', icon: Coffee, title: 'ORIGINS & CRAFT' },
  ];

  const secondaryNavLinks = [
    { name: 'AI ALCHEMIST SENSORY MATRIX', path: '/alchemist', icon: Cpu, title: 'AURA-AI™ MOLECULAR ALCHEMIST' },
    { name: 'GLOBAL SATELLITE TELEMETRY', path: '/telemetry', icon: Radio, title: 'AERO-GRID™ LIVE COMMAND' },
    { name: 'CHAMBER-X™ TECHNOLOGY', path: '/technology', icon: Cpu, title: 'CHAMBER-X™ THERMODYNAMICS' },
    { name: 'STORIES & NEWS', path: '/stories', icon: BookOpen, title: 'EDITORIAL & STORIES' },
    { name: 'ORDER AHEAD / DELIVERY', path: '/order', icon: Truck, title: 'START YOUR ORDER' },
    { name: 'GIFT CARDS', path: '/gift-cards', icon: Gift, title: 'DIGITAL GIFT CARDS' },
    { name: 'TRACK ORDER', path: '/track-order', icon: Truck, title: 'ORDER STATUS TRACKER' },
    { name: 'SUSTAINABILITY', path: '/sustainability', icon: Leaf, title: 'SUSTAINABILITY & ETHICS' },
    { name: 'CAREERS', path: '/careers', icon: Briefcase, title: 'JOIN THE CREW' },
    { name: 'CONTACT & SUPPORT', path: '/contact', icon: Mail, title: 'CONCIERGE & SUPPORT' },
  ];

  const handleNavClick = (path, title) => {
    setIsMobileMenuOpen(false);
    startPageTransition(path, title);
  };

  const isHome = location.pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#2A1B16]/95 backdrop-blur-xl shadow-2xl py-3 border-b border-[#EEDCC6]/15'
            : isHome
            ? 'bg-gradient-to-b from-[#2A1B16]/95 via-[#2A1B16]/50 to-transparent py-5'
            : 'bg-[#2A1B16] py-4 border-b border-[#EEDCC6]/15'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('/', 'HOT COOL SHAKE • HOME')}
              className="text-left focus:outline-none"
            >
              <TripleWaveLogo theme="dark" size="md" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path, link.title)}
                  className={`relative px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider transition-all duration-300 rounded-full group ${
                    link.highlight
                      ? 'bg-brand-gradient text-[#2A1B16] shadow-cream-glow hover:scale-105 font-black'
                      : isActive
                      ? 'text-[#F4E8D1] bg-[#3C2A21] border border-[#EEDCC6]/30'
                      : 'text-[#EEDCC6]/85 hover:text-[#F4E8D1] hover:bg-[#3C2A21]/60'
                  }`}
                >
                  <span className="flex items-center space-x-1.5">
                    {link.highlight && <Sparkles className="w-3.5 h-3.5 text-[#2A1B16] animate-spin-slow" />}
                    <span>{link.name}</span>
                  </span>
                  {!link.highlight && isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#EEDCC6] rounded-full"
                    />
                  )}
                </button>
              );
            })}

            {isAdmin && (
              <button
                onClick={() => handleNavClick('/admin', 'ADMIN DASHBOARD')}
                className="flex items-center space-x-1 px-3 py-1.5 text-xs font-mono font-bold tracking-wider text-[#EEDCC6] bg-[#3C2A21] border border-[#EEDCC6]/30 rounded-full hover:bg-[#EEDCC6] hover:text-[#2A1B16] transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ADMIN</span>
              </button>
            )}
          </nav>

          {/* Right Action Suite: Search, Account, Cart, START YOUR ORDER */}
          <div className="flex items-center space-x-2 sm:space-x-3.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-full text-[#EEDCC6]/90 hover:text-[#F4E8D1] hover:bg-[#3C2A21] border border-transparent hover:border-[#EEDCC6]/20 transition-all"
              title="Search Catalog & Stories"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Account Dashboard / Auth */}
            {user ? (
              <div className="relative group">
                <button
                  onClick={() => handleNavClick('/account', 'ACCOUNT DASHBOARD')}
                  className="flex items-center space-x-2 p-2 rounded-full bg-[#3C2A21] text-[#F4E8D1] hover:bg-[#EEDCC6] hover:text-[#2A1B16] border border-[#EEDCC6]/20 transition-colors"
                  title={user.name}
                >
                  <UserIcon className="w-4 h-4 text-[#EEDCC6]" />
                  <span className="hidden md:inline text-xs font-mono font-semibold max-w-[80px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="p-2.5 rounded-full text-[#EEDCC6]/90 hover:text-[#F4E8D1] hover:bg-[#3C2A21] border border-transparent hover:border-[#EEDCC6]/20 transition-all"
                title="Account Sign In"
                aria-label="Sign In"
              >
                <UserIcon className="w-4 h-4" />
              </button>
            )}

            {/* Cart Drawer Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-[#3C2A21] text-[#F4E8D1] hover:bg-[#EEDCC6] hover:text-[#2A1B16] border border-[#EEDCC6]/25 shadow-md transition-all group"
                aria-label={`Shopping Bag (${totalItemsCount} items)`}
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {totalItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#EEDCC6] text-[#2A1B16] text-[10px] font-mono font-black flex items-center justify-center shadow-md border border-[#2A1B16]"
                  >
                    {totalItemsCount}
                  </motion.span>
                )}
              </button>
            </div>

            {/* START YOUR ORDER Primary CTA */}
            <button
              onClick={() => handleNavClick('/order', 'START YOUR ORDER')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-xs font-mono font-bold tracking-widest uppercase rounded-full bg-brand-gradient text-[#2A1B16] shadow-cream-glow hover:brightness-105 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              START YOUR ORDER
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full text-[#F4E8D1] bg-[#3C2A21] hover:bg-[#EEDCC6] hover:text-[#2A1B16] border border-[#EEDCC6]/25 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fly to Cart Particle */}
      <AnimatePresence>
        {flyingItem && (
          <motion.div
            initial={{
              x: flyingItem.startX,
              y: flyingItem.startY,
              scale: 1.2,
              opacity: 1,
            }}
            animate={{
              x: window.innerWidth - 60,
              y: 25,
              scale: 0.2,
              opacity: 0.8,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 pointer-events-none p-3 rounded-full bg-[#EEDCC6] text-[#2A1B16] shadow-cream-glow border border-[#2A1B16]"
          >
            <Coffee className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#2A1B16] text-[#F4E8D1] pt-24 px-6 pb-8 flex flex-col justify-between lg:hidden overflow-y-auto"
          >
            {/* Close Button Inside Drawer */}
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-full bg-[#3C2A21] text-[#F4E8D1] border border-[#EEDCC6]/30"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col space-y-2.5">
              <div className="pb-3 border-b border-[#EEDCC6]/20 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold">
                  HOT COOL SHAKE • EXPLORE
                </span>
                <span className="text-[10px] font-mono text-[#EEDCC6]/60">
                  EST. 2026
                </span>
              </div>

              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.path, link.title)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl text-left transition-all ${
                      link.highlight
                        ? 'bg-brand-gradient text-[#2A1B16] font-bold shadow-lg'
                        : isActive
                        ? 'bg-[#3C2A21] text-[#F4E8D1] border border-[#EEDCC6]/30'
                        : 'text-[#F4E8D1]/90 hover:bg-[#3C2A21]/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${link.highlight ? 'text-[#2A1B16]' : 'text-[#EEDCC6]'}`} />
                      <span className="font-display text-base font-bold tracking-wide">
                        {link.name}
                      </span>
                    </div>
                    {link.highlight && (
                      <span className="text-[10px] font-mono uppercase bg-[#2A1B16] text-[#F4E8D1] px-2.5 py-0.5 rounded-full font-bold">
                        LAB
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-3 pb-1 border-t border-[#EEDCC6]/20">
                <span className="text-[10px] font-mono tracking-widest text-[#EEDCC6]/60 uppercase font-semibold">
                  DISCOVER MORE
                </span>
              </div>

              {secondaryNavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.path, link.title)}
                    className="flex items-center space-x-3 p-2.5 rounded-xl text-left text-sm text-[#EEDCC6]/80 hover:text-[#F4E8D1] transition-colors"
                  >
                    <Icon className="w-4 h-4 text-[#EEDCC6]" />
                    <span className="font-mono text-xs tracking-wider">{link.name}</span>
                  </button>
                );
              })}

              {isAdmin && (
                <button
                  onClick={() => handleNavClick('/admin', 'ADMINISTRATIVE CONTROL')}
                  className="flex items-center space-x-3 p-3.5 rounded-2xl bg-[#3C2A21] border border-[#EEDCC6]/40 text-[#EEDCC6] font-display font-bold text-base"
                >
                  <ShieldCheck className="w-5 h-5 text-[#EEDCC6]" />
                  <span>ADMIN DASHBOARD</span>
                </button>
              )}
            </div>

            {/* Mobile Drawer Footer */}
            <div className="pt-6 border-t border-[#EEDCC6]/20 space-y-3">
              <button
                onClick={() => handleNavClick('/order', 'START YOUR ORDER')}
                className="w-full py-3.5 rounded-full bg-brand-gradient text-[#2A1B16] font-mono font-bold tracking-widest uppercase text-sm shadow-cream-glow"
              >
                START YOUR ORDER NOW
              </button>
              
              <div className="flex items-center justify-between text-[10px] font-mono text-[#EEDCC6]/60">
                <span>HOT COOL SHAKE</span>
                <span>HOT • COOL • SHAKE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
