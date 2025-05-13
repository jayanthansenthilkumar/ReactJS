
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Book, Heart, Calendar, Award, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  // Dummy stats for admin dashboard
  const stats = [
    { 
      title: 'Active Users', 
      value: '5,847', 
      icon: <Users className="h-6 w-6 text-sherise-purple" />,
      change: '+412 this month',
      trend: 'up'
    },
    { 
      title: 'Active Mentors', 
      value: '238', 
      icon: <Award className="h-6 w-6 text-sherise-blue-dark" />,
      change: '+28 this month',
      trend: 'up'
    },
    { 
      title: 'Growth Paths', 
      value: '24', 
      icon: <Book className="h-6 w-6 text-sherise-peach-dark" />,
      change: '+3 this month',
      trend: 'up'
    },
    { 
      title: 'Mentor Sessions', 
      value: '1,342', 
      icon: <Calendar className="h-6 w-6 text-sherise-pink-dark" />,
      change: '+187 this month',
      trend: 'up'
    }
  ];

  // Dummy regional stats
  const regionalStats = [
    { region: 'South Asia', users: 2340, mentors: 98, completionRate: 68 },
    { region: 'Africa', users: 1250, mentors: 45, completionRate: 72 },
    { region: 'Latin America', users: 980, mentors: 36, completionRate: 65 },
    { region: 'Southeast Asia', users: 745, mentors: 32, completionRate: 70 },
    { region: 'Middle East', users: 532, mentors: 27, completionRate: 63 }
  ];

  // Dummy alerts
  const systemAlerts = [
    { type: 'critical', message: 'Mental health support queue has high wait times (15+ minutes)', time: '10 minutes ago' },
    { type: 'warning', message: 'Low mentor availability for "Financial Literacy" track', time: '2 hours ago' },
    { type: 'info', message: 'System update scheduled for June 15, 2025 at 02:00 UTC', time: '1 day ago' }
  ];

  return (
    <DashboardLayout userType="admin">
      <h1 className="text-2xl font-bold text-sherise-purple-dark mb-6">Admin Dashboard</h1>
      
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
      
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Regional Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground">
                      <th className="pb-2">Region</th>
                      <th className="pb-2">Active Users</th>
                      <th className="pb-2">Mentors</th>
                      <th className="pb-2">Completion Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regionalStats.map((region, index) => (
                      <tr key={index} className="border-b border-sherise-purple/10 last:border-b-0">
                        <td className="py-3 font-medium">{region.region}</td>
                        <td className="py-3">{region.users}</td>
                        <td className="py-3">{region.mentors}</td>
                        <td className="py-3">{region.completionRate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemAlerts.map((alert, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-md ${
                    alert.type === 'critical' ? 'bg-red-50 border-l-4 border-red-500' : 
                    alert.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-500' : 
                    'bg-blue-50 border-l-4 border-blue-500'
                  }`}
                >
                  <p className={`text-sm ${
                    alert.type === 'critical' ? 'text-red-800' : 
                    alert.type === 'warning' ? 'text-yellow-800' : 
                    'text-blue-800'
                  }`}>
                    {alert.message}
                  </p>
                  <p className="text-xs mt-1 text-gray-500">{alert.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Popular Growth Paths</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-sherise-purple/10 pb-3">
                <div className="flex items-center">
                  <div className="bg-sherise-purple/10 p-2 rounded-full mr-3">
                    <Book className="h-5 w-5 text-sherise-purple" />
                  </div>
                  <div>
                    <p className="font-medium">Public Speaking Confidence</p>
                    <p className="text-xs text-muted-foreground">5,280 active users</p>
                  </div>
                </div>
                <div className="text-sm">87% completion</div>
              </div>
              <div className="flex justify-between items-center border-b border-sherise-purple/10 pb-3">
                <div className="flex items-center">
                  <div className="bg-sherise-blue/10 p-2 rounded-full mr-3">
                    <Book className="h-5 w-5 text-sherise-blue-dark" />
                  </div>
                  <div>
                    <p className="font-medium">Financial Literacy</p>
                    <p className="text-xs text-muted-foreground">4,185 active users</p>
                  </div>
                </div>
                <div className="text-sm">72% completion</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-sherise-pink/10 p-2 rounded-full mr-3">
                    <Book className="h-5 w-5 text-sherise-pink-dark" />
                  </div>
                  <div>
                    <p className="font-medium">Job Interview Skills</p>
                    <p className="text-xs text-muted-foreground">3,842 active users</p>
                  </div>
                </div>
                <div className="text-sm">78% completion</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Mental Health Support</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-sherise-purple/10 pb-3">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Active Support Sessions</p>
                    <p className="text-xs text-muted-foreground">Last 24 hours</p>
                  </div>
                </div>
                <div className="text-lg font-semibold">248</div>
              </div>
              <div className="flex justify-between items-center border-b border-sherise-purple/10 pb-3">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <MessageSquare className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">Average Response Time</p>
                    <p className="text-xs text-muted-foreground">Last 24 hours</p>
                  </div>
                </div>
                <div className="text-lg font-semibold">4.2 min</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-sherise-purple/10 p-2 rounded-full mr-3">
                    <Users className="h-5 w-5 text-sherise-purple" />
                  </div>
                  <div>
                    <p className="font-medium">Crisis Interventions</p>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </div>
                </div>
                <div className="text-lg font-semibold">37</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
