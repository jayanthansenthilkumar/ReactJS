
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Check, Edit, BookOpen, MessageSquare, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MentalHealthTools = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const { toast } = useToast();
  
  const handleSaveJournal = () => {
    if (journalEntry.trim()) {
      toast({
        title: "Journal Entry Saved",
        description: "Your thoughts have been saved privately.",
      });
      setJournalEntry('');
    }
  };
  
  const reflectionPrompts = [
    "What's something I'm proud of accomplishing this week?",
    "When did I feel most confident today?",
    "What's one small step I can take toward my goals tomorrow?",
    "What made me smile today?",
    "How did I practice self-care today?"
  ];
  
  const resourceCategories = [
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Self-Help Library",
      description: "Easy-to-read guides on stress management, positive thinking, and building resilience."
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Anonymous Chat Support",
      description: "Talk to trained volunteers when you need someone to listen without judgment."
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Guided Meditations",
      description: "Simple audio sessions to help you relax, focus, and feel more grounded."
    }
  ];

  return (
    <section className="py-16 bg-sherise-blue-light/70">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-sherise-purple-dark mb-4">
            Mental Health & Wellbeing
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tools and resources to support your emotional wellbeing, build resilience, and practice self-care.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="journal" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="journal">Journal</TabsTrigger>
              <TabsTrigger value="prompts">Reflection Prompts</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="journal">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sherise-purple-dark">My Private Journal</CardTitle>
                  <CardDescription>
                    Write your thoughts, feelings, or experiences in a safe, private space.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <Edit className="h-4 w-4 text-sherise-purple" />
                    <span className="text-sm text-gray-500">Today's Entry</span>
                  </div>
                  <Textarea
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    placeholder="What's on your mind today?"
                    className="min-h-[180px] resize-none"
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="ghost" 
                    onClick={() => setJournalEntry('')}
                    disabled={!journalEntry.trim()}
                  >
                    Clear
                  </Button>
                  <Button 
                    className="bg-sherise-purple text-white hover:bg-sherise-purple-dark"
                    onClick={handleSaveJournal}
                    disabled={!journalEntry.trim()}
                  >
                    <Check className="mr-2 h-4 w-4" /> Save Entry
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="prompts">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sherise-purple-dark">Daily Reflection Prompts</CardTitle>
                  <CardDescription>
                    Questions to help you reflect, process emotions, and practice gratitude.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {reflectionPrompts.map((prompt, index) => (
                      <li key={index} className="bg-white p-4 rounded-lg shadow-sm border border-sherise-pink/20">
                        <p className="text-gray-700">{prompt}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-sherise-purple text-sherise-purple hover:bg-sherise-purple/5">
                    Get New Prompts
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sherise-purple-dark">Mental Health Resources</CardTitle>
                  <CardDescription>
                    Access tools and support for your emotional wellbeing journey.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {resourceCategories.map((resource, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-sherise-blue/30 hover:border-sherise-purple/30 transition-all cursor-pointer"
                      >
                        <div className="mt-0.5 bg-sherise-purple/10 p-2 rounded-full text-sherise-purple">
                          {resource.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-sherise-purple-dark mb-1">{resource.title}</h4>
                          <p className="text-sm text-gray-600">{resource.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-sherise-purple text-white hover:bg-sherise-purple-dark">
                    Explore All Resources
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default MentalHealthTools;
