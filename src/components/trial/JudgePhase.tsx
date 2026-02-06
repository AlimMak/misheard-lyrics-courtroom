import { JudgeIntro } from "../../lib/types";
import { PhaseTransition } from "../shared/PhaseTransition";
import { GavelAnimation } from "../shared/GavelAnimation";

interface JudgePhaseProps {
  readonly judge: JudgeIntro;
  readonly onContinue: () => void;
}

export function JudgePhase({ judge, onContinue }: JudgePhaseProps) {
  return (
    <PhaseTransition phase="judge-intro" onContinue={onContinue}>
      <GavelAnimation />

      <div className="text-center mb-4">
        <span className="text-amber-500/70 text-xs uppercase tracking-widest">
          {judge.character.title}
        </span>
        <h3 className="text-xl font-serif text-amber-200">
          {judge.character.name}
        </h3>
      </div>

      <blockquote className="border-l-2 border-amber-700 pl-4 text-amber-100/90 italic font-serif leading-relaxed">
        &ldquo;{judge.openingStatement}&rdquo;
      </blockquote>

      <div className="mt-4 bg-amber-950/40 rounded p-4 border border-amber-900/30">
        <p className="text-amber-200/80 text-sm leading-relaxed">
          {judge.caseDescription}
        </p>
      </div>
    </PhaseTransition>
  );
}
