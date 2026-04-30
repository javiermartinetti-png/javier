import React from 'react';
import { cn } from '../lib/utils';
import { 
  LayoutDashboard, 
  BarChart3, 
  TrendingUp, 
  Wallet, 
  Bed, 
  Users, 
  PlusCircle 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'basic', label: 'Indicadores Básicos', icon: BarChart3 },
    { id: 'trends', label: 'Tendencias', icon: TrendingUp },
    { id: 'financial', label: 'Financiero', icon: Wallet },
    { id: 'occupational', label: 'Ocupacional', icon: Bed },
    { id: 'hr', label: 'Recursos Humanos', icon: Users },
    { id: 'entry', label: 'Carga de Datos', icon: PlusCircle },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 z-20 transition-all duration-300">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
          O
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">Orbital</h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              id={`nav-${item.id}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                isActive 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon size={20} className={cn(
                "transition-transform duration-200",
                isActive ? "scale-110" : "group-hover:scale-110"
              )} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-200 rounded-l-full" />
              )}
            </button>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-slate-800 text-xs text-slate-500">
        <p>© 2026 Orbital Hotel Management</p>
        <p className="mt-1 font-mono">v1.2.0-stable</p>
      </div>
    </div>
  );
};

export default Sidebar;
