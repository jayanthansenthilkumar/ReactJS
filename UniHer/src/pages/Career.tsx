
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Briefcase, Search, Users } from 'lucide-react';

const Career = () => {
  return (
    <AppLayout showSidebar>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-6">Career</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="bg-uniher-blue bg-opacity-10">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Opportunities Hub
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="text-gray-600">Curated internships, mentorship connections, and startup resources tailored for ambitious college women.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Card className="border border-uniher-blue shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">MentHer</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Connect with mentors (senior girls, faculty, alumni).</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-uniher-blue shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">IdeaBloom</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Startup builder, idea tracker, landing page generator.</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-uniher-blue shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">SheWorks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Curated internships, scholarships (girls-only filter).</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-uniher-blue shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">HerLaunch</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Tools and resources to launch your own startup.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-uniher-blue bg-opacity-10">
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Internship Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500 py-8">Coming soon! Tailored internships for you.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Your Mentors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Connect with a mentor to guide your career path.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Skill Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Enhance your skills with courses tailored for your career path.</p>
                <div className="flex justify-center">
                  <button className="bg-uniher-blue text-white px-4 py-2 rounded-md">Explore Courses</button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Career;
