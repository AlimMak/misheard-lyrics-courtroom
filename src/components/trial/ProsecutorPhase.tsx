"use client";

import { useEffect, useRef, useState } from "react";
import { PhaseTransition } from "../shared/PhaseTransition";
import { useTypewriter } from "../../hooks/useTypewriter";

interface ProsecutorPhaseProps {
  readonly argument: string;
  readonly onComplete: () => void;
}

const AUTO_ADVANCE_MS = 2000;

export function ProsecutorPhase({ argument, onComplete }: ProsecutorPhaseProps) {
  const { displayText, isComplete } = useTypewriter(argument);
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
    <PhaseTransition direction="left">
      <div className="bg-red-950/20 border border-[#8B0000]/30 rounded-lg p-6">
        <h3 className="text-lg font-serif font-bold text-[#8B0000] uppercase tracking-wider mb-4">
          The Prosecution Argues:
        </h3>

        <p className="text-amber-100/90 font-serif leading-relaxed min-h-[3rem]">
          &ldquo;{displayText}
          {!isComplete && <span className="animate-pulse">|</span>}
          {isComplete && "&rdquo;"}
        </p>

        {isComplete && !canContinue && (
          <button
            onClick={() => {
              if (timerRef.current) clearTimeout(timerRef.current);
              setCanContinue(true);
            }}
            className="mt-4 w-full text-center text-amber-500/50 text-sm hover:text-amber-400 transition-colors animate-fadeIn cursor-pointer"
          >
            Click to continue
          </button>
        )}
      </div>
    </PhaseTransition>
  );
}
