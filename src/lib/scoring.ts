import { Severity } from "./types";

// --- Levenshtein distance (30% weight) ---

function levenshteinDistance(a: string, b: string): number {
  const aLow = a.toLowerCase();
  const bLow = b.toLowerCase();
  const matrix: number[][] = [];

  for (let i = 0; i <= bLow.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= aLow.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= bLow.length; i++) {
    for (let j = 1; j <= aLow.length; j++) {
      const cost = bLow[i - 1] === aLow[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[bLow.length][aLow.length];
}

function normalizedEditDistance(misheard: string, real: string): number {
  const dist = levenshteinDistance(misheard, real);
  const maxLen = Math.max(misheard.length, real.length, 1);
  return Math.min(dist / maxLen, 1);
}

// --- Semantic absurdity (25% weight) ---

const ABSURD_CATEGORIES: Record<string, readonly string[]> = {
  food: [
    "pizza", "taco", "burger", "cheese", "sausage", "bacon", "toast",
    "soup", "salad", "cake", "pie", "bread", "butter", "egg", "noodle",
    "chicken", "steak", "fish", "rice", "bean", "potato", "sandwich",
    "cookie", "donut", "waffle", "pancake", "meatball", "gravy",
  ],
  animals: [
    "dog", "cat", "monkey", "horse", "donkey", "goat", "sheep",
    "chicken", "duck", "cow", "pig", "whale", "shark", "eagle",
    "parrot", "llama", "penguin", "moose", "hamster", "squirrel",
  ],
  bodyParts: [
    "elbow", "knee", "toe", "finger", "nose", "ear", "butt",
    "belly", "armpit", "toenail", "eyebrow", "ankle", "forehead",
    "nostril", "kneecap", "bellybutton", "earlobe",
  ],
  violence: [
    "punch", "kick", "slap", "fight", "sword", "bomb", "explode",
    "smash", "crush", "destroy", "attack", "stab", "murder", "kill",
    "battle", "war", "cannon", "grenade",
  ],
  romance: [
    "kiss", "love", "hug", "marry", "date", "heart", "romance",
    "cuddle", "smooch", "darling", "sweetheart", "baby", "honey",
    "passion", "desire", "flirt",
  ],
};

function semanticAbsurdity(misheard: string, real: string): number {
  const misheardLow = misheard.toLowerCase();
  const realLow = real.toLowerCase();

  let misheardHits = 0;
  let realHits = 0;

  for (const words of Object.values(ABSURD_CATEGORIES)) {
    for (const word of words) {
      if (misheardLow.includes(word)) misheardHits++;
      if (realLow.includes(word)) realHits++;
    }
  }

  const newAbsurdWords = Math.max(misheardHits - realHits, 0);
  return Math.min(newAbsurdWords / 3, 1);
}

// --- Length difference (15% weight) ---

function lengthDifferenceRatio(misheard: string, real: string): number {
  const misheardWords = misheard.trim().split(/\s+/).length;
  const realWords = real.trim().split(/\s+/).length;
  const diff = Math.abs(misheardWords - realWords);
  return Math.min(diff / Math.max(realWords, 1), 1);
}

// --- Confidence penalty (10% weight) ---

function confidencePenalty(misheard: string, real: string): number {
  const avgLen = (misheard.length + real.length) / 2;
  if (avgLen < 5) return 0.8;
  if (avgLen < 10) return 0.4;
  if (avgLen < 20) return 0.1;
  return 0;
}

// --- Phonetic similarity (20% weight) ---

function consonantSkeleton(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^bcdfghjklmnpqrstvwxyz]/g, "");
}

function phoneticSimilarity(misheard: string, real: string): number {
  const skelA = consonantSkeleton(misheard);
  const skelB = consonantSkeleton(real);

  if (skelA.length === 0 && skelB.length === 0) return 1;

  const maxLen = Math.max(skelA.length, skelB.length, 1);
  const dist = levenshteinDistance(skelA, skelB);
  const similarity = 1 - dist / maxLen;

  return similarity;
}

// --- Main scoring function ---

export function calculateSeverity(
  misheard: string,
  real: string
): number {
  const editDist = normalizedEditDistance(misheard, real);
  const absurdity = semanticAbsurdity(misheard, real);
  const lengthDiff = lengthDifferenceRatio(misheard, real);
  const shortPenalty = confidencePenalty(misheard, real);
  const phonetic = phoneticSimilarity(misheard, real);

  // Higher phonetic similarity = funnier/more forgivable = lower severity
  // Invert so similar-sounding mishearings get a LOWER score boost
  const phoneticFactor = 1 - phonetic;

  const rawScore =
    editDist * 0.3 +
    absurdity * 0.25 +
    lengthDiff * 0.15 +
    shortPenalty * 0.1 +
    phoneticFactor * 0.2;

  // Scale from 0-1 range to 1-10 range
  const scaled = rawScore * 9 + 1;

  // Random jitter +/- 0.5
  const jitter = (Math.random() - 0.5) * 1;
  const withJitter = scaled + jitter;

  // Clamp to [1, 10], round to 1 decimal
  const clamped = Math.max(1, Math.min(10, withJitter));
  return Math.round(clamped * 10) / 10;
}

// --- Severity category helper ---

export function getSeverityCategory(score: number): Severity {
  if (score >= 9) return "capital";
  if (score >= 7) return "felony";
  if (score >= 4) return "misdemeanor";
  return "acquitted";
}
