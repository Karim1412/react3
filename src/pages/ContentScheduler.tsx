import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Instagram, 
  Youtube, 
  Twitter, 
  Facebook,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { Card, CardHeader, CardContent, Button, Badge } from '@/components/ui/Base';
import { cn } from '@/utils/cn';
import { motion } from 'motion/react';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const scheduledPosts = [
  { id: '1', title: 'Funny Cat Compilation', time: '10:00 AM', platforms: ['tiktok', 'instagram'], day: 15 },
  { id: '2', title: 'AI Prank Video', time: '02:30 PM', platforms: ['youtube'], day: 15 },
  { id: '3', title: 'User Submission #42', time: '06:00 PM', platforms: ['tiktok', 'twitter'], day: 18 },
  { id: '4', title: 'Weekend Special', time: '09:00 AM', platforms: ['facebook', 'instagram'], day: 22 },
];

export const ContentScheduler = () => {
  const [currentMonth, setCurrentMonth] = useState(2); // March
  const [selectedDay, setSelectedDay] = useState(15);

  const platformIcons: Record<string, any> = {
    tiktok: <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center text-[8px] text-white font-bold">T</div>,
    instagram: <Instagram className="w-4 h-4 text-pink-500" />,
    youtube: <Youtube className="w-4 h-4 text-red-500" />,
    twitter: <Twitter className="w-4 h-4 text-blue-400" />,
    facebook: <Facebook className="w-4 h-4 text-blue-600" />,
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Content Scheduler</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Plan and automate your viral content across all platforms.</p>
        </div>
        <Button variant="primary" className="gap-2">
          <Plus className="w-4 h-4" /> Schedule New Post
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-8">
          <Card>
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-lg font-bold">{months[currentMonth]} 2026</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><ChevronLeft className="w-4 h-4" /></Button>
                <Button variant="outline" size="sm"><ChevronRight className="w-4 h-4" /></Button>
              </div>
            </div>
            <CardContent className="p-0">
              <div className="grid grid-cols-7 border-b border-zinc-100 dark:border-zinc-800">
                {days.map(day => (
                  <div key={day} className="py-3 text-center text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {Array.from({ length: 31 }).map((_, i) => {
                  const day = i + 1;
                  const hasPosts = scheduledPosts.some(p => p.day === day);
                  const isSelected = selectedDay === day;

                  return (
                    <div 
                      key={day} 
                      onClick={() => setSelectedDay(day)}
                      className={cn(
                        "h-32 border-r border-b border-zinc-100 dark:border-zinc-800 p-2 transition-colors cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
                        isSelected && "bg-zinc-50 dark:bg-zinc-900/80 ring-2 ring-inset ring-zinc-900 dark:ring-zinc-100 z-10"
                      )}
                    >
                      <span className={cn(
                        "text-sm font-medium",
                        isSelected ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500"
                      )}>
                        {day}
                      </span>
                      {hasPosts && (
                        <div className="mt-2 space-y-1">
                          {scheduledPosts.filter(p => p.day === day).map(p => (
                            <div key={p.id} className="text-[10px] bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-1.5 py-0.5 rounded truncate font-medium">
                              {p.time} - {p.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Details */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader 
              title={`Schedule for March ${selectedDay}`} 
              subtitle={`${scheduledPosts.filter(p => p.day === selectedDay).length} posts planned`} 
            />
            <CardContent className="space-y-4">
              {scheduledPosts.filter(p => p.day === selectedDay).length > 0 ? (
                scheduledPosts.filter(p => p.day === selectedDay).map(post => (
                  <div key={post.id} className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800 group">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{post.time}</span>
                      </div>
                      <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="text-sm font-semibold mt-2">{post.title}</h4>
                    <div className="flex items-center gap-2 mt-3">
                      {post.platforms.map(p => (
                        <div key={p} className="p-1.5 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-100 dark:border-zinc-700">
                          {platformIcons[p]}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon className="w-6 h-6 text-zinc-400" />
                  </div>
                  <p className="text-sm text-zinc-500">No posts scheduled for this day.</p>
                  <Button variant="outline" size="sm" className="mt-4">Schedule Now</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-emerald-900 dark:text-emerald-400">Auto-Optimization Active</h4>
              </div>
              <p className="text-xs text-emerald-700 dark:text-emerald-500/80 mt-2 leading-relaxed">
                ViraFlow AI is automatically adjusting your post times based on peak engagement windows for your audience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
