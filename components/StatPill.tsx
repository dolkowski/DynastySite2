import { cn } from '@/lib/utils';

interface StatPillProps {
  label: string;
  value: string | number;
  tone?: 'default' | 'good' | 'warn';
}

export function StatPill({ label, value, tone = 'default' }: StatPillProps) {
  return (
    <div
      className={cn(
        'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        tone === 'good' && 'border-good/40 bg-good/10 text-good',
        tone === 'warn' && 'border-warn/40 bg-warn/10 text-warn',
        tone === 'default' && 'border-border bg-panelAlt text-gray-200'
      )}
    >
      <span className="mr-1 text-muted">{label}</span>
      {value}
    </div>
  );
}
