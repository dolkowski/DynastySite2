import { SectionHeader } from '@/components/SectionHeader';
import { TeamCard } from '@/components/TeamCard';
import { TeamTable } from '@/components/TeamTable';
import { getMergedTeams } from '@/lib/sleeper';

export default async function TeamsPage({ searchParams }: { searchParams?: { view?: string } }) {
  const teams = await getMergedTeams();
  const view = searchParams?.view === 'table' ? 'table' : 'cards';

  return (
    <div>
      <SectionHeader title="Teams" subtitle="Standings order with season metrics" action={<div className="text-xs text-muted">Use ?view=table for table layout</div>} />
      <div className="card mb-6 p-4">
        <p className="text-xs uppercase tracking-wider text-muted">Featured Team</p>
        <h2 className="font-display text-3xl font-bold uppercase text-brand">#{teams[0]?.rank} {teams[0]?.team_name}</h2>
        <p className="text-sm text-muted">Owned by {teams[0]?.display_name}</p>
      </div>

      {view === 'table' ? (
        <TeamTable teams={teams} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {teams.map((team) => (
            <TeamCard key={team.roster_id} team={team} />
          ))}
        </div>
      )}
    </div>
  );
}
