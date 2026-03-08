import Image from 'next/image';
import Link from 'next/link';
import { MergedTeam } from '@/lib/types';
import { formatPoints, formatRecord, sleeperAvatar } from '@/lib/utils';
import { RankBadge } from './RankBadge';

export function TeamCard({ team }: { team: MergedTeam }) {
  return (
    <article className="rounded-xl border border-border bg-panel p-4 transition hover:-translate-y-0.5 hover:border-accent/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={sleeperAvatar(team.avatar)} alt={team.team_name} width={48} height={48} className="rounded-lg border border-border" />
          <div>
            <p className="font-semibold text-white">{team.team_name}</p>
            <p className="text-xs text-muted">Owner: {team.display_name}</p>
          </div>
        </div>
        <RankBadge rank={team.rank} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <Stat label="Record" value={formatRecord(team)} />
        <Stat label="PF" value={formatPoints(team.fpts)} />
        <Stat label="PA" value={formatPoints(team.fpts_against)} />
        <Stat label="Waiver" value={team.waiver_position ?? '--'} />
      </div>
      <Link href={`/teams/${team.roster_id}`} className="mt-4 inline-flex rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white hover:opacity-90">
        View Roster Intelligence
      </Link>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md bg-panelAlt px-2 py-1">
      <p className="text-[10px] uppercase tracking-wide text-muted">{label}</p>
      <p className="font-semibold text-white">{value}</p>
    </div>
  );
}
