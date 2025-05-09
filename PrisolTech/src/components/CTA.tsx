import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAIAssistant } from './AIAssistant/AIAssistantContext';

const CTA = () => {
  const { openAIAssistant } = useAIAssistant();
  
  return (
    <section className="py-16 bg-prisol-blue dark:bg-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to transform your IT infrastructure?</h2>
            <p className="text-lg text-blue-100 max-w-2xl">
              Partner with PrisolTech for innovative solutions that drive business growth and operational excellence.
            </p>
          </div>
          
          <div className="flex gap-4">
            <Link to="/contact">
              <Button className="bg-white text-prisol-blue hover:bg-blue-50 font-medium px-8 py-6 text-lg dark:bg-gray-100 dark:text-blue-900 dark:hover:bg-white">
                Get Started
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 font-medium px-8 py-6 text-lg"
              onClick={openAIAssistant}
            >
              Chat With AI Assistant
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <div className="text-white text-lg font-semibold mb-2">Schedule a Consultation</div>
            <p className="text-blue-100 mb-4">
              Book a free consultation with our experts to discuss your IT challenges and potential solutions.
            </p>
            <Link to="/contact">
              <Button variant="link" className="text-white p-0 hover:text-blue-200">
                Book Now →
              </Button>
            </Link>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <div className="text-white text-lg font-semibold mb-2">Request a Quote</div>
            <p className="text-blue-100 mb-4">
              Get a detailed quote for your project or ongoing IT service requirements.
            </p>
            <Link to="/contact">
              <Button variant="link" className="text-white p-0 hover:text-blue-200">
                Request Quote →
              </Button>
            </Link>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <div className="text-white text-lg font-semibold mb-2">Join Our Newsletter</div>
            <p className="text-blue-100 mb-4">
              Stay updated with the latest technology trends and PrisolTech news.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/20 text-white placeholder:text-blue-200 rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-prisol-blue px-4 py-2 rounded-r-md hover:bg-blue-50 transition-colors dark:bg-gray-100 dark:text-blue-900 dark:hover:bg-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
