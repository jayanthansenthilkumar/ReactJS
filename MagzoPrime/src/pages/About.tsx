import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ChevronRight, BookOpen, Users, Award, Compass } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="bg-primary/10 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">About Magzo Prime</h1>
              <p className="text-muted-foreground mb-6">
                Our journey, our mission, and our passion for sharing knowledge and stories
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-foreground">About Us</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h2 className="text-3xl font-serif font-bold mb-6">Our Story</h2>
                  <div className="space-y-4">
                    <p>
                      Founded in 2015, Magzo Prime began with a simple mission: to connect readers with the books 
                      they love in a simple, efficient, and enjoyable way. What started as a small online bookstore 
                      has grown into a comprehensive platform serving book lovers across the country.
                    </p>
                    <p>
                      Our founder, Jane Doe, a lifelong bibliophile and former librarian, created Magzo Prime 
                      after recognizing the need for a more personalized online book shopping experience that 
                      maintains the discovery and joy that comes from browsing a physical bookstore.
                    </p>
                    <p>
                      Today, we're proud to offer over 1 million titles across every genre imaginable, while 
                      still providing the personalized service and curated recommendations that have been our 
                      hallmark since day one.
                    </p>
                  </div>
                </div>
                <div className="order-first md:order-last">
                  <img 
                    src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80" 
                    alt="Bookstore interior" 
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>
              
              {/* Our Values */}
              <div className="mb-16">
                <h2 className="text-3xl font-serif font-bold mb-8 text-center">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="rounded-full bg-primary/20 p-4 mb-4">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">Accessibility</h3>
                      <p className="text-sm text-muted-foreground">
                        We believe books should be accessible to everyone. We strive to offer competitive pricing 
                        and multiple format options to ensure reading material is available to all.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="rounded-full bg-primary/20 p-4 mb-4">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">Community</h3>
                      <p className="text-sm text-muted-foreground">
                        Reading is both personal and communal. We foster a community of readers through book clubs, 
                        events, and platforms for discussion and recommendation sharing.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="rounded-full bg-primary/20 p-4 mb-4">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">Quality</h3>
                      <p className="text-sm text-muted-foreground">
                        We're committed to offering a curated selection of high-quality books. Our team of expert 
                        readers reviews and selects titles that meet our standards for excellence.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="rounded-full bg-primary/20 p-4 mb-4">
                        <Compass className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">Discovery</h3>
                      <p className="text-sm text-muted-foreground">
                        We encourage exploration beyond the bestseller lists. Our platform is designed to help 
                        readers discover new authors, genres, and perspectives.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Our Team */}
              <div className="mb-16">
                <h2 className="text-3xl font-serif font-bold mb-8 text-center">Our Leadership Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Jane Doe",
                      title: "Founder & CEO",
                      bio: "Former librarian with a passion for making literature accessible to everyone.",
                      image: "https://randomuser.me/api/portraits/women/22.jpg"
                    },
                    {
                      name: "John Smith",
                      title: "Chief Operating Officer",
                      bio: "Publishing industry veteran with 15+ years of experience in retail operations.",
                      image: "https://randomuser.me/api/portraits/men/32.jpg"
                    },
                    {
                      name: "Emily Chen",
                      title: "Chief Curation Officer",
                      bio: "Literature PhD and former book critic who leads our curation team.",
                      image: "https://randomuser.me/api/portraits/women/44.jpg"
                    }
                  ].map((member, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <h3 className="font-medium text-lg">{member.name}</h3>
                          <p className="text-sm text-primary mb-2">{member.title}</p>
                          <p className="text-sm text-muted-foreground">{member.bio}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Join Us */}
              <div className="bg-primary/10 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-serif font-bold mb-4">Join Our Journey</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                  We're constantly growing and looking for passionate individuals to join our team. 
                  If you love books and want to be part of our mission to spread the joy of reading, 
                  check out our current openings.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/careers">View Career Opportunities</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
