
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, Calendar, MessageSquare, Heart } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Mentors = () => {
  // Dummy mentors data
  const featuredMentors = [
    {
      name: "Dr. Amina Patel",
      role: "Career Development Specialist",
      location: "Mumbai, India",
      languages: ["English", "Hindi"],
      expertise: ["Resume Building", "Interview Skills", "Career Planning", "Tech Careers"],
      bio: "Career coach with 10+ years experience in tech & education. Specializes in helping young women break into male-dominated fields.",
      experience: "10+ years",
      rating: 4.9,
      reviews: 128,
      availability: "High",
      photo: "bg-sherise-purple/20"
    },
    {
      name: "Michelle Johnson",
      role: "Mental Health Advocate",
      location: "New York, USA",
      languages: ["English", "Spanish"],
      expertise: ["Anxiety Management", "Self-Care", "Mindfulness", "Crisis Support"],
      bio: "Licensed therapist dedicated to making mental health resources accessible to young women from diverse backgrounds.",
      experience: "8 years",
      rating: 4.8,
      reviews: 93,
      availability: "Medium",
      photo: "bg-sherise-blue/20"
    },
    {
      name: "Zainab Ahmed",
      role: "Financial Educator",
      location: "Nairobi, Kenya",
      languages: ["English", "Swahili"],
      expertise: ["Budgeting", "Savings", "Financial Planning", "Entrepreneurship"],
      bio: "Finance professional passionate about teaching financial literacy to young women for future independence and security.",
      experience: "7 years",
      rating: 4.7,
      reviews: 86,
      availability: "High",
      photo: "bg-sherise-pink/20"
    }
  ];
  
  const allMentors = [
    {
      name: "Sofia Rodriguez",
      role: "STEM Education Specialist",
      location: "Mexico City, Mexico",
      languages: ["Spanish", "English"],
      expertise: ["Computer Science", "Engineering", "Mathematics"],
      bio: "Physics professor helping girls pursue STEM careers.",
      experience: "9 years",
      rating: 4.6,
      reviews: 74,
      availability: "Medium",
      photo: "bg-sherise-blue/20"
    },
    {
      name: "Priya Sharma",
      role: "Public Speaking Coach",
      location: "New Delhi, India",
      languages: ["Hindi", "English"],
      expertise: ["Confidence Building", "Speech Writing", "Presentation Skills"],
      bio: "Communications expert who has trained 1000+ women in public speaking.",
      experience: "12 years",
      rating: 4.9,
      reviews: 142,
      availability: "Limited",
      photo: "bg-sherise-pink/20"
    },
    {
      name: "Fatima Al-Mansouri",
      role: "Leadership Development",
      location: "Dubai, UAE",
      languages: ["Arabic", "English"],
      expertise: ["Leadership", "Management Skills", "Decision Making"],
      bio: "Business executive helping young women develop leadership capabilities.",
      experience: "15 years",
      rating: 4.8,
      reviews: 105,
      availability: "Medium",
      photo: "bg-sherise-purple/20"
    },
    {
      name: "Grace Okafor",
      role: "Entrepreneurship Mentor",
      location: "Lagos, Nigeria",
      languages: ["English", "Yoruba"],
      expertise: ["Business Planning", "Startup Funding", "Marketing"],
      bio: "Serial entrepreneur who has founded three successful companies.",
      experience: "8 years",
      rating: 4.7,
      reviews: 89,
      availability: "High",
      photo: "bg-sherise-peach/20"
    },
    {
      name: "Lin Wei",
      role: "Academic Success Coach",
      location: "Singapore",
      languages: ["English", "Mandarin"],
      expertise: ["Study Skills", "Time Management", "Test Preparation"],
      bio: "Education specialist helping students excel academically.",
      experience: "11 years",
      rating: 4.8,
      reviews: 114,
      availability: "Medium",
      photo: "bg-sherise-blue/20"
    },
    {
      name: "Isabella Martinez",
      role: "Self-Confidence Coach",
      location: "Buenos Aires, Argentina",
      languages: ["Spanish", "English"],
      expertise: ["Self-Esteem", "Body Positivity", "Assertiveness"],
      bio: "Psychologist specializing in women's self-confidence issues.",
      experience: "9 years",
      rating: 4.9,
      reviews: 131,
      availability: "Medium",
      photo: "bg-sherise-purple/20"
    }
  ];
  
  // Dummy categories
  const expertiseAreas = [
    "All Areas",
    "Career Development", 
    "Mental Health", 
    "Financial Literacy", 
    "Leadership", 
    "STEM", 
    "Public Speaking", 
    "Entrepreneurship", 
    "Academic Success"
  ];
  
  // Dummy languages
  const languages = [
    "All Languages",
    "English", 
    "Spanish", 
    "Hindi", 
    "Arabic", 
    "Mandarin", 
    "French", 
    "Swahili", 
    "Portuguese"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="pt-12 pb-16 bg-sherise-purple/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-sherise-purple-dark mb-4">MentorConnect</h1>
              <p className="text-lg text-gray-600">
                Connect with verified mentors who can guide you through personal and professional challenges, share their expertise, and help you grow.
              </p>
            </div>
            
            <Tabs defaultValue="find" className="mb-12">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-white">
                  <TabsTrigger value="find" className="data-[state=active]:bg-sherise-purple data-[state=active]:text-white">Find a Mentor</TabsTrigger>
                  <TabsTrigger value="how" className="data-[state=active]:bg-sherise-purple data-[state=active]:text-white">How It Works</TabsTrigger>
                  <TabsTrigger value="become" className="data-[state=active]:bg-sherise-purple data-[state=active]:text-white">Become a Mentor</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="find">
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <div className="grid gap-6 md:grid-cols-3 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area of Expertise</label>
                      <select className="w-full rounded-md border border-sherise-purple/20 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sherise-purple/30">
                        {expertiseAreas.map((area) => (
                          <option key={area}>{area}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                      <select className="w-full rounded-md border border-sherise-purple/20 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sherise-purple/30">
                        {languages.map((language) => (
                          <option key={language}>{language}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
                      <select className="w-full rounded-md border border-sherise-purple/20 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sherise-purple/30">
                        <option>All Types</option>
                        <option>One-on-One</option>
                        <option>Group Session</option>
                        <option>Text-based</option>
                        <option>Voice/Video Call</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button className="bg-sherise-purple text-white hover:bg-sherise-purple-dark">
                      <Search className="mr-2 h-4 w-4" /> Find Mentors
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="how">
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <div className="grid gap-8 md:grid-cols-3 mb-6">
                    <div className="text-center">
                      <div className="size-16 rounded-full bg-sherise-purple/10 mb-4 flex items-center justify-center mx-auto">
                        <Search className="h-8 w-8 text-sherise-purple" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">1. Find a Match</h3>
                      <p className="text-gray-600">Browse our diverse community of mentors or use our matching system to find the perfect fit for your needs.</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="size-16 rounded-full bg-sherise-purple/10 mb-4 flex items-center justify-center mx-auto">
                        <Calendar className="h-8 w-8 text-sherise-purple" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">2. Schedule Sessions</h3>
                      <p className="text-gray-600">Book one-time or recurring sessions that fit your schedule and preferred communication method.</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="size-16 rounded-full bg-sherise-purple/10 mb-4 flex items-center justify-center mx-auto">
                        <Star className="h-8 w-8 text-sherise-purple" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">3. Grow Together</h3>
                      <p className="text-gray-600">Receive personalized guidance, set goals, track progress, and build a meaningful mentoring relationship.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="become">
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-xl font-semibold mb-4 text-sherise-purple-dark">Share Your Knowledge, Change Lives</h3>
                    <p className="mb-6 text-gray-600">Join our community of volunteer mentors who are making a difference in young women's lives through guidance, support, and knowledge sharing.</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 size-6 rounded-full bg-sherise-purple/10 flex items-center justify-center">
                          <Heart className="h-3 w-3 text-sherise-purple" />
                        </div>
                        <div>
                          <p className="font-medium">Flexible Commitment</p>
                          <p className="text-sm text-gray-600">Volunteer as little as 1-2 hours per week on your own schedule.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 size-6 rounded-full bg-sherise-purple/10 flex items-center justify-center">
                          <Heart className="h-3 w-3 text-sherise-purple" />
                        </div>
                        <div>
                          <p className="font-medium">Remote Mentoring</p>
                          <p className="text-sm text-gray-600">Connect with mentees through text, voice, or video from anywhere in the world.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 size-6 rounded-full bg-sherise-purple/10 flex items-center justify-center">
                          <Heart className="h-3 w-3 text-sherise-purple" />
                        </div>
                        <div>
                          <p className="font-medium">Make an Impact</p>
                          <p className="text-sm text-gray-600">Help shape the next generation of female leaders, professionals, and changemakers.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button className="bg-sherise-purple text-white hover:bg-sherise-purple-dark">
                        Apply to be a Mentor
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-sherise-purple-dark">Featured Mentors</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search mentors..." 
                    className="pl-10 pr-4 py-2 text-sm rounded-md border border-sherise-purple/20 focus:outline-none focus:ring-2 focus:ring-sherise-purple/30 w-full md:w-[200px] bg-white"
                  />
                </div>
                <Button variant="outline" className="flex gap-1 border-sherise-purple/20 bg-white">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredMentors.map((mentor, index) => (
                <Card key={index} className="border-sherise-pink/20 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className={`size-16 rounded-full ${mentor.photo} flex items-center justify-center`}>
                        <span className="text-xl font-semibold text-sherise-purple">{mentor.name.charAt(0)}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <p className="text-sm text-gray-600">{mentor.role}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < Math.floor(mentor.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                                fill={i < Math.floor(mentor.rating) ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                          <span className="text-xs ml-1 text-gray-600">{mentor.rating} ({mentor.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{mentor.location}</span>
                      <Badge variant={
                        mentor.availability === 'High' ? 'default' :
                        mentor.availability === 'Medium' ? 'secondary' : 'outline'
                      } className={mentor.availability === 'High' ? 'bg-green-500' : ''}>
                        {mentor.availability} Availability
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-700 mb-3">{mentor.bio}</p>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-1">LANGUAGES</p>
                          <div className="flex flex-wrap gap-1">
                            {mentor.languages.map((lang) => (
                              <Badge key={lang} variant="outline" className="text-xs bg-sherise-blue-light">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-1">EXPERTISE</p>
                          <div className="flex flex-wrap gap-1">
                            {mentor.expertise.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1 border-sherise-purple text-sherise-purple hover:bg-sherise-purple/5">
                      <Calendar className="mr-2 h-4 w-4" /> View Profile
                    </Button>
                    <Button className="flex-1 bg-sherise-purple text-white hover:bg-sherise-purple-dark">
                      <MessageSquare className="mr-2 h-4 w-4" /> Connect
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-sherise-purple-dark mb-6">More Mentors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allMentors.map((mentor, index) => (
                  <Card key={index} className="border-sherise-pink/10 shadow-sm hover:shadow transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-4">
                        <div className={`size-12 rounded-full ${mentor.photo} flex items-center justify-center`}>
                          <span className="text-lg font-semibold text-sherise-purple">{mentor.name.charAt(0)}</span>
                        </div>
                        <div>
                          <CardTitle className="text-base">{mentor.name}</CardTitle>
                          <p className="text-xs text-gray-600">{mentor.role}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                            <span className="text-xs ml-1 text-gray-600">{mentor.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-2">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {mentor.expertise.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {mentor.expertise.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{mentor.expertise.length - 2}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{mentor.bio}</p>
                    </CardContent>
                    
                    <CardFooter>
                      <Button variant="outline" className="w-full border-sherise-purple text-sherise-purple hover:bg-sherise-purple/5">
                        View Profile
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline" className="border-sherise-purple text-sherise-purple hover:bg-sherise-purple/5">
                  Load More Mentors
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Mentors;
