import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Mail, Linkedin, Twitter, ArrowLeft, Award, BookOpen, Briefcase, 
  Code, Globe, Trophy, User, CheckCircle, GraduationCap, Languages,
  Calendar, FileText, MessageSquare, Users
} from 'lucide-react';
import { useTheme } from '@/context/theme/ThemeContext';

const TeamMemberProfile = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Combined team members data (should be imported from a central data source in a real app)
  const allTeamMembers = useMemo(() => [
    {
      name: "Jayanthan Senthilkumar",
      position: "Co-Founder & Chief Executive Officer",
      image: "/images/jayanthan.jpg",
      expertise: ["Web Designer", "Full Stack Development", "Cloud Computing", "AI & ML"],
      email: "jayanthan@prisoltech.com",
      linkedin: "https://linkedin.com/in/jayanthan-senthilkumar",
      twitter: "https://twitter.com/jayanthan_s",
      isCoFounder: true,
      fullBio: "Jayanthan Senthilkumar is the visionary leader behind PrisolTech, guiding the company's strategic direction and overall business development. With a deep understanding of both technology and business needs, he has been instrumental in establishing PrisolTech as a trusted technology partner for businesses across various sectors.\n\nWith expertise in strategic IT planning, digital transformation, and emerging technologies, Jayanthan has helped numerous organizations navigate their technology journeys. His ability to translate complex technical concepts into business value has made him a sought-after advisor for enterprises looking to leverage technology for competitive advantage.\n\nBefore founding PrisolTech, Jayanthan held senior leadership positions at several global technology firms, where he successfully led large-scale digital initiatives and built high-performing teams. His hands-on experience with AI, cloud computing, and enterprise architecture gives him unique insights into how these technologies can solve real-world business challenges.",
      achievements: [
        "Led PrisolTech to 200% revenue growth over 3 consecutive years",
        "Named in 'Top 40 Under 40' technology entrepreneurs by Business Today",
        "Speaker at Web Summit 2022 on 'AI-Driven Enterprise Transformation'",
        "Published author of 'Digital Foundations: Building Future-Ready Organizations'"
      ],
      education: [
        "B.Tech - Artificial Intelligence & Machine Learning"
      ],
      projects: [
        {
          name: "Magzo Prime - Book Store",
          description: "Developed a dynamic and user-friendly online bookstore with personalized recommendations and seamless shopping experience.",
          technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"]
        },
        {
          name: "Prisona Mart - Grocery Store",
          description: "Built a full-stack grocery e-commerce platform with real-time stock updates, cart functionality, and admin inventory control.",
          technologies: ["React", "Node.js", "Express", "MongoDB"]
        },
        {
          name: "Sowberry - E-Learning Platform",
          description: "Engineered a gamified e-learning platform offering aptitude tests, code challenges, and certification with built-in code editor.",
          technologies: ["PHP", "MySQL"]
        }      
      ],
      certifications: [
        "GitHub Foundation Certified Developer"
      ],
      languages: ["English", "Tamil", "Hindi"],
      publications: [
        "Digital Foundations: Building Future-Ready Organizations (2021)",
        "The AI Advantage: Practical Applications for Business Leaders (2023)"
      ],
      career: [
        {
          role: "Fullstack Developer",
          company: "Technology Innovation Hub, MKCE",
          period: "April 2024 - Present",
          description: "Led technology strategy and digital transformation initiatives"
        },
        {
          role: "Chief Executive Officer",
          company: "PrisolTech",
          period: "February 2025 - Present",
          description: "Managed global engineering teams and product development"
        }
      ],
      awards: [
        "Technology Leader of the Year, 2022",
        "Digital Innovation Award, 2020"
      ]
    },
    {
      name: "Praveen M",
      position: "Co-Founder & Chief Technology Officer",
      image: "/images/praveen.jpg",
      expertise: ["Cloud Architecture", "Security Infrastructure", "Blockchain", "DevOps"],
      email: "praveen@prisoltech.com",
      linkedin: "https://linkedin.com/in/praveen-m",
      twitter: "https://twitter.com/praveen_m_tech",
      isCoFounder: true,
      fullBio: "As Chief Technology Officer, Praveen leads PrisolTech's technology strategy and innovation initiatives. With a remarkable talent for identifying emerging technologies with practical business applications, he has positioned the company as a pioneer in delivering innovative solutions.\n\nPraveen's deep technical expertise spans cloud computing, artificial intelligence, blockchain, and cybersecurity. Throughout his career, he has built a reputation for creating scalable, secure, and maintainable software architectures that stand the test of time. His forward-thinking approach ensures that PrisolTech's technical offerings are always ahead of industry curves.\n\nBefore co-founding PrisolTech, Praveen served as a Technology Architect at a Fortune 100 technology company, where he led multiple global engineering teams and delivered critical enterprise systems. His ability to balance technical excellence with practical business requirements makes him an invaluable technical leader.",
      achievements: [
        "Developed PrisolTech's proprietary cloud-native microservices framework used by 50+ enterprise clients",
        "Holds 4 patents in distributed systems and secure data exchange",
        "Recipient of the 'Technology Innovator Award' from CIO Review India",
        "Regular speaker at international technology conferences including AWS re:Invent and Google Cloud Next"
      ],
      education: [
        "B.Tech - Computer Science & Business Systems",
      ],
      projects: [
        {
          name: "ARP Spoof Detection Tool",
          description: "Developed a security tool to detect and prevent ARP spoofing attacks on local networks, enhancing data integrity and network protection.",
          technologies: ["Python", "Scapy", "Wireshark", "Socket Programming"]
        },
        {
          name: "Password Strength Checker",
          description: "Created an interactive web-based tool to evaluate password strength in real-time, promoting better user security practices.",
          technologies: ["JavaScript", "HTML", "CSS", "Regex"]
        },
        {
          name: "Chat Server",
          description: "Built a real-time chat server supporting multiple clients with socket-based communication, user authentication, and message broadcasting.",
          technologies: ["Node.js", "Socket.io", "Express", "MongoDB"]
        }
      ],      
      certifications: [
        "AWS Cloud Essentials",
        "Github Foundation",
        "TCS - ion Information Security Practioners Perspective"
      ],
      speaking: [
        "Cloud-Native Architecture", 
        "Blockchain for Enterprise", 
        "DevSecOps Best Practices"
      ],
      languages: ["English", "Tamil", "Hindi"],
      publications: [
        "Microservices: Building Scalable Systems (2022)",
        "Security by Design: A Framework for Modern Applications (2021)"
      ],
      career: [
        {
          role: "Core Team Member",
          company: "Google Developer Groups",
          period: "2024 - Present",
          description: "Designed and implemented enterprise-scale systems"
        },
        {
          role: "Core Team Member",
          company: "DEF CON Chennai Group",
          period: "2024 - Present",
          description: "Led development of cloud infrastructure solutions"
        }
      ],
      awards: [
        "Cloud Architect of the Year, 2021",
        "Innovation Excellence Award, 2019"
      ]
    },
    {
      name: "Prithika K",
      position: "Co-Founder & Chief Operations Officer",
      image: "/images/prithika.png",
      expertise: ["Web Designer", "Full Stack Development", "Cloud Computing", "AI & ML"],
      email: "prithika@prisoltech.com",
      linkedin: "https://linkedin.com/in/prithikakannan",
      twitter: "https://twitter.com/prithikakannan",
      isCoFounder: true,
      fullBio: "Prithika oversees all operational aspects at PrisolTech, ensuring the efficient delivery of our services and solutions. Her exceptional ability to streamline processes while maintaining the highest quality standards has been instrumental in building PrisolTech's reputation for excellence.\n\nWith a keen focus on client satisfaction and operational efficiency, Prithika has implemented innovative methodologies that enable seamless project execution and delivery. Her client-centric approach ensures that PrisolTech not only meets but exceeds customer expectations on every engagement.\n\nPrior to co-founding PrisolTech, Prithika managed large-scale IT implementations and digital transformation projects for global enterprises across finance, healthcare, and retail sectors. This experience gave her valuable insights into the challenges of technology adoption and the importance of effective change management strategies.",
      achievements: [
        "Implemented operational excellence framework resulting in 35% efficiency improvement across all projects",
        "Designed PrisolTech's customer success methodology with a 98% client retention rate",
        "Successfully led the company to ISO 9001:2015 and ISO 27001 certifications",
        "Recognized as 'Operations Leader of the Year' at the Women in IT Excellence Awards"
      ],
      education: [
        "B.Tech - Information Technology",
      ],
      projects: [
        {
          name: "Magzo Prime - Book Store",
          description: "Developed a dynamic and user-friendly online bookstore with personalized recommendations and seamless shopping experience.",
          technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"]
        },
        {
          name: "Prisona Mart - Grocery Store",
          description: "Built a full-stack grocery e-commerce platform with real-time stock updates, cart functionality, and admin inventory control.",
          technologies: ["React", "Node.js", "Express", "MongoDB"]
        },
        {
          name: "Sowberry - E-Learning Platform",
          description: "Engineered a gamified e-learning platform offering aptitude tests, code challenges, and certification with built-in code editor.",
          technologies: ["PHP", "MySQL"]
        }      
      ],
      // certifications: [
      //   "Project Management Professional (PMP)",
      //   "Certified Scrum Master (CSM)",
      //   "ITIL v4 Foundation",
      //   "Six Sigma Black Belt"
      // ],
      speaking: [
        "Operational Excellence", 
        "Agile Project Management at Scale", 
        "Building High-Performance Teams"
      ],
      languages: ["English", "Tamil", "French"],
      publications: [
        "The Client-Centric Approach: Redefining Service Delivery (2022)",
        "Agile Transformation: A Leadership Guide (2020)"
      ],
      // career: [
      //   {
      //     role: "Senior Project Director",
      //     company: "Global Consulting Firm",
      //     period: "2015-2018",
      //     description: "Managed large-scale digital transformation projects"
      //   },
      //   {
      //     role: "Operations Manager",
      //     company: "TechSolutions Inc",
      //     period: "2012-2015",
      //     description: "Optimized operational processes and client delivery"
      //   }
      // ],
      awards: [
        "Women in Leadership Excellence Award, 2022",
        "Project Management Achievement Award, 2019"
      ]
    },
    // Technical team members with limited profiles
    {
      name: "Sonali M",
      position: "Lead Software Architect",
      image: "/images/sonali.png",
      expertise: ["System Architecture", "API Design", "Microservices"],
      email: "sonali@prisoltech.com",
      linkedin: "https://linkedin.com/in/sonali-m",
      isCoFounder: false
    },
  ], []);

  const teamMember = useMemo(() => {
    if (!memberId) return null;
    return allTeamMembers.find(
      member => member.name.toLowerCase().replace(/\s+/g, '-') === memberId
    );
  }, [memberId, allTeamMembers]);

  if (!teamMember) {
    return (
      <div className={`container mx-auto px-4 py-8 text-center ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-prisol-dark-blue'} mb-4`}>Team Member Not Found</h2>
        <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Sorry, we couldn't find the team member you're looking for.</p>
        <Link to="/team">
          <Button className="bg-prisol-blue hover:bg-prisol-dark-blue text-white">
            Back to Team
          </Button>
        </Link>
      </div>
    );
  }

  // Simplified profile for non-cofounders
  if (!teamMember.isCoFounder) {
    return (
      <section className={`py-12 ${isDark ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-50 to-gray-100'}`}>
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className={`mb-6 flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-prisol-blue'}`}
            onClick={() => navigate('/team')}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Team
          </Button>

          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto border`}>
            <div className="bg-gradient-to-r from-prisol-dark-blue to-prisol-blue text-white p-8 flex flex-col md:flex-row items-center">
              <div className="relative mb-6 md:mb-0 md:mr-8">
                <div className="absolute inset-0 rounded-full bg-blue-400/20 blur"></div>
                <img 
                  src={teamMember.image} 
                  alt={teamMember.name} 
                  className="relative w-28 h-28 object-cover rounded-full border-2 border-white"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2 text-center md:text-left">{teamMember.name}</h1>
                <p className="text-blue-100 mb-4 text-center md:text-left">{teamMember.position}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  {teamMember.expertise?.map((skill, index) => (
                    <span key={index} className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center md:justify-start space-x-4">
                  {teamMember.email && (
                    <a href={`mailto:${teamMember.email}`} className="text-white hover:text-blue-200 transition-colors p-2 bg-white/20 rounded-full">
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                  {teamMember.linkedin && (
                    <a href={teamMember.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition-colors p-2 bg-white/20 rounded-full">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className={`p-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className={`${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-100'} p-6 rounded-xl mb-8 border`}>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-blue-300' : 'text-prisol-dark-blue'} mb-3`}>About {teamMember.name.split(' ')[0]}</h2>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  As our Lead Software Architect, {teamMember.name.split(' ')[0]} brings exceptional expertise in system design and implementation. 
                  With a focus on creating scalable and maintainable architectures, {teamMember.name.split(' ')[0]} leads our technical initiatives 
                  and ensures the highest standards of code quality across all projects.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className={`text-lg font-semibold ${isDark ? 'text-blue-300' : 'text-prisol-dark-blue'} mb-4 flex items-center`}>
                  <CheckCircle className={`h-5 w-5 mr-2 ${isDark ? 'text-blue-400' : 'text-prisol-blue'}`} />
                  Core Competencies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {teamMember.expertise?.map((skill, index) => (
                    <div key={index} className={`flex items-center ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'} p-3 rounded-lg border`}>
                      <div className={`h-2 w-2 ${isDark ? 'bg-blue-400' : 'bg-prisol-blue'} rounded-full mr-3`}></div>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`pt-6 border-t ${isDark ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-600'} text-center`}>
                <p className="mb-6">Interested in working with our technical experts?</p>
                <Link to="/contact">
                  <Button className="bg-prisol-blue hover:bg-prisol-dark-blue text-white">
                    Contact Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Enhanced profile with integrated content for co-founders (without tabs)
  return (
    <section className={`py-16 ${isDark ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-50 to-gray-100'}`}>
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className={`mb-8 flex items-center gap-2 ${isDark ? 'text-blue-400 hover:bg-gray-800' : 'text-prisol-blue hover:bg-blue-50'}`}
          onClick={() => navigate('/team')}
        >
          <ArrowLeft className="h-5 w-5" /> Back to Team
        </Button>

        {/* Profile header card - enhanced with gradient and larger image */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-50'} rounded-xl shadow-xl overflow-hidden mb-8 border`}>
          <div className="bg-gradient-to-r from-prisol-dark-blue via-prisol-blue to-blue-500 text-white p-8 md:p-10 flex flex-col md:flex-row items-center">
            <div className="relative mb-8 md:mb-0 md:mr-10">
              <div className="absolute -inset-1 bg-white/20 rounded-full blur"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600/30 blur-md opacity-70"></div>
              <img 
                src={teamMember.image} 
                alt={teamMember.name} 
                className="relative w-40 h-40 object-cover rounded-full border-4 border-white/70 shadow-lg"
              />
            </div>
            <div className="text-center md:text-left">
              <div className="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-blue-100 mb-3">
                Co-Founder
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{teamMember.name}</h1>
              <p className="text-xl text-blue-100 mb-5">{teamMember.position}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                {teamMember.expertise?.slice(0, 4).map((skill, index) => (
                  <span key={index} className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
                {teamMember.expertise?.length > 4 && (
                  <span className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    +{teamMember.expertise.length - 4} more
                  </span>
                )}
              </div>
              
              <div className="flex justify-center md:justify-start space-x-4">
                {teamMember.email && (
                  <a href={`mailto:${teamMember.email}`} className="text-white hover:text-blue-200 transition-colors p-2.5 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20" title="Email">
                    <Mail className="h-5 w-5" />
                  </a>
                )}
                {teamMember.linkedin && (
                  <a href={teamMember.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition-colors p-2.5 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20" title="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {teamMember.twitter && (
                  <a href={teamMember.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition-colors p-2.5 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20" title="Twitter">
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Education */}
          {teamMember.education && teamMember.education.length > 0 && (
            <div className={`px-6 py-4 ${isDark ? 'bg-gradient-to-r from-gray-700 to-gray-700/40 border-gray-700' : 'bg-gradient-to-r from-blue-50 to-blue-100/40 border-blue-100'} border-t`}>
              <h3 className={`text-sm font-medium ${isDark ? 'text-blue-300' : 'text-prisol-dark-blue'} mb-3 flex items-center`}>
                <GraduationCap className={`h-4 w-4 mr-2 ${isDark ? 'text-blue-400' : 'text-prisol-blue'}`} />
                Education
              </h3>
              <div className="flex flex-wrap gap-2">
                {teamMember.education.map((edu, index) => (
                  <div key={index} className={`${isDark ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-blue-100 text-gray-700'} px-3 py-1.5 rounded-md text-sm border flex items-center`}>
                    <div className={`w-2 h-2 ${isDark ? 'bg-blue-400' : 'bg-prisol-blue'} rounded-full mr-2`}></div>
                    {edu}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Bio quote section */}
        <div className={`${isDark ? 'bg-gradient-to-r from-blue-900/20 to-blue-800/20 border-gray-700' : 'bg-gradient-to-r from-prisol-blue/5 to-prisol-dark-blue/5 border-blue-100'} p-8 rounded-xl shadow-md mb-8 border`}>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/5 flex justify-center mb-4 md:mb-0">
              <MessageSquare className={`h-16 w-16 ${isDark ? 'text-blue-600/20' : 'text-prisol-blue/20'}`} />
            </div>
            <div className="md:w-4/5">
              <p className={`text-lg italic ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                "{teamMember.name === "Jayanthan Senthilkumar" 
                  ? "Innovation is seeing what everybody has seen and thinking what nobody has thought."
                  : teamMember.name === "Praveen M"
                  ? "Technology is best when it brings people together."
                  : "Quality is never an accident. It is always the result of intelligent effort."}"
              </p>
            </div>
          </div>
        </div>
          
        {/* Unified content section - combining all tab content */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-lg overflow-hidden mb-8 border`}>
          <div className="p-8">
            {/* Professional Summary */}
            <div className={`md:col-span-2 ${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50/50 border-blue-100'} p-6 rounded-xl border mb-8`}>
              <h2 className={`text-xl font-semibold ${isDark ? 'text-blue-300' : 'text-prisol-dark-blue'} mb-4 flex items-center`}>
                <User className={`h-5 w-5 mr-3 ${isDark ? 'text-blue-400' : 'text-prisol-blue'}`} />
                Professional Summary
              </h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                {teamMember.fullBio.split('\n\n')[0]}
              </p>
            </div>
            
            {/* Education & Expertise */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Expertise & Skills (formerly right column of the grid) */}
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} p-6 rounded-xl shadow-sm border md:col-span-2`}>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-blue-300' : 'text-prisol-dark-blue'} mb-4 flex items-center`}>
                  <CheckCircle className={`h-5 w-5 mr-3 ${isDark ? 'text-blue-400' : 'text-prisol-blue'}`} />
                  Areas of Expertise
                </h2>
                <div className="space-y-4">
                  {teamMember.expertise?.map((skill, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{skill}</span>
                        <span className={isDark ? 'text-blue-400' : 'text-prisol-blue'}>Expert</span>
                      </div>
                      <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                        <div className="bg-gradient-to-r from-prisol-blue to-blue-500 h-2 rounded-full" 
                              style={{width: `${90 - (index * 5)}%`}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Career Journey */}
            <div className="mb-8">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-blue-300' : 'text-prisol-dark-blue'} mb-6 flex items-center`}>
                <Briefcase className={`h-5 w-5 mr-3 ${isDark ? 'text-blue-400' : 'text-prisol-blue'}`} />
                Professional Journey
              </h2>
              {teamMember.career && (
                <div className={`relative border-l-2 ${isDark ? 'border-blue-800/70' : 'border-prisol-blue/30'} pl-8 ml-6 space-y-8`}>
                  {teamMember.career.map((position, index) => (
                    <div key={index} className="relative">
                      <div className={`absolute -left-10 mt-1 w-7 h-7 rounded-full ${isDark ? 'bg-blue-600' : 'bg-prisol-blue'} flex items-center justify-center shadow-md`}>
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} p-5 rounded-xl shadow-sm border`}>
                        <div className="flex flex-wrap justify-between mb-2">
                          <h3 className={`text-lg font-semibold ${isDark ? 'text-blue-300' : 'text-prisol-dark-blue'}`}>{position.role}</h3>
                          <span className={`text-sm font-medium ${isDark ? 'text-blue-400 bg-blue-900/30' : 'text-prisol-blue bg-blue-50'} px-3 py-1 rounded-full`}>
                            {position.period}
                          </span>
                        </div>
                        <p className={isDark ? 'text-blue-400 mb-3' : 'text-prisol-blue mb-3'}>{position.company}</p>
                        <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>{position.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Notable Projects */}
            <div className="mb-8">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-blue-300' : 'text-prisol-dark-blue'} mb-6 flex items-center`}>
                <Code className={`h-5 w-5 mr-3 ${isDark ? 'text-blue-400' : 'text-prisol-blue'}`} />
                Notable Projects
              </h2>
              {teamMember.projects && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {teamMember.projects.map((project, index) => (
                    <div key={index} className={`${isDark ? 'bg-gray-800 border-gray-700 hover:border-blue-600/30' : 'bg-white border-gray-100 hover:shadow-md'} p-6 rounded-xl shadow-sm border transition-all`}>
                      <div className={`${isDark ? 'bg-blue-900/30' : 'bg-prisol-blue/10'} inline-block p-2 rounded-lg mb-4`}>
                        <Code className={isDark ? 'h-5 w-5 text-blue-400' : 'h-5 w-5 text-prisol-blue'} />
                      </div>
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-blue-300' : 'text-prisol-dark-blue'} mb-3`}>{project.name}</h3>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 text-sm leading-relaxed`}>{project.description}</p>
                      <div className={`pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                        <h4 className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className={`text-xs px-2 py-1 ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} rounded-full`}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Languages & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Languages */}
              {teamMember.languages && (
                <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} p-6 rounded-xl shadow-sm border`}>
                  <h2 className={`text-lg font-semibold ${isDark ? 'text-blue-300' : 'text-prisol-dark-blue'} mb-4 flex items-center`}>
                    <Languages className={`h-5 w-5 mr-3 ${isDark ? 'text-blue-400' : 'text-prisol-blue'}`} />
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {teamMember.languages.map((language, index) => (
                      <div key={index} className={`flex items-center ${isDark ? 'bg-gray-700 border-gray-700' : 'bg-gray-50 border-gray-100'} px-4 py-2 rounded-lg border`}>
                        <span className={`w-3 h-3 ${isDark ? 'bg-blue-400' : 'bg-prisol-blue'} rounded-full mr-3`}></span>
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{language}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Certifications */}
              {teamMember.certifications && (
                <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} p-6 rounded-xl shadow-sm border`}>
                  <h2 className={`text-lg font-semibold ${isDark ? 'text-blue-300' : 'text-prisol-dark-blue'} mb-4 flex items-center`}>
                    <Award className={`h-5 w-5 mr-3 ${isDark ? 'text-blue-400' : 'text-prisol-blue'}`} />
                    Certifications
                  </h2>
                  <ul className="space-y-2">
                    {teamMember.certifications.map((cert, index) => (
                      <li key={index} className={`flex items-center ${isDark ? 'bg-gray-700 border-gray-700' : 'bg-gray-50 border-gray-100'} p-3 rounded-lg border`}>
                        <div className={`${isDark ? 'bg-blue-400/10' : 'bg-prisol-blue/10'} p-1 rounded-full mr-3 shrink-0`}>
                          <Award className={isDark ? 'h-3 w-3 text-blue-400' : 'h-3 w-3 text-prisol-blue'} />
                        </div>
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Full Bio */}
            <div className="mb-8">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-blue-300' : 'text-prisol-dark-blue'} mb-4 flex items-center`}>
                <FileText className={`h-5 w-5 mr-3 ${isDark ? 'text-blue-400' : 'text-prisol-blue'}`} />
                Complete Biography
              </h2>
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} p-6 rounded-xl shadow-sm border`}>
                {teamMember.fullBio.split('\n\n').map((paragraph, index) => (
                  <p key={index} className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 leading-relaxed`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Works with Section */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} p-8 rounded-xl shadow-lg mb-8 border`}>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-blue-300' : 'text-prisol-dark-blue'} mb-6 flex items-center`}>
            <Users className={`h-5 w-5 mr-3 ${isDark ? 'text-blue-400' : 'text-prisol-blue'}`} />
            Works Closely With
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allTeamMembers
              .filter(m => m.isCoFounder && m.name !== teamMember.name)
              .map((member, index) => (
                <Link 
                  to={`/team/${member.name.toLowerCase().replace(/\s+/g, '-')}`} 
                  key={index}
                  className="group"
                  onClick={() => {
                    // Force scroll to top on click before navigation
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className={`${isDark 
                    ? 'bg-gray-700 border-gray-600 group-hover:border-blue-500/50' 
                    : 'bg-gray-50 border-gray-100 group-hover:border-prisol-blue/30'
                  } p-5 rounded-xl flex items-center border transition-colors`}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className={`w-14 h-14 object-cover rounded-full ${isDark ? 'border-gray-700' : 'border-white'} border-2 mr-4`}
                    />
                    <div>
                      <h3 className={`font-medium ${isDark 
                        ? 'text-blue-300 group-hover:text-blue-400' 
                        : 'text-prisol-dark-blue group-hover:text-prisol-blue'
                      } transition-colors`}>{member.name}</h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{member.position.split('&')[1].trim()}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        
        {/* Contact section */}
        <div className="bg-gradient-to-r from-prisol-dark-blue to-prisol-blue p-8 rounded-xl shadow-lg text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="leading-relaxed">
                Connect with {teamMember.name.split(' ')[0]} and our expert team at PrisolTech to discuss 
                how we can help accelerate your digital transformation journey and drive innovation.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Link to="/contact">
                <Button className={`${isDark 
                  ? 'bg-white text-prisol-dark-blue hover:bg-gray-100' 
                  : 'bg-white text-prisol-dark-blue hover:bg-blue-50'
                } px-8 py-6 text-lg font-semibold rounded-xl shadow-md border border-white/10`}>
                  Schedule a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMemberProfile;
