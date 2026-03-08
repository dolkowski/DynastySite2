import { SleeperTransaction } from '@/lib/types';
import { EmptyState } from './EmptyState';
import { TransactionCard } from './TransactionCard';

export function TransactionFeed({ transactions }: { transactions: SleeperTransaction[] }) {
  if (!transactions.length) {
    return <EmptyState title="No transactions yet" description="No roster activity for this week." />;
  }

  return (
    <div className="grid gap-3">
      {transactions.map((tx) => (
        <TransactionCard key={tx.transaction_id} tx={tx} />
      ))}
    </div>
  );
}
