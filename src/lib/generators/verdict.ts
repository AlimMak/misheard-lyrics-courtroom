import { CaseData, Verdict, VerdictLevel } from "../types";
import { fillTemplate, pickRandom, TemplateSlots } from "./templates";
import { calculateMishearingScore, getVerdictLevel } from "../scoring";

const VERDICT_TITLES: Record<VerdictLevel, readonly string[]> = {
  acquitted: [
    "Case Dismissed: Ears of the Innocent",
    "Not Guilty: A Forgivable Fumble",
    "Acquitted: The Ears Have It",
    "Case Closed: Honest Mistake",
    "Verdict: Free to Mishear Another Day",
    "Released: Minor Auditory Misdemeanor",
  ],
  misdemeanor: [
    "Guilty: Lyrical Jaywalking",
    "Convicted: Misheard in the Third Degree",
    "Sentence: 10 Hours of Lyrics Training",
    "Guilty: Acoustic Negligence",
    "Convicted: Involuntary Lyric-slaughter",
    "Misdemeanor: Reckless Listening",
  ],
  felony: [
    "GUILTY: Grand Theft Lyrics",
    "Convicted: Felony Mishearing",
    "GUILTY: Aggravated Lyrical Assault",
    "Sentenced: Criminal Ear Negligence",
    "Felony: Premeditated Mishearing",
    "GUILTY: Lyrics in the First Degree",
  ],
  "crime-against-music": [
    "MAXIMUM GUILT: Crime Against Music & Humanity",
    "THE WORST: Unprecedented Lyrical Atrocity",
    "GUILTY ON ALL COUNTS: Musical War Crime",
    "HISTORIC VERDICT: The Mishearing of the Century",
    "SUPREME GUILT: An Affront to All Songwriters",
    "LEGENDARY CRIME: Ears Should Be Revoked",
  ],
};

const SUMMARIES: Record<VerdictLevel, readonly string[]> = {
  acquitted: [
    "The jury has shown mercy. \"{misheard}\" was close enough to \"{real}\" that we'll let it slide. This time.",
    "After careful deliberation, the jury finds the mishearing of \"{real}\" as \"{misheard}\" to be... understandable. Barely.",
    "The court acknowledges that {artist}'s delivery in \"{song}\" left room for interpretation. The defendant walks free.",
  ],
  misdemeanor: [
    "The jury finds the defendant guilty of a minor lyrical offense. \"{misheard}\" instead of \"{real}\" — not the worst, but not great.",
    "A clear mishearing of {artist}'s \"{song},\" but the jury believes rehabilitation is possible. The defendant must learn the real lyrics.",
    "The defendant's claim of hearing \"{misheard}\" instead of \"{real}\" is officially incorrect. Sentence: mandatory lyric study.",
  ],
  felony: [
    "The jury is APPALLED. \"{misheard}\" bears almost NO resemblance to \"{real}.\" {artist} deserves better.",
    "This is a serious offense against \"{song}\" by {artist}. The gap between \"{real}\" and \"{misheard}\" is a CHASM.",
    "The court finds the defendant guilty of egregious lyrical negligence. The mishearing of \"{real}\" as \"{misheard}\" cannot go unpunished.",
  ],
  "crime-against-music": [
    "In all my years, I've never seen a mishearing this catastrophic. \"{misheard}\" is in a different DIMENSION from \"{real}.\" {artist} has been WRONGED.",
    "This is the worst case of lyrical butchery this court has EVER seen. \"{misheard}\" — HOW?! The real lyric is \"{real}\"!",
    "The defendant has committed the ultimate sin against {artist}'s \"{song}.\" Going from \"{real}\" to \"{misheard}\" requires a special kind of talent — the WRONG kind.",
  ],
};

const SENTENCES: Record<VerdictLevel, readonly string[]> = {
  acquitted: [
    "Released with a warning. Please use lyrics websites.",
    "Free to go, but the court STRONGLY recommends headphones with better clarity.",
    "Acquitted. The defendant must promise to Google lyrics before singing in public.",
  ],
  misdemeanor: [
    "Sentenced to 20 hours of community service: teaching others the correct lyrics to \"{song}.\"",
    "Fined: must listen to \"{song}\" on repeat 50 times with a lyric sheet in hand.",
    "Probation: 6 months of supervised listening. No singing in public without a lyrics app.",
  ],
  felony: [
    "Sentenced to write \"{real}\" on a chalkboard 500 times.",
    "Music privileges suspended for 30 days. The defendant may only listen to instrumental tracks.",
    "Sentenced to personally apologize to every {artist} fan within a 50-mile radius.",
  ],
  "crime-against-music": [
    "LIFETIME ban from singing \"{song}\" in any setting, public or private, including the shower.",
    "Sentenced to serve as a cautionary tale in music education programs nationwide.",
    "The defendant's ears are hereby placed under court supervision INDEFINITELY. All future listening must be approved by a lyrical parole officer.",
  ],
};

export function generateVerdict(caseData: CaseData): Verdict {
  const score = calculateMishearingScore(
    caseData.misheardLyric,
    caseData.realLyric
  );
  const level = getVerdictLevel(score);
  const slots: TemplateSlots = {
    misheard: caseData.misheardLyric,
    real: caseData.realLyric,
    song: caseData.songTitle,
    artist: caseData.artist,
  };

  return {
    level,
    title: pickRandom(VERDICT_TITLES[level]),
    score,
    summary: fillTemplate(pickRandom(SUMMARIES[level]), slots),
    sentence: fillTemplate(pickRandom(SENTENCES[level]), slots),
  };
}
