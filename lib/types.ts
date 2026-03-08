export interface League {
  league_id: string;
  name: string;
  season: string;
  total_rosters: number;
  avatar?: string | null;
  status?: string;
}

export interface User {
  user_id: string;
  display_name: string;
  avatar?: string | null;
  metadata?: {
    team_name?: string;
  };
}

export interface RosterSettings {
  wins: number;
  losses: number;
  ties: number;
  fpts: number;
  fpts_decimal?: number;
  fpts_against: number;
  fpts_against_decimal?: number;
  waiver_position?: number;
  faab?: number;
}

export interface Roster {
  roster_id: number;
  owner_id?: string;
  settings: RosterSettings;
  starters: string[];
  players: string[];
  matchup_id?: number;
  points?: number;
}

export interface NFLState {
  week: number;
  season: string;
  display_week?: number;
  leg?: number;
  season_type?: string;
}

export interface Transaction {
  transaction_id: string;
  type: 'trade' | 'free_agent' | 'waiver';
  status_updated: number;
  adds?: Record<string, number>;
  drops?: Record<string, number>;
  consenter_ids?: number[];
  creator?: string;
}

export interface BracketMatch {
  r: number;
  m: number;
  t1?: number | null;
  t2?: number | null;
  w?: number | null;
  l?: number | null;
}

export interface MergedTeam {
  roster_id: number;
  owner_id: string;
  display_name: string;
  team_name: string;
  avatar: string | null;
  wins: number;
  losses: number;
  ties: number;
  fpts: number;
  fpts_against: number;
  waiver_position: number;
  faab: number;
  starters: string[];
  players: string[];
  rank?: number;
  trend?: 'up' | 'down' | 'flat';
}

export interface MatchupSide {
  roster_id: number;
  matchup_id: number;
  points: number;
  starters: string[];
  bench: string[];
  team?: MergedTeam;
}

export interface GroupedMatchup {
  matchup_id: number;
  sides: MatchupSide[];
}
