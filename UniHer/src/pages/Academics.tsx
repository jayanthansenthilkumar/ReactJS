
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import StudyPlanner from '@/components/modules/academics/StudyPlanner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, PenLine, GraduationCap } from 'lucide-react';

const Academics = () => {
  return (
    <AppLayout showSidebar>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-heading font-bold">Academics</h1>
          
          <div className="px-4 py-1 rounded-full bg-uniher-green bg-opacity-20 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium">Productive Week</span>
          </div>
        </div>
        
        <Tabs defaultValue="study-planner">
          <TabsList className="mb-6">
            <TabsTrigger value="study-planner" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Study Planner
            </TabsTrigger>
            <TabsTrigger value="sheVoice" className="flex items-center gap-2">
              <PenLine className="h-4 w-4" /> HerVoice
            </TabsTrigger>
            <TabsTrigger value="sheCred" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" /> SheCred
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="study-planner">
            <StudyPlanner />
          </TabsContent>
          
          <TabsContent value="sheVoice">
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h2 className="text-xl font-heading font-semibold mb-4">HerVoice - Public Speaking & Viva Simulator</h2>
              <p className="text-gray-600 mb-6">
                Practice public speaking, presentations, and viva exams with AI-powered feedback and guidance.
              </p>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3">Click to start a practice session</p>
                  <button className="bg-uniher-purple hover:bg-uniher-purple-dark text-white rounded-full p-3">
                    <PenLine className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Coming soon in the next update. Join the waitlist to be notified!
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="sheCred">
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h2 className="text-xl font-heading font-semibold mb-4">SheCred - Course & Certification Roadmap</h2>
              <p className="text-gray-600 mb-6">
                Get personalized recommendations for courses and certifications based on your career goals.
              </p>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3">Click to set up your learning roadmap</p>
                  <button className="bg-uniher-purple hover:bg-uniher-purple-dark text-white rounded-full p-3">
                    <GraduationCap className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Coming soon in the next update. Join the waitlist to be notified!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Academics;
