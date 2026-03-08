'use client';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="card p-8 text-center">
      <h2 className="font-display text-3xl font-bold">Unable to load league data</h2>
      <p className="mt-2 text-sm text-muted">{error.message}</p>
    </div>
  );
}
