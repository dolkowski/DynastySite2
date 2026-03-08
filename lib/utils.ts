import { format } from 'date-fns';
import { MergedTeam } from './types';

export const LEAGUE_ID = '1312605770595995648';

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function formatRecord(team: Pick<MergedTeam, 'wins' | 'losses' | 'ties'>) {
  return `${team.wins}-${team.losses}${team.ties ? `-${team.ties}` : ''}`;
}

export function formatPoints(points?: number) {
  if (typeof points !== 'number') return '--';
  return points.toFixed(2);
}

export function formatTimestamp(ts?: number) {
  if (!ts) return 'Unknown time';
  return format(new Date(ts), 'EEE, MMM d • h:mm a');
}

export function sleeperAvatar(avatar?: string) {
  if (!avatar) return '/team-placeholder.svg';
  return `https://sleepercdn.com/avatars/thumbs/${avatar}`;
}

export function sortTeamsByStandings(teams: Omit<MergedTeam, 'rank'>[]): MergedTeam[] {
  return [...teams]
    .sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      if (a.losses !== b.losses) return a.losses - b.losses;
      return b.fpts - a.fpts;
    })
    .map((team, index) => ({ ...team, rank: index + 1 }));
}
