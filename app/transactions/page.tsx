import { SectionHeader } from '@/components/SectionHeader';
import { TransactionFeed } from '@/components/TransactionFeed';
import { getNFLState, getTransactions } from '@/lib/sleeper';

export default async function TransactionsPage({
  searchParams
}: {
  searchParams: { round?: string };
}) {
  const state = await getNFLState();
  const round = Number(searchParams.round ?? state.week);
  const transactions = await getTransactions(round);

  return (
    <div className="space-y-4">
      <SectionHeader title="League Newswire" subtitle={`Transactions for week ${round}`} />
      <TransactionFeed transactions={transactions} />
    </div>
  );
}
