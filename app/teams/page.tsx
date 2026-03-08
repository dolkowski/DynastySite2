import { SectionHeader } from '@/components/SectionHeader';
import { TeamCard } from '@/components/TeamCard';
import { TeamTable } from '@/components/TeamTable';
import { getMergedTeams } from '@/lib/sleeper';

export default async function TeamsPage() {
  const teams = await getMergedTeams();
  const top = teams[0];

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-accent/40 bg-panel p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Featured Leader</p>
        <h1 className="mt-2 font-heading text-4xl text-white">{top?.team_name}</h1>
        <p className="text-sm text-muted">Current #1 by record and points-for tiebreak.</p>
      </section>

      <section>
        <SectionHeader title="Standings Table" subtitle="Broadcast-ready table view" />
        <TeamTable teams={teams} />
      </section>

      <section>
        <SectionHeader title="Team Cards" subtitle="Card view for mobile-first browsing" />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {teams.map((team) => (
            <TeamCard key={team.roster_id} team={team} />
          ))}
        </div>
      </section>
    </div>
  );
}
