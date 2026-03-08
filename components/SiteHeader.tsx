import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/teams', label: 'Teams' },
  { href: '/matchups', label: 'Matchups' },
  { href: '/transactions', label: 'Transactions' },
  { href: '/playoffs', label: 'Playoffs' }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="font-display text-2xl font-bold uppercase tracking-wider text-brand">
          League Central
        </Link>
        <nav className="flex gap-2 md:gap-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-1.5 text-sm font-medium text-muted transition hover:bg-panelAlt hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
