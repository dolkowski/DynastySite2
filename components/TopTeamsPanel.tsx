import { MergedTeam } from '@/lib/types';
import { formatPoints, formatRecord } from '@/lib/utils';

export function TopTeamsPanel({ teams }: { teams: MergedTeam[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {teams.slice(0, 3).map((team) => (
        <div key={team.roster_id} className="rounded-xl border border-border bg-panel p-4">
          <p className="text-xs uppercase tracking-wide text-muted">Rank #{team.rank}</p>
          <h3 className="mt-1 font-heading text-2xl text-white">{team.team_name}</h3>
          <p className="text-sm text-gray-200">{formatRecord(team)}</p>
          <p className="mt-2 text-xs text-muted">Points For</p>
          <p className="text-lg font-bold text-white">{formatPoints(team.fpts)}</p>
        </div>
      ))}
    </div>
  );
}
