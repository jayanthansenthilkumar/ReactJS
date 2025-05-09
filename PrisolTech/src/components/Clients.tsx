import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ClientsProps {
  isFullPage?: boolean;
}

const clientsData = [
  {
    name: 'Eco CoCo Jiffy',
    logo: 'images/client1.png',
  },
];

const testimonialsData = [
  {
    content: "PrisolTech transformed our IT infrastructure completely. Their team's expertise and dedication helped us modernize our systems and improve operational efficiency significantly. We've seen a 30% reduction in IT-related issues since partnering with them.",
    author: "Senthilkumar G",
    position: "Srijai Ladies Tailors"
  },
  {
    content: "Working with PrisolTech on our cloud migration was a game-changer. Their methodical approach ensured zero downtime during the transition, and the ongoing support has been exemplary. Our team can now focus on innovation rather than infrastructure management.",
    author: "Kiruthivarma S",
    position: "Co-Founder, Thinkloop AI"
  },
  {
    content: "The cybersecurity solutions implemented by PrisolTech have strengthened our security posture tremendously. Their proactive monitoring has prevented several potential incidents, and their team is always responsive and knowledgeable when we need assistance.",
    author: "Stalinbabu R",
    position: "AP/AIML, MKCE"
  },
  {
    content: "We engaged PrisolTech for a complete digital transformation initiative, and the results have exceeded our expectations. Their strategic approach and technical expertise have helped us achieve our business objectives ahead of schedule.",
    author: "Kalaiarasan K",
    position: "Head/TIH, MKCE"
  },
  {
    content: "PrisolTech's custom software development team delivered an exceptional solution that perfectly addressed our unique business requirements. The application has streamlined our operations and provided significant ROI within just six months.",
    author: "Raj Kumar R",
    position: "ECO CoCo Jiffy, Tiruchirappalli"
  },
  {
    content: "The implementation of PrisolERP has revolutionized how we manage our business processes. The system's integration capabilities and real-time analytics have given us unprecedented visibility into our operations and helped drive strategic decisions.",
    author: "Jaganath M",
    position: "AP/AIDS, MKCE"
  },
];

const caseStudies = [
  {
    title: "Cloud Migration for Leading Financial Institution",
    client: "National Banking Services",
    industry: "Finance",
    challenge: "The client needed to migrate their legacy systems to a cloud platform to improve scalability, reduce costs, and enhance security, all without disrupting daily operations.",
    solution: "PrisolTech implemented a phased cloud migration strategy using AWS, including thorough planning, pilot migrations, comprehensive testing, and employee training. We also implemented advanced security measures and continuous monitoring.",
    results: [
      "45% reduction in IT infrastructure costs",
      "99.99% system availability post-migration",
      "60% faster deployment of new applications",
      "Enhanced security posture with real-time threat detection"
    ],
    image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    title: "Digital Transformation for Healthcare Provider",
    client: "Sunrise Healthcare",
    industry: "Healthcare",
    challenge: "The client was struggling with outdated systems that hindered patient care, created data silos, and resulted in inefficient operations across their network of facilities.",
    solution: "PrisolTech designed and implemented a comprehensive digital transformation strategy, including integrated healthcare information systems, telehealth capabilities, data analytics, and mobile applications for both providers and patients.",
    results: [
      "35% improvement in patient satisfaction scores",
      "40% reduction in administrative workload",
      "25% increase in operational efficiency",
      "Enhanced care coordination across multiple facilities"
    ],
    image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    title: "Cybersecurity Overhaul for Manufacturing Company",
    client: "Precision Manufacturing Ltd",
    industry: "Manufacturing",
    challenge: "Following a security breach, the client needed to completely overhaul their cybersecurity infrastructure to protect sensitive intellectual property and operational technology systems.",
    solution: "PrisolTech implemented a multi-layered security approach including network segmentation, endpoint protection, OT security, threat intelligence, employee training, and 24/7 security monitoring.",
    results: [
      "Zero security breaches since implementation",
      "90% reduction in unauthorized access attempts",
      "Achieved compliance with industry security standards",
      "Enhanced protection of intellectual property"
    ],
    image: "https://images.unsplash.com/photo-1581091224003-01e7c2e69f5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

const Clients = ({ isFullPage = false }: ClientsProps) => {
  return (
    <section id="clients" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {isFullPage ? (
          <div className="text-center mb-16">
          </div>
        ) : (
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 text-sm font-medium text-prisol-blue dark:text-prisol-light-blue bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">OUR CLIENTS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-prisol-dark-blue dark:text-white mb-4">Trusted by Leading Companies</h2>
            <div className="w-24 h-1 bg-prisol-blue dark:bg-prisol-light-blue mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
              We've had the pleasure of working with a diverse range of clients across various industries, helping them achieve their technology goals.
            </p>
          </div>
        )}
        
        {!isFullPage && (
          <div className="flex justify-center mb-20">
            {clientsData.length === 1 ? (
              <div className="scroll-animation flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 max-w-xs">
                <img src={clientsData[0].logo} alt={clientsData[0].name} className="max-h-16" />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {clientsData.slice(0, 6).map((client, index) => (
                  <div key={index} className="scroll-animation flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                    <img src={client.logo} alt={client.name} className="max-h-16" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-prisol-dark-blue dark:text-white mb-4">What Our Clients Say</h3>
          <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            Don't just take our word for it. Here's what our clients have to say about their experiences working with PrisolTech.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.slice(0, isFullPage ? 6 : 3).map((testimonial, index) => (
            <div key={index} className="scroll-animation">
              <Card className="h-full border-none dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <svg className="h-8 w-8 text-prisol-blue dark:text-prisol-light-blue" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic">{testimonial.content}</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-prisol-blue dark:bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.author.split(' ')[0][0]}{testimonial.author.split(' ')[1][0]}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-prisol-dark-blue dark:text-white">{testimonial.author}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
