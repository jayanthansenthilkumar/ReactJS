
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const GrowthPathPreview = () => {
  const paths = [
    {
      title: "Public Speaking Confidence",
      progress: 35,
      lessons: 12,
      completed: 4,
      image: "bg-gradient-to-r from-sherise-purple-light to-sherise-blue-light"
    },
    {
      title: "Financial Literacy Basics",
      progress: 20,
      lessons: 10,
      completed: 2,
      image: "bg-gradient-to-r from-sherise-pink-light to-sherise-peach-light"
    },
    {
      title: "Job Interview Preparation",
      progress: 60,
      lessons: 8,
      completed: 5,
      image: "bg-gradient-to-r from-sherise-blue-light to-sherise-purple-light"
    }
  ];

  return (
    <section className="py-16 bg-sherise-purple/5">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-sherise-purple-dark mb-4">
            Personal Growth Paths
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow structured learning paths to develop essential life skills at your own pace, with bite-sized lessons and weekly milestones.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paths.map((path, index) => (
            <Card key={index} className="overflow-hidden border-sherise-blue/20 shadow-md">
              <div className={`h-24 ${path.image}`}></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-sherise-purple-dark">{path.title}</CardTitle>
                <CardDescription>
                  {path.completed} of {path.lessons} lessons completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={path.progress} className="h-2 mb-4" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{path.progress}% complete</span>
                  <Button variant="ghost" size="sm" className="text-sherise-purple hover:text-sherise-purple-dark hover:bg-sherise-purple/5">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button className="bg-sherise-purple text-white hover:bg-sherise-purple-dark">
            Explore All Growth Paths
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GrowthPathPreview;
