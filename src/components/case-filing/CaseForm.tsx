"use client";

import { useState } from "react";
import { CaseData } from "../../lib/types";
import {
  MAX_LYRIC_LENGTH,
  MAX_SONG_TITLE_LENGTH,
  MAX_ARTIST_LENGTH,
} from "../../lib/constants";
import { CourtSeal } from "../shared/CourtSeal";

type CaseInput = Omit<CaseData, "id" | "submittedAt">;

interface CaseFormProps {
  readonly onSubmit: (data: CaseInput) => void;
  readonly onViewHistory: () => void;
}

const EMPTY_FORM: CaseInput = {
  songTitle: "",
  artist: "",
  misheardLyric: "",
  realLyric: "",
};

export function CaseForm({ onSubmit, onViewHistory }: CaseFormProps) {
  const [form, setForm] = useState<CaseInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CaseInput, string>>>({});

  function validate(): boolean {
    const next: Partial<Record<keyof CaseInput, string>> = {};
    if (!form.songTitle.trim()) next.songTitle = "Song title is required";
    if (!form.artist.trim()) next.artist = "Artist is required";
    if (!form.misheardLyric.trim()) next.misheardLyric = "What did you THINK you heard?";
    if (!form.realLyric.trim()) next.realLyric = "What are the ACTUAL lyrics?";
    if (form.songTitle.length > MAX_SONG_TITLE_LENGTH) next.songTitle = "Too long";
    if (form.artist.length > MAX_ARTIST_LENGTH) next.artist = "Too long";
    if (form.misheardLyric.length > MAX_LYRIC_LENGTH) next.misheardLyric = "Too long";
    if (form.realLyric.length > MAX_LYRIC_LENGTH) next.realLyric = "Too long";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        songTitle: form.songTitle.trim(),
        artist: form.artist.trim(),
        misheardLyric: form.misheardLyric.trim(),
        realLyric: form.realLyric.trim(),
      });
    }
  }

  function updateField(field: keyof CaseInput, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  }

  return (
    <div className="max-w-lg mx-auto animate-fadeIn">
      <div className="flex flex-col items-center mb-8">
        <CourtSeal size="lg" />
        <h2 className="mt-4 text-2xl font-serif text-amber-200">
          File a Case
        </h2>
        <p className="text-amber-400/60 text-sm mt-1">
          Report a lyrical crime for trial
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Song Title" error={errors.songTitle}>
          <input
            value={form.songTitle}
            onChange={(e) => updateField("songTitle", e.target.value)}
            placeholder="e.g. Bohemian Rhapsody"
            maxLength={MAX_SONG_TITLE_LENGTH}
            className="court-input"
          />
        </Field>

        <Field label="Artist" error={errors.artist}>
          <input
            value={form.artist}
            onChange={(e) => updateField("artist", e.target.value)}
            placeholder="e.g. Queen"
            maxLength={MAX_ARTIST_LENGTH}
            className="court-input"
          />
        </Field>

        <Field label="What You Heard (The Crime)" error={errors.misheardLyric}>
          <textarea
            value={form.misheardLyric}
            onChange={(e) => updateField("misheardLyric", e.target.value)}
            placeholder="e.g. Saving his life from this warm sausage tea"
            maxLength={MAX_LYRIC_LENGTH}
            rows={2}
            className="court-input resize-none"
          />
        </Field>

        <Field label="The Real Lyrics" error={errors.realLyric}>
          <textarea
            value={form.realLyric}
            onChange={(e) => updateField("realLyric", e.target.value)}
            placeholder="e.g. Spare him his life from this monstrosity"
            maxLength={MAX_LYRIC_LENGTH}
            rows={2}
            className="court-input resize-none"
          />
        </Field>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 py-2.5 bg-amber-700 hover:bg-amber-600 text-white rounded font-serif tracking-wide transition-colors cursor-pointer"
          >
            Take to Trial
          </button>
          <button
            type="button"
            onClick={onViewHistory}
            className="px-4 py-2.5 border border-amber-800 text-amber-400 hover:bg-amber-900/30 rounded font-serif transition-colors cursor-pointer"
          >
            Hall of Shame
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  readonly label: string;
  readonly error?: string;
  readonly children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm text-amber-300 font-serif">{label}</span>
      {children}
      {error && <span className="text-red-400 text-xs mt-0.5 block">{error}</span>}
    </label>
  );
}
