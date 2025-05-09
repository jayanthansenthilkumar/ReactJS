
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const MentalHealth = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-16">
        <h1 className="text-3xl font-bold text-sherise-purple-dark mb-6">Mental Health Support</h1>
        <p className="text-lg text-gray-600 mb-8">
          Access tools and resources to support your emotional wellbeing and mental health.
        </p>
        <div className="p-12 text-center bg-sherise-peach/10 rounded-xl">
          <p className="text-sherise-purple-dark text-xl">Coming Soon</p>
          <p className="text-gray-600">We're developing comprehensive mental health resources for you.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentalHealth;
