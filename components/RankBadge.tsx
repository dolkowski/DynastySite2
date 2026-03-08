import { cn } from '@/lib/utils';

export function RankBadge({ rank }: { rank: number }) {
  return (
    <span
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold',
        rank <= 3 ? 'border-accent bg-accent/20 text-white' : 'border-border bg-panelAlt text-gray-200'
      )}
    >
      {rank}
    </span>
  );
}
