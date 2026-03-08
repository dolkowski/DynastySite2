import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/teams', label: 'Teams' },
  { href: '/matchups', label: 'Matchups' },
  { href: '/transactions', label: 'Transactions' },
  { href: '/playoffs', label: 'Playoffs' }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div>
          <p className="font-heading text-xl uppercase tracking-wide text-white">Dynasty Network</p>
          <p className="text-xs text-muted">League Command Center</p>
        </div>
        <nav className="flex gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-200 transition hover:bg-panelAlt hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
