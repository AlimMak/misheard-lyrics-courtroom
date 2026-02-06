"use client";

import { useState, useCallback } from "react";
import { CaseData, TrialPhase, TrialResult, TrialState } from "../lib/types";
import { generateJudgeIntro } from "../lib/generators/judge";
import { generateProsecution } from "../lib/generators/prosecutor";
import { generateDefense } from "../lib/generators/defense";
import { generateJuryReactions } from "../lib/generators/jury";
import { generateVerdict } from "../lib/generators/verdict";
import { getGuiltyRatio, calculateMishearingScore } from "../lib/scoring";
import { saveTrialResult } from "../lib/storage";
import { generateId } from "../lib/generators/templates";

function buildTrialResult(caseData: CaseData): TrialResult {
  const score = calculateMishearingScore(
    caseData.misheardLyric,
    caseData.realLyric
  );
  const guiltyRatio = getGuiltyRatio(score);

  return {
    caseData,
    judge: generateJudgeIntro(caseData),
    prosecution: generateProsecution(caseData),
    defense: generateDefense(caseData),
    jurors: generateJuryReactions(caseData, guiltyRatio),
    verdict: generateVerdict(caseData),
    timestamp: Date.now(),
  };
}

const INITIAL_STATE: TrialState = {
  phase: "filing",
  caseData: null,
  trialResult: null,
};

export function useTrialFlow() {
  const [state, setState] = useState<TrialState>(INITIAL_STATE);

  const fileCase = useCallback(
    (input: Omit<CaseData, "id" | "submittedAt">) => {
      const caseData: CaseData = {
        ...input,
        id: generateId(),
        submittedAt: Date.now(),
      };
      const trialResult = buildTrialResult(caseData);

      setState({
        phase: "judge-intro",
        caseData,
        trialResult,
      });
    },
    []
  );

  const advancePhase = useCallback(() => {
    setState((prev) => {
      const phaseOrder: TrialPhase[] = [
        "filing",
        "judge-intro",
        "prosecution",
        "defense",
        "jury",
        "verdict",
      ];
      const currentIndex = phaseOrder.indexOf(prev.phase);
      const nextPhase = phaseOrder[currentIndex + 1] ?? "verdict";

      if (nextPhase === "verdict" && prev.trialResult) {
        saveTrialResult(prev.trialResult);
      }

      return { ...prev, phase: nextPhase };
    });
  }, []);

  const goToHallOfShame = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "hall-of-shame" }));
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    fileCase,
    advancePhase,
    goToHallOfShame,
    reset,
  } as const;
}
