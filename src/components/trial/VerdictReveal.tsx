"use client";

import { useState } from "react";
import { Verdict, Severity } from "../../lib/types";
import { GavelAnimation } from "../shared/GavelAnimation";

interface VerdictRevealProps {
  readonly verdict: Verdict;
  readonly score: number;
  readonly onSave: () => void;
  readonly onReset: () => void;
}

const SEVERITY_COLORS: Record<Severity, string> = {
  acquitted: "#2D6A4F",
  misdemeanor: "#E9C46A",
  felony: "#E76F51",
  capital: "#9B2226",
};

export function VerdictReveal({
  verdict,
  score,
  onSave,
  onReset,
}: VerdictRevealProps) {
  const [gavelDone, setGavelDone] = useState(false);
  const color = SEVERITY_COLORS[verdict.severity];

  return (
    <div className="text-center">
      {/* Gavel animation */}
      <GavelAnimation animate={true} onComplete={() => setGavelDone(true)} />

      {/* Reveal after gavel lands */}
      {gavelDone && (
        <div className="animate-fadeIn">
          {/* Big score */}
          <div className="mt-4 mb-2">
            <span
              className="text-6xl font-bold font-serif"
              style={{ color }}
            >
              {score}
            </span>
            <span className="text-amber-500/50 text-lg font-serif">/10</span>
          </div>

          {/* Verdict title */}
          <h2
            className="text-2xl font-serif font-bold mt-3 mb-2"
            style={{ color }}
          >
            {verdict.title}
          </h2>

          {/* Severity badge */}
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{
              color,
              backgroundColor: `${color}20`,
              borderColor: `${color}40`,
              borderWidth: 1,
            }}
          >
            {verdict.severity}
          </span>

          {/* Summary */}
          <p className="text-amber-200/80 font-serif text-sm leading-relaxed max-w-md mx-auto mb-6">
            {verdict.summary}
          </p>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={onSave}
              className="px-5 py-2.5 bg-amber-700 hover:bg-amber-600 text-white rounded font-serif transition-colors cursor-pointer"
            >
              Add to Hall of Shame
            </button>
            <button
              onClick={onReset}
              className="px-5 py-2.5 border border-amber-800 text-amber-400 hover:bg-amber-900/30 rounded font-serif transition-colors cursor-pointer"
            >
              File Another Case
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
