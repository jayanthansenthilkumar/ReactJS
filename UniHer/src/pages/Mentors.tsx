
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';

interface Mentor {
  id: string;
  name: string;
  role: string;
  university: string;
  expertise: string[];
  yearsOfExperience: number;
  bio: string;
  available: boolean;
  avatarInitials: string;
}

const mentors: Mentor[] = [
  {
    id: "m1",
    name: "Dr. Sarah Johnson",
    role: "Academic Mentor",
    university: "Stanford University",
    expertise: ["Computer Science", "AI", "Machine Learning"],
    yearsOfExperience: 8,
    bio: "Dr. Johnson specializes in AI research with a focus on helping women succeed in tech fields. She has mentored over 50 students who have gone on to work at top tech companies.",
    available: true,
    avatarInitials: "SJ"
  },
  {
    id: "m2",
    name: "Prof. Emily Chen",
    role: "Career Mentor",
    university: "MIT",
    expertise: ["Career Development", "Resume Building", "Interview Prep"],
    yearsOfExperience: 12,
    bio: "With over a decade of experience in career counseling, Prof. Chen helps students navigate the job market and secure positions at leading organizations.",
    available: true,
    avatarInitials: "EC"
  },
  {
    id: "m3",
    name: "Lisa Patel, MBA",
    role: "Entrepreneurship Mentor",
    university: "Harvard Business School",
    expertise: ["Startups", "Business Strategy", "Venture Capital"],
    yearsOfExperience: 6,
    bio: "Lisa has founded two successful startups and now dedicates her time to helping female founders navigate the startup ecosystem and secure funding.",
    available: false,
    avatarInitials: "LP"
  },
  {
    id: "m4",
    name: "Dr. Maria Rodriguez",
    role: "Wellness Mentor",
    university: "UCLA",
    expertise: ["Mental Health", "Work-Life Balance", "Stress Management"],
    yearsOfExperience: 10,
    bio: "Dr. Rodriguez combines her background in psychology with practical wellness strategies to help students maintain balance during their academic journey.",
    available: true,
    avatarInitials: "MR"
  },
  {
    id: "m5",
    name: "Kate Williams, PhD",
    role: "Research Mentor",
    university: "Oxford University",
    expertise: ["Research Methodology", "Academic Writing", "Publishing"],
    yearsOfExperience: 15,
    bio: "Kate has published over 30 papers in top-tier journals and specializes in helping students develop strong research skills and publish their findings.",
    available: true,
    avatarInitials: "KW"
  }
];

const Mentors = () => {
  return (
    <AppLayout showSidebar>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-4">MentHer Program</h1>
        <p className="text-gray-600 mb-6">Connect with experienced mentors who can guide you through your academic and professional journey.</p>
        
        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>How MentHer Works</CardTitle>
              <CardDescription>A step-by-step guide to finding and connecting with your ideal mentor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-uniher-purple bg-opacity-10 p-4 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-uniher-purple text-white flex items-center justify-center mb-3">1</div>
                  <h3 className="font-medium mb-2">Browse Profiles</h3>
                  <p className="text-sm text-gray-600">Explore our diverse range of mentors based on your interests and goals.</p>
                </div>
                <div className="bg-uniher-purple bg-opacity-10 p-4 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-uniher-purple text-white flex items-center justify-center mb-3">2</div>
                  <h3 className="font-medium mb-2">Request Mentorship</h3>
                  <p className="text-sm text-gray-600">Submit an application explaining why you'd like to work with your chosen mentor.</p>
                </div>
                <div className="bg-uniher-purple bg-opacity-10 p-4 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-uniher-purple text-white flex items-center justify-center mb-3">3</div>
                  <h3 className="font-medium mb-2">Start Learning</h3>
                  <p className="text-sm text-gray-600">Schedule regular meetings and follow the guidance of your mentor to achieve your goals.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">Available Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className={`hover:shadow-md transition-all ${!mentor.available ? 'opacity-70' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 bg-uniher-purple text-white">
                      <span className="font-medium text-sm">{mentor.avatarInitials}</span>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{mentor.name}</CardTitle>
                      <CardDescription>{mentor.role} • {mentor.university}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-28 mb-4">
                    <p className="text-sm text-gray-600">{mentor.bio}</p>
                  </ScrollArea>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {mentor.expertise.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-uniher-purple bg-opacity-10 text-uniher-purple text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{mentor.yearsOfExperience} years experience</span>
                    <Button 
                      variant={mentor.available ? "default" : "outline"} 
                      size="sm"
                      disabled={!mentor.available}
                      className={mentor.available ? "bg-uniher-purple hover:bg-uniher-purple-dark" : ""}
                    >
                      {mentor.available ? "Connect" : "Unavailable"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Mentors;
