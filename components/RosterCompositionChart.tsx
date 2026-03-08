export function RosterCompositionChart({ counts }: { counts: Record<string, number> }) {
  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);

  return (
    <section className="rounded-xl border border-border bg-panel p-4">
      <h3 className="font-heading text-xl text-white">Team Composition</h3>
      <div className="mt-3 space-y-2">
        {Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .map(([position, count]) => {
            const width = total ? (count / total) * 100 : 0;
            return (
              <div key={position}>
                <div className="mb-1 flex justify-between text-xs text-muted">
                  <span>{position}</span>
                  <span>{count}</span>
                </div>
                <div className="h-2 rounded-full bg-panelAlt">
                  <div className="h-2 rounded-full bg-accent" style={{ width: `${width}%` }} />
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
