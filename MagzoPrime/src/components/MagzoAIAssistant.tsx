import * as React from 'react';
import { Bot, MessageSquare, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Switch } from '@/components/ui/switch';
import { Toggle } from '@/components/ui/toggle';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

// Define Speech Recognition types for TypeScript
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface Window {
  SpeechRecognition?: new () => SpeechRecognition;
  webkitSpeechRecognition?: new () => SpeechRecognition;
}

// Example messages for the assistant
const preloadedMessages = [
  { role: 'assistant', content: 'Hello! How can I help you with Magzo Prime today?' },
  { role: 'user', content: 'I need help finding a book.' },
  { role: 'assistant', content: 'I\'d be happy to help you find a book! What genre or author are you interested in?' },
];

// Navigation suggestions
const navigationSuggestions = [
  { title: 'Bestsellers', path: '/bestsellers' },
  { title: 'New Releases', path: '/new-releases' },
  { title: 'Special Offers', path: '/special-offers' },
  { title: 'Categories', path: '/categories' },
  { title: 'My Account', path: '/account' },
];

// Service suggestions
const serviceSuggestions = [
  { title: 'Return Policy', path: '/returns' },
  { title: 'Shipping Info', path: '/shipping' },
  { title: 'Contact Us', path: '/contact' },
  { title: 'Help Center', path: '/help' },
];

export function MagzoAIAssistant() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState(preloadedMessages);
  const [inputValue, setInputValue] = React.useState('');
  const [isListening, setIsListening] = React.useState(false);
  const [voiceEnabled, setVoiceEnabled] = React.useState(true);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Speech recognition setup
  const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = SpeechRecognitionClass ? new SpeechRecognitionClass() : null;
  
  if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
      // Auto-send voice message
      handleSendMessage(transcript);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
  }
  
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const toggleListening = () => {
    if (!recognition) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive",
      });
      return;
    }
    
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setIsListening(true);
    }
  };
  
  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user', content: text };
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      let response;
      
      // Check if it's a navigation question
      if (text.toLowerCase().includes('find') || 
          text.toLowerCase().includes('where') || 
          text.toLowerCase().includes('bestseller') || 
          text.toLowerCase().includes('new release') ||
          text.toLowerCase().includes('special') ||
          text.toLowerCase().includes('category')) {
        response = "I can help you navigate to what you're looking for! Here are some popular sections:";
        
        // Add AI response
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        
        // Add navigation suggestions
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: 'navigation-suggestions' 
          }]);
        }, 500);
        
      } else if (text.toLowerCase().includes('return') || 
                text.toLowerCase().includes('ship') || 
                text.toLowerCase().includes('contact') || 
                text.toLowerCase().includes('help') ||
                text.toLowerCase().includes('policy') ||
                text.toLowerCase().includes('support')) {
        // Customer service questions
        response = "I'd be happy to help you with your customer service needs:";
        
        // Add AI response
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        
        // Add service suggestions
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: 'service-suggestions' 
          }]);
        }, 500);
      } else {
        // General response
        response = "Thank you for your message! Our Magzo AI Assistant is here to help with navigation and basic customer service queries. How else can I assist you today?";
        
        // Add AI response
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      }
      
      // Text-to-speech for AI responses if enabled
      if (voiceEnabled && 'speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(response);
        speech.rate = 1.0;
        speech.pitch = 1.0;
        speech.volume = 1.0;
        window.speechSynthesis.speak(speech);
      }
    }, 1000);
  };
  
  function AIToggleButton() {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 rounded-full p-3 shadow-lg bg-primary hover:bg-primary/90"
        size="icon"
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="h-5 w-5 text-white" />
      </Button>
    );
  }
  
  // Render different UI components based on device type
  const renderContent = () => {
    const content = (
      <div className="flex flex-col h-[550px] md:h-[600px]">
        <div className="flex items-center justify-between p-2 border-b">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <span className="font-medium">Magzo AI</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Voice Response</span>
            <Switch 
              checked={voiceEnabled} 
              onCheckedChange={setVoiceEnabled} 
              aria-label="Toggle voice response"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => {
            if (message.content === 'navigation-suggestions') {
              return (
                <div key={`nav-${index}`} className="flex flex-wrap gap-2">
                  {navigationSuggestions.map((suggestion) => (
                    <Button 
                      key={suggestion.path} 
                      variant="outline" 
                      size="sm" 
                      asChild
                    >
                      <a href={suggestion.path}>{suggestion.title}</a>
                    </Button>
                  ))}
                </div>
              );
            } else if (message.content === 'service-suggestions') {
              return (
                <div key={`service-${index}`} className="flex flex-wrap gap-2">
                  {serviceSuggestions.map((suggestion) => (
                    <Button 
                      key={suggestion.path} 
                      variant="outline" 
                      size="sm" 
                      asChild
                    >
                      <a href={suggestion.path}>{suggestion.title}</a>
                    </Button>
                  ))}
                </div>
              );
            }
            
            return (
              <div 
                key={index} 
                className={cn(
                  "flex",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div 
                  className={cn(
                    "rounded-lg px-4 py-2 max-w-[80%]",
                    message.role === 'user' 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Toggle 
              pressed={isListening}
              onPressedChange={toggleListening}
              aria-label="Toggle voice input"
              className={cn(
                "p-3",
                isListening ? "bg-primary text-primary-foreground" : ""
              )}
            >
              <Mic className="h-5 w-5" />
            </Toggle>
            <Button type="submit" size="icon" aria-label="Send message">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    );
    
    if (isMobile) {
      return (
        <>
          <AIToggleButton />
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="max-h-[85vh]">
              <DrawerHeader>
                <DrawerTitle>Magzo AI Assistant</DrawerTitle>
              </DrawerHeader>
              {content}
            </DrawerContent>
          </Drawer>
        </>
      );
    } else if (window.innerWidth < 1024) {
      return (
        <>
          <AIToggleButton />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Magzo AI Assistant</SheetTitle>
              </SheetHeader>
              {content}
            </SheetContent>
          </Sheet>
        </>
      );
    } else {
      return (
        <>
          <AIToggleButton />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Magzo AI Assistant</DialogTitle>
              </DialogHeader>
              {content}
            </DialogContent>
          </Dialog>
        </>
      );
    }
  };
  
  return renderContent();
}
