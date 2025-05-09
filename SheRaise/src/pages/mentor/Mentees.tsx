
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Mail, MessageSquare } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const MentorMentees = () => {
  // Dummy mentees data
  const mentees = [
    {
      name: 'Zara Ahmed',
      age: 19,
      location: 'Mumbai, India',
      interests: ['Public Speaking', 'Tech Careers', 'Leadership'],
      joined: '3 months ago',
      path: 'Public Speaking Confidence',
      progress: 78,
      nextSession: 'Jun 15, 2025',
      status: 'active',
    },
    {
      name: 'Emma Garcia',
      age: 22,
      location: 'Mexico City, Mexico',
      interests: ['Finance', 'Entrepreneurship', 'Graphic Design'],
      joined: '5 months ago',
      path: 'Financial Literacy Basics',
      progress: 45,
      nextSession: 'Jun 12, 2025',
      status: 'active',
    },
    {
      name: 'Lucia Silva',
      age: 24,
      location: 'São Paulo, Brazil',
      interests: ['Job Search', 'Tech Industry', 'Interview Skills'],
      joined: '2 months ago',
      path: 'Job Interview Skills',
      progress: 92,
      nextSession: 'Jun 10, 2025',
      status: 'active',
    },
    {
      name: 'Mei Lin',
      age: 17,
      location: 'Shanghai, China',
      interests: ['STEM Education', 'Coding', 'English Language'],
      joined: '1 month ago',
      path: 'STEM Career Exploration',
      progress: 30,
      nextSession: 'Jun 18, 2025',
      status: 'active',
    },
    {
      name: 'Aisha Patel',
      age: 20,
      location: 'New Delhi, India',
      interests: ['Finance', 'Career Planning', 'Public Health'],
      joined: '4 months ago',
      path: 'Financial Planning Basics',
      progress: 65,
      nextSession: 'Jun 14, 2025',
      status: 'active',
    },
    {
      name: 'Sarah Johnson',
      age: 21,
      location: 'Nairobi, Kenya',
      interests: ['Leadership', 'Social Entrepreneurship', 'Public Speaking'],
      joined: '6 months ago',
      path: 'Leadership Skills',
      progress: 82,
      nextSession: 'None scheduled',
      status: 'inactive',
    }
  ];

  return (
    <DashboardLayout userType="mentor">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-sherise-purple-dark">My Mentees</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-sherise-purple text-sherise-purple">
            <Mail className="mr-1 h-4 w-4" /> Message All
          </Button>
          <Button size="sm" className="bg-sherise-purple text-white hover:bg-sherise-purple-dark">
            New Mentee Request
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {mentees.map((mentee) => (
          <Card key={mentee.name} className={`shadow-sm overflow-hidden ${mentee.status === 'inactive' ? 'opacity-70' : ''}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="mb-1">{mentee.name}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {mentee.age} • {mentee.location}
                  </div>
                </div>
                <Badge variant={mentee.status === 'active' ? 'default' : 'outline'} className={mentee.status === 'active' ? 'bg-green-500' : ''}>
                  {mentee.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Interests</p>
                <div className="flex flex-wrap gap-1">
                  {mentee.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{mentee.path}</span>
                  <span>{mentee.progress}% complete</span>
                </div>
                <Progress value={mentee.progress} className="h-2" />
              </div>
              
              <div className="pt-2 border-t border-sherise-purple/10 flex justify-between">
                <div className="text-sm">
                  <span className="text-muted-foreground">Joined:</span> {mentee.joined}
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Next session:</span> {mentee.nextSession}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 border-sherise-purple text-sherise-purple">
                  <MessageSquare className="mr-1 h-4 w-4" /> Message
                </Button>
                <Button variant="outline" size="sm" className="flex-1 border-sherise-blue text-sherise-blue-dark">
                  <Calendar className="mr-1 h-4 w-4" /> Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default MentorMentees;
