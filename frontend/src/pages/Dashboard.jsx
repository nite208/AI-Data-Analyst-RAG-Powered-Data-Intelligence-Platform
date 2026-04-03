import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';
import { LayoutDashboard, Database, LineChart, Settings, LogOut, User, Menu, X } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Database, label: 'Datasets', active: false },
    { icon: LineChart, label: 'Insights', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 glass-card border-r border-y-0 border-l-0 border-slate-700/50 
        flex flex-col z-30 transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">DataSage AI</h2>
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a 
                key={idx} 
                href="#" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  item.active 
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[inset_0_0_20px_rgba(79,70,229,0.1)]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:pl-5'
                }`}
              >
                <Icon size={20} /> {item.label}
              </a>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800/50 transition-all hover:pl-5">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Navbar */}
        <header className="h-20 glass-card rounded-none border-b border-x-0 border-t-0 border-slate-700/50 flex flex-row items-center justify-between md:justify-end px-4 md:px-8 z-10 w-full shrink-0">
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-700/50 rounded-full pl-3 pr-4 py-1.5 transition-colors hover:bg-slate-800/50 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-[0_0_10px_rgba(79,70,229,0.5)]">
              <User size={16} />
            </div>
            <span className="text-sm font-medium text-slate-300">User</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
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
              <button className="mt-6 px-6 py-2.5 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-lg transition-all font-medium border border-indigo-500/30 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                Connect Data
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
