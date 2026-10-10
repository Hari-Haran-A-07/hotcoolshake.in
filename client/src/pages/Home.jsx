import React from 'react';
import HeroSection from '../sections/home/HeroSection';
import BillionDollarInnovationStrip from '../sections/home/BillionDollarInnovationStrip';
import BrandConceptStrip from '../sections/home/BrandConceptStrip';
import PromotionalEditorialBlocks from '../sections/home/PromotionalEditorialBlocks';
import FeaturedMenuSection from '../sections/home/FeaturedMenuSection';
import SignatureLabTeaser from '../sections/home/SignatureLabTeaser';
import RecommendationQuizSection from '../sections/home/RecommendationQuizSection';
import RewardsSection from '../sections/home/RewardsSection';
import GlobalExperienceSection from '../sections/home/GlobalExperienceSection';
import TechnologySection from '../sections/home/TechnologySection';
import EditorialStoriesSection from '../sections/home/EditorialStoriesSection';
import StorySection from '../sections/home/StorySection';
import SustainabilitySection from '../sections/home/SustainabilitySection';
import LocationOrderStrip from '../sections/home/LocationOrderStrip';
import ReviewsSection from '../sections/home/ReviewsSection';

export const Home = () => {
  return (
    <div className="relative bg-[#2A1B16] text-[#F4E8D1]">
      {/* 01: Hero Section (Liquid pour, bottle rotation, thermal switcher) */}
      <HeroSection />

      {/* 01.5: Massive $1B Innovation Infrastructure Showcase */}
      <BillionDollarInnovationStrip />

      {/* 02: Featured Promotion Module (CMS-driven) */}
      <PromotionalEditorialBlocks />

      {/* 03: Signature Products (HOT, COOL, SHAKE, SPECIALTY) */}
      <FeaturedMenuSection />

      {/* 04: Signature Experience Teaser: MAKE YOUR COFFEE */}
      <SignatureLabTeaser />

      {/* 05: Brand Concept Strip (HOT [upward], COOL [floating], SHAKE [vortex]) */}
      <BrandConceptStrip />

      {/* 06: Personalized Recommendation Engine: FIND YOUR PERFECT COFFEE */}
      <RecommendationQuizSection />

      {/* 07: Rewards Ecosystem: HOT COOL REWARDS & Shake Points */}
      <RewardsSection />

      {/* 08: App & Digital Experience & Technology */}
      <TechnologySection />

      {/* 09: Global Coffee Story: COFFEE WITHOUT BORDERS (Origins Map) */}
      <GlobalExperienceSection />

      {/* 10: Editorial News & Stories */}
      <EditorialStoriesSection />

      {/* 11: Brand Story & Philosophy */}
      <StorySection />

      {/* 12: Sustainability: BETTER COFFEE. BETTER FUTURE. */}
      <SustainabilitySection />

      {/* 13: Store / Location Experience */}
      <LocationOrderStrip />

      {/* 14: Connoisseur Reviews & Testimonials */}
      <ReviewsSection />
    </div>
  );
};

export default Home;
