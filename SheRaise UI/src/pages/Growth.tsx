
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Filter, BookOpen, Clock, Award, Star, Users } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const Growth = () => {
  // Dummy growth paths data
  const featuredPaths = [
    {
      title: "Public Speaking Confidence",
      description: "Overcome fear and speak with confidence in any situation, from class presentations to formal speeches.",
      category: "Communication",
      level: "Beginner",
      modules: 12,
      duration: "8 weeks",
      enrolled: 5280,
      completion: 87,
      image: "bg-gradient-to-r from-sherise-purple-light to-sherise-blue-light"
    },
    {
      title: "Financial Literacy Basics",
      description: "Learn essential money management skills, from budgeting to saving, investing and planning for your future.",
      category: "Life Skills",
      level: "Beginner",
      modules: 10,
      duration: "6 weeks",
      enrolled: 4185,
      completion: 72,
      image: "bg-gradient-to-r from-sherise-pink-light to-sherise-peach-light"
    },
    {
      title: "Job Interview Mastery",
      description: "Build the confidence and skills to ace any interview, from preparation to follow-up.",
      category: "Career",
      level: "Intermediate",
      modules: 8,
      duration: "4 weeks",
      enrolled: 3842,
      completion: 78,
      image: "bg-gradient-to-r from-sherise-blue-light to-sherise-purple-light"
    }
  ];
  
  const allPaths = [
    {
      title: "Leadership Fundamentals",
      category: "Personal Growth",
      level: "Intermediate",
      modules: 9,
      enrolled: 2845
    },
    {
      title: "Digital Literacy Skills",
      category: "Tech",
      level: "Beginner",
      modules: 10,
      enrolled: 3250
    },
    {
      title: "Emotional Intelligence",
      category: "Mental Health",
      level: "All Levels",
      modules: 7,
      enrolled: 2980
    },
    {
      title: "Entrepreneurship Basics",
      category: "Career",
      level: "Intermediate",
      modules: 12,
      enrolled: 2145
    },
    {
      title: "Assertive Communication",
      category: "Communication",
      level: "Beginner",
      modules: 8,
      enrolled: 2350
    },
    {
      title: "Healthy Relationships",
      category: "Life Skills",
      level: "All Levels",
      modules: 6,
      enrolled: 2765
    },
    {
      title: "Study Skills & Productivity",
      category: "Education",
      level: "All Levels",
      modules: 9,
      enrolled: 3120
    },
    {
      title: "Tech Career Exploration",
      category: "Career",
      level: "Beginner",
      modules: 10,
      enrolled: 2240
    },
    {
      title: "Health & Wellness Basics",
      category: "Health",
      level: "Beginner",
      modules: 7,
      enrolled: 2570
    }
  ];
  
  // Dummy categories
  const categories = [
    "All Categories",
    "Career", 
    "Communication", 
    "Education", 
    "Health", 
    "Life Skills", 
    "Mental Health", 
    "Personal Growth", 
    "Tech"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-12 bg-sherise-purple/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-sherise-purple-dark mb-4">Personal Growth Paths</h1>
              <p className="text-lg text-gray-600">
                Discover structured, self-paced learning journeys designed to help you develop essential life skills and reach your full potential.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="bg-white" size="sm">Recommended</Button>
                <Button variant="outline" className="border-sherise-purple/20 text-sherise-purple bg-white" size="sm">Popular</Button>
                <Button variant="outline" className="border-sherise-purple/20 bg-white" size="sm">New</Button>
                <Button variant="outline" className="border-sherise-purple/20 bg-white" size="sm">Beginner Friendly</Button>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search paths..." 
                    className="pl-10 pr-4 py-2 text-sm rounded-md border border-sherise-purple/20 focus:outline-none focus:ring-2 focus:ring-sherise-purple/30 w-full md:w-[200px] bg-white"
                  />
                </div>
                <Button variant="outline" className="flex gap-1 border-sherise-purple/20 bg-white">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </div>
            </div>

            <div className="mb-10">
              <ScrollArea className="w-full whitespace-nowrap pb-4 mb-6">
                <div className="flex space-x-2 p-1">
                  {categories.map((category) => (
                    <Button 
                      key={category} 
                      variant={category === "All Categories" ? "default" : "outline"}
                      size="sm"
                      className={category === "All Categories" ? "bg-sherise-purple text-white" : "border-sherise-purple/20 bg-white"}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            <div className="space-y-6 mb-16">
              <h2 className="text-2xl font-bold text-sherise-purple-dark mb-6">Featured Growth Paths</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPaths.map((path, index) => (
                  <Card key={index} className="overflow-hidden border-sherise-blue/20 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className={`h-32 ${path.image}`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-sherise-purple/80">{path.category}</Badge>
                        <Badge variant="outline" className="border-sherise-purple/30">{path.level}</Badge>
                      </div>
                      <CardTitle className="text-xl text-sherise-purple-dark">{path.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{path.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4 text-sherise-purple" />
                          <span>{path.modules} Modules</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-sherise-purple" />
                          <span>{path.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-sherise-purple" />
                          <span>{path.enrolled.toLocaleString()} Enrolled</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="mr-2 h-4 w-4 text-sherise-purple" />
                          <span>Certificate</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Completion Rate</span>
                          <span>{path.completion}%</span>
                        </div>
                        <Progress value={path.completion} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-sherise-purple text-white hover:bg-sherise-purple-dark">
                        Start Learning
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-sherise-purple-dark mb-6">Explore All Paths</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allPaths.map((path, index) => (
                  <Card key={index} className="border-sherise-blue/10 shadow-sm hover:shadow transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{path.category}</Badge>
                        <Badge variant="outline" className="border-sherise-purple/20">{path.level}</Badge>
                      </div>
                      <CardTitle className="text-lg text-sherise-purple-dark">{path.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-2 text-sm">
                        <div className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4 text-sherise-purple" />
                          <span>{path.modules} Modules</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-sherise-purple" />
                          <span>{path.enrolled.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full border-sherise-purple text-sherise-purple hover:bg-sherise-purple/5">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Growth;
