import React from 'react';
import { Bell, Check, Info, AlertTriangle, XCircle, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardContent, Button, Badge } from '@/components/ui/Base';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'motion/react';

export const Notifications = () => {
  const { notifications, markAsRead } = useAppStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="w-5 h-5 text-emerald-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Notifications</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Stay updated with your content performance and system alerts.</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Trash2 className="w-4 h-4" /> Clear All
        </Button>
      </div>

      <Card>
        <CardHeader 
          title="Recent Activity" 
          subtitle={`You have ${notifications.filter(n => !n.read).length} unread notifications`} 
        />
        <CardContent className="p-0">
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            <AnimatePresence mode="popLayout">
              {notifications.map((n) => (
                <motion.div 
                  key={n.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "p-6 flex gap-4 transition-colors group",
                    !n.read ? "bg-zinc-50/50 dark:bg-zinc-900/30" : "hover:bg-zinc-50 dark:hover:bg-zinc-900/10"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    !n.read ? "bg-white dark:bg-zinc-800 shadow-sm" : "bg-zinc-100 dark:bg-zinc-900"
                  )}>
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className={cn(
                        "text-sm font-semibold",
                        !n.read ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"
                      )}>
                        {n.title}
                      </h4>
                      <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                        {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
                      {n.message}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      {!n.read && (
                        <button 
                          onClick={() => markAsRead(n.id)}
                          className="text-xs font-bold text-zinc-900 dark:text-zinc-100 hover:underline"
                        >
                          Mark as read
                        </button>
                      )}
                      <button className="text-xs font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity">
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <h4 className="text-white font-bold">Notification Settings</h4>
                <p className="text-zinc-400 text-xs mt-1">Configure how you want to be notified.</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-white font-bold">Digest Emails</h4>
                <p className="text-zinc-400 text-xs mt-1">Receive weekly performance summaries.</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
