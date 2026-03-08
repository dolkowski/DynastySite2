interface EmptyStateProps {
  title: string;
  message: string;
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="card p-8 text-center">
      <h3 className="font-display text-2xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted">{message}</p>
    </div>
  );
}
