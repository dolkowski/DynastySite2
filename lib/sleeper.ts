import { LEAGUE_ID, sortTeamsByStandings } from './utils';
import {
  MergedTeam,
  SleeperBracketMatch,
  SleeperLeague,
  SleeperPlayer,
  SleeperRoster,
  SleeperState,
  SleeperTransaction,
  SleeperUser
} from './types';

const BASE = `https://api.sleeper.app/v1/league/${LEAGUE_ID}`;
const LEAGUE_REVALIDATE = 60;
const PLAYERS_REVALIDATE = 60 * 60 * 24;

async function sleeperFetch<T>(url: string, revalidate = LEAGUE_REVALIDATE): Promise<T> {
  const response = await fetch(url, { next: { revalidate } });
  if (!response.ok) {
    throw new Error(`Sleeper API failed (${response.status}) for ${url}`);
  }
  return response.json() as Promise<T>;
}

export async function getLeague() {
  return sleeperFetch<SleeperLeague>(BASE);
}

export async function getUsers() {
  return sleeperFetch<SleeperUser[]>(`${BASE}/users`);
}

export async function getRosters() {
  return sleeperFetch<SleeperRoster[]>(`${BASE}/rosters`);
}

export async function getPlayers() {
  return sleeperFetch<Record<string, SleeperPlayer>>('https://api.sleeper.app/v1/players/nfl', PLAYERS_REVALIDATE);
}

export async function getNFLState() {
  return sleeperFetch<SleeperState>('https://api.sleeper.app/v1/state/nfl');
}

export async function getMatchups(week: number) {
  return sleeperFetch<SleeperRoster[]>(`${BASE}/matchups/${week}`);
}

export async function getTransactions(round: number) {
  return sleeperFetch<SleeperTransaction[]>(`${BASE}/transactions/${round}`);
}

export async function getWinnersBracket() {
  return sleeperFetch<SleeperBracketMatch[]>(`${BASE}/winners_bracket`);
}

export async function getLosersBracket() {
  return sleeperFetch<SleeperBracketMatch[]>(`${BASE}/losers_bracket`);
}

export async function getMergedTeams(): Promise<MergedTeam[]> {
  const [users, rosters] = await Promise.all([getUsers(), getRosters()]);
  const usersById = new Map(users.map((u) => [u.user_id, u]));

  const merged = rosters.map((roster) => {
    const user = roster.owner_id ? usersById.get(roster.owner_id) : undefined;
    const displayName = user?.display_name ?? `Roster ${roster.roster_id}`;

    return {
      roster_id: roster.roster_id,
      owner_id: roster.owner_id,
      display_name: displayName,
      team_name: user?.metadata?.team_name || displayName,
      avatar: user?.avatar,
      wins: roster.settings.wins,
      losses: roster.settings.losses,
      ties: roster.settings.ties ?? 0,
      fpts: roster.settings.fpts,
      fpts_against: roster.settings.fpts_against,
      waiver_position: roster.settings.waiver_position,
      faab: roster.settings.waiver_budget_used,
      starters: roster.starters ?? [],
      players: roster.players ?? [],
      reserve: roster.reserve ?? [],
      taxi: roster.taxi ?? [],
      rank: 0
    };
  });

  return sortTeamsByStandings(merged);
}

export async function getTeamByRosterId(rosterId: number) {
  const teams = await getMergedTeams();
  return teams.find((team) => team.roster_id === rosterId);
}
