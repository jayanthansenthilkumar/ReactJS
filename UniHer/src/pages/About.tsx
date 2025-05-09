
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About UniHer</h1>
        
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                UniHer is dedicated to empowering college women through comprehensive support in academics, 
                career development, wellness, safety, and social networking. We believe that every woman 
                deserves equal access to opportunities and resources that help them thrive in their 
                college journey and beyond.
              </p>
              <p className="text-gray-700 mb-4">
                Our platform serves as an all-in-one solution to address the unique challenges faced by 
                women in higher education, providing a supportive community and practical tools for success.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                UniHer was founded in 2023 by a group of women entrepreneurs who experienced firsthand 
                the challenges of navigating college life. They recognized a gap in the support systems 
                available to women students and decided to create a platform that addresses these needs.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a small campus initiative has grown into a comprehensive platform 
                serving thousands of women across universities nationwide. Our team consists of 
                educators, tech experts, and student advocates who are passionate about creating 
                meaningful change in the higher education landscape.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium mb-2 text-uniher-purple">Empowerment</h3>
                  <p className="text-gray-700">
                    We believe in equipping women with the tools, resources, and confidence 
                    they need to achieve their goals.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-uniher-purple">Inclusion</h3>
                  <p className="text-gray-700">
                    We are committed to creating a platform that is accessible and welcoming to 
                    women from all backgrounds and identities.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-uniher-purple">Safety</h3>
                  <p className="text-gray-700">
                    We prioritize the physical and emotional safety of our users in all aspects 
                    of our platform.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-uniher-purple">Community</h3>
                  <p className="text-gray-700">
                    We foster meaningful connections among women to create a supportive network 
                    that extends beyond virtual interactions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-uniher-purple-light mx-auto mb-3 flex items-center justify-center">
                    <span className="text-uniher-purple text-xl font-bold">JD</span>
                  </div>
                  <h3 className="text-lg font-medium">Jane Doe</h3>
                  <p className="text-gray-600">Founder & CEO</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-uniher-purple-light mx-auto mb-3 flex items-center justify-center">
                    <span className="text-uniher-purple text-xl font-bold">AS</span>
                  </div>
                  <h3 className="text-lg font-medium">Alice Smith</h3>
                  <p className="text-gray-600">CTO</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-uniher-purple-light mx-auto mb-3 flex items-center justify-center">
                    <span className="text-uniher-purple text-xl font-bold">MJ</span>
                  </div>
                  <h3 className="text-lg font-medium">Maya Johnson</h3>
                  <p className="text-gray-600">Head of Community</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default About;
