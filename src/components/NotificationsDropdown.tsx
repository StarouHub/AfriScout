import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Activity, Shield, Trophy, X } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'match' | 'scout' | 'transfer' | 'system';
  isRead: boolean;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'LIVE: Espérance vs Al Ahly',
    message: 'Match started. Semi-Finals 1st Leg.',
    time: '2m ago',
    type: 'match',
    isRead: false
  },
  {
    id: '2',
    title: 'New Scout Report',
    message: 'Deep-dive on Emam Ashour (Al Ahly) is now available.',
    time: '1h ago',
    type: 'scout',
    isRead: false
  },
  {
    id: '3',
    title: 'Transfer Alert',
    message: 'Mamelodi Sundowns linked with new striker from Brazil.',
    time: '4h ago',
    type: 'transfer',
    isRead: true
  },
  {
    id: '4',
    title: 'System Update',
    message: 'CAF Champions League Group Stage data updated.',
    time: '1d ago',
    type: 'system',
    isRead: true
  }
];

export const NotificationsDropdown: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-16 right-0 w-96 bg-brand-surface border border-white/10 rounded-3xl shadow-2xl z-[70] overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Bell className="w-5 h-5 text-brand-amber" /> Notifications
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-4 h-4 text-white/40" />
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {NOTIFICATIONS.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`p-6 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer relative ${!notif.isRead ? 'bg-brand-amber/5' : ''}`}
                >
                  {!notif.isRead && (
                    <div className="absolute top-6 right-6 w-2 h-2 bg-brand-amber rounded-full" />
                  )}
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      notif.type === 'match' ? 'bg-brand-green/20 text-brand-green' :
                      notif.type === 'scout' ? 'bg-brand-amber/20 text-brand-amber' :
                      'bg-white/10 text-white/50'
                    }`}>
                      {notif.type === 'match' ? <Activity className="w-5 h-5" /> :
                       notif.type === 'scout' ? <Shield className="w-5 h-5" /> :
                       <Trophy className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{notif.title}</p>
                      <p className="text-xs text-white/50 mt-1">{notif.message}</p>
                      <p className="text-[10px] font-mono text-white/30 uppercase mt-2">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white/5 text-center">
              <button className="text-xs font-bold text-brand-amber hover:text-white transition-colors uppercase tracking-widest">
                View All Notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
