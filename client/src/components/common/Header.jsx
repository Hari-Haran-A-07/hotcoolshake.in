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
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/', icon: Compass, title: 'EXPLORING HOME' },
    { name: 'MENU', path: '/menu', icon: Coffee, title: 'INTERNATIONAL MENU' },
    { name: 'MAKE YOUR COFFEE', path: '/make-your-coffee', icon: Sparkles, highlight: true, title: 'VIRTUAL COFFEE LAB' },
    { name: 'OUR STORY', path: '/story', icon: Compass, title: 'COFFEE WITHOUT LIMITS' },
    { name: 'LOCATIONS', path: '/locations', icon: Globe, title: 'GLOBAL FLAGSHIP HUBS' },
    { name: 'SUSTAINABILITY', path: '/sustainability', icon: Leaf, title: 'CIRCULAR SOURCING' },
    { name: 'TECHNOLOGY', path: '/technology', icon: Cpu, title: 'THE TECHNOLOGY BEHIND YOUR CUP' },
    { name: 'CONTACT', path: '/contact', icon: Mail, title: 'CONCIERGE INQUIRY' },
  ];

  const handleNavClick = (path, title) => {
    setIsMobileMenuOpen(false);
    startPageTransition(path, title);
  };

  const isHome = location.pathname === '/';
  const headerTheme = isScrolled || !isHome ? 'dark' : 'dark';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#2A1B16]/95 backdrop-blur-md shadow-espresso-dark py-3.5 border-b border-[#EEDCC6]/15'
            : isHome
            ? 'bg-gradient-to-b from-[#2A1B16]/90 via-[#2A1B16]/40 to-transparent py-5'
            : 'bg-[#2A1B16] py-4 border-b border-[#EEDCC6]/15'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('/', 'EXPLORING HOME')}
              className="text-left focus:outline-none"
            >
              <TripleWaveLogo theme="dark" size="md" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path, link.title)}
                  className={`relative px-3 py-1.5 text-xs font-mono font-bold tracking-wider transition-all duration-300 rounded-full group ${
                    link.highlight
                      ? 'bg-gradient-to-r from-[#EEDCC6] to-[#F4E8D1] text-[#2A1B16] shadow-coffee-glow hover:scale-105'
                      : isActive
                      ? 'text-[#F4E8D1] bg-[#3C2A21] border border-[#EEDCC6]/30'
                      : 'text-[#EEDCC6]/80 hover:text-[#F4E8D1] hover:bg-[#3C2A21]/40'
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
                onClick={() => handleNavClick('/admin', 'ADMINISTRATIVE CONTROL')}
                className="flex items-center space-x-1 px-3 py-1.5 text-xs font-mono font-bold tracking-wider text-[#F4E8D1] bg-[#3C2A21] border border-[#EEDCC6]/40 rounded-full hover:bg-[#EEDCC6] hover:text-[#2A1B16] transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ADMIN</span>
              </button>
            )}
          </nav>

          {/* Right Action Icons & ORDER NOW */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* User Auth Profile Icon */}
            {user ? (
              <div className="relative group">
                <button
                  onClick={() => handleNavClick('/admin', 'ADMIN DASHBOARD')}
                  className="flex items-center space-x-2 p-2 rounded-full bg-[#3C2A21] text-[#F4E8D1] hover:bg-[#EEDCC6] hover:text-[#2A1B16] border border-[#EEDCC6]/20 transition-colors"
                  title={user.name}
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden md:inline text-xs font-mono font-semibold max-w-[90px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="p-2 rounded-full text-[#EEDCC6] hover:text-[#F4E8D1] hover:bg-[#3C2A21] border border-transparent hover:border-[#EEDCC6]/20 transition-all"
                title="Account Login"
                aria-label="Sign In"
              >
                <UserIcon className="w-4 h-4" />
              </button>
            )}

            {/* Cart Button with Fly-to-Cart Animation Target */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-[#3C2A21] text-[#F4E8D1] hover:bg-[#EEDCC6] hover:text-[#2A1B16] border border-[#EEDCC6]/30 shadow-md transition-all group"
                aria-label={`Shopping Bag (${totalItemsCount} items)`}
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {totalItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-[#EEDCC6] to-[#F4E8D1] text-[#2A1B16] text-[10px] font-mono font-black flex items-center justify-center shadow-md border border-[#2A1B16]"
                  >
                    {totalItemsCount}
                  </motion.span>
                )}
              </button>
            </div>

            {/* ORDER NOW Primary CTA */}
            <button
              onClick={() => handleNavClick('/menu', 'DISCOVER OUR CRAFT')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase rounded-full bg-[#EEDCC6] hover:bg-[#F4E8D1] text-[#2A1B16] shadow-coffee-glow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              ORDER NOW
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-full text-[#F4E8D1] bg-[#3C2A21] hover:bg-[#EEDCC6] hover:text-[#2A1B16] border border-[#EEDCC6]/20 transition-colors"
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
            className="fixed z-50 pointer-events-none p-3 rounded-full bg-[#EEDCC6] text-[#2A1B16] shadow-coffee-glow border border-[#2A1B16]"
          >
            <Coffee className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#2A1B16] text-[#F4E8D1] pt-24 px-6 pb-8 flex flex-col justify-between xl:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-3">
              <div className="pb-4 border-b border-[#EEDCC6]/15">
                <span className="text-[10px] font-mono tracking-widest text-[#EEDCC6] uppercase font-semibold">
                  NAVIGATION MATRIX
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
                        ? 'bg-gradient-to-r from-[#EEDCC6] to-[#F4E8D1] text-[#2A1B16] font-bold shadow-md'
                        : isActive
                        ? 'bg-[#3C2A21] text-[#F4E8D1] border border-[#EEDCC6]/30'
                        : 'text-[#EEDCC6]/90 hover:bg-[#3C2A21]/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${link.highlight ? 'text-[#2A1B16]' : 'text-[#EEDCC6]'}`} />
                      <span className="font-display text-base font-bold tracking-wide">
                        {link.name}
                      </span>
                    </div>
                    {link.highlight && (
                      <span className="text-[10px] font-mono uppercase bg-[#2A1B16] text-[#F4E8D1] px-2 py-0.5 rounded-full font-bold">
                        SIGNATURE
                      </span>
                    )}
                  </button>
                );
              })}

              {isAdmin && (
                <button
                  onClick={() => handleNavClick('/admin', 'ADMINISTRATIVE CONTROL')}
                  className="flex items-center space-x-3 p-3.5 rounded-2xl bg-[#3C2A21] border border-[#EEDCC6]/30 text-[#F4E8D1] font-display font-bold text-base"
                >
                  <ShieldCheck className="w-5 h-5 text-[#EEDCC6]" />
                  <span>ADMIN DASHBOARD</span>
                </button>
              )}
            </div>

            {/* Mobile Footer Area */}
            <div className="pt-6 border-t border-[#EEDCC6]/15 space-y-4">
              <button
                onClick={() => handleNavClick('/menu', 'DISCOVER OUR CRAFT')}
                className="w-full py-3.5 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono font-bold tracking-widest uppercase text-sm shadow-coffee-glow"
              >
                ORDER NOW • VIEW MENU
              </button>
              
              <div className="flex items-center justify-between text-xs font-mono text-[#EEDCC6]/70">
                <span>HOT COOL SHAKE GLOBAL</span>
                <span>HOT. COOL. YOUR WAY.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
