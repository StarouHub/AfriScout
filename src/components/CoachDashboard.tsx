import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, FileText, Users, Activity, Shield, Plus, ChevronRight, Clock, Star } from 'lucide-react';
import { CLUBS } from '../constants';

interface CoachDashboardProps {
  onNewBattleReport?: () => void;
}

export const CoachDashboard: React.FC<CoachDashboardProps> = ({ onNewBattleReport }) => {
  const savedReports = [
    { id: 'r1', title: 'Al Ahly vs Zamalek', date: '2 hours ago', type: 'Battle Report', status: 'Ready' },
    { id: 'r2', title: 'Espérance Tactical Analysis', date: 'Yesterday', type: 'Club Deep-Dive', status: 'Ready' },
    { id: 'r3', title: 'TP Mazembe Set Piece Routine', date: '2 days ago', type: 'Tactical Note', status: 'Draft' },
  ];

  const watchlist = [
    { id: 'p1', name: 'Zizo', club: 'Zamalek SC', form: 9.0, trend: 'up' },
    { id: 'p2', name: 'Emam Ashour', club: 'Al Ahly SC', form: 9.2, trend: 'up' },
    { id: 'p3', name: 'Yousri Bouzok', club: 'Raja Casablanca', form: 9.1, trend: 'stable' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <header className="flex items-end justify-between">
        <div>
          <h2 className="text-xs font-mono text-brand-amber uppercase tracking-widest mb-2">Institutional Access</h2>
          <h1 className="text-5xl font-black uppercase tracking-tighter font-display">Coach Dashboard</h1>
        </div>
        <button 
          onClick={onNewBattleReport}
          className="bg-brand-green text-black px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-white transition-colors"
        >
          <Plus className="w-4 h-4" /> NEW BATTLE REPORT
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Reports & Notes */}
        <div className="lg:col-span-2 space-y-8">
          <section className="glass rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <FileText className="text-brand-amber" /> Saved Reports
              </h3>
              <button className="text-xs font-mono text-white/40 hover:text-white transition-colors">VIEW ALL</button>
            </div>
            
            <div className="space-y-4">
              {savedReports.map((report) => (
                <div key={report.id} className="group flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-green/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-surface rounded-xl flex items-center justify-center border border-white/10">
                      <FileText className="w-5 h-5 text-white/20 group-hover:text-brand-green transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{report.title}</h4>
                      <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{report.type} • {report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${report.status === 'Ready' ? 'bg-brand-green/20 text-brand-green' : 'bg-white/10 text-white/40'}`}>
                      {report.status.toUpperCase()}
                    </span>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Activity className="text-brand-green" /> Team Comparison
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-brand-amber" />
                    <span className="text-sm font-bold">Al Ahly</span>
                  </div>
                  <span className="text-xs font-mono text-white/40 italic">VS</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">Sundowns</span>
                    <Shield className="w-5 h-5 text-brand-green" />
                  </div>
                </div>
                <button className="w-full py-3 border border-white/10 rounded-xl text-xs font-mono text-white/40 hover:text-white hover:border-white/30 transition-all">
                  GENERATE COMPARISON RADAR
                </button>
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Clock className="text-brand-amber" /> Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1 h-10 bg-brand-green rounded-full" />
                  <div>
                    <p className="text-xs font-bold">Updated Al Ahly Squad Data</p>
                    <p className="text-[10px] text-white/40">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1 h-10 bg-brand-amber rounded-full" />
                  <div>
                    <p className="text-xs font-bold">New CAF Fixtures Synced</p>
                    <p className="text-[10px] text-white/40">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Player Watchlist */}
        <div className="space-y-8">
          <section className="glass rounded-3xl p-8 sticky top-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Star className="text-brand-amber" /> Player Watchlist
              </h3>
              <button className="text-xs font-mono text-white/40 hover:text-white transition-colors">MANAGE</button>
            </div>
            
            <div className="space-y-6">
              {watchlist.map((player) => (
                <div key={player.id} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-brand-amber/50 transition-colors">
                      <Users className="w-5 h-5 text-white/20 group-hover:text-brand-amber transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm group-hover:text-brand-amber transition-colors">{player.name}</h4>
                      <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{player.club}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-brand-green">{player.form}</p>
                    <p className={`text-[10px] font-mono ${player.trend === 'up' ? 'text-brand-green' : 'text-white/40'}`}>
                      {player.trend === 'up' ? '↑ TRENDING' : '• STABLE'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-brand-amber/5 border border-brand-amber/20 rounded-2xl">
              <p className="text-[10px] font-mono text-brand-amber uppercase mb-2">Scout Alert</p>
              <p className="text-xs text-white/70 leading-relaxed">
                "Zizo's market value has increased by 15% following his performance in the CAF CL group stage."
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
