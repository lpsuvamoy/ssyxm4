import React, { useState } from 'react';
import { Plus, MessageSquare, History, Edit2, Trash2, ChevronDown, ChevronRight } from 'lucide-react';

interface ChatSession {
  id: string;
  title: string;
  date: string;
  messages: any[];
}

interface PromptCategory {
  id: string;
  name: string;
  prompts: Prompt[];
}

interface Prompt {
  id: string;
  title: string;
  content: string;
}

const LeftPane: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([
    { id: '1', title: 'Research on Veterans Benefits', date: 'May 22, 2025', messages: [] },
    { id: '2', title: 'Healthcare Options', date: 'May 21, 2025', messages: [] },
    { id: '3', title: 'Education Benefits', date: 'May 20, 2025', messages: [] },
  ]);
  
  const [promptCategories] = useState<PromptCategory[]>([
    {
      id: '1',
      name: 'Veterans Benefits',
      prompts: [
        { id: '1', title: 'VA Disability Claims', content: 'Help me understand the process for filing a VA disability claim.' },
        { id: '2', title: 'Education Benefits', content: 'Explain the GI Bill benefits and how to apply for them.' },
      ]
    },
    {
      id: '2',
      name: 'Healthcare',
      prompts: [
        { id: '3', title: 'VA Healthcare Eligibility', content: 'Am I eligible for VA healthcare benefits?' },
        { id: '4', title: 'Mental Health Services', content: 'What mental health services are available to veterans?' },
      ]
    },
    {
      id: '3',
      name: 'Housing',
      prompts: [
        { id: '5', title: 'VA Home Loans', content: 'Explain the VA home loan program and how to qualify.' },
        { id: '6', title: 'Homeless Veterans', content: 'What resources are available for homeless veterans?' },
      ]
    }
  ]);
  
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<{[key: string]: boolean}>({
    'Today': true,
    'Yesterday': true,
    'Previous': true
  });
  
  // Group sessions by date
  const groupedSessions = sessions.reduce((groups: {[key: string]: ChatSession[]}, session) => {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
    const sessionDate = new Date(session.date).toLocaleDateString();
    
    let group = 'Previous';
    if (sessionDate === today) {
      group = 'Today';
    } else if (sessionDate === yesterday) {
      group = 'Yesterday';
    }
    
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(session);
    return groups;
  }, {});
  
  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };
  
  const toggleGroup = (group: string) => {
    setExpandedGroups({
      ...expandedGroups,
      [group]: !expandedGroups[group]
    });
  };
  
  const startNewChat = () => {
    const newSession = {
      id: Date.now().toString(),
      title: 'New Conversation',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      messages: []
    };
    setSessions([newSession, ...sessions]);
  };
  
  const startRenameSession = (session: ChatSession) => {
    setEditingSessionId(session.id);
    setEditTitle(session.title);
  };
  
  const saveRenamedSession = () => {
    if (editingSessionId && editTitle.trim()) {
      setSessions(sessions.map(session => 
        session.id === editingSessionId 
          ? { ...session, title: editTitle.trim() } 
          : session
      ));
    }
    setEditingSessionId(null);
    setEditTitle('');
  };
  
  const deleteSession = (sessionId: string) => {
    setSessions(sessions.filter(session => session.id !== sessionId));
  };
  
  const usePrompt = (prompt: Prompt) => {
    console.log('Using prompt:', prompt.content);
    // Here you would implement the logic to use the prompt in the chat
    setShowPromptModal(false);
  };
  
  return (
    <div className="left-pane glass m-2 flex flex-col">
      <div className="p-3 border-b border-border">
        <button 
          className="w-full p-2 rounded-md bg-primary text-primary-foreground flex items-center justify-center"
          onClick={startNewChat}
        >
          <Plus size={18} className="mr-2" /> New Chat
        </button>
      </div>
      
      <div className="p-3 border-b border-border">
        <button 
          className="w-full p-2 rounded-md glass-hover flex items-center justify-center"
          onClick={() => setShowPromptModal(!showPromptModal)}
        >
          <MessageSquare size={18} className="mr-2" /> Prompts
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        <div className="text-sm font-medium mb-2 flex items-center">
          <History size={16} className="mr-2" /> Chat History
        </div>
        
        {/* Grouped Chat History */}
        <div className="space-y-3">
          {Object.entries(groupedSessions).map(([group, groupSessions]) => (
            <div key={group} className="space-y-1">
              <div 
                className="flex items-center justify-between cursor-pointer p-1 hover:bg-background/20 rounded"
                onClick={() => toggleGroup(group)}
              >
                <span className="text-xs font-medium">{group}</span>
                {expandedGroups[group] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
              
              {expandedGroups[group] && (
                <div className="space-y-1 pl-2">
                  {groupSessions.map(session => (
                    <div key={session.id} className="p-2 rounded-md glass-hover cursor-pointer group">
                      {editingSessionId === session.id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onBlur={saveRenamedSession}
                            onKeyDown={(e) => e.key === 'Enter' && saveRenamedSession()}
                            className="flex-1 text-sm p-1 bg-background/50 border border-border rounded"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm truncate">{session.title}</div>
                            <div className="text-xs text-muted-foreground">{session.date}</div>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 flex">
                            <button 
                              className="p-1 hover:bg-background/30 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                startRenameSession(session);
                              }}
                            >
                              <Edit2 size={14} />
                            </button>
                            <button 
                              className="p-1 hover:bg-background/30 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteSession(session.id);
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Prompts Modal */}
      {showPromptModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass w-full max-w-md max-h-[80vh] overflow-hidden rounded-lg">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="font-medium">Select a Prompt</h3>
              <button 
                className="p-1 hover:bg-background/30 rounded-full"
                onClick={() => setShowPromptModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {promptCategories.map(category => (
                <div key={category.id} className="mb-4">
                  <div 
                    className="flex items-center justify-between p-2 bg-background/20 rounded cursor-pointer"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <span className="font-medium">{category.name}</span>
                    {expandedCategories.includes(category.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  
                  {expandedCategories.includes(category.id) && (
                    <div className="mt-2 space-y-2 pl-2">
                      {category.prompts.map(prompt => (
                        <div 
                          key={prompt.id} 
                          className="p-2 glass-hover rounded cursor-pointer"
                          onClick={() => usePrompt(prompt)}
                        >
                          <div className="text-sm font-medium">{prompt.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{prompt.content}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftPane;
