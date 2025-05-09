
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, X, Send } from 'lucide-react';

const AISidebar = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', content: "Hello! I'm your UniHer AI assistant. How can I help you today?" }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = { type: 'user', content: inputValue };
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse;
      if (inputValue.toLowerCase().includes('study') || inputValue.toLowerCase().includes('exam')) {
        botResponse = { 
          type: 'bot', 
          content: "Based on your study schedule, I recommend focusing on Calculus today. Your exam is in 5 days, and your past performance data shows you need about 4 days of preparation for math subjects." 
        };
      } else if (inputValue.toLowerCase().includes('wellness') || inputValue.toLowerCase().includes('stress')) {
        botResponse = { 
          type: 'bot', 
          content: "I've noticed your stress levels are higher this week. Would you like to try a 5-minute guided meditation? Or I can help you schedule a break in your calendar." 
        };
      } else {
        botResponse = { 
          type: 'bot', 
          content: "I'm here to help with your academics, career planning, wellness routines, and more. What specific area would you like assistance with?" 
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-4 bg-uniher-purple bg-opacity-10 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-uniher-purple" />
          <h3 className="font-medium">UniHer AI Assistant</h3>
        </div>
      </div>
      
      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-uniher-purple text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-border">
        <div className="flex items-end gap-2">
          <textarea 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your AI assistant..."
            className="flex-1 resize-none border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-uniher-purple min-h-[60px]"
          />
          
          <Button 
            onClick={handleSendMessage} 
            size="icon" 
            className="bg-uniher-purple hover:bg-uniher-purple-dark"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
          <span>Your data is kept private and secure</span>
          <Button variant="ghost" size="sm" className="text-xs h-auto py-1">
            Clear conversation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AISidebar;
