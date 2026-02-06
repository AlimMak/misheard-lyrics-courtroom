import { JurorReaction } from "../../lib/types";
import { PhaseTransition } from "../shared/PhaseTransition";

interface JuryPhaseProps {
  readonly jurors: readonly JurorReaction[];
  readonly onContinue: () => void;
}

function VoteIcon({ vote }: { readonly vote: "guilty" | "not-guilty" }) {
  const isGuilty = vote === "guilty";
  return (
    <span
      className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
        isGuilty
          ? "bg-red-900/40 text-red-400"
          : "bg-green-900/40 text-green-400"
      }`}
    >
      {isGuilty ? "Guilty" : "Not Guilty"}
    </span>
  );
}

export function JuryPhase({ jurors, onContinue }: JuryPhaseProps) {
  const guiltyCount = jurors.filter((j) => j.vote === "guilty").length;
  const total = jurors.length;

  return (
    <PhaseTransition phase="jury" onContinue={onContinue}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-serif text-amber-200">
          Jury Deliberation
        </h3>
        <p className="text-amber-400/60 text-sm mt-1">
          {guiltyCount} of {total} jurors voted guilty
        </p>
      </div>

      <div className="space-y-3">
        {jurors.map((juror, i) => (
          <div
            key={i}
            className="bg-amber-950/30 rounded p-3 border border-amber-900/20 animate-fadeIn"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-amber-300 font-serif text-sm">
                {juror.character.name}
              </span>
              <VoteIcon vote={juror.vote} />
            </div>
            <p className="text-amber-200/70 text-sm italic">
              &ldquo;{juror.reaction}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </PhaseTransition>
  );
}
