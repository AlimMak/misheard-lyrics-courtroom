import { CaseInput } from "../types";
import { seedableRandom, pickRandom, fillTemplate } from "./templates";

const LOW_TEMPLATES: readonly string[] = [
  "Your Honor, let me be honest: this one's not the worst I've seen. '{misheard}' instead of '{real}' is... almost understandable. Almost. But the law is the law, and the lyrics are the lyrics.",
  "Look, I'll admit it — '{misheard}' and '{real}' share some phonetic DNA. But 'close enough' doesn't hold up in a court of music. {artist_line}The prosecution maintains this was preventable.",
  "I'm not going to pretend this is the crime of the century. '{misheard}' for '{real}'? Sure, I can see how it happened. But can I ACCEPT it? No. No I cannot.",
  "Members of the jury, the prosecution acknowledges this is a minor offense. '{misheard}' bears a passing resemblance to '{real}'. But we have STANDARDS. {artist_line}Even small crimes deserve their day in court.",
  "I'll keep this brief. '{misheard}' instead of '{real}'. Is it the worst I've prosecuted? No. Does it still warrant correction? Absolutely. {artist_line}The prosecution requests a gentle but firm verdict.",
  "Your Honor, this is what we in the legal profession call a 'fender bender of the ears.' '{misheard}' versus '{real}' — not catastrophic, but still negligent. {artist_line}We seek a proportionate response.",
  "The defendant heard '{misheard}' when the lyric was '{real}'. Honestly? I've heard worse. But I took an oath to prosecute ALL lyrical crimes, not just the fun ones.",
  "I want the jury to know: I take no pleasure in this case. '{misheard}' for '{real}' is a minor infraction. {artist_line}But if we let the small ones slide, where does it end?",
  "The prosecution presents this case with measured disappointment. '{misheard}' isn't wildly different from '{real}', but it IS different. And different is wrong. {artist_line}That's the whole point of lyrics.",
];

const MID_TEMPLATES: readonly string[] = [
  "Your Honor, the defendant looked at the lyrics '{real}' — words with MEANING — and somehow extracted '{misheard}' from them. This isn't a mishearing. This is auditory vandalism. {artist_line}The prosecution is appalled.",
  "Members of the jury, I want you to really sit with this: '{misheard}'. That's what the defendant heard. The ACTUAL lyric is '{real}'. These are not even in the same NEIGHBORHOOD. {artist_line}I rest my case.",
  "I have consulted with audio experts, linguists, and one very confused speech therapist. None of them can explain the journey from '{real}' to '{misheard}'. {artist_line}The defendant's ears are a mystery science cannot solve.",
  "The prosecution presents Exhibit A: the lyric '{real}'. And Exhibit B: what the defendant claims to have heard — '{misheard}'. Your Honor, the distance between these two exhibits is measurable in LIGHT YEARS.",
  "Let me paint a picture. Someone sits down. A song plays. The words '{real}' come through the speakers, clear as day. And the defendant's brain decides, 'You know what? I think they said {misheard}.' {artist_line}THAT is what we're dealing with.",
  "I've been a prosecutor for fifteen years. I've seen crimes of passion, crimes of opportunity. But this? '{misheard}' instead of '{real}'? This is a crime of the IMAGINATION. {artist_line}The defendant's imagination should be charged as a co-conspirator.",
  "Your Honor, may I direct the jury's attention to how many words '{misheard}' and '{real}' have in common? I'll save you the count: not enough. Not NEARLY enough. {artist_line}The prosecution demands accountability.",
  "The defendant had every tool available — lyrics websites, liner notes, basic human hearing. And yet: '{misheard}'. The real lyric, '{real}', was RIGHT THERE. {artist_line}This is negligence, plain and simple.",
  "I don't want to be dramatic. But '{misheard}' instead of '{real}' is the kind of mishearing that keeps me up at night. {artist_line}The prosecution seeks justice not just for the lyrics, but for everyone who had to hear the defendant sing this version.",
];

const HIGH_TEMPLATES: readonly string[] = [
  "Your Honor, what the defendant has done to these lyrics should be classified as a war crime. '{misheard}' instead of '{real}'?! {artist_line}I am SHAKING. The prosecution demands the maximum sentence.",
  "I have stared into the abyss, Your Honor. The abyss is '{misheard}' where '{real}' should be. {artist_line}I move to have the defendant's ears confiscated as evidence and never returned.",
  "Ladies and gentlemen of the jury, what you are about to comprehend will haunt you. The defendant — a person with allegedly FUNCTIONING ears — heard '{misheard}'. THE LYRIC IS '{real}'. {artist_line}I need everyone to understand the gravity of this.",
  "In my entire career, I have never — NEVER — encountered a mishearing this catastrophic. '{misheard}' and '{real}' don't share a SINGLE redeeming similarity. {artist_line}The prosecution is calling for an immediate and severe verdict.",
  "Your Honor, I'm going to need a moment. *collects self* The defendant heard '{misheard}'. The lyric is '{real}'. These two phrases exist in ENTIRELY different dimensions of reality. {artist_line}This is not a mishearing. This is an ALTERNATE UNIVERSE.",
  "I want the record to show that I attempted to read this case file THREE times before accepting it was real. '{misheard}' in place of '{real}'. {artist_line}The prosecution believes this case may require setting a new legal precedent.",
  "If there were a scale of one to ten for lyrical destruction, this would break it. '{misheard}' for '{real}'? {artist_line}The prosecution requests the jury show NO mercy. None. Zero. The defendant knew what they were doing.",
  "Your Honor, I've prepared a twelve-point presentation, but honestly? Just look at '{misheard}' and then look at '{real}'. LOOK AT THEM. {artist_line}The evidence speaks — no, it SCREAMS — for itself.",
  "This is the worst case of auditory malpractice I have ever prosecuted. '{misheard}' bears absolutely NO resemblance to '{real}'. {artist_line}I am formally requesting that the defendant be banned from all musical events indefinitely.",
  "I've seen mishearings. I've prosecuted mishearings. But '{misheard}' instead of '{real}'? This isn't a mishearing — this is an ACT OF AGGRESSION against the English language AND music simultaneously. {artist_line}Maximum sentence. Nothing less.",
];

function buildVars(input: CaseInput): Record<string, string> {
  const artistLine = input.artist
    ? `This was done to the work of ${input.artist}. `
    : "";

  return {
    misheard: input.misheard,
    real: input.real,
    artist_line: artistLine,
    artist: input.artist ?? "the artist",
  };
}

function pickTier(severity: number): readonly string[] {
  if (severity >= 7) return HIGH_TEMPLATES;
  if (severity >= 4) return MID_TEMPLATES;
  return LOW_TEMPLATES;
}

export function generateProsecution(
  input: CaseInput,
  severity: number,
  seed: number
): string {
  const rng = seedableRandom(seed + 5381);
  const tier = pickTier(severity);
  const template = pickRandom(tier, rng);
  return fillTemplate(template, buildVars(input));
}
