import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AfricaMapProps {
  onCountryClick: (countryId: string) => void;
  activeCountries: string[];
}

export const AfricaMap: React.FC<AfricaMapProps> = ({ onCountryClick, activeCountries }) => {
  // Geographically accurate coordinates for pulsing nodes
  const countries = [
    { id: 'egypt', name: 'Egypt', x: 370, y: 95, tooltip: '3 clubs tracked' },
    { id: 'tunisia', name: 'Tunisia', x: 290, y: 65, tooltip: '3 clubs tracked' },
    { id: 'morocco', name: 'Morocco', x: 160, y: 80, tooltip: '3 clubs tracked' },
    { id: 'south-africa', name: 'South Africa', x: 310, y: 420, tooltip: '3 clubs tracked' },
    { id: 'dr-congo', name: 'DR Congo', x: 310, y: 290, tooltip: '2 clubs tracked' },
    { id: 'algeria', name: 'Algeria', x: 240, y: 90, tooltip: '2 clubs tracked' },
    { id: 'senegal', name: 'Senegal', x: 110, y: 185, tooltip: '2 clubs tracked' },
    { id: 'kenya', name: 'Kenya', x: 400, y: 265, tooltip: '2 clubs tracked' },
    { id: 'cameroon', name: 'Cameroon', x: 270, y: 245, tooltip: '2 clubs tracked' },
    { id: 'nigeria', name: 'Nigeria', x: 230, y: 215, tooltip: '2 clubs tracked' },
  ];

  // Simplified but accurate Africa continent path
  const detailedAfricaPath = "M165,45 L185,42 L210,48 L240,45 L270,42 L300,35 L330,40 L360,55 L385,75 L405,100 L415,130 L410,165 L395,200 L405,230 L420,260 L415,290 L395,320 L370,350 L345,380 L320,410 L290,435 L260,445 L230,440 L205,420 L185,390 L175,360 L170,330 L160,300 L145,275 L125,255 L105,235 L90,210 L85,180 L90,150 L105,125 L125,100 L145,75 Z";

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square bg-brand-surface/30 rounded-3xl p-8 border border-white/5 overflow-hidden group">
      <div className="absolute inset-0 data-grid opacity-20" />
      
      <motion.svg 
        viewBox="0 0 500 500" 
        className="w-full h-full drop-shadow-[0_0_30px_rgba(0,255,0,0.1)]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Continent Background Glow */}
        <motion.path
          d={detailedAfricaPath}
          fill="rgba(0, 255, 0, 0.02)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />

        {/* Animated Continent Outline */}
        <motion.path
          d={detailedAfricaPath}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />

        {/* Active Country Nodes */}
        {countries.map((c, i) => {
          const isActive = activeCountries.includes(c.id);
          return (
            <g key={c.id} className="cursor-pointer" onClick={() => onCountryClick(c.id)}>
              {/* Interaction Area */}
              <circle cx={c.x} cy={c.y} r="25" fill="transparent" />
              
              {/* Pulsing Outer Ring */}
              <AnimatePresence>
                {isActive && (
                  <motion.circle
                    cx={c.x}
                    cy={c.y}
                    initial={{ r: 4, opacity: 0.8 }}
                    animate={{ r: 20, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    stroke="#00FF00"
                    strokeWidth="1"
                    fill="none"
                  />
                )}
              </AnimatePresence>

              {/* Core Node */}
              <motion.circle
                cx={c.x}
                cy={c.y}
                r={isActive ? 6 : 4}
                fill={isActive ? "#00FF00" : "rgba(255,255,255,0.3)"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + (i * 0.1) }}
                whileHover={{ scale: 1.5, fill: "#F27D26" }}
                className="transition-colors duration-300"
              />

              {/* Label (Visible on Hover or Active) */}
              <motion.g
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                className="pointer-events-none"
              >
                <rect 
                  x={c.x + 10} 
                  y={c.y - 15} 
                  width="80" 
                  height="24" 
                  rx="4" 
                  fill="rgba(0,0,0,0.8)" 
                  className="backdrop-blur-sm"
                />
                <text 
                  x={c.x + 18} 
                  y={c.y + 1} 
                  fill="white" 
                  fontSize="10" 
                  fontWeight="bold"
                  className="font-mono uppercase tracking-tighter"
                >
                  {c.name}
                </text>
              </motion.g>
            </g>
          );
        })}
      </motion.svg>
      
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xs font-mono text-brand-amber uppercase tracking-widest mb-1">Intelligence Grid</h3>
          <p className="text-xl font-bold tracking-tight">Continental Node Map</p>
        </motion.div>
        <motion.div 
          className="text-right"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[10px] font-mono text-white/40 uppercase">Active Hubs</p>
          <p className="text-2xl font-mono text-brand-green font-bold">{activeCountries.length}</p>
        </motion.div>
      </div>
    </div>
  );
};


