import { BracketMatch, League, MergedTeam, NFLState, Roster, Transaction, User } from './types';
import { LEAGUE_ID, standingsSort } from './utils';

const BASE = 'https://api.sleeper.app/v1';

async function sleeperFetch<T>(path: string, revalidate = 120): Promise<T> {
  const response = await fetch(`${BASE}${path}`, {
    next: { revalidate }
  });

  if (!response.ok) {
    throw new Error(`Sleeper API request failed for ${path}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const getLeague = () => sleeperFetch<League>(`/league/${LEAGUE_ID}`);
export const getUsers = () => sleeperFetch<User[]>(`/league/${LEAGUE_ID}/users`);
export const getRosters = () => sleeperFetch<Roster[]>(`/league/${LEAGUE_ID}/rosters`);
export const getNFLState = () => sleeperFetch<NFLState>('/state/nfl', 60);
export const getMatchups = (week: number) => sleeperFetch<Roster[]>(`/league/${LEAGUE_ID}/matchups/${week}`, 45);
export const getTransactions = (round: number) => sleeperFetch<Transaction[]>(`/league/${LEAGUE_ID}/transactions/${round}`, 45);
export const getWinnersBracket = () => sleeperFetch<BracketMatch[]>(`/league/${LEAGUE_ID}/winners_bracket`, 3600);
export const getLosersBracket = () => sleeperFetch<BracketMatch[]>(`/league/${LEAGUE_ID}/losers_bracket`, 3600);

export async function getMergedTeams(): Promise<MergedTeam[]> {
  const [users, rosters] = await Promise.all([getUsers(), getRosters()]);
  const userMap = new Map(users.map((user) => [user.user_id, user]));

  const teams = rosters.map((roster) => {
    const user = roster.owner_id ? userMap.get(roster.owner_id) : undefined;
    return {
      roster_id: roster.roster_id,
      owner_id: roster.owner_id ?? 'unknown',
      display_name: user?.display_name ?? 'Unknown Owner',
      team_name: user?.metadata?.team_name || user?.display_name || `Roster ${roster.roster_id}`,
      avatar: user?.avatar ?? null,
      wins: roster.settings?.wins ?? 0,
      losses: roster.settings?.losses ?? 0,
      ties: roster.settings?.ties ?? 0,
      fpts: (roster.settings?.fpts ?? 0) + (roster.settings?.fpts_decimal ?? 0) / 100,
      fpts_against: (roster.settings?.fpts_against ?? 0) + (roster.settings?.fpts_against_decimal ?? 0) / 100,
      waiver_position: roster.settings?.waiver_position ?? 0,
      faab: roster.settings?.faab ?? 0,
      starters: roster.starters ?? [],
      players: roster.players ?? []
    } as MergedTeam;
  });

  const sorted = teams.sort(standingsSort).map((team, index) => ({ ...team, rank: index + 1 }));

  return sorted.map((team, index) => {
    const previous = sorted[index - 1];
    const trend = !previous ? 'flat' : team.fpts > previous.fpts ? 'up' : team.fpts < previous.fpts ? 'down' : 'flat';
    return { ...team, trend };
  });
}
