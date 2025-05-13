
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, BookOpen, Users, Plus, Edit, Archive } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

const AdminGrowthPaths = () => {
  // Dummy growth paths data
  const paths = [
    {
      id: "GP-001",
      title: "Public Speaking Confidence",
      description: "Overcome fear and speak with confidence in any situation.",
      category: "Communication",
      level: "Beginner",
      modules: 12,
      users: 5280,
      completionRate: 87,
      status: "active",
      lastUpdated: "June 2, 2025"
    },
    {
      id: "GP-002",
      title: "Financial Literacy Basics",
      description: "Learn essential money management skills for your future.",
      category: "Life Skills",
      level: "Beginner",
      modules: 10,
      users: 4185,
      completionRate: 72,
      status: "active",
      lastUpdated: "May 28, 2025"
    },
    {
      id: "GP-003",
      title: "Job Interview Mastery",
      description: "Build the confidence and skills to ace any interview.",
      category: "Career",
      level: "Intermediate",
      modules: 8,
      users: 3842,
      completionRate: 78,
      status: "active",
      lastUpdated: "May 15, 2025"
    },
    {
      id: "GP-004",
      title: "Leadership Fundamentals",
      description: "Develop essential leadership skills for any context.",
      category: "Personal Growth",
      level: "Intermediate",
      modules: 9,
      users: 2845,
      completionRate: 69,
      status: "active",
      lastUpdated: "April 30, 2025"
    },
    {
      id: "GP-005",
      title: "Digital Literacy Skills",
      description: "Master the digital tools for education and career success.",
      category: "Tech",
      level: "Beginner",
      modules: 10,
      users: 3250,
      completionRate: 81,
      status: "active",
      lastUpdated: "May 10, 2025"
    },
    {
      id: "GP-006",
      title: "Emotional Intelligence",
      description: "Understand, manage, and express emotions effectively.",
      category: "Mental Health",
      level: "All Levels",
      modules: 7,
      users: 2980,
      completionRate: 75,
      status: "active",
      lastUpdated: "May 22, 2025"
    },
    {
      id: "GP-007",
      title: "Entrepreneurship Basics",
      description: "Learn the fundamentals of starting your own business.",
      category: "Career",
      level: "Intermediate",
      modules: 12,
      users: 2145,
      completionRate: 63,
      status: "active",
      lastUpdated: "April 18, 2025"
    },
    {
      id: "GP-008",
      title: "Creative Writing Workshop",
      description: "Express yourself through various writing styles and techniques.",
      category: "Education",
      level: "Beginner",
      modules: 8,
      users: 1890,
      completionRate: 70,
      status: "draft",
      lastUpdated: "June 4, 2025"
    },
    {
      id: "GP-009",
      title: "Personal Cybersecurity",
      description: "Protect your digital identity and stay safe online.",
      category: "Tech",
      level: "Beginner",
      modules: 6,
      users: 0,
      completionRate: 0,
      status: "draft",
      lastUpdated: "June 5, 2025"
    }
  ];

  // Path stats
  const pathStats = [
    { title: 'Total Paths', value: '24', change: '+3 this month', trend: 'up' },
    { title: 'Active Users', value: '28,520', change: '+1,245 this month', trend: 'up' },
    { title: 'Completion Rate', value: '73%', change: '+2% this month', trend: 'up' },
    { title: 'Avg. Modules', value: '8.4', change: 'No change', trend: 'neutral' }
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-sherise-purple-dark">Growth Paths Management</h1>
        <Button className="bg-sherise-purple text-white hover:bg-sherise-purple-dark">
          <Plus className="mr-1 h-4 w-4" /> Create New Path
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        {pathStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6 pb-4 px-6 flex flex-col">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
              <p className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-gray-500'}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          <Button variant="default" size="sm" className="bg-sherise-purple">All Paths</Button>
          <Button variant="outline" size="sm" className="border-sherise-purple/20">Active</Button>
          <Button variant="outline" size="sm" className="border-sherise-purple/20">Draft</Button>
          <Button variant="outline" size="sm" className="border-sherise-purple/20">Archived</Button>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search paths..." 
              className="pl-10 pr-4 py-2 text-sm rounded-md border border-sherise-purple/20 focus:outline-none focus:ring-2 focus:ring-sherise-purple/30 w-full md:w-[200px]"
            />
          </div>
          <Button variant="outline" size="sm" className="flex gap-1 border-sherise-purple/20">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      <Card>
        <ScrollArea className="h-[600px]">
          <CardContent className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b border-sherise-purple/10">
                    <th className="text-left py-3 px-4">Path ID</th>
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Modules</th>
                    <th className="text-left py-3 px-4">Users</th>
                    <th className="text-left py-3 px-4">Completion</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Last Updated</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sherise-purple/10">
                  {paths.map((path) => (
                    <tr key={path.id} className="hover:bg-sherise-purple/5">
                      <td className="py-3 px-4 text-sm">{path.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{path.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{path.description}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className="text-xs">
                          {path.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4 text-sherise-purple" />
                          <span>{path.modules}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-sherise-purple" />
                          <span>{path.users.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 min-w-[140px]">
                        <div className="space-y-1">
                          <Progress value={path.completionRate} className="h-1.5" />
                          <div className="text-xs text-gray-500">{path.completionRate}%</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={
                          path.status === 'active' ? 'default' : 
                          path.status === 'draft' ? 'secondary' : 'outline'
                        } className={
                          path.status === 'active' ? 'bg-green-500' : 
                          path.status === 'draft' ? 'bg-amber-500' : ''
                        }>
                          {path.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{path.lastUpdated}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Archive className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </DashboardLayout>
  );
};

export default AdminGrowthPaths;
