import { Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Overview</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 rounded-2xl h-36 flex flex-col justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] group hover:border-indigo-500/30">
          <span className="text-slate-400 text-sm font-medium group-hover:text-indigo-300 transition-colors">Active Datasets</span>
          <span className="text-4xl font-bold mt-2 text-white">0</span>
        </div>
        <div className="glass-card p-6 rounded-2xl h-36 flex flex-col justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group hover:border-cyan-500/30">
          <span className="text-slate-400 text-sm font-medium group-hover:text-cyan-300 transition-colors">Queries Run</span>
          <span className="text-4xl font-bold mt-2 text-white">0</span>
        </div>
        <div className="glass-card p-6 rounded-2xl h-36 flex flex-col justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] group hover:border-emerald-500/30">
          <span className="text-slate-400 text-sm font-medium group-hover:text-emerald-300 transition-colors">Actionable Insights</span>
          <span className="text-4xl font-bold mt-2 text-white">0</span>
        </div>
      </div>

      <div className="glass-card rounded-2xl h-[400px] flex items-center justify-center border border-dashed border-slate-700/70 bg-slate-800/10 transition-colors hover:bg-slate-800/30">
        <div className="text-center">
          <Database size={48} className="mx-auto text-slate-600 mb-4" />
          <h3 className="text-lg font-medium text-slate-300 mb-1">No data connected</h3>
          <p className="text-slate-500 max-w-sm mx-auto">Upload a dataset or connect to your database to start generating insights instantly.</p>
          <button onClick={() => navigate('/dashboard/datasets')} className="mt-6 px-6 py-2.5 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-lg transition-all font-medium border border-indigo-500/30 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
            Connect Data
          </button>
        </div>
      </div>
    </>
  );
}
