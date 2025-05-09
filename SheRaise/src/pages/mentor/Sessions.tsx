
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Search, Filter, Video, MessageSquare } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const MentorSessions = () => {
  // Dummy sessions data
  const upcomingSessions = [
    {
      mentee: 'Maya Johnson',
      date: 'Today, 2:00 PM',
      topic: 'Career Path Discussion',
      duration: '45 mins',
      type: 'video',
      status: 'confirmed'
    },
    {
      mentee: 'Sophia Chen',
      date: 'Tomorrow, 10:00 AM',
      topic: 'Interview Preparation',
      duration: '60 mins',
      type: 'video',
      status: 'confirmed'
    },
    {
      mentee: 'Aisha Patel',
      date: 'Tomorrow, 3:00 PM',
      topic: 'Financial Planning Basics',
      duration: '45 mins',
      type: 'chat',
      status: 'pending'
    }
  ];
  
  const pastSessions = [
    {
      mentee: 'Zara Ahmed',
      date: 'June 5, 2025',
      topic: 'Public Speaking Practice',
      duration: '60 mins',
      type: 'video',
      status: 'completed',
      notes: 'Covered breathing techniques and body language. Zara showed improvement on eye contact.'
    },
    {
      mentee: 'Emma Garcia',
      date: 'June 3, 2025',
      topic: 'Budget Planning',
      duration: '45 mins',
      type: 'chat',
      status: 'completed',
      notes: 'Discussed emergency fund strategies and reviewed monthly budget template.'
    },
    {
      mentee: 'Lucia Silva',
      date: 'May 29, 2025',
      topic: 'Mock Interview',
      duration: '60 mins',
      type: 'video',
      status: 'completed',
      notes: 'Conducted a full technical interview simulation. Strong technical answers, needs work on conciseness.'
    },
    {
      mentee: 'Mei Lin',
      date: 'May 25, 2025',
      topic: 'STEM Career Options',
      duration: '30 mins',
      type: 'video',
      status: 'completed',
      notes: 'Explored various engineering paths. Mei is most interested in biomedical engineering.'
    },
    {
      mentee: 'Sarah Johnson',
      date: 'May 20, 2025',
      topic: 'Leadership Skills',
      duration: '45 mins',
      type: 'chat',
      status: 'missed',
      notes: 'Sarah did not attend. Send follow-up.'
    }
  ];

  return (
    <DashboardLayout userType="mentor">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-sherise-purple-dark">Mentoring Sessions</h1>
        <Button className="bg-sherise-purple text-white hover:bg-sherise-purple-dark">
          <Plus className="mr-1 h-4 w-4" /> Schedule Session
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingSessions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="mx-auto h-8 w-8 mb-2 text-sherise-purple/50" />
              <p>No upcoming sessions scheduled</p>
              <Button variant="outline" size="sm" className="mt-2 border-sherise-purple text-sherise-purple">
                Schedule a Session
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between border-b border-sherise-purple/10 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex gap-3 items-center">
                    <div className={`size-10 rounded-full ${session.type === 'video' ? 'bg-sherise-blue/20' : 'bg-sherise-pink/20'} flex items-center justify-center`}>
                      {session.type === 'video' ? 
                        <Video className="h-5 w-5 text-sherise-blue-dark" /> : 
                        <MessageSquare className="h-5 w-5 text-sherise-pink-dark" />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-sherise-purple-dark">{session.mentee}</p>
                      <p className="text-sm text-muted-foreground">{session.topic}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span>{session.date}</span>
                        <span className="mx-1">•</span>
                        <span>{session.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${
                      session.status === 'confirmed' ? 'bg-green-500' : 
                      session.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {session.status === 'confirmed' ? 'Confirmed' : 
                       session.status === 'pending' ? 'Pending' : 'Canceled'}
                    </Badge>
                    <Button variant="outline" size="sm" className="border-sherise-purple text-sherise-purple">
                      {session.type === 'video' ? 'Join Call' : 'Open Chat'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-sherise-purple-dark">Past Sessions</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex gap-1 border-sherise-purple/20">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="flex gap-1 border-sherise-purple/20">
            <Search className="h-4 w-4" /> Search
          </Button>
        </div>
      </div>
      
      <Card>
        <ScrollArea className="h-[400px]">
          <CardContent className="p-4">
            <div className="space-y-4">
              {pastSessions.map((session, index) => (
                <div key={index} className="border-b border-sherise-purple/10 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sherise-purple-dark">{session.mentee}</p>
                        <Badge variant={
                          session.status === 'completed' ? 'default' : 'outline'
                        } className={
                          session.status === 'completed' ? 'bg-green-500 text-white' : 'border-red-500 text-red-500'
                        }>
                          {session.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{session.topic}</p>
                    </div>
                    <div className="text-sm text-gray-500">{session.date} • {session.duration}</div>
                  </div>
                  {session.notes && (
                    <div className="bg-gray-50 rounded p-3 text-sm">
                      <p className="text-gray-600">{session.notes}</p>
                    </div>
                  )}
                  <div className="flex mt-3 gap-2">
                    <Button variant="outline" size="sm" className="text-xs border-sherise-purple/20">
                      View Details
                    </Button>
                    {session.status === 'completed' && (
                      <Button variant="outline" size="sm" className="text-xs border-sherise-purple/20">
                        Edit Notes
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </DashboardLayout>
  );
};

export default MentorSessions;
