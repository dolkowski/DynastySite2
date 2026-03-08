import { EnrichedPlayer, SleeperPlayer } from './types';

const fantasyOrder = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'];

export function mapRosterPlayerIdsToPlayers(playerIds: string[], playersById: Record<string, SleeperPlayer>) {
  return playerIds.map((id) => playersById[id]).filter(Boolean);
}

export function getStarterPlayers(players: EnrichedPlayer[]) {
  return players.filter((p) => p.slot === 'starter');
}

export function getBenchPlayers(players: EnrichedPlayer[]) {
  return players.filter((p) => p.slot === 'bench');
}

export function getReservePlayers(players: EnrichedPlayer[]) {
  return players.filter((p) => p.slot === 'reserve');
}

export function groupPlayersByPosition(players: EnrichedPlayer[]) {
  return players.reduce<Record<string, EnrichedPlayer[]>>((acc, player) => {
    const key = player.position || 'UNKNOWN';
    acc[key] = [...(acc[key] ?? []), player];
    return acc;
  }, {});
}

export function getPlayerHeadshotUrl(player: SleeperPlayer) {
  if (player.espn_id) return `https://a.espncdn.com/i/headshots/nfl/players/full/${player.espn_id}.png`;
  return '/team-placeholder.svg';
}

export function getTeamAbbreviation(player: SleeperPlayer) {
  return player.team ?? 'FA';
}

export function getPlayerAgeEstimate(player: SleeperPlayer) {
  if (!player.birth_date) return undefined;
  const born = new Date(player.birth_date);
  const age = Math.floor((Date.now() - born.getTime()) / (365.25 * 24 * 3600 * 1000));
  return Number.isFinite(age) ? age : undefined;
}

export function buildPlayerDisplayData(player: SleeperPlayer | undefined, slot: EnrichedPlayer['slot']): EnrichedPlayer {
  const fullName = player?.full_name || [player?.first_name, player?.last_name].filter(Boolean).join(' ') || 'Unknown Player';
  return {
    player_id: player?.player_id ?? 'unknown',
    full_name: fullName,
    first_name: player?.first_name,
    last_name: player?.last_name,
    position: player?.position ?? 'UNK',
    fantasy_positions: player?.fantasy_positions ?? (player?.position ? [player.position] : []),
    team: getTeamAbbreviation(player ?? { player_id: 'unknown' }),
    number: player?.number,
    birth_date: player?.birth_date,
    age: player ? getPlayerAgeEstimate(player) : undefined,
    years_exp: player?.years_exp,
    status: player?.status,
    injury_status: player?.injury_status,
    injury_notes: player?.injury_notes,
    depth_chart_position: player?.depth_chart_position,
    search_rank: player?.search_rank,
    hashtag: player?.hashtag,
    sport: player?.sport,
    active: player?.active,
    rookie_year: player?.rookie_year,
    fantasy_data_id: player?.fantasy_data_id,
    espn_id: player?.espn_id,
    headshot_url: player ? getPlayerHeadshotUrl(player) : '/team-placeholder.svg',
    slot
  };
}

export function sortPlayersByFantasyImportance(players: EnrichedPlayer[]) {
  return [...players].sort((a, b) => {
    const aPos = fantasyOrder.indexOf(a.position);
    const bPos = fantasyOrder.indexOf(b.position);
    const aRank = aPos === -1 ? 99 : aPos;
    const bRank = bPos === -1 ? 99 : bPos;
    if (aRank !== bRank) return aRank - bRank;
    return (a.search_rank ?? 999999) - (b.search_rank ?? 999999);
  });
}
