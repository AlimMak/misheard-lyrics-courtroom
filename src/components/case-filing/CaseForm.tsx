"use client";

import { useState } from "react";
import { CaseInput } from "../../lib/types";
import {
  MAX_LYRIC_LENGTH,
  MAX_ARTIST_LENGTH,
  MIN_LYRIC_LENGTH,
} from "../../lib/constants";
import { CourtSeal } from "../shared/CourtSeal";

interface CaseFormProps {
  readonly onSubmit: (input: CaseInput) => void;
}

function generateCaseNumber(): string {
  const year = new Date().getFullYear();
  const digits = Math.floor(Math.random() * 900000 + 100000);
  return `Case No. ${year}-${digits}`;
}

export function CaseForm({ onSubmit }: CaseFormProps) {
  const [misheard, setMisheard] = useState("");
  const [real, setReal] = useState("");
  const [artist, setArtist] = useState("");
  const [caseNumber] = useState(generateCaseNumber);

  const misheardTrimmed = misheard.trim();
  const realTrimmed = real.trim();
  const misheardTooShort =
    misheardTrimmed.length > 0 && misheardTrimmed.length < MIN_LYRIC_LENGTH;
  const realTooShort =
    realTrimmed.length > 0 && realTrimmed.length < MIN_LYRIC_LENGTH;
  const canSubmit =
    misheardTrimmed.length >= MIN_LYRIC_LENGTH &&
    realTrimmed.length >= MIN_LYRIC_LENGTH;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      misheard: misheard.trim(),
      real: real.trim(),
      artist: artist.trim() || undefined,
    });
  }

  return (
    <div className="relative max-w-lg mx-auto bg-amber-950/30 border border-amber-800/40 rounded-lg p-6 animate-fadeIn">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
        <CourtSeal size="lg" />
      </div>

      {/* Header */}
      <div className="relative text-center mb-6">
        <h2 className="text-xl font-serif font-bold text-amber-200 tracking-wider uppercase">
          Case Filing
        </h2>
        <p className="text-xs text-amber-500/60 tracking-widest uppercase mt-1">
          District Court of Auditory Crimes
        </p>
        <p className="text-xs text-amber-600/50 font-mono mt-2">{caseNumber}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative space-y-5">
        <Field label='EXHIBIT A — What the defendant claims to have heard:'>
          <textarea
            value={misheard}
            onChange={(e) => setMisheard(e.target.value)}
            placeholder="e.g., Wrapped up like a douche"
            maxLength={MAX_LYRIC_LENGTH}
            rows={2}
            className="court-input resize-none"
            required
          />
          {misheardTooShort && (
            <p className="text-red-400/70 text-xs mt-1 font-serif">
              At least {MIN_LYRIC_LENGTH} characters required
            </p>
          )}
        </Field>

        <Field label='EXHIBIT B — What was actually sung:'>
          <textarea
            value={real}
            onChange={(e) => setReal(e.target.value)}
            placeholder="e.g., Revved up like a deuce"
            maxLength={MAX_LYRIC_LENGTH}
            rows={2}
            className="court-input resize-none"
            required
          />
          {realTooShort && (
            <p className="text-red-400/70 text-xs mt-1 font-serif">
              At least {MIN_LYRIC_LENGTH} characters required
            </p>
          )}
        </Field>

        <Field label="ALLEGED ARTIST / SONG (optional):">
          <input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="e.g., Manfred Mann — Blinded by the Light"
            maxLength={MAX_ARTIST_LENGTH}
            className="court-input"
          />
        </Field>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full py-2.5 bg-amber-700 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-700 text-white rounded font-serif tracking-wider uppercase transition-colors cursor-pointer"
        >
          File Charges
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  readonly label: string;
  readonly children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs text-amber-400/80 font-serif tracking-wide uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
