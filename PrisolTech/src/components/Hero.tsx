import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAIAssistant } from './AIAssistant/AIAssistantContext';

const Hero = () => {
  const { openAIAssistant } = useAIAssistant();
  
  return (
    <section id="home" className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-prisol-light-blue rounded-full opacity-10 blur-3xl dark:opacity-20"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-prisol-blue rounded-full opacity-10 blur-3xl dark:opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-prisol-dark-blue dark:text-white leading-tight mb-6">
            Crafting Digital <span className="text-prisol-blue">Experiences</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto lg:mx-0">
            Innovate. Disrupt. Elevate. We transform business challenges into technological opportunities that set you apart in today's competitive landscape.
          </p>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0">
            Your Vision, Our Code. With expertise in custom solutions and emerging technologies, we bring your ideas to life through powerful, scalable systems built for the future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link to="/services">
              <Button className="bg-prisol-blue hover:bg-prisol-dark-blue text-white font-medium px-8 py-6 text-lg">
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-prisol-blue text-prisol-blue hover:bg-prisol-blue hover:text-white font-medium px-8 py-6 text-lg dark:border-prisol-light-blue dark:text-white dark:hover:bg-prisol-blue">
                Contact Us
              </Button>
            </Link>
          </div>
          <div className="mt-8">
            <Button 
              onClick={openAIAssistant}
              variant="ghost" 
              className="text-prisol-blue hover:bg-blue-50 font-medium flex items-center dark:text-prisol-light-blue dark:hover:bg-blue-900/20"
            >
              <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Need help navigating? Ask Prisona AI
            </Button>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-prisol-blue rounded-full opacity-10 blur-3xl dark:opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Digital Transformation Solutions" 
              className="w-full rounded-lg shadow-2xl relative z-10"
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
        <a href="#about" className="flex flex-col items-center text-prisol-blue dark:text-prisol-light-blue animate-bounce">
          <span className="text-sm mb-1">Learn More</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16L6 10L7.41 8.59L12 13.17L16.59 8.59L18 10L12 16Z" fill="currentColor"/>
          </svg>
        </a>
      </div>
      
      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5 rounded-lg shadow-lg flex flex-col items-center text-center">
            <div className="text-prisol-blue dark:text-prisol-light-blue font-bold text-xl md:text-3xl mb-1">1+</div>
            <div className="text-gray-700 dark:text-gray-300 text-sm md:text-base">Years Experience</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5 rounded-lg shadow-lg flex flex-col items-center text-center">
            <div className="text-prisol-blue dark:text-prisol-light-blue font-bold text-xl md:text-3xl mb-1">5</div>
            <div className="text-gray-700 dark:text-gray-300 text-sm md:text-base">Clients</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5 rounded-lg shadow-lg flex flex-col items-center text-center">
            <div className="text-prisol-blue dark:text-prisol-light-blue font-bold text-xl md:text-3xl mb-1">3</div>
            <div className="text-gray-700 dark:text-gray-300 text-sm md:text-base">Projects Completed</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5 rounded-lg shadow-lg flex flex-col items-center text-center">
            <div className="text-prisol-blue dark:text-prisol-light-blue font-bold text-xl md:text-3xl mb-1">10</div>
            <div className="text-gray-700 dark:text-gray-300 text-sm md:text-base">IT Experts</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
