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
  Compass,
  Coffee,
  Globe,
  Truck,
  Leaf,
  Cpu,
  Mail,
} from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItemsCount, setIsCartOpen, flyingItem } = useCart();
  const { user, isAdmin, openAuthModal, logout } = useAuth();
  const { startPageTransition } = usePageLoader();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Primary links according to prompt: HOME, MENU, MAKE YOUR COFFEE, OUR STORY, LOCATIONS
  const navLinks = [
    { name: 'HOME', path: '/', icon: Compass, title: 'HOT COOL SHAKE • HOME' },
    { name: 'MENU', path: '/menu', icon: Coffee, title: 'DISCOVER OUR BEVERAGES' },
    { name: 'MAKE YOUR COFFEE', path: '/make-your-coffee', icon: Sparkles, highlight: true, title: 'CREATE YOUR COFFEE' },
    { name: 'OUR STORY', path: '/story', icon: Compass, title: 'THE HOT COOL SHAKE STORY' },
    { name: 'LOCATIONS', path: '/locations', icon: Globe, title: 'STORE LOCATOR' },
  ];

  const secondaryNavLinks = [
    { name: 'TRACK ORDER', path: '/track-order', icon: Truck, title: 'ORDER STATUS TRACKER' },
    { name: 'TECHNOLOGY', path: '/technology', icon: Cpu, title: 'EXTRACTION & CRYO TECH' },
    { name: 'SUSTAINABILITY', path: '/sustainability', icon: Leaf, title: 'CIRCULAR PACKAGING' },
    { name: 'CONTACT', path: '/contact', icon: Mail, title: 'CONCIERGE INQUIRY' },
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
            ? 'bg-[#071A2B]/90 backdrop-blur-lg shadow-2xl py-3 border-b border-[#B8783E]/20'
            : isHome
            ? 'bg-gradient-to-b from-[#071A2B]/90 via-[#071A2B]/40 to-transparent py-5'
            : 'bg-[#071A2B] py-4 border-b border-[#B8783E]/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('/', 'HOT COOL SHAKE • HOME')}
              className="text-left focus:outline-none"
            >
              <TripleWaveLogo theme="dark" size="md" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path, link.title)}
                  data-cursor={link.highlight ? 'create' : 'default'}
                  className={`relative px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider transition-all duration-300 rounded-full group ${
                    link.highlight
                      ? 'bg-brand-gradient text-[#071A2B] shadow-bronze-glow hover:scale-105 hover:brightness-110'
                      : isActive
                      ? 'text-[#67D9D0] bg-[#0B2538] border border-[#67D9D0]/30'
                      : 'text-[#F7FAF9]/80 hover:text-[#67D9D0] hover:bg-[#0B2538]/60'
                  }`}
                >
                  <span className="flex items-center space-x-1.5">
                    {link.highlight && <Sparkles className="w-3.5 h-3.5 text-[#071A2B] animate-spin-slow" />}
                    <span>{link.name}</span>
                  </span>
                  {!link.highlight && isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#67D9D0] rounded-full"
                    />
                  )}
                </button>
              );
            })}

            {isAdmin && (
              <button
                onClick={() => handleNavClick('/admin', 'ADMIN DASHBOARD')}
                className="flex items-center space-x-1 px-3 py-1.5 text-xs font-mono font-bold tracking-wider text-[#D6A06A] bg-[#0B2538] border border-[#B8783E]/40 rounded-full hover:bg-[#B8783E] hover:text-[#071A2B] transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ADMIN</span>
              </button>
            )}
          </nav>

          {/* Right Action Buttons: Track, Auth, Cart, ORDER NOW */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            {/* User Profile / Auth */}
            {user ? (
              <div className="relative group">
                <button
                  onClick={() => handleNavClick('/admin', 'ADMIN DASHBOARD')}
                  className="flex items-center space-x-2 p-2 rounded-full bg-[#0B2538] text-[#F7FAF9] hover:bg-[#B8783E] hover:text-[#071A2B] border border-[#B8783E]/30 transition-colors"
                  title={user.name}
                >
                  <UserIcon className="w-4 h-4 text-[#67D9D0]" />
                  <span className="hidden md:inline text-xs font-mono font-semibold max-w-[90px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="p-2 rounded-full text-[#F7FAF9]/80 hover:text-[#67D9D0] hover:bg-[#0B2538] border border-transparent hover:border-[#67D9D0]/30 transition-all"
                title="Account Login"
                aria-label="Sign In"
              >
                <UserIcon className="w-4 h-4" />
              </button>
            )}

            {/* Cart Drawer Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-[#0B2538] text-[#F7FAF9] hover:bg-[#67D9D0] hover:text-[#071A2B] border border-[#67D9D0]/30 shadow-md transition-all group"
                aria-label={`Shopping Bag (${totalItemsCount} items)`}
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {totalItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#B8783E] text-[#F7FAF9] text-[10px] font-mono font-black flex items-center justify-center shadow-md border border-[#071A2B]"
                  >
                    {totalItemsCount}
                  </motion.span>
                )}
              </button>
            </div>

            {/* ORDER NOW Primary CTA */}
            <button
              onClick={() => handleNavClick('/menu', 'DISCOVER OUR BEVERAGES')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-xs font-mono font-bold tracking-widest uppercase rounded-full bg-brand-gradient text-[#071A2B] shadow-bronze-glow hover:brightness-110 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              ORDER NOW
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full text-[#F7FAF9] bg-[#0B2538] hover:bg-[#67D9D0] hover:text-[#071A2B] border border-[#67D9D0]/30 transition-colors"
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
            className="fixed z-50 pointer-events-none p-3 rounded-full bg-[#B8783E] text-[#F7FAF9] shadow-bronze-glow border border-[#071A2B]"
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
            className="fixed inset-0 z-50 bg-[#071A2B] text-[#F7FAF9] pt-24 px-6 pb-8 flex flex-col justify-between lg:hidden overflow-y-auto"
          >
            {/* Close Button Inside Drawer */}
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-full bg-[#0B2538] text-[#F7FAF9] border border-[#67D9D0]/30"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="pb-3 border-b border-[#B8783E]/20">
                <span className="text-[10px] font-mono tracking-widest text-[#D6A06A] uppercase font-semibold">
                  HOT COOL SHAKE EXPERIENCE
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
                        ? 'bg-brand-gradient text-[#071A2B] font-bold shadow-lg'
                        : isActive
                        ? 'bg-[#0B2538] text-[#67D9D0] border border-[#67D9D0]/30'
                        : 'text-[#F7FAF9]/90 hover:bg-[#0B2538]/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${link.highlight ? 'text-[#071A2B]' : 'text-[#67D9D0]'}`} />
                      <span className="font-display text-base font-bold tracking-wide">
                        {link.name}
                      </span>
                    </div>
                    {link.highlight && (
                      <span className="text-[10px] font-mono uppercase bg-[#071A2B] text-[#F7FAF9] px-2.5 py-0.5 rounded-full font-bold">
                        SIGNATURE
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-3 pb-1 border-t border-[#B8783E]/20">
                <span className="text-[10px] font-mono tracking-widest text-[#A8B0B4] uppercase font-semibold">
                  ADDITIONAL
                </span>
              </div>

              {secondaryNavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.path, link.title)}
                    className="flex items-center space-x-3 p-2.5 rounded-xl text-left text-sm text-[#A8B0B4] hover:text-[#67D9D0] transition-colors"
                  >
                    <Icon className="w-4 h-4 text-[#B8783E]" />
                    <span className="font-mono text-xs tracking-wider">{link.name}</span>
                  </button>
                );
              })}

              {isAdmin && (
                <button
                  onClick={() => handleNavClick('/admin', 'ADMINISTRATIVE CONTROL')}
                  className="flex items-center space-x-3 p-3.5 rounded-2xl bg-[#0B2538] border border-[#B8783E]/40 text-[#D6A06A] font-display font-bold text-base"
                >
                  <ShieldCheck className="w-5 h-5 text-[#B8783E]" />
                  <span>ADMIN DASHBOARD</span>
                </button>
              )}
            </div>

            {/* Mobile Drawer Footer */}
            <div className="pt-6 border-t border-[#B8783E]/20 space-y-3">
              <button
                onClick={() => handleNavClick('/menu', 'DISCOVER OUR BEVERAGES')}
                className="w-full py-3.5 rounded-full bg-brand-gradient text-[#071A2B] font-mono font-bold tracking-widest uppercase text-sm shadow-bronze-glow"
              >
                ORDER NOW • VIEW MENU
              </button>
              
              <div className="flex items-center justify-between text-[10px] font-mono text-[#A8B0B4]">
                <span>HOT COOL SHAKE</span>
                <span>HOT. COOL. SHAKE.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
