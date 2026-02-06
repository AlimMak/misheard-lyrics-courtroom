export type Severity = "acquitted" | "misdemeanor" | "felony" | "capital";

export type TrialPhase =
  | "idle"
  | "filing"
  | "loading"
  | "judge"
  | "prosecutor"
  | "defense"
  | "jury"
  | "verdict"
  | "complete";

export interface CaseInput {
  readonly misheard: string;
  readonly real: string;
  readonly artist?: string;
}

export interface Verdict {
  readonly score: number;
  readonly title: string;
  readonly summary: string;
  readonly severity: Severity;
}

export interface TrialResult {
  readonly judgeIntro: string;
  readonly prosecution: string;
  readonly defense: string;
  readonly jurors: readonly [string, string, string];
  readonly verdict: Verdict;
}

export interface ShameEntry {
  readonly id: string;
  readonly misheard: string;
  readonly real: string;
  readonly artist?: string;
  readonly score: number;
  readonly verdictTitle: string;
  readonly timestamp: number;
}

export interface BadgeTier {
  readonly title: string;
  readonly minCount: number;
  readonly emoji: string;
}
