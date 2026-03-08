import { generateMockPlayerAnalysis, generateMockTeamSummary } from './roster-analysis';
import { EnrichedPlayer, TeamAnalysis } from './types';

const AI_MODE = process.env.ANALYSIS_MODE ?? 'mock';

export function createTeamAnalysisPrompt(input: {
  leagueName: string;
  rosterFormat?: string[];
  teamName: string;
  record: string;
  rank: number;
  groupedPlayers: Record<string, EnrichedPlayer[]>;
}) {
  return `You are a dynasty fantasy football analyst.\nLeague: ${input.leagueName}\nTeam: ${input.teamName}\nRecord: ${input.record}\nRank: ${input.rank}\nRoster format: ${(input.rosterFormat ?? []).join(', ')}\nPlayers by position: ${JSON.stringify(input.groupedPlayers)}\nReturn JSON with keys: teamSummary, direction, strengths, weaknesses, xFactor, bestAsset, needs, positionGroups.`;
}

export function createPlayerAnalysisPrompt(input: {
  leagueName: string;
  teamName: string;
  player: EnrichedPlayer;
}) {
  return `You are a dynasty analyst for ${input.leagueName}. Team: ${input.teamName}. Player: ${JSON.stringify(input.player)}. Return JSON with keys: label, outlook, upside, risk, dynastyAngle, teamRole.`;
}

export async function getTeamAnalysis(input: {
  leagueName: string;
  rosterFormat?: string[];
  teamName: string;
  record: string;
  rank: number;
  groupedPlayers: Record<string, EnrichedPlayer[]>;
  players: EnrichedPlayer[];
}): Promise<TeamAnalysis> {
  if (AI_MODE === 'mock') {
    return generateMockTeamSummary(input.teamName, input.players);
  }

  try {
    const prompt = createTeamAnalysisPrompt(input);
    console.info('LLM mode placeholder prompt generated', prompt.slice(0, 120));
    return generateMockTeamSummary(input.teamName, input.players);
  } catch {
    return generateMockTeamSummary(input.teamName, input.players);
  }
}

export async function getPlayerAnalysis(input: {
  leagueName: string;
  teamName: string;
  player: EnrichedPlayer;
}) {
  if (AI_MODE === 'mock') {
    return generateMockPlayerAnalysis(input.player);
  }

  try {
    const prompt = createPlayerAnalysisPrompt(input);
    console.info('LLM mode placeholder prompt generated', prompt.slice(0, 120));
    return generateMockPlayerAnalysis(input.player);
  } catch {
    return generateMockPlayerAnalysis(input.player);
  }
}
