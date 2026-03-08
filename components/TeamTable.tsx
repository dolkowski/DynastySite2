import { MergedTeam } from '@/lib/types';
import { formatPoints, formatRecord } from '@/lib/utils';

export function TeamTable({ teams }: { teams: MergedTeam[] }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-panelAlt text-xs uppercase text-muted">
          <tr>
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">Team</th>
            <th className="px-4 py-3">Owner</th>
            <th className="px-4 py-3">Record</th>
            <th className="px-4 py-3">PF</th>
            <th className="px-4 py-3">PA</th>
            <th className="px-4 py-3">Waiver</th>
            <th className="px-4 py-3">FAAB</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.roster_id} className="border-t border-line">
              <td className="px-4 py-3">#{team.rank}</td>
              <td className="px-4 py-3 font-semibold">{team.team_name}</td>
              <td className="px-4 py-3 text-muted">{team.display_name}</td>
              <td className="px-4 py-3">{formatRecord(team)}</td>
              <td className="px-4 py-3">{formatPoints(team.fpts)}</td>
              <td className="px-4 py-3">{formatPoints(team.fpts_against)}</td>
              <td className="px-4 py-3">{team.waiver_position}</td>
              <td className="px-4 py-3">${team.faab}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
