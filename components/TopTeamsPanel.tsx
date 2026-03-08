import { MergedTeam } from '@/lib/types';
import { formatRecord } from '@/lib/utils';

export function TopTeamsPanel({ teams }: { teams: MergedTeam[] }) {
  return (
    <div className="card p-4">
      <h3 className="font-display text-xl font-bold uppercase">Power Rankings</h3>
      <div className="mt-3 space-y-2">
        {teams.slice(0, 5).map((team) => (
          <div key={team.roster_id} className="flex items-center justify-between rounded-xl border border-line bg-panelAlt p-3">
            <div>
              <p className="text-xs text-muted">#{team.rank} · {formatRecord(team)}</p>
              <p className="font-semibold">{team.team_name}</p>
            </div>
            <p className="font-display text-2xl font-black text-brand">{team.fpts.toFixed(1)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
