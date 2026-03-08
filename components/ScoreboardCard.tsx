import { EnrichedMatchup } from '@/lib/types';
import { formatPoints } from '@/lib/utils';

export function ScoreboardCard({ matchup, featured = false }: { matchup: EnrichedMatchup; featured?: boolean }) {
  const [a, b] = matchup.teams;
  if (!a || !b) return null;
  const aPts = a.roster.points ?? 0;
  const bPts = b.roster.points ?? 0;

  return (
    <article className={`rounded-xl border p-4 ${featured ? 'border-accent bg-panel shadow-glow' : 'border-border bg-panel'}`}>
      <p className="mb-3 text-xs uppercase tracking-wide text-muted">Matchup #{matchup.matchup_id}</p>
      {[a, b].map((side) => {
        const points = side.roster.points ?? 0;
        const winner = points >= (side === a ? bPts : aPts);
        return (
          <div key={side.roster.roster_id} className={`mb-2 rounded-lg border px-3 py-2 ${winner ? 'border-good/60 bg-good/10' : 'border-border bg-panelAlt'}`}>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-white">{side.mergedTeam?.team_name ?? `Roster ${side.roster.roster_id}`}</p>
              <p className="font-heading text-3xl text-white">{formatPoints(points)}</p>
            </div>
            <p className="text-xs text-muted">Starters: {side.roster.starters.length} • Bench: {side.bench.length}</p>
          </div>
        );
      })}
    </article>
  );
}
