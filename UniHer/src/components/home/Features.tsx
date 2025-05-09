
import React from 'react';
import { BookOpen, Heart, Shield, GraduationCap, Users } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    color: 'uniher-green',
    title: 'Academics Module',
    description: 'Smart planner, timetables, exam alerts, and a menstrual-sync study planner to optimize your academic performance.',
    features: ['Smart Planner', 'HerVoice', 'SheCred']
  },
  {
    icon: GraduationCap,
    color: 'uniher-blue',
    title: 'Career Module',
    description: 'Curated internships, mentorship connections, and startup resources tailored for ambitious college women.',
    features: ['MentHer', 'IdeaBloom', 'SheWorks']
  },
  {
    icon: Heart,
    color: 'uniher-yellow',
    title: 'Wellness Module',
    description: 'Period tracking, mental health resources, and wellness challenges to help you maintain balance.',
    features: ['Cycle Tracker', 'ZenSpace', 'GrowWithHer']
  },
  {
    icon: Shield,
    color: 'uniher-pink',
    title: 'Safety Module',
    description: 'Emergency contacts, safety analysis for communications, and privacy protection features.',
    features: ['SafeCircle', 'TextCheck AI', 'SelfGuard']
  },
  {
    icon: Users,
    color: 'uniher-orange',
    title: 'Social & Community',
    description: 'Connect with like-minded college women, find roommates, and participate in community activities.',
    features: ['RoomieMatch.AI', 'OutfitSwap', 'SisterGames']
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            All-in-One <span className="gradient-text">Platform</span> for College Girls
          </h2>
          <p className="text-gray-600">
            UniHer combines everything you need to thrive in college into one seamless, secure platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card group hover:border-uniher-purple transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6 text-gray-800" />
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.features.map((item, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <span className="w-1.5 h-1.5 bg-uniher-purple rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
