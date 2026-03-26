import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Target, Activity, ChevronRight, Swords, TrendingUp, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";
import { CLUBS } from '../constants';
import { Club } from '../types';

export const BattleReport: React.FC = () => {
  const [teamA, setTeamA] = useState<Club>(CLUBS['al-ahly']);
  const [teamB, setTeamB] = useState<Club>(CLUBS['esperance']);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAIReport = async () => {
    setIsGenerating(true);
    setAiReport(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a detailed tactical battle report for a football match between ${teamA.name} and ${teamB.name}.
        
        Team A: ${teamA.name}
        Formation: ${teamA.formation}
        Defensive Line: ${teamA.tactics.defensiveLine}
        Build-up: ${teamA.tactics.buildUp}
        Pressing: ${teamA.tactics.pressing}%
        Transition Speed: ${teamA.tactics.transitionSpeed}%
        
        Team B: ${teamB.name}
        Formation: ${teamB.formation}
        Defensive Line: ${teamB.tactics.defensiveLine}
        Build-up: ${teamB.tactics.buildUp}
        Pressing: ${teamB.tactics.pressing}%
        Transition Speed: ${teamB.tactics.transitionSpeed}%
        
        Provide:
        1. Tactical Overview
        2. ${teamA.name} Strengths & Weaknesses
        3. ${teamB.name} Strengths & Weaknesses
        4. Key Tactical Battlegrounds
        5. Recommended Strategies for both managers
        
        Keep the tone professional, analytical, and concise. Use Markdown for formatting.`,
      });
      setAiReport(response.text || "Failed to generate report.");
    } catch (error) {
      console.error("AI Generation Error:", error);
      setAiReport("An error occurred while generating the tactical report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const allClubs = Object.values(CLUBS);

  const StatBar = ({ label, valA, valB, max = 100, color = 'brand-green' }: { label: string, valA: number, valB: number, max?: number, color?: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest">
        <span>{valA}</span>
        <span>{label}</span>
        <span>{valB}</span>
      </div>
      <div className="flex gap-1 h-2">
        <div className="flex-1 bg-white/5 rounded-full overflow-hidden flex justify-end">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(valA / max) * 100}%` }}
            className={`h-full bg-${color}`}
          />
        </div>
        <div className="flex-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(valB / max) * 100}%` }}
            className={`h-full bg-${color}`}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-xs font-mono text-brand-amber uppercase tracking-widest mb-2">Tactical Intelligence</h2>
          <h1 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter font-display">Pre-Match Battle Report</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <select 
            value={teamA.id} 
            onChange={(e) => setTeamA(CLUBS[e.target.value])}
            className="bg-brand-surface border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-amber w-full sm:w-auto"
          >
            {allClubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div className="flex items-center justify-center text-brand-amber font-mono font-bold">VS</div>
          <select 
            value={teamB.id} 
            onChange={(e) => setTeamB(CLUBS[e.target.value])}
            className="bg-brand-surface border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-amber w-full sm:w-auto"
          >
            {allClubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Comparison Radar/Stats */}
        <div className="lg:col-span-2 space-y-8">
          <section className="glass rounded-3xl p-4 lg:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-12">
              <div className="text-center flex-1">
                <Shield className="w-10 h-10 lg:w-12 lg:h-12 text-brand-amber mx-auto mb-2" />
                <h3 className="text-lg lg:text-xl font-bold font-display">{teamA.name}</h3>
                <p className="text-[10px] text-white/40 font-mono uppercase">{teamA.formation}</p>
              </div>
              <div className="px-4 lg:px-8 rotate-90 sm:rotate-0">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <Swords className="w-5 h-5 lg:w-6 lg:h-6 text-brand-amber" />
                </div>
              </div>
              <div className="text-center flex-1">
                <Shield className="w-10 h-10 lg:w-12 lg:h-12 text-brand-green mx-auto mb-2" />
                <h3 className="text-lg lg:text-xl font-bold font-display">{teamB.name}</h3>
                <p className="text-[10px] text-white/40 font-mono uppercase">{teamB.formation}</p>
              </div>
            </div>

            <div className="space-y-8 max-w-xl mx-auto">
              <StatBar label="Pressing Intensity" valA={teamA.tactics.pressing} valB={teamB.tactics.pressing} />
              <StatBar label="Transition Speed" valA={teamA.tactics.transitionSpeed} valB={teamB.tactics.transitionSpeed} color="brand-amber" />
              <StatBar label="CAF Titles" valA={teamA.titles} valB={teamB.titles} max={12} color="white" />
              <StatBar label="Avg Squad Form" valA={8.2} valB={7.9} max={10} />
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass rounded-3xl p-8 border-l-4 border-l-brand-amber">
              <h4 className="text-sm font-mono text-brand-amber uppercase mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> {teamA.name} Strengths
              </h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex gap-2">• Dominant in high-pressure CAF knockouts</li>
                <li className="flex gap-2">• Exceptional build-up through {teamA.tactics.buildUp} play</li>
                <li className="flex gap-2">• High defensive line ({teamA.tactics.defensiveLine}) creates offside traps</li>
              </ul>
            </div>
            <div className="glass rounded-3xl p-8 border-l-4 border-l-brand-green">
              <h4 className="text-sm font-mono text-brand-green uppercase mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> {teamB.name} Strengths
              </h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex gap-2">• Lethal on {teamB.tactics.transitionSpeed}% speed transitions</li>
                <li className="flex gap-2">• Disciplined {teamB.tactics.defensiveLine} defensive block</li>
                <li className="flex gap-2">• Strong home environment at {teamB.stadium}</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Tactical Recommendations & AI Report */}
        <div className="space-y-8">
          <section className="glass rounded-3xl p-8 bg-brand-amber/5 border border-brand-amber/20">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Target className="text-brand-amber" /> Tactical Adjustments
            </h3>
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] font-mono text-brand-amber uppercase mb-2">Neutralize</p>
                <p className="text-xs text-white/80">Target {teamB.manager.name}'s reliance on wide overloads by doubling up on the flanks.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] font-mono text-brand-green uppercase mb-2">Exploit</p>
                <p className="text-xs text-white/80">Test the {teamB.tactics.defensiveLine} block with direct vertical passes to bypass the midfield press.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] font-mono text-red-400 uppercase mb-2 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Warning
                </p>
                <p className="text-xs text-white/80">Opponent has a {teamB.tactics.transitionSpeed}% success rate in transition. Avoid over-committing fullbacks.</p>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <button 
                onClick={generateAIReport}
                disabled={isGenerating}
                className="w-full py-4 bg-brand-green text-black rounded-xl font-black text-sm hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(0,255,102,0.2)]"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                )}
                {isGenerating ? "ANALYZING TACTICS..." : "GENERATE AI BATTLE REPORT"}
              </button>
              
              <button className="w-full py-3 bg-white/5 text-white/50 rounded-xl font-bold text-xs hover:bg-white/10 transition-colors border border-white/5">
                EXPORT PDF REPORT
              </button>
            </div>
          </section>

          <AnimatePresence>
            {aiReport && (
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="glass rounded-3xl p-8 border border-brand-green/30 bg-brand-green/5"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black uppercase tracking-tighter font-display flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-green" /> AI Intelligence Report
                  </h3>
                  <button 
                    onClick={() => setAiReport(null)}
                    className="text-[10px] font-mono text-white/40 hover:text-white uppercase"
                  >
                    Clear
                  </button>
                </div>
                <div className="prose prose-invert prose-sm max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tighter prose-strong:text-brand-green prose-p:text-white/70 prose-li:text-white/70">
                  <Markdown>{aiReport}</Markdown>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
