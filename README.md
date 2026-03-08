# Dynasty League Central

A premium ESPN-style fantasy football league hub powered by the Sleeper public API.

## Stack
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Server Components + ISR fetch caching

## Features
- League hero, week context, and status modules
- Standings snapshot + power rankings
- Matchup game center with featured game
- Teams page with card/table views
- Transactions news feed with week selector
- Winners + losers playoff brackets
- Weekly superlatives and recent activity

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

## Run Production Locally
```bash
npm run build
npm run start
```

## Data Source
Sleeper endpoints configured in `lib/sleeper.ts` for league `1312605770595995648`.

## Recommended Next Features
- Weekly AI-generated recap article page
- Rivalry tracker with head-to-head records
- Trade analyzer with impact score
- Draft recap timeline with value grades
- Keeper and franchise history archive
- League Hall of Fame and records dashboards
