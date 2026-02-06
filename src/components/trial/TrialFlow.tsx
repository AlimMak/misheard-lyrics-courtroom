import { TrialResult } from "../../lib/types";
import { JudgePhase } from "./JudgePhase";
import { ProsecutorPhase } from "./ProsecutorPhase";
import { DefensePhase } from "./DefensePhase";
import { JuryPhase } from "./JuryPhase";
import { VerdictReveal } from "./VerdictReveal";

interface TrialFlowProps {
  readonly phase: "judge-intro" | "prosecution" | "defense" | "jury" | "verdict";
  readonly trialResult: TrialResult;
  readonly onAdvance: () => void;
  readonly onNewCase: () => void;
  readonly onViewHistory: () => void;
}

export function TrialFlow({
  phase,
  trialResult,
  onAdvance,
  onNewCase,
  onViewHistory,
}: TrialFlowProps) {
  switch (phase) {
    case "judge-intro":
      return (
        <JudgePhase judge={trialResult.judge} onContinue={onAdvance} />
      );
    case "prosecution":
      return (
        <ProsecutorPhase
          prosecution={trialResult.prosecution}
          onContinue={onAdvance}
        />
      );
    case "defense":
      return (
        <DefensePhase
          defense={trialResult.defense}
          onContinue={onAdvance}
        />
      );
    case "jury":
      return (
        <JuryPhase
          jurors={trialResult.jurors}
          onContinue={onAdvance}
        />
      );
    case "verdict":
      return (
        <VerdictReveal
          verdict={trialResult.verdict}
          caseData={trialResult.caseData}
          onNewCase={onNewCase}
          onViewHistory={onViewHistory}
        />
      );
  }
}
