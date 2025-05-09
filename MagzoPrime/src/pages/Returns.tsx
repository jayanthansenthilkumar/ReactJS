import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Card, CardContent } from '../components/ui/card';
import { ChevronRight, RefreshCw, AlertCircle, Check, X } from 'lucide-react';

const Returns = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="bg-primary/10 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Returns & Refunds</h1>
              <p className="text-muted-foreground mb-6">
                Our hassle-free return policy ensures your satisfaction with every purchase
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-foreground">Returns & Refunds</span>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Return Process Overview */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold mb-6">Return Process</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                        <span className="text-primary font-medium">1</span>
                      </div>
                      <h3 className="font-medium mb-2">Request a Return</h3>
                      <p className="text-sm text-muted-foreground">
                        Log into your account and select the order containing the item(s) you wish to return.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                        <span className="text-primary font-medium">2</span>
                      </div>
                      <h3 className="font-medium mb-2">Ship Your Return</h3>
                      <p className="text-sm text-muted-foreground">
                        Print the prepaid return label and ship your item(s) back to us within 14 days.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                        <span className="text-primary font-medium">3</span>
                      </div>
                      <h3 className="font-medium mb-2">Receive Your Refund</h3>
                      <p className="text-sm text-muted-foreground">
                        Once we receive your return, your refund will be processed within 5-7 business days.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="bg-muted p-6 rounded-lg flex">
                  <RefreshCw className="h-5 w-5 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-2">30-Day Return Policy</h3>
                    <p className="text-sm text-muted-foreground">
                      We offer a 30-day return window for most items. To be eligible for a return, your item must be 
                      unused and in the same condition that you received it. It must also be in the original packaging.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Return Eligibility */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold mb-6">Return Eligibility</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      Items Eligible for Return
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-600 mr-2 mt-1" />
                        <span>Books in original condition with no damage, markings, or wear</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-600 mr-2 mt-1" />
                        <span>Items in original packaging</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-600 mr-2 mt-1" />
                        <span>Defective or damaged items received</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-600 mr-2 mt-1" />
                        <span>Incorrect items shipped</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-green-600 mr-2 mt-1" />
                        <span>Gift items (with gift receipt)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <X className="h-5 w-5 text-red-600 mr-2" />
                      Items Not Eligible for Return
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <X className="h-4 w-4 text-red-600 mr-2 mt-1" />
                        <span>Digital products and e-books</span>
                      </li>
                      <li className="flex items-start">
                        <X className="h-4 w-4 text-red-600 mr-2 mt-1" />
                        <span>Books with visible use, damage, or markings</span>
                      </li>
                      <li className="flex items-start">
                        <X className="h-4 w-4 text-red-600 mr-2 mt-1" />
                        <span>Items returned after 30 days</span>
                      </li>
                      <li className="flex items-start">
                        <X className="h-4 w-4 text-red-600 mr-2 mt-1" />
                        <span>Special order or personalized items</span>
                      </li>
                      <li className="flex items-start">
                        <X className="h-4 w-4 text-red-600 mr-2 mt-1" />
                        <span>Items marked as final sale or clearance</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-amber-800 mb-2">Special Circumstances</h3>
                      <p className="text-sm text-amber-700">
                        If you've received a damaged or defective item, or if there's a problem with your order 
                        that doesn't fall under our standard return policy, please contact our customer service 
                        team within 7 days of delivery. We're committed to resolving any issues and ensuring 
                        your satisfaction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Refund FAQs */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold mb-6">Refund FAQs</h2>
                
                <Accordion type="single" collapsible className="mb-8">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How long will it take to receive my refund?</AccordionTrigger>
                    <AccordionContent>
                      Once we receive your returned item, we'll process your refund within 5-7 business days. 
                      Depending on your payment method and financial institution, it may take an additional 
                      3-10 business days for the refund to appear in your account.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Will I be refunded for shipping costs?</AccordionTrigger>
                    <AccordionContent>
                      Original shipping charges are non-refundable except in cases where we shipped an incorrect 
                      or defective item. Return shipping costs are covered by us through our prepaid return label.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I exchange an item instead of returning it?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can exchange items of equal value. Simply select the "Exchange" option when 
                      initiating your return through your account. If you're exchanging for an item of 
                      different value, we'll refund or charge the difference accordingly.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>What if I received a gift? Can I return it?</AccordionTrigger>
                    <AccordionContent>
                      Yes, gifts can be returned with a gift receipt. The refund will be issued as store 
                      credit to the gift recipient, and the original purchaser will not be notified.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Need more information about returns or have a specific question?
                  </p>
                  <Button asChild>
                    <Link to="/contact">Contact Customer Service</Link>
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

export default Returns;
