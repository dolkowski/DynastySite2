import type { Metadata } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/Footer';
import { SiteHeader } from '@/components/SiteHeader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-barlow' });

export const metadata: Metadata = {
  title: 'Dynasty League Central',
  description: 'Premium Sleeper fantasy football league dashboard'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable}`}>
      <body className="font-sans">
        <SiteHeader />
        <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
