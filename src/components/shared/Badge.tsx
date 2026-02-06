import { BADGE_TIERS } from "../../lib/constants";
import { BadgeTier } from "../../lib/types";

interface BadgeProps {
  readonly caseCount: number;
}

function getCurrentTier(caseCount: number): BadgeTier {
  const sorted = [...BADGE_TIERS].sort((a, b) => b.minCases - a.minCases);
  return (
    sorted.find((tier) => caseCount >= tier.minCases) ?? BADGE_TIERS[0]
  );
}

export function Badge({ caseCount }: BadgeProps) {
  const tier = getCurrentTier(caseCount);

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border"
      style={{
        borderColor: tier.color,
        color: tier.color,
        backgroundColor: `${tier.color}15`,
      }}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tier.color }} />
      {tier.label}
    </span>
  );
}
