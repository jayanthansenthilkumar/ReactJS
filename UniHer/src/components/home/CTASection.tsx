
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-uniher-purple-light bg-opacity-30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Ready to Transform Your College Experience?
          </h2>
          
          <p className="text-lg text-gray-700">
            Join thousands of college women who are using UniHer to excel in academics, career, wellness, safety, and social life.
          </p>
          
          <div className="pt-4">
            <Button size="lg" className="bg-uniher-purple hover:bg-uniher-purple-dark" asChild>
              <Link to="/signup">
                Get Early Access <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 pt-4">
            Join our waitlist to be among the first to access UniHer when we launch.
            <br />
            <span className="font-medium">Free tier available for students from select universities.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
