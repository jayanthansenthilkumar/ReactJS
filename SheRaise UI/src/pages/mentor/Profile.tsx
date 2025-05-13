
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Mail, Phone, MapPin, Languages, Edit, Star } from 'lucide-react';

const MentorProfile = () => {
  // Dummy mentor data
  const mentor = {
    name: "Dr. Amina Patel",
    role: "Career Development Specialist",
    email: "amina.p@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    joined: "March 2024",
    languages: ["English", "Hindi", "Marathi"],
    expertise: ["Resume Building", "Interview Skills", "Career Planning", "Tech Careers"],
    bio: "Career coach with 10+ years experience in tech & education. Specializes in helping young women break into male-dominated fields. Previously worked as HR Director at a Fortune 500 tech company and taught at Mumbai University.",
    education: [
      { degree: "Ph.D. in Organizational Psychology", institution: "University of Mumbai", year: "2015" },
      { degree: "M.B.A. in Human Resources", institution: "Delhi University", year: "2010" }
    ],
    availability: {
      monday: ["10:00 AM - 12:00 PM", "3:00 PM - 5:00 PM"],
      wednesday: ["9:00 AM - 11:00 AM"],
      friday: ["2:00 PM - 6:00 PM"]
    },
    stats: {
      mentees: 24,
      sessions: 168,
      hours: 210,
      rating: 4.9,
      reviews: 128
    }
  };

  // Dummy reviews
  const reviews = [
    {
      name: "Zara Ahmed",
      date: "May 28, 2025",
      rating: 5,
      text: "Dr. Patel helped me completely transform my resume and interview approach. I just landed my dream job at a tech company!"
    },
    {
      name: "Maya Johnson",
      date: "May 15, 2025",
      rating: 5,
      text: "Incredibly supportive and knowledgeable mentor. Always makes time for questions and provides practical career advice."
    },
    {
      name: "Sophia Chen",
      date: "April 30, 2025",
      rating: 4,
      text: "Very helpful guidance on career planning and professional development. Would recommend to anyone in tech."
    }
  ];

  return (
    <DashboardLayout userType="mentor">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-sherise-purple-dark">Your Mentor Profile</h1>
        <Button className="bg-sherise-purple text-white hover:bg-sherise-purple-dark">
          <Edit className="mr-1 h-4 w-4" /> Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2 text-center">
            <div className="size-24 rounded-full bg-sherise-purple/20 mb-3 mx-auto flex items-center justify-center">
              <span className="text-3xl font-semibold text-sherise-purple">{mentor.name.charAt(0)}</span>
            </div>
            <CardTitle>{mentor.name}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{mentor.role}</p>
            <div className="flex justify-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-4 w-4 text-yellow-500" 
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="text-sm ml-2">{mentor.stats.rating} ({mentor.stats.reviews} reviews)</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-3 pt-3 border-t border-sherise-purple/10">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-sherise-purple" />
                <span>{mentor.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-sherise-purple" />
                <span>{mentor.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-sherise-purple" />
                <span>{mentor.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-sherise-purple" />
                <span>Joined {mentor.joined}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Languages className="h-4 w-4 text-sherise-purple" />
                <div className="flex flex-wrap gap-1">
                  {mentor.languages.map((lang) => (
                    <Badge key={lang} variant="outline" className="text-xs bg-sherise-blue-light">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-sherise-purple/10">
              <p className="text-sm font-medium mb-2">Expertise</p>
              <div className="flex flex-wrap gap-1">
                {mentor.expertise.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-sherise-purple/10">
              <p className="text-sm font-medium mb-2">Mentoring Stats</p>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-sherise-purple/5 rounded-md p-2">
                  <p className="text-xl font-bold text-sherise-purple-dark">{mentor.stats.mentees}</p>
                  <p className="text-xs text-gray-600">Mentees</p>
                </div>
                <div className="bg-sherise-purple/5 rounded-md p-2">
                  <p className="text-xl font-bold text-sherise-purple-dark">{mentor.stats.sessions}</p>
                  <p className="text-xs text-gray-600">Sessions</p>
                </div>
                <div className="bg-sherise-purple/5 rounded-md p-2">
                  <p className="text-xl font-bold text-sherise-purple-dark">{mentor.stats.hours}</p>
                  <p className="text-xs text-gray-600">Hours</p>
                </div>
                <div className="bg-sherise-purple/5 rounded-md p-2">
                  <p className="text-xl font-bold text-sherise-purple-dark">{mentor.stats.reviews}</p>
                  <p className="text-xs text-gray-600">Reviews</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{mentor.bio}</p>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Education</h3>
                <div className="space-y-2">
                  {mentor.education.map((edu, index) => (
                    <div key={index} className="bg-sherise-purple/5 p-3 rounded-md">
                      <p className="font-medium">{edu.degree}</p>
                      <p className="text-sm text-gray-600">{edu.institution}, {edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Availability Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(mentor.availability).map(([day, times]) => (
                  <div key={day} className="bg-sherise-purple/5 p-3 rounded-md">
                    <p className="font-medium capitalize mb-1">{day}</p>
                    {times.map((time, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <Clock className="h-3 w-3 text-sherise-purple mr-1" />
                        <span>{time}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <p className="text-sm text-center mt-4 text-gray-500">
                You can adjust your availability in the settings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mentee Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b border-sherise-purple/10 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between mb-1">
                      <p className="font-medium">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                          fill={i < review.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{review.text}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <Button variant="outline" className="border-sherise-purple/20">
                  View All 128 Reviews
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorProfile;
