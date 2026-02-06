"use client";

import { useEffect, useState } from "react";
import { BadgeTier } from "../lib/types";
import { getSubmissionCount } from "../lib/storage";
import { BADGE_TIERS } from "../lib/constants";

function findTier(count: number): BadgeTier | null {
  if (count === 0) return null;

  const sorted = [...BADGE_TIERS].sort((a, b) => b.minCount - a.minCount);
  return sorted.find((tier) => count >= tier.minCount) ?? null;
}

export function useBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getSubmissionCount());
  }, []);

  const tier = findTier(count);

  return { count, tier, refresh: () => setCount(getSubmissionCount()) } as const;
}
