import { Link } from 'react-router-dom';
import { Database, Sparkles, ChevronRight, BarChart3, Zap } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-slate-900">
      {/* Background gradients */}
      <div className="absolute top-0 left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-[20%] w-[50%] h-[50%] rounded-full bg-cyan-600/20 blur-[150px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto text-center z-10 w-full flex flex-col items-center py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-indigo-300 mb-8 border border-indigo-500/20 animate-fade-in-up">
          <Sparkles size={16} className="animate-pulse" />
          <span>Introducing DataSage AI 1.0</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
          Talk to your data <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-300% animate-gradient">
            using AI
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Stop writing complex SQL queries. Just ask questions in plain English and instantly unlock deep insights, visualizations, and answers from your datasets.
        </p>

        <Link to="/login" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] hover:-translate-y-1 flex items-center gap-2 group">
          Get Started <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Feature mock */}
        <div className="mt-20 w-full glass-card rounded-2xl p-5 max-w-4xl mx-auto hidden md:block transition-all duration-500 hover:shadow-[0_0_50px_rgba(79,70,229,0.15)] hover:border-indigo-500/30 group">
          <div className="flex items-center justify-between border-b border-slate-700/50 pb-4 mb-5 text-slate-400">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-700 group-hover:bg-red-400/80 transition-colors"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-slate-700 group-hover:bg-yellow-400/80 transition-colors delay-75"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-slate-700 group-hover:bg-green-400/80 transition-colors delay-150"></div>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-full text-xs font-medium font-mono text-slate-300">
              <Database size={14} className="text-indigo-400" /> production_db
            </div>
          </div>
          <div className="text-left font-mono text-[15px] space-y-4">
            <div className="flex gap-3 items-start">
              <span className="text-indigo-400 mt-1">❯</span>
              <span className="text-slate-200">Show me the revenue trends for Q3 compared to Q2...</span>
            </div>
            <div className="flex gap-3 items-start opacity-70">
              <Zap size={16} className="text-yellow-400 mt-1" />
              <span className="text-slate-400 animate-pulse">Analyzing schema and generating optimized query...</span>
            </div>
            <div className="flex gap-3 items-start">
              <BarChart3 size={16} className="text-green-400 mt-1 shrink-0" />
              <div>
                <span className="text-green-400 text-xs px-2 py-1 bg-green-400/10 rounded font-bold uppercase tracking-wider">Success</span> 
                <span className="text-slate-300 ml-3">Q3 revenue increased by 24.5%. Main drivers: Enterprise Sales and Asian Markets.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
