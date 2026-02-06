import { PHASE_LABELS } from "../../lib/constants";
import { TrialPhase } from "../../lib/types";

interface PhaseTransitionProps {
  readonly phase: TrialPhase;
  readonly onContinue: () => void;
  readonly children: React.ReactNode;
}

export function PhaseTransition({
  phase,
  onContinue,
  children,
}: PhaseTransitionProps) {
  const label = PHASE_LABELS[phase] ?? phase;

  return (
    <div className="animate-fadeIn">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-amber-800/30" />
        <span className="text-amber-400 font-serif text-sm uppercase tracking-widest">
          {label}
        </span>
        <div className="h-px flex-1 bg-amber-800/30" />
      </div>

      <div className="space-y-4">{children}</div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onContinue}
          className="px-6 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded font-serif tracking-wide transition-colors cursor-pointer"
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  );
}
