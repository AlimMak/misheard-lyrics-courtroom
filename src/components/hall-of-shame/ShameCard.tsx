import { ShameEntry } from "../../lib/types";

interface ShameCardProps {
  readonly entry: ShameEntry;
  readonly rank: number;
}

function scoreColor(score: number): string {
  if (score >= 9) return "#9B2226";
  if (score >= 7) return "#E76F51";
  if (score >= 4) return "#E9C46A";
  return "#2D6A4F";
}

function rankDisplay(rank: number): string {
  if (rank === 1) return "\u{1F947}";
  if (rank === 2) return "\u{1F948}";
  if (rank === 3) return "\u{1F949}";
  return `#${rank}`;
}

function relativeTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 172800) return "yesterday";
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function ShameCard({ entry, rank }: ShameCardProps) {
  const color = scoreColor(entry.score);

  return (
    <div className="bg-amber-950/20 border border-amber-900/20 rounded-lg p-4 hover:translate-y-[-1px] hover:shadow-lg transition-all">
      <div className="flex items-start justify-between gap-3">
        {/* Left: rank + lyrics */}
        <div className="flex items-start gap-3 min-w-0">
          <span className="text-lg shrink-0 leading-tight">
            {rankDisplay(rank)}
          </span>
          <div className="min-w-0">
            <p className="text-red-300/80 text-sm truncate">
              <span className="text-red-500/50 text-xs">Heard: </span>
              &ldquo;{entry.misheard}&rdquo;
            </p>
            <p className="text-green-300/80 text-sm truncate">
              <span className="text-green-500/50 text-xs">Actual: </span>
              &ldquo;{entry.real}&rdquo;
            </p>
            {entry.artist && (
              <p className="text-amber-500/50 text-xs mt-1">{entry.artist}</p>
            )}
          </div>
        </div>

        {/* Right: score + verdict + time */}
        <div className="text-right shrink-0">
          <span className="text-lg font-bold font-serif" style={{ color }}>
            {entry.score}
          </span>
          <span className="text-amber-600/50 text-xs">/10</span>
          <p className="text-xs font-serif font-semibold mt-0.5" style={{ color }}>
            {entry.verdictTitle}
          </p>
          <p className="text-amber-600/40 text-[10px] mt-1">
            {relativeTime(entry.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
}
