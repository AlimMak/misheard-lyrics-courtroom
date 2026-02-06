import { TrialResult } from "../../lib/types";

interface ShameCardProps {
  readonly trial: TrialResult;
}

const LEVEL_COLORS = {
  acquitted: "border-green-800/40 text-green-400",
  misdemeanor: "border-yellow-800/40 text-yellow-400",
  felony: "border-orange-800/40 text-orange-400",
  "crime-against-music": "border-red-800/40 text-red-400",
};

export function ShameCard({ trial }: ShameCardProps) {
  const color = LEVEL_COLORS[trial.verdict.level];
  const date = new Date(trial.timestamp).toLocaleDateString();

  return (
    <div className={`border rounded p-4 bg-amber-950/20 ${color.split(" ")[0]}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-serif text-amber-200 text-sm">
            {trial.caseData.songTitle}
          </h4>
          <p className="text-amber-400/60 text-xs">{trial.caseData.artist}</p>
        </div>
        <div className="text-right">
          <span className={`text-xs font-bold ${color.split(" ")[1]}`}>
            {trial.verdict.score}/100
          </span>
          <p className="text-amber-600 text-[10px]">{date}</p>
        </div>
      </div>

      <div className="space-y-1 mb-2">
        <p className="text-red-300/80 text-xs">
          <span className="text-red-500/60">Heard: </span>
          &ldquo;{trial.caseData.misheardLyric}&rdquo;
        </p>
        <p className="text-green-300/80 text-xs">
          <span className="text-green-500/60">Actual: </span>
          &ldquo;{trial.caseData.realLyric}&rdquo;
        </p>
      </div>

      <p className={`text-xs font-serif font-bold ${color.split(" ")[1]}`}>
        {trial.verdict.title}
      </p>
    </div>
  );
}
