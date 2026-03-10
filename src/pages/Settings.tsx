import React from 'react';
import { User, Shield, Globe, Bell, CreditCard, Zap, Github, Twitter } from 'lucide-react';
import { Card, CardHeader, CardContent, Button } from '@/components/ui/Base';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/utils/cn';

const SettingSection = ({ title, subtitle, children }: any) => (
  <div className="py-8 first:pt-0 last:pb-0 border-b last:border-0 border-zinc-100 dark:border-zinc-800">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
        <p className="text-sm text-zinc-500 mt-1">{subtitle}</p>
      </div>
      <div className="lg:col-span-8">
        {children}
      </div>
    </div>
  </div>
);

export const Settings = () => {
  const { user } = useAppStore();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Settings</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage your account, preferences, and integrations.</p>
      </div>

      <Card className="p-8">
        <SettingSection 
          title="Profile Information" 
          subtitle="Update your personal details and public profile."
        >
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-2xl bg-zinc-100" referrerPolicy="no-referrer" />
              <div className="flex gap-3">
                <Button variant="outline" size="sm">Change Avatar</Button>
                <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Full Name</label>
                <input type="text" defaultValue={user.name} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-zinc-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Email Address</label>
                <input type="email" defaultValue={user.email} className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-zinc-500" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Bio</label>
              <textarea placeholder="Tell us about yourself..." className="w-full h-24 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-500 resize-none" />
            </div>
          </div>
        </SettingSection>

        <SettingSection 
          title="Platform Integrations" 
          subtitle="Connect your social media accounts for auto-publishing."
        >
          <div className="space-y-4">
            {[
              { name: 'TikTok', icon: Zap, status: 'Connected', color: 'text-zinc-900' },
              { name: 'Instagram', icon: Globe, status: 'Connected', color: 'text-pink-500' },
              { name: 'YouTube', icon: Shield, status: 'Not Connected', color: 'text-red-500' },
            ].map((platform) => (
              <div key={platform.name} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className={cn("p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm", platform.color)}>
                    <platform.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{platform.name}</p>
                    <p className="text-xs text-zinc-500">{platform.status}</p>
                  </div>
                </div>
                <Button variant={platform.status === 'Connected' ? 'outline' : 'primary'} size="sm">
                  {platform.status === 'Connected' ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            ))}
          </div>
        </SettingSection>

        <SettingSection 
          title="Security" 
          subtitle="Manage your password and security preferences."
        >
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-between py-6">
              <span className="flex items-center gap-3"><Shield className="w-4 h-4" /> Change Password</span>
              <span className="text-xs text-zinc-400 font-normal italic">Last changed 3 months ago</span>
            </Button>
            <Button variant="outline" className="w-full justify-between py-6">
              <span className="flex items-center gap-3"><Bell className="w-4 h-4" /> Two-Factor Authentication</span>
              <span className="text-xs text-emerald-500 font-bold uppercase tracking-wider">Enabled</span>
            </Button>
          </div>
        </SettingSection>

        <div className="pt-8 flex justify-end gap-4">
          <Button variant="ghost">Discard Changes</Button>
          <Button variant="primary" className="px-8">Save Settings</Button>
        </div>
      </Card>
    </div>
  );
};
