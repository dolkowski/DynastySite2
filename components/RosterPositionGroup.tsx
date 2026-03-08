import { EnrichedPlayer, PositionGroupAnalysis } from '@/lib/types';

export function RosterPositionGroup({
  position,
  players,
  analysis
}: {
  position: string;
  players: EnrichedPlayer[];
  analysis?: PositionGroupAnalysis;
}) {
  return (
    <section className="rounded-xl border border-border bg-panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-heading text-xl text-white">{position}</h3>
        <span className="rounded-full bg-panelAlt px-3 py-1 text-xs text-muted">{players.length} players</span>
      </div>
      {analysis ? <p className="mb-3 text-sm text-gray-300">{analysis.grade} • {analysis.summary}</p> : null}
      <div className="space-y-2">
        {players.map((player) => (
          <div key={`${position}-${player.player_id}`} className="rounded-lg border border-border bg-panelAlt px-3 py-2">
            <p className="font-semibold text-white">{player.full_name}</p>
            <p className="text-xs text-muted">{player.team} • {player.slot} • EXP {player.years_exp ?? '--'}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
