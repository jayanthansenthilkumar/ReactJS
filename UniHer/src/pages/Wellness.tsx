
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, Smile, Activity, Circle, Clock, Droplets } from 'lucide-react';

const Wellness = () => {
  const [currentPhase, setCurrentPhase] = useState('Follicular');
  const [cycleDay, setCycleDay] = useState(9);
  const [periodIn, setPeriodIn] = useState(21);
  
  return (
    <AppLayout showSidebar>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-heading font-bold">Wellness</h1>
          
          <div className="px-4 py-1 rounded-full bg-uniher-yellow bg-opacity-20 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span className="text-sm font-medium">Cycle Day {cycleDay}</span>
          </div>
        </div>
        
        <Tabs defaultValue="cycle-tracker">
          <TabsList className="mb-6">
            <TabsTrigger value="cycle-tracker" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Cycle Tracker
            </TabsTrigger>
            <TabsTrigger value="zen-space" className="flex items-center gap-2">
              <Smile className="h-4 w-4" /> ZenSpace
            </TabsTrigger>
            <TabsTrigger value="grow-with-her" className="flex items-center gap-2">
              <Activity className="h-4 w-4" /> GrowWithHer
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cycle-tracker">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Cycle Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-medium">Current Phase: {currentPhase}</h3>
                        <p className="text-sm text-gray-600">Day {cycleDay} of your cycle</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" /> View Calendar
                        </Button>
                      </div>
                    </div>
                    
                    <div className="relative h-6 bg-gray-100 rounded-full mb-6 overflow-hidden">
                      {/* Cycle phases visualization */}
                      <div className="absolute h-full w-1/4 bg-red-300" title="Menstrual"></div>
                      <div className="absolute h-full w-1/4 left-1/4 bg-yellow-300" title="Follicular"></div>
                      <div className="absolute h-full w-1/4 left-2/4 bg-green-300" title="Ovulatory"></div>
                      <div className="absolute h-full w-1/4 left-3/4 bg-blue-300" title="Luteal"></div>
                      
                      {/* Current day indicator */}
                      <div 
                        className="absolute h-8 w-1 bg-uniher-purple top-1/2 transform -translate-y-1/2 z-10"
                        style={{ left: `${(cycleDay / 28) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Day 1</span>
                      <span>Day 14</span>
                      <span>Day 28</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-uniher-yellow bg-opacity-10 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Upcoming Period</h4>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-red-500 mr-2" />
                          <span>In {periodIn} days</span>
                        </div>
                      </div>
                      
                      <div className="bg-uniher-green bg-opacity-10 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Fertility Window</h4>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-green-500 mr-2" />
                          <span>Not in fertile window</span>
                        </div>
                      </div>
                      
                      <div className="bg-uniher-blue bg-opacity-10 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Next Ovulation</h4>
                        <div className="flex items-center">
                          <Circle className="h-5 w-5 text-blue-500 mr-2" />
                          <span>In 5 days</span>
                        </div>
                      </div>
                      
                      <div className="bg-uniher-pink bg-opacity-10 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Cycle Length</h4>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-uniher-purple mr-2" />
                          <span>28 days (average)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-uniher-purple bg-opacity-10 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Heart className="h-4 w-4 mr-2 text-uniher-purple" />
                        Mood & Energy
                      </h4>
                      <p className="text-sm mb-3">
                        During the {currentPhase} phase, you typically experience higher energy levels and improved mood.
                      </p>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Energy</span>
                            <span>High</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full">
                            <div className="h-full bg-green-500 rounded-full w-4/5"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Focus</span>
                            <span>Medium-High</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full">
                            <div className="h-full bg-green-500 rounded-full w-3/5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Daily Recommendations</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-blue-500" />
                          <span>Aim for 2.5L of water today</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-green-500" />
                          <span>Good day for strength training</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span>Take iron-rich foods</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="pt-3 border-t border-border">
                      <Button className="w-full bg-uniher-purple hover:bg-uniher-purple-dark">
                        Log Today's Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="zen-space">
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h2 className="text-xl font-heading font-semibold mb-4">ZenSpace - Meditation & Stress Relief</h2>
              <p className="text-gray-600 mb-6">
                Quick meditation, audio therapy, and stress relief exercises tailored to your needs.
              </p>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3">Click to start a meditation session</p>
                  <button className="bg-uniher-purple hover:bg-uniher-purple-dark text-white rounded-full p-3">
                    <Smile className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Coming soon in the next update. Join the waitlist to be notified!
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="grow-with-her">
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h2 className="text-xl font-heading font-semibold mb-4">GrowWithHer - Team Wellness Challenges</h2>
              <p className="text-gray-600 mb-6">
                Join team-based wellness challenges with other college girls to build healthy habits.
              </p>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3">Click to join or create a challenge</p>
                  <button className="bg-uniher-purple hover:bg-uniher-purple-dark text-white rounded-full p-3">
                    <Activity className="h-6 w-6" />
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

export default Wellness;
