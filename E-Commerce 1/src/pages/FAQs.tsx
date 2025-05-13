
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-natural-gradient py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white text-center mb-4 animate-fade-in">Frequently Asked Questions</h1>
            <p className="text-center text-white/80 max-w-2xl mx-auto animate-fade-in">
              Find answers to common questions about shopping with PriSona Mart, our delivery service, return policies, and more.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border shadow-md p-6 -mt-8 relative z-10">
            <div className="mb-6 p-4 bg-natural-cream rounded-lg">
              <h2 className="text-xl font-medium text-green-700 mb-2">Have a question we haven't answered?</h2>
              <p className="text-gray-600">
                Contact our support team at <span className="font-medium text-green-600">support@prisonamart.com</span> or call us at <span className="font-medium text-green-600">(555) 123-4567</span>.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-gray-200 rounded-lg overflow-hidden faq-card">
                <AccordionTrigger className="text-lg font-medium px-4 py-3 hover:text-green-600">How do I place an order?</AccordionTrigger>
                <AccordionContent className="text-gray-600 px-4 pb-4">
                  <p>You can place an order by browsing our products, adding items to your cart, 
                  and proceeding to checkout. Make sure you're logged in to your account to complete the purchase.</p>
                  
                  <div className="mt-3 p-3 bg-green-50 rounded-md border border-green-100">
                    <p className="text-sm text-green-700">Pro tip: Save your favorite items for faster shopping next time!</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border border-gray-200 rounded-lg overflow-hidden faq-card">
                <AccordionTrigger className="text-lg font-medium px-4 py-3 hover:text-green-600">What payment methods do you accept?</AccordionTrigger>
                <AccordionContent className="text-gray-600 px-4 pb-4">
                  <p>PriSona Mart accepts:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Credit/debit cards (Visa, Mastercard, Amex)</li>
                    <li>Digital wallets (Apple Pay, Google Pay)</li>
                    <li>Cash on delivery (select locations)</li>
                    <li>PriSona Wallet credit</li>
                  </ul>
                  <p className="mt-2">All payment information is securely processed with industry-standard encryption.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border border-gray-200 rounded-lg overflow-hidden faq-card">
                <AccordionTrigger className="text-lg font-medium px-4 py-3 hover:text-green-600">How long does delivery take?</AccordionTrigger>
                <AccordionContent className="text-gray-600 px-4 pb-4">
                  <p>Delivery times vary depending on your location:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="p-3 bg-natural-cream rounded-md">
                      <h4 className="font-medium text-green-700">Standard Delivery</h4>
                      <p className="text-sm mt-1">1-3 business days</p>
                    </div>
                    <div className="p-3 bg-natural-cream rounded-md">
                      <h4 className="font-medium text-orange-500">Express Delivery</h4>
                      <p className="text-sm mt-1">Same day or next day</p>
                    </div>
                  </div>
                  <p className="mt-3">Express delivery options are available at checkout for an additional fee.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border border-gray-200 rounded-lg overflow-hidden faq-card">
                <AccordionTrigger className="text-lg font-medium px-4 py-3 hover:text-green-600">Can I return items?</AccordionTrigger>
                <AccordionContent className="text-gray-600 px-4 pb-4">
                  <p>Yes, you can return items within 7 days of delivery if they're damaged or incorrect. 
                  Perishable items must be reported within 24 hours of delivery.</p>
                  
                  <div className="mt-3 flex items-start">
                    <div className="bg-orange-100 text-orange-600 p-1 rounded-full mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm">Contact our customer service team within the return window to initiate a return.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="border border-gray-200 rounded-lg overflow-hidden faq-card">
                <AccordionTrigger className="text-lg font-medium px-4 py-3 hover:text-green-600">How do I become a seller?</AccordionTrigger>
                <AccordionContent className="text-gray-600 px-4 pb-4">
                  <p>To become a seller:</p>
                  <ol className="list-decimal pl-5 mt-2 space-y-2">
                    <li>Register an account as a shop owner</li>
                    <li>Complete your business profile</li>
                    <li>Submit required documentation</li>
                    <li>Wait for approval from our administrators</li>
                    <li>Once approved, you can list your products and start selling</li>
                  </ol>
                  <div className="mt-3 p-3 bg-natural-moss/20 rounded-md">
                    <p className="text-sm font-medium">Ready to become a vendor? <a href="/register?role=admin" className="text-green-600 underline hover:text-green-700">Register here</a></p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6" className="border border-gray-200 rounded-lg overflow-hidden faq-card">
                <AccordionTrigger className="text-lg font-medium px-4 py-3 hover:text-green-600">Are there any membership options?</AccordionTrigger>
                <AccordionContent className="text-gray-600 px-4 pb-4">
                  <p>We offer a premium membership program called PriSona Premium that provides:</p>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Free delivery on all orders
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Exclusive discounts (up to 15% off)
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Early access to special promotions
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Priority customer service
                    </li>
                  </ul>
                  <p className="mt-3 font-medium">Premium membership costs just $9.99/month or $99/year.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7" className="border border-gray-200 rounded-lg overflow-hidden faq-card">
                <AccordionTrigger className="text-lg font-medium px-4 py-3 hover:text-green-600">How can I track my order?</AccordionTrigger>
                <AccordionContent className="text-gray-600 px-4 pb-4">
                  <p>Once your order is shipped, you'll receive a tracking number via email. You can also view your order status in your account dashboard under "My Orders."</p>
                  <div className="mt-3 p-3 border-l-4 border-green-500 bg-green-50">
                    <p className="text-sm">Our mobile app offers real-time delivery tracking with live map updates!</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8" className="border border-gray-200 rounded-lg overflow-hidden faq-card">
                <AccordionTrigger className="text-lg font-medium px-4 py-3 hover:text-green-600">Do you offer organic products?</AccordionTrigger>
                <AccordionContent className="text-gray-600 px-4 pb-4">
                  <p>Yes! We have a wide range of certified organic products from local and national vendors. Look for the "Organic" label or filter products by selecting the Organic category.</p>
                  
                  <div className="mt-3 flex">
                    <div className="bg-natural-moss/30 p-2 rounded-md flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15 4.414a1 1 0 01.707 1.707L15 6.828l.707.707a1 1 0 01-1.414 1.414L14 8.242l-.707.707a1 1 0 01-1.414-1.414L12.586 7l-.707-.707a1 1 0 010-1.414l.707-.707a1 1 0 01.707-.293zm2 8a1 1 0 110 2H9a1 1 0 110-2h5z" clipRule="evenodd" />
                      </svg>
                      All our organic products are verified and certified
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;
