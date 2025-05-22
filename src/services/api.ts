import axios from 'axios';

// DeepSeek AI API service
export const deepseekService = {
  // Function to get chat completion from DeepSeek AI
  getChatCompletion: async (messages: any[], temperature: number, apiKey: string) => {
    try {
      const response = await axios.post(
        'https://api.deepseek.com/v1/chat/completions',
        {
          model: 'deepseek-chat',
          messages,
          temperature,
          max_tokens: 2000,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        }
      );
      
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling DeepSeek API:', error);
      throw error;
    }
  }
};

// Serper API service for internet search
export const serperService = {
  // Function to search the web using Serper API
  searchWeb: async (query: string, apiKey: string) => {
    try {
      const response = await axios.post(
        'https://api.serper.dev/search',
        {
          q: query,
          gl: 'us',
          hl: 'en',
          num: 5
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error calling Serper API:', error);
      throw error;
    }
  },
  
  // Function to format search results into a readable message
  formatSearchResults: (results: any) => {
    if (!results || !results.organic) {
      return 'No search results found.';
    }
    
    let formattedResults = 'Here are the search results:\n\n';
    
    results.organic.forEach((result: any, index: number) => {
      formattedResults += `${index + 1}. ${result.title}\n`;
      formattedResults += `   ${result.link}\n`;
      if (result.snippet) {
        formattedResults += `   ${result.snippet}\n`;
      }
      formattedResults += '\n';
    });
    
    return formattedResults;
  }
};

// Document processing service
export const documentService = {
  // Function to extract text from a document
  extractText: async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          // For simplicity, we're just handling text files directly
          // In a real app, you'd use libraries to handle different file types
          const text = event.target.result as string;
          resolve(text);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      // Read as text for now (in a real app, you'd handle different file types differently)
      reader.readAsText(file);
    });
  }
};

// Voice recognition service
export const voiceService = {
  // Function to start voice recognition
  startRecognition: () => {
    return new Promise<any>((resolve, reject) => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        reject(new Error('Speech recognition not supported in this browser'));
        return;
      }
      
      // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.start();
      resolve(recognition);
    });
  }
};
