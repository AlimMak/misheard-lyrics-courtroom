import { CaseInput } from "../types";
import { seedableRandom, pickRandom, fillTemplate } from "./templates";

const ANALYTICAL: readonly string[] = [
  "From a purely linguistic standpoint, '{misheard}' and '{real}' share approximately three phonemes. Which is... not great.",
  "I've done the math. The probability of someone hearing '{misheard}' when the lyric is '{real}' is roughly one in... okay I can't actually calculate that. But it's LOW.",
  "Interesting. If we break down the syllable structure, '{misheard}' has a completely different stress pattern than '{real}'. The defendant's brain essentially rewrote the rhythm.",
  "I mapped both phrases onto a vowel chart. '{misheard}' and '{real}' occupy entirely different acoustic spaces. This isn't a mishearing — it's a complete phonological reimagining.",
  "Let me approach this empirically. '{real}' contains specific fricatives and plosives that '{misheard}' simply does not replicate. The auditory gap here is measurable.",
  "As someone who has studied linguistics recreationally, I can confirm: the transformation from '{real}' to '{misheard}' would require the defendant to have misprocessed at least four distinct consonant clusters.",
  "I've created a spreadsheet comparing '{misheard}' and '{real}' across twelve acoustic dimensions. The results are... not favorable for the defendant.",
  "From a signal processing perspective, the only way to get '{misheard}' from '{real}' would be significant background noise, hearing loss, or what I can only describe as 'aggressive creativity.'",
  "I've been analyzing the spectral characteristics of both phrases. '{misheard}' and '{real}' have a Levenshtein distance that would make a spellchecker weep.",
  "The formant transitions between '{real}' and '{misheard}' suggest the defendant's auditory cortex was essentially running a different algorithm. Fascinating, really. Wrong, but fascinating.",
  "I've cross-referenced '{misheard}' against a database of common mishearings. It doesn't appear. This is a NOVEL mishearing. The defendant is a pioneer, albeit an incorrect one.",
  "Statistically speaking, the overlap between '{misheard}' and '{real}' is within the margin of error for 'completely different sentences.' Just barely, but within it.",
  "I ran both phrases through a phonetic similarity algorithm I built last weekend. The score was... let's just say the algorithm asked me to double-check the input.",
  "If we consider the acoustic envelope of '{real}' versus '{misheard}', there's a 340-millisecond window where they ALMOST sound similar. Almost. The other 2 seconds? Not so much.",
  "I've prepared a detailed frequency analysis but the short version is: '{misheard}' and '{real}' are related in the same way that a bicycle is related to a submarine.",
];

const EMOTIONAL: readonly string[] = [
  "I've been singing '{misheard}' at karaoke for YEARS. My whole life is a lie. I can't vote on this — I'm COMPROMISED.",
  "When I heard that someone else also thought it was '{misheard}' instead of '{real}', I literally started crying. I'm not alone. WE'RE not alone.",
  "I feel personally ATTACKED by this case. '{misheard}' is what got me through my divorce. And now you're telling me it's actually '{real}'? I need a minute.",
  "The defendant heard '{misheard}' and honestly? Same. I don't even care if it's wrong anymore. '{misheard}' is MY lyric now. The defendant is MY people.",
  "I can't stop thinking about how many times I've confidently belted '{misheard}' in front of OTHER PEOPLE. '{real}' was the answer this whole time? I'm going to be sick.",
  "This case has made me question everything. If '{misheard}' isn't real, what else have I been getting wrong? My taxes? My relationships? I'm spiraling.",
  "I want to vote not guilty because if the defendant is guilty then SO AM I and I'm not ready for that kind of self-reflection right now.",
  "'{real}' is fine but '{misheard}' made me FEEL things. Sometimes the wrong lyrics are the right lyrics for your SOUL. *wipes tear*",
  "The prosecution keeps saying '{real}' with such confidence. Must be nice. Some of us have been living in the '{misheard}' timeline and we were HAPPY there.",
  "I called my mom during the recess and sang both versions. She also thought it was '{misheard}'. We're either both criminals or both victims and I refuse to decide.",
  "Every time the prosecution says '{real}' I hear '{misheard}' anyway. My brain has CHOSEN. It has COMMITTED. I respect the defendant's dedication.",
  "I've been humming '{misheard}' under my breath this entire trial and the bailiff keeps giving me looks. But I CAN'T STOP. It's too catchy.",
  "Your Honor, I'd like to declare a mistrial on the grounds that learning '{misheard}' is actually '{real}' has caused me irreparable emotional damage.",
  "The defendant's version '{misheard}' hits differently and I will die on this hill. '{real}' could never make me feel the way '{misheard}' does.",
  "I just want everyone to know that I held it together when they played the original, but when they showed '{misheard}' on screen, I ugly-cried. In court. On record.",
];

