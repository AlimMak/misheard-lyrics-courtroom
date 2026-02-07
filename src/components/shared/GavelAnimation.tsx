"use client";

import { useEffect, useState } from "react";

interface GavelAnimationProps {
  readonly animate: boolean;
  readonly onComplete?: () => void;
}

const SHAKE_DELAY_MS = 720; // Screen shake at 60% of gavelSlam (1.2s animation)

export function GavelAnimation({ animate, onComplete }: GavelAnimationProps) {
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (!animate) {
      setShaking(false);
      return;
    }

    const timer = setTimeout(() => setShaking(true), SHAKE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [animate]);

  return (
    <div
      className={`flex items-center justify-center py-4 ${
        shaking ? "animate-screenShake" : ""
      }`}
    >
      <span
        className={`text-5xl inline-block ${
          animate ? "animate-gavelSlam" : ""
        }`}
        role="img"
        aria-label="Gavel"
        onAnimationEnd={onComplete}
      >
        &#x2696;
      </span>
    </div>
  );
}
