
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const MentorPreview = () => {
  const mentors = [
    {
      name: "Dr. Amina Patel",
      role: "Career Development",
      location: "Mumbai, India",
      languages: ["English", "Hindi"],
      expertise: ["Resume Building", "Interview Skills"],
      bio: "Career coach with 10+ years in tech & education. Specializes in helping young women break into male-dominated fields."
    },
    {
      name: "Michelle Johnson",
      role: "Mental Health Advocate",
      location: "New York, USA",
      languages: ["English", "Spanish"],
      expertise: ["Anxiety Management", "Self-Care"],
      bio: "Licensed therapist dedicated to making mental health resources accessible to young women from diverse backgrounds."
    },
    {
      name: "Zainab Ahmed",
      role: "Financial Educator",
      location: "Nairobi, Kenya",
      languages: ["English", "Swahili"],
      expertise: ["Savings Basics", "Budgeting"],
      bio: "Finance professional passionate about teaching financial literacy to young women for future independence and security."
    }
  ];

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-sherise-purple-dark mb-4">
            Connect with Mentors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get guidance from verified female mentors who volunteer their time and expertise to help you grow and succeed.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mentors.map((mentor, index) => (
            <Card key={index} className="border-sherise-pink/20 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="size-20 rounded-full bg-sherise-purple/20 mb-3 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-sherise-purple">{mentor.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold text-sherise-purple-dark">{mentor.name}</h3>
                  <p className="text-sm text-gray-600">{mentor.role}</p>
                  <p className="text-xs text-gray-500 mb-2">{mentor.location}</p>
                  <div className="flex gap-1 mb-3">
                    {mentor.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs bg-sherise-blue-light">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mb-3">
                  <h4 className="text-xs font-medium text-gray-500 mb-1">EXPERTISE</h4>
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">
                  {mentor.bio}
                </p>
              </CardContent>
              
              <CardFooter>
                <Button className="w-full bg-sherise-purple text-white hover:bg-sherise-purple-dark">
                  Request Mentoring
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" className="border-sherise-purple text-sherise-purple hover:bg-sherise-purple/5">
            Browse All Mentors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MentorPreview;
