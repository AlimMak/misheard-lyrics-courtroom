import { CaseData, ProsecutionArgument } from "../types";
import { fillTemplate, pickRandom, TemplateSlots } from "./templates";
import { generateProsecutorName } from "./names";

const OPENINGS: readonly string[] = [
  "Ladies and gentlemen of the jury, what you are about to hear will shake your faith in humanity's ability to listen.",
  "The evidence before you today is irrefutable. The defendant has committed an act of pure lyrical vandalism.",
  "I stand before you with a heavy heart and a heavier case file. The defendant's ears have FAILED them.",
  "Members of the jury, I want you to brace yourselves. What the defendant claims to have heard... defies logic.",
  "Your Honor, esteemed jurors — I have prosecuted many cases, but none have left me this personally offended.",
  "The prosecution will demonstrate, beyond a reasonable doubt, that the defendant cannot be trusted around a radio.",
  "I'd like to start by playing the original song for the jury. *presses play* HEAR THAT? That's what it ACTUALLY sounds like.",
  "What we have here is not just a mishearing. It is a full-scale assault on the English language AND music simultaneously.",
  "I urge the jury to consider: if someone can mishear THIS badly, what else are they getting wrong in life?",
  "The prosecution intends to prove that this mishearing was not accidental — it was INEVITABLE given the defendant's listening skills.",
  "Before I present my case, I'd like a moment of silence for the songwriter who has to live knowing THIS exists.",
  "Your Honor, the prosecution wishes to enter Exhibit A: the defendant's confidence while singing the WRONG lyrics in public.",
  "Ladies and gentlemen, we live in a world with lyric websites, subtitles, and search engines. The defendant has NO excuse.",
  "I have prepared a thorough case, but honestly, the lyrics speak — or rather, SCREAM — for themselves.",
  "The prosecution calls upon common sense, working eardrums, and basic literacy as our star witnesses today.",
];

const EVIDENCE: readonly string[] = [
  "Exhibit A: {artist} recorded \"{real}\" for \"{song}.\" Exhibit B: The defendant's brain translated this to \"{misheard}.\" I rest my case.",
  "The forensic audio analysis is clear: at no point in \"{song}\" does {artist} say anything remotely resembling \"{misheard}.\" The actual lyric, \"{real},\" is perfectly enunciated.",
  "I've consulted three linguists, two audiologists, and one very confused music teacher. NONE of them can explain how \"{real}\" becomes \"{misheard}.\"",
  "Let me play this back in slow motion. *dramatically gestures* \"{real}\" — that's what {artist} sang. NOT \"{misheard}.\" Not even CLOSE.",
  "We obtained the original studio recording of \"{song}.\" We ran it through spectral analysis. The words \"{real}\" are CRYSTAL clear. \"{misheard}\" appears NOWHERE.",
  "The defendant has been singing \"{misheard}\" — possibly in PUBLIC — when the lyric is clearly \"{real}.\" Think about the innocent bystanders.",
  "I present to the court a side-by-side comparison: what {artist} wrote for \"{song}\" vs. what the defendant's ears decided to freelance. It's not pretty.",
  "Your Honor, I have a sworn statement from a certified music expert who confirms that \"{real}\" and \"{misheard}\" are, quote, 'not even in the same zip code.'",
  "The defendant would have us believe that {artist} — {artist}! — wrote \"{misheard}\" in \"{song}.\" This is an insult to the artist's craft.",
  "Exhibit C: a recording of the defendant confidently singing \"{misheard}\" at a social gathering while everyone else sang \"{real}.\" The secondhand embarrassment was measurable.",
  "I've compiled a timeline. The defendant has presumably been mishearing \"{real}\" as \"{misheard}\" for an UNKNOWN number of years. The damage is incalculable.",
  "The prosecution enters into evidence the liner notes of \"{song}\" which CLEARLY print \"{real}\" — not whatever fever dream \"{misheard}\" came from.",
];

const CLOSINGS: readonly string[] = [
  "The prosecution rests. And honestly, I need to rest too after hearing that mishearing.",
  "I implore the jury: send a message. This kind of lyrical negligence cannot go unpunished.",
  "In conclusion, the defendant heard what they wanted to hear, and what they wanted to hear was WRONG.",
  "The evidence is overwhelming. The defendant's ears have been weighed, measured, and found wanting.",
  "I trust the jury will do the right thing. {artist} deserves justice. \"{song}\" deserves justice. MUSIC deserves justice.",
  "Thank you, Your Honor. I'll be available after the trial for anyone who needs help processing what they've just heard.",
  "The prosecution rests its case, though my faith in humanity does not.",
  "Members of the jury, you have heard the evidence. Now hear the correct lyrics one more time: \"{real}.\" NOT \"{misheard}.\" Thank you.",
  "I close by asking: if we let this slide, what's next? Where does the mishearing END?",
  "Your Honor, the prosecution has nothing further. The lyrics have said everything that needed to be said — clearly, apparently, to everyone except the defendant.",
  "The prosecution rests. I'd like to bill the defendant for the emotional distress this case has caused me personally.",
];

export function generateProsecution(caseData: CaseData): ProsecutionArgument {
  const character = generateProsecutorName();
  const slots: TemplateSlots = {
    misheard: caseData.misheardLyric,
    real: caseData.realLyric,
    song: caseData.songTitle,
    artist: caseData.artist,
  };

  return {
    character,
    opening: fillTemplate(pickRandom(OPENINGS), slots),
    evidence: fillTemplate(pickRandom(EVIDENCE), slots),
    closing: fillTemplate(pickRandom(CLOSINGS), slots),
  };
}
