import { FeaturedMatchup } from '@/components/FeaturedMatchup';
import { LeagueHero } from '@/components/LeagueHero';
import { LeagueInfoBar } from '@/components/LeagueInfoBar';
import { SectionHeader } from '@/components/SectionHeader';
import { StandingsTable } from '@/components/StandingsTable';
import { TopTeamsPanel } from '@/components/TopTeamsPanel';
import { TransactionFeed } from '@/components/TransactionFeed';
import { getEnrichedMatchups, getLeague, getMergedTeams, getNFLState, getTransactions, getWinnersBracket } from '@/lib/sleeper';
import { formatPoints } from '@/lib/utils';

export default async function HomePage() {
  const [league, state, teams] = await Promise.all([getLeague(), getNFLState(), getMergedTeams()]);
  const [matchups, transactions, winnersBracket] = await Promise.all([
    getEnrichedMatchups(state.week),
    getTransactions(state.week),
    getWinnersBracket()
  ]);

  const featured = [...matchups].sort((a, b) => {
    const aTotal = a.teams.reduce((sum, t) => sum + (t.roster.points ?? 0), 0);
    const bTotal = b.teams.reduce((sum, t) => sum + (t.roster.points ?? 0), 0);
    return bTotal - aTotal;
  })[0];

  const highestScoring = teams.reduce((best, team) => (team.fpts > best.fpts ? team : best), teams[0]);
  const closest = [...matchups].sort(
    (a, b) =>
      Math.abs((a.teams[0]?.roster.points ?? 0) - (a.teams[1]?.roster.points ?? 0)) -
      Math.abs((b.teams[0]?.roster.points ?? 0) - (b.teams[1]?.roster.points ?? 0))
  )[0];

  return (
    <div className="space-y-8">
      <LeagueHero league={league} state={state} />
      <LeagueInfoBar teams={teams} />

      <section>
        <SectionHeader title="Front Page Matchup" subtitle="The most explosive game this week" />
        <FeaturedMatchup matchup={featured} />
      </section>

      <section>
        <SectionHeader title="Standings Snapshot" subtitle="Updated with Sleeper live totals" />
        <StandingsTable teams={teams.slice(0, 8)} />
      </section>

      <section>
        <SectionHeader title="Power Rankings" subtitle="A blend of wins, losses, and points for" />
        <TopTeamsPanel teams={teams} />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-panel p-4">
          <p className="text-xs uppercase tracking-wide text-muted">Superlative</p>
          <p className="mt-2 font-heading text-xl text-white">Highest Scoring Team</p>
          <p className="text-lg text-accent">{highestScoring?.team_name}</p>
          <p className="text-sm text-muted">{formatPoints(highestScoring?.fpts)} points for</p>
        </div>
        <div className="rounded-xl border border-border bg-panel p-4">
          <p className="text-xs uppercase tracking-wide text-muted">Superlative</p>
          <p className="mt-2 font-heading text-xl text-white">Closest Matchup</p>
          <p className="text-sm text-gray-200">Matchup #{closest?.matchup_id ?? '--'}</p>
        </div>
        <div className="rounded-xl border border-border bg-panel p-4">
          <p className="text-xs uppercase tracking-wide text-muted">Playoff Picture</p>
          <p className="mt-2 font-heading text-xl text-white">Winners Bracket</p>
          <p className="text-sm text-gray-200">{winnersBracket.length} bracket matchups loaded</p>
        </div>
      </section>

      <section>
        <SectionHeader title="Recent Activity" subtitle="League transactions and roster movement" />
        <TransactionFeed transactions={transactions.slice(0, 6)} />
      </section>
    </div>
  );
}
