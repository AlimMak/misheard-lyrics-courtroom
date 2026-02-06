interface CourtSealProps {
  readonly size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: "w-16 h-16 text-xs",
  md: "w-24 h-24 text-sm",
  lg: "w-32 h-32 text-base",
};

export function CourtSeal({ size = "md" }: CourtSealProps) {
  return (
    <div
      className={`${SIZES[size]} rounded-full border-4 border-amber-700 bg-amber-900/20 flex items-center justify-center`}
    >
      <div className="text-center leading-tight font-serif text-amber-300">
        <div className="text-lg">&#9878;</div>
        <div className="font-bold tracking-wider">COURT</div>
        <div className="text-[0.6em] tracking-widest opacity-75">
          OF LYRICS
        </div>
      </div>
    </div>
  );
}
