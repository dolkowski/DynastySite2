import Image from 'next/image';
import { SleeperLeague, SleeperState } from '@/lib/types';
import { sleeperAvatar } from '@/lib/utils';
import { StatPill } from './StatPill';

export function LeagueHero({ league, state }: { league: SleeperLeague; state: SleeperState }) {
  return (
    <section className="rounded-2xl border border-border bg-hero bg-panel p-6 shadow-glow md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Image src={sleeperAvatar(league.avatar)} alt={league.name} width={64} height={64} className="rounded-xl border border-border" />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Fantasy League Hub</p>
            <h1 className="font-heading text-4xl uppercase text-white md:text-5xl">{league.name}</h1>
            <p className="text-sm text-muted">Season {league.season} • {league.total_rosters} Teams</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatPill label="NFL Week" value={state.week} />
          <StatPill label="League" value={league.status} tone="good" />
          <StatPill label="Season Type" value={state.season_type} />
        </div>
      </div>
    </section>
  );
}
