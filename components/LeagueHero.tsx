import Image from 'next/image';
import { League, NFLState } from '@/lib/types';
import { avatarUrl } from '@/lib/utils';
import { StatPill } from './StatPill';

interface LeagueHeroProps {
  league: League;
  state: NFLState;
}

export function LeagueHero({ league, state }: LeagueHeroProps) {
  const image = avatarUrl(league.avatar);

  return (
    <section className="card mb-8 overflow-hidden p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-line bg-panelAlt">
            {image ? <Image src={image} alt={league.name} fill className="object-cover" /> : <div className="flex h-full items-center justify-center text-2xl font-bold text-brand">L</div>}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand">Fantasy Command Center</p>
            <h1 className="font-display text-4xl font-bold uppercase leading-none md:text-5xl">{league.name}</h1>
            <p className="mt-2 text-sm text-muted">Season {league.season} · {league.total_rosters} Teams · Status: {league.status ?? 'In Season'}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatPill label="NFL Week" value={state.week} />
          <StatPill label="Season" value={state.season} />
          <StatPill label="Type" value={state.season_type ?? 'Regular'} />
        </div>
      </div>
    </section>
  );
}
