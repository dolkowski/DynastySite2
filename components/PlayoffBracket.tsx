import { BracketMatch, MergedTeam } from '@/lib/types';

function teamLabel(rosterId: number | null | undefined, teams: MergedTeam[]) {
  if (!rosterId) return 'TBD';
  return teams.find((t) => t.roster_id === rosterId)?.team_name ?? `Roster ${rosterId}`;
}

export function PlayoffBracket({ title, matches, teams }: { title: string; matches: BracketMatch[]; teams: MergedTeam[] }) {
  const grouped = matches.reduce<Record<number, BracketMatch[]>>((acc, m) => {
    acc[m.r] = [...(acc[m.r] ?? []), m];
    return acc;
  }, {});

  return (
    <section className="card p-4">
      <h3 className="font-display text-2xl font-bold uppercase">{title}</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {Object.entries(grouped).map(([round, roundMatches]) => (
          <div key={round} className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-muted">Round {round}</p>
            {roundMatches.map((match) => (
              <div key={`${match.r}-${match.m}`} className="rounded-xl border border-line bg-panelAlt p-3">
                <p className="text-sm">{teamLabel(match.t1, teams)}</p>
                <p className="text-sm">{teamLabel(match.t2, teams)}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
