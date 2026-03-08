import { StatPill } from './StatPill';

interface LeagueInfoBarProps {
  totalPoints: number;
  avgPoints: number;
  activeTeams: number;
}

export function LeagueInfoBar({ totalPoints, avgPoints, activeTeams }: LeagueInfoBarProps) {
  return (
    <section className="card mb-8 flex flex-wrap gap-2 p-4">
      <StatPill label="Total PF" value={totalPoints.toFixed(2)} />
      <StatPill label="Avg PF" value={avgPoints.toFixed(2)} />
      <StatPill label="Active Teams" value={activeTeams} />
    </section>
  );
}
