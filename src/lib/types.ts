export type TrialPhase =
  | "filing"
  | "judge-intro"
  | "prosecution"
  | "defense"
  | "jury"
  | "verdict"
  | "hall-of-shame";

export type VerdictLevel =
  | "acquitted"
  | "misdemeanor"
  | "felony"
  | "crime-against-music";

export interface CaseData {
  readonly id: string;
  readonly songTitle: string;
  readonly artist: string;
  readonly misheardLyric: string;
  readonly realLyric: string;
  readonly submittedAt: number;
}

export interface TrialCharacter {
  readonly name: string;
  readonly title: string;
}

export interface TrialDialogue {
  readonly speaker: TrialCharacter;
  readonly text: string;
}

export interface JudgeIntro {
  readonly character: TrialCharacter;
  readonly openingStatement: string;
  readonly caseDescription: string;
}

export interface ProsecutionArgument {
  readonly character: TrialCharacter;
  readonly opening: string;
  readonly evidence: string;
  readonly closing: string;
}

export interface DefenseArgument {
  readonly character: TrialCharacter;
  readonly opening: string;
  readonly argument: string;
  readonly closing: string;
}

export interface JurorReaction {
  readonly character: TrialCharacter;
  readonly reaction: string;
  readonly vote: "guilty" | "not-guilty";
}

export interface Verdict {
  readonly level: VerdictLevel;
  readonly title: string;
  readonly score: number;
  readonly summary: string;
  readonly sentence: string;
}

export interface TrialResult {
  readonly caseData: CaseData;
  readonly judge: JudgeIntro;
  readonly prosecution: ProsecutionArgument;
  readonly defense: DefenseArgument;
  readonly jurors: readonly JurorReaction[];
  readonly verdict: Verdict;
  readonly timestamp: number;
}

export interface BadgeTier {
  readonly name: string;
  readonly minCases: number;
  readonly color: string;
  readonly label: string;
}

export interface TrialState {
  readonly phase: TrialPhase;
  readonly caseData: CaseData | null;
  readonly trialResult: TrialResult | null;
}
