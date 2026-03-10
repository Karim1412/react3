import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { TrendingUp, Users, Play, Calendar as CalendarIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardHeader, CardContent, Badge } from '@/components/ui/Base';
import { motion } from 'motion/react';
import { cn } from '@/utils/cn';

const data = [
  { name: 'Mon', reach: 4000, engagement: 2400 },
  { name: 'Tue', reach: 3000, engagement: 1398 },
  { name: 'Wed', reach: 2000, engagement: 9800 },
  { name: 'Thu', reach: 2780, engagement: 3908 },
  { name: 'Fri', reach: 1890, engagement: 4800 },
  { name: 'Sat', reach: 2390, engagement: 3800 },
  { name: 'Sun', reach: 3490, engagement: 4300 },
];

const platformData = [
  { name: 'TikTok', value: 45, color: '#000000' },
  { name: 'Instagram', value: 30, color: '#E1306C' },
  { name: 'YouTube', value: 15, color: '#FF0000' },
  { name: 'X', value: 10, color: '#1DA1F2' },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          <Icon className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
          trend === 'up' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        )}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trendValue}%
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">{value}</h3>
      </div>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Dashboard Overview</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Welcome back, Karim. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Badge variant="info">Live Updates</Badge>
          <span className="text-xs text-zinc-400">Last updated: 2 mins ago</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Published" value="1,284" icon={Play} trend="up" trendValue="12.5" />
        <StatCard title="Total Reach" value="2.4M" icon={TrendingUp} trend="up" trendValue="8.2" />
        <StatCard title="Engagement Rate" value="4.8%" icon={Users} trend="down" trendValue="1.4" />
        <StatCard title="Scheduled Posts" value="42" icon={CalendarIcon} trend="up" trendValue="24.0" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader title="Performance Growth" subtitle="Reach and engagement metrics over the last 7 days" />
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="reach" stroke="#18181b" strokeWidth={2} fillOpacity={1} fill="url(#colorReach)" />
                <Area type="monotone" dataKey="engagement" stroke="#71717a" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Platform Distribution" subtitle="Where your content is performing best" />
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} width={80} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-3">
              {platformData.map((p) => (
                <div key={p.name} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-zinc-600 dark:text-zinc-400">{p.name}</span>
                  </div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">{p.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Recent Submissions" subtitle="Latest funny videos from the community" />
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800">
                  <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden relative group cursor-pointer">
                    <img src={`https://picsum.photos/seed/video${i}/200/200`} alt="Video" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Cat vs Laser Pointer Part {i}</p>
                    <p className="text-xs text-zinc-500 mt-1">Submitted by @funny_creator{i}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="success">98% Score</Badge>
                    <p className="text-[10px] text-zinc-400 mt-2">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Upcoming Content" subtitle="Scheduled posts for the next 24 hours" />
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 border-l-2 border-zinc-900 dark:border-zinc-100 bg-zinc-50/50 dark:bg-zinc-900/30">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Viral AI Prank Compilation</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="info">TikTok</Badge>
                      <Badge variant="info">Instagram</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">18:30</p>
                    <p className="text-xs text-zinc-500 mt-1">Today</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};
