import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Globe, Trophy, LayoutDashboard, FileText, Bell, Settings, Menu, X, Activity, Shield } from 'lucide-react';
import { AfricaMap } from './components/AfricaMap';
import { ClubCard } from './components/ClubCard';
import { ClubDetail } from './components/ClubDetail';
import { TournamentTracker } from './components/TournamentTracker';
import { CoachDashboard } from './components/CoachDashboard';
import { BattleReport } from './components/BattleReport';
import { SettingsView } from './components/SettingsView';
import { NotificationsDropdown } from './components/NotificationsDropdown';
import { COUNTRIES, CLUBS } from './constants';
import { Club } from './types';

type View = 'home' | 'hub' | 'club' | 'battle' | 'tracker' | 'dashboard' | 'settings';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleCountryClick = (countryId: string) => {
    setSelectedCountry(countryId);
    setCurrentView('hub');
  };

  const handleClubClick = (club: Club) => {
    setSelectedClub(club);
    setCurrentView('club');
  };

  const activeCountries = COUNTRIES.map(c => c.id);

  const navItems = [
    { id: 'home', label: 'Interactive Map', icon: Globe },
    { id: 'hub', label: 'Teams', icon: Trophy },
    { id: 'battle', label: 'Battle Report', icon: FileText },
    { id: 'tracker', label: 'Tournament Tracker', icon: Activity },
    { id: 'dashboard', label: 'Coach Dashboard', icon: LayoutDashboard },
  ];

  return (
    <div className="flex min-h-screen bg-brand-dark overflow-hidden">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-brand-surface border-r border-white/5 transition-all duration-300 flex flex-col z-50`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-green rounded flex items-center justify-center">
            <Globe className="text-black w-5 h-5" />
          </div>
          {isSidebarOpen && <span className="text-xl font-black tracking-tighter">AFRISCOUT</span>}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-colors ${
                currentView === item.id ? 'bg-brand-amber text-black' : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button 
            onClick={() => setCurrentView('settings')}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-colors ${
              currentView === 'settings' ? 'bg-brand-amber text-black' : 'text-white/50 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Settings className="w-5 h-5" />
            {isSidebarOpen && <span className="font-medium">Settings</span>}
          </button>
          <div className="p-3 glass rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-amber/20 flex items-center justify-center text-brand-amber font-bold text-xs">ST</div>
              {isSidebarOpen && (
                <div>
                  <p className="text-xs font-bold">Starou</p>
                  <p className="text-[10px] text-white/40">Club Tier</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-brand-dark/50 backdrop-blur-xl z-40">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="Search clubs, players, or countries..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-green/50 transition-colors"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6 relative">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-green">
              <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
              LIVE MATCHES: 4
            </div>
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 text-white/50 hover:text-white"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-amber rounded-full border-2 border-brand-dark" />
            </button>
            <NotificationsDropdown isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            {currentView === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="max-w-4xl">
                  <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 leading-none font-display">
                    Data as a <span className="text-brand-amber">Weapon</span>, <br /> Not Decoration.
                  </h1>
                  <p className="text-xl text-white/50 max-w-2xl">
                    The ultimate intelligence platform for African football. Deep scouting, tactical analysis, and real-time CAF competition tracking.
                  </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
                  <AfricaMap onCountryClick={handleCountryClick} activeCountries={activeCountries} />
                  
                  <div className="space-y-8">
                    <div className="glass p-8 rounded-3xl border-l-4 border-l-brand-green">
                      <h3 className="text-xs font-mono text-brand-green uppercase tracking-widest mb-4">Spotlight: Club of the Week</h3>
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden">
                          <Shield className="w-10 h-10 text-brand-amber" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold">Al Ahly SC</h4>
                          <p className="text-white/50 text-sm mb-4">11× CAF Champions League Winners</p>
                          <button 
                            onClick={() => handleClubClick(CLUBS['al-ahly'])}
                            className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-green transition-colors"
                          >
                            View Deep-Dive
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="glass p-6 rounded-2xl">
                        <p className="text-[10px] font-mono text-white/40 uppercase mb-2">Upcoming Fixture</p>
                        <p className="text-sm font-bold">Espérance vs Al Ahly</p>
                        <p className="text-xs text-brand-amber font-mono mt-1">22:00 UTC • SEMI-FINALS</p>
                      </div>
                      <div className="glass p-6 rounded-2xl">
                        <p className="text-[10px] font-mono text-white/40 uppercase mb-2">Trending Player</p>
                        <p className="text-sm font-bold">Emam Ashour</p>
                        <p className="text-xs text-brand-green font-mono mt-1">FORM: 9.2 • CM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentView === 'hub' && (
              <motion.div
                key="hub"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <header className="flex items-end justify-between">
                  <div>
                    <h2 className="text-xs font-mono text-brand-amber uppercase tracking-widest mb-2">Teams Hub</h2>
                    <h1 className="text-5xl font-black uppercase tracking-tighter">
                      {selectedCountry ? COUNTRIES.find(c => c.id === selectedCountry)?.name : 'All Teams'}
                    </h1>
                  </div>
                  <div className="text-right max-w-md">
                    <p className="text-sm text-white/50 italic">
                      {selectedCountry ? COUNTRIES.find(c => c.id === selectedCountry)?.performanceSummary : 'Select a country from the map to view detailed team intelligence.'}
                    </p>
                  </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {selectedCountry ? (
                    COUNTRIES.find(c => c.id === selectedCountry)?.clubs.map(clubId => (
                      <ClubCard 
                        key={clubId} 
                        club={CLUBS[clubId] || { name: clubId, country: selectedCountry } as any} 
                        onClick={() => handleClubClick(CLUBS[clubId])}
                      />
                    ))
                  ) : (
                    Object.values(CLUBS).map(club => (
                      <ClubCard 
                        key={club.id} 
                        club={club} 
                        onClick={() => handleClubClick(club)}
                      />
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {currentView === 'club' && selectedClub && (
              <motion.div
                key="club"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
              >
                <ClubDetail club={selectedClub} onBack={() => setCurrentView('hub')} />
              </motion.div>
            )}

            {currentView === 'tracker' && (
              <motion.div
                key="tracker"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <TournamentTracker />
              </motion.div>
            )}

            {currentView === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <CoachDashboard onNewBattleReport={() => setCurrentView('battle')} />
              </motion.div>
            )}
            
            {currentView === 'battle' && (
              <motion.div
                key="battle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <BattleReport />
              </motion.div>
            )}

            {currentView === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <SettingsView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
