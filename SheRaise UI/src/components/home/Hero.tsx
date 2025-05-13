
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-28">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-sherise-purple-dark sm:text-4xl md:text-5xl lg:text-6xl">
                Empowering Young Women to Rise and Thrive
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                A safe, supportive platform with tools for personal growth, mentorship, mental wellbeing, and more—completely free and accessible to all.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-sherise-purple text-white hover:bg-sherise-purple-dark">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-sherise-purple text-sherise-purple hover:bg-sherise-purple/5">
                Learn More
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-6">
              <div className="flex items-center">
                <div className="mr-1 size-4 rounded-full bg-sherise-pink/60" />
                Free Access
              </div>
              <div className="flex items-center">
                <div className="mr-1 size-4 rounded-full bg-sherise-blue/60" />
                Mobile Friendly
              </div>
              <div className="flex items-center">
                <div className="mr-1 size-4 rounded-full bg-sherise-peach/60" />
                Multilingual
              </div>
            </div>
          </div>
          <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover bg-gradient-to-br from-sherise-pink/30 to-sherise-purple/30 shadow-lg flex items-center justify-center">
            <div className="w-4/5 h-4/5 bg-white/80 backdrop-blur-sm rounded-lg shadow-md flex items-center justify-center p-6">
              <div className="text-center">
                <p className="text-sherise-purple font-semibold text-lg mb-2">SheRise Platform Preview</p>
                <p className="text-sm text-gray-600">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
