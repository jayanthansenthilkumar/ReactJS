
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, AlertTriangle, MessageSquare, Clock, FileText, Activity } from 'lucide-react';

const AdminMentalHealth = () => {
  // Dummy stats
  const supportStats = [
    { title: 'Active Support Sessions', value: '42', icon: <MessageSquare className="h-5 w-5 text-sherise-purple" />, trend: '+12% this week' },
    { title: 'Support Queue', value: '7', icon: <Users className="h-5 w-5 text-sherise-blue-dark" />, trend: '-3 from yesterday' },
    { title: 'Crisis Alerts', value: '2', icon: <AlertTriangle className="h-5 w-5 text-red-500" />, trend: 'Needs immediate attention' },
    { title: 'Avg. Response Time', value: '4.2 min', icon: <Clock className="h-5 w-5 text-sherise-peach-dark" />, trend: '-0.8 min this week' }
  ];

  // Dummy active support cases
  const activeCases = [
    {
      id: 'CS-5842',
      user: 'Anonymous User',
      topic: 'Depression & Anxiety',
      urgency: 'high',
      waiting: '2 minutes',
      status: 'Unassigned',
      messages: 3
    },
    {
      id: 'CS-5841',
      user: 'Anonymous User',
      topic: 'Relationship Issues',
      urgency: 'medium',
      waiting: '5 minutes',
      status: 'Unassigned',
      messages: 2
    },
    {
      id: 'CS-5840',
      user: 'Maya Johnson',
      topic: 'Academic Stress',
      urgency: 'medium',
      waiting: '8 minutes',
      status: 'In progress',
      messages: 12,
      supportAgent: 'Michelle Thompson'
    },
    {
      id: 'CS-5839',
      user: 'Anonymous User',
      topic: 'Family Conflict',
      urgency: 'high',
      waiting: '12 minutes',
      status: 'In progress',
      messages: 18,
      supportAgent: 'Dr. Sarah Williams'
    },
    {
      id: 'CS-5838',
      user: 'Zara Ahmed',
      topic: 'Test Anxiety',
      urgency: 'low',
      waiting: '15 minutes',
      status: 'In progress',
      messages: 8,
      supportAgent: 'Dr. James Cooper'
    }
  ];

  // Dummy resource usage
  const resourceUsage = [
    { resource: 'Anxiety Management Guide', views: 845, downloads: 382, feedback: 4.8 },
    { resource: 'Guided Meditation Audio', views: 1240, downloads: 756, feedback: 4.9 },
    { resource: 'Self-Reflection Journal Template', views: 692, downloads: 521, feedback: 4.7 },
    { resource: 'Stress Relief Techniques', views: 986, downloads: 489, feedback: 4.6 },
    { resource: 'Crisis Support Contact Card', views: 1345, downloads: 872, feedback: 4.9 }
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-sherise-purple-dark">Mental Health Support</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
            <AlertTriangle className="mr-1 h-4 w-4" /> View Crisis Alerts
          </Button>
          <Button className="bg-sherise-purple text-white hover:bg-sherise-purple-dark">
            Support Dashboard
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        {supportStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6 pb-4 px-6 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <div className="bg-sherise-purple/10 p-2 rounded-full">{stat.icon}</div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs mt-1 text-gray-500">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Active Support Cases</CardTitle>
              <Button variant="outline" size="sm" className="border-sherise-purple/20">View All Cases</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCases.map((activeCase) => (
                  <div key={activeCase.id} className={`border-l-4 ${
                    activeCase.urgency === 'high' ? 'border-red-500' : 
                    activeCase.urgency === 'medium' ? 'border-amber-500' : 
                    'border-green-500'
                  } pl-3 py-1`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{activeCase.user}</p>
                          <Badge className={`text-xs ${
                            activeCase.urgency === 'high' ? 'bg-red-500' : 
                            activeCase.urgency === 'medium' ? 'bg-amber-500' : 
                            'bg-green-500'
                          }`}>
                            {activeCase.urgency}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{activeCase.topic}</p>
                      </div>
                      <div className="text-sm text-right">
                        <p className="font-medium">{activeCase.id}</p>
                        <p className="text-gray-500">Waiting: {activeCase.waiting}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MessageSquare className="h-3 w-3" />
                        <span>{activeCase.messages} messages</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-xs ${
                          activeCase.status === 'Unassigned' ? 'border-red-500 text-red-500' : 
                          'border-green-500 text-green-500'
                        }`}>
                          {activeCase.status}
                        </Badge>
                        {activeCase.status === 'Unassigned' ? (
                          <Button size="sm" variant="secondary" className="text-xs h-7 bg-sherise-purple text-white hover:bg-sherise-purple-dark">
                            Take Case
                          </Button>
                        ) : (
                          <span className="text-xs text-gray-600">Assigned to: {activeCase.supportAgent}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Support Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm font-medium">Available Support Agents</p>
                <span className="font-semibold text-green-600">8/12</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: '66.7%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">4 agents on break or unavailable</p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm font-medium">Queue Wait Time</p>
                <span className="font-semibold">8 minutes</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '40%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Target: Under 5 minutes</p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm font-medium">Crisis Response</p>
                <span className="font-semibold text-red-600">Needs Attention</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: '90%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">2 crisis alerts waiting</p>
            </div>
            
            <div className="pt-4 border-t border-sherise-purple/10">
              <h3 className="font-medium mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="border-sherise-purple/20">
                  <Users className="mr-1 h-4 w-4" />
                  <span className="text-xs">Add Agent</span>
                </Button>
                <Button variant="outline" size="sm" className="border-sherise-purple/20">
                  <Activity className="mr-1 h-4 w-4" />
                  <span className="text-xs">View Activity</span>
                </Button>
                <Button variant="outline" size="sm" className="border-sherise-purple/20">
                  <Clock className="mr-1 h-4 w-4" />
                  <span className="text-xs">Schedules</span>
                </Button>
                <Button variant="outline" size="sm" className="border-sherise-purple/20">
                  <FileText className="mr-1 h-4 w-4" />
                  <span className="text-xs">Reports</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Mental Health Resource Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-sherise-purple/10">
                  <th className="text-left py-3 px-4">Resource</th>
                  <th className="text-left py-3 px-4">Views</th>
                  <th className="text-left py-3 px-4">Downloads</th>
                  <th className="text-left py-3 px-4">Feedback Score</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sherise-purple/10">
                {resourceUsage.map((resource, index) => (
                  <tr key={index} className="hover:bg-sherise-purple/5">
                    <td className="py-3 px-4 font-medium">{resource.resource}</td>
                    <td className="py-3 px-4">{resource.views.toLocaleString()}</td>
                    <td className="py-3 px-4">{resource.downloads.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="mr-1">{resource.feedback}</span>
                        <Heart className="h-3 w-3 text-red-500" fill="currentColor" />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" className="text-xs border-sherise-purple/20">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AdminMentalHealth;
