import { ProsecutionArgument } from "../../lib/types";
import { PhaseTransition } from "../shared/PhaseTransition";

interface ProsecutorPhaseProps {
  readonly prosecution: ProsecutionArgument;
  readonly onContinue: () => void;
}

export function ProsecutorPhase({
  prosecution,
  onContinue,
}: ProsecutorPhaseProps) {
  return (
    <PhaseTransition phase="prosecution" onContinue={onContinue}>
      <div className="text-center mb-4">
        <span className="text-red-400/70 text-xs uppercase tracking-widest">
          {prosecution.character.title}
        </span>
        <h3 className="text-xl font-serif text-red-300">
          {prosecution.character.name}
        </h3>
      </div>

      <div className="space-y-4">
        <blockquote className="border-l-2 border-red-800 pl-4 text-amber-100/90 italic font-serif leading-relaxed">
          &ldquo;{prosecution.opening}&rdquo;
        </blockquote>

        <div className="bg-red-950/20 rounded p-4 border border-red-900/20">
          <h4 className="text-red-400 text-xs uppercase tracking-widest mb-2">
            Evidence Presented
          </h4>
          <p className="text-amber-200/80 text-sm leading-relaxed">
            {prosecution.evidence}
          </p>
        </div>

        <blockquote className="border-l-2 border-red-800 pl-4 text-amber-100/90 italic font-serif leading-relaxed">
          &ldquo;{prosecution.closing}&rdquo;
        </blockquote>
      </div>
    </PhaseTransition>
  );
}
