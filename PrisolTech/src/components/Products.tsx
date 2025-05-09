import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductsProps {
  isFullPage?: boolean;
}

const productsData = [
  {
    id: 'prisol-erp',
    title: 'PrisolERP',
    description: 'An enterprise resource planning solution that integrates all facets of business including planning, purchasing, inventory, sales, marketing, finance, and HR.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    features: [
      'Comprehensive module integration',
      'Real-time data analytics',
      'Customizable dashboards',
      'Automated reporting',
      'Mobile accessibility'
    ],
    benefits: [
      'Streamline business operations and processes',
      '40% improvement in operational efficiency',
      'Reduce manual work and eliminate data silos',
      'Enhance decision-making with real-time insights',
      'Scale your business with a unified platform'
    ],
    testimonial: {
      quote: "PrisolERP has transformed our business operations. The integrated approach has eliminated data silos and provided us with real-time insights that drive our decision-making.",
      author: "Ankit Patel",
      position: "COO, Synergy Manufacturing"
    },
    modules: [
      { name: "Finance & Accounting", description: "Manage financial transactions, accounting, budgeting, and financial reporting" },
      { name: "Supply Chain Management", description: "Optimize procurement, inventory, and distribution processes" },
      { name: "Human Resources", description: "Streamline HR processes, payroll, talent management, and employee self-service" },
      { name: "Sales & Marketing", description: "Manage leads, opportunities, campaigns, and customer relationships" },
      { name: "Manufacturing", description: "Control production planning, execution, and quality management" }
    ]
  },
  {
    id: 'prisol-crm',
    title: 'PrisolCRM',
    description: 'A customer relationship management platform that helps businesses improve customer interactions, streamline processes, and increase profitability.',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    features: [
      'Contact & lead management',
      'Sales pipeline tracking',
      'Customer service tools',
      'Marketing campaign integration',
      'Performance analytics'
    ],
    benefits: [
      'Increase customer retention by up to 27%',
      'Improve sales conversion rates by 30%',
      'Enhance customer satisfaction and loyalty',
      'Gain deep insights into customer behavior',
      'Align sales, marketing, and support teams'
    ],
    testimonial: {
      quote: "Since implementing PrisolCRM, we've seen a 35% increase in our conversion rates and a significant improvement in customer satisfaction scores. The platform's intuitive interface has made adoption across our teams seamless.",
      author: "Shreya Gupta",
      position: "Sales Director, Horizon Retail"
    },
    modules: [
      { name: "Contact Management", description: "Centralize customer data and interaction history" },
      { name: "Sales Automation", description: "Streamline sales processes and pipeline management" },
      { name: "Marketing Automation", description: "Design, execute, and track marketing campaigns" },
      { name: "Customer Service", description: "Manage support tickets and enhance customer satisfaction" },
      { name: "Analytics & Reporting", description: "Generate actionable insights from customer data" }
    ]
  },
  {
    id: 'prisol-guard',
    title: 'PrisolGuard',
    description: 'A comprehensive cybersecurity solution that protects your business from threats, detects vulnerabilities, and ensures compliance with regulations.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    features: [
      'Real-time threat detection',
      'Endpoint protection',
      'Network security monitoring',
      'Data loss prevention',
      'Compliance management'
    ],
    benefits: [
      'Reduce security incidents by up to 75%',
      'Minimize downtime from cyber attacks',
      'Protect sensitive customer and business data',
      'Ensure regulatory compliance',
      'Build trust with customers and partners'
    ],
    testimonial: {
      quote: "PrisolGuard has completely transformed our security posture. The real-time threat detection has already prevented several potential breaches, and the compliance management features have streamlined our regulatory reporting.",
      author: "Rajiv Mehta",
      position: "CISO, National Finance Bank"
    },
    modules: [
      { name: "Threat Intelligence", description: "Detect and respond to emerging threats in real-time" },
      { name: "Endpoint Security", description: "Protect all devices connecting to your network" },
      { name: "Network Defense", description: "Secure your network infrastructure against intrusions" },
      { name: "Data Protection", description: "Prevent unauthorized access and data leakage" },
      { name: "Compliance Automation", description: "Streamline regulatory compliance processes" }
    ]
  },
  {
    id: 'prisol-cloud',
    title: 'PrisolCloud',
    description: 'A unified cloud management platform that simplifies multi-cloud environments, optimizes resource utilization, and enhances security across your cloud infrastructure.',
    image: 'https://images.unsplash.com/photo-1535551951406-a19828b0a76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    features: [
      'Multi-cloud orchestration',
      'Cost optimization',
      'Automated scaling',
      'Security & compliance',
      'Performance monitoring'
    ],
    benefits: [
      'Reduce cloud spending by up to 35%',
      'Simplify management of complex cloud environments',
      'Ensure consistent security across cloud platforms',
      'Optimize resource allocation in real-time',
      'Accelerate cloud migration and adoption'
    ],
    testimonial: {
      quote: "PrisolCloud has given us unprecedented visibility and control over our multi-cloud environment. We've reduced our cloud spending by 30% while improving performance and security across our infrastructure.",
      author: "Anil Verma",
      position: "Cloud Architect, DigiTech Solutions"
    },
    modules: [
      { name: "Cloud Governance", description: "Establish policies and controls across cloud environments" },
      { name: "Cost Management", description: "Monitor and optimize cloud spending" },
      { name: "Resource Orchestration", description: "Automate provisioning and management of cloud resources" },
      { name: "Security & Compliance", description: "Enforce security policies and regulatory compliance" },
      { name: "Performance Optimization", description: "Monitor and enhance cloud application performance" }
    ]
  },
  {
    id: 'prisol-analytics',
    title: 'PrisolAnalytics',
    description: 'An advanced analytics platform that transforms raw data into actionable business insights through AI-powered analytics, data visualization, and predictive modeling.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    features: [
      'AI-powered data analysis',
      'Interactive dashboards',
      'Predictive modeling',
      'Data integration',
      'Automated reporting'
    ],
    benefits: [
      'Make data-driven decisions with confidence',
      'Identify emerging trends and opportunities',
      'Forecast business outcomes with up to 90% accuracy',
      'Democratize data access across your organization',
      'Turn complex data into clear, actionable insights'
    ],
    testimonial: {
      quote: "PrisolAnalytics has transformed how we use data. The predictive modeling capabilities have helped us anticipate market changes and stay ahead of competitors, while the interactive dashboards have made data accessible to everyone in our company.",
      author: "Neha Sharma",
      position: "Analytics Director, Global Retail Enterprises"
    },
    modules: [
      { name: "Data Integration", description: "Connect and unify data from multiple sources" },
      { name: "Advanced Analytics", description: "Apply AI and machine learning to extract insights" },
      { name: "Data Visualization", description: "Create interactive dashboards and reports" },
      { name: "Predictive Modeling", description: "Forecast trends and outcomes" },
      { name: "Data Governance", description: "Ensure data quality, security, and compliance" }
    ]
  }
];

