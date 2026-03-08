import { PlayoffBracket } from '@/components/PlayoffBracket';
import { SectionHeader } from '@/components/SectionHeader';
import { getLosersBracket, getMergedTeams, getWinnersBracket } from '@/lib/sleeper';

export default async function PlayoffsPage() {
  const [winners, losers, teams] = await Promise.all([getWinnersBracket(), getLosersBracket(), getMergedTeams()]);

  return (
    <div className="space-y-6">
      <SectionHeader title="Playoffs" subtitle="Postseason picture" />
      <PlayoffBracket title="Winners Bracket" matches={winners} teams={teams} />
      <PlayoffBracket title="Losers Bracket" matches={losers} teams={teams} />
    </div>
  );
}
