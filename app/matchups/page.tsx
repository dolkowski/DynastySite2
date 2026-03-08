import { ScoreboardCard } from '@/components/ScoreboardCard';
import { SectionHeader } from '@/components/SectionHeader';
import { getEnrichedMatchups, getNFLState } from '@/lib/sleeper';

export default async function MatchupsPage({
  searchParams
}: {
  searchParams: { week?: string };
}) {
  const state = await getNFLState();
  const week = Number(searchParams.week ?? state.week);
  const matchups = await getEnrichedMatchups(week);

  const featured = [...matchups].sort((a, b) => {
    const aDiff = Math.abs((a.teams[0]?.roster.points ?? 0) - (a.teams[1]?.roster.points ?? 0));
    const bDiff = Math.abs((b.teams[0]?.roster.points ?? 0) - (b.teams[1]?.roster.points ?? 0));
    return aDiff - bDiff;
  })[0];

  return (
    <div className="space-y-6">
      <SectionHeader title={`Week ${week} Scoreboard`} subtitle="Live game center" />
      <div className="grid gap-4 md:grid-cols-2">
        {matchups.map((matchup) => (
          <ScoreboardCard key={matchup.matchup_id} matchup={matchup} featured={featured?.matchup_id === matchup.matchup_id} />
        ))}
      </div>
    </div>
  );
}
