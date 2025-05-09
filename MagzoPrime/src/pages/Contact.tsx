import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send 
} from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Your message has been sent! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="bg-primary/10 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Contact Us</h1>
              <p className="text-muted-foreground mb-6">
                Have questions, feedback, or need assistance? We're here to help!
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-foreground">Contact</span>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact information */}
                <div className="lg:col-span-1">
                  <h2 className="text-2xl font-serif font-bold mb-6">Get In Touch</h2>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex">
                          <div className="rounded-full bg-primary/10 p-3 mr-4">
                            <Phone className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">Phone</h3>
                            <p className="text-muted-foreground">+1 (800) 555-2398</p>
                            <p className="text-sm text-muted-foreground mt-1">Monday-Friday 9AM-6PM EST</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex">
                          <div className="rounded-full bg-primary/10 p-3 mr-4">
                            <Mail className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">Email</h3>
                            <p className="text-muted-foreground">support@magzoprime.com</p>
                            <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex">
                          <div className="rounded-full bg-primary/10 p-3 mr-4">
                            <MapPin className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">Address</h3>
                            <p className="text-muted-foreground">
                              123 Book Avenue<br />
                              Chicago, IL 60601<br />
                              United States
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex">
                          <div className="rounded-full bg-primary/10 p-3 mr-4">
                            <Clock className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">Business Hours</h3>
                            <div className="text-sm text-muted-foreground">
                              <p>Monday-Friday: 9:00 AM - 6:00 PM</p>
                              <p>Saturday: 10:00 AM - 4:00 PM</p>
                              <p>Sunday: Closed</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Contact form */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-6">
                        <MessageSquare className="h-6 w-6 text-primary mr-3" />
                        <h2 className="text-2xl font-serif font-bold">Send Us a Message</h2>
                      </div>
                      
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input 
                              id="name" 
                              name="name" 
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Doe" 
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input 
                              id="email" 
                              name="email" 
                              type="email" 
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@example.com" 
                              required 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input 
                            id="subject" 
                            name="subject" 
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="How can we help you?" 
                            required 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea 
                            id="message" 
                            name="message" 
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Please provide as much detail as possible..." 
                            rows={6} 
                            required 
                          />
                        </div>
                        
                        <div>
                          <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                            {isSubmitting ? (
                              <span>Sending...</span>
                            ) : (
                              <>
                                <Send className="h-4 w-4 mr-2" />
                                Send Message
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-serif font-medium mb-4">Frequently Asked Questions</h3>
                    <p className="mb-4">
                      Before contacting us, you might find quick answers to your questions in our help resources:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Link to="/help" className="hover:underline text-primary flex items-center">
                        <ChevronRight className="h-4 w-4 mr-1" />
                        Help Center
                      </Link>
                      <Link to="/shipping" className="hover:underline text-primary flex items-center">
                        <ChevronRight className="h-4 w-4 mr-1" />
                        Shipping Information
                      </Link>
                      <Link to="/returns" className="hover:underline text-primary flex items-center">
                        <ChevronRight className="h-4 w-4 mr-1" />
                        Returns & Refunds
                      </Link>
                      <Link to="/about" className="hover:underline text-primary flex items-center">
                        <ChevronRight className="h-4 w-4 mr-1" />
                        About Magzo Prime
                      </Link>
                    </div>
                  </div>
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

export default Contact;
