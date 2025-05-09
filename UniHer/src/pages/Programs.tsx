
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Book, Award, Clock } from 'lucide-react';

interface Program {
  id: string;
  title: string;
  category: string;
  duration: string;
  startDate: string;
  participants: number;
  description: string;
  tags: string[];
  featured: boolean;
}

const programs: Program[] = [
  {
    id: "p1",
    title: "Women in Tech Leadership",
    category: "Career",
    duration: "8 weeks",
    startDate: "June 15, 2025",
    participants: 25,
    description: "Develop leadership skills specific to navigating the tech industry. Learn from successful women leaders and build a network to support your career growth.",
    tags: ["Leadership", "Tech", "Career Growth"],
    featured: true
  },
  {
    id: "p2",
    title: "Financial Literacy Workshop",
    category: "Lifestyle",
    duration: "4 weeks",
    startDate: "July 1, 2025",
    participants: 30,
    description: "Master the basics of personal finance, investing, and budgeting. Set yourself up for financial independence with practical skills and knowledge.",
    tags: ["Finance", "Budgeting", "Investing"],
    featured: false
  },
  {
    id: "p3",
    title: "Self-Defense Training",
    category: "Safety",
    duration: "6 weeks",
    startDate: "May 20, 2025",
    participants: 20,
    description: "Learn practical self-defense techniques and safety strategies from certified instructors in a supportive environment.",
    tags: ["Self-Defense", "Safety", "Physical Training"],
    featured: true
  },
  {
    id: "p4",
    title: "Research Methodology",
    category: "Academics",
    duration: "10 weeks",
    startDate: "September 5, 2025",
    participants: 15,
    description: "Develop advanced research skills, learn paper writing techniques, and prepare for academic publication with guidance from experienced researchers.",
    tags: ["Research", "Academic Writing", "Publishing"],
    featured: false
  },
  {
    id: "p5",
    title: "Entrepreneurship Bootcamp",
    category: "Career",
    duration: "12 weeks",
    startDate: "August 10, 2025",
    participants: 20,
    description: "Turn your ideas into a viable business with this intensive bootcamp covering business planning, pitching, funding, and more.",
    tags: ["Entrepreneurship", "Startups", "Business"],
    featured: true
  },
  {
    id: "p6",
    title: "Mental Health & Wellness Retreat",
    category: "Wellness",
    duration: "1 week",
    startDate: "July 15, 2025",
    participants: 15,
    description: "A comprehensive retreat focused on mental wellbeing, stress management, and building healthy habits for academic and personal success.",
    tags: ["Mental Health", "Wellness", "Self-Care"],
    featured: false
  }
];

const Programs = () => {
  return (
    <AppLayout showSidebar>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-4">UniHer Programs</h1>
        <p className="text-gray-600 mb-8">Discover and join specialized programs designed to help you excel in academics, career, wellness, and more.</p>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <Button variant="outline" size="sm" className="bg-white">All Programs</Button>
          <Button variant="outline" size="sm" className="bg-white">Career</Button>
          <Button variant="outline" size="sm" className="bg-white">Academics</Button>
          <Button variant="outline" size="sm" className="bg-white">Wellness</Button>
          <Button variant="outline" size="sm" className="bg-white">Safety</Button>
          <Button variant="outline" size="sm" className="bg-white">Lifestyle</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Card key={program.id} className={`hover:shadow-md transition-all border ${program.featured ? 'border-uniher-purple' : 'border-gray-200'}`}>
              {program.featured && (
                <div className="bg-uniher-purple text-white text-xs py-1 px-3 absolute right-3 top-3 rounded-full">
                  Featured
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{program.title}</CardTitle>
                <CardDescription>{program.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{program.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{program.participants} spots</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award className="h-4 w-4" />
                    <span>Certificate</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {program.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="link" className="text-uniher-purple p-0">
                  View Details
                </Button>
                <Button className="bg-uniher-purple hover:bg-uniher-purple-dark">
                  Enroll Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Programs;
