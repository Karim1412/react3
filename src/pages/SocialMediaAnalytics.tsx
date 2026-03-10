import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { 
  Instagram, Youtube, Twitter, Facebook, TrendingUp, 
  Users, MessageCircle, Share2, Eye, Heart, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { Card, CardHeader, CardContent, Button, Badge } from '@/components/ui/Base';
import { cn } from '@/utils/cn';
import { motion } from 'motion/react';

const performanceData = [
  { name: 'Jan', views: 4000, engagement: 2400, growth: 2400 },
  { name: 'Feb', views: 3000, engagement: 1398, growth: 2210 },
  { name: 'Mar', views: 2000, engagement: 9800, growth: 2290 },
  { name: 'Apr', views: 2780, engagement: 3908, growth: 2000 },
  { name: 'May', views: 1890, engagement: 4800, growth: 2181 },
  { name: 'Jun', views: 2390, engagement: 3800, growth: 2500 },
];

const platformStats = [
  { name: 'TikTok', views: '1.2M', engagement: '5.2%', followers: '+12k', color: '#000000' },
  { name: 'Instagram', views: '850k', engagement: '4.8%', followers: '+8k', color: '#E1306C' },
  { name: 'YouTube', views: '420k', engagement: '6.1%', followers: '+3k', color: '#FF0000' },
  { name: 'X', views: '120k', engagement: '2.4%', followers: '+1k', color: '#1DA1F2' },
];

const MetricCard = ({ title, value, change, icon: Icon, color }: any) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div className={cn("p-2 rounded-lg bg-opacity-10", color)}>
          <Icon className={cn("w-5 h-5", color.replace('bg-', 'text-'))} />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
          change.startsWith('+') ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        )}>
          {change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">{value}</h3>
      </div>
    </CardContent>
  </Card>
);

export const SocialMediaAnalytics = () => {
  const [activePlatform, setActivePlatform] = useState('All');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Social Analytics</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Deep dive into your content performance across all platforms.</p>
        </div>
        <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl">
          {['All', 'TikTok', 'Instagram', 'YouTube'].map(p => (
            <button 
              key={p}
              onClick={() => setActivePlatform(p)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                activePlatform === p 
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm" 
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Views" value="2.59M" change="+14.2%" icon={Eye} color="bg-blue-500" />
        <MetricCard title="Total Likes" value="482k" change="+8.4%" icon={Heart} color="bg-pink-500" />
        <MetricCard title="Total Shares" value="92.4k" change="+22.1%" icon={Share2} color="bg-emerald-500" />
        <MetricCard title="Comments" value="12.8k" change="-2.4%" icon={MessageCircle} color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8">
          <CardHeader title="Engagement Trends" subtitle="Daily engagement rate across selected platforms" />
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18181b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#18181b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e4e4e7', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="engagement" stroke="#18181b" strokeWidth={2} fillOpacity={1} fill="url(#colorEng)" />
                <Area type="monotone" dataKey="views" stroke="#71717a" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader title="Platform Breakdown" subtitle="Follower growth by platform" />
          <CardContent>
            <div className="space-y-6">
              {platformStats.map((p) => (
                <div key={p.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="text-sm font-semibold">{p.name}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">{p.followers}</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: p.name === 'TikTok' ? '85%' : p.name === 'Instagram' ? '65%' : '40%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full"
                      style={{ backgroundColor: p.color }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
                    <span>{p.views} Views</span>
                    <span>{p.engagement} Eng.</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                <span className="text-sm font-semibold">Growth Prediction</span>
              </div>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                Based on current trends, you are on track to hit <span className="text-zinc-900 dark:text-zinc-100 font-bold">5M total reach</span> by the end of next month.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader title="Top Performing Content" subtitle="Videos with highest engagement" />
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <img src={`https://picsum.photos/seed/top${i}/100/100`} alt="Top" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">Epic Fail Compilation Vol. {i}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">TikTok • 2.4M views</p>
                  </div>
                  <Badge variant="success">+{i * 5}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader title="Audience Demographics" subtitle="Age and gender distribution" />
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: '13-17', val: 45 },
                { name: '18-24', val: 82 },
                { name: '25-34', val: 64 },
                { name: '35-44', val: 32 },
                { name: '45+', val: 12 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="val" fill="#18181b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Best Time to Post" subtitle="Engagement by hour of day" />
          <CardContent className="h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { h: '00', v: 10 }, { h: '04', v: 5 }, { h: '08', v: 45 }, 
                { h: '12', v: 65 }, { h: '16', v: 85 }, { h: '20', v: 95 }, { h: '23', v: 30 }
              ]}>
                <XAxis dataKey="h" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke="#18181b" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <Badge variant="info">Peak: 20:00 - 21:00</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
