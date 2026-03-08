import { GroupedMatchup } from '@/lib/types';
import { getWinnerRosterId } from '@/lib/utils';

interface FeaturedMatchupProps {
  matchup?: GroupedMatchup;
}

export function FeaturedMatchup({ matchup }: FeaturedMatchupProps) {
  if (!matchup) return null;
  const winner = getWinnerRosterId(matchup);

  return (
    <section className="card card-hover mb-8 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-brand">Featured Matchup</p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {matchup.sides.map((side) => (
          <div key={side.roster_id} className={`rounded-xl border p-4 ${winner === side.roster_id ? 'border-success/50 bg-success/10' : 'border-line bg-panelAlt'}`}>
            <p className="text-xs text-muted">{side.team?.display_name}</p>
            <h3 className="font-display text-2xl font-bold uppercase">{side.team?.team_name}</h3>
            <p className="mt-2 text-4xl font-black">{side.points.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
