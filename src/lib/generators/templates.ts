export interface TemplateSlots {
  readonly misheard: string;
  readonly real: string;
  readonly song: string;
  readonly artist: string;
}

export function fillTemplate(
  template: string,
  slots: TemplateSlots
): string {
  return template
    .replace(/\{misheard\}/g, slots.misheard)
    .replace(/\{real\}/g, slots.real)
    .replace(/\{song\}/g, slots.song)
    .replace(/\{artist\}/g, slots.artist);
}

export function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function pickWeighted<T>(
  items: readonly T[],
  weights: readonly number[]
): T {
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) return items[i];
  }

  return items[items.length - 1];
}

export function pickMultiple<T>(
  items: readonly T[],
  count: number
): readonly T[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
