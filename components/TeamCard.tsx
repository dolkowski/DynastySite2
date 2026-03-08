import { MergedTeam } from '@/lib/types';
import { formatPoints, formatRecord } from '@/lib/utils';
import { RankBadge } from './RankBadge';

export function TeamCard({ team }: { team: MergedTeam }) {
  return (
    <article className="card card-hover p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted">{team.display_name}</p>
          <h3 className="font-display text-2xl font-bold uppercase">{team.team_name}</h3>
        </div>
        <RankBadge rank={team.rank ?? 0} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <p className="rounded-lg bg-panelAlt p-2 text-muted">Record <span className="ml-1 font-semibold text-white">{formatRecord(team)}</span></p>
        <p className="rounded-lg bg-panelAlt p-2 text-muted">PF <span className="ml-1 font-semibold text-white">{formatPoints(team.fpts)}</span></p>
        <p className="rounded-lg bg-panelAlt p-2 text-muted">PA <span className="ml-1 font-semibold text-white">{formatPoints(team.fpts_against)}</span></p>
        <p className="rounded-lg bg-panelAlt p-2 text-muted">Waiver <span className="ml-1 font-semibold text-white">{team.waiver_position}</span></p>
        <p className="rounded-lg bg-panelAlt p-2 text-muted col-span-2">FAAB <span className="ml-1 font-semibold text-white">${team.faab}</span></p>
      </div>
    </article>
  );
}
