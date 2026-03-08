import { MergedTeam } from '@/lib/types';

export function LeagueInfoBar({ teams }: { teams: MergedTeam[] }) {
  const avgPoints = teams.reduce((sum, t) => sum + t.fpts, 0) / Math.max(teams.length, 1);
  const topScore = teams.reduce((max, t) => Math.max(max, t.fpts), 0);

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <InfoBox title="Total Teams" value={teams.length.toString()} />
      <InfoBox title="Average Points For" value={avgPoints.toFixed(2)} />
      <InfoBox title="Best Team Points" value={topScore.toFixed(2)} />
    </div>
  );
}

function InfoBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-panel p-4">
      <p className="text-xs uppercase tracking-wide text-muted">{title}</p>
      <p className="mt-2 font-heading text-2xl text-white">{value}</p>
    </div>
  );
}
