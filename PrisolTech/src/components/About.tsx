import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface AboutProps {
  isFullPage?: boolean;
}

const About = ({ isFullPage = false }: AboutProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.scroll-animation');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-12 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        {isFullPage && (
          <div className="text-center mb-12 md:mb-16">
            {/* <h1 className="text-4xl md:text-5xl font-bold text-prisol-dark-blue mb-4">About PrisolTech</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our journey, our values, and the expertise that makes us a leading IT solutions provider.
            </p> */}
          </div>
        )}
        
        {!isFullPage && (
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block py-1 px-3 text-sm font-medium text-prisol-blue dark:text-prisol-light-blue bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">ABOUT US</span>
            <h2 className="text-3xl md:text-4xl font-bold text-prisol-dark-blue dark:text-white mb-4">Who We Are</h2>
            <div className="w-24 h-1 bg-prisol-blue dark:bg-prisol-light-blue mx-auto"></div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
          <div className="order-2 lg:order-1">
            <div className="scroll-animation px-2 sm:px-4">
              <h3 className="text-xl md:text-2xl font-semibold text-prisol-dark-blue dark:text-white mb-4 md:mb-5">
                Your Trusted IT Solutions Partner Since 2025
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 md:mb-5 text-sm sm:text-base">
                PrisolTech is an innovative IT solutions provider based in Karur, India, established in 2025. We specialize in designing and implementing comprehensive IT solutions that enable businesses to maximize efficiency and achieve digital transformation.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6 md:mb-8 text-sm sm:text-base">
                Our team of certified professionals brings technical expertise to every project, delivering customized solutions that drive business results. Whether you're a small business or large enterprise, PrisolTech has the resources to help you succeed.
              </p>
              
              {isFullPage ? (
                <div className="space-y-4 md:space-y-6 mt-6 md:mt-8">
                  <h3 className="text-xl md:text-2xl font-semibold text-prisol-dark-blue dark:text-white">Our Mission</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    To empower businesses through innovative technology solutions that drive growth, enhance efficiency, and create competitive advantage.
                  </p>
                  
                  <h3 className="text-xl md:text-2xl font-semibold text-prisol-dark-blue dark:text-white">Our Vision</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    To be the most trusted technology partner for businesses worldwide, known for our expertise, integrity, and commitment to excellence.
                  </p>
                  
                  <h3 className="text-xl md:text-2xl font-semibold text-prisol-dark-blue dark:text-white">Our Values</h3>
                  <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    <li><span className="font-medium text-prisol-dark-blue dark:text-white">Excellence:</span> We are committed to delivering the highest quality solutions and services.</li>
                    <li><span className="font-medium text-prisol-dark-blue dark:text-white">Innovation:</span> We continuously explore new technologies and approaches to solve complex business challenges.</li>
                    <li><span className="font-medium text-prisol-dark-blue dark:text-white">Integrity:</span> We operate with transparency, honesty, and ethical business practices.</li>
                    <li><span className="font-medium text-prisol-dark-blue dark:text-white">Customer Focus:</span> We prioritize our clients' needs and success in everything we do.</li>
                    <li><span className="font-medium text-prisol-dark-blue dark:text-white">Collaboration:</span> We believe in the power of teamwork and partnership with our clients.</li>
                  </ul>
                </div>
              ) : (
                <Link to="/about">
                  <Button className="bg-prisol-blue hover:bg-prisol-dark-blue text-white font-medium px-6 sm:px-8 py-2 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Learn More
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 px-4 sm:px-6 md:px-8 mb-8 lg:mb-0">
            <div className="relative scroll-animation mx-auto max-w-md lg:max-w-none">
              <div className="absolute -top-4 -right-4 w-48 sm:w-64 h-48 sm:h-64 bg-prisol-light-blue rounded-full opacity-10 dark:opacity-20 blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="PrisolTech Team" 
                className="w-full rounded-lg shadow-xl relative z-10"
              />
              <div className="absolute -z-10 -bottom-5 sm:-bottom-10 -left-5 sm:-left-10 w-full h-full border-2 border-prisol-blue dark:border-prisol-light-blue rounded-lg"></div>
            </div>
            
            {isFullPage && (
              <div className="mt-10 md:mt-12">
                <div className="relative scroll-animation mx-auto max-w-md lg:max-w-none">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="PrisolTech Office" 
                    className="w-full rounded-lg shadow-xl mt-6 sm:mt-8 relative z-10"
                  />
                  <div className="absolute -z-10 -top-5 sm:-top-10 -right-5 sm:-right-10 w-full h-full border-2 border-prisol-blue dark:border-prisol-light-blue rounded-lg"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-20">
          <div className="scroll-animation bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="bg-blue-100 dark:bg-blue-900/40 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-prisol-blue dark:text-prisol-light-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-prisol-dark-blue dark:text-white mb-2">1+ Years</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Of Industry Experience</p>
          </div>
          
          <div className="scroll-animation bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="bg-blue-100 dark:bg-blue-900/40 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-prisol-blue dark:text-prisol-light-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-prisol-dark-blue dark:text-white mb-2">3+</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Satisfied Clients</p>
          </div>
          
          <div className="scroll-animation bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="bg-blue-100 dark:bg-blue-900/40 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-prisol-blue dark:text-prisol-light-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-prisol-dark-blue dark:text-white mb-2">3+</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Projects Completed</p>
          </div>
          
          <div className="scroll-animation bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="bg-blue-100 dark:bg-blue-900/40 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-prisol-blue dark:text-prisol-light-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-prisol-dark-blue dark:text-white mb-2">100%</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;