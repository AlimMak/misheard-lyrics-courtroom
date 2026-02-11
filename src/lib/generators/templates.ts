/**
 * Seedable PRNG using mulberry32 algorithm.
 * Returns a function that produces deterministic [0, 1) values.
 */
export function seedableRandom(seed: number): () => number {
  let state = seed | 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Pick a single random item from an array using the provided PRNG.
 */
export function pickRandom<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

/**
 * Pick `count` unique items from an array using Fisher-Yates shuffle.
 */
export function pickMultiple<T>(
  arr: readonly T[],
  count: number,
  rng: () => number
): T[] {
  const copy = [...arr];
  const result: T[] = [];
  const n = Math.min(count, copy.length);

  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(rng() * (copy.length - i));
    [copy[i], copy[j]] = [copy[j], copy[i]];
    result.push(copy[i]);
  }

  return result;
}

/**
 * Replace {key} placeholders in a template string with values from vars.
 */
export function fillTemplate(
  template: string,
  vars: Record<string, string>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    if (key in vars) return vars[key];
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[fillTemplate] Missing key "${key}" in template: "${template.slice(0, 60)}..."`
      );
    }
    return match;
  });
}
