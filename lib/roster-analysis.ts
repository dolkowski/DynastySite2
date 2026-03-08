import { EnrichedPlayer, PlayerAnalysis, PositionGroupAnalysis, TeamAnalysis } from './types';

function countByPosition(players: EnrichedPlayer[]) {
  return players.reduce<Record<string, number>>((acc, p) => {
    acc[p.position] = (acc[p.position] ?? 0) + 1;
    return acc;
  }, {});
}

export function analyzeRosterStructure(players: EnrichedPlayer[]) {
  const starters = players.filter((p) => p.slot === 'starter');
  const bench = players.filter((p) => p.slot === 'bench');
  const reserve = players.filter((p) => p.slot === 'reserve');
  return { starters, bench, reserve, counts: countByPosition(players) };
}

export function analyzePositionGroups(players: EnrichedPlayer[]): PositionGroupAnalysis[] {
  const counts = countByPosition(players);
  const make = (group: PositionGroupAnalysis['group'], grade: string, summary: string, count: number): PositionGroupAnalysis => ({ group, grade, summary, count });
  const qb = counts.QB ?? 0;
  const rb = counts.RB ?? 0;
  const wr = counts.WR ?? 0;
  const te = counts.TE ?? 0;
  const benchCount = players.filter((p) => p.slot === 'bench').length;

  return [
    make('QB', qb >= 3 ? 'A-' : qb >= 2 ? 'B+' : 'C', qb >= 3 ? 'Deep quarterback room with flexibility.' : 'Quarterback depth is moderate.', qb),
    make('RB', rb >= 5 ? 'A' : rb >= 3 ? 'B' : 'C-', rb >= 5 ? 'Solid running back pipeline.' : 'Running back depth could be improved.', rb),
    make('WR', wr >= 6 ? 'A' : wr >= 4 ? 'B+' : 'C', wr >= 6 ? 'Wide receiver group has strong long-term insulation.' : 'Wide receiver room is playable but thin.', wr),
    make('TE', te >= 2 ? 'B' : 'C-', te >= 2 ? 'Tight end position has usable options.' : 'Tight end is a structural weak point.', te),
    make('FLEX', rb + wr >= 9 ? 'A-' : 'B-', rb + wr >= 9 ? 'FLEX depth supports matchup-based optimization.' : 'FLEX depth is serviceable but volatile.', rb + wr),
    make('BENCH', benchCount >= 8 ? 'A' : benchCount >= 5 ? 'B' : 'C', benchCount >= 8 ? 'Bench is deep and trade-flexible.' : 'Bench depth is somewhat fragile.', benchCount)
  ];
}

export function getRosterStrengthScore(players: EnrichedPlayer[]) {
  const counts = countByPosition(players);
  const youthBonus = players.filter((p) => (p.age ?? 30) <= 25 && (p.position === 'WR' || p.position === 'QB')).length;
  const starterCount = players.filter((p) => p.slot === 'starter').length;
  return Math.min(100, 45 + starterCount * 2 + (counts.QB ?? 0) * 3 + (counts.WR ?? 0) * 2 + youthBonus);
}

export function generateTeamDirectionTag(players: EnrichedPlayer[]): TeamAnalysis['direction'] {
  const score = getRosterStrengthScore(players);
  const avgAge = players.reduce((sum, p) => sum + (p.age ?? 27), 0) / Math.max(players.length, 1);
  if (score >= 72 && avgAge >= 26) return 'contend now';
  if (score >= 70) return 'buy';
  if (score <= 58 && avgAge <= 25.5) return 'rebuild';
  if (score <= 60) return 'sell';
  return 'hold';
}

export function generateMockPlayerAnalysis(player: EnrichedPlayer): PlayerAnalysis {
  const isYoung = (player.age ?? 30) <= 24;
  const label: PlayerAnalysis['label'] =
    player.slot === 'starter'
      ? player.position === 'QB' || player.position === 'WR'
        ? 'starter'
        : 'depth'
      : isYoung
        ? 'stash'
        : player.position === 'RB'
          ? 'handcuff'
          : 'upside bench piece';

  return {
    label,
    outlook: `${player.full_name} projects as a ${player.slot === 'starter' ? 'weekly lineup piece' : 'situational asset'} in this build.`,
    upside: isYoung ? 'Age-adjusted growth runway supports value appreciation.' : 'Can deliver short-term scoring spikes in favorable spots.',
    risk: player.injury_status ? `Health concern noted: ${player.injury_status}.` : 'Role volatility and weekly usage can swing outcomes.',
    dynastyAngle: isYoung ? 'Long-term hold candidate with developmental upside.' : 'Value likely tied to current production window.',
    teamRole: player.slot === 'starter' ? 'Core lineup contributor.' : player.slot === 'bench' ? 'Depth and matchup utility.' : 'Reserve stash with contingency value.'
  };
}

export function generateMockTeamSummary(teamName: string, players: EnrichedPlayer[]): TeamAnalysis {
  const groups = analyzePositionGroups(players);
  const direction = generateTeamDirectionTag(players);
  const score = getRosterStrengthScore(players);
  const wrYoung = players.filter((p) => p.position === 'WR' && (p.age ?? 30) <= 25).length;
  const rbOld = players.filter((p) => p.position === 'RB' && (p.age ?? 25) >= 27).length;

  const strengths = [
    groups.find((g) => g.group === 'QB')?.summary ?? 'Quarterback room remains stable.',
    groups.find((g) => g.group === 'WR')?.summary ?? 'Wide receiver room has useful structure.'
  ];

  const weaknesses = [
    groups.find((g) => g.group === 'TE')?.summary ?? 'Tight end room lacks certainty.',
    groups.find((g) => g.group === 'BENCH')?.summary ?? 'Bench depth is a concern.'
  ];

  return {
    teamSummary: `${teamName} profiles as a ${direction} roster with a strength score of ${score}. ${wrYoung >= 3 ? 'Young WR depth supports long-term upside.' : ''} ${rbOld >= 3 ? 'RB core skews older, increasing fragility.' : ''}`.trim(),
    direction,
    strengths,
    weaknesses,
    xFactor: players.find((p) => p.position === 'QB' && p.slot === 'starter')?.full_name ?? 'Quarterback stability',
    bestAsset: players.find((p) => p.slot === 'starter')?.full_name ?? 'Top starter',
    sleeper: players.find((p) => p.slot !== 'starter' && (p.age ?? 99) <= 24)?.full_name ?? 'Bench upside candidate',
    needs: [groups.find((g) => g.grade.startsWith('C'))?.group ?? 'RB', groups.find((g) => g.group === 'TE')?.grade.startsWith('C') ? 'TE' : 'Depth'],
    positionGroups: groups,
    strengthScore: score
  };
}
