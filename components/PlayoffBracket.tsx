import { SleeperBracketMatch } from '@/lib/types';

export function PlayoffBracket({ title, matches }: { title: string; matches: SleeperBracketMatch[] }) {
  const grouped = matches.reduce<Record<number, SleeperBracketMatch[]>>((acc, match) => {
    acc[match.r] = [...(acc[match.r] ?? []), match];
    return acc;
  }, {});

  return (
    <section className="rounded-xl border border-border bg-panel p-4">
      <h3 className="font-heading text-2xl uppercase text-white">{title}</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {Object.entries(grouped)
          .sort((a, b) => Number(a[0]) - Number(b[0]))
          .map(([round, roundMatches]) => (
            <div key={round} className="rounded-lg border border-border bg-panelAlt p-3">
              <p className="text-xs uppercase tracking-wide text-muted">Round {round}</p>
              <div className="mt-2 space-y-2">
                {roundMatches.map((m) => (
                  <div key={m.m} className="rounded-md border border-border px-2 py-1 text-sm text-gray-200">
                    <p>Match {m.m}: #{m.t1 ?? '--'} vs #{m.t2 ?? '--'}</p>
                    <p className="text-xs text-muted">Winner: #{m.w ?? '--'}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
