import React from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Activity, Target, Map, Info, ChevronLeft, Zap } from 'lucide-react';
import { Club } from '../types';
import { TacticalPitch } from './TacticalPitch';

interface ClubDetailProps {
  club: Club;
  onBack: () => void;
}

export const ClubDetail: React.FC<ClubDetailProps> = ({ club, onBack }) => {
  return (
    <div className="space-y-8 pb-20">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Hub
      </button>

      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden shrink-0">
            <Shield className="w-10 h-10 lg:w-12 lg:h-12 text-brand-green" />
          </div>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter font-display">{club.name}</h1>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  club.tier === 'A' ? 'bg-brand-amber text-black' :
                  club.tier === 'B' ? 'bg-brand-green text-black' :
                  'bg-white/20 text-white'
                }`}>
                  TIER {club.tier}
                </span>
                <span className="text-[10px] font-mono text-white/40">
                  RANK #{club.rank}
                </span>
              </div>
            </div>
            <p className="text-white/50 font-mono text-[10px] lg:text-sm uppercase tracking-widest">
              {club.country} • {club.stadium} ({club.capacity})
            </p>
          </div>
        </div>
        <div className="flex gap-4 lg:gap-8 border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
          <div className="text-left lg:text-right">
            <p className="text-[10px] font-mono text-white/40 uppercase">Manager</p>
            <p className="text-lg lg:text-xl font-bold">{club.manager.name}</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-left lg:text-right">
            <p className="text-[10px] font-mono text-white/40 uppercase">Formation</p>
            <p className="text-lg lg:text-xl font-bold text-brand-green">{club.formation}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Squad Module */}
        <section className="lg:col-span-2 glass rounded-3xl p-4 lg:p-8 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-xl lg:text-2xl font-black uppercase tracking-tighter flex items-center gap-3 font-display">
              <Users className="text-brand-amber" /> Squad & Intelligence
            </h2>
            <span className="text-[10px] font-mono text-white/40">{club.squad.length} Registered Players</span>
          </div>
          
          <div className="overflow-x-auto -mx-4 lg:mx-0">
            <div className="inline-block min-w-full align-middle px-4 lg:px-0">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    <th className="pb-4 font-medium">Player</th>
                    <th className="pb-4 font-medium">Pos</th>
                    <th className="pb-4 font-medium hidden sm:table-cell">Age</th>
                    <th className="pb-4 font-medium hidden md:table-cell">Scout Note</th>
                    <th className="pb-4 font-medium">Form</th>
                    <th className="pb-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {club.squad.map((player) => (
                    <tr key={player.id} className={`group hover:bg-white/5 transition-colors ${player.isWeakPoint ? 'bg-red-500/5' : ''}`}>
                      <td className="py-4">
                        <div className="flex flex-col">
                          <span className={`font-bold text-sm lg:text-base ${player.isWeakPoint ? 'text-red-400' : ''}`}>{player.name}</span>
                          {player.isWeakPoint && <span className="text-[8px] font-mono text-red-500 uppercase">Weak Point</span>}
                        </div>
                      </td>
                      <td className="py-4 text-white/60 font-mono text-[10px] lg:text-xs">{player.position}</td>
                      <td className="py-4 text-white/60 text-xs lg:text-sm hidden sm:table-cell">{player.age}</td>
                      <td className="py-4 hidden md:table-cell">
                        <p className="text-[10px] text-white/50 italic max-w-[200px] leading-tight">
                          {player.scoutNote || 'No detailed analysis available.'}
                        </p>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                            <div 
                              className={`h-full ${player.isWeakPoint ? 'bg-red-500' : 'bg-brand-green'}`}
                              style={{ width: `${player.form * 10}%` }}
                            />
                          </div>
                          <span className={`text-xs font-mono font-bold ${player.isWeakPoint ? 'text-red-400' : 'text-brand-green'}`}>{player.form}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          player.status === 'fit' ? 'bg-brand-green/20 text-brand-green' : 'bg-red-500/20 text-red-500'
                        }`}>
                          {player.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Tactics Module */}
        <section className="glass rounded-3xl p-4 lg:p-8 space-y-8">
          <h2 className="text-xl lg:text-2xl font-black uppercase tracking-tighter flex items-center gap-3 font-display">
            <Target className="text-brand-amber" /> Tactics & System
          </h2>
          
          <TacticalPitch 
            formation={club.formation} 
            defensiveLine={club.tactics.defensiveLine}
            buildUp={club.tactics.buildUp}
          />

          <div className="space-y-6">
            <div className="bg-brand-amber/10 border border-brand-amber/20 p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2">
                <Zap className="w-4 h-4 text-brand-amber animate-pulse" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-brand-amber uppercase tracking-widest">AI Tactical Assistant</h3>
                <span className="text-[8px] font-mono bg-brand-amber text-black px-1.5 py-0.5 rounded font-black">PAID OPTION</span>
              </div>
              <p className="text-xs text-white/60 mb-4 leading-relaxed">
                Get deep-learning insights on how to neutralize {club.name}'s {club.formation} system.
              </p>
              <button className="w-full py-3 bg-brand-amber text-black text-xs font-bold rounded-xl hover:bg-brand-amber/90 transition-colors flex items-center justify-center gap-2">
                <Activity className="w-4 h-4" /> UNLOCK PRO ANALYSIS
              </button>
              <p className="text-[8px] text-center text-white/30 mt-2 font-mono uppercase">Premium Feature • €9.99/mo</p>
            </div>

            <div>
              <p className="text-[10px] font-mono text-white/40 uppercase mb-2">Pressing Intensity</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${club.tactics.pressing}%` }}
                    className="h-full bg-brand-amber"
                  />
                </div>
                <span className="text-sm font-mono font-bold">{club.tactics.pressing}%</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-mono text-white/40 uppercase mb-2">Build-up Style</p>
              <div className="flex gap-2">
                <span className={`flex-1 text-center py-2 rounded-lg text-xs font-bold border ${club.tactics.buildUp === 'positional' ? 'bg-brand-green/20 border-brand-green text-brand-green' : 'bg-white/5 border-white/10 text-white/40'}`}>POSITIONAL</span>
                <span className={`flex-1 text-center py-2 rounded-lg text-xs font-bold border ${club.tactics.buildUp === 'direct' ? 'bg-brand-green/20 border-brand-green text-brand-green' : 'bg-white/5 border-white/10 text-white/40'}`}>DIRECT</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-mono text-white/40 uppercase mb-2">Defensive Line</p>
              <div className="flex gap-2">
                {['low', 'medium', 'high'].map(line => (
                  <span key={line} className={`flex-1 text-center py-2 rounded-lg text-[10px] font-bold border uppercase ${club.tactics.defensiveLine === line ? 'bg-brand-amber/20 border-brand-amber text-brand-amber' : 'bg-white/5 border-white/10 text-white/40'}`}>
                    {line}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-brand-green/10 border border-brand-green/20 p-4 rounded-xl">
              <p className="text-[10px] font-mono text-brand-green uppercase mb-1">Scout Note</p>
              <p className="text-xs text-white/70 leading-relaxed italic">
                "Relies heavily on wide overloads and high-intensity counter-pressing in the middle third."
              </p>
            </div>
          </div>
        </section>

        {/* Manager Profile Module */}
        <section className="lg:col-span-3 glass rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3 font-display">
              <Users className="text-brand-amber" /> Manager Profile: {club.manager.name}
            </h2>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] font-mono text-white/40 uppercase">Win Rate</p>
                <p className="text-xl font-bold text-brand-green">{club.manager.winPercentage}%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Career Timeline */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-brand-amber uppercase tracking-widest">Career Timeline</h3>
              <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                {club.manager.careerTimeline.map((item, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-brand-dark border-2 border-brand-amber" />
                    <p className="text-sm font-bold">{item.club}</p>
                    <p className="text-xs text-white/40 font-mono">{item.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Analysis */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-brand-amber uppercase tracking-widest">Tactical Analysis</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {club.manager.tacticalAnalysis}
              </p>
              <div className="pt-4">
                <p className="text-[10px] font-mono text-white/40 uppercase mb-2">Preferred Formations</p>
                <div className="flex gap-2">
                  {club.manager.preferredFormations.map(f => (
                    <span key={f} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Manager Quote */}
            <div className="flex flex-col justify-center">
              <div className="relative p-8 bg-brand-amber/5 border border-brand-amber/20 rounded-3xl italic text-lg text-white/90">
                <span className="absolute -top-4 -left-2 text-6xl text-brand-amber/20 font-serif">"</span>
                {club.manager.quote}
                <span className="absolute -bottom-10 -right-2 text-6xl text-brand-amber/20 font-serif">"</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

