import { MergedTeam } from '@/lib/types';
import { formatPoints, formatRecord } from '@/lib/utils';
import { RankBadge } from './RankBadge';

export function StandingsTable({ teams }: { teams: MergedTeam[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-panel">
      <table className="w-full text-left text-sm">
        <thead className="bg-panelAlt text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">Team</th>
            <th className="px-4 py-3">Record</th>
            <th className="px-4 py-3">PF</th>
            <th className="px-4 py-3">PA</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.roster_id} className="border-t border-border/70 hover:bg-panelAlt/70">
              <td className="px-4 py-3"><RankBadge rank={team.rank} /></td>
              <td className="px-4 py-3 font-semibold text-white">{team.team_name}</td>
              <td className="px-4 py-3 text-gray-200">{formatRecord(team)}</td>
              <td className="px-4 py-3 text-gray-200">{formatPoints(team.fpts)}</td>
              <td className="px-4 py-3 text-gray-200">{formatPoints(team.fpts_against)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
