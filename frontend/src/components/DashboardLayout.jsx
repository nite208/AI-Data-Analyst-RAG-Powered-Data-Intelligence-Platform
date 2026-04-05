import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { logout } from '../services/auth';
import { LayoutDashboard, Database, LineChart, Settings, LogOut, User, Menu, X } from 'lucide-react';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Database, label: 'Datasets', path: '/dashboard/datasets' },
    { icon: LineChart, label: 'Insights', path: '#' },
    { icon: Settings, label: 'Settings', path: '#' },
  ];

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden relative">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

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
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <button 
                key={idx} 
                onClick={() => { if (item.path !== '#') { navigate(item.path); setSidebarOpen(false); } }} 
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[inset_0_0_20px_rgba(79,70,229,0.1)]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:pl-5'
                }`}
              >
                <Icon size={20} /> {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800/50 transition-all hover:pl-5">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
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

        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
