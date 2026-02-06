import { ShameEntry } from "./types";
import { STORAGE_KEYS } from "./constants";

function safeGetItem(key: string): string | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): boolean {
  try {
    if (typeof window === "undefined") return false;
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function getHallOfShame(): ShameEntry[] {
  const raw = safeGetItem(STORAGE_KEYS.hallOfShame);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addToHallOfShame(entry: ShameEntry): void {
  const current = getHallOfShame();
  const updated = [entry, ...current];
  safeSetItem(STORAGE_KEYS.hallOfShame, JSON.stringify(updated));
}

export function getSubmissionCount(): number {
  const raw = safeGetItem(STORAGE_KEYS.submissionCount);
  if (!raw) return 0;

  try {
    const count = JSON.parse(raw);
    return typeof count === "number" ? count : 0;
  } catch {
    return 0;
  }
}

export function incrementSubmissionCount(): void {
  const current = getSubmissionCount();
  safeSetItem(STORAGE_KEYS.submissionCount, JSON.stringify(current + 1));
}

export function clearAll(): void {
  safeSetItem(STORAGE_KEYS.hallOfShame, JSON.stringify([]));
  safeSetItem(STORAGE_KEYS.submissionCount, JSON.stringify(0));
}
