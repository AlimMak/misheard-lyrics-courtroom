import { CaseInput } from "../types";
import { seedableRandom, pickRandom, fillTemplate } from "./templates";

const TEMPLATES: readonly string[] = [
  "Members of the jury, I ask you: which is more compelling? '{real}'? Or '{misheard}'? My client didn't mishear the lyrics — they IMPROVED them. The defense rests.",
  "Your Honor, my client stands accused of hearing '{misheard}' instead of '{real}'. But consider this: '{misheard}' tells a BETTER story. It's more vivid. More HUMAN. My client's ears aren't broken — they're visionary.",
  "The prosecution wants you to believe '{misheard}' is some kind of crime. But isn't all art open to interpretation? '{real}' is what was written. '{misheard}' is what was FELT. {artist_line}My client listened with their heart.",
  "Ladies and gentlemen, I have listened to this song forty-seven times preparing for this trial. And you know what? On listen thirty-two, I ALSO heard '{misheard}' instead of '{real}'. {artist_line}The defense argues this is a DESIGN FLAW in the song.",
  "Let's talk about what '{misheard}' actually MEANS for a moment. Forget '{real}'. My client's version introduces themes of {random_theme} that the original LACKED. This isn't a mishearing — it's a creative contribution.",
  "Your Honor, if you played '{real}' and '{misheard}' to a hundred people on the street, I GUARANTEE at least twelve would side with my client. {artist_line}This is a reasonable interpretation, not a crime.",
  "The defense would like to point out that my client has been singing '{misheard}' with ABSOLUTE CONVICTION, possibly for years, and nobody corrected them. Society failed my client. The SYSTEM failed them.",
  "I put it to you, members of the jury: is it possible — just POSSIBLE — that '{misheard}' is what {artist_ref} ACTUALLY meant to write, but chickened out at the last minute? My client may have uncovered the original draft.",
  "Your Honor, '{real}' and '{misheard}' share a rhythmic structure, a tonal quality, and an emotional throughline. The fact that they use DIFFERENT WORDS is, frankly, a technicality.",
  "The prosecution talks about '{real}' as if lyrics are sacred text. They're NOT. They're sound waves. And my client's brain decoded those sound waves into '{misheard}', which — I'll say it — SLAPS HARDER.",
  "My client was singing along to music. Engaging with art. Living their BEST LIFE. And the prosecution wants to PUNISH them for hearing '{misheard}' instead of '{real}'? {artist_line}This is a dark day for music lovers everywhere.",
  "Consider the context: loud environment, imperfect speakers, the general chaos of being alive. Under those conditions, '{real}' becoming '{misheard}' isn't just understandable — it's INEVITABLE. My client is a victim of acoustics.",
  "The defense submits that '{misheard}' is, in many ways, a superior lyric to '{real}'. It's catchier. It's more memorable. If anything, {artist_ref} should be THANKING my client for the free songwriting consultation.",
  "Your Honor, I'd like to remind the court that some of the greatest songs in history exist BECAUSE of mishearings. My client isn't a criminal — they're part of a proud tradition of creative listening.",
  "Let's be real for a moment. '{real}' is fine. It's perfectly fine. But '{misheard}'? '{misheard}' has CHARACTER. It has FLAVOR. My client's version would get more streams, and the jury knows it.",
  "The prosecution showed you evidence. I'm going to show you EMPATHY. My client heard '{misheard}' and it made them HAPPY. It made them sing along. {artist_line}Is joy a crime now?",
  "Your Honor, I've compiled a list of thirty-seven famous people who also mishear lyrics. Presidents. Scientists. Award-winning musicians. My client is in EXCELLENT company. The defense requests immediate acquittal.",
  "The defendant didn't mishear '{real}' as '{misheard}' out of carelessness. They did it because their brain — brilliant, creative, slightly confused — offered them something BETTER. And they accepted it. As anyone would.",
  "I want the jury to close their eyes. Imagine you're in a car. Windows down. '{real}' comes on. Now be HONEST: would you have gotten it right? Or would YOUR brain have also landed on something like '{misheard}'? {artist_line}Glass houses, people.",
  "The prosecution keeps saying '{real}' like it's obvious. But Your Honor, NOTHING about music is obvious. The entire industry is built on people hearing things differently. My client simply took it one step further.",
  "Your Honor, my client would like to formally state that they believe '{misheard}' is the superior lyric and they will continue singing it regardless of this court's verdict. The defense admires their commitment.",
  "In closing: '{real}' is what was written. '{misheard}' is what was heard. The gap between them is not a crime — it's the beautiful, messy, human experience of listening to music. {artist_line}The defense rests.",
  "If every person who ever misheard a lyric were put on trial, this courtroom would need to be the size of a CONTINENT. My client is not an outlier — they are EVERYONE. Not guilty.",
  "The defense argues that the defendant's interpretation of '{misheard}' reveals a deeper, subconscious understanding of the song that even {artist_ref} may not have intended. It's not wrong — it's PROFOUND.",
  "Your Honor, I have one final question for the prosecution: if '{misheard}' is so obviously wrong, why is it so hard to get out of your head once you've heard it? The defense rests. You're welcome.",
  "My client heard '{misheard}' and you know what? They had a GREAT TIME singing it. They danced. They felt alive. And now we're here, in a courtroom, trying to take that away. {artist_line}Shame on this prosecution.",
];

const RANDOM_THEMES: readonly string[] = [
  "existential dread", "forbidden love", "intergalactic travel",
  "breakfast foods", "corporate synergy", "suburban wildlife",
  "competitive pottery", "time travel paradoxes", "grocery shopping anxiety",
  "haunted furniture", "professional wrestling", "overdue library books",
];

function buildVars(input: CaseInput): Record<string, string> {
  const artistLine = input.artist
    ? `This is an affront to everyone who loves ${input.artist}. `
    : "";
  const artistRef = input.artist ?? "the artist";

  return {
    misheard: input.misheard,
    real: input.real,
    artist_line: artistLine,
    artist_ref: artistRef,
    random_theme: "", // placeholder, filled after pick
  };
}

export function generateDefense(
  input: CaseInput,
  _severity: number,
  seed: number
): string {
  const rng = seedableRandom(seed + 7727);
  const template = pickRandom(TEMPLATES, rng);
  const vars = buildVars(input);
  vars.random_theme = pickRandom(RANDOM_THEMES, rng);
  return fillTemplate(template, vars);
}
