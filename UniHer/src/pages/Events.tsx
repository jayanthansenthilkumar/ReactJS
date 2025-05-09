
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, User, Calendar as CalendarIcon } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
  description: string;
  tags: string[];
  featured: boolean;
}

const events: Event[] = [
  {
    id: "e1",
    title: "Women in STEM Career Fair",
    category: "Career",
    date: "June 15, 2025",
    time: "1:00 PM - 5:00 PM",
    location: "University Main Hall",
    organizer: "Engineering Department",
    attendees: 85,
    maxAttendees: 150,
    description: "Connect with employers specifically looking to hire women in STEM fields. Bring your resume and be ready to network with representatives from top companies.",
    tags: ["Career", "Networking", "STEM"],
    featured: true
  },
  {
    id: "e2",
    title: "Mental Health Awareness Workshop",
    category: "Wellness",
    date: "May 20, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Student Center, Room 202",
    organizer: "University Counseling Services",
    attendees: 32,
    maxAttendees: 50,
    description: "Learn strategies to manage academic stress and maintain wellness during exam periods. Professional counselors will share practical techniques and resources.",
    tags: ["Mental Health", "Wellness", "Workshop"],
    featured: false
  },
  {
    id: "e3",
    title: "Campus Safety Night Walk",
    category: "Safety",
    date: "May 25, 2025",
    time: "8:00 PM - 9:30 PM",
    location: "Meeting at University Quad",
    organizer: "Campus Safety Office",
    attendees: 28,
    maxAttendees: 40,
    description: "Join us for an evening walk to identify areas of campus that need better lighting or security. Help make our campus safer for everyone.",
    tags: ["Safety", "Campus", "Community"],
    featured: false
  },
  {
    id: "e4",
    title: "Female Founders Pitch Competition",
    category: "Entrepreneurship",
    date: "June 10, 2025",
    time: "5:00 PM - 8:00 PM",
    location: "Business School Auditorium",
    organizer: "Women Entrepreneurs Club",
    attendees: 55,
    maxAttendees: 100,
    description: "Watch female student entrepreneurs pitch their startup ideas to a panel of judges and investors. Network with successful women founders and investors.",
    tags: ["Entrepreneurship", "Pitching", "Networking"],
    featured: true
  },
  {
    id: "e5",
    title: "Self-Defense Basics Workshop",
    category: "Safety",
    date: "May 18, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "University Gym",
    organizer: "Campus Safety Office",
    attendees: 40,
    maxAttendees: 50,
    description: "Learn basic self-defense techniques from certified instructors. No prior experience necessary. Wear comfortable clothing suitable for movement.",
    tags: ["Safety", "Self-Defense", "Physical"],
    featured: false
  },
  {
    id: "e6",
    title: "Women's Leadership Conference",
    category: "Leadership",
    date: "July 8-9, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "University Conference Center",
    organizer: "Women's Leadership Initiative",
    attendees: 120,
    maxAttendees: 200,
    description: "A two-day conference featuring keynote speakers, panels, and workshops focused on developing leadership skills for women in all fields.",
    tags: ["Leadership", "Conference", "Professional Development"],
    featured: true
  }
];

const Events = () => {
  const featuredEvents = events.filter(event => event.featured);
  const upcomingEvents = events.filter(event => !event.featured);

  return (
    <AppLayout showSidebar>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-4">Events</h1>
        <p className="text-gray-600 mb-6">Discover workshops, seminars, networking events and more happening on and around campus.</p>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="bg-white">All Events</Button>
            <Button variant="outline" size="sm" className="bg-white">Career</Button>
            <Button variant="outline" size="sm" className="bg-white">Wellness</Button>
            <Button variant="outline" size="sm" className="bg-white">Safety</Button>
            <Button variant="outline" size="sm" className="bg-white">Social</Button>
          </div>
          <Button className="bg-uniher-purple hover:bg-uniher-purple-dark" size="sm">
            <CalendarIcon className="h-4 w-4 mr-2" />
            My Calendar
          </Button>
        </div>
        
        {featuredEvents.length > 0 && (
          <>
            <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">Featured Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {featuredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-all border-uniher-purple">
                  <div className="bg-uniher-purple text-white text-xs py-1 px-3 absolute right-3 top-3 rounded-full">
                    Featured
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription>{event.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>{event.attendees}/{event.maxAttendees} attending</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {event.tags.map((tag, index) => (
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
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}
        
        <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription>{event.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {event.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3 flex justify-end">
                <Button size="sm" className="bg-uniher-purple hover:bg-uniher-purple-dark">
                  Register
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Events;
