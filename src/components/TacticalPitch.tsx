import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Position {
  x: number;
  y: number;
  label: string;
  role?: string;
  movement?: string; // SVG path relative to x,y
}

interface TacticalPitchProps {
  formation: string;
  defensiveLine?: 'high' | 'low' | 'medium';
  buildUp?: 'direct' | 'positional';
}

const FORMATIONS: Record<string, Position[]> = {
  '4-3-3': [
    { x: 150, y: 370, label: 'GK', role: 'Sweeper Keeper' },
    { x: 260, y: 300, label: 'RB', role: 'Inverted', movement: 'M 0 0 L -40 -100' },
    { x: 40, y: 300, label: 'LB', role: 'Wingback', movement: 'M 0 0 L 0 -150' },
    { x: 110, y: 320, label: 'CB', role: 'Ball Playing' },
    { x: 190, y: 320, label: 'CB', role: 'Stopper' },
    { x: 150, y: 240, label: 'CDM', role: 'Anchor', movement: 'M 0 0 L 40 0 L -40 0 Z' },
    { x: 100, y: 180, label: 'CM', role: 'Box-to-Box', movement: 'M 0 0 L 0 -80 L 0 40 Z' },
    { x: 200, y: 180, label: 'CM', role: 'Mezzala', movement: 'M 0 0 L 40 -60' },
    { x: 270, y: 100, label: 'RW', role: 'Inside Forward', movement: 'M 0 0 L -60 40' },
    { x: 30, y: 100, label: 'LW', role: 'Winger', movement: 'M 0 0 L 0 -40' },
    { x: 150, y: 60, label: 'ST', role: 'False 9', movement: 'M 0 0 L 0 60' },
  ],
  '4-2-3-1': [
    { x: 150, y: 370, label: 'GK', role: 'Shot Stopper' },
    { x: 260, y: 300, label: 'RB', role: 'Fullback' },
    { x: 40, y: 300, label: 'LB', role: 'Fullback' },
    { x: 110, y: 320, label: 'CB', role: 'Cover' },
    { x: 190, y: 320, label: 'CB', role: 'Stopper' },
    { x: 110, y: 240, label: 'CDM', role: 'Deep Lying' },
    { x: 190, y: 240, label: 'CDM', role: 'Ball Winner' },
    { x: 270, y: 150, label: 'RM', role: 'Wide Midfielder' },
    { x: 30, y: 150, label: 'LM', role: 'Wide Midfielder' },
    { x: 150, y: 140, label: 'CAM', role: 'Enganche', movement: 'M 0 0 L 30 30 L -30 30 Z' },
    { x: 150, y: 60, label: 'ST', role: 'Advanced Forward' },
  ],
  '4-4-2': [
    { x: 150, y: 370, label: 'GK', role: 'Traditional' },
    { x: 260, y: 300, label: 'RB', role: 'Defensive' },
    { x: 40, y: 300, label: 'LB', role: 'Defensive' },
    { x: 110, y: 320, label: 'CB', role: 'No-Nonsense' },
    { x: 190, y: 320, label: 'CB', role: 'No-Nonsense' },
    { x: 270, y: 200, label: 'RM', role: 'Winger' },
    { x: 30, y: 200, label: 'LM', role: 'Winger' },
    { x: 110, y: 200, label: 'CM', role: 'Central Mid' },
    { x: 190, y: 200, label: 'CM', role: 'Central Mid' },
    { x: 110, y: 80, label: 'ST', role: 'Target Man' },
    { x: 190, y: 80, label: 'ST', role: 'Poacher' },
  ],
};

