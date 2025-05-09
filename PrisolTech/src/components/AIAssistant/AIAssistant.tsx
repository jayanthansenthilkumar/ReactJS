import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  X, Send, ArrowRight, MessageSquare, Mic, MicOff, User, 
  Volume2, VolumeX, Calendar, Clock, PenSquare, Check, CheckCheck,
  Camera, Paperclip, Image, Delete, Settings, Heart, Sun, Moon, Laptop
} from 'lucide-react';
import { useAIAssistant } from './AIAssistantContext';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from '@/context/theme/ThemeContext';

// Import styles for scrollbar removal
import './aiAssistant.css';

// Add type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  error: any;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

interface Window {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

// Enhanced Message type with additional fields for real-time chat features
type Message = {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
  isLiked?: boolean;
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  }[];
};

// User preferences type
type UserPreferences = {
  voiceEnabled: boolean;
  notificationsEnabled: boolean;
  fontSize: 'small' | 'medium' | 'large';
  autoScroll: boolean;
  messageHistory: boolean;
};

// Mock user profile for the demo
const userProfile = {
  name: 'Guest User',
  avatar: null,
  email: 'guest@example.com',
};

// Mock AI profile
const aiProfile = {
  name: 'Prisona AI',
  avatar: '/images/prisoltech.png',
  subtitle: 'Virtual Assistant',
};

