import { SectionHeader } from '@/components/SectionHeader';
import { TransactionFeed } from '@/components/TransactionFeed';
import { getNFLState, getTransactions } from '@/lib/sleeper';

export default async function TransactionsPage({ searchParams }: { searchParams?: { week?: string } }) {
  const state = await getNFLState();
  const round = Number(searchParams?.week ?? state.week);
  const transactions = await getTransactions(round);

  return (
    <div>
      <SectionHeader title="Transactions" subtitle="League newswire" action={<div className="text-xs text-muted">Change week with ?week=number</div>} />
      <TransactionFeed transactions={transactions} />
    </div>
  );
}
