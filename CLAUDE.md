# Project: Misheard Lyrics Courtroom

A fully self-contained courtroom-themed web app where users submit misheard song lyrics and receive a procedurally generated trial with dramatic courtroom characters.

- Stack: Next.js 15 + TypeScript + TailwindCSS
- NO external AI API calls. All courtroom dialogue is procedurally generated client-side using template engines, weighted randomization, and combinatorial text generation.
- State: React state + localStorage for persistence
- Deployment target: Vercel (static export compatible)
- No external UI component libraries. Tailwind only.
- No framer-motion. All animations are pure CSS.

## Architecture Rules

- Max 200 lines per file. Split by feature, not file type.
- Components are pure — no side effects, no localStorage access
- All persistence goes through dedicated storage utilities
- All procedural generation goes through dedicated generator modules in lib/generators/
- Error boundaries around any dynamic content

## Key Design Decision: Procedural Generation over AI

Instead of calling an LLM at runtime, this app uses a sophisticated procedural text generation system:

- Template pools with 50+ variants per courtroom role
- Mad-libs style slot filling using the actual misheard/real lyrics
- Weighted randomization so repeat users get different results
- Sentiment-aware scoring (longer/more absurd mishearings score higher)
- The generation should feel genuinely funny and varied, not repetitive

## File Structure Target

```
src/
  app/
    page.tsx              (< 80 lines — layout shell + state routing)
    layout.tsx            (< 30 lines)
    globals.css           (Tailwind + custom courtroom theme)
  components/
    case-filing/
      CaseForm.tsx
    trial/
      TrialFlow.tsx       (orchestrates phases)
      JudgePhase.tsx
      ProsecutorPhase.tsx
      DefensePhase.tsx
      JuryPhase.tsx
      VerdictReveal.tsx
    hall-of-shame/
      HallOfShame.tsx
      ShameCard.tsx
    shared/
      GavelAnimation.tsx
      Badge.tsx
      PhaseTransition.tsx
      CourtSeal.tsx
  lib/
    generators/
      judge.ts            (judge intro/ruling generation)
      prosecutor.ts       (prosecution arguments)
      defense.ts          (defense arguments)
      jury.ts             (juror hot takes)
      verdict.ts          (scoring algorithm + verdict titles)
      names.ts            (procedural character name generation)
      templates.ts        (shared template utilities)
    storage.ts            (localStorage wrapper)
    constants.ts          (badge tiers, theme tokens)
    scoring.ts            (mishearing severity algorithm)
    types.ts              (all shared types in one file)
  hooks/
    useTrialFlow.ts       (state machine for trial phases)
    useLocalStorage.ts    (typed localStorage hook)
```

## Commands

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run lint` — run ESLint
