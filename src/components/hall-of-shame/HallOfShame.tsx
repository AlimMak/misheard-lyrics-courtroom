"use client";

import { useEffect, useState } from "react";
import { TrialResult } from "../../lib/types";
import { loadTrialHistory, clearTrialHistory } from "../../lib/storage";
import { ShameCard } from "./ShameCard";
import { Badge } from "../shared/Badge";

interface HallOfShameProps {
  readonly onBack: () => void;
}

export function HallOfShame({ onBack }: HallOfShameProps) {
  const [history, setHistory] = useState<readonly TrialResult[]>([]);

  useEffect(() => {
    setHistory(loadTrialHistory());
  }, []);

  function handleClear() {
    clearTrialHistory();
    setHistory([]);
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-serif text-amber-200">
            Hall of Shame
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-amber-400/60 text-sm">
              {history.length} case{history.length !== 1 ? "s" : ""} on record
            </span>
            {history.length > 0 && <Badge caseCount={history.length} />}
          </div>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 border border-amber-800 text-amber-400 hover:bg-amber-900/30 rounded font-serif text-sm transition-colors cursor-pointer"
        >
          &larr; Back
        </button>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-amber-400/50 font-serif">
            No cases on record. File your first case to begin.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-3">
            {history.map((trial, i) => (
              <ShameCard key={`${trial.caseData.id}-${i}`} trial={trial} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={handleClear}
              className="text-xs text-red-400/60 hover:text-red-400 transition-colors cursor-pointer"
            >
              Clear all records
            </button>
          </div>
        </>
      )}
    </div>
  );
}
