import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import OpeningExperience from './components/common/OpeningExperience';
import PageLoaderModal from './components/common/PageLoaderModal';
import CustomCursor from './components/common/CustomCursor';
import CartDrawer from './components/common/CartDrawer';
import CheckoutModal from './components/common/CheckoutModal';
import AuthModal from './components/common/AuthModal';
import SearchModal from './components/common/SearchModal';
import SensoryAudioPlayer from './components/common/SensoryAudioPlayer';
import AiSommelierModal from './components/common/AiSommelierModal';

import Home from './pages/Home';
import Menu from './pages/Menu';
import MakeYourCoffee from './pages/MakeYourCoffee';
import AiAlchemist from './pages/AiAlchemist';
import GlobalTelemetry from './pages/GlobalTelemetry';
import OurStory from './pages/OurStory';
import Locations from './pages/Locations';
import Rewards from './pages/Rewards';
import OurCoffee from './pages/OurCoffee';
import Order from './pages/Order';
import Stories from './pages/Stories';
import GiftCards from './pages/GiftCards';
import Careers from './pages/Careers';
import Account from './pages/Account';
import Sustainability from './pages/Sustainability';
import Technology from './pages/Technology';
import TrackOrder from './pages/TrackOrder';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

export const App = () => {
  const [hasCompletedOpening, setHasCompletedOpening] = useState(() => {
    return sessionStorage.getItem('hcs_intro_seen') === 'true';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleOpeningComplete = () => {
    sessionStorage.setItem('hcs_intro_seen', 'true');
    setHasCompletedOpening(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#2A1B16] text-[#F4E8D1] selection:bg-[#EEDCC6] selection:text-[#2A1B16]">
      {/* Desktop Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Branded Opening Experience Animation */}
      {!hasCompletedOpening && (
        <OpeningExperience onComplete={handleOpeningComplete} />
      )}

      {/* Global 5-second Branded Page Loading Transition */}
      <PageLoaderModal />

      {/* Sticky Header & Navigation */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Routed Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/make-your-coffee" element={<MakeYourCoffee />} />
          <Route path="/alchemist" element={<AiAlchemist />} />
          <Route path="/telemetry" element={<GlobalTelemetry />} />
          <Route path="/story" element={<OurStory />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/coffee" element={<OurCoffee />} />
          <Route path="/order" element={<Order />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/gift-cards" element={<GiftCards />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/account" element={<Account />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/track-order/:id" element={<TrackOrder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Global Real-time Web Audio API ASMR Player */}
      <SensoryAudioPlayer />

      {/* Global CUPERTINO-7™ Master Roaster AI Assistant */}
      <AiSommelierModal />

      {/* Global Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Global Checkout Modal */}
      <CheckoutModal />

      {/* Global Auth Modal */}
      <AuthModal />

      {/* Global Instant Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Multi-Column International Footer */}
      <Footer />
    </div>
  );
};

export default App;
