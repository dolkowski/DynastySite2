import { notFound } from 'next/navigation';
import { PlayerAnalysisCard } from '@/components/PlayerAnalysisCard';
import { RosterCompositionChart } from '@/components/RosterCompositionChart';
import { RosterPositionGroup } from '@/components/RosterPositionGroup';
import { SectionHeader } from '@/components/SectionHeader';
import { TeamAnalysisPanel } from '@/components/TeamAnalysisPanel';
import { TeamRosterHeader } from '@/components/TeamRosterHeader';
import { getPlayerAnalysis, getTeamAnalysis } from '@/lib/ai';
import { mapRosterPlayerIdsToPlayers, buildPlayerDisplayData, sortPlayersByFantasyImportance, groupPlayersByPosition } from '@/lib/player-utils';
import { analyzeRosterStructure } from '@/lib/roster-analysis';
import { getLeague, getPlayers, getTeamByRosterId } from '@/lib/sleeper';
import { formatRecord } from '@/lib/utils';

export default async function TeamRosterPage({ params }: { params: { rosterId: string } }) {
  const rosterId = Number(params.rosterId);
  const [league, team, playersById] = await Promise.all([getLeague(), getTeamByRosterId(rosterId), getPlayers()]);

  if (!team) notFound();

  const startersRaw = mapRosterPlayerIdsToPlayers(team.starters, playersById);
  const reserveIds = new Set([...(team.reserve ?? []), ...(team.taxi ?? [])]);
  const rosterRaw = mapRosterPlayerIdsToPlayers(team.players, playersById);

  const starters = startersRaw.map((p) => buildPlayerDisplayData(p, 'starter'));
  const others = rosterRaw
    .filter((p) => !team.starters.includes(p.player_id))
    .map((p) => buildPlayerDisplayData(p, reserveIds.has(p.player_id) ? 'reserve' : 'bench'));

  let allPlayers = sortPlayersByFantasyImportance([...starters, ...others]);

  allPlayers = await Promise.all(
    allPlayers.map(async (player) => ({
      ...player,
      analysis: await getPlayerAnalysis({ leagueName: league.name, teamName: team.team_name, player })
    }))
  );

  const groupedByPosition = groupPlayersByPosition(allPlayers);
  const teamAnalysis = await getTeamAnalysis({
    leagueName: league.name,
    rosterFormat: league.roster_positions,
    teamName: team.team_name,
    record: formatRecord(team),
    rank: team.rank,
    groupedPlayers: groupedByPosition,
    players: allPlayers
  });

  const structure = analyzeRosterStructure(allPlayers);

  return (
    <div className="space-y-6">
      <TeamRosterHeader team={team} analysis={teamAnalysis} />
      <TeamAnalysisPanel analysis={teamAnalysis} />

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-panel p-4">
          <p className="text-xs uppercase tracking-wide text-muted">Record</p>
          <p className="font-heading text-3xl text-white">{formatRecord(team)}</p>
          <p className="mt-3 text-xs text-muted">Roster counts</p>
          <p className="text-sm text-gray-300">Starters: {structure.starters.length} • Bench: {structure.bench.length} • Reserve: {structure.reserve.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-panel p-4">
          <p className="text-xs uppercase tracking-wide text-muted">Needs</p>
          <p className="mt-2 text-sm text-gray-200">{teamAnalysis.needs.join(', ')}</p>
        </div>
        <RosterCompositionChart counts={structure.counts} />
      </section>

      <section>
        <SectionHeader title="Position Rooms" subtitle="Grouped roster construction" />
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(groupedByPosition).map(([pos, players]) => (
            <RosterPositionGroup
              key={pos}
              position={pos}
              players={players}
              analysis={teamAnalysis.positionGroups.find((group) => group.group === pos || (pos === 'WR' && group.group === 'FLEX'))}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Player Intelligence" subtitle="Mock AI blurbs per player" />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {allPlayers.map((player) => (
            <PlayerAnalysisCard key={`${player.player_id}-${player.slot}`} player={player} />
          ))}
        </div>
      </section>
    </div>
  );
}
