import { Verdict, CaseData } from "../../lib/types";

interface VerdictRevealProps {
  readonly verdict: Verdict;
  readonly caseData: CaseData;
  readonly onNewCase: () => void;
  readonly onViewHistory: () => void;
}

const LEVEL_STYLES = {
  acquitted: {
    bg: "bg-green-950/30",
    border: "border-green-800/40",
    title: "text-green-300",
    badge: "bg-green-900/40 text-green-400",
  },
  misdemeanor: {
    bg: "bg-yellow-950/30",
    border: "border-yellow-800/40",
    title: "text-yellow-300",
    badge: "bg-yellow-900/40 text-yellow-400",
  },
  felony: {
    bg: "bg-orange-950/30",
    border: "border-orange-800/40",
    title: "text-orange-300",
    badge: "bg-orange-900/40 text-orange-400",
  },
  "crime-against-music": {
    bg: "bg-red-950/30",
    border: "border-red-800/40",
    title: "text-red-300",
    badge: "bg-red-900/40 text-red-400",
  },
};

export function VerdictReveal({
  verdict,
  caseData,
  onNewCase,
  onViewHistory,
}: VerdictRevealProps) {
  const style = LEVEL_STYLES[verdict.level];

  return (
    <div className="animate-fadeIn text-center">
      <div className="mb-6">
        <div className="text-amber-500/70 text-xs uppercase tracking-widest mb-2">
          The Verdict
        </div>
        <h3 className={`text-2xl font-serif font-bold ${style.title}`}>
          {verdict.title}
        </h3>
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50" cy="50" r="45"
              fill="none" stroke="currentColor"
              className="text-amber-900/30" strokeWidth="8"
            />
            <circle
              cx="50" cy="50" r="45"
              fill="none" stroke="currentColor"
              className={style.title} strokeWidth="8"
              strokeDasharray={`${verdict.score * 2.83} 283`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-bold ${style.title}`}>
              {verdict.score}
            </span>
          </div>
        </div>
      </div>

      <div className={`${style.bg} ${style.border} border rounded p-4 mb-4 text-left`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-amber-300 font-serif text-sm">
            &ldquo;{caseData.misheardLyric}&rdquo;
          </span>
          <span className="text-amber-600 text-xs">vs</span>
          <span className="text-amber-300 font-serif text-sm">
            &ldquo;{caseData.realLyric}&rdquo;
          </span>
        </div>
        <p className="text-amber-200/80 text-sm leading-relaxed mb-3">
          {verdict.summary}
        </p>
        <div className={`${style.badge} inline-block px-3 py-1 rounded text-xs font-bold`}>
          Sentence: {verdict.sentence}
        </div>
      </div>

      <div className="flex gap-3 justify-center mt-6">
        <button
          onClick={onNewCase}
          className="px-6 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded font-serif transition-colors cursor-pointer"
        >
          File New Case
        </button>
        <button
          onClick={onViewHistory}
          className="px-6 py-2 border border-amber-800 text-amber-400 hover:bg-amber-900/30 rounded font-serif transition-colors cursor-pointer"
        >
          Hall of Shame
        </button>
      </div>
    </div>
  );
}
