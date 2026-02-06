import { TrialResult } from "./types";
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

export function loadTrialHistory(): readonly TrialResult[] {
  const raw = safeGetItem(STORAGE_KEYS.trialHistory);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTrialResult(result: TrialResult): readonly TrialResult[] {
  const history = loadTrialHistory();
  const updated = [result, ...history];
  safeSetItem(STORAGE_KEYS.trialHistory, JSON.stringify(updated));
  return updated;
}

export function clearTrialHistory(): void {
  safeSetItem(STORAGE_KEYS.trialHistory, JSON.stringify([]));
}
