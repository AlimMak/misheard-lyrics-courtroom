import { useId } from "react";

interface CourtSealProps {
  readonly size?: "sm" | "md" | "lg";
}

const DIMENSIONS: Record<string, number> = {
  sm: 64,
  md: 96,
  lg: 128,
};

export function CourtSeal({ size = "md" }: CourtSealProps) {
  const id = useId();
  const dim = DIMENSIONS[size];
  const topArcId = `${id}-topArc`;
  const bottomArcId = `${id}-bottomArc`;

  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Court of Lyrics Seal"
      role="img"
    >
      {/* Outer ring */}
      <circle cx="64" cy="64" r="60" stroke="#b45309" strokeWidth="3" fill="rgba(120,53,15,0.15)" />
      <circle cx="64" cy="64" r="52" stroke="#b45309" strokeWidth="1" fill="none" />

      {/* Text along top arc */}
      <defs>
        <path id={topArcId} d="M 20,64 a 44,44 0 1,1 88,0" />
        <path id={bottomArcId} d="M 108,64 a 44,44 0 1,1 -88,0" />
      </defs>
      <text fill="#fcd34d" fontSize="10" fontFamily="Georgia, serif" fontWeight="bold" letterSpacing="3">
        <textPath href={`#${topArcId}`} startOffset="50%" textAnchor="middle">
          COURT OF LYRICS
        </textPath>
      </text>
      <text fill="#fcd34d" fontSize="8" fontFamily="Georgia, serif" letterSpacing="2" opacity="0.7">
        <textPath href={`#${bottomArcId}`} startOffset="50%" textAnchor="middle">
          EST. MMXXV
        </textPath>
      </text>

      {/* Scales of justice */}
      <g transform="translate(64,62)" stroke="#b45309" strokeWidth="1.5" fill="none">
        {/* Center pillar */}
        <line x1="0" y1="-18" x2="0" y2="12" />
        {/* Base */}
        <line x1="-8" y1="12" x2="8" y2="12" />
        {/* Beam */}
        <line x1="-18" y1="-14" x2="18" y2="-14" />
        {/* Left chain + pan */}
        <line x1="-18" y1="-14" x2="-18" y2="-4" />
        <path d="M -24,-4 Q -18,4 -12,-4" />
        {/* Right chain + pan */}
        <line x1="18" y1="-14" x2="18" y2="-4" />
        <path d="M 12,-4 Q 18,4 24,-4" />
        {/* Top ornament */}
        <circle cx="0" cy="-18" r="2" fill="#b45309" />
      </g>
    </svg>
  );
}
