import React, { useState } from 'react';
import { ExternalLink, BarChart2, Settings } from 'lucide-react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MenuItem {
  id: string;
  title: string;
  url: string;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

const RightPane: React.FC = () => {
  const [menuCategories] = useState<MenuCategory[]>([
    {
      id: '1',
      name: 'DBQs',
      items: [
        { id: '1', title: 'Mental Health', url: 'https://www.va.gov/find-forms/about-form-21-0960p-2/' },
        { id: '2', title: 'Physical Health', url: 'https://www.va.gov/find-forms/about-form-21-0960c-1/' },
        { id: '3', title: 'Disability Claims', url: 'https://www.va.gov/disability/how-to-file-claim/' },
      ]
    },
    {
      id: '2',
      name: 'VACD Links',
      items: [
        { id: '4', title: 'Benefits', url: 'https://www.va.gov/benefits/' },
        { id: '5', title: 'Healthcare', url: 'https://www.va.gov/health-care/' },
        { id: '6', title: 'Education', url: 'https://www.va.gov/education/' },
      ]
    }
  ]);
  
  const [showIframeModal, setShowIframeModal] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['1', '2']); // Default expanded
  
  // Performance chart data
  const performanceData = {
    labels: ['Response Time', 'Accuracy', 'Relevance', 'Helpfulness', 'Clarity'],
    datasets: [
      {
        label: 'Current Session',
        data: [85, 92, 88, 95, 90],
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
      {
        label: 'Average',
        data: [80, 85, 82, 88, 84],
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          display: false,
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          font: {
            size: 10
          }
        }
      }
    }
  };
  
  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };
  
  const openIframeModal = (item: MenuItem) => {
    setCurrentUrl(item.url);
    setCurrentTitle(item.title);
    setShowIframeModal(true);
  };
  
  return (
    <div className="right-pane glass m-2 flex flex-col">
      <div className="p-3 border-b border-border">
        <div className="text-sm font-medium flex items-center">
          <ExternalLink size={16} className="mr-2" /> Resources
        </div>
      </div>
      
      <div className="p-2 overflow-y-auto flex-1">
        {menuCategories.map(category => (
          <div key={category.id} className="mb-3">
            <div 
              className="text-sm font-medium mb-1 p-1 rounded cursor-pointer hover:bg-background/20 flex items-center justify-between"
              onClick={() => toggleCategory(category.id)}
            >
              <span>{category.name}</span>
              <span>{expandedCategories.includes(category.id) ? '−' : '+'}</span>
            </div>
            
            {expandedCategories.includes(category.id) && (
              <div className="pl-2 space-y-1">
                {category.items.map(item => (
                  <div 
                    key={item.id} 
                    className="text-xs p-1 glass-hover rounded cursor-pointer flex items-center"
                    onClick={() => openIframeModal(item)}
                  >
                    <span className="mr-1">•</span>
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        <div className="mt-4">
          <div className="text-sm font-medium mb-2 flex items-center">
            <Settings size={16} className="mr-2" /> Functional Buttons
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-2 text-xs glass-hover rounded text-center">
              Save Transcript
            </button>
            <button className="p-2 text-xs glass-hover rounded text-center">
              Reset Session
            </button>
            <button className="p-2 text-xs glass-hover rounded text-center">
              Feedback
            </button>
            <button className="p-2 text-xs glass-hover rounded text-center">
              Help
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-3 border-t border-border">
        <div className="text-sm font-medium mb-2 flex items-center">
          <BarChart2 size={16} className="mr-2" /> AI Performance
        </div>
        <div className="h-48 bg-background/30 rounded-md p-2">
          <div style={{ height: '100%' }}>
            <Chart type='bar' data={performanceData} options={chartOptions} />
          </div>
        </div>
      </div>
      
      {/* Iframe Modal */}
      {showIframeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass w-full max-w-4xl h-[80vh] overflow-hidden rounded-lg flex flex-col">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="font-medium">{currentTitle}</h3>
              <button 
                className="p-1 hover:bg-background/30 rounded-full"
                onClick={() => setShowIframeModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <iframe 
                src={currentUrl} 
                title={currentTitle}
                className="w-full h-full border-0"
                sandbox="allow-same-origin allow-scripts"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightPane;
