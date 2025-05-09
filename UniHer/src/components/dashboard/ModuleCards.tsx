
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Shield, GraduationCap, Users } from 'lucide-react';

const modules = [
  {
    title: 'Academics',
    icon: BookOpen,
    color: 'green',
    count: '3 tasks',
    link: '/academics',
    updates: [
      { text: 'English Literature essay due tomorrow', urgent: true },
      { text: 'Physics quiz scheduled for Friday' }
    ]
  },
  {
    title: 'Career',
    icon: GraduationCap,
    color: 'blue',
    count: '2 opportunities',
    link: '/career',
    updates: [
      { text: 'Tech internship application closes today', urgent: true },
      { text: 'New mentor match available' }
    ]
  },
  {
    title: 'Wellness',
    icon: Heart,
    color: 'yellow',
    count: '1 reminder',
    link: '/wellness',
    updates: [
      { text: 'Period expected in 3 days' },
      { text: 'Remember to log water intake' }
    ]
  },
  {
    title: 'Safety',
    icon: Shield,
    color: 'pink',
    count: 'All good',
    link: '/safety',
    updates: [
      { text: 'Campus alerts: None' },
      { text: 'Privacy check completed yesterday' }
    ]
  },
  {
    title: 'Social',
    icon: Users,
    color: 'orange',
    count: '3 events',
    link: '/social',
    updates: [
      { text: 'Roommate finder has 5 new matches' },
      { text: 'Book club meeting tonight at 7pm', urgent: true }
    ]
  }
];

const ModuleCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {modules.map((module, index) => {
        const IconComponent = module.icon;
        
        return (
          <Link 
            key={index} 
            to={module.link} 
            className="module-card group hover:scale-[1.02] transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg bg-uniher-${module.color} flex items-center justify-center`}>
                <IconComponent className="h-5 w-5 text-gray-800" />
              </div>
              
              <div className={`px-3 py-1 rounded-full bg-uniher-${module.color} bg-opacity-20 text-xs font-medium`}>
                {module.count}
              </div>
            </div>
            
            <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-uniher-purple transition-colors">
              {module.title}
            </h3>
            
            <div className="space-y-2 mt-4">
              {module.updates.map((update, i) => (
                <div 
                  key={i} 
                  className={`text-sm p-2 rounded-md ${
                    update.urgent 
                      ? 'bg-red-50 text-red-700 border-l-2 border-red-500' 
                      : 'bg-gray-50 text-gray-700'
                  }`}
                >
                  {update.text}
                </div>
              ))}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ModuleCards;
