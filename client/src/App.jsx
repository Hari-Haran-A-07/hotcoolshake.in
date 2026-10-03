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

import Home from './pages/Home';
import Menu from './pages/Menu';
import MakeYourCoffee from './pages/MakeYourCoffee';
import OurStory from './pages/OurStory';
import Locations from './pages/Locations';
import Sustainability from './pages/Sustainability';
import Technology from './pages/Technology';
import TrackOrder from './pages/TrackOrder';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

export const App = () => {
  const [hasCompletedOpening, setHasCompletedOpening] = useState(() => {
    return sessionStorage.getItem('hcs_intro_seen') === 'true';
  });

  const handleOpeningComplete = () => {
    sessionStorage.setItem('hcs_intro_seen', 'true');
    setHasCompletedOpening(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#071A2B] text-[#F7FAF9] selection:bg-[#B8783E] selection:text-[#071A2B]">
      {/* Desktop Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Branded Opening Experience Animation */}
      {!hasCompletedOpening && (
        <OpeningExperience onComplete={handleOpeningComplete} />
      )}

      {/* Global 5-second Branded Page Loading Transition */}
      <PageLoaderModal />

      {/* Sticky Header & Navigation */}
      <Header />

      {/* Main Routed Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/make-your-coffee" element={<MakeYourCoffee />} />
          <Route path="/story" element={<OurStory />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/track-order/:id" element={<TrackOrder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Global Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Global Checkout Modal */}
      <CheckoutModal />

      {/* Global Auth Modal */}
      <AuthModal />

      {/* Multi-Column International Footer */}
      <Footer />
    </div>
  );
};

export default App;
