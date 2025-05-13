
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Download, Plus, Search } from 'lucide-react';

const MentorResources = () => {
  // Dummy resources data
  const resources = [
    {
      title: "First Mentoring Session Guide",
      description: "A comprehensive guide to conducting effective first mentoring sessions, including icebreakers and goal-setting activities.",
      category: "Guides",
      format: "PDF",
      size: "1.2 MB",
      lastUpdated: "June 2, 2025",
      downloads: 235
    },
    {
      title: "Career Path Conversation Templates",
      description: "Frameworks and question prompts for helping mentees explore career interests and set professional development goals.",
      category: "Templates",
      format: "PDF",
      size: "980 KB",
      lastUpdated: "May 28, 2025",
      downloads: 178
    },
    {
      title: "Financial Literacy Workshop Materials",
      description: "Slides, worksheets, and activities for teaching basic financial concepts to young women.",
      category: "Workshop Materials",
      format: "ZIP",
      size: "3.4 MB",
      lastUpdated: "May 20, 2025",
      downloads: 132
    },
    {
      title: "Mental Health First Aid Reference",
      description: "Quick reference guide for identifying signs of mental health challenges and providing appropriate support.",
      category: "Guides",
      format: "PDF",
      size: "2.1 MB",
      lastUpdated: "June 4, 2025",
      downloads: 258
    },
    {
      title: "Resume & Cover Letter Feedback Rubric",
      description: "Standardized rubric for providing constructive feedback on mentees' job application materials.",
      category: "Templates",
      format: "XLSX",
      size: "450 KB",
      lastUpdated: "May 15, 2025",
      downloads: 194
    },
    {
      title: "Mentoring Progress Tracker",
      description: "Template to track mentee goals, milestones, and progress over time.",
      category: "Templates",
      format: "XLSX",
      size: "380 KB",
      lastUpdated: "June 1, 2025",
      downloads: 215
    }
  ];

  return (
    <DashboardLayout userType="mentor">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-sherise-purple-dark">Mentoring Resources</h1>
        <Button className="bg-sherise-purple text-white hover:bg-sherise-purple-dark">
          <Plus className="mr-1 h-4 w-4" /> Submit Resource
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          <Button variant="default" size="sm" className="bg-sherise-purple">All Resources</Button>
          <Button variant="outline" size="sm" className="border-sherise-purple/20">Guides</Button>
          <Button variant="outline" size="sm" className="border-sherise-purple/20">Templates</Button>
          <Button variant="outline" size="sm" className="border-sherise-purple/20">Workshop Materials</Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            className="pl-10 pr-4 py-2 text-sm rounded-md border border-sherise-purple/20 focus:outline-none focus:ring-2 focus:ring-sherise-purple/30 w-full md:w-[250px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <Card key={index} className="shadow-sm hover:shadow transition-all duration-300 border-sherise-purple/10">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-sherise-purple-dark">{resource.title}</CardTitle>
                <Badge variant="outline" className="bg-sherise-purple/10 text-sherise-purple border-0">
                  {resource.format}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{resource.description}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center">
                  <BookOpen className="mr-1 h-3 w-3" />
                  <span>{resource.category}</span>
                </div>
                <div>Updated {resource.lastUpdated}</div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{resource.downloads} downloads • {resource.size}</span>
                <Button variant="outline" size="sm" className="border-sherise-purple text-sherise-purple hover:bg-sherise-purple/5">
                  <Download className="mr-1 h-4 w-4" /> Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default MentorResources;
