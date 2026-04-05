import { useState } from 'react';
import { Search, ArrowRight, Bot, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { queryDataset } from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleQuery = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery('');
    setLoading(true);

    try {
      const response = await queryDataset(userMessage.content);
      const results = response.results;
      
      let botContent = "I couldn't find any relevant information in your datasets. Please ensure your query relates to the uploaded contexts.";
      if (results && results.length > 0) {
        botContent = "Here are the most relevant records found:\n\n" + results.map(r => `• ${r}`).join('\n\n');
      }

      setMessages((prev) => [...prev, { role: 'bot', content: botContent }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'bot', content: "An error occurred while analyzing the data. Make sure a dataset is fully uploaded and indexed." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Ask DataSage</h1>
      </div>
      
      <div className="flex-1 glass-card rounded-2xl flex flex-col overflow-hidden border border-slate-700/50">
        
        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <Bot size={48} className="mb-4 text-indigo-400 opacity-50" />
              <p className="text-lg font-medium text-slate-300">How can I help you analyze your data?</p>
              <p className="max-w-md text-center mt-2 opacity-70">Ask me questions about the patterns, records, and insights hidden within the CSV datasets you've uploaded.</p>
              <button onClick={() => navigate('/dashboard/datasets')} className="mt-6 text-sm text-indigo-400 hover:text-indigo-300 underline font-medium">
                Upload a dataset first
              </button>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
                    <Bot size={16} />
                  </div>
                )}
                
                <div className={`max-w-[75%] rounded-2xl px-5 py-3.5 text-sm shadow-xl ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-800/80 text-slate-200 border border-slate-700/50 whitespace-pre-wrap leading-relaxed'
                }`}>
                  {msg.content}
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 border border-slate-600 shadow-md">
                    <UserIcon size={16} />
                  </div>
                )}
              </div>
            ))
          )}
          
          {loading && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
                <Bot size={16} />
              </div>
              <div className="bg-slate-800/80 rounded-2xl px-5 py-3.5 flex items-center gap-2 border border-slate-700/50 shadow-md">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-900/50 border-t border-slate-700/50 shrink-0">
          <form onSubmit={handleQuery} className="relative flex items-center max-w-4xl mx-auto">
            <Search size={18} className="absolute left-4 text-slate-400" />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="E.g., Which users are located in California?"
              className="w-full bg-slate-800/50 border border-slate-700 hover:border-slate-600 rounded-xl pl-12 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-100 placeholder-slate-500 shadow-inner"
              disabled={loading}
            />
            <button 
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:opacity-50 text-white rounded-lg transition-all shadow-[0_0_10px_rgba(79,70,229,0.3)]"
            >
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
