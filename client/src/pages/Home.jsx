import React from 'react';
import HeroSection from '../sections/home/HeroSection';
import BrandConceptStrip from '../sections/home/BrandConceptStrip';
import SignatureLabTeaser from '../sections/home/SignatureLabTeaser';
import FeaturedMenuSection from '../sections/home/FeaturedMenuSection';
import StorySection from '../sections/home/StorySection';
import TechnologySection from '../sections/home/TechnologySection';
import GlobalExperienceSection from '../sections/home/GlobalExperienceSection';
import SustainabilitySection from '../sections/home/SustainabilitySection';
import ReviewsSection from '../sections/home/ReviewsSection';

export const Home = () => {
  return (
    <div className="relative">
      <HeroSection />
      <BrandConceptStrip />
      <SignatureLabTeaser />
      <FeaturedMenuSection />
      <StorySection />
      <TechnologySection />
      <GlobalExperienceSection />
      <SustainabilitySection />
      <ReviewsSection />
    </div>
  );
};

export default Home;
