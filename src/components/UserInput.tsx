import React, { useState, useRef } from 'react';
import { Mic, Globe, FileSearch, Send, StopCircle } from 'lucide-react';

interface UserInputProps {
  onSendMessage: (message: string, useInternet?: boolean, useDocument?: boolean) => void;
}

const UserInput: React.FC<UserInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [useInternet, setUseInternet] = useState(false);
  const [useDocument, setUseDocument] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle voice recording
  const handleVoiceButton = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  
  const startRecording = () => {
    setIsRecording(true);
    // Here you would implement the actual voice recording functionality
    // using the Web Speech API or another library
    console.log('Started recording');
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    // Here you would stop the recording and process the audio
    console.log('Stopped recording');
    // Simulating voice-to-text conversion
    setMessage(message + " [Voice input transcription would appear here]");
  };
  
  // Handle internet access toggle
  const handleInternetToggle = () => {
    setUseInternet(!useInternet);
  };
  
  // Handle document selection
  const handleDocumentButton = () => {
    setShowDocumentModal(true);
  };
  
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedDocument(e.target.files[0]);
      setUseDocument(true);
      setShowDocumentModal(false);
    }
  };
  
  const handleRemoveDocument = () => {
    setSelectedDocument(null);
    setUseDocument(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Handle message submission
  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message, useInternet, useDocument);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="user-input glass">
      {/* Selected Document Indicator */}
      {selectedDocument && (
        <div className="mb-2 p-2 bg-primary/10 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <FileSearch size={16} className="mr-2" />
            <span className="text-sm truncate">{selectedDocument.name}</span>
          </div>
          <button 
            className="p-1 hover:bg-background/30 rounded-full"
            onClick={handleRemoveDocument}
          >
            ✕
          </button>
        </div>
      )}
      
      <div className="flex items-center">
        <div className="flex-1">
          <textarea 
            className="w-full p-3 rounded-md bg-background/50 border border-border resize-none"
            placeholder={useInternet ? "Ask me anything with internet access..." : "Type your message here..."}
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
        </div>
        <div className="ml-2 flex flex-col space-y-2">
          {/* Voice Input Button */}
          <button 
            className={`p-2 rounded-full ${isRecording ? 'bg-destructive text-destructive-foreground' : 'glass-hover'}`}
            title={isRecording ? "Stop Recording" : "Voice Input"}
            onClick={handleVoiceButton}
          >
            {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
          </button>
          
          {/* Internet Access Button */}
          <button 
            className={`p-2 rounded-full ${useInternet ? 'bg-primary text-primary-foreground' : 'glass-hover'}`}
            title="Internet Access"
            onClick={handleInternetToggle}
          >
            <Globe size={20} />
          </button>
          
          {/* Chat with Document Button */}
          <button 
            className={`p-2 rounded-full ${useDocument ? 'bg-primary text-primary-foreground' : 'glass-hover'}`}
            title="Chat with Document"
            onClick={handleDocumentButton}
          >
            <FileSearch size={20} />
          </button>
          
          {/* Send Button */}
          <button 
            className="p-2 rounded-full bg-primary text-primary-foreground"
            title="Send Message"
            onClick={handleSendMessage}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
      
      {/* Hidden file input */}
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept=".pdf,.doc,.docx,.txt"
      />
      
      {/* Document Selection Modal */}
      {showDocumentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass w-full max-w-md overflow-hidden rounded-lg">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="font-medium">Select a Document</h3>
              <button 
                className="p-1 hover:bg-background/30 rounded-full"
                onClick={() => setShowDocumentModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <p className="mb-4 text-sm">
                Upload a document to chat with its contents. Supported formats: PDF, DOC, DOCX, TXT.
              </p>
              
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-md">
                <FileSearch size={32} className="mb-2 text-muted-foreground" />
                <p className="mb-2 text-sm text-center">
                  Drag and drop a file here, or click to select
                </p>
                <button 
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                  onClick={handleFileSelect}
                >
                  Select File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInput;
