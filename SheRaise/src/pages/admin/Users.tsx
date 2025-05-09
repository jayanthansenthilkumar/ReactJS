
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Filter, Download, Plus, Mail } from 'lucide-react';

const AdminUsers = () => {
  // Dummy users data
  const users = [
    {
      id: 'U-7821',
      name: 'Zara Ahmed',
      email: 'zara.a@example.com',
      location: 'Mumbai, India',
      joined: 'Mar 15, 2025',
      status: 'active',
      programs: ['Public Speaking', 'Leadership'],
      mentor: 'Dr. Amina Patel',
      lastActive: '2 hours ago'
    },
    {
      id: 'U-5643',
      name: 'Emma Garcia',
      email: 'emma.g@example.com',
      location: 'Mexico City, Mexico',
      joined: 'Jan 10, 2025',
      status: 'active',
      programs: ['Financial Literacy', 'Entrepreneurship'],
      mentor: 'Zainab Ahmed',
      lastActive: '1 day ago'
    },
    {
      id: 'U-9012',
      name: 'Lucia Silva',
      email: 'lucia.s@example.com',
      location: 'São Paulo, Brazil',
      joined: 'Apr 5, 2025',
      status: 'active',
      programs: ['Job Interview Skills'],
      mentor: 'Michelle Johnson',
      lastActive: '5 hours ago'
    },
    {
      id: 'U-2345',
      name: 'Mei Lin',
      email: 'mei.l@example.com',
      location: 'Shanghai, China',
      joined: 'May 2, 2025',
      status: 'active',
      programs: ['STEM Career Exploration'],
      mentor: 'Dr. Amina Patel',
      lastActive: '3 days ago'
    },
    {
      id: 'U-8765',
      name: 'Aisha Patel',
      email: 'aisha.p@example.com',
      location: 'New Delhi, India',
      joined: 'Feb 18, 2025',
      status: 'active',
      programs: ['Financial Planning'],
      mentor: 'Zainab Ahmed',
      lastActive: '12 hours ago'
    },
    {
      id: 'U-4321',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      location: 'Nairobi, Kenya',
      joined: 'Dec 5, 2024',
      status: 'inactive',
      programs: ['Leadership Skills'],
      mentor: 'Unassigned',
      lastActive: '14 days ago'
    },
    {
      id: 'U-6543',
      name: 'Jasmine Wong',
      email: 'jasmine.w@example.com',
      location: 'Singapore',
      joined: 'Apr 15, 2025',
      status: 'active',
      programs: ['Public Speaking', 'Career Planning'],
      mentor: 'Michelle Johnson',
      lastActive: '1 hour ago'
    },
    {
      id: 'U-1098',
      name: 'Isabel Martinez',
      email: 'isabel.m@example.com',
      location: 'Buenos Aires, Argentina',
      joined: 'Mar 28, 2025',
      status: 'active',
      programs: ['Financial Literacy'],
      mentor: 'Zainab Ahmed',
      lastActive: '6 hours ago'
    },
    {
      id: 'U-7654',
      name: 'Fatima Al-Farsi',
      email: 'fatima.a@example.com',
      location: 'Dubai, UAE',
      joined: 'Jan 30, 2025',
      status: 'pending',
      programs: ['Career Planning'],
      mentor: 'Unassigned',
      lastActive: 'Never'
    },
    {
      id: 'U-2109',
      name: 'Grace Okafor',
      email: 'grace.o@example.com',
      location: 'Lagos, Nigeria',
      joined: 'Feb 12, 2025',
      status: 'active',
      programs: ['Entrepreneurship', 'Leadership'],
      mentor: 'Dr. Amina Patel',
      lastActive: '2 days ago'
    }
  ];

  // User stats
  const userStats = [
    { title: 'Total Users', value: '5,847' },
    { title: 'Active Users', value: '4,923' },
    { title: 'New This Month', value: '412' },
    { title: 'Retention Rate', value: '84%' }
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-sherise-purple-dark">User Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-sherise-purple/20">
            <Download className="mr-1 h-4 w-4" /> Export
          </Button>
          <Button className="bg-sherise-purple text-white hover:bg-sherise-purple-dark">
            <Plus className="mr-1 h-4 w-4" /> Add User
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        {userStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6 pb-4 px-6 flex flex-col">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle className="text-lg">User Directory</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="pl-10 pr-4 py-2 text-sm rounded-md border border-sherise-purple/20 focus:outline-none focus:ring-2 focus:ring-sherise-purple/30 w-full sm:w-[200px]"
                />
              </div>
              <Button variant="outline" size="sm" className="flex gap-1 border-sherise-purple/20">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] w-full pr-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b border-sherise-purple/10">
                    <th className="text-left py-3 px-4">User ID</th>
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Location</th>
                    <th className="text-left py-3 px-4">Programs</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Mentor</th>
                    <th className="text-left py-3 px-4">Last Active</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sherise-purple/10">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-sherise-purple/5">
                      <td className="py-3 px-4 text-sm">{user.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{user.location}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {user.programs.map((program) => (
                            <Badge key={program} variant="secondary" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={
                          user.status === 'active' ? 'default' : 
                          user.status === 'inactive' ? 'outline' : 'secondary'
                        } className={
                          user.status === 'active' ? 'bg-green-500' : 
                          user.status === 'inactive' ? 'border-red-500 text-red-500' : 'bg-yellow-500'
                        }>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">{user.mentor}</td>
                      <td className="py-3 px-4 text-sm">{user.lastActive}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <div className="h-4 w-4">⋯</div>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AdminUsers;
