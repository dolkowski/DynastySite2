import { MergedTeam } from '@/lib/types';
import { formatPoints, formatRecord } from '@/lib/utils';
import { RankBadge } from './RankBadge';

export function StandingsTable({ teams }: { teams: MergedTeam[] }) {
  return (
    <div className="card overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-panelAlt text-xs uppercase tracking-wider text-muted">
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
            <tr key={team.roster_id} className="border-t border-line/80">
              <td className="px-4 py-3"><RankBadge rank={team.rank ?? 0} /></td>
              <td className="px-4 py-3 font-semibold">{team.team_name}</td>
              <td className="px-4 py-3 text-muted">{formatRecord(team)}</td>
              <td className="px-4 py-3">{formatPoints(team.fpts)}</td>
              <td className="px-4 py-3 text-muted">{formatPoints(team.fpts_against)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