export const TacticalPitch: React.FC<TacticalPitchProps> = ({ 
  formation, 
  defensiveLine = 'medium',
  buildUp = 'positional'
}) => {
  const [phase, setPhase] = useState<'attacking' | 'defensive'>('attacking');

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => p === 'attacking' ? 'defensive' : 'attacking');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const basePositions = FORMATIONS[formation] || FORMATIONS['4-3-3'];
  
  // Adjust positions based on defensive line and phase
  const lineOffset = defensiveLine === 'high' ? -40 : defensiveLine === 'low' ? 40 : 0;
  
  const positions = basePositions.map(pos => {
    if (pos.label === 'GK') return pos;
    
    let yOffset = lineOffset;
    if (phase === 'attacking') {
      yOffset -= 30; // Move up in attacking phase
    }
    
    return { ...pos, y: pos.y + yOffset };
  });

  return (
    <div className="relative w-full aspect-[3/4] bg-brand-dark/80 rounded-3xl border border-white/10 overflow-hidden p-6 shadow-2xl">
      {/* Pitch Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{ 
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 80px)',
          backgroundSize: '100% 80px'
        }} />
      </div>

      {/* Pitch Markings */}
      <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <rect x="10" y="10" width="280" height="380" fill="none" stroke="white" strokeWidth="1.5" />
        <line x1="10" y1="200" x2="290" y2="200" stroke="white" strokeWidth="1.5" />
        <circle cx="150" cy="200" r="40" fill="none" stroke="white" strokeWidth="1.5" />
        <circle cx="150" cy="200" r="2" fill="white" />
        
        {/* Penalty Areas */}
        <rect x="60" y="10" width="180" height="70" fill="none" stroke="white" strokeWidth="1.5" />
        <rect x="100" y="10" width="100" height="30" fill="none" stroke="white" strokeWidth="1.5" />
        <path d="M 110 80 Q 150 100 190 80" fill="none" stroke="white" strokeWidth="1.5" />
        
        <rect x="60" y="320" width="180" height="70" fill="none" stroke="white" strokeWidth="1.5" />
        <rect x="100" y="360" width="100" height="30" fill="none" stroke="white" strokeWidth="1.5" />
        <path d="M 110 320 Q 150 300 190 320" fill="none" stroke="white" strokeWidth="1.5" />

        {/* Corners */}
        <path d="M 10 25 Q 25 25 25 10" fill="none" stroke="white" strokeWidth="1" />
        <path d="M 290 25 Q 275 25 275 10" fill="none" stroke="white" strokeWidth="1" />
        <path d="M 10 375 Q 25 375 25 390" fill="none" stroke="white" strokeWidth="1" />
        <path d="M 290 375 Q 275 375 275 390" fill="none" stroke="white" strokeWidth="1" />
      </svg>

      {/* Tactical Connections (Triangles/Lines) */}
      {buildUp === 'positional' && (
        <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
          <motion.path
            d={`M ${positions[5].x} ${positions[5].y} L ${positions[6].x} ${positions[6].y} L ${positions[7].x} ${positions[7].y} Z`}
            fill="rgba(0, 255, 0, 0.2)"
            stroke="rgba(0, 255, 0, 0.5)"
            strokeWidth="1"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </svg>
      )}

      {/* Player Nodes */}
      <svg viewBox="0 0 300 400" className="relative z-10 w-full h-full">
        <AnimatePresence>
          {positions.map((pos, i) => (
            <g key={`${formation}-${pos.label}-${i}`}>
              {/* Movement Shadow (Previous Position) */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r="8"
                fill="rgba(0, 255, 0, 0.1)"
                initial={false}
                animate={{ cx: pos.x, cy: pos.y }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Movement Path Visualization */}
              {pos.movement && (
                <motion.path
                  d={pos.movement}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  fill="none"
                  stroke="rgba(0, 255, 0, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: phase === 'attacking' ? 0.6 : 0 }}
                  transition={{ duration: 2 }}
                />
              )}
              
              {/* Player Circle */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r="10"
                fill={pos.label === 'GK' ? '#F27D26' : '#00FF00'}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  cx: pos.x + (Math.random() * 4 - 2),
                  cy: pos.y + (Math.random() * 4 - 2)
                }}
                transition={{ 
                  scale: { duration: 0.5, delay: i * 0.05 },
                  cx: { duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
                  cy: { duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="drop-shadow-[0_0_12px_rgba(0,255,0,0.4)]"
              />
              
              {/* Player Label */}
              <motion.text
                x={pos.x}
                y={pos.y - 15}
                textAnchor="middle"
                fill="white"
                fontSize="9"
                fontWeight="900"
                className="font-mono uppercase tracking-tighter drop-shadow-md"
                animate={{ x: pos.x, y: pos.y - 15 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                {pos.label}
              </motion.text>

              {/* Player Role (Small) */}
              <motion.text
                x={pos.x}
                y={pos.y + 22}
                textAnchor="middle"
                fill="white"
                fontSize="6"
                className="font-mono uppercase tracking-widest opacity-40"
                animate={{ x: pos.x, y: pos.y + 22 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                {pos.role}
              </motion.text>
            </g>
          ))}
        </AnimatePresence>
      </svg>

      {/* Tactical Status Overlay */}
      <div className="absolute top-6 left-6 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${phase === 'attacking' ? 'bg-brand-green animate-pulse' : 'bg-white/20'}`} />
          <span className={`text-[10px] font-mono uppercase tracking-widest ${phase === 'attacking' ? 'text-brand-green' : 'text-white/40'}`}>
            Attacking Phase
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${phase === 'defensive' ? 'bg-brand-amber animate-pulse' : 'bg-white/20'}`} />
          <span className={`text-[10px] font-mono uppercase tracking-widest ${phase === 'defensive' ? 'text-brand-amber' : 'text-white/40'}`}>
            Defensive Transition
          </span>
        </div>
      </div>

      {/* Legend / Info */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
        <div className="glass px-4 py-2 rounded-xl border border-white/10">
          <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1">System Architecture</p>
          <div className="flex items-center gap-3">
            <span className="text-lg font-black uppercase tracking-tighter">{formation}</span>
            <div className="w-px h-4 bg-white/20" />
            <span className="text-[10px] font-mono text-brand-green uppercase">{buildUp}</span>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1">Defensive Line</p>
          <p className="text-xs font-bold uppercase text-brand-amber">{defensiveLine}</p>
        </div>
      </div>
    </div>
  );
};