const Products = ({ isFullPage = false }: ProductsProps) => {
  return (
    <section id="products" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {isFullPage ? (
          <div className="text-center mb-16">
            {/* <h1 className="text-4xl md:text-5xl font-bold text-prisol-dark-blue mb-4">Our Products</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our suite of innovative software solutions designed to solve specific business challenges and enhance operational efficiency.
            </p> */}
          </div>
        ) : (
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 text-sm font-medium text-prisol-blue dark:text-prisol-light-blue bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">OUR PRODUCTS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-prisol-dark-blue dark:text-white mb-4">Innovative Technology Solutions</h2>
            <div className="w-24 h-1 bg-prisol-blue dark:bg-prisol-light-blue mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
              Our proprietary software products are designed to solve specific business challenges and enhance operational efficiency.
            </p>
          </div>
        )}
        
        <div className="space-y-20">
          {productsData.slice(0, isFullPage ? productsData.length : 3).map((product, index) => (
            <div 
              key={product.id} 
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-10 items-center scroll-animation`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <div className={`absolute -z-10 ${
                    index % 2 === 0 ? '-bottom-5 -right-5' : '-bottom-5 -left-5'
                  } w-full h-full border-2 border-prisol-blue dark:border-prisol-light-blue rounded-lg`}></div>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>
              
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold text-prisol-dark-blue dark:text-white mb-4">{product.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>
                
                {!isFullPage ? (
                  <>
                    <h4 className="font-medium text-prisol-blue dark:text-prisol-light-blue mb-3">Key Features:</h4>
                    <ul className="space-y-2 mb-8">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-6 w-6 mr-2 text-prisol-blue dark:text-prisol-light-blue flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex gap-4">
                      <Link to={`/products#${product.id}`}>
                        <Button className="bg-prisol-blue hover:bg-prisol-dark-blue text-white dark:bg-blue-700 dark:hover:bg-blue-800">Learn More</Button>
                      </Link>
                      <Link to="/contact">
                        <Button variant="outline" className="border-prisol-blue text-prisol-blue hover:bg-prisol-blue hover:text-white dark:border-prisol-light-blue dark:text-prisol-light-blue dark:hover:bg-blue-800 dark:hover:text-white">
                          Request Demo
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <Tabs defaultValue="features" className="mt-6">
                    <TabsList className="mb-6">
                      <TabsTrigger value="features">Features</TabsTrigger>
                      <TabsTrigger value="benefits">Benefits</TabsTrigger>
                      <TabsTrigger value="modules">Modules</TabsTrigger>
                    </TabsList>
                    <TabsContent value="features">
                      <h4 className="font-medium text-prisol-blue dark:text-prisol-light-blue mb-3">Key Features:</h4>
                      <ul className="space-y-2 mb-8">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="h-6 w-6 mr-2 text-prisol-blue dark:text-prisol-light-blue flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="benefits">
                      <h4 className="font-medium text-prisol-blue dark:text-prisol-light-blue mb-3">Key Benefits:</h4>
                      <ul className="space-y-2 mb-8">
                        {product.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="h-6 w-6 mr-2 text-prisol-blue dark:text-prisol-light-blue flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="modules">
                      <h4 className="font-medium text-prisol-blue dark:text-prisol-light-blue mb-3">Product Modules:</h4>
                      <div className="space-y-4 mb-8">
                        {product.modules.map((module, i) => (
                          <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 dark:bg-gray-800">
                            <h5 className="font-medium text-prisol-dark-blue dark:text-white">{module.name}</h5>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{module.description}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                )}

                {isFullPage && (
                  <>  
                    <div className="flex gap-4 mt-6">
                      <Link to="/contact">
                        <Button className="bg-prisol-blue hover:bg-prisol-dark-blue text-white dark:bg-blue-700 dark:hover:bg-blue-800">Request Demo</Button>
                      </Link>
                      <Button variant="outline" className="border-prisol-blue text-prisol-blue hover:bg-prisol-blue hover:text-white dark:border-prisol-light-blue dark:text-prisol-light-blue dark:hover:bg-blue-800 dark:hover:text-white">
                        Download Brochure
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {!isFullPage && productsData.length > 3 && (
          <div className="mt-16 text-center">
            <Link to="/products">
              <Button className="bg-prisol-blue hover:bg-prisol-dark-blue text-white font-medium px-8 py-6 text-lg dark:bg-blue-700 dark:hover:bg-blue-800">
                View All Products
              </Button>
            </Link>
          </div>
        )}
        
        {isFullPage && (
          <div className="mt-20 bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-prisol-dark-blue dark:text-white mb-4 text-center">Custom Solutions</h3>
            <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
              Need a tailored solution for your specific business requirements? Our team can customize any of our products to meet your unique needs or develop a completely new solution from scratch.
            </p>
            <div className="flex justify-center">
              <Link to="/contact">
                <Button className="bg-prisol-blue hover:bg-prisol-dark-blue text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                  Contact Us for Custom Development
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
