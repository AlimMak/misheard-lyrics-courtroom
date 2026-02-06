import { BadgeTier, TrialPhase } from "./types";

export const BADGE_TIERS: readonly BadgeTier[] = [
  { title: "First-Time Offender", minCount: 1, emoji: "\u{1F464}" },
  { title: "Serial Mishear-er", minCount: 2, emoji: "\u{1F442}" },
  { title: "Audiologically Challenged", minCount: 4, emoji: "\u{1F9BB}" },
  { title: "Legally Deaf to Melody", minCount: 6, emoji: "\u{1F480}" },
  { title: "Public Menace to Music", minCount: 10, emoji: "\u{1F6A8}" },
  { title: "Wanted by the Grammy Police", minCount: 15, emoji: "\u{1F3C6}" },
] as const;

export const PHASE_DELAYS: Record<TrialPhase, number> = {
  idle: 0,
  filing: 0,
  loading: 1500,
  judge: 2000,
  prosecutor: 2500,
  defense: 2500,
  jury: 2000,
  verdict: 3000,
  complete: 0,
};

export const PHASE_LABELS: Record<TrialPhase, string> = {
  idle: "Welcome",
  filing: "File a Case",
  loading: "Assembling the Court...",
  judge: "Judge's Opening",
  prosecutor: "The Prosecution",
  defense: "The Defense",
  jury: "Jury Deliberation",
  verdict: "The Verdict",
  complete: "Case Closed",
};

export const STORAGE_KEYS = {
  hallOfShame: "courtroom-lyrics-shame",
  submissionCount: "courtroom-lyrics-count",
} as const;

export const MAX_LYRIC_LENGTH = 200;
export const MAX_ARTIST_LENGTH = 100;
