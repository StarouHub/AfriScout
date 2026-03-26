import React from 'react';
import { motion } from 'motion/react';
import { User, Bell, Shield, Globe, Database, Mail, Smartphone } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const sections = [
    {
      title: 'Account & Profile',
      icon: User,
      items: [
        { label: 'Profile Information', description: 'Update your name, email, and avatar', action: 'Edit' },
        { label: 'Subscription Tier', description: 'Current: Club Tier (B2B)', action: 'Upgrade' },
      ]
    },
    {
      title: 'Intelligence Preferences',
      icon: Globe,
      items: [
        { label: 'Primary Regions', description: 'North Africa, West Africa', action: 'Manage' },
        { label: 'Data Refresh Rate', description: 'Real-time (Live)', action: 'Change' },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Push Notifications', description: 'Live match alerts and breaking news', toggle: true },
        { label: 'Email Reports', description: 'Weekly tactical intelligence summary', toggle: true },
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { label: 'Two-Factor Authentication', description: 'Add an extra layer of security', action: 'Enable' },
        { label: 'API Access Keys', description: 'Manage your integration keys', action: 'View' },
      ]
    }
  ];

  return (
    <div className="space-y-12 pb-20 max-w-4xl">
      <header>
        <h2 className="text-xs font-mono text-brand-amber uppercase tracking-widest mb-2">System Configuration</h2>
        <h1 className="text-5xl font-black uppercase tracking-tighter">Settings</h1>
      </header>

      <div className="space-y-8">
        {sections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-brand-amber/10 rounded-xl flex items-center justify-center">
                <section.icon className="w-5 h-5 text-brand-amber" />
              </div>
              <h3 className="text-xl font-bold">{section.title}</h3>
            </div>

            <div className="space-y-6">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                  <div>
                    <p className="font-bold">{item.label}</p>
                    <p className="text-sm text-white/40">{item.description}</p>
                  </div>
                  {item.action ? (
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold transition-colors">
                      {item.action}
                    </button>
                  ) : (
                    <div className="w-12 h-6 bg-brand-green rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
