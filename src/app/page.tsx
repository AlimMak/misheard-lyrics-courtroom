"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CaseInput } from "../lib/types";
import { useTrialFlow } from "../hooks/useTrialFlow";
import { useHallOfShame } from "../hooks/useHallOfShame";
import { useBadge } from "../hooks/useBadge";
import { CaseForm } from "../components/case-filing/CaseForm";
import { TrialFlow } from "../components/trial/TrialFlow";
import { HallOfShame } from "../components/hall-of-shame/HallOfShame";
import { Badge } from "../components/shared/Badge";
import { ErrorBoundary } from "../components/shared/ErrorBoundary";

type Tab = "file" | "shame";

export default function Home() {
  const { phase, trialData, score, startTrial, nextPhase, skipToVerdict, reset } =
    useTrialFlow();
  const { entries, addEntry, clearAll } = useHallOfShame();
  const { count, tier, refresh } = useBadge();

  const [tab, setTab] = useState<Tab>("file");
  const caseInputRef = useRef<CaseInput | null>(null);

  const handleFile = useCallback(
    (input: CaseInput) => {
      caseInputRef.current = input;
      startTrial(input);
    },
    [startTrial]
  );

  const handleSave = useCallback(() => {
    if (!caseInputRef.current || !trialData) return;
    addEntry(caseInputRef.current, trialData);
    refresh();
    reset();
    setTab("shame");
  }, [trialData, addEntry, refresh, reset]);

  const handleClear = useCallback(() => {
    clearAll();
    refresh();
  }, [clearAll, refresh]);

  // Auto-reset when trial completes without save
  useEffect(() => {
    if (phase === "complete") reset();
  }, [phase, reset]);

  const isTrialActive =
    phase !== "idle" &&
    phase !== "filing" &&
    phase !== "loading" &&
    phase !== "complete";

  return (
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-amber-200 tracking-wide">
          THE PEOPLE vs. YOUR EARS
        </h1>
        <p className="text-amber-500/50 text-sm mt-1">
          Misheard Lyrics Courtroom
        </p>
        {tier && (
          <div className="mt-3">
            <Badge title={tier.title} emoji={tier.emoji} count={count} />
          </div>
        )}
      </header>

      {/* Tab navigation */}
      {phase === "idle" && (
        <nav className="flex justify-center gap-6 mb-6 border-b border-amber-900/30 pb-2">
          <TabButton
            active={tab === "file"}
            onClick={() => setTab("file")}
            label="File a Case"
          />
          <TabButton
            active={tab === "shame"}
            onClick={() => setTab("shame")}
            label="Hall of Shame"
          />
        </nav>
      )}

      {/* Content */}
      {phase === "idle" && tab === "file" && (
        <ErrorBoundary>
          <CaseForm onSubmit={handleFile} />
        </ErrorBoundary>
      )}
      {phase === "idle" && tab === "shame" && (
        <ErrorBoundary>
          <HallOfShame entries={entries} onClear={handleClear} />
        </ErrorBoundary>
      )}
      {phase === "loading" && (
        <p className="text-center text-amber-400/60 font-serif text-lg animate-pulse py-16">
          Assembling the court&hellip;
        </p>
      )}
      {isTrialActive && trialData && score !== null && (
        <ErrorBoundary fallbackMessage="The trial has encountered an unexpected error. Please file a new case.">
          <TrialFlow
            phase={phase}
            trialData={trialData}
            score={score}
            onNext={nextPhase}
            onSave={handleSave}
            onReset={reset}
            onSkipToVerdict={skipToVerdict}
            onAbandon={reset}
          />
        </ErrorBoundary>
      )}
    </main>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  readonly active: boolean;
  readonly onClick: () => void;
  readonly label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`pb-1 text-sm font-serif tracking-wide transition-colors cursor-pointer ${
        active
          ? "border-b-2 border-amber-500 text-amber-200"
          : "text-amber-500/50 hover:text-amber-400"
      }`}
    >
      {label}
    </button>
  );
}
