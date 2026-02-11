"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_SPEED_MS = 30;

interface TypewriterResult {
  readonly displayText: string;
  readonly isComplete: boolean;
  readonly skipToEnd: () => void;
}

export function useTypewriter(
  text: string,
  speed: number = DEFAULT_SPEED_MS
): TypewriterResult {
  const [charIndex, setCharIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setCharIndex(0);

    if (text.length === 0) return;

    let index = 0;
    intervalRef.current = setInterval(() => {
      index++;
      setCharIndex(index);
      if (index >= text.length) {
        if (intervalRef.current !== null) clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, speed);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, speed]);

  const skipToEnd = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCharIndex(text.length);
  }, [text.length]);

  return {
    displayText: text.slice(0, charIndex),
    isComplete: charIndex >= text.length && text.length > 0,
    skipToEnd,
  };
}
