
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface WelcomeCardProps {
  name?: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ name = "Sarah" }) => {
  // Get the current time to display appropriate greeting
  const hours = new Date().getHours();
  let greeting = '';
  
  if (hours < 12) {
    greeting = 'Good morning';
  } else if (hours < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-heading font-semibold mb-2">
          {greeting}, {name}!
        </h2>
        <p className="text-gray-600 mb-4">
          Welcome to your UniHer dashboard. Here's what's happening today.
        </p>
        <Button variant="ghost" size="sm" className="text-uniher-purple-dark">
          View all updates <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <div className="flex border-t border-border overflow-x-auto hide-scrollbar">
        <div className="p-4 border-r border-border min-w-[180px]">
          <div className="text-sm font-medium text-gray-500 mb-1">Classes Today</div>
          <div className="text-xl font-semibold">3</div>
        </div>
        <div className="p-4 border-r border-border min-w-[180px]">
          <div className="text-sm font-medium text-gray-500 mb-1">Assignments Due</div>
          <div className="text-xl font-semibold">2</div>
        </div>
        <div className="p-4 border-r border-border min-w-[180px]">
          <div className="text-sm font-medium text-gray-500 mb-1">Wellness Score</div>
          <div className="text-xl font-semibold">85%</div>
        </div>
        <div className="p-4 min-w-[180px]">
          <div className="text-sm font-medium text-gray-500 mb-1">New Opportunities</div>
          <div className="text-xl font-semibold">4</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
