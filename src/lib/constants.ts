import { BadgeTier } from "./types";

export const BADGE_TIERS: readonly BadgeTier[] = [
  { name: "rookie", minCases: 1, color: "#8B7355", label: "First Offender" },
  { name: "regular", minCases: 3, color: "#C0C0C0", label: "Repeat Offender" },
  { name: "veteran", minCases: 7, color: "#FFD700", label: "Serial Mishear-er" },
  { name: "legend", minCases: 15, color: "#E5E4E2", label: "Lyrical Menace" },
  { name: "infamous", minCases: 30, color: "#B9F2FF", label: "Public Enemy #1" },
] as const;

export const VERDICT_THRESHOLDS = {
  acquitted: 0,
  misdemeanor: 25,
  felony: 55,
  "crime-against-music": 80,
} as const;

export const PHASE_LABELS: Record<string, string> = {
  "filing": "File a Case",
  "judge-intro": "Judge's Opening",
  "prosecution": "The Prosecution",
  "defense": "The Defense",
  "jury": "Jury Deliberation",
  "verdict": "The Verdict",
  "hall-of-shame": "Hall of Shame",
};

export const STORAGE_KEYS = {
  trialHistory: "courtroom-lyrics-history",
  settings: "courtroom-lyrics-settings",
} as const;

export const MAX_LYRIC_LENGTH = 200;
export const MAX_SONG_TITLE_LENGTH = 100;
export const MAX_ARTIST_LENGTH = 100;
export const JUROR_COUNT = 5;
