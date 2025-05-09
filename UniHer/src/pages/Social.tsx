
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare } from 'lucide-react';

const Social = () => {
  return (
    <AppLayout showSidebar>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-6">Social & Community</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="bg-uniher-orange bg-opacity-10">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Your Community
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="text-gray-600">Connect with like-minded college women, find roommates, and participate in community activities.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Card className="border border-uniher-orange shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">RoomieMatch.AI</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Find your perfect roommate using our AI-powered matching system.</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-uniher-orange shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">OutfitSwap</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Rent or swap dresses with nearby students.</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-uniher-orange shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">MiniMart</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Local buy/sell platform for beauty products, books, and gadgets.</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-uniher-orange shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">SisterGames</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Multiplayer games with verified college women.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-uniher-orange bg-opacity-10">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Community Feed
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500 py-8">Coming soon! Connect with your campus community.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">No upcoming events yet.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Find Friends</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Connect with students who share your interests.</p>
                <div className="flex justify-center">
                  <button className="bg-uniher-orange text-white px-4 py-2 rounded-md">Explore</button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Social;
