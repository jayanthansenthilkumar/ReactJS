import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { ChevronRight, Truck, Clock, CreditCard, Globe, AlertCircle } from 'lucide-react';

const Shipping = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="bg-primary/10 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Shipping Information</h1>
              <p className="text-muted-foreground mb-6">
                Everything you need to know about our shipping policies and delivery options
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-foreground">Shipping</span>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Shipping options */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold mb-6">Shipping Options</h2>
                
                <Card className="mb-8">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Shipping Method</TableHead>
                          <TableHead>Delivery Time</TableHead>
                          <TableHead>Cost</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Standard Shipping</TableCell>
                          <TableCell>3-5 business days</TableCell>
                          <TableCell>
                            $4.99 (Free on orders over $35)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Express Shipping</TableCell>
                          <TableCell>1-2 business days</TableCell>
                          <TableCell>$9.99</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Next Day Delivery</TableCell>
                          <TableCell>Next business day</TableCell>
                          <TableCell>$14.99</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">International Shipping</TableCell>
                          <TableCell>7-14 business days</TableCell>
                          <TableCell>Starting at $12.99</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex">
                    <div className="mr-4 mt-1">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Free Shipping</h3>
                      <p className="text-sm text-muted-foreground">
                        We offer free standard shipping on all orders over $35 within the continental United States.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 mt-1">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Processing Time</h3>
                      <p className="text-sm text-muted-foreground">
                        Orders are typically processed within 1-2 business days before shipping.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 mt-1">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">International Orders</h3>
                      <p className="text-sm text-muted-foreground">
                        We ship to over 100 countries worldwide. International shipping rates and delivery times vary by location.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 mt-1">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Duties & Taxes</h3>
                      <p className="text-sm text-muted-foreground">
                        International customers may be subject to import duties and taxes which are collected upon delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tracking info */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold mb-6">Order Tracking</h2>
                <p className="mb-4">
                  You can track your order at any time by:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Logging into your account and visiting the "Orders" section</li>
                  <li>Using the tracking link provided in your shipping confirmation email</li>
                  <li>Contacting our customer service team with your order number</li>
                </ul>
                
                <div className="bg-muted p-6 rounded-lg flex">
                  <AlertCircle className="h-5 w-5 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-2">Delivery Delays</h3>
                    <p className="text-sm text-muted-foreground">
                      During peak seasons or adverse weather conditions, deliveries may experience delays. 
                      We appreciate your patience and will keep you updated on any significant changes to 
                      your estimated delivery date.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Shipping policy */}
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6">Shipping Policy</h2>
                <div className="space-y-4">
                  <p>
                    Magzo Prime strives to provide reliable and efficient shipping services to all our customers. 
                    Our shipping partners include USPS, FedEx, and UPS, selected based on delivery location and 
                    shipping method.
                  </p>
                  <p>
                    All orders are processed and shipped from our main warehouse located in Chicago, IL. 
                    For certain items marked as "Ships from Publisher," please allow for additional processing time.
                  </p>
                  <p>
                    Delivery dates are estimates and not guaranteed. In the rare event that a package is lost 
                    or damaged during transit, please contact our customer support team within 30 days of the 
                    estimated delivery date.
                  </p>
                  <p>
                    For more information about our shipping policies or to inquire about a specific order, 
                    please don't hesitate to <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
                  </p>
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

export default Shipping;