const WILDCARD: readonly string[] = [
  "I actually think both versions are wrong. The REAL lyric is clearly about tax evasion. You can hear it if you play it backwards.",
  "Hot take: '{misheard}' is the lyric in a PARALLEL UNIVERSE and the defendant accidentally tuned into the wrong dimension. Not guilty by reason of multiverse.",
  "I haven't actually been listening to the trial. I've been ranking every font in the courtroom by vibes. But based on energy alone? Not guilty.",
  "What if — hear me out — what if '{misheard}' is what they ORIGINALLY wrote, but the label made them change it to '{real}' for radio play? The defendant is a TRUTHER.",
  "I asked the court stenographer if '{misheard}' or '{real}' was harder to type. They said '{misheard}'. I think that's relevant somehow.",
  "My verdict depends entirely on what the defendant had for breakfast. The ears work differently on an empty stomach. This is SCIENCE.",
  "I've been thinking about it and honestly? Neither '{misheard}' NOR '{real}' make sense to me. Music peaked with whale sounds and it's all been downhill since.",
  "Counterpoint: what if EVERYONE ELSE has been mishearing the song and the defendant is the only one who got it right? Has anyone considered that? Anyone?",
  "I'd like to submit my own misheard lyric into evidence because it's WAY worse than '{misheard}' and I think it provides important context. No? Okay.",
  "The defendant heard '{misheard}' and I respect their audacity. In this economy? Mishear whatever you want. Life is too short for correct lyrics.",
  "I've been staring at '{misheard}' and '{real}' for so long that neither of them look like real words anymore. Is this what jury duty does to people?",
  "Based on my extensive research (I Googled it during the recess), approximately 97% of people mishear lyrics. The defendant is statistically NORMAL. The rest of us are the outliers.",
  "I wasn't going to say anything but I've been to three concerts this year and sang the wrong lyrics at ALL of them. The defendant is being scapegoated.",
  "Plot twist: I'm the one who reported the defendant because I heard them singing '{misheard}' at a party and it's been stuck in my head ever since. I need CLOSURE.",
  "I've decided my verdict based on which lyric I'd rather have tattooed. '{misheard}' wins by a MILE. That's my legal analysis.",
];

function buildVars(input: CaseInput): Record<string, string> {
  return {
    misheard: input.misheard,
    real: input.real,
    artist: input.artist ?? "the artist",
  };
}

export function generateJurorTakes(
  input: CaseInput,
  _severity: number,
  seed: number
): [string, string, string] {
  const rng1 = seedableRandom(seed + 1013);
  const rng2 = seedableRandom(seed + 2027);
  const rng3 = seedableRandom(seed + 3041);

  const vars = buildVars(input);

  return [
    fillTemplate(pickRandom(ANALYTICAL, rng1), vars),
    fillTemplate(pickRandom(EMOTIONAL, rng2), vars),
    fillTemplate(pickRandom(WILDCARD, rng3), vars),
  ];
}
