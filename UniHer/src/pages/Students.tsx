
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  year: number;
  major: string;
  university: string;
  interests: string[];
  bio: string;
  avatarInitials: string;
}

const students: Student[] = [
  {
    id: "s1",
    name: "Jessica Parker",
    year: 2,
    major: "Computer Science",
    university: "Stanford University",
    interests: ["Programming", "AI", "Photography"],
    bio: "Second year CS student passionate about AI and machine learning. Looking to connect with peers interested in tech projects.",
    avatarInitials: "JP"
  },
  {
    id: "s2",
    name: "Aisha Johnson",
    year: 3,
    major: "Business Administration",
    university: "Harvard University",
    interests: ["Entrepreneurship", "Finance", "Travel"],
    bio: "Business major with a focus on entrepreneurship. Currently working on a startup idea and looking for potential co-founders.",
    avatarInitials: "AJ"
  },
  {
    id: "s3",
    name: "Mia Zhang",
    year: 1,
    major: "Psychology",
    university: "UCLA",
    interests: ["Mental Health", "Art", "Yoga"],
    bio: "First year psychology student interested in mental health advocacy. Enjoys art therapy and mindfulness practices.",
    avatarInitials: "MZ"
  },
  {
    id: "s4",
    name: "Sophia Rodriguez",
    year: 4,
    major: "Biology",
    university: "UC Berkeley",
    interests: ["Research", "Healthcare", "Hiking"],
    bio: "Senior biology student applying to medical schools. Currently working on research related to women's health issues.",
    avatarInitials: "SR"
  },
  {
    id: "s5",
    name: "Taylor Wilson",
    year: 2,
    major: "Engineering",
    university: "MIT",
    interests: ["Robotics", "Sustainability", "Music"],
    bio: "Engineering student focused on sustainable technology. Working on a project to reduce plastic waste on campus.",
    avatarInitials: "TW"
  },
  {
    id: "s6",
    name: "Olivia Chen",
    year: 3,
    major: "English Literature",
    university: "NYU",
    interests: ["Writing", "Film", "Activism"],
    bio: "English major and aspiring author. Currently working on a novel about women's experiences in academia.",
    avatarInitials: "OC"
  },
  {
    id: "s7",
    name: "Zara Patel",
    year: 1,
    major: "Economics",
    university: "Columbia University",
    interests: ["Data Analysis", "Public Policy", "Debate"],
    bio: "First-year economics student interested in how economic policies affect women in developing countries.",
    avatarInitials: "ZP"
  },
  {
    id: "s8",
    name: "Emma Watson",
    year: 4,
    major: "Political Science",
    university: "Yale University",
    interests: ["Law", "International Relations", "Reading"],
    bio: "Political science senior heading to law school next year. Passionate about international human rights and women's equality.",
    avatarInitials: "EW"
  }
];

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout showSidebar>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-4">Student Directory</h1>
        <p className="text-gray-600 mb-6">Connect with other students, find study partners, and build your network.</p>
        
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search by name, major, or university..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-uniher-purple hover:bg-uniher-purple-dark">
            Advanced Search
          </Button>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Students</TabsTrigger>
            <TabsTrigger value="same-major">Same Major</TabsTrigger>
            <TabsTrigger value="same-university">Same University</TabsTrigger>
            <TabsTrigger value="connections">My Connections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {filteredStudents.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-gray-500">No students match your search criteria.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map((student) => (
                  <Card key={student.id} className="hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 bg-uniher-purple text-white">
                          <span>{student.avatarInitials}</span>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{student.name}</CardTitle>
                          <CardDescription className="text-sm">
                            Year {student.year} • {student.major}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-2">{student.university}</p>
                      <p className="text-sm text-gray-600 mb-4">{student.bio}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {student.interests.map((interest, index) => (
                          <span 
                            key={index}
                            className="bg-uniher-purple bg-opacity-10 text-uniher-purple text-xs px-2 py-1 rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between mt-3">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button size="sm" className="bg-uniher-purple hover:bg-uniher-purple-dark">
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="same-major">
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-gray-500">Connect to view students in your major.</p>
                <Button className="mt-4 bg-uniher-purple hover:bg-uniher-purple-dark">
                  Update Your Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="same-university">
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-gray-500">Connect to view students at your university.</p>
                <Button className="mt-4 bg-uniher-purple hover:bg-uniher-purple-dark">
                  Update Your Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="connections">
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-gray-500">You haven't made any connections yet.</p>
                <Button className="mt-4 bg-uniher-purple hover:bg-uniher-purple-dark">
                  Explore Students
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Students;
