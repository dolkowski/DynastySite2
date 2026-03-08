import { PlayoffBracket } from '@/components/PlayoffBracket';
import { SectionHeader } from '@/components/SectionHeader';
import { getLosersBracket, getWinnersBracket } from '@/lib/sleeper';

export default async function PlayoffsPage() {
  const [winners, losers] = await Promise.all([getWinnersBracket(), getLosersBracket()]);

  return (
    <div className="space-y-6">
      <SectionHeader title="Postseason Central" subtitle="Championship roadmaps and consolation battles" />
      <PlayoffBracket title="Winners Bracket" matches={winners} />
      <PlayoffBracket title="Losers Bracket" matches={losers} />
    </div>
  );
}
