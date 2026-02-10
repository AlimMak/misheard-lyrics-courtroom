"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CaseInput, TrialPhase, TrialResult } from "../lib/types";
import { calculateSeverity } from "../lib/scoring";
import { PHASE_DELAYS } from "../lib/constants";
import { generateJudgeIntro } from "../lib/generators/judge";
import { generateProsecution } from "../lib/generators/prosecutor";
import { generateDefense } from "../lib/generators/defense";
import { generateJurorTakes } from "../lib/generators/jury";
import { generateVerdict } from "../lib/generators/verdict";
import { generateJudgeName, generateJurorNames } from "../lib/generators/names";

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return hash;
}

const PHASE_ORDER: readonly TrialPhase[] = [
  "judge",
  "prosecutor",
  "defense",
  "jury",
  "verdict",
  "complete",
];

interface TrialState {
  readonly phase: TrialPhase;
  readonly trialData: TrialResult | null;
  readonly score: number | null;
}

const INITIAL_STATE: TrialState = {
  phase: "idle",
  trialData: null,
  score: null,
};

export function useTrialFlow() {
  const [state, setState] = useState<TrialState>(INITIAL_STATE);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const schedulePhase = useCallback(
    (nextPhase: TrialPhase, data?: Partial<TrialState>) => {
      const delay = PHASE_DELAYS[nextPhase];

      if (delay > 0) {
        timerRef.current = setTimeout(() => {
          setState((prev) => ({ ...prev, ...data, phase: nextPhase }));
          timerRef.current = null;
        }, delay);
      } else {
        setState((prev) => ({ ...prev, ...data, phase: nextPhase }));
      }
    },
    []
  );

  const startTrial = useCallback(
    (input: CaseInput) => {
      setState((prev) => ({ ...prev, phase: "loading" }));

      const score = calculateSeverity(input.misheard, input.real);
      const seed = hashString(input.misheard + input.real);

      const trialData: TrialResult = {
        judgeName: generateJudgeName(seed + 5381),
        judgeIntro: generateJudgeIntro(input, seed),
        prosecution: generateProsecution(input, score, seed),
        defense: generateDefense(input, score, seed),
        jurorNames: generateJurorNames(seed + 7919),
        jurors: generateJurorTakes(input, score, seed),
        verdict: generateVerdict(input, score),
      };

      schedulePhase("judge", { trialData, score });
    },
    [schedulePhase]
  );

  const nextPhase = useCallback(() => {
    const currentIndex = PHASE_ORDER.indexOf(state.phase);
    if (currentIndex === -1 || currentIndex >= PHASE_ORDER.length - 1) return;

    const next = PHASE_ORDER[currentIndex + 1];
    schedulePhase(next);
  }, [state.phase, schedulePhase]);

  const reset = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setState(INITIAL_STATE);
  }, []);

  return {
    phase: state.phase,
    trialData: state.trialData,
    score: state.score,
    startTrial,
    nextPhase,
    reset,
  } as const;
}
