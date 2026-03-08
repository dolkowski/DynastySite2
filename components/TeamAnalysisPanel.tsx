import { TeamAnalysis } from '@/lib/types';

export function TeamAnalysisPanel({ analysis }: { analysis: TeamAnalysis }) {
  return (
    <section className="rounded-xl border border-accent/40 bg-panel p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">AI Team Outlook</p>
      <p className="mt-2 text-sm text-gray-200">{analysis.teamSummary}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Info title="Strengths" items={analysis.strengths} />
        <Info title="Weaknesses" items={analysis.weaknesses} />
      </div>
      <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
        <div className="rounded-lg bg-panelAlt p-3"><span className="text-muted">X-Factor:</span> {analysis.xFactor}</div>
        <div className="rounded-lg bg-panelAlt p-3"><span className="text-muted">Best Asset:</span> {analysis.bestAsset}</div>
        <div className="rounded-lg bg-panelAlt p-3"><span className="text-muted">Sleeper:</span> {analysis.sleeper}</div>
      </div>
    </section>
  );
}

function Info({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg bg-panelAlt p-3">
      <p className="mb-2 font-semibold text-white">{title}</p>
      <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
