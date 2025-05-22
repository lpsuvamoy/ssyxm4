import React, { useEffect, useRef } from 'react';

interface NewsTicker {
  id: string;
  text: string;
  date: string;
  category: string;
}

const NewsTicker: React.FC = () => {
  const [news] = React.useState<NewsTicker[]>([
    { 
      id: '1', 
      text: 'Veterans can now access expanded healthcare benefits through the PACT Act', 
      date: 'May 22, 2025',
      category: 'Healthcare'
    },
    { 
      id: '2', 
      text: 'New mental health resources available for veterans through VA telehealth services', 
      date: 'May 21, 2025',
      category: 'Mental Health'
    },
    { 
      id: '3', 
      text: 'VA announces technology upgrades to improve service delivery and reduce wait times', 
      date: 'May 20, 2025',
      category: 'Technology'
    },
    { 
      id: '4', 
      text: 'Veteran job fair scheduled for next month in major cities across the country', 
      date: 'May 19, 2025',
      category: 'Employment'
    },
    { 
      id: '5', 
      text: 'Housing assistance program expanded for homeless veterans in rural areas', 
      date: 'May 18, 2025',
      category: 'Housing'
    }
  ]);
  
  const tickerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  
  // Calculate the full width of the ticker content for smooth animation
  useEffect(() => {
    const tickerElement = tickerRef.current;
    if (tickerElement) {
      const tickerWidth = tickerElement.scrollWidth;
      const animationDuration = tickerWidth / 50; // Adjust speed as needed
      
      tickerElement.style.animationDuration = `${animationDuration}s`;
    }
  }, [news]);
  
  return (
    <div 
      className="news-ticker glass flex items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex-shrink-0 bg-primary/20 px-3 py-1 font-bold text-sm">
        VA NEWS
      </div>
      <div className="relative overflow-hidden flex-1">
        <div 
          ref={tickerRef}
          className={`ticker-content ${isPaused ? 'animate-pause' : ''}`}
        >
          {news.map((item, index) => (
            <React.Fragment key={item.id}>
              <span className="mx-4">
                <span className="font-semibold">{item.category}:</span> {item.text}
              </span>
              {index < news.length - 1 && (
                <span className="mx-2 text-primary">•</span>
              )}
            </React.Fragment>
          ))}
          {/* Duplicate the news items for seamless looping */}
          {news.map((item, index) => (
            <React.Fragment key={`dup-${item.id}`}>
              <span className="mx-4">
                <span className="font-semibold">{item.category}:</span> {item.text}
              </span>
              {index < news.length - 1 && (
                <span className="mx-2 text-primary">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
