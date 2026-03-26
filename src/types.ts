export interface Player {
  id: string;
  name: string;
  position: string;
  age: number;
  nationality: string;
  marketValue: string;
  form: number; // 1-10
  status: 'fit' | 'injured' | 'suspended';
  scoutNote?: string;
  isWeakPoint?: boolean;
}

export interface Manager {
  name: string;
  winPercentage: number;
  preferredFormations: string[];
  careerTimeline: { year: string; club: string }[];
  tacticalAnalysis: string;
  quote: string;
}

export interface Club {
  id: string;
  name: string;
  country: string;
  rank: number;
  tier: 'A' | 'B' | 'C';
  titles: number;
  leaguePosition: number;
  lastFive: string[]; // e.g., ['W', 'D', 'W', 'W', 'L']
  nextFixture: string;
  formation: string;
  stadium: string;
  capacity: string;
  manager: Manager;
  squad: Player[];
  tactics: {
    pressing: number; // 1-100
    buildUp: 'direct' | 'positional';
    defensiveLine: 'high' | 'low' | 'medium';
    transitionSpeed: number; // 1-100
  };
}

export interface Country {
  id: string;
  name: string;
  code: string; // ISO code for map
  clubs: string[]; // Club IDs
  performanceSummary: string;
}
