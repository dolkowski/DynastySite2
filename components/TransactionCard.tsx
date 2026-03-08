import { Transaction } from '@/lib/types';
import { formatTimestamp } from '@/lib/utils';

export function TransactionCard({ tx }: { tx: Transaction }) {
  const adds = tx.adds ? Object.keys(tx.adds).length : 0;
  const drops = tx.drops ? Object.keys(tx.drops).length : 0;

  return (
    <article className="card card-hover p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="rounded-full bg-brand/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">{tx.type.replace('_', ' ')}</span>
        <span className="text-xs text-muted">{formatTimestamp(tx.status_updated)}</span>
      </div>
      <p className="font-semibold">Transaction #{tx.transaction_id}</p>
      <p className="mt-1 text-sm text-muted">Adds: {adds} · Drops: {drops} · Teams: {tx.consenter_ids?.length ?? 1}</p>
    </article>
  );
}
