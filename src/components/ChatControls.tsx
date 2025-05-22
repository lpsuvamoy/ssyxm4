import React, { useState } from 'react';
import { RefreshCw, Copy, Trash } from 'lucide-react';

interface ChatControlsProps {
  onRegenerate: () => void;
  onCopy: () => void;
  onClear: () => void;
}

const ChatControls: React.FC<ChatControlsProps> = ({ onRegenerate, onCopy, onClear }) => {
  const [temperature, setTemperature] = useState(0.7);
  const [tone, setTone] = useState('professional');
  
  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'empathetic', label: 'Empathetic' },
    { value: 'technical', label: 'Technical' }
  ];
  
  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemperature(parseFloat(e.target.value));
  };
  
  const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTone(e.target.value);
  };
  
  return (
    <div className="chat-controls glass flex items-center justify-between px-4 py-2">
      <div className="flex items-center space-x-4">
        {/* Temperature Control */}
        <div className="flex items-center">
          <span className="text-xs mr-2">Temp: {temperature.toFixed(1)}</span>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            value={temperature}
            onChange={handleTemperatureChange}
            className="w-20 h-2 bg-background/50 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        {/* Tone Selector */}
        <div className="flex items-center">
          <span className="text-xs mr-2">Tone:</span>
          <select 
            className="text-xs p-1 bg-background/50 rounded border border-border"
            value={tone}
            onChange={handleToneChange}
          >
            {tones.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {/* Regenerate Button */}
        <button 
          className="p-2 rounded-full glass-hover flex items-center" 
          title="Regenerate Response"
          onClick={onRegenerate}
        >
          <RefreshCw size={16} />
          <span className="ml-1 text-xs hidden sm:inline">Regenerate</span>
        </button>
        
        {/* Copy Button */}
        <button 
          className="p-2 rounded-full glass-hover flex items-center" 
          title="Copy Chat"
          onClick={onCopy}
        >
          <Copy size={16} />
          <span className="ml-1 text-xs hidden sm:inline">Copy</span>
        </button>
        
        {/* Clear Button */}
        <button 
          className="p-2 rounded-full glass-hover flex items-center" 
          title="Clear Chat"
          onClick={onClear}
        >
          <Trash size={16} />
          <span className="ml-1 text-xs hidden sm:inline">Clear</span>
        </button>
      </div>
    </div>
  );
};

export default ChatControls;
