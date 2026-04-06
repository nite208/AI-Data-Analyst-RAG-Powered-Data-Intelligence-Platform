import { useState } from 'react';
import { Search, ArrowRight, Bot, User as UserIcon, Lightbulb, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { queryDataset } from '../services/api';
import AutoChart from '../components/AutoChart';

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
      
      const botMessage = {
        role: 'bot',
        content: response.summary || "I couldn't find any relevant patterns.",
        insights: response.insights || [],
        recommendations: response.recommendations || [],
        rawData: response.raw_data || []
      };

      setMessages((prev) => [...prev, botMessage]);
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
                
                <div className={`max-w-[85%] rounded-2xl overflow-hidden shadow-xl ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-800/80 border border-slate-700/50'
                }`}>
                  <div className={`px-5 py-3.5 text-sm ${msg.role === 'bot' ? 'text-slate-200' : ''}`}>
                    {msg.content}
                  </div>
                  
                  {/* AI Extra Rendering Blocks */}
                  {msg.role === 'bot' && (
                    <div className="px-5 pb-5 w-full flex flex-col gap-5 border-t border-slate-700/30 pt-4 mt-2">
                      
                      {msg.insights && msg.insights.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                          {msg.insights.map((insight, idy) => (
                            <div key={idy} className="flex gap-2 items-start bg-slate-900/40 p-3 rounded-lg border border-slate-700/40">
                               <Lightbulb size={16} className="text-amber-400 mt-0.5 shrink-0" />
                               <span className="text-xs text-slate-300">{insight}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {msg.recommendations && msg.recommendations.length > 0 && (
                        <div className="bg-gradient-to-r from-indigo-900/30 to-blue-900/20 rounded-xl p-4 border border-indigo-500/20 shadow-inner">
                          <h4 className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                             <TrendingUp size={14} /> AI Advisor Recommendations
                          </h4>
                          <div className="space-y-2">
                            {msg.recommendations.map((rec, idy) => (
                              <div key={idy} className="flex gap-2 items-start text-sm text-slate-200">
                                {rec.includes('⚠️') ? (
                                  <AlertCircle size={15} className="text-rose-400 mt-0.5 shrink-0" />
                                ) : (
                                  <CheckCircle size={15} className="text-emerald-400 mt-0.5 shrink-0" />
                                )}
                                <span>{rec.replace('⚠️ ', '')}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {msg.rawData && msg.rawData.length > 0 && (
                         <AutoChart data={msg.rawData} />
                      )}
                    </div>
                  )}
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
              placeholder="E.g., What are the highest trends in our dataset?"
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
