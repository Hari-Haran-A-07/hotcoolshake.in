import React from 'react';
import HeroSection from '../sections/home/HeroSection';
import BrandConceptStrip from '../sections/home/BrandConceptStrip';
import FeaturedMenuSection from '../sections/home/FeaturedMenuSection';
import SignatureLabTeaser from '../sections/home/SignatureLabTeaser';
import PromotionalEditorialBlocks from '../sections/home/PromotionalEditorialBlocks';
import StorySection from '../sections/home/StorySection';
import GlobalExperienceSection from '../sections/home/GlobalExperienceSection';
import SustainabilitySection from '../sections/home/SustainabilitySection';
import TechnologySection from '../sections/home/TechnologySection';
import LocationOrderStrip from '../sections/home/LocationOrderStrip';
import ReviewsSection from '../sections/home/ReviewsSection';

export const Home = () => {
  return (
    <div className="relative">
      {/* 01: Hero Section (Full-screen, 3D rotating bottle, temperature toggle, headline) */}
      <HeroSection />

      {/* Brand Concept Strip */}
      <BrandConceptStrip />

      {/* 02: Featured Products Section */}
      <FeaturedMenuSection />

      {/* 03: Make Your Coffee Virtual Lab Teaser */}
      <SignatureLabTeaser />

      {/* 04: Signature Coffee / Cool Collection / Hot Collection Editorial Promo Blocks */}
      <PromotionalEditorialBlocks />

      {/* 05: Our Story & Manifesto */}
      <StorySection />

      {/* 06: Global Experience & Flagship Hubs */}
      <GlobalExperienceSection />

      {/* 07: Sustainability & Direct Trade */}
      <SustainabilitySection />

      {/* 08: Technology & Extraction Precision */}
      <TechnologySection />

      {/* 09: Location & Order Strip */}
      <LocationOrderStrip />

      {/* 10: Reviews & Global Patron Ratings */}
      <ReviewsSection />
    </div>
  );
};

export default Home;
