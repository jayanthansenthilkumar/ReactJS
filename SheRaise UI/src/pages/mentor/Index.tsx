
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, BookOpen, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const MentorDashboard = () => {
  // Dummy stats for mentor dashboard
  const stats = [
    { 
      title: 'Total Mentees', 
      value: '24', 
      icon: <Users className="h-6 w-6 text-sherise-purple" />,
      change: '+4 this month',
      trend: 'up'
    },
    { 
      title: 'Upcoming Sessions', 
      value: '8', 
      icon: <Calendar className="h-6 w-6 text-sherise-blue-dark" />,
      change: '3 this week',
      trend: 'neutral'
    },
    { 
      title: 'Resources Shared', 
      value: '57', 
      icon: <BookOpen className="h-6 w-6 text-sherise-peach-dark" />,
      change: '+12 this month',
      trend: 'up'
    },
    { 
      title: 'Mentor Hours', 
      value: '86', 
      icon: <Clock className="h-6 w-6 text-sherise-pink-dark" />,
      change: '+8 this month',
      trend: 'up'
    }
  ];

  // Dummy upcoming sessions
  const upcomingSessions = [
    { 
      name: 'Maya Johnson',
      time: '2PM Today',
      topic: 'Career Path Discussion',
      duration: '45 mins',
      status: 'confirmed'
    },
    { 
      name: 'Sophia Chen',
      time: '10AM Tomorrow',
      topic: 'Interview Preparation',
      duration: '60 mins',
      status: 'confirmed'
    },
    { 
      name: 'Aisha Patel',
      time: '3PM Tomorrow',
      topic: 'Financial Planning Basics',
      duration: '45 mins',
      status: 'pending'
    }
  ];

  // Dummy mentee progress
  const menteeProgress = [
    { 
      name: 'Zara Ahmed',
      progress: 78,
      program: 'Public Speaking Confidence',
      milestones: '7/9 completed'
    },
    { 
      name: 'Emma Garcia',
      progress: 45,
      program: 'Financial Literacy Basics',
      milestones: '5/10 completed'
    },
    { 
      name: 'Lucia Silva',
      progress: 92,
      program: 'Job Interview Skills',
      milestones: '11/12 completed'
    }
  ];

  return (
    <DashboardLayout userType="mentor">
      <h1 className="text-2xl font-bold text-sherise-purple-dark mb-6">Mentor Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-gray-500'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className="bg-sherise-purple/10 p-2 rounded-full">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between border-b border-sherise-purple/10 pb-3 last:border-b-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sherise-purple-dark">{session.name}</p>
                    <p className="text-sm text-muted-foreground">{session.topic}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span>{session.time}</span>
                      <span className="mx-1">•</span>
                      <span>{session.duration}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 text-xs rounded ${session.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {session.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mentee Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {menteeProgress.map((mentee, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <p className="font-medium text-sherise-purple-dark">{mentee.name}</p>
                    <span className="text-sm text-muted-foreground">{mentee.progress}%</span>
                  </div>
                  <p className="text-sm text-gray-600">{mentee.program}</p>
                  <Progress value={mentee.progress} className="h-2" />
                  <p className="text-xs text-gray-500">{mentee.milestones}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-sherise-blue/5 p-3 rounded-lg">
              <div className="flex justify-between mb-1">
                <p className="font-medium text-sherise-purple-dark">Zara Ahmed</p>
                <span className="text-xs text-gray-500">Yesterday</span>
              </div>
              <p className="text-sm text-gray-600">
                Thank you for the feedback on my presentation. I'll practice the techniques you shared before our next session!
              </p>
            </div>
            <div className="bg-sherise-pink/5 p-3 rounded-lg">
              <div className="flex justify-between mb-1">
                <p className="font-medium text-sherise-purple-dark">Emma Garcia</p>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-600">
                I've completed the budgeting exercise. Could we review it in our next session? I'm still a bit confused about emergency funds.
              </p>
            </div>
            <div className="bg-sherise-peach/5 p-3 rounded-lg">
              <div className="flex justify-between mb-1">
                <p className="font-medium text-sherise-purple-dark">Lucia Silva</p>
                <span className="text-xs text-gray-500">3 days ago</span>
              </div>
              <p className="text-sm text-gray-600">
                Great news! I got called for an interview at the tech company we discussed. Could you help me prepare this weekend?
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default MentorDashboard;
