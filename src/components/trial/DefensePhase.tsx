import { DefenseArgument } from "../../lib/types";
import { PhaseTransition } from "../shared/PhaseTransition";

interface DefensePhaseProps {
  readonly defense: DefenseArgument;
  readonly onContinue: () => void;
}

export function DefensePhase({ defense, onContinue }: DefensePhaseProps) {
  return (
    <PhaseTransition phase="defense" onContinue={onContinue}>
      <div className="text-center mb-4">
        <span className="text-blue-400/70 text-xs uppercase tracking-widest">
          {defense.character.title}
        </span>
        <h3 className="text-xl font-serif text-blue-300">
          {defense.character.name}
        </h3>
      </div>

      <div className="space-y-4">
        <blockquote className="border-l-2 border-blue-800 pl-4 text-amber-100/90 italic font-serif leading-relaxed">
          &ldquo;{defense.opening}&rdquo;
        </blockquote>

        <div className="bg-blue-950/20 rounded p-4 border border-blue-900/20">
          <h4 className="text-blue-400 text-xs uppercase tracking-widest mb-2">
            Defense Argument
          </h4>
          <p className="text-amber-200/80 text-sm leading-relaxed">
            {defense.argument}
          </p>
        </div>

        <blockquote className="border-l-2 border-blue-800 pl-4 text-amber-100/90 italic font-serif leading-relaxed">
          &ldquo;{defense.closing}&rdquo;
        </blockquote>
      </div>
    </PhaseTransition>
  );
}
