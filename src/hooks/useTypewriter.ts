"use client";

import { useEffect, useState } from "react";

const DEFAULT_SPEED_MS = 30;

export function useTypewriter(
  text: string,
  speed: number = DEFAULT_SPEED_MS
): { displayText: string; isComplete: boolean } {
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    setCharIndex(0);

    if (text.length === 0) return;

    let index = 0;
    const timer = setInterval(() => {
      index++;
      setCharIndex(index);
      if (index >= text.length) clearInterval(timer);
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return {
    displayText: text.slice(0, charIndex),
    isComplete: charIndex >= text.length && text.length > 0,
  };
}
