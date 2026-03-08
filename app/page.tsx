import { FeaturedMatchup } from '@/components/FeaturedMatchup';
import { LeagueHero } from '@/components/LeagueHero';
import { LeagueInfoBar } from '@/components/LeagueInfoBar';
import { SectionHeader } from '@/components/SectionHeader';
import { StandingsTable } from '@/components/StandingsTable';
import { TopTeamsPanel } from '@/components/TopTeamsPanel';
import { TransactionFeed } from '@/components/TransactionFeed';
import { getLeague, getMatchups, getMergedTeams, getNFLState, getTransactions, getWinnersBracket } from '@/lib/sleeper';
import { groupMatchups } from '@/lib/utils';

export default async function HomePage() {
  const [league, state, teams, winnersBracket] = await Promise.all([getLeague(), getNFLState(), getMergedTeams(), getWinnersBracket()]);
  const [matchupsData, transactions] = await Promise.all([getMatchups(state.week), getTransactions(state.week)]);

  const grouped = groupMatchups(matchupsData).map((m) => ({
    ...m,
    sides: m.sides.map((s) => ({ ...s, team: teams.find((t) => t.roster_id === s.roster_id) }))
  }));

  const featured = grouped[0];
  const highestScoring = teams.reduce((best, curr) => (curr.fpts > best.fpts ? curr : best), teams[0]);
  const closestMatchup = [...grouped].sort((a, b) => Math.abs((a.sides[0]?.points ?? 0) - (a.sides[1]?.points ?? 0)) - Math.abs((b.sides[0]?.points ?? 0) - (b.sides[1]?.points ?? 0)))[0];
  const blowout = [...grouped].sort((a, b) => Math.abs((b.sides[0]?.points ?? 0) - (b.sides[1]?.points ?? 0)) - Math.abs((a.sides[0]?.points ?? 0) - (a.sides[1]?.points ?? 0)))[0];

  return (
    <div>
      <LeagueHero league={league} state={state} />
      <LeagueInfoBar totalPoints={teams.reduce((sum, team) => sum + team.fpts, 0)} avgPoints={teams.reduce((sum, team) => sum + team.fpts, 0) / Math.max(teams.length, 1)} activeTeams={teams.length} />
      <FeaturedMatchup matchup={featured} />

      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeader title="Standings Snapshot" subtitle="Ranked by record then points for" />
          <StandingsTable teams={teams.slice(0, 8)} />
        </div>
        <TopTeamsPanel teams={teams} />
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="card p-4"><p className="text-xs text-muted">Highest Scoring Team</p><p className="font-display text-2xl">{highestScoring.team_name}</p></div>
        <div className="card p-4"><p className="text-xs text-muted">Closest Matchup</p><p className="font-display text-2xl">Game {closestMatchup?.matchup_id ?? '-'}</p></div>
        <div className="card p-4"><p className="text-xs text-muted">Biggest Blowout</p><p className="font-display text-2xl">Game {blowout?.matchup_id ?? '-'}</p></div>
        <div className="card p-4"><p className="text-xs text-muted">Playoff Round 1 Games</p><p className="font-display text-2xl">{winnersBracket.filter((m) => m.r === 1).length}</p></div>
      </div>

      <SectionHeader title="Recent Transactions" subtitle="Latest league activity" />
      <TransactionFeed transactions={transactions.slice(0, 8)} />
    </div>
  );
}
