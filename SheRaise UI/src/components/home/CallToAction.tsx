
import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="rounded-2xl bg-gradient-to-r from-sherise-purple/90 to-sherise-purple-dark p-8 md:p-12 shadow-lg text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Join the SheRise Community Today</h2>
              <p className="mb-6 opacity-90">
                Get access to all our tools, resources, mentors, and a supportive community of young women like you—completely free.
              </p>
              <div className="space-x-3">
                <Button variant="secondary" size="lg" className="bg-white text-sherise-purple-dark hover:bg-gray-100">
                  Create Free Account
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="space-y-4 md:pl-6">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="font-medium text-lg mb-1">Free & Accessible</h3>
                <p className="text-sm opacity-90">No cost, works on all devices, even in low-connectivity areas.</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="font-medium text-lg mb-1">Safe & Private</h3>
                <p className="text-sm opacity-90">Your data is protected. Anonymous options available for sensitive topics.</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="font-medium text-lg mb-1">Supportive Community</h3>
                <p className="text-sm opacity-90">Connect with peers and mentors who understand your journey.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
