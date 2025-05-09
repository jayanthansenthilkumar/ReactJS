import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ChevronRight, Book, Truck, RefreshCw, Phone, Mail } from 'lucide-react';

const Help = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="bg-primary/10 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Help Center</h1>
              <p className="text-muted-foreground mb-6">
                Find answers to your questions and get the support you need
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-foreground">Help Center</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quick links section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold mb-8 text-center">How Can We Help?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Book className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-medium mb-2">Orders & Purchases</h3>
                  <Link to="/help#orders" className="text-primary hover:underline text-sm">
                    View FAQs
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Truck className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-medium mb-2">Shipping & Delivery</h3>
                  <Link to="/shipping" className="text-primary hover:underline text-sm">
                    Learn More
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <RefreshCw className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-medium mb-2">Returns & Refunds</h3>
                  <Link to="/returns" className="text-primary hover:underline text-sm">
                    View Policy
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Phone className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-medium mb-2">Contact Support</h3>
                  <Link to="/contact" className="text-primary hover:underline text-sm">
                    Get in Touch
                  </Link>
                </CardContent>
              </Card>
            </div>
            
            {/* FAQs */}
            <div className="max-w-3xl mx-auto" id="orders">
              <h2 className="text-2xl font-serif font-bold mb-6">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="mb-8">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I track my order?</AccordionTrigger>
                  <AccordionContent>
                    You can track your order by logging into your account and visiting the "Orders" section. 
                    You'll find tracking information and delivery status for all your recent purchases.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay.
                    For certain promotions, we also accept store credit and gift cards.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I change or cancel my order?</AccordionTrigger>
                  <AccordionContent>
                    You can modify or cancel your order within 1 hour of placing it. After this window, 
                    please contact our customer support team for assistance.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>How long will shipping take?</AccordionTrigger>
                  <AccordionContent>
                    Standard shipping typically takes 3-5 business days within the continental US.
                    Express shipping options (1-2 business days) are available for an additional fee.
                    International shipping times vary by destination.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>What is your return policy?</AccordionTrigger>
                  <AccordionContent>
                    We offer a 30-day return policy for most items. Books must be in their original condition
                    with no damage or markings. Please visit our Returns page for complete details and to
                    initiate a return.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Still have questions?</h3>
                <p className="text-muted-foreground mb-4">
                  Our customer support team is here to help. Get in touch with us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Mail className="h-4 w-4" />
                    support@magzoprime.com
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
