
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-uniher-gray to-white">
      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-uniher-purple-light rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-uniher-pink rounded-full opacity-30 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block bg-uniher-purple/10 px-4 py-2 rounded-full">
              <span className="text-uniher-purple-dark font-medium">
                Launching Fall 2025
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              The All-in-One <span className="gradient-text">SaaS Platform</span> for College Girls
            </h1>
            
            <p className="text-lg text-gray-600 md:pr-12">
              UniHer helps college girls excel in academics, career, wellness, safety, networking, and lifestyle — all in one secure, private platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-uniher-purple hover:bg-uniher-purple-dark" asChild>
                <Link to="/signup">
                  Get Early Access <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild>
                <Link to="/modules">Explore Features</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-uniher-${i % 2 === 0 ? 'purple-light' : 'pink'}`}></div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">1,000+</span> students already on the waitlist
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white border border-border rounded-2xl shadow-lg p-6 lg:p-8 animate-float">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-uniher-green p-4 rounded-xl">
                  <div className="w-8 h-8 bg-white bg-opacity-50 rounded-full mb-2 flex items-center justify-center">
                    <span className="text-sm font-bold">A</span>
                  </div>
                  <h3 className="font-medium">Academics</h3>
                  <p className="text-xs mt-1">Smart planner & study tools</p>
                </div>
                
                <div className="bg-uniher-blue p-4 rounded-xl">
                  <div className="w-8 h-8 bg-white bg-opacity-50 rounded-full mb-2 flex items-center justify-center">
                    <span className="text-sm font-bold">C</span>
                  </div>
                  <h3 className="font-medium">Career</h3>
                  <p className="text-xs mt-1">Internships & mentorship</p>
                </div>
                
                <div className="bg-uniher-yellow p-4 rounded-xl">
                  <div className="w-8 h-8 bg-white bg-opacity-50 rounded-full mb-2 flex items-center justify-center">
                    <span className="text-sm font-bold">W</span>
                  </div>
                  <h3 className="font-medium">Wellness</h3>
                  <p className="text-xs mt-1">Health tracker & mindfulness</p>
                </div>
                
                <div className="bg-uniher-pink p-4 rounded-xl">
                  <div className="w-8 h-8 bg-white bg-opacity-50 rounded-full mb-2 flex items-center justify-center">
                    <span className="text-sm font-bold">S</span>
                  </div>
                  <h3 className="font-medium">Safety</h3>
                  <p className="text-xs mt-1">Emergency contacts & checks</p>
                </div>
              </div>
              
              <div className="mt-4 bg-uniher-orange p-4 rounded-xl">
                <div className="w-8 h-8 bg-white bg-opacity-50 rounded-full mb-2 flex items-center justify-center">
                  <span className="text-sm font-bold">S</span>
                </div>
                <h3 className="font-medium">Social & Community</h3>
                <p className="text-xs mt-1">Connect with like-minded college girls</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-uniher-purple"></div>
                    <span className="text-sm font-medium">AI Assistant</span>
                  </div>
                  <span className="text-xs bg-uniher-purple-light text-uniher-purple-dark px-2 py-1 rounded-full">
                    Online
                  </span>
                </div>
                
                <div className="mt-2 bg-gray-50 p-3 rounded-lg text-sm">
                  How can I help you succeed today?
                </div>
              </div>
            </div>
            
            {/* Decorative dots */}
            <div className="hidden lg:block absolute -right-8 top-1/4 w-16 h-32">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-1.5 h-1.5 rounded-full bg-uniher-purple-light"
                  style={{
                    top: `${(i % 5) * 25}%`,
                    left: `${Math.floor(i / 5) * 25}%`,
                    opacity: 0.5 + (i % 3) * 0.2
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
