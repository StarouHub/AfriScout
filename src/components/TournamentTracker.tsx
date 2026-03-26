import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Calendar, MapPin, ChevronRight, Activity } from 'lucide-react';

export const TournamentTracker: React.FC = () => {
  const [activeTournament, setActiveTournament] = React.useState<'CL' | 'CC'>('CL');

  const clGroups = [
    {
      name: 'Group A',
      teams: [
        { name: 'Mamelodi Sundowns', played: 6, points: 13, form: ['W', 'W', 'W', 'D', 'W', 'L'] },
        { name: 'TP Mazembe', played: 6, points: 10, form: ['L', 'W', 'W', 'D', 'W', 'L'] },
        { name: 'FC Nouadhibou', played: 6, points: 5, form: ['L', 'L', 'D', 'W', 'L', 'D'] },
        { name: 'Pyramids FC', played: 6, points: 5, form: ['L', 'L', 'D', 'L', 'W', 'L'] },
      ]
    },
    {
      name: 'Group B',
      teams: [
        { name: 'ASEC Mimosas', played: 6, points: 11, form: ['W', 'W', 'W', 'D', 'L', 'D'] },
        { name: 'Simba SC', played: 6, points: 9, form: ['W', 'D', 'L', 'W', 'D', 'L'] },
        { name: 'Wydad AC', played: 6, points: 9, form: ['W', 'W', 'L', 'L', 'W', 'L'] },
        { name: 'Jwaneng Galaxy', played: 6, points: 4, form: ['L', 'L', 'D', 'W', 'L', 'L'] },
      ]
    },
    {
      name: 'Group C',
      teams: [
        { name: 'Petro de Luanda', played: 6, points: 12, form: ['W', 'W', 'W', 'D', 'D', 'W'] },
        { name: 'Espérance de Tunis', played: 6, points: 11, form: ['W', 'W', 'D', 'D', 'W', 'L'] },
        { name: 'Al Hilal', played: 6, points: 5, form: ['L', 'L', 'D', 'W', 'L', 'D'] },
        { name: 'Étoile du Sahel', played: 6, points: 4, form: ['L', 'L', 'L', 'W', 'L', 'D'] },
      ]
    },
    {
      name: 'Group D',
      teams: [
        { name: 'Al Ahly SC', played: 6, points: 12, form: ['W', 'W', 'D', 'D', 'W', 'W'] },
        { name: 'Young Africans', played: 6, points: 8, form: ['W', 'W', 'L', 'D', 'W', 'L'] },
        { name: 'CR Belouizdad', played: 6, points: 8, form: ['W', 'L', 'D', 'W', 'L', 'D'] },
        { name: 'Medeama SC', played: 6, points: 4, form: ['L', 'L', 'W', 'L', 'L', 'L'] },
      ]
    }
  ];

  const ccGroups = [
    {
      name: 'Group A',
      teams: [
        { name: 'USM Alger', played: 6, points: 13, form: ['W', 'W', 'D', 'W', 'W', 'L'] },
        { name: 'Modern Future', played: 6, points: 11, form: ['W', 'D', 'W', 'L', 'W', 'W'] },
        { name: 'Al Hilal Benghazi', played: 6, points: 6, form: ['L', 'W', 'L', 'W', 'L', 'L'] },
        { name: 'SuperSport United', played: 6, points: 4, form: ['L', 'L', 'W', 'L', 'L', 'D'] },
      ]
    },
    {
      name: 'Group B',
      teams: [
        { name: 'Zamalek SC', played: 6, points: 16, form: ['W', 'W', 'W', 'W', 'D', 'W'] },
        { name: 'Abu Salim', played: 6, points: 9, form: ['W', 'W', 'L', 'W', 'L', 'L'] },
        { name: 'Sagrada Esperança', played: 6, points: 8, form: ['L', 'L', 'W', 'D', 'W', 'W'] },
        { name: 'CO Coyah', played: 6, points: 1, form: ['L', 'L', 'L', 'L', 'D', 'L'] },
      ]
    },
    {
      name: 'Group C',
      teams: [
        { name: 'Dreams FC', played: 6, points: 12, form: ['W', 'W', 'L', 'W', 'W', 'L'] },
        { name: 'Rivers United', played: 6, points: 12, form: ['W', 'L', 'W', 'W', 'L', 'W'] },
        { name: 'Club Africain', played: 6, points: 9, form: ['W', 'W', 'W', 'L', 'L', 'L'] },
        { name: 'APC Lobito', played: 6, points: 0, form: ['L', 'L', 'L', 'L', 'L', 'L'] },
      ]
    },
    {
      name: 'Group D',
      teams: [
        { name: 'RS Berkane', played: 6, points: 14, form: ['W', 'W', 'D', 'W', 'D', 'W'] },
        { name: 'Stade Malien', played: 6, points: 10, form: ['W', 'L', 'W', 'D', 'W', 'L'] },
        { name: 'Sekhukhune United', played: 6, points: 6, form: ['L', 'W', 'D', 'L', 'D', 'W'] },
        { name: 'Diables Noirs', played: 6, points: 2, form: ['L', 'L', 'L', 'D', 'L', 'D'] },
      ]
    }
  ];

  const groups = activeTournament === 'CL' ? clGroups : ccGroups;

  const clFixtures = [
    { home: 'Al Ahly', away: 'Espérance', date: 'May 25', time: '18:00', venue: 'Cairo', stage: 'Final (2nd Leg)' },
    { home: 'Espérance', away: 'Al Ahly', date: 'May 18', time: '18:00', venue: 'Tunis', stage: 'Final (1st Leg)' },
  ];

  const ccFixtures = [
    { home: 'Zamalek', away: 'RS Berkane', date: 'May 19', time: '18:00', venue: 'Cairo', stage: 'Final (2nd Leg)' },
    { home: 'RS Berkane', away: 'Zamalek', date: 'May 12', time: '18:00', venue: 'Berkane', stage: 'Final (1st Leg)' },
  ];

  const fixtures = activeTournament === 'CL' ? clFixtures : ccFixtures;

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-xs font-mono text-brand-amber uppercase tracking-widest mb-2">Continental Coverage</h2>
          <h1 className="text-5xl font-black uppercase tracking-tighter">CAF Tournament Tracker</h1>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => setActiveTournament('CL')}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTournament === 'CL' ? 'bg-brand-amber text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
          >
            CHAMPIONS LEAGUE
          </button>
          <button 
            onClick={() => setActiveTournament('CC')}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTournament === 'CC' ? 'bg-brand-green text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
          >
            CONFEDERATION CUP
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Groups Section */}
        <div className="xl:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {groups.map((group) => (
              <div key={group.name} className="glass rounded-3xl p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-brand-amber" /> {group.name}
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-12 text-[10px] font-mono text-white/40 uppercase tracking-widest px-2">
                    <div className="col-span-6">Club</div>
                    <div className="col-span-2 text-center">P</div>
                    <div className="col-span-2 text-center">PTS</div>
                    <div className="col-span-2 text-right">Form</div>
                  </div>
                  {group.teams.map((team, idx) => (
                    <div key={team.name} className={`grid grid-cols-12 items-center p-2 rounded-xl border border-transparent hover:border-white/10 transition-colors ${idx < 2 ? 'bg-brand-green/5' : ''}`}>
                      <div className="col-span-6 flex items-center gap-3">
                        <span className="text-xs font-mono text-white/20">{idx + 1}</span>
                        <span className="font-bold text-sm">{team.name}</span>
                      </div>
                      <div className="col-span-2 text-center text-sm font-mono">{team.played}</div>
                      <div className="col-span-2 text-center text-sm font-bold text-brand-green">{team.points}</div>
                      <div className="col-span-2 flex justify-end gap-0.5">
                        {team.form.map((res, i) => (
                          <div key={i} className={`w-3 h-3 rounded-full ${res === 'W' ? 'bg-brand-green' : res === 'D' ? 'bg-white/20' : 'bg-red-500'}`} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="glass rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-green" /> Live Bracket Progress
            </h3>
            <div className="relative h-64 flex items-center justify-around">
               {/* Visual Bracket Representation */}
               <div className="absolute inset-0 data-grid opacity-10" />
               <div className="flex flex-col gap-12">
                 <div className="w-40 p-3 glass rounded-lg border-l-4 border-brand-green">
                   <p className="text-[10px] font-mono text-white/40">Quarter 1</p>
                   <p className="text-sm font-bold">Al Ahly</p>
                 </div>
                 <div className="w-40 p-3 glass rounded-lg border-l-4 border-white/10">
                   <p className="text-[10px] font-mono text-white/40">Quarter 2</p>
                   <p className="text-sm font-bold">Zamalek</p>
                 </div>
               </div>
               <div className="w-px h-32 bg-white/10 relative">
                 <div className="absolute top-1/2 -translate-y-1/2 right-0 w-8 h-px bg-white/10" />
               </div>
               <div className="w-48 p-4 glass rounded-xl border-2 border-brand-amber/30 bg-brand-amber/5">
                 <p className="text-[10px] font-mono text-brand-amber uppercase font-bold">Semi-Final A</p>
                 <p className="text-lg font-bold">TBD</p>
               </div>
            </div>
          </div>
        </div>

        {/* Fixtures Section */}
        <div className="space-y-8">
          <div className="glass rounded-3xl p-8 sticky top-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-amber" /> Upcoming Fixtures
            </h3>
            <div className="space-y-6">
              {fixtures.map((f, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono text-brand-green uppercase tracking-widest">{f.stage}</span>
                    <span className="text-[10px] font-mono text-white/40">{f.date} • {f.time}</span>
                  </div>
                  <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5 group-hover:border-brand-green/30 transition-colors">
                    <div className="text-center flex-1">
                      <p className="text-sm font-bold">{f.home}</p>
                    </div>
                    <div className="px-4 text-xs font-mono text-white/20 italic">VS</div>
                    <div className="text-center flex-1">
                      <p className="text-sm font-bold">{f.away}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-white/30">
                    <MapPin className="w-3 h-3" /> {f.venue}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-brand-green transition-colors">
              VIEW FULL SCHEDULE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
