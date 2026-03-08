import Image from 'next/image';
import { EnrichedPlayer } from '@/lib/types';

export function PlayerAnalysisCard({ player }: { player: EnrichedPlayer }) {
  return (
    <article className="rounded-xl border border-border bg-panel p-4">
      <div className="mb-3 flex items-center gap-3">
        <Image src={player.headshot_url ?? '/team-placeholder.svg'} alt={player.full_name} width={52} height={52} className="rounded-lg border border-border" />
        <div>
          <p className="font-semibold text-white">{player.full_name}</p>
          <p className="text-xs text-muted">{player.position} • {player.team} • {player.slot}</p>
        </div>
      </div>
      <div className="space-y-1 text-sm text-gray-300">
        <p><span className="text-muted">Label:</span> {player.analysis?.label ?? 'depth'}</p>
        <p>{player.analysis?.outlook}</p>
        <p><span className="text-muted">Upside:</span> {player.analysis?.upside}</p>
        <p><span className="text-muted">Risk:</span> {player.analysis?.risk}</p>
      </div>
    </article>
  );
}
