"use client";

import { useEffect, useRef, useState } from "react";
import { PhaseTransition } from "../shared/PhaseTransition";
import { useTypewriter } from "../../hooks/useTypewriter";

interface DefensePhaseProps {
  readonly argument: string;
  readonly onComplete: () => void;
}

const AUTO_ADVANCE_MS = 2000;

export function DefensePhase({ argument, onComplete }: DefensePhaseProps) {
  const { displayText, isComplete, skipToEnd } = useTypewriter(argument);
  const [canContinue, setCanContinue] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isComplete) return;

    timerRef.current = setTimeout(() => {
      setCanContinue(true);
    }, AUTO_ADVANCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isComplete]);

  useEffect(() => {
    if (canContinue) onComplete();
  }, [canContinue, onComplete]);

  return (
    <PhaseTransition direction="right">
      <div className="bg-blue-950/20 border border-[#1B3A5C]/30 rounded-lg p-6">
        <h3 className="text-lg font-serif font-bold text-[#1B3A5C] uppercase tracking-wider mb-4">
          The Defense Responds:
        </h3>

        <p
          className={`text-amber-100/90 font-serif leading-relaxed min-h-[3rem] ${
            !isComplete ? "cursor-pointer" : ""
          }`}
          onClick={!isComplete ? skipToEnd : undefined}
          title={!isComplete ? "Click to skip" : undefined}
        >
          &ldquo;{displayText}
          {!isComplete && <span className="animate-cursorBlink">|</span>}
          {isComplete && "&rdquo;"}
        </p>

        {isComplete && !canContinue && (
          <button
            onClick={() => {
              if (timerRef.current) clearTimeout(timerRef.current);
              setCanContinue(true);
            }}
            className="mt-4 w-full text-center text-amber-500/50 text-sm hover:text-amber-400 transition-colors animate-delayedFadeIn cursor-pointer"
          >
            Click to continue
          </button>
        )}
      </div>
    </PhaseTransition>
  );
}
