import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ServicesProps {
  isFullPage?: boolean;
}

const servicesData = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: 'IT Infrastructure Solutions',
    description: 'Comprehensive design, implementation, and management of reliable IT infrastructure including networks, servers, storage, and virtualization.',
    features: [
      'Network Design & Implementation',
      'Server & Storage Solutions',
      'Virtualization Services',
      'Infrastructure Monitoring',
      'Backup & Disaster Recovery'
    ]},
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Cybersecurity Services',
    description: 'Protection of your digital assets with comprehensive security solutions that safeguard against threats and ensure compliance.',
    features: [
      'Security Assessment & Auditing',
      'Endpoint Protection',
      'Network Security',
      'Data Protection & Encryption',
      'Security Training & Awareness'
    ]},
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: 'Cloud Services',
    description: 'Strategic cloud solutions that enhance agility, scalability, and provide anywhere, anytime access to your business applications and data.',
    features: [
      'Cloud Migration & Implementation',
      'AWS & Azure Solutions',
      'SaaS Implementation',
      'Private & Hybrid Cloud',
      'Cloud Security & Management'
    ]},
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Managed IT Services',
    description: 'Proactive management and support of your IT environment to optimize performance, minimize downtime, and reduce operational costs.',
    features: [
      '24/7 System Monitoring',
      'Help Desk Support',
      'Patch Management',
      'Hardware & Software Management',
      'IT Strategic Planning'
    ]},
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    title: 'Digital Transformation',
    description: 'Strategic guidance and implementation of digital technologies that transform business processes and enhance customer experiences.',
    features: [
      'Business Process Automation',
      'Digital Workplace Solutions',
      'Customer Experience Enhancement',
      'Data Analytics & Insights',
      'IoT Implementation'
    ]},
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Custom Software Development',
    description: 'Tailored software solutions designed to address your specific business challenges and streamline operations.',
    features: [
      'Custom Application Development',
      'Web & Mobile Applications',
      'API Development & Integration',
      'Software Testing & QA',
      'Application Maintenance & Support'
    ]},
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: 'IT Consulting & Strategy',
    description: 'Expert guidance to align your technology investments with business objectives and optimize your IT resource allocation.',
    features: [
      'IT Roadmap Development',
      'Technology Assessment',
      'Digital Strategy Consulting',
      'IT Governance & Compliance',
      'Vendor Selection & Management'
    ]},
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    title: 'Data Management & Analytics',
    description: 'Comprehensive solutions to collect, store, analyze, and visualize data for improved business intelligence and decision-making.',
    features: [
      'Data Warehousing',
      'Business Intelligence',
      'Big Data Solutions',
      'Predictive Analytics',
      'Data Visualization'
    ]},
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'AI & Automation Solutions',
      description: 'Intelligent automation solutions that leverage AI, ML, and RPA to improve efficiency, reduce manual workload, and enable smart decision-making.',
      features: [
        'AI-Powered Chatbots',
        'Robotic Process Automation (RPA)',
        'Machine Learning Models',
        'Intelligent Workflow Automation',
        'AI Integration with Existing Systems'
      ]
    }
];

const Services = ({ isFullPage = false }: ServicesProps) => {
  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {isFullPage ? (
          <div className="text-center mb-16">
            {/* <h1 className="text-4xl md:text-5xl font-bold text-prisol-dark-blue mb-4">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of IT solutions designed to help your business thrive in today's digital landscape.
            </p> */}
          </div>
        ) : (
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 text-sm font-medium text-prisol-blue dark:text-prisol-light-blue bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">OUR SERVICES</span>
            <h2 className="text-3xl md:text-4xl font-bold text-prisol-dark-blue dark:text-white mb-4">What We Offer</h2>
            <div className="w-24 h-1 bg-prisol-blue dark:bg-prisol-light-blue mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
              Comprehensive IT solutions designed to help your business thrive in today's technology-driven world.
              Our expert team delivers tailored services to meet your unique needs.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.slice(0, isFullPage ? servicesData.length : 6).map((service, index) => (
            <div key={index} className="scroll-animation">
              <Card className="h-full hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <CardHeader>
                  <div className="text-prisol-blue dark:text-prisol-light-blue mb-4">{service.icon}</div>
                  <CardTitle className="text-xl font-semibold text-prisol-dark-blue dark:text-white">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg className="h-4 w-4 mr-2 text-prisol-blue dark:text-prisol-light-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        {!isFullPage && (
          <div className="mt-12 text-center">
            <Link to="/services">
              <Button className="bg-prisol-blue hover:bg-prisol-dark-blue text-white font-medium px-8 py-6 text-lg dark:bg-blue-700 dark:hover:bg-blue-800">
                View All Services
              </Button>
            </Link>
          </div>
        )}
        
        {isFullPage && (
          <div className="mt-20">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-prisol-dark-blue dark:text-white mb-4">Need a Customized Solution?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We understand that every business has unique challenges and requirements. Our team of experts can work with you to develop a tailored solution that addresses your specific needs and helps you achieve your business objectives.
              </p>
              <Link to="/contact">
                <Button className="bg-prisol-blue hover:bg-prisol-dark-blue text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                  Contact Us for Custom Solutions
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
