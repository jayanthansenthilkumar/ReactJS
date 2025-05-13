
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

const ContactUs: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to an API
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Customer Support</SelectItem>
                    <SelectItem value="vendor">Become a Vendor</SelectItem>
                    <SelectItem value="careers">Careers</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="How can we help you?" 
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                Send Message
              </Button>
            </form>
          </div>
          
          <div>
            <div className="bg-white rounded-lg border p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-medium text-indigo-600">Address</h3>
                  <p className="text-gray-600">
                    123 PriSona Street<br />
                    Market District<br />
                    New York, NY 10001
                  </p>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-indigo-600">Phone</h3>
                  <p className="text-gray-600">
                    Customer Service: (555) 123-4567<br />
                    Vendor Support: (555) 987-6543
                  </p>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-indigo-600">Email</h3>
                  <p className="text-gray-600">
                    General Inquiries: info@prisonamart.com<br />
                    Customer Support: support@prisonamart.com<br />
                    Vendor Relations: vendors@prisonamart.com
                  </p>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-indigo-600">Hours</h3>
                  <p className="text-gray-600">
                    Monday-Friday: 9:00 AM - 8:00 PM<br />
                    Saturday: 10:00 AM - 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 mb-4">
                Find quick answers to common questions on our FAQ page.
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="/faqs">Visit FAQ Page</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
