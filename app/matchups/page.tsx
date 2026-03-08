import { ScoreboardCard } from '@/components/ScoreboardCard';
import { SectionHeader } from '@/components/SectionHeader';
import { getMatchups, getMergedTeams, getNFLState } from '@/lib/sleeper';
import { groupMatchups } from '@/lib/utils';

export default async function MatchupsPage({ searchParams }: { searchParams?: { week?: string } }) {
  const state = await getNFLState();
  const week = Number(searchParams?.week ?? state.week);
  const [rosters, teams] = await Promise.all([getMatchups(week), getMergedTeams()]);

  const grouped = groupMatchups(rosters).map((m) => ({
    ...m,
    sides: m.sides.map((s) => ({ ...s, team: teams.find((t) => t.roster_id === s.roster_id) }))
  }));

  return (
    <div>
      <SectionHeader title="Matchups" subtitle={`Week ${week} game center`} action={<div className="text-xs text-muted">Change week with ?week=number</div>} />
      <div className="grid gap-4 md:grid-cols-2">
        {grouped.map((matchup, index) => (
          <ScoreboardCard key={matchup.matchup_id} matchup={matchup} featured={index === 0} />
        ))}
      </div>
    </div>
  );
}
