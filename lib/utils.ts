import { GroupedMatchup, MergedTeam, Roster } from './types';

export const LEAGUE_ID = '1312605770595995648';

export const formatRecord = (team: Pick<MergedTeam, 'wins' | 'losses' | 'ties'>) =>
  `${team.wins}-${team.losses}${team.ties ? `-${team.ties}` : ''}`;

export const formatPoints = (value: number) => value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const formatTimestamp = (timestamp: number) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(timestamp));

export const avatarUrl = (avatar?: string | null) =>
  avatar ? `https://sleepercdn.com/avatars/thumbs/${avatar}` : null;

export const standingsSort = (a: MergedTeam, b: MergedTeam) => {
  const winPctA = (a.wins + a.ties * 0.5) / Math.max(a.wins + a.losses + a.ties, 1);
  const winPctB = (b.wins + b.ties * 0.5) / Math.max(b.wins + b.losses + b.ties, 1);
  if (winPctA !== winPctB) return winPctB - winPctA;
  return b.fpts - a.fpts;
};

export const groupMatchups = (rosters: Roster[]) => {
  const map = new Map<number, GroupedMatchup>();
  for (const roster of rosters) {
    if (!roster.matchup_id) continue;
    const matchup = map.get(roster.matchup_id) ?? { matchup_id: roster.matchup_id, sides: [] };
    const starters = roster.starters ?? [];
    const allPlayers = roster.players ?? [];
    matchup.sides.push({
      roster_id: roster.roster_id,
      matchup_id: roster.matchup_id,
      points: roster.points ?? 0,
      starters,
      bench: allPlayers.filter((p) => !starters.includes(p))
    });
    map.set(roster.matchup_id, matchup);
  }

  return [...map.values()].sort((a, b) => b.sides.reduce((sum, s) => sum + s.points, 0) - a.sides.reduce((sum, s) => sum + s.points, 0));
};

export const getWinnerRosterId = (matchup: GroupedMatchup) => {
  if (matchup.sides.length < 2) return undefined;
  const [a, b] = matchup.sides;
  if (a.points === b.points) return undefined;
  return a.points > b.points ? a.roster_id : b.roster_id;
};
