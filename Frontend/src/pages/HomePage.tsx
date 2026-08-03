import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { JourneyTimeline } from '@/components/landing/JourneyTimeline';
import { RoleGrid } from '@/components/landing/RoleGrid';
import { StatsSection } from '@/components/landing/StatsSection';
import { CTASection } from '@/components/landing/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-4">
      <HeroSection />
      <FeatureGrid />
      <JourneyTimeline />
      <RoleGrid />
      <StatsSection />
      <CTASection />
    </div>
  );
};
