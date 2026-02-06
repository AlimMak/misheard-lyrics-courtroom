"use client";

import { useTrialFlow } from "../hooks/useTrialFlow";
import { CaseForm } from "../components/case-filing/CaseForm";
import { TrialFlow } from "../components/trial/TrialFlow";
import { HallOfShame } from "../components/hall-of-shame/HallOfShame";

export default function Home() {
  const { state, fileCase, advancePhase, goToHallOfShame, reset } =
    useTrialFlow();

  if (state.phase === "hall-of-shame") {
    return (
      <Shell>
        <HallOfShame onBack={reset} />
      </Shell>
    );
  }

  if (state.phase === "filing") {
    return (
      <Shell>
        <CaseForm onSubmit={fileCase} onViewHistory={goToHallOfShame} />
      </Shell>
    );
  }

  if (state.trialResult) {
    return (
      <Shell>
        <TrialFlow
          phase={state.phase as "judge-intro" | "prosecution" | "defense" | "jury" | "verdict"}
          trialResult={state.trialResult}
          onAdvance={advancePhase}
          onNewCase={reset}
          onViewHistory={goToHallOfShame}
        />
      </Shell>
    );
  }

  return null;
}

function Shell({ children }: { readonly children: React.ReactNode }) {
  return (
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-amber-200 tracking-wide">
          Misheard Lyrics Courtroom
        </h1>
        <p className="text-amber-500/50 text-sm mt-1">
          Justice for every butchered lyric
        </p>
      </header>
      {children}
    </main>
  );
}
