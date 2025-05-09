import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ChevronRight, Briefcase, MapPin, Coffee, Heart, Lightbulb, Laptop } from 'lucide-react';

const Careers = () => {
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Web Developer",
      department: "Engineering",
      location: "Chicago, IL",
      type: "Full-time",
      remote: true,
      description: "We're looking for an experienced web developer to join our engineering team and help build the future of our online book shopping platform."
    },
    {
      id: 2,
      title: "UX/UI Designer",
      department: "Design",
      location: "Chicago, IL",
      type: "Full-time",
      remote: true,
      description: "Design engaging and intuitive user experiences for our website and mobile applications."
    },
    {
      id: 3,
      title: "Content Marketing Specialist",
      department: "Marketing",
      location: "Chicago, IL",
      type: "Full-time",
      remote: true,
      description: "Create compelling content that engages book lovers and drives our marketing initiatives."
    },
    {
      id: 4,
      title: "Customer Support Representative",
      department: "Customer Service",
      location: "Chicago, IL",
      type: "Full-time",
      remote: true,
      description: "Provide exceptional support to our customers and help them with their orders and inquiries."
    },
    {
      id: 5,
      title: "Book Curator",
      department: "Editorial",
      location: "Chicago, IL",
      type: "Full-time",
      remote: false,
      description: "Join our team of literature experts to curate special collections and featured book lists."
    },
    {
      id: 6,
      title: "Warehouse Operations Manager",
      department: "Operations",
      location: "Chicago, IL",
      type: "Full-time",
      remote: false,
      description: "Oversee our warehouse operations and ensure the efficient processing and shipping of orders."
    }
  ];
  
  const filteredJobs = departmentFilter === "all" 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === departmentFilter);
  
  const departments = ["All", ...new Set(jobOpenings.map(job => job.department))];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="bg-primary/10 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Join Our Team</h1>
              <p className="text-muted-foreground mb-6">
                Help us connect readers with the books that will inspire, educate, and entertain
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-foreground">Careers</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why join us section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-serif font-bold mb-8 text-center">Why Work With Us?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Coffee className="h-10 w-10 text-primary mb-4" />
                    <h3 className="font-medium text-lg mb-2">Work-Life Balance</h3>
                    <p className="text-sm text-muted-foreground">
                      We believe in flexible schedules, generous PTO, and creating a healthy balance between work and personal life.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Heart className="h-10 w-10 text-primary mb-4" />
                    <h3 className="font-medium text-lg mb-2">Comprehensive Benefits</h3>
                    <p className="text-sm text-muted-foreground">
                      Enjoy competitive compensation, health insurance, 401(k) matching, and a generous book allowance.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Lightbulb className="h-10 w-10 text-primary mb-4" />
                    <h3 className="font-medium text-lg mb-2">Growth & Development</h3>
                    <p className="text-sm text-muted-foreground">
                      We invest in our team's professional development with learning stipends, mentorship, and career advancement opportunities.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-muted p-8 rounded-lg">
                <div className="flex items-start">
                  <Laptop className="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-lg mb-2">Remote-Friendly Culture</h3>
                    <p className="text-muted-foreground">
                      Many of our roles offer remote work options. We've built a collaborative culture that thrives whether you're in the office or working from home. Our team spans across different locations, and we use technology to stay connected and work together effectively.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Current openings */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif font-bold mb-8 text-center">Current Openings</h2>
              
              <Tabs defaultValue="all" className="mb-8">
                <TabsList className="mb-8 flex flex-wrap justify-center">
                  {departments.map((dept) => (
                    <TabsTrigger 
                      key={dept} 
                      value={dept.toLowerCase()}
                      onClick={() => setDepartmentFilter(dept.toLowerCase())}
                    >
                      {dept}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value={departmentFilter} className="mt-0">
                  <div className="space-y-6">
                    {filteredJobs.length > 0 ? (
                      filteredJobs.map((job) => (
                        <Card key={job.id}>
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <h3 className="text-xl font-medium mb-1">{job.title}</h3>
                                <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4 mb-4">
                                  <span className="flex items-center">
                                    <Briefcase className="h-4 w-4 mr-1" />
                                    {job.department}
                                  </span>
                                  <span className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {job.location}
                                    {job.remote && " (Remote option available)"}
                                  </span>
                                  <Badge variant="outline">{job.type}</Badge>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                  {job.description}
                                </p>
                              </div>
                              <Button className="md:self-start mt-4 md:mt-0 md:ml-4">
                                Apply Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No job openings found for this department.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="text-center bg-primary/5 p-8 rounded-lg">
                <h3 className="text-xl font-medium mb-4">Don't see a role that fits your skills?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We're always on the lookout for talented individuals who are passionate about books and technology.
                  Send us your resume and we'll keep it on file for future opportunities.
                </p>
                <Button asChild>
                  <Link to="/contact">Contact Us</Link>
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

export default Careers;
