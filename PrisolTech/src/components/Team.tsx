import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Linkedin, Twitter } from 'lucide-react';

interface TeamProps {
  isFullPage?: boolean;
}

const Team = ({ isFullPage = false }: TeamProps) => {
  // Team members data
  const executives = [
    {
      name: "Jayanthan Senthilkumar",
      position: "Co-Founder & Chief Executive Officer",image: "images/jayanthan.jpg",
      expertise: ["Strategic Planning", "Business Development", "Technology Vision"],
      email: "rajesh@prisoltech.com",
      linkedin: "https://linkedin.com/in/rajesh-kumar",
      twitter: "https://twitter.com/rajeshkumar"
    },
    {
      name: "Praveen M",
      position: "Co-Founder & Chief Technology Officer",
      image: "images/praveen.jpg",
      expertise: ["Cloud Architecture", "AI & Machine Learning", "Security Infrastructure"],
      email: "praveen@prisoltech.com",
      linkedin: "https://linkedin.com/in/priya-sharma",
      twitter: "https://twitter.com/priyasharma"
    },
    {
      name: "Prithika K",
      position: "Co-Founder & Chief Operations Officer",
      image: "images/prithika.png",
      expertise: ["Operational Excellence", "Project Management", "Process Optimization"],
      email: "prithika@prisoltech.com",
      linkedin: "https://linkedin.com/in/vikram-singh",
      twitter: "https://twitter.com/vikramsingh"
    }
  ];

  const technicalTeam = [
    {
      name: "Sonali M",
      position: "Lead Software Architect",
      image: "images/sonali.png",
      expertise: ["System Architecture", "API Design"],
      email: "sonali@prisoltech.com",
      linkedin: "https://linkedin.com/in/anjali-desai"
    },
    {
      name: "Priyadharshini B",
      position: "Cybersecurity Specialist",
      image: "images/priyadharshini.jpg",
      expertise: ["Network Security", "Security Compliance"],
      email: "priyadharshini@prisoltech.com",
      linkedin: "https://linkedin.com/in/sanjay-gupta"
    },
    {
      name: "Sreelekha S",
      position: "Frontend Development Lead",
      image: "images/sreelekha.jpg",
      expertise: ["UI/UX Design", "React"],
      email: "sreelekha@prisoltech.com",
      linkedin: "https://linkedin.com/in/neha-patel"
    },
    {
      name: "Sridevi S",
      position: "Backend Development Lead",
      image: "images/sridevi.jpg",
      expertise: ["DBA", "API Dev", "Cloud Services"],
      email: "sridevi@prisoltech.com",
      linkedin: "https://linkedin.com/in/amit-verma"
    }
  ];

  const supportTeam = [
    {
      name: "Deepak Rajan K",
      position: "Client Success Manager",
      image: "images/deepak.jpg",
      expertise: ["Customer Relationship", "Technical Support", "Solution Consulting"]
    },
    {
      name: "Rahul Mehra",
      position: "Marketing Specialist",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      expertise: ["Digital Marketing", "Content Strategy", "Brand Development"]
    },
    {
      name: "Kavita Singh",
      position: "HR Manager",
      image: "https://images.unsplash.com/photo-1587614387466-0a72ca909e16?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      expertise: ["Talent Acquisition", "Employee Development"]
    },
    {
      name: "Kavita Singh",
      position: "HR Manager",
      image: "https://images.unsplash.com/photo-1587614387466-0a72ca909e16?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      expertise: ["Talent Acquisition", "Employee Development"]
    }
  ];

  const renderTeamMember = (member: any, index: number) => (
    <div key={index} className="scroll-animation">
      <Card className="h-full border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="mb-6 flex justify-center">
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-32 h-32 object-cover rounded-full border-4 border-prisol-blue dark:border-prisol-light-blue"
            />
          </div>
          <h4 className="text-xl font-semibold text-prisol-dark-blue dark:text-white mb-1 text-center">{member.name}</h4>
          <p className="text-prisol-blue dark:text-prisol-light-blue mb-3 text-center">{member.position}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">{member.bio}</p>
          
          {member.expertise && member.expertise.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-prisol-dark-blue dark:text-white mb-2 text-center">Expertise</h5>
              <div className="flex flex-wrap justify-center gap-2">
                {member.expertise.map((skill: string, i: number) => (
                  <span key={i} className="inline-block bg-blue-100 dark:bg-blue-900/50 text-prisol-blue dark:text-prisol-light-blue text-xs px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-center space-x-3 mt-4">
            {member.email && (
              <a href={`mailto:${member.email}`} className="text-gray-500 dark:text-gray-400 hover:text-prisol-blue dark:hover:text-prisol-light-blue transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {member.twitter && (
              <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            )}
          </div>
          
          {/* Only show View Full Profile link for co-founders */}
          {(member.position && member.position.toLowerCase().includes('co-founder')) && (
            <div className="mt-5 text-center">
              <Link 
                to={`/team/${member.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => {
                  // Force scroll to top on click before navigation
                  window.scrollTo(0, 0);
                }}
              >
                <Button variant="link" className="text-prisol-blue dark:text-prisol-light-blue hover:text-prisol-dark-blue dark:hover:text-blue-300 px-0">
                  View Full Profile →
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <section id="team" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {isFullPage ? (
          <div className="text-center mb-16">
            {/* Content for full page view */}
          </div>
        ) : (
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 text-sm font-medium text-prisol-blue dark:text-prisol-light-blue bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">OUR TEAM</span>
            <h2 className="text-3xl md:text-4xl font-bold text-prisol-dark-blue dark:text-white mb-4">Meet Our Experts</h2>
            <div className="w-24 h-1 bg-prisol-blue dark:bg-prisol-light-blue mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
              Our team of seasoned professionals brings diverse expertise and a passion for innovation to every project we undertake.
            </p>
          </div>
        )}

        {/* Leadership Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-prisol-dark-blue dark:text-white mb-8 text-center">Co-Founders</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executives.map((member, index) => renderTeamMember(member, index))}
          </div>
        </div>

        {isFullPage && (
          <>
            {/* Technical Team Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-prisol-dark-blue dark:text-white mb-8 text-center">Technical Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {technicalTeam.map((member, index) => renderTeamMember(member, index))}
              </div>
            </div>

            {/* Support Team Section */}
            {/* <div className="mb-16">
              <h3 className="text-2xl font-bold text-prisol-dark-blue mb-8 text-center">Support Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {supportTeam.map((member, index) => renderTeamMember(member, index))}
              </div>
            </div> */}

            {/* Join Our Team Section */}
            <div className="mt-20 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold text-prisol-dark-blue dark:text-white mb-4">Join Our Team</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                We're always looking for talented individuals who are passionate about technology and innovation. 
                If you're interested in joining our team, check out our current openings or send us your resume.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-prisol-blue hover:bg-prisol-dark-blue text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                  View Open Positions
                </Button>
                <Link to="/contact">
                  <Button variant="outline" className="border-prisol-blue text-prisol-blue hover:bg-prisol-blue hover:text-white dark:border-prisol-light-blue dark:text-prisol-light-blue dark:hover:bg-blue-800">
                    Contact HR
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}

        {!isFullPage && (
          <div className="mt-10 text-center">
            <Link to="/team">
              <Button className="bg-prisol-blue hover:bg-prisol-dark-blue text-white font-medium px-8 py-6 text-lg dark:bg-blue-700 dark:hover:bg-blue-800">
                Meet Our Full Team
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
