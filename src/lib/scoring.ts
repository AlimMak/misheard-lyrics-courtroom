import { VerdictLevel } from "./types";
import { VERDICT_THRESHOLDS } from "./constants";

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  const aLower = a.toLowerCase();
  const bLower = b.toLowerCase();

  for (let i = 0; i <= bLower.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= aLower.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= bLower.length; i++) {
    for (let j = 1; j <= aLower.length; j++) {
      const cost = bLower[i - 1] === aLower[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[bLower.length][aLower.length];
}

function wordOverlapScore(misheard: string, real: string): number {
  const misheardWords = new Set(misheard.toLowerCase().split(/\s+/));
  const realWords = real.toLowerCase().split(/\s+/);
  const overlap = realWords.filter((w) => misheardWords.has(w)).length;
  return 1 - overlap / Math.max(realWords.length, 1);
}

function lengthDifferenceScore(misheard: string, real: string): number {
  const diff = Math.abs(misheard.length - real.length);
  return Math.min(diff / Math.max(real.length, 1), 1);
}

function absurdityBonus(misheard: string): number {
  let bonus = 0;
  if (misheard.length > 50) bonus += 10;
  if (/[!?]{2,}/.test(misheard)) bonus += 5;
  if (/[A-Z]{3,}/.test(misheard)) bonus += 5;
  const unusualChars = misheard.replace(/[a-zA-Z\s']/g, "").length;
  if (unusualChars > 2) bonus += 5;
  return Math.min(bonus, 20);
}

export function calculateMishearingScore(
  misheard: string,
  real: string
): number {
  const distance = levenshteinDistance(misheard, real);
  const maxLen = Math.max(misheard.length, real.length, 1);
  const editDistanceScore = Math.min((distance / maxLen) * 50, 50);

  const wordScore = wordOverlapScore(misheard, real) * 20;
  const lengthScore = lengthDifferenceScore(misheard, real) * 10;
  const absurdity = absurdityBonus(misheard);

  const rawScore = editDistanceScore + wordScore + lengthScore + absurdity;
  return Math.min(Math.round(rawScore), 100);
}

export function getVerdictLevel(score: number): VerdictLevel {
  if (score >= VERDICT_THRESHOLDS["crime-against-music"]) {
    return "crime-against-music";
  }
  if (score >= VERDICT_THRESHOLDS.felony) return "felony";
  if (score >= VERDICT_THRESHOLDS.misdemeanor) return "misdemeanor";
  return "acquitted";
}

export function getGuiltyRatio(score: number): number {
  if (score >= 80) return 0.8;
  if (score >= 55) return 0.6;
  if (score >= 25) return 0.4;
  return 0.2;
}
