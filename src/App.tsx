import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { Dashboard } from './pages/Dashboard';
import { SocialMediaAnalytics } from './pages/SocialMediaAnalytics';
import { VideoMarketplace } from './pages/VideoMarketplace';
import { AIVideoStudio } from './pages/AIVideoStudio';
import { ContentScheduler } from './pages/ContentScheduler';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { useAppStore } from './store/useAppStore';
import { cn } from './utils/cn';

export default function App() {
  const { theme } = useAppStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className={cn(
        "min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300",
        theme === 'dark' ? 'dark' : ''
      )}>
        <Sidebar />
        <div className="ml-64 flex flex-col min-h-screen">
          <Topbar />
          <main className="flex-1 p-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<SocialMediaAnalytics />} />
              <Route path="/marketplace" element={<VideoMarketplace />} />
              <Route path="/studio" element={<AIVideoStudio />} />
              <Route path="/scheduler" element={<ContentScheduler />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <footer className="p-8 border-t border-zinc-200 dark:border-zinc-800 text-center">
            <p className="text-xs text-zinc-500">
              &copy; 2026 ViraFlow SaaS. All rights reserved. Built for viral content creators.
            </p>
          </footer>
        </div>
      </div>
    </Router>
  );
}
