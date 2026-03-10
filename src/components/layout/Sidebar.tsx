import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Video, 
  Sparkles, 
  Calendar, 
  Bell, 
  Settings,
  PlayCircle,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/utils/cn';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Video, label: 'Marketplace', path: '/marketplace' },
  { icon: Sparkles, label: 'AI Studio', path: '/studio' },
  { icon: Calendar, label: 'Scheduler', path: '/scheduler' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 h-screen border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-100 rounded-lg flex items-center justify-center">
          <PlayCircle className="w-5 h-5 text-white dark:text-zinc-900" />
        </div>
        <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">ViraFlow</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
              isActive 
                ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100" 
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
            )}
          >
            <item.icon className="w-4 h-4" />
            <span className="flex-1">{item.label}</span>
            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Storage</p>
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-zinc-900 dark:bg-zinc-100 h-full w-[65%]" />
          </div>
          <p className="text-[10px] text-zinc-500 mt-2">6.5 GB of 10 GB used</p>
        </div>
      </div>
    </aside>
  );
};
