import Image from 'next/image';
import { MergedTeam, TeamAnalysis } from '@/lib/types';
import { formatRecord, sleeperAvatar } from '@/lib/utils';

export function TeamRosterHeader({ team, analysis }: { team: MergedTeam; analysis: TeamAnalysis }) {
  return (
    <section className="rounded-2xl border border-border bg-panel p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Image src={sleeperAvatar(team.avatar)} alt={team.team_name} width={72} height={72} className="rounded-xl border border-border" />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Roster Intelligence</p>
            <h1 className="font-heading text-4xl uppercase text-white">{team.team_name}</h1>
            <p className="text-sm text-muted">Owner: {team.display_name} • Record: {formatRecord(team)}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-muted">Direction</p>
          <p className="font-heading text-2xl text-accent">{analysis.direction}</p>
          <p className="text-sm text-muted">Strength score: {analysis.strengthScore}</p>
        </div>
      </div>
    </section>
  );
}
