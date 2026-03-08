# DynastySite2

Premium ESPN-style fantasy football league hub for Sleeper league `1312605770595995648`.

## Stack
- Next.js 14 + App Router
- TypeScript
- Tailwind CSS
- Sleeper public API (read-only)

## Core pages
- `/` home command center
- `/teams` standings + card view with roster intelligence CTA
- `/teams/[rosterId]` detailed roster intelligence page with team + player AI notes
- `/matchups` weekly game center
- `/transactions` league newswire
- `/playoffs` winners + losers brackets

## Roster Intelligence architecture
### Mock analysis mode (default)
- Enabled when `ANALYSIS_MODE` is unset or `mock`.
- Deterministic heuristics from roster structure and player metadata generate:
  - team summary
  - direction tag (`buy`, `sell`, `hold`, `rebuild`, `contend now`)
  - position group grades
  - player-level blurbs/labels
- Main files:
  - `lib/roster-analysis.ts`
  - `lib/ai.ts`
  - `lib/player-utils.ts`

### Future real OpenAI mode
- Set `ANALYSIS_MODE=live` (placeholder mode currently falls back gracefully to mock output).
- Prompt builders already included:
  - `createTeamAnalysisPrompt()`
  - `createPlayerAnalysisPrompt()`
- To integrate OpenAI later:
  1. Add `OPENAI_API_KEY`
  2. Implement live calls in `lib/ai.ts` inside `getTeamAnalysis()` and `getPlayerAnalysis()`
  3. Keep fallback behavior to mock mode if API fails

## Sleeper caching strategy
- League endpoints: short revalidate window (60s)
- `/players/nfl`: aggressive revalidation (24h) in `getPlayers()` to avoid heavy refetches

## Local setup
1. Install dependencies
   ```bash
   npm install
   ```
2. Start dev server
   ```bash
   npm run dev
   ```
3. Open:
   ```
   http://localhost:3000
   ```

## Build for production
```bash
npm run build
npm run start
```

## Where to tune analysis rules
- Team heuristics and scoring: `lib/roster-analysis.ts`
- Player enrichment and position grouping: `lib/player-utils.ts`
- AI mode switch + future LLM integration: `lib/ai.ts`

## Recommended next features
- Weekly recap article generation
- Rivalry pages with all-time records
- Trade analyzer with fairness index
- Draft recap by value-over-ADP
- Keeper history and franchise records
- League hall of fame and awards timeline
