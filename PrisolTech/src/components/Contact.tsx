import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import emailjs from '@emailjs/browser';

interface ContactProps {
  isFullPage?: boolean;
}

const Contact = ({ isFullPage = false }: ContactProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // EmailJS no longer requires explicit initialization with init() in newer versions
    // The public key will be provided directly in the send method
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Using the updated EmailJS send method with public key parameter
      const result = await emailjs.send(
        "service_ekekxet", // Replace with your EmailJS service ID
        "template_zggzccl", // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          from_phone: formData.phone,
          company: formData.company,
          subject: formData.subject,
          message: formData.message
        },
        "fJGw1zE1VwP5zdOcF" // Replace with your EmailJS public key
      );
      
      console.log('Email sent successfully:', result.text);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
      
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you shortly.",
      });
    } catch (error: any) {
      console.error('Failed to send email:', error);
      toast({
        title: "Error",
        description: error.text || "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {isFullPage ? (
          <div className="text-center mb-16">
          </div>
        ) : (
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 text-sm font-medium text-prisol-blue dark:text-prisol-light-blue bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">CONTACT US</span>
            <h2 className="text-3xl md:text-4xl font-bold text-prisol-dark-blue dark:text-white mb-4">Get in Touch</h2>
            <div className="w-24 h-1 bg-prisol-blue dark:bg-prisol-light-blue mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
              Have questions about our services or want to explore how PrisolTech can help your business? Reach out to us today.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="scroll-animation">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden p-8">
              <h3 className="text-2xl font-bold text-prisol-dark-blue dark:text-white mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Prithika K"
                      required
                      className="w-full border-gray-300 dark:border-gray-600 focus:border-prisol-blue focus:ring-prisol-blue dark:bg-gray-700 dark:text-white"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="grow@prisoltech.com"
                      required
                      className="w-full border-gray-300 dark:border-gray-600 focus:border-prisol-blue focus:ring-prisol-blue dark:bg-gray-700 dark:text-white"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                    <Input
                      type="tel"
                      id="phone"
                      placeholder="+91 8825756388"
                      className="w-full border-gray-300 dark:border-gray-600 focus:border-prisol-blue focus:ring-prisol-blue dark:bg-gray-700 dark:text-white"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                    <Input
                      type="text"
                      id="company"
                      placeholder="Your Company"
                      className="w-full border-gray-300 dark:border-gray-600 focus:border-prisol-blue focus:ring-prisol-blue dark:bg-gray-700 dark:text-white"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                  <Input
                    type="text"
                    id="subject"
                    placeholder="How can we help you?"
                    required
                    className="w-full border-gray-300 dark:border-gray-600 focus:border-prisol-blue focus:ring-prisol-blue dark:bg-gray-700 dark:text-white"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <Textarea
                    id="message"
                    placeholder="Please describe how we can assist you..."
                    required
                    className="w-full h-40 border-gray-300 dark:border-gray-600 focus:border-prisol-blue focus:ring-prisol-blue dark:bg-gray-700 dark:text-white"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-prisol-blue hover:bg-prisol-dark-blue text-white dark:bg-blue-700 dark:hover:bg-blue-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
            
            {isFullPage && (
              <div className="mt-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden p-8">
                <h3 className="text-2xl font-bold text-prisol-dark-blue dark:text-white mb-6">Frequently Asked Questions</h3>
                
                <div className="space-y-6">
                  {[
                    {
                      question: "Do you offer support after implementation?",
                      answer: "Yes, we provide comprehensive post-implementation support through our managed services offerings. We ensure that your systems continue to run smoothly and efficiently after deployment."
                    },
                    {
                      question: "How do you ensure the security of our data?",
                      answer: "We implement multiple layers of security including encryption, access controls, regular security audits, and compliance with industry standards to ensure that your data remains protected."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <h4 className="font-semibold text-prisol-dark-blue dark:text-white mb-2">{faq.question}</h4>
                      <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="scroll-animation">
            <div className="bg-prisol-dark-blue dark:bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden p-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-prisol-blue dark:bg-blue-700 rounded-full p-3">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-lg mb-1">Our Locations</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">Headquarters:</p>
                        <p className="text-gray-300">
                          Karur, Tamil Nadu-639001<br />
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Branch Office:</p>
                        <p className="text-gray-300">
                          Arumpakkam, Chennai-600056<br />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-prisol-blue dark:bg-blue-700 rounded-full p-3">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-lg mb-1">Call Us</h4>
                    <p className="text-gray-300">+91 8825756388 (HR)</p>
                    <p className="text-gray-300">+91 7010707678 (Support)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-prisol-blue dark:bg-blue-700 rounded-full p-3">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-lg mb-1">Email Us</h4>
                    <p className="text-gray-300">jayanthan@prisoltech.com</p>
                    <p className="text-gray-300">grow@prisoltech.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="font-semibold text-lg mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-prisol-blue hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors p-3 rounded-full">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-prisol-blue hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors p-3 rounded-full">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-prisol-blue hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors p-3 rounded-full">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-prisol-blue hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors p-3 rounded-full">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {isFullPage && (
              <div className="mt-10">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7413.704929268411!2d78.07173075192472!3d10.988600311157981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa2fcd97af3749%3A0x6d1f1105d639af99!2sLAKSHMI%20NILAYAM!5e1!3m2!1sen!2sin!4v1746436755370!5m2!1sen!2sin" 
                    width="100%" 
                    height="350" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
