
import React from 'react';
import { Bot } from 'lucide-react';

const aiFeatures = [
  {
    title: 'Daily Nudge Bot',
    description: 'Get customized micro-motivations and reminders tailored to your schedule and goals.',
    bgColor: 'uniher-pink'
  },
  {
    title: 'CrushCode Coach',
    description: 'Learn about healthy boundaries, consent, and identify dating red flags with personalized guidance.',
    bgColor: 'uniher-blue'
  },
  {
    title: 'Dresser.AI',
    description: 'Get outfit suggestions based on your event, mood, weather, and available clothes in your wardrobe.',
    bgColor: 'uniher-green'
  },
  {
    title: 'Scholarly AI',
    description: 'Automatically find and apply to scholarships that match your profile, interests, and eligibility.',
    bgColor: 'uniher-yellow'
  },
];

const AIFeatures = () => {
  return (
    <section className="py-20 bg-uniher-gray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm mb-4">
            <Bot className="h-4 w-4 text-uniher-purple" />
            <span className="text-sm font-medium">AI-Powered Tools</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Intelligent Support <span className="gradient-text">Just for You</span>
          </h2>
          
          <p className="text-gray-600">
            Our AI tools are designed specifically for college women, providing personalized assistance across all aspects of campus life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aiFeatures.map((feature, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl bg-white border border-border shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-full bg-${feature.bgColor} flex items-center justify-center mb-4`}>
                <Bot className="h-5 w-5 text-gray-800" />
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-600">
                {feature.description}
              </p>
              
              <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-uniher-purple flex items-center justify-center">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-xs font-medium">AI Assistant</span>
                </div>
                <div className="text-sm mt-2">
                  {index === 0 ? (
                    "Good morning! Your study group meets in 30 minutes. I've prepared your notes."
                  ) : index === 1 ? (
                    "That comment seems concerning. Would you like me to explain why this might be a red flag?"
                  ) : index === 2 ? (
                    "For today's presentation, I suggest your navy blazer with the white top - professional but comfortable."
                  ) : (
                    "I found 3 new scholarships that match your profile. Deadline for submission is next Friday."
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
