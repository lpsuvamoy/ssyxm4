import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Share, 
  Mail, 
  FileText, 
  Languages, 
  Upload,
  Download
} from 'lucide-react';

interface TopBarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ darkMode, toggleDarkMode }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
  ];
  
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const handleShareChat = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  const handleEmailChat = () => {
    // Email functionality would be implemented here
    console.log('Email chat');
  };
  
  const handleExportToPDF = () => {
    // PDF export functionality would be implemented here
    console.log('Export to PDF');
  };
  
  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    setShowLanguageOptions(false);
    // Language change functionality would be implemented here
    console.log('Language changed to:', langCode);
  };
  
  const handleHeroButton = () => {
    // Hero button functionality would be implemented here
    console.log('HERO button clicked');
  };
  
  return (
    <div className="top-bar glass">
      <div className="flex items-center justify-between w-full">
        <div className="text-xl font-bold flex items-center">
          <img 
            src="/logo.svg" 
            alt="S.E.N.T.I.N.E.L S.Y.X" 
            className="h-8 w-8 mr-2" 
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';
            }}
          />
          S.E.N.T.I.N.E.L S.Y.X
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Share Chat Button */}
          <div className="relative">
            <button 
              className="p-2 rounded-full glass-hover flex items-center" 
              title="Share Chat"
              onClick={handleShareChat}
            >
              <Share size={20} />
              <span className="ml-1 text-sm hidden sm:inline">Share</span>
            </button>
            
            {showShareOptions && (
              <div className="absolute right-0 mt-2 w-48 glass rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm glass-hover">
                    <Upload size={16} className="mr-2" />
                    Copy Share Link
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm glass-hover">
                    <Download size={16} className="mr-2" />
                    Download Chat
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Email Chat Button */}
          <button 
            className="p-2 rounded-full glass-hover flex items-center" 
            title="Email Chat"
            onClick={handleEmailChat}
          >
            <Mail size={20} />
            <span className="ml-1 text-sm hidden sm:inline">Email</span>
          </button>
          
          {/* Export to PDF Button */}
          <button 
            className="p-2 rounded-full glass-hover flex items-center" 
            title="Export to PDF"
            onClick={handleExportToPDF}
          >
            <FileText size={20} />
            <span className="ml-1 text-sm hidden sm:inline">PDF</span>
          </button>
          
          {/* Language Changer Button */}
          <div className="relative">
            <button 
              className="p-2 rounded-full glass-hover flex items-center" 
              title="Change Language"
              onClick={() => setShowLanguageOptions(!showLanguageOptions)}
            >
              <Languages size={20} />
              <span className="ml-1 text-sm hidden sm:inline">Language</span>
            </button>
            
            {showLanguageOptions && (
              <div className="absolute right-0 mt-2 w-48 glass rounded-md shadow-lg z-10">
                <div className="py-1">
                  {languages.map(lang => (
                    <button 
                      key={lang.code}
                      className={`flex items-center w-full px-4 py-2 text-sm ${selectedLanguage === lang.code ? 'bg-primary/20' : 'glass-hover'}`}
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      {lang.name}
                      {selectedLanguage === lang.code && (
                        <span className="ml-auto">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* HERO Button */}
          <button 
            className="p-2 rounded-full glass-hover bg-primary/20 flex items-center" 
            title="HERO"
            onClick={handleHeroButton}
          >
            <span className="font-bold text-sm">HERO</span>
          </button>
          
          {/* Light/Dark Mode Toggle */}
          <button 
            className="p-2 rounded-full glass-hover" 
            title={darkMode ? "Light Mode" : "Dark Mode"}
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
