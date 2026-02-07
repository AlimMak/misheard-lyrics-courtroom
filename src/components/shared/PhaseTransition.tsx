import { ReactNode } from "react";

interface PhaseTransitionProps {
  readonly direction?: "left" | "right" | "up";
  readonly duration?: number;
  readonly children: ReactNode;
}

const DIRECTION_CLASS: Record<string, string> = {
  left: "animate-slideLeft",
  right: "animate-slideRight",
  up: "animate-slideUp",
};

export function PhaseTransition({
  direction = "up",
  duration,
  children,
}: PhaseTransitionProps) {
  return (
    <div
      className={DIRECTION_CLASS[direction]}
      style={duration ? { animationDuration: `${duration}ms` } : undefined}
    >
      {children}
    </div>
  );
}
