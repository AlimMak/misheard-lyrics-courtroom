"use client";

import { useCallback, useEffect, useState } from "react";
import { ShameEntry, CaseInput, TrialResult } from "../lib/types";
import {
  getHallOfShame,
  addToHallOfShame,
  incrementSubmissionCount,
  clearAll as clearStorage,
} from "../lib/storage";

function sortByScoreDesc(entries: ShameEntry[]): ShameEntry[] {
  return [...entries].sort((a, b) => b.score - a.score);
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useHallOfShame() {
  const [entries, setEntries] = useState<ShameEntry[]>([]);

  useEffect(() => {
    setEntries(sortByScoreDesc(getHallOfShame()));
  }, []);

  const addEntry = useCallback(
    (input: CaseInput, trialData: TrialResult) => {
      const entry: ShameEntry = {
        id: generateId(),
        misheard: input.misheard,
        real: input.real,
        artist: input.artist,
        score: trialData.verdict.score,
        verdictTitle: trialData.verdict.title,
        timestamp: Date.now(),
      };

      addToHallOfShame(entry);
      incrementSubmissionCount();
      setEntries((prev) => sortByScoreDesc([entry, ...prev]));
    },
    []
  );

  const clearAll = useCallback(() => {
    clearStorage();
    setEntries([]);
  }, []);

  return { entries, addEntry, clearAll } as const;
}
