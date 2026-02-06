import { CaseData, DefenseArgument } from "../types";
import { fillTemplate, pickRandom, TemplateSlots } from "./templates";
import { generateDefenseName } from "./names";

const OPENINGS: readonly string[] = [
  "Your Honor, my client is INNOCENT. They are a VICTIM — a victim of ambiguous vocal mixing and questionable enunciation.",
  "Members of the jury, before you judge my client, I ask: have YOU ever sung the wrong lyrics? I thought so.",
  "The defense would like to remind the court that mishearing lyrics is a UNIVERSAL human experience, not a crime.",
  "Your Honor, my client has been dragged before this court for what is, at WORST, an honest misunderstanding of sound waves.",
  "I stand before you today to defend not just my client, but EVERYONE who has ever mumbled through a chorus.",
  "The prosecution would have you believe this is malicious. It's not. My client's brain simply... got creative.",
  "Ladies and gentlemen, my client didn't CHOOSE to hear \"{misheard}.\" The ears hear what they hear!",
  "Before we condemn my client, let's acknowledge: {artist}'s vocal delivery is, shall we say, open to interpretation.",
  "Your Honor, the defense moves to dismiss on grounds that music is art, and art is subjective. INCLUDING the lyrics.",
  "I'd like to call a key witness: literally anyone who has ever been in a car, heard a song, and made up their own words.",
  "The prosecution speaks of \"correct\" lyrics as if they're absolute truth. My client simply discovered an ALTERNATE truth.",
  "Your Honor, I submit that my client's version — \"{misheard}\" — while incorrect, shows remarkable creativity under acoustic pressure.",
  "Members of the jury, close your eyes. Imagine you're in a noisy room. The song comes on. Can you REALLY judge my client?",
  "The defense asks the court for compassion. My client's only crime was ENJOYING music — perhaps a bit too enthusiastically.",
  "I would remind the prosecution that MANY great discoveries started with a misunderstanding. My client is basically an innovator.",
];

const ARGUMENTS: readonly string[] = [
  "Consider the acoustics! \"{real}\" and \"{misheard}\" share phonetic similarities that would confuse even a trained linguist. My client had no chance.",
  "The defense presents Exhibit D: a noise analysis showing that in typical listening conditions, \"{real}\" and \"{misheard}\" are ACOUSTICALLY similar.",
  "Let's be real — {artist} is known for their unique vocal style. The line between \"{real}\" and \"{misheard}\" is THINNER than the prosecution admits.",
  "I've polled 100 random people. You'd be SHOCKED how many also heard \"{misheard}\" instead of \"{real}\" in \"{song}.\" My client is not alone.",
  "The defense argues that the human auditory system is FLAWED by design. My client's brain did its BEST with imperfect input.",
  "Your Honor, have you TRIED listening to \"{song}\" with earbuds? At normal volume? In a car? My client was set up for failure.",
  "I submit that \"{misheard}\" — while not what {artist} intended — tells its OWN story. A beautiful, misguided story.",
  "The prosecution ignores context. My client first heard this song at age twelve, in a noisy environment, probably through cheap speakers.",
  "The defense introduces character witnesses: my client's friends, who confirm they sing with PASSION if not ACCURACY.",
  "Let's examine the evidence fairly. \"{misheard}\" contains {matchCount} of the same consonant sounds as \"{real}.\" That's a reasonable mishearing!",
  "My client has listened to \"{song}\" hundreds of times. Each time, hearing \"{misheard}\" with absolute certainty. That's not a crime — that's COMMITMENT.",
  "The defense argues that {artist}'s production choices — reverb, backing vocals, instrumentation — create conditions where \"{misheard}\" is a LOGICAL interpretation.",
  "Your Honor, lyrics weren't printed in streaming apps until recently. My client grew up in the dark ages of GUESSING. Show mercy.",
];

const CLOSINGS: readonly string[] = [
  "The defense rests. My client's ears may not be perfect, but their love for music is genuine.",
  "I ask the jury: acquit my client, and let this be a lesson in COMPASSION for all who sing along imperfectly.",
  "In closing: to mishear is human. To forgive is divine. I trust this jury to be divine.",
  "My client has suffered enough embarrassment. A guilty verdict would be cruel and unusual punishment.",
  "The defense rests our case. And if you find my client guilty, at least admit that \"{misheard}\" would make a GREAT band name.",
  "Your Honor, my client promises to look up lyrics before singing in public from now on. Isn't that punishment enough?",
  "I leave the jury with this: every one of us is one noisy bar away from our own misheard lyric trial. Show mercy today.",
  "The defense rests. And we'd like the record to show that my client, upon learning the real lyrics, said 'Oh... that makes more sense.'",
  "In conclusion, my client is guilty of nothing more than having an active imagination and imperfect eardrums. That's not a crime.",
  "I trust the jury will see this for what it is: an innocent mistake, not a deliberate act of lyrical sabotage.",
  "The defense rests. My client would like to formally apologize to {artist}, to \"{song},\" and to music in general.",
];

function countMatchingConsonants(a: string, b: string): number {
  const consonants = (s: string) =>
    s.toLowerCase().replace(/[^bcdfghjklmnpqrstvwxyz]/g, "");
  const aSet = new Set(consonants(a).split(""));
  const bConsonants = consonants(b).split("");
  return bConsonants.filter((c) => aSet.has(c)).length;
}

export function generateDefense(caseData: CaseData): DefenseArgument {
  const character = generateDefenseName();
  const matchCount = countMatchingConsonants(
    caseData.misheardLyric,
    caseData.realLyric
  );
  const slots: TemplateSlots = {
    misheard: caseData.misheardLyric,
    real: caseData.realLyric,
    song: caseData.songTitle,
    artist: caseData.artist,
  };

  const filledArgument = fillTemplate(pickRandom(ARGUMENTS), slots).replace(
    "{matchCount}",
    String(matchCount)
  );

  return {
    character,
    opening: fillTemplate(pickRandom(OPENINGS), slots),
    argument: filledArgument,
    closing: fillTemplate(pickRandom(CLOSINGS), slots),
  };
}
