
import React from 'react';
import { Book, Users, Heart, Calendar, Video, Award } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Book className="h-8 w-8 text-sherise-purple" />,
      title: 'Personal Growth Paths',
      description: 'Goal-oriented learning tracks with micro-lessons and gamified progress tracking for skills like public speaking, job readiness, and more.'
    },
    {
      icon: <Users className="h-8 w-8 text-sherise-purple" />,
      title: 'MentorConnect',
      description: 'Connect with verified female mentors across domains like career, wellness, and academics with options for 1:1 or group sessions.'
    },
    {
      icon: <Heart className="h-8 w-8 text-sherise-purple" />,
      title: 'Mental Health Support',
      description: 'Access journaling tools, self-reflection prompts, guided meditations, and anonymous chat support for crisis situations.'
    },
    {
      icon: <Video className="h-8 w-8 text-sherise-purple" />,
      title: 'SkillShare + LearnPods',
      description: 'Join peer-led skill sharing rooms for collaborative learning across various domains with digital rewards for participation.'
    },
    {
      icon: <Calendar className="h-8 w-8 text-sherise-purple" />,
      title: 'Period & Health Literacy',
      description: 'Track periods with visual and voice support while accessing verified health education content and anonymous Q&A.'
    },
    {
      icon: <Award className="h-8 w-8 text-sherise-purple" />,
      title: 'Voice & Expression Tools',
      description: 'Share your voice through blogs, poetry, artwork, and storytelling with monthly virtual open-mic style events.'
    },
  ];

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-sherise-purple-dark mb-4">
            Everything You Need to Thrive
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            SheRise combines essential tools and support systems to help you grow, learn, connect, and express yourself in a safe environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-sherise-purple-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
