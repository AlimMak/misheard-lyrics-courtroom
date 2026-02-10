import { TrialPhase, TrialResult } from "../../lib/types";
import { JudgePhase } from "./JudgePhase";
import { ProsecutorPhase } from "./ProsecutorPhase";
import { DefensePhase } from "./DefensePhase";
import { JuryPhase } from "./JuryPhase";
import { VerdictReveal } from "./VerdictReveal";

interface TrialFlowProps {
  readonly phase: TrialPhase;
  readonly trialData: TrialResult;
  readonly score: number;
  readonly onNext: () => void;
  readonly onSave: () => void;
  readonly onReset: () => void;
}

export function TrialFlow({
  phase,
  trialData,
  score,
  onNext,
  onSave,
  onReset,
}: TrialFlowProps) {
  switch (phase) {
    case "judge":
      return (
        <JudgePhase
          name={trialData.judgeName}
          intro={trialData.judgeIntro}
          onComplete={onNext}
        />
      );
    case "prosecutor":
      return (
        <ProsecutorPhase
          argument={trialData.prosecution}
          onComplete={onNext}
        />
      );
    case "defense":
      return (
        <DefensePhase
          argument={trialData.defense}
          onComplete={onNext}
        />
      );
    case "jury":
      return (
        <JuryPhase
          jurorNames={trialData.jurorNames}
          takes={trialData.jurors}
          onComplete={onNext}
        />
      );
    case "verdict":
      return (
        <VerdictReveal
          verdict={trialData.verdict}
          score={score}
          onSave={onSave}
          onReset={onReset}
        />
      );
    default:
      return null;
  }
}
