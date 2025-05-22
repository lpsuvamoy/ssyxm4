import React, { useState, useEffect } from 'react';
import { MessageSquare, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  useInternet?: boolean;
  useDocument?: boolean;
}

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, isLoading }) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  // Ref for the messages container
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Check if we should show the scroll button
  useEffect(() => {
    const handleScroll = (e: any) => {
      const container = e.target;
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    };
    
    const container = document.querySelector('.chat-messages');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="chat-messages">
      {messages.length === 0 ? (
        // Welcome message when no messages
        <div className="flex justify-center items-center h-full">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Welcome to S.E.N.T.I.N.E.L S.Y.X</h2>
            <p className="mb-4">How can I help you today? Ask me anything about veterans affairs, benefits, or any other topic.</p>
            <div className="grid grid-cols-2 gap-2 mt-6">
              <div className="p-3 glass-hover rounded-md cursor-pointer text-left">
                <div className="font-medium mb-1">VA Benefits Overview</div>
                <div className="text-xs text-muted-foreground">Get a summary of available VA benefits</div>
              </div>
              <div className="p-3 glass-hover rounded-md cursor-pointer text-left">
                <div className="font-medium mb-1">Healthcare Eligibility</div>
                <div className="text-xs text-muted-foreground">Check if you qualify for VA healthcare</div>
              </div>
              <div className="p-3 glass-hover rounded-md cursor-pointer text-left">
                <div className="font-medium mb-1">Education Benefits</div>
                <div className="text-xs text-muted-foreground">Learn about GI Bill and education options</div>
              </div>
              <div className="p-3 glass-hover rounded-md cursor-pointer text-left">
                <div className="font-medium mb-1">Mental Health Resources</div>
                <div className="text-xs text-muted-foreground">Discover mental health support services</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Message list
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-primary/20 rounded-tr-none' 
                    : 'glass rounded-tl-none'
                }`}
              >
                <div className="flex items-center mb-1">
                  <div className={`p-1 rounded-full ${message.role === 'user' ? 'bg-primary/30' : 'bg-background/30'}`}>
                    {message.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className="text-xs ml-2 font-medium">
                    {message.role === 'user' ? 'You' : 'S.E.N.T.I.N.E.L S.Y.X'}
                  </div>
                  <div className="text-xs ml-auto text-muted-foreground">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
                
                <div className="whitespace-pre-wrap">
                  {message.content}
                </div>
                
                {/* Indicators for internet or document use */}
                {message.useInternet && (
                  <div className="mt-1 text-xs text-primary flex items-center">
                    <span className="mr-1">•</span>
                    Internet search was used
                  </div>
                )}
                {message.useDocument && (
                  <div className="mt-1 text-xs text-primary flex items-center">
                    <span className="mr-1">•</span>
                    Document analysis was used
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] glass rounded-lg rounded-tl-none p-3">
                <div className="flex items-center mb-1">
                  <div className="p-1 rounded-full bg-background/30">
                    <Bot size={14} />
                  </div>
                  <div className="text-xs ml-2 font-medium">
                    S.E.N.T.I.N.E.L S.Y.X
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      )}
      
      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button 
          className="absolute bottom-4 right-4 p-2 rounded-full glass shadow-lg"
          onClick={scrollToBottom}
        >
          <MessageSquare size={20} />
        </button>
      )}
    </div>
  );
};

export default ChatArea;
