interface RankBadgeProps {
  rank: number;
}

export function RankBadge({ rank }: RankBadgeProps) {
  const classes = rank === 1 ? 'bg-warn/20 text-warn border-warn/40' : rank <= 4 ? 'bg-success/20 text-success border-success/40' : 'bg-panelAlt text-muted border-line';

  return <span className={`rounded-md border px-2 py-1 text-xs font-bold ${classes}`}>#{rank}</span>;
}
