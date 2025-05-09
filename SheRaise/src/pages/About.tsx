
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-16">
        <h1 className="text-3xl font-bold text-sherise-purple-dark mb-6">About SheRise</h1>
        <div className="max-w-3xl">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-sherise-purple mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              SheRise is dedicated to empowering girls and young women from all backgrounds, especially those from underserved and underprivileged communities, with the tools, knowledge, and support to lead safe, confident, and empowered lives.
            </p>
            <p className="text-gray-700 mb-4">
              We believe that every young woman deserves access to resources that can help her thrive, regardless of her economic status or geographic location.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-sherise-purple mb-4">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-sherise-pink-light p-4 rounded-lg">
                <h3 className="font-medium text-sherise-purple-dark mb-2">Inclusivity</h3>
                <p className="text-sm text-gray-700">
                  We welcome and value all young women regardless of their background, identity, ability, or circumstances.
                </p>
              </div>
              <div className="bg-sherise-blue-light p-4 rounded-lg">
                <h3 className="font-medium text-sherise-purple-dark mb-2">Accessibility</h3>
                <p className="text-sm text-gray-700">
                  We design our platform to be usable by all, including those with limited connectivity or devices.
                </p>
              </div>
              <div className="bg-sherise-peach-light p-4 rounded-lg">
                <h3 className="font-medium text-sherise-purple-dark mb-2">Empathy</h3>
                <p className="text-sm text-gray-700">
                  We approach every interaction and piece of content with understanding and compassion.
                </p>
              </div>
              <div className="bg-sherise-purple/10 p-4 rounded-lg">
                <h3 className="font-medium text-sherise-purple-dark mb-2">Empowerment</h3>
                <p className="text-sm text-gray-700">
                  We focus on building capability, confidence, and independence in young women.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-sherise-purple mb-4">How We're Different</h2>
            <p className="text-gray-700 mb-4">
              SheRise is completely free, not-for-profit, and designed specifically for young women aged 16-25. We focus on holistic development across multiple dimensions of life, from mental health to career skills to personal expression.
            </p>
            <p className="text-gray-700 mb-4">
              Our platform is built as a Progressive Web App (PWA) to ensure it works well even in low-connectivity environments, and we offer multilingual support to reach young women globally.
            </p>
            <p className="text-gray-700">
              Through partnerships with NGOs, educational institutions, volunteers, and CSR initiatives, we're able to provide high-quality resources completely free of charge.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
