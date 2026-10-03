import React from 'react';
import HeroSection from '../sections/home/HeroSection';
import BrandConceptStrip from '../sections/home/BrandConceptStrip';
import CoffeeAutomationSection from '../sections/home/CoffeeAutomationSection';
import FeaturedMenuSection from '../sections/home/FeaturedMenuSection';
import SignatureLabTeaser from '../sections/home/SignatureLabTeaser';
import PromotionalEditorialBlocks from '../sections/home/PromotionalEditorialBlocks';
import GlobalExperienceSection from '../sections/home/GlobalExperienceSection';
import TechnologySection from '../sections/home/TechnologySection';
import StorySection from '../sections/home/StorySection';
import SustainabilitySection from '../sections/home/SustainabilitySection';
import LocationOrderStrip from '../sections/home/LocationOrderStrip';
import ReviewsSection from '../sections/home/ReviewsSection';

export const Home = () => {
  return (
    <div className="relative bg-[#071A2B] text-[#F7FAF9]">
      {/* 01: Cinematic Hero Section */}
      <HeroSection />

      {/* 02: Triple-Wave Brand Concept Strip (HOT + COOL + SHAKE) */}
      <BrandConceptStrip />

      {/* 03: Realistic Coffee Automation Simulation & Video Concept */}
      <CoffeeAutomationSection />

      {/* 04: Featured Coffee Product Collection */}
      <FeaturedMenuSection />

      {/* 05: Make Your Coffee Virtual Lab Teaser */}
      <SignatureLabTeaser />

      {/* 06: Editorial Collection Promo Blocks */}
      <PromotionalEditorialBlocks />

      {/* 07: Coffee World Section — "COFFEE WITHOUT BORDERS" */}
      <GlobalExperienceSection />

      {/* 08: Technology & Extraction Precision */}
      <TechnologySection />

      {/* 09: Brand Story & Manifesto */}
      <StorySection />

      {/* 10: Sustainability & Circularity */}
      <SustainabilitySection />

      {/* 11: Flagship Roasteries & Location Order Strip */}
      <LocationOrderStrip />

      {/* 12: Connoisseur Reviews & Testimonials */}
      <ReviewsSection />
    </div>
  );
};

export default Home;
