import Link from 'next/link';
import { MergedTeam } from '@/lib/types';
import { formatPoints, formatRecord } from '@/lib/utils';

export function TeamTable({ teams }: { teams: MergedTeam[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-panel">
      <table className="w-full text-sm">
        <thead className="bg-panelAlt text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="px-3 py-2">Rank</th>
            <th className="px-3 py-2 text-left">Team</th>
            <th className="px-3 py-2">Owner</th>
            <th className="px-3 py-2">Record</th>
            <th className="px-3 py-2">PF</th>
            <th className="px-3 py-2">PA</th>
            <th className="px-3 py-2">Waiver</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((t) => (
            <tr key={t.roster_id} className="border-t border-border/70 text-center hover:bg-panelAlt/60">
              <td className="px-3 py-2 text-white">#{t.rank}</td>
              <td className="px-3 py-2 text-left font-semibold text-white"><Link className="hover:text-accent" href={`/teams/${t.roster_id}`}>{t.team_name}</Link></td>
              <td className="px-3 py-2 text-gray-200">{t.display_name}</td>
              <td className="px-3 py-2 text-gray-200">{formatRecord(t)}</td>
              <td className="px-3 py-2 text-gray-200">{formatPoints(t.fpts)}</td>
              <td className="px-3 py-2 text-gray-200">{formatPoints(t.fpts_against)}</td>
              <td className="px-3 py-2 text-gray-200">{t.waiver_position ?? '--'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
