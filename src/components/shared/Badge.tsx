interface BadgeProps {
  readonly title: string;
  readonly emoji: string;
  readonly count: number;
}

export function Badge({ title, emoji, count }: BadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-amber-600 bg-amber-900/20 font-serif text-sm text-amber-200">
      <span role="img" aria-label={title}>
        {emoji}
      </span>
      <span className="font-semibold">{title}</span>
      <span className="text-xs text-amber-400/70">({count})</span>
    </span>
  );
}
