interface GavelAnimationProps {
  readonly playing?: boolean;
}

export function GavelAnimation({ playing = true }: GavelAnimationProps) {
  return (
    <div className="flex items-center justify-center py-4">
      <span
        className={`text-4xl inline-block ${playing ? "animate-gavel" : ""}`}
        role="img"
        aria-label="Gavel"
      >
        &#x2696;
      </span>
    </div>
  );
}
