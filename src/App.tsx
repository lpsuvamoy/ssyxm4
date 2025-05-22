import React, { useState, useEffect } from 'react';
import './App.css';
import LeftPane from './components/LeftPane';
import RightPane from './components/RightPane';
import TopBar from './components/TopBar';
import NewsTicker from './components/NewsTicker';
import ChatArea from './components/ChatArea';
import UserInput from './components/UserInput';
import ChatControls from './components/ChatControls';
import { deepseekService, serperService } from './services/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  useInternet?: boolean;
  useDocument?: boolean;
}

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [temperature] = useState(0.7);
  const [tone] = useState('professional');
  const [apiKey, setApiKey] = useState('');
  const [serperApiKey, setSerperApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  // Check for API keys on load
  useEffect(() => {
    const storedApiKey = localStorage.getItem('deepseekApiKey');
    const storedSerperApiKey = localStorage.getItem('serperApiKey');
    
    if (storedApiKey) {
      setApiKey(storedApiKey);
    } else {
      setShowApiKeyModal(true);
    }
    
    if (storedSerperApiKey) {
      setSerperApiKey(storedSerperApiKey);
    }
    
    // Check for dark mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  // Save API keys
  const saveApiKeys = () => {
    if (apiKey) {
      localStorage.setItem('deepseekApiKey', apiKey);
    }
    
    if (serperApiKey) {
      localStorage.setItem('serperApiKey', serperApiKey);
    }
    
    setShowApiKeyModal(false);
  };
  
  // Handle sending a message
  const handleSendMessage = async (content: string, useInternet?: boolean, useDocument?: boolean) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      useInternet,
      useDocument
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      let assistantContent = '';
      
      // Format messages for API
      const apiMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add the new user message
      apiMessages.push({
        role: 'user',
        content: userMessage.content
      });
      
      // If using internet, perform search first
      if (useInternet && serperApiKey) {
        try {
          const searchResults = await serperService.searchWeb(content, serperApiKey);
          const formattedResults = serperService.formatSearchResults(searchResults);
          
          // Add search results to the API messages
          apiMessages.push({
            role: 'assistant',
            content: `I searched the internet for you and found these results:\n\n${formattedResults}\n\nNow I'll answer your question based on this information.`
          });
          
          // Add user instruction to use the search results
          apiMessages.push({
            role: 'user',
            content: 'Please use the search results you just provided to answer my original question in a comprehensive way.'
          });
        } catch (error) {
          console.error('Error performing internet search:', error);
        }
      }
      
      // Get response from DeepSeek AI
      if (apiKey) {
        // Add tone instruction if needed
        if (tone !== 'professional') {
          // Use a user message for tone instruction instead of system
          apiMessages.push({
            role: 'user',
            content: `Please respond in a ${tone} tone.`
          });
        }
        
        assistantContent = await deepseekService.getChatCompletion(apiMessages, temperature, apiKey);
      } else {
        assistantContent = "Please set your DeepSeek API key to enable AI responses.";
      }
      
      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date(),
        useInternet,
        useDocument
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again later.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle regenerating the last response
  const handleRegenerate = async () => {
    // Find the last user message
    const lastUserMessageIndex = [...messages].reverse().findIndex(msg => msg.role === 'user');
    
    if (lastUserMessageIndex === -1) return;
    
    // Remove all messages after the last user message
    const lastUserMessage = messages[messages.length - 1 - lastUserMessageIndex];
    const newMessages = messages.slice(0, messages.length - lastUserMessageIndex);
    
    setMessages(newMessages);
    
    // Re-send the last user message
    await handleSendMessage(
      lastUserMessage.content,
      lastUserMessage.useInternet,
      lastUserMessage.useDocument
    );
  };
  
  // Handle copying chat
  const handleCopy = () => {
    const chatText = messages.map(msg => 
      `${msg.role === 'user' ? 'You' : 'S.E.N.T.I.N.E.L S.Y.X'}: ${msg.content}`
    ).join('\n\n');
    
    navigator.clipboard.writeText(chatText)
      .then(() => {
        alert('Chat copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy chat:', err);
      });
  };
  
  // Handle clearing chat
  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      setMessages([]);
    }
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      {/* Top Bar */}
      <TopBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* News Ticker */}
      <NewsTicker />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Left Pane */}
        <LeftPane />

        {/* Chat Area */}
        <div className="chat-area flex flex-col m-2 glass">
          <ChatArea messages={messages} isLoading={isLoading} />

          {/* User Input */}
          <UserInput onSendMessage={handleSendMessage} />

          {/* Chat Controls */}
          <ChatControls 
            onRegenerate={handleRegenerate}
            onCopy={handleCopy}
            onClear={handleClear}
          />
        </div>

        {/* Right Pane */}
        <RightPane />
      </div>
      
      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass w-full max-w-md overflow-hidden rounded-lg">
            <div className="p-4 border-b border-border">
              <h3 className="font-medium">S.E.N.T.I.N.E.L S.Y.X API Keys Setup</h3>
            </div>
            
            <div className="p-6">
              <p className="mb-4 text-sm">
                Please enter your API keys to enable full functionality. Your keys are stored locally in your browser.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    DeepSeek AI API Key (Required)
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full p-2 rounded-md bg-background/50 border border-border"
                    placeholder="sk-..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Serper API Key (Optional, for internet search)
                  </label>
                  <input
                    type="password"
                    value={serperApiKey}
                    onChange={(e) => setSerperApiKey(e.target.value)}
                    className="w-full p-2 rounded-md bg-background/50 border border-border"
                    placeholder="Your Serper API key"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                  onClick={saveApiKeys}
                  disabled={!apiKey}
                >
                  Save Keys
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
