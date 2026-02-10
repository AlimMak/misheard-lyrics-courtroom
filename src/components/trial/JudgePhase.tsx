"use client";

import { useEffect, useRef, useState } from "react";
import { PhaseTransition } from "../shared/PhaseTransition";
import { useTypewriter } from "../../hooks/useTypewriter";

interface JudgePhaseProps {
  readonly name: string;
  readonly intro: string;
  readonly onComplete: () => void;
}

const AUTO_ADVANCE_MS = 2000;

export function JudgePhase({ name, intro, onComplete }: JudgePhaseProps) {
  const { displayText, isComplete } = useTypewriter(intro);
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
    <PhaseTransition direction="up">
      <div className="bg-amber-950/40 border border-amber-800/30 rounded-lg p-6">
        {/* Judge nameplate */}
        <div className="text-center mb-5">
          <span className="text-2xl" role="img" aria-label="Gavel">
            &#x1F528;
          </span>
          <div className="mt-2">
            <span className="text-amber-500/60 text-xs uppercase tracking-widest">
              Presiding
            </span>
            <h3 className="text-lg font-serif font-bold text-amber-200">
              {name}
            </h3>
          </div>
        </div>

        {/* Typewriter intro */}
        <blockquote className="border-l-2 border-amber-700 pl-4 text-amber-100/90 italic font-serif leading-relaxed min-h-[3rem]">
          &ldquo;{displayText}
          {!isComplete && <span className="animate-pulse">|</span>}
          {isComplete && "&rdquo;"}
        </blockquote>

        {/* Continue prompt */}
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
