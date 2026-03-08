import { SleeperTransaction } from '@/lib/types';
import { formatTimestamp } from '@/lib/utils';

export function TransactionCard({ tx }: { tx: SleeperTransaction }) {
  const adds = Object.keys(tx.adds ?? {}).length;
  const drops = Object.keys(tx.drops ?? {}).length;

  return (
    <article className="rounded-xl border border-border bg-panel p-4">
      <div className="flex items-center justify-between">
        <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-1 text-xs uppercase tracking-wide text-accent">{tx.type}</span>
        <span className="text-xs text-muted">{formatTimestamp(tx.created)}</span>
      </div>
      <h4 className="mt-3 font-heading text-xl text-white">{tx.type === 'trade' ? 'Blockbuster Trade' : 'Roster Move'}</h4>
      <p className="text-sm text-gray-300">Teams involved: {tx.roster_ids.join(', ') || 'n/a'}</p>
      <p className="text-sm text-gray-300">Adds: {adds} • Drops: {drops}</p>
    </article>
  );
}
