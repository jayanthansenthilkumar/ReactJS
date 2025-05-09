
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import AIFeatures from '@/components/home/AIFeatures';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <AppLayout>
      <Hero />
      <Features />
      <AIFeatures />
      <Testimonials />
      <CTASection />
    </AppLayout>
  );
};

export default Index;