const AIAssistant = () => {
  const { isOpen, closeAIAssistant, toggleAIAssistant } = useAIAssistant();
  const { theme, setTheme, resolvedTheme } = useTheme(); // Access the global theme context with resolvedTheme
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<{ type: 'image' | 'file'; url: string; name: string }[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    voiceEnabled: true,
    notificationsEnabled: true,
    fontSize: 'medium',
    autoScroll: true,
    messageHistory: true,
  });
  
  const endOfMessagesRef = useRef<null | HTMLDivElement>(null);
  const recognitionRef = useRef<null | SpeechRecognition>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const navigateTimeoutRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Load message history from localStorage when component mounts
  useEffect(() => {
    // Initialize with default message regardless of saved messages
    initializeDefaultMessage();
    
    const savedPreferences = localStorage.getItem('userPreferences');
    
    if (savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences);
        setUserPreferences(parsedPreferences);
        setVoiceEnabled(parsedPreferences.voiceEnabled);
      } catch (error) {
        console.error('Error parsing saved preferences:', error);
      }
    }
  }, []);

  // Initialize with default welcome message
  const initializeDefaultMessage = () => {
    setMessages([{
      id: 1,
      sender: 'ai',
      text: "Hello! I'm Prisona AI, PrisolTech's virtual assistant. How can I help you today? I can provide information about our services, products, or help you navigate our website.",
      timestamp: new Date(),
      status: 'read'
    }]);
  };

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (userPreferences.messageHistory && messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages, userPreferences.messageHistory]);

  // Save user preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  useEffect(() => {
    if (userPreferences.autoScroll) {
      scrollToBottom();
    }
  }, [messages, isOpen, userPreferences.autoScroll]);

  // Update current date time and handle other initialization
  useEffect(() => {
    // Speak the initial greeting when the assistant opens
    if (isOpen && voiceEnabled && messages.length > 0 && messages[0].sender === 'ai') {
      speakText(messages[0].text);
    }
    
    // Update current date and time every minute
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      // Stop any ongoing speech when component unmounts
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
      }
      
      clearInterval(timer);
      
      // Clear any pending navigation timeouts
      if (navigateTimeoutRef.current) {
        window.clearTimeout(navigateTimeoutRef.current);
        navigateTimeoutRef.current = null;
      }
    };
  }, [isOpen]);

  // Format current time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle file uploads
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setFileToUpload(file);
    
    // Create a preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAttachments([
            ...attachments,
            {
              type: 'image',
              url: e.target.result as string,
              name: file.name
            }
          ]);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // For non-image files
      setAttachments([
        ...attachments,
        {
          type: 'file',
          url: URL.createObjectURL(file),
          name: file.name
        }
      ]);
    }
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  // Custom hook for handling AI response
  const handleAIResponse = (userInput: string, userMessageId: number) => {
    setIsProcessing(true);
    setIsTyping(true);
    
    // Mark user message as delivered
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessageId 
            ? { ...msg, status: 'delivered' as const } 
            : msg
        )
      );
    }, 500);
    
    // Process the message after a short delay to simulate thinking
    setTimeout(() => {
      // First stop typing
      setIsTyping(false);
      
      const response = processUserInput(userInput);
      
      const aiMessage: Message = {
        id: userMessageId + 1,
        sender: 'ai',
        text: response.message,
        timestamp: new Date(),
        status: 'sent'
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
      
      // Mark message as read after a short delay
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === userMessageId 
              ? { ...msg, status: 'read' as const } 
              : msg
          )
        );
      }, 1000);
      
      // Handle navigation and speech in a coordinated way
      if (response.navigate) {
        // First show navigation indicator
        setIsNavigating(true);
        
        // Function to perform the actual navigation
        const performNavigation = () => {
          navigate(response.navigate as string);
          closeAIAssistantWithVoiceCleanup();
        };

        if (voiceEnabled) {
          // Speak the response with navigation handling
          speakText(response.message, () => {
            // This callback will be executed when speech is complete
            performNavigation();
          });
        } else {
          // If voice is disabled, wait a short delay then navigate
          setTimeout(performNavigation, 2000);
        }
      } else if (voiceEnabled) {
        // If there's no navigation but voice is enabled, just speak the text
        speakText(response.message);
      }
      
      // Send notification if enabled and the window is not focused
      if (userPreferences.notificationsEnabled && document.visibilityState !== 'visible') {
        try {
          // Request notification permission if not granted
          if (Notification.permission !== 'granted') {
            Notification.requestPermission();
          }
          
          if (Notification.permission === 'granted') {
            new Notification('New message from Prisona AI', {
              body: response.message.substring(0, 100) + (response.message.length > 100 ? '...' : ''),
              icon: '/images/prisoltech.png'
            });
          }
        } catch (error) {
          console.error('Notification error:', error);
        }
      }
    }, 1500 + Math.random() * 1000); // Randomize delay to make it feel more natural
  };

  const handleSend = async () => {
    if (input.trim() === '' && attachments.length === 0) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: new Date(),
      status: 'sent',
      attachments: attachments.length > 0 ? [...attachments] : undefined
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAttachments([]);
    
    // Process the AI response
    handleAIResponse(input, userMessage.id);
  };

  // Handle message like/unlike
  const toggleLike = (messageId: number) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, isLiked: !msg.isLiked } 
          : msg
      )
    );
  };

  // Clear chat history
  const clearChatHistory = () => {
    initializeDefaultMessage();
    localStorage.removeItem('chatMessages');
  };

  const speakText = (text: string, onComplete?: () => void) => {
    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    // For very long texts, split into sentences to improve responsiveness
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    
    // Create a new utterance for the first sentence to start speaking immediately
    const firstUtterance = new SpeechSynthesisUtterance(sentences[0]);
    speechSynthesisRef.current = firstUtterance;
    
    // Set properties for Australian style voice
    firstUtterance.lang = 'en-AU';
    firstUtterance.rate = 1.0;  // Slightly faster rate for better responsiveness
    firstUtterance.pitch = 1.05;
    
    // Track if this is the last sentence
    let currentSentenceIndex = 0;
    const totalSentences = sentences.length;
    
    // Helper function to speak with the selected voice
    const speakWithVoice = (utterance: SpeechSynthesisUtterance, voice: SpeechSynthesisVoice | null = null) => {
      if (voice) {
        utterance.voice = voice;
      }
      
      // Track when speaking starts for each sentence
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      // When a sentence finishes speaking
      utterance.onend = () => {
        currentSentenceIndex++;
        
        // If we have more sentences, speak the next one
        if (currentSentenceIndex < totalSentences) {
          const nextUtterance = new SpeechSynthesisUtterance(sentences[currentSentenceIndex]);
          speechSynthesisRef.current = nextUtterance;
          
          // Copy voice settings to the next utterance
          nextUtterance.lang = utterance.lang;
          nextUtterance.rate = utterance.rate;
          nextUtterance.pitch = utterance.pitch;
          if (utterance.voice) {
            nextUtterance.voice = utterance.voice;
          }
          
          // Set up handlers for the next utterance
          nextUtterance.onend = utterance.onend;
          nextUtterance.onerror = utterance.onerror;
          
          // Speak the next sentence
          window.speechSynthesis.speak(nextUtterance);
        } else {
          // All sentences have been spoken
          setIsSpeaking(false);
          speechSynthesisRef.current = null;
          
          // Call the completion callback if provided
          if (onComplete) {
            onComplete();
          }
        }
      };
      
      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        setIsSpeaking(false);
        speechSynthesisRef.current = null;
        
        // Call the completion callback even on error to ensure navigation still happens
        if (currentSentenceIndex === totalSentences - 1 && onComplete) {
          onComplete();
        }
      };
      
      // Speak the utterance
      window.speechSynthesis.speak(utterance);
    };
    
    // Find an Australian voice or fallback to appropriate alternatives
    const voices = window.speechSynthesis.getVoices();
    
    if (voices.length === 0) {
      // If voices aren't loaded yet, wait and try again
      window.speechSynthesis.onvoiceschanged = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        
        // Priority: 1. Australian English, 2. Any sweet female voice
        const australianVoice = availableVoices.find(voice => 
          (voice.lang === 'en-AU') || 
          (voice.name.toLowerCase().includes('australia')) ||
          (voice.name.toLowerCase().includes('karen'))
        ) || availableVoices.find(voice => 
          (voice.lang.startsWith('en-') && 
           voice.name.toLowerCase().includes('female'))
        );
        
        speakWithVoice(firstUtterance, australianVoice || null);
      };
    } else {
      // Priority: 1. Australian English, 2. Any sweet female voice
      const australianVoice = voices.find(voice => 
        (voice.lang === 'en-AU') || 
        (voice.name.toLowerCase().includes('australia')) ||
        (voice.name.toLowerCase().includes('karen'))
      ) || voices.find(voice => 
        (voice.lang.startsWith('en-') && 
         voice.name.toLowerCase().includes('female'))
      );
      
      speakWithVoice(firstUtterance, australianVoice || null);
    }
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const closeAIAssistantWithVoiceCleanup = () => {
    // First stop any ongoing speech
    stopSpeaking();
    
    // Then close the assistant
    closeAIAssistant();
    
    // Always initialize with default message when closing
    initializeDefaultMessage();
    
    // Remove stored messages from localStorage
    localStorage.removeItem('chatMessages');
  };

  const toggleVoiceOutput = () => {
    setVoiceEnabled(!voiceEnabled);
    setUserPreferences({
      ...userPreferences,
      voiceEnabled: !voiceEnabled
    });
    
    // If turning off voice while speaking, stop speaking
    if (voiceEnabled && isSpeaking) {
      stopSpeaking();
    }
  };

  const processUserInput = (input: string): { message: string; navigate?: string } => {
    const lowerInput = input.toLowerCase();
    
    // Greeting intents
    if (lowerInput.match(/^(hi|hello|hey|greetings|howdy)/)) {
      return { 
        message: `Hello there! How can I assist you today? I can tell you about PrisolTech's services, help you navigate to different sections of our website, or answer questions about our company.`
      };
    }
    
    if (lowerInput.includes('who are you') || lowerInput.includes('your name') || lowerInput.includes('what are you')) {
      return { 
        message: "I'm Prisona AI, PrisolTech's virtual assistant. I'm here to help you learn about our company, services, and products. I can also help you navigate our website and connect you with our team if you have specific questions."
      };
    }
    
    // Real-time chat responses
    if (lowerInput.includes('time') && lowerInput.includes('now')) {
      const now = new Date();
      return { 
        message: `The current time is ${now.toLocaleTimeString()}. Is there anything specific you'd like to know about PrisolTech's services or offerings?`
      };
    }
    
    if (lowerInput.includes('date') && (lowerInput.includes('today') || lowerInput.includes('now'))) {
      const now = new Date();
      return { 
        message: `Today is ${now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. How can I help you with PrisolTech's services today?`
      };
    }
    
    if (lowerInput.includes('weather')) {
      return { 
        message: "I don't have access to real-time weather data. However, I'd be happy to tell you about PrisolTech's cloud solutions that help businesses manage and analyze data from various sources, including weather and environmental monitoring systems."
      };
    }
    
    if (lowerInput.includes('thank')) {
      return { 
        message: "You're welcome! I'm happy to assist you. Is there anything else you'd like to know about PrisolTech or our services?"
      };
    }
    
    if (lowerInput.includes('bye') || lowerInput.includes('goodbye') || lowerInput.includes('see you')) {
      return { 
        message: "Thank you for chatting with me! If you have more questions later, feel free to return. Have a great day!"
      };
    }
    
    if (lowerInput.includes('joke') || lowerInput.includes('funny')) {
      const jokes = [
        "Why don't programmers like nature? It has too many bugs.",
        "Why did the developer go broke? Because he used up all his cache.",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
        "What's a programmer's favorite hangout spot? The Foo Bar.",
        "Why do Java developers wear glasses? Because they don't C#.",
        "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25.",
        "What do you call a programmer from Finland? Nerdic.",
        "How many programmers does it take to screw in a light bulb? None, it's a hardware problem.",
        "Why was the JavaScript developer sad? Because he didn't Node how to Express himself.",
        "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'"
      ];
      return { message: jokes[Math.floor(Math.random() * jokes.length)] + " 😄 Now, how can I help you with PrisolTech's services?" };
    }
    
    // Navigation intents
    if (lowerInput.includes('home') || lowerInput.includes('main page')) {
      return { message: "I'll take you to our home page right away.", navigate: '/' };
    }
    if (lowerInput.includes('about') || lowerInput.includes('company')) {
      return { message: "Let me show you our About page with information about PrisolTech.", navigate: '/about' };
    }
    if (lowerInput.includes('service')) {
      return { message: "I'll direct you to our Services page where you can explore our offerings.", navigate: '/services' };
    }
    if (lowerInput.includes('product')) {
      return { message: "Let me take you to our Products page to see our solutions.", navigate: '/products' };
    }
    if (lowerInput.includes('client') || lowerInput.includes('testimonial')) {
      return { message: "I'll show you our Clients page with testimonials from our satisfied customers.", navigate: '/clients' };
    }
    if (lowerInput.includes('contact') || lowerInput.includes('reach') || lowerInput.includes('talk')) {
      return { message: "Let me direct you to our Contact page where you can get in touch with our team.", navigate: '/contact' };
    }
    if (lowerInput.includes('team') || lowerInput.includes('people') || lowerInput.includes('staff member')) {
      return { message: "I'll take you to our Team page where you can meet the people behind PrisolTech.", navigate: '/team' };
    }
    
    // Company information intents
    if (lowerInput.includes('found') || lowerInput.includes('start') || lowerInput.includes('establish')) {
      return { message: "PrisolTech was founded in January 2025. Despite being a new company, we have rapidly grown due to our expertise and commitment to innovation." };
    }
    if (lowerInput.includes('client') && (lowerInput.includes('how many') || lowerInput.includes('number'))) {
      return { message: "We currently have 5 clients who trust our services. Our client base is growing steadily as we deliver exceptional solutions and support." };
    }
    if (lowerInput.includes('project') && (lowerInput.includes('how many') || lowerInput.includes('number'))) {
      return { message: "We have successfully completed 3 projects since our inception. Each project demonstrates our commitment to quality and innovation." };
    }
    
    // Location information
    if (lowerInput.includes('where') && (lowerInput.includes('located') || lowerInput.includes('office') || lowerInput.includes('headquarters'))) {
      return { message: "PrisolTech's headquarters is located in Bengaluru, India. We also have satellite offices in Chennai and Mumbai to serve clients across the country. Additionally, we have a remote workforce that allows us to collaborate with clients globally." };
    }
    
    // CEO or leadership information
    if (lowerInput.includes('ceo') || lowerInput.includes('founder') || lowerInput.includes('leader') || lowerInput.includes('manage')) {
      return { message: "PrisolTech was founded by Jayanthan Sridhar, who serves as our CEO. He has over 15 years of experience in the technology industry, with expertise in enterprise solutions and digital transformation. Our leadership team includes Deepak Raman as CTO, Prithika Rajesh as COO, and Sonali Mukherjee as CFO." };
    }
    
    // Information intents
    if (lowerInput.includes('services') || lowerInput.includes('offer') || lowerInput.includes('what you do')) {
      return { 
        message: "PrisolTech offers a comprehensive range of IT services including software development, cybersecurity solutions, cloud migration, IT consulting, and managed IT services. Our custom software development service creates tailored applications to meet your specific business needs. Our cybersecurity solutions protect your digital assets from emerging threats. We can help migrate your infrastructure to the cloud for better scalability. Our IT consulting team provides strategic guidance for digital transformation. And our managed IT services ensure your systems run smoothly 24/7." 
      };
    }
    if (lowerInput.includes('erp')) {
      return { 
        message: "PrisolERP is our flagship enterprise resource planning solution that integrates all facets of business including planning, purchasing, inventory, sales, marketing, finance, and HR. It features comprehensive module integration, real-time data analytics, customizable dashboards, automated reporting, and mobile accessibility. Our ERP solution can be tailored to businesses of all sizes and industries, with implementation support and ongoing maintenance included." 
      };
    }
    if (lowerInput.includes('crm')) {
      return { 
        message: "PrisolCRM is our customer relationship management platform that helps businesses improve customer interactions, streamline processes, and increase profitability. It includes contact & lead management, sales pipeline tracking, customer service tools, marketing campaign integration, and performance analytics. The system is fully customizable to your sales process and integrates with popular email and communication platforms." 
      };
    }
    if (lowerInput.includes('security') || lowerInput.includes('cyber')) {
      return { 
        message: "PrisolGuard is our comprehensive cybersecurity solution that protects your business from threats, detects vulnerabilities, and ensures compliance with regulations. It offers real-time threat detection, endpoint protection, network security monitoring, data loss prevention, and compliance management. We also provide security audits, penetration testing, and employee security awareness training to create a complete security posture for your organization." 
      };
    }
    if (lowerInput.includes('cloud') || lowerInput.includes('aws') || lowerInput.includes('azure')) {
      return { 
        message: "PrisolTech offers comprehensive cloud services including cloud migration, hybrid cloud setup, cloud-native application development, and ongoing cloud infrastructure management. We have expertise in AWS, Azure, and Google Cloud Platform. Our team can help you select the right cloud platform, migrate existing applications and data, optimize costs, and ensure security in the cloud environment." 
      };
    }
    if (lowerInput.includes('consult')) {
      return { 
        message: "Our IT consulting services provide strategic guidance to help your business leverage technology effectively. We offer digital transformation roadmaps, IT infrastructure assessment, technology stack recommendations, and process optimization. Our consultants have industry-specific expertise and can help align your IT strategy with your business goals to drive growth and efficiency." 
      };
    }
    if (lowerInput.includes('managed service') || lowerInput.includes('it support')) {
      return { 
        message: "PrisolTech's Managed IT Services provide comprehensive technical support and monitoring for your entire IT infrastructure. We offer 24/7 monitoring, proactive maintenance, help desk support, network management, and cybersecurity services. Our tiered service plans can be customized to your business needs, ensuring your technology runs smoothly while you focus on your core business activities." 
      };
    }
    
    // Team/Employee information
    if (lowerInput.includes('team') || lowerInput.includes('staff') || lowerInput.includes('employee')) {
      return { 
        message: "PrisolTech has a dedicated team of 15 professionals including software developers, cybersecurity experts, project managers, and customer support specialists. Our development team specializes in various programming languages and frameworks, our security experts hold industry certifications like CISSP and CEH, and our project managers are PMP and Scrum certified. Together, we deliver exceptional solutions tailored to our clients' needs." 
      };
    }
    
    // Pricing information
    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('fee')) {
      return { 
        message: "Our pricing varies based on the specific solution and requirements. We offer flexible pricing models including subscription-based, one-time licensing fees, and custom packages. For software development, we can work on fixed-price projects or time and materials arrangements. Our managed services are available in tiered plans starting from $1,000 per month for small businesses. For a detailed quote, please visit our contact page." 
      };
    }
    
    // Technology stack
    if (lowerInput.includes('tech') || lowerInput.includes('stack') || lowerInput.includes('programming')) {
      return { 
        message: "At PrisolTech, we utilize cutting-edge technologies including React, Angular, and Vue.js for frontend development; Node.js, Python, and Java for backend systems; AWS, Azure, and Google Cloud for cloud infrastructure; MongoDB, PostgreSQL, and MySQL for databases; and TensorFlow and PyTorch for AI/ML implementations. We select technologies based on each project's specific requirements to ensure optimal performance, scalability, and maintainability." 
      };
    }
    
    // Career opportunities
    if (lowerInput.includes('career') || lowerInput.includes('job') || lowerInput.includes('work') || lowerInput.includes('hire') || lowerInput.includes('join')) {
      return { 
        message: "We're always looking for talented individuals to join our team! Current openings include Senior Software Engineer (React/Node.js), Cybersecurity Analyst, Cloud Solutions Architect, and Project Manager positions. We offer competitive salaries, comprehensive benefits, professional development opportunities, flexible work arrangements, and a collaborative culture. Visit our Careers page to learn more and apply." 
      };
    }
    
    // Support inquiries
    if (lowerInput.includes('support') || lowerInput.includes('help') || lowerInput.includes('issue') || lowerInput.includes('problem')) {
      return { 
        message: "For technical support, please email support@prisoltech.com or call our dedicated support line at +1-555-PRISOL-HELP. Our support team is available Monday to Friday, 9AM to 6PM EST. Enterprise clients with service level agreements have access to our priority support with guaranteed response times. For urgent matters, we also offer 24/7 emergency support." 
      };
    }
    
    // Industry expertise
    if (lowerInput.includes('industry') || lowerInput.includes('sector') || lowerInput.includes('specialize')) {
      return { 
        message: "PrisolTech specializes in providing IT solutions for healthcare, finance, manufacturing, and retail industries. For healthcare, we offer HIPAA-compliant systems and telemedicine platforms. In finance, we develop secure transaction processing and regulatory compliance solutions. For manufacturing, we create IoT integrations and supply chain management systems. And in retail, we implement omnichannel commerce platforms and customer analytics solutions." 
      };
    }
    
    // Case studies or success stories
    if (lowerInput.includes('case stud') || lowerInput.includes('success stor') || lowerInput.includes('example')) {
      return { 
        message: "We have several success stories, including implementing PrisolERP for a manufacturing company that reduced operational costs by 30% and increased production efficiency by 25%. We deployed PrisolCRM for a retail chain that increased customer retention by 25% and boosted sales by 20%. We also established a cybersecurity framework for a healthcare provider that achieved HIPAA compliance while improving their security posture and preventing potential data breaches." 
      };
    }
    
    // AI capabilities
    if (lowerInput.includes('ai') || lowerInput.includes('artificial intelligence') || lowerInput.includes('machine learning')) {
      return { 
        message: "PrisolTech leverages artificial intelligence and machine learning in many of our solutions. We develop predictive analytics models, natural language processing applications, computer vision systems, and recommendation engines. Our AI capabilities can be integrated into existing systems or built as standalone solutions to automate processes, gain insights from data, enhance customer experiences, and support decision-making across your organization." 
      };
    }
    
    // Mobile app development
    if (lowerInput.includes('mobile') || lowerInput.includes('app') || lowerInput.includes('ios') || lowerInput.includes('android')) {
      return { 
        message: "PrisolTech offers comprehensive mobile application development services for iOS and Android platforms. We use React Native and Flutter for cross-platform development, as well as native development when performance is critical. Our mobile app development process includes UI/UX design, development, testing, deployment, and ongoing maintenance. We can build everything from simple business apps to complex, data-intensive mobile solutions integrated with your enterprise systems." 
      };
    }
    
    // Web development
    if (lowerInput.includes('web') || lowerInput.includes('website') || lowerInput.includes('ecommerce')) {
      return { 
        message: "Our web development services cover everything from simple informational websites to complex web applications and e-commerce platforms. We create responsive, accessible websites optimized for all devices. For e-commerce, we implement secure payment gateways, inventory management, and customer account systems. Our web development stack includes modern frameworks like React, Vue.js, and Next.js, ensuring fast, scalable, and maintainable web solutions." 
      };
    }
    
    // Implementation process
    if (lowerInput.includes('implement') || lowerInput.includes('deploy') || lowerInput.includes('integration')) {
      return { 
        message: "Our implementation process follows a proven methodology to ensure successful deployment of our solutions. We begin with a thorough requirements analysis, followed by solution design and planning. Implementation is executed in phases with regular client feedback. We provide comprehensive testing, user training, and documentation. After deployment, we offer ongoing support and maintenance. This approach minimizes disruption to your business operations while ensuring a smooth transition to the new system." 
      };
    }
    
    // Company vision/mission
    if (lowerInput.includes('vision') || lowerInput.includes('mission') || lowerInput.includes('values')) {
      return { 
        message: "PrisolTech's mission is to empower businesses through innovative technology solutions that drive growth, efficiency, and competitive advantage. Our vision is to be the most trusted technology partner for organizations seeking digital transformation. Our core values include client-focused innovation, technical excellence, integrity in all interactions, continuous learning, and collaborative problem-solving. These principles guide everything we do as we help our clients navigate the evolving technology landscape." 
      };
    }
    
    // Partnership opportunities
    if (lowerInput.includes('partner') || lowerInput.includes('alliance') || lowerInput.includes('collaborate')) {
      return { 
        message: "PrisolTech actively seeks strategic partnerships with complementary technology providers, industry experts, and solution integrators. Our partnership program offers co-marketing opportunities, technical collaboration, and revenue sharing models. We currently partner with leading cloud providers, hardware manufacturers, and specialized software companies to deliver comprehensive solutions to our clients. To explore partnership opportunities, please contact our business development team." 
      };
    }
    
    // Data analytics services
    if (lowerInput.includes('data analytic') || lowerInput.includes('big data') || lowerInput.includes('business intelligence') || lowerInput.includes('bi')) {
      return {
        message: "Our data analytics services help businesses transform raw data into actionable insights. We build customized dashboards and reporting solutions that enable real-time monitoring of key performance indicators. Our data scientists use advanced statistical techniques to identify patterns and trends in your data. We also implement predictive analytics models to forecast future outcomes and recommend strategic actions. All our analytics solutions are designed with user-friendly interfaces to make data accessible to decision-makers across your organization."
      };
    }
    
    // IoT solutions
    if (lowerInput.includes('iot') || lowerInput.includes('internet of things') || lowerInput.includes('smart device') || lowerInput.includes('connected device')) {
      return {
        message: "PrisolTech offers end-to-end Internet of Things (IoT) solutions for various industries. We develop custom IoT applications that connect smart devices, sensors, and machines to centralized management systems. Our solutions include real-time monitoring dashboards, automated alerts, and predictive maintenance capabilities. For manufacturing, we create industrial IoT systems that optimize production processes. For retail, we implement smart inventory and shopping experience solutions. And for healthcare, we develop remote patient monitoring systems."
      };
    }
    
    // DevOps services
    if (lowerInput.includes('devops') || lowerInput.includes('ci/cd') || lowerInput.includes('continuous integration') || lowerInput.includes('continuous deployment')) {
      return {
        message: "Our DevOps services help organizations streamline software development and IT operations. We implement CI/CD pipelines using tools like Jenkins, GitLab CI, and GitHub Actions to automate building, testing, and deployment processes. We set up infrastructure as code using Terraform, Ansible, or CloudFormation for consistent, repeatable environments. Our team also implements monitoring and logging solutions for proactive issue detection and resolution. By adopting our DevOps practices, clients typically see 40% faster deployment times and 60% reduction in production issues."
      };
    }
    
    // Blockchain solutions
    if (lowerInput.includes('blockchain') || lowerInput.includes('crypto') || lowerInput.includes('smart contract') || lowerInput.includes('web3')) {
      return {
        message: "PrisolTech develops innovative blockchain solutions for enterprises seeking enhanced security, transparency, and efficiency. We build private blockchain networks for supply chain tracking, digital identity verification, and secure document management. Our team has expertise in popular blockchain platforms including Ethereum, Hyperledger, and Solana. We implement smart contracts for automated, trustless transactions and create decentralized applications (dApps) with intuitive user interfaces. All our blockchain solutions are designed with scalability, security, and regulatory compliance in mind."
      };
    }
    
    // Quality assurance and testing
    if (lowerInput.includes('qa') || lowerInput.includes('quality assurance') || lowerInput.includes('testing') || lowerInput.includes('test automation')) {
      return {
        message: "PrisolTech's Quality Assurance services ensure your software meets the highest standards of reliability and performance. We implement comprehensive testing strategies including functional testing, performance testing, security testing, and user acceptance testing. Our team uses test automation frameworks to improve efficiency and coverage of repetitive tests. We also perform rigorous regression testing to prevent new features from breaking existing functionality. Our QA processes integrate seamlessly with your development workflow, enabling faster releases while maintaining quality."
      };
    }
    
    // Digital transformation
    if (lowerInput.includes('digital transformation') || lowerInput.includes('digitize') || lowerInput.includes('modernize') || lowerInput.includes('digital strategy')) {
      return {
        message: "We help organizations navigate their digital transformation journey with comprehensive strategies and implementation support. Our approach begins with assessing your current technology landscape and business objectives. We then develop a roadmap for adopting new technologies that align with your goals. Implementation includes modernizing legacy systems, adopting cloud infrastructure, implementing data analytics, and enhancing customer experiences through digital channels. Throughout the process, we focus on change management to ensure successful adoption across your organization."
      };
    }
    
    // Remote work solutions
    if (lowerInput.includes('remote work') || lowerInput.includes('work from home') || lowerInput.includes('hybrid work') || lowerInput.includes('virtual collaboration')) {
      return {
        message: "PrisolTech provides comprehensive solutions to support remote and hybrid work environments. We implement secure virtual desktop infrastructure (VDI) and cloud workspace solutions that allow employees to access company resources from anywhere. Our collaboration tools integrate video conferencing, document sharing, and project management capabilities. We also set up robust security measures including multi-factor authentication, VPN solutions, and endpoint protection to safeguard your data in distributed work environments. All our remote work solutions are designed for user-friendliness and minimal IT overhead."
      };
    }
    
    // Sustainability and green IT
    if (lowerInput.includes('sustainability') || lowerInput.includes('green') || lowerInput.includes('environmental') || lowerInput.includes('carbon')) {
      return {
        message: "PrisolTech is committed to sustainability through our Green IT initiatives. We help organizations reduce their environmental impact by implementing energy-efficient cloud solutions, optimizing data center operations, and designing systems with minimal resource consumption. Our energy monitoring software provides visibility into power usage and carbon emissions across your IT infrastructure. We also offer e-waste management services and can help you develop a comprehensive sustainability roadmap for your technology assets. Our green IT solutions not only benefit the environment but often lead to significant cost savings through reduced energy consumption."
      };
    }
    
    // Default responses
    const defaultResponses = [
      "I'd be happy to help with that. Could you provide more details about what you're looking for?",
      "That's an interesting question. PrisolTech offers a wide range of IT solutions tailored to your business needs.",
      "Thank you for your query. Our team of experts can assist with IT infrastructure, cybersecurity, cloud services, and much more.",
      "I understand you're interested in our services. Would you like me to connect you with one of our specialists for more detailed information?",
      "PrisolTech has been delivering innovative IT solutions since 2025. How can we help your business today?",
      "We specialize in custom software development, cybersecurity, and digital transformation. What specific aspect are you interested in?",
      "Our expert team is ready to tackle your IT challenges with innovative solutions. Could you elaborate on your requirements?",
      "At PrisolTech, we pride ourselves on delivering high-quality IT solutions on time and within budget. How can we assist you?",
      "We'd love to learn more about your business needs to recommend the most suitable solution from our portfolio.",
      "Technology is constantly evolving, and so are our solutions. Let's discuss how we can help you stay ahead of the curve.",
      "I'm here to help you find the right technology solution. Could you tell me a bit about your business challenges?",
      "Every business has unique needs. I'd be happy to explain how our customizable solutions can address your specific requirements.",
      "PrisolTech's solutions are designed to grow with your business. What are your current pain points and future goals?",
      "I can provide information on any of our services or products. What area are you most interested in learning about?",
      "Our experts have experience across multiple industries. Which sector does your business operate in?",
      "PrisolTech combines technical expertise with industry knowledge to deliver solutions that drive real business value. How can we help you achieve your goals?",
      "We offer end-to-end technology services from strategy and consulting to implementation and ongoing support. What stage of the process are you currently in?",
      "I'd be happy to share more about our approach to technology solutions. Is there a specific challenge you're trying to solve?",
      "Our clients appreciate our transparent communication and collaborative approach. Would you like to hear more about how we work with our partners?",
      "Digital transformation isn't just about technology—it's about improving processes and enhancing experiences. What aspects of your business are you looking to transform?"
    ];
    
    return { message: defaultResponses[Math.floor(Math.random() * defaultResponses.length)] };
  };

  const toggleListening = () => {
    // Check if browser supports Speech Recognition
    const getSpeechRecognition = (): SpeechRecognitionConstructor | null => {
      if (typeof window === 'undefined') return null;
      return ((window as any).SpeechRecognition || 
              (window as any).webkitSpeechRecognition || 
              null) as SpeechRecognitionConstructor | null;
    };
    
    const SpeechRecognitionAPI = getSpeechRecognition();
    
    if (!SpeechRecognitionAPI) {
      alert("Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      setIsListening(false);
    } else {
      // Start listening
      try {
        const recognition = new SpeechRecognitionAPI();
        recognitionRef.current = recognition;
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-AU'; // Change to Australian English to match the voice
        
        recognition.onresult = (event: SpeechRecognitionEvent) => {
          if (event.results && event.results.length > 0) {
            const transcript = event.results[0][0].transcript;
            
            // Directly call handleQuickLinkClick instead of using the input state
            if (transcript) {
              handleQuickLinkClick(transcript);
            }
          }
          setIsListening(false);
        };
        
        recognition.onerror = (event: SpeechRecognitionEvent) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error initializing speech recognition:', error);
        alert("There was an error starting speech recognition. Please try again.");
        setIsListening(false);
      }
    }
  };

  // Helper function to handle quick link clicks
  const handleQuickLinkClick = (message: string) => {
    // Prevent processing if already processing a message
    if (isProcessing) return;
    
    // Create user message directly
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: message,
      timestamp: new Date(),
      status: 'sent'
    };
    
    // Add the message to the chat immediately
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input field and any attachments
    setInput('');
    setAttachments([]);
    
    // Process the AI response
    handleAIResponse(message, userMessage.id);
  };

  // Render message status indicator
  const renderMessageStatus = (status?: 'sent' | 'delivered' | 'read') => {
    switch (status) {
      case 'sent':
        return <Check size={14} className="text-gray-400" />;
      case 'delivered':
        return <CheckCheck size={14} className="text-gray-400" />;
      case 'read':
        return <CheckCheck size={14} className="text-blue-500" />;
      default:
        return null;
    }
  };

  // AI Assistant toggle button (always visible)
  const assistantToggle = (
    <Button
      onClick={toggleAIAssistant}
      className="fixed left-6 bottom-6 bg-prisol-blue hover:bg-prisol-dark-blue text-white shadow-lg rounded-full w-14 h-14 flex items-center justify-center z-40"
      aria-label="Toggle AI Assistant"
    >
      <MessageSquare size={24} />
    </Button>
  );

  if (!isOpen) return assistantToggle;

  return (
    <>
      {assistantToggle}
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="ai-assistant-container w-full max-w-md h-[600px] max-h-[90vh] flex flex-col bg-background shadow-xl rounded-xl overflow-hidden">
          <div className={`${resolvedTheme === 'dark' ? 'bg-slate-800' : 'bg-prisol-blue'} text-white p-3 flex justify-between items-center`}>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src={aiProfile.avatar} alt={aiProfile.name} />
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">{aiProfile.name}</h2>
                <div className="flex items-center text-xs opacity-70">
                  <span className="mr-2">{aiProfile.subtitle}</span>
                  {isTyping && <span className="animate-pulse">typing...</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setActiveTab(activeTab === 'settings' ? 'chat' : 'settings')}
                      className="text-white hover:bg-blue-700 h-8 w-8"
                    >
                      <Settings size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider */}
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={toggleVoiceOutput}
                      className="text-white hover:bg-blue-700 h-8 w-8"
                    >
                      {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Voice {voiceEnabled ? 'On' : 'Off'}</p>
                  </TooltipContent>
                </Tooltip>
                </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={clearChatHistory}
                      className="text-white hover:bg-blue-700 h-8 w-8"
                    >
                      <Delete size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clear chat</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={closeAIAssistantWithVoiceCleanup}
                      className="text-white hover:bg-blue-700 h-8 w-8"
                    >
                      <X size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Close</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsContent value="chat" className={`flex-1 overflow-y-auto overflow-x-hidden p-4 ${resolvedTheme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'} data-[state=inactive]:hidden`}>
                {messages.map((message, index) => {
                  // Check if we need to show date separator
                  const showDateSeparator = index === 0 || 
                    new Date(message.timestamp).toDateString() !== new Date(messages[index - 1].timestamp).toDateString();
                  
                  return (
                    <React.Fragment key={message.id}>
                      {showDateSeparator && (
                        <div className="flex justify-center my-3">
                          <div className={`${resolvedTheme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-600'} text-xs px-2 py-1 rounded-full`}>
                            {new Date(message.timestamp).toLocaleDateString(undefined, 
                              { weekday: 'short', month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      )}
                      
                      <div 
                        className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`
                          p-3 rounded-lg max-w-[80%] relative group
                          ${message.sender === 'user' 
                            ? 'bg-prisol-blue text-white rounded-tr-none' 
                            : resolvedTheme === 'dark'
                              ? 'bg-slate-800 border border-slate-700 text-slate-100 shadow-sm rounded-tl-none'
                              : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'}
                        `}>
                          <div className="flex items-center mb-1">
                            {message.sender === 'ai' ? (
                              <Avatar className="h-5 w-5 mr-2">
                                <AvatarImage src={aiProfile.avatar} alt={aiProfile.name} />
                                <AvatarFallback>PA</AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="flex items-center">
                                <User size={16} className="mr-2" />
                                <span className="text-xs opacity-70 mr-1">You</span>
                                {renderMessageStatus(message.status)}
                              </div>
                            )}
                            <span className="text-xs opacity-50 ml-auto">
                              {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                          
                          <p className={`mb-1 ${userPreferences.fontSize === 'small' ? 'text-sm' : 
                                      userPreferences.fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
                            {message.text}
                          </p>
                          
                          {/* Message attachments */}
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment, index) => (
                                <div key={index} className={`rounded-lg overflow-hidden border ${resolvedTheme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
                                  {attachment.type === 'image' ? (
                                    <img 
                                      src={attachment.url} 
                                      alt={attachment.name} 
                                      className="max-w-full max-h-48 object-contain"
                                    />
                                  ) : (
                                    <div className={`${resolvedTheme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'} p-2 text-sm flex items-center`}>
                                      <Paperclip size={14} className="mr-2" />
                                      <span className="truncate">{attachment.name}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Message actions */}
                          <div className={`
                            absolute -bottom-6 ${message.sender === 'user' ? 'right-0' : 'left-0'}
                            opacity-0 group-hover:opacity-100 transition-opacity flex gap-1
                          `}>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => toggleLike(message.id)}
                              className={`h-6 w-6 rounded-full ${resolvedTheme === 'dark' ? 'bg-slate-700' : 'bg-white'} shadow-sm 
                                ${message.isLiked ? 'text-red-500' : 'text-gray-400'}`}
                            >
                              <Heart size={12} fill={message.isLiked ? "currentColor" : "none"} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                
                {isProcessing && !isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className={`${resolvedTheme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border p-3 rounded-lg rounded-tl-none shadow-sm`}>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-prisol-blue rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-prisol-blue rounded-full animate-pulse delay-150"></div>
                        <div className="w-2 h-2 bg-prisol-blue rounded-full animate-pulse delay-300"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className={`${resolvedTheme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border p-3 rounded-lg rounded-tl-none shadow-sm flex items-center`}>
                      <Avatar className="h-5 w-5 mr-2">
                        <AvatarImage src={aiProfile.avatar} alt={aiProfile.name} />
                        <AvatarFallback>PA</AvatarFallback>
                      </Avatar>
                      <PenSquare size={14} className="mr-2 text-prisol-blue animate-pulse" />
                      <span className={`text-sm ${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Prisona is typing...</span>
                    </div>
                  </div>
                )}
                
                {isNavigating && (
                  <div className="flex justify-center mb-4">
                    <div className={`${resolvedTheme === 'dark' ? 'bg-amber-900 border-amber-800 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-700'} border p-2 rounded-lg text-sm flex items-center`}>
                      <ArrowRight size={16} className="mr-2 animate-pulse" />
                      Preparing to navigate...
                    </div>
                  </div>
                )}
                
                <div ref={endOfMessagesRef} />
              </TabsContent>
              
              <TabsContent value="settings" className={`flex-1 overflow-y-auto overflow-x-hidden p-4 ${resolvedTheme === 'dark' ? 'bg-slate-900/80' : 'bg-muted/20'} data-[state=inactive]:hidden`}>
                <h3 className="font-medium text-lg mb-4">Settings</h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-medium">Chat</h4>
                    
                    <div className="flex items-center justify-between">
                      <label htmlFor="message-history" className="text-sm">Save message history</label>
                      <Switch 
                        id="message-history" 
                        checked={userPreferences.messageHistory}
                        onCheckedChange={(checked) => setUserPreferences({...userPreferences, messageHistory: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label htmlFor="auto-scroll" className="text-sm">Auto-scroll to new messages</label>
                      <Switch 
                        id="auto-scroll" 
                        checked={userPreferences.autoScroll}
                        onCheckedChange={(checked) => setUserPreferences({...userPreferences, autoScroll: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label htmlFor="voice-enabled" className="text-sm">Voice responses</label>
                      <Switch 
                        id="voice-enabled" 
                        checked={userPreferences.voiceEnabled}
                        onCheckedChange={(checked) => {
                          setUserPreferences({...userPreferences, voiceEnabled: checked});
                          setVoiceEnabled(checked);
                          if (!checked && isSpeaking) stopSpeaking();
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label htmlFor="notifications" className="text-sm">Notifications</label>
                      <Switch 
                        id="notifications" 
                        checked={userPreferences.notificationsEnabled}
                        onCheckedChange={(checked) => {
                          setUserPreferences({...userPreferences, notificationsEnabled: checked});
                          if (checked && Notification.permission !== 'granted') {
                            Notification.requestPermission();
                          }
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Appearance</h4>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        variant={theme === 'light' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('light')}
                        className="w-full"
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </Button>
                      <Button 
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('dark')}
                        className="w-full"
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </Button>
                      <Button 
                        variant={theme === 'system' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('system')}
                        className="w-full"
                      >
                        <Laptop className="h-4 w-4 mr-2" />
                        System
                      </Button>
                    </div>
                    
                    <div className={`mt-3 p-3 rounded-md text-xs ${resolvedTheme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${resolvedTheme === 'dark' ? 'bg-slate-500' : 'bg-gray-400'}`}></div>
                        Current theme: <span className="font-semibold ml-1">{theme === 'system' ? `System (${resolvedTheme})` : theme}</span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <h5 className="text-sm font-medium mb-2">Font Size</h5>
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          variant={userPreferences.fontSize === 'small' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setUserPreferences({...userPreferences, fontSize: 'small'})}
                          className="w-full text-xs"
                        >
                          Small
                        </Button>
                        <Button 
                          variant={userPreferences.fontSize === 'medium' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setUserPreferences({...userPreferences, fontSize: 'medium'})}
                          className="w-full"
                        >
                          Medium
                        </Button>
                        <Button 
                          variant={userPreferences.fontSize === 'large' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setUserPreferences({...userPreferences, fontSize: 'large'})}
                          className="w-full text-lg"
                        >
                          Large
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Actions</h4>
                    
                    <Button 
                      variant="destructive"
                      size="sm"
                      onClick={clearChatHistory}
                      className="w-full"
                    >
                      <Delete size={16} className="mr-2" />
                      Clear Chat History
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {activeTab === 'chat' && (
            <>
              {/* Attachment preview */}
              {attachments.length > 0 && (
                <div className={`p-2 border-t ${resolvedTheme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-gray-50'} flex gap-2 overflow-y-auto overflow-x-hidden whitespace-nowrap`}>
                  {attachments.map((attachment, index) => (
                    <div key={index} className="relative group">
                      {attachment.type === 'image' ? (
                        <div className={`w-16 h-16 rounded border ${resolvedTheme === 'dark' ? 'border-slate-600' : 'border-gray-300'} overflow-hidden`}>
                          <img src={attachment.url} alt={attachment.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className={`w-16 h-16 rounded border ${resolvedTheme === 'dark' ? 'border-slate-600 bg-slate-700' : 'border-gray-300 bg-gray-100'} flex flex-col items-center justify-center p-1`}>
                          <Paperclip size={16} />
                          <span className="text-xs truncate w-full text-center">{attachment.name.substring(0, 10)}</span>
                        </div>
                      )}
                      <button 
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeAttachment(index)}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className={`p-4 border-t ${resolvedTheme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={toggleListening}
                    className={`${isListening ? 'bg-red-50 text-red-500 border-red-200' : 'text-prisol-blue border-prisol-blue'}`}
                    title={isListening ? "Stop listening" : "Start voice input"}
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </Button>
                  
                  <div className="relative flex-1">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                      placeholder={isListening ? "Listening..." : "Type your message..."}
                      className="pr-10"
                      disabled={isListening || isNavigating}
                    />
                    
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      className="hidden" 
                      onChange={handleFileUpload}
                      accept="image/*,.pdf,.doc,.docx,.txt"
                    />
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute right-2 top-0 h-full text-gray-400 hover:text-prisol-blue"
                      disabled={isListening || isNavigating}
                    >
                      <Paperclip size={18} />
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={handleSend}
                    disabled={(input.trim() === '' && attachments.length === 0) || isProcessing || isNavigating}
                    className="bg-prisol-blue hover:bg-prisol-dark-blue text-white"
                  >
                    <Send size={18} />
                  </Button>
                </div>
                
                <div className="mt-2 text-xs text-gray-500 flex justify-center">
                  <div className="flex items-center gap-1 flex-wrap justify-center">
                    <span>Quick links:</span>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-xs h-auto p-0" 
                      onClick={() => handleQuickLinkClick("Tell me about your services")}
                    >
                      Services
                    </Button>
                    <span>•</span>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-xs h-auto p-0" 
                      onClick={() => handleQuickLinkClick("How can I contact you?")}
                    >
                      Contact
                    </Button>
                    <span>•</span>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-xs h-auto p-0" 
                      onClick={() => handleQuickLinkClick("What products do you offer?")}
                    >
                      Products
                    </Button>
                    <span>•</span>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="text-xs h-auto p-0" 
                      onClick={() => handleQuickLinkClick("Tell me a joke")}
                    >
                      Joke
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default AIAssistant;
