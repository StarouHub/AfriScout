import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Users, Shield, Zap, MapPin } from 'lucide-react';
import { Club } from '../types';

interface ClubCardProps {
  club: Club;
  onClick: () => void;
}

export const ClubCard: React.FC<ClubCardProps> = ({ club, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="glass p-6 rounded-2xl cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 flex flex-col items-end gap-1">
        <div className={`text-[10px] font-mono px-2 py-1 rounded border ${
          club.tier === 'A' ? 'bg-brand-amber/20 text-brand-amber border-brand-amber/30' :
          club.tier === 'B' ? 'bg-brand-green/20 text-brand-green border-brand-green/30' :
          'bg-white/10 text-white/60 border-white/20'
        }`}>
          TIER {club.tier}
        </div>
        <div className="text-[10px] font-mono text-white/40">
          CAF RANK #{club.rank}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-brand-green/50 transition-colors overflow-hidden">
          <Shield className="w-8 h-8 text-white/20 group-hover:text-brand-green transition-colors" />
        </div>
        <div>
          <h3 className="text-xl font-bold group-hover:text-brand-green transition-colors font-display">{club.name}</h3>
          <p className="text-sm text-white/50 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {club.country}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 p-3 rounded-lg border border-white/5">
          <p className="text-[10px] font-mono text-white/40 uppercase mb-1">CAF Titles</p>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-brand-amber" />
            <span className="text-lg font-bold">{club.titles}</span>
          </div>
        </div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/5">
          <p className="text-[10px] font-mono text-white/40 uppercase mb-1">League Pos</p>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-green" />
            <span className="text-lg font-bold">#{club.leaguePosition}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {club.lastFive.map((res, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${
                res === 'W' ? 'bg-brand-green/20 text-brand-green' : 
                res === 'D' ? 'bg-white/10 text-white/60' : 'bg-red-500/20 text-red-500'
              }`}
            >
              {res}
            </div>
          ))}
        </div>
        <button className="text-xs font-mono text-brand-amber border-b border-brand-amber/30 pb-1 hover:border-brand-amber transition-all">
          SCOUT CLUB →
        </button>
      </div>
    </motion.div>
  );
};
