
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, MapPin, MessageSquare, AlertCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const Safety = () => {
  const [locationSharing, setLocationSharing] = useState(false);
  
  return (
    <AppLayout showSidebar>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-heading font-bold">Safety</h1>
          
          <div className="px-4 py-1 rounded-full bg-green-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium">All Systems Active</span>
          </div>
        </div>
        
        <Tabs defaultValue="safe-circle">
          <TabsList className="mb-6">
            <TabsTrigger value="safe-circle" className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> SafeCircle
            </TabsTrigger>
            <TabsTrigger value="text-check" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> TextCheck AI
            </TabsTrigger>
            <TabsTrigger value="self-guard" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> SelfGuard
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="safe-circle">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Emergency Contacts</span>
                      <Button variant="outline" size="sm">Add Contact</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                              <span className="font-semibold text-red-500">M</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Mom</h4>
                              <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="text-red-500">
                            SOS Call
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="font-semibold text-blue-500">D</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Dad</h4>
                              <p className="text-sm text-gray-600">+1 (555) 987-6543</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="text-red-500">
                            SOS Call
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <span className="font-semibold text-green-500">R</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Roommate (Ashley)</h4>
                              <p className="text-sm text-gray-600">+1 (555) 234-5678</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="text-red-500">
                            SOS Call
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
                        <p className="text-sm text-gray-600 mb-2">Add campus security or additional emergency contacts</p>
                        <Button variant="ghost" size="sm" className="text-uniher-purple">
                          + Add Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Campus Path Planner</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center">
                      <MapPin className="h-12 w-12 text-uniher-purple mb-4" />
                      <h3 className="text-lg font-medium mb-2">Campus Map Integration</h3>
                      <p className="text-sm text-gray-600 text-center mb-4">
                        Plan the safest routes across campus, with well-lit paths and security checkpoint indicators.
                      </p>
                      <Button className="bg-uniher-purple hover:bg-uniher-purple-dark">
                        Connect Campus Map
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Location Sharing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-6">
                      <Checkbox 
                        id="location-sharing" 
                        checked={locationSharing} 
                        onCheckedChange={() => setLocationSharing(!locationSharing)}
                      />
                      <label
                        htmlFor="location-sharing"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Enable location sharing with trusted contacts
                      </label>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <h4 className="font-medium mb-2">Safe Timer</h4>
                        <p className="text-xs text-gray-600 mb-4">
                          Set a timer for when you expect to reach your destination. 
                          If you don't check in by then, alerts will be sent to your emergency contacts.
                        </p>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Where are you going?" 
                            className="text-sm" 
                          />
                          <Button variant="outline" size="sm">Set</Button>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                        <h4 className="font-medium flex items-center text-red-700 mb-2">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          SOS Button
                        </h4>
                        <p className="text-xs text-gray-700 mb-4">
                          In case of emergency, press the button below to alert all your emergency contacts with your current location.
                        </p>
                        <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                          SOS Emergency Alert
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="text-check">
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h2 className="text-xl font-heading font-semibold mb-4">TextCheck AI - Safety Analysis for Messages</h2>
              <p className="text-gray-600 mb-6">
                Our AI tool helps analyze messages and job offers for potential red flags or safety concerns.
              </p>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3">Paste text to analyze for safety concerns</p>
                  <button className="bg-uniher-purple hover:bg-uniher-purple-dark text-white rounded-full p-3">
                    <MessageSquare className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Coming soon in the next update. Join the waitlist to be notified!
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="self-guard">
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h2 className="text-xl font-heading font-semibold mb-4">SelfGuard - Privacy Protection</h2>
              <p className="text-gray-600 mb-6">
                Scan your social media and online presence for privacy risks and get recommendations to improve your online safety.
              </p>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3">Connect accounts to scan for privacy concerns</p>
                  <button className="bg-uniher-purple hover:bg-uniher-purple-dark text-white rounded-full p-3">
                    <AlertCircle className="h-6 w-6" />
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

export default Safety;
