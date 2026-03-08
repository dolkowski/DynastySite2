import { GroupedMatchup } from '@/lib/types';
import { getWinnerRosterId } from '@/lib/utils';

export function ScoreboardCard({ matchup, featured = false }: { matchup: GroupedMatchup; featured?: boolean }) {
  const winner = getWinnerRosterId(matchup);

  return (
    <article className={`card card-hover p-4 ${featured ? 'ring-1 ring-brand/60' : ''}`}>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-muted">Game {matchup.matchup_id}</p>
        {featured && <span className="rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Featured Game</span>}
      </div>
      <div className="space-y-2">
        {matchup.sides.map((side) => (
          <div key={side.roster_id} className={`rounded-lg border p-3 ${winner === side.roster_id ? 'border-success/40 bg-success/10' : 'border-line bg-panelAlt'}`}>
            <div className="flex items-center justify-between">
              <p className="font-semibold">{side.team?.team_name ?? `Roster ${side.roster_id}`}</p>
              <p className="font-display text-2xl font-bold">{side.points.toFixed(2)}</p>
            </div>
            <p className="mt-1 text-xs text-muted">Starters: {side.starters.length} · Bench: {side.bench.length}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
