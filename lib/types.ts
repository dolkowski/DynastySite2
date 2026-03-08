export interface SleeperLeague {
  league_id: string;
  name: string;
  season: string;
  total_rosters: number;
  avatar?: string;
  status: string;
  sport: string;
  settings?: {
    leg?: number;
    playoff_week_start?: number;
  };
  roster_positions?: string[];
}

export interface SleeperUser {
  user_id: string;
  display_name: string;
  avatar?: string;
  metadata?: {
    team_name?: string;
  };
}

export interface SleeperRoster {
  roster_id: number;
  owner_id?: string;
  matchup_id?: number;
  settings: {
    wins: number;
    losses: number;
    ties?: number;
    fpts: number;
    fpts_against: number;
    waiver_position?: number;
    waiver_budget_used?: number;
  };
  starters: string[];
  players: string[];
  reserve?: string[];
  taxi?: string[];
  points?: number;
}

export interface SleeperState {
  week: number;
  season_type: string;
  season: string;
  leg: number;
}

export interface SleeperTransaction {
  transaction_id: string;
  type: 'waiver' | 'trade' | 'free_agent' | string;
  status: string;
  created: number;
  roster_ids: number[];
  adds?: Record<string, number>;
  drops?: Record<string, number>;
}

export interface SleeperBracketMatch {
  r: number;
  m: number;
  t1?: number;
  t2?: number;
  w?: number;
  l?: number;
}

export interface SleeperPlayer {
  player_id: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  position?: string;
  fantasy_positions?: string[];
  team?: string;
  number?: number;
  birth_date?: string;
  years_exp?: number;
  status?: string;
  injury_status?: string;
  injury_notes?: string;
  depth_chart_position?: string;
  search_rank?: number;
  hashtag?: string;
  sport?: string;
  active?: boolean;
  rookie_year?: number;
  fantasy_data_id?: number;
  espn_id?: string;
}

export interface MergedTeam {
  roster_id: number;
  owner_id?: string;
  display_name: string;
  team_name: string;
  avatar?: string;
  wins: number;
  losses: number;
  ties: number;
  fpts: number;
  fpts_against: number;
  waiver_position?: number;
  faab?: number;
  starters: string[];
  players: string[];
  reserve: string[];
  taxi: string[];
  rank: number;
}

export interface PlayerAnalysis {
  label: 'cornerstone' | 'starter' | 'depth' | 'stash' | 'trade chip' | 'sell-high candidate' | 'handcuff' | 'upside bench piece';
  outlook: string;
  upside: string;
  risk: string;
  dynastyAngle: string;
  teamRole: string;
}

export interface EnrichedPlayer {
  player_id: string;
  full_name: string;
  first_name?: string;
  last_name?: string;
  position: string;
  fantasy_positions: string[];
  team?: string;
  number?: number;
  birth_date?: string;
  age?: number;
  years_exp?: number;
  status?: string;
  injury_status?: string;
  injury_notes?: string;
  depth_chart_position?: string;
  search_rank?: number;
  hashtag?: string;
  sport?: string;
  active?: boolean;
  rookie_year?: number;
  fantasy_data_id?: number;
  espn_id?: string;
  headshot_url?: string;
  slot: 'starter' | 'bench' | 'reserve';
  analysis?: PlayerAnalysis;
}

export interface PositionGroupAnalysis {
  group: 'QB' | 'RB' | 'WR' | 'TE' | 'FLEX' | 'BENCH';
  grade: string;
  summary: string;
  count: number;
}

export interface TeamAnalysis {
  teamSummary: string;
  direction: 'buy' | 'sell' | 'hold' | 'rebuild' | 'contend now';
  strengths: string[];
  weaknesses: string[];
  xFactor: string;
  bestAsset: string;
  sleeper: string;
  needs: string[];
  positionGroups: PositionGroupAnalysis[];
  strengthScore: number;
}

export interface TeamDetailData {
  team: MergedTeam;
  players: EnrichedPlayer[];
  starters: EnrichedPlayer[];
  bench: EnrichedPlayer[];
  reserve: EnrichedPlayer[];
  groupedByPosition: Record<string, EnrichedPlayer[]>;
  analysis: TeamAnalysis;
}
