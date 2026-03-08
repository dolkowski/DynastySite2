interface StatPillProps {
  label: string;
  value: string | number;
}

export function StatPill({ label, value }: StatPillProps) {
  return (
    <div className="rounded-full border border-line bg-panelAlt px-3 py-1.5 text-xs uppercase tracking-wide text-muted">
      <span className="mr-1 text-[10px]">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}
