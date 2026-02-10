"use client";

import { useEffect, useRef, useState } from "react";
import { PhaseTransition } from "../shared/PhaseTransition";

interface JuryPhaseProps {
  readonly jurorNames: readonly [string, string, string];
  readonly takes: readonly [string, string, string];
  readonly onComplete: () => void;
}

const STAGGER_MS = 500;
const AUTO_ADVANCE_MS = 2000;
const JUROR_COUNT = 3;

export function JuryPhase({ jurorNames, takes, onComplete }: JuryPhaseProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visibleCount >= JUROR_COUNT) {
      timerRef.current = setTimeout(onComplete, AUTO_ADVANCE_MS);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    timerRef.current = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, STAGGER_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visibleCount, onComplete]);

  return (
    <PhaseTransition direction="up">
      <div>
        <h3 className="text-lg font-serif font-bold text-amber-200 uppercase tracking-wider text-center mb-5">
          Jury Deliberation
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jurorNames.map((name, i) => (
            <div
              key={i}
              className={`bg-amber-950/30 border border-amber-900/20 rounded-lg p-4 transition-opacity duration-300 ${
                i < visibleCount ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Juror name */}
              <p className="text-amber-400 text-xs font-serif font-semibold mb-2 truncate">
                {name}
              </p>

              {/* Speech bubble */}
              <div className="bg-amber-900/20 rounded-lg p-3 relative">
                <div className="absolute -top-1.5 left-4 w-3 h-3 bg-amber-900/20 rotate-45" />
                <p className="text-amber-100/80 text-sm italic font-serif leading-relaxed relative">
                  &ldquo;{takes[i]}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {visibleCount >= JUROR_COUNT && (
          <button
            onClick={onComplete}
            className="mt-4 w-full text-center text-amber-500/50 text-sm hover:text-amber-400 transition-colors animate-fadeIn cursor-pointer"
          >
            Click to continue
          </button>
        )}
      </div>
    </PhaseTransition>
  );
}
