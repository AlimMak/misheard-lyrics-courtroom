import { ShameEntry } from "../../lib/types";
import { ShameCard } from "./ShameCard";

interface HallOfShameProps {
  readonly entries: readonly ShameEntry[];
  readonly onClear: () => void;
}

export function HallOfShame({ entries, onClear }: HallOfShameProps) {
  function handleClear() {
    if (window.confirm("Clear all records? This cannot be undone.")) {
      onClear();
    }
  }

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-serif font-bold text-amber-200 tracking-wider uppercase">
          Hall of Shame
        </h2>
        <p className="text-xs text-amber-500/60 tracking-widest uppercase mt-1">
          Public Record of Auditory Crimes
        </p>
        {entries.length > 0 && (
          <p className="text-amber-600/40 text-xs mt-2">
            {entries.length} case{entries.length !== 1 ? "s" : ""} on record
          </p>
        )}
      </div>

      {/* Content */}
      {entries.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-amber-400/40 font-serif text-lg mb-2">
            No Cases on Record
          </p>
          <p className="text-amber-500/30 text-sm max-w-xs mx-auto">
            The public is suspiciously well-hearing. File a case to get started.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {entries.map((entry, i) => (
              <ShameCard key={entry.id} entry={entry} rank={i + 1} />
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleClear}
              className="text-xs text-red-400/50 hover:text-red-400 transition-colors cursor-pointer"
            >
              Clear All Records
            </button>
          </div>
        </>
      )}
    </div>
  );
}
