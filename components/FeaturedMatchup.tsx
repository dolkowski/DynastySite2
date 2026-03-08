import { EnrichedMatchup } from '@/lib/types';
import { formatPoints } from '@/lib/utils';

export function FeaturedMatchup({ matchup }: { matchup?: EnrichedMatchup }) {
  if (!matchup) return null;
  const [a, b] = matchup.teams;
  if (!a || !b) return null;

  const aPts = a.roster.points ?? 0;
  const bPts = b.roster.points ?? 0;
  const winnerA = aPts >= bPts;

  return (
    <article className="rounded-xl border border-accent/40 bg-panel p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">Featured Matchup</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Side name={a.mergedTeam?.team_name ?? `Roster ${a.roster.roster_id}`} points={formatPoints(a.roster.points)} winner={winnerA} />
        <Side name={b.mergedTeam?.team_name ?? `Roster ${b.roster.roster_id}`} points={formatPoints(b.roster.points)} winner={!winnerA} />
      </div>
    </article>
  );
}

function Side({ name, points, winner }: { name: string; points: string; winner: boolean }) {
  return (
    <div className={`rounded-lg border p-4 ${winner ? 'border-good/50 bg-good/10' : 'border-border bg-panelAlt'}`}>
      <p className="text-sm text-muted">{winner ? 'Leading' : 'Chasing'}</p>
      <p className="mt-1 text-lg font-bold text-white">{name}</p>
      <p className="font-heading text-4xl text-white">{points}</p>
    </div>
  );
}
