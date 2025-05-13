
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import GrowthPathPreview from '@/components/home/GrowthPathPreview';
import MentorPreview from '@/components/home/MentorPreview';
import MentalHealthTools from '@/components/home/MentalHealthTools';
import CallToAction from '@/components/home/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <GrowthPathPreview />
        <MentorPreview />
        <MentalHealthTools />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
