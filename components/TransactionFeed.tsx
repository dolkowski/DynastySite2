import { Transaction } from '@/lib/types';
import { EmptyState } from './EmptyState';
import { TransactionCard } from './TransactionCard';

export function TransactionFeed({ transactions }: { transactions: Transaction[] }) {
  if (!transactions.length) {
    return <EmptyState title="No moves this round" message="This week is quiet. Check back after waivers process." />;
  }

  return (
    <div className="grid gap-3">
      {transactions.map((tx) => (
        <TransactionCard key={tx.transaction_id} tx={tx} />
      ))}
    </div>
  );
}
