import { CaseInput, Verdict, Severity } from "../types";
import { getSeverityCategory } from "../scoring";
import { seedableRandom, pickRandom, fillTemplate } from "./templates";

const TITLES: Record<Severity, readonly string[]> = {
  acquitted: [
    "Acquitted — The Artist Mumbles",
    "Case Dismissed — Honestly We Heard It Too",
    "Not Guilty by Reason of Bad Audio Quality",
    "Acquitted — Ears Acted in Self-Defense",
    "Case Closed: A Forgivable Fumble",
    "Not Guilty — The Speakers Were Probably Cheap",
    "Acquitted on Grounds of Reasonable Confusion",
    "Dismissed — Even the Judge Had to Double-Check",
    "Not Guilty — The Acoustics Were Against You",
    "Case Dropped: The Real Lyric Isn't That Clear Either",
    "Acquitted — Your Brain Did Its Best",
  ],
  misdemeanor: [
    "Guilty of Minor Auditory Negligence",
    "Sentenced to Listen to the Song 5 More Times",
    "Convicted of Second-Degree Mishearing",
    "Guilty — Mandatory Lyrics Homework Assigned",
    "Misdemeanor: Reckless Listening in a Quiet Zone",
    "Convicted of Involuntary Lyric-slaughter",
    "Guilty — Must Write Correct Lyrics 50 Times",
    "Sentenced to Karaoke Probation (6 Months)",
    "Convicted: Earbuds Confiscated Pending Review",
    "Guilty of Lyrical Jaywalking",
    "Misdemeanor — One Free Pass Remaining",
  ],
  felony: [
    "Guilty of Aggravated Auditory Assault",
    "Felony Mishearing — Ears Are Hereby Confiscated",
    "Convicted of Grand Theft Lyrics",
    "Guilty in the First Degree of Musical Malpractice",
    "Felony — Banned from Singing in Public for 1 Year",
    "Convicted of Premeditated Lyric Destruction",
    "Guilty — The Song Deserved Better",
    "Sentenced: Must Personally Apologize to the Songwriter",
    "Felony Mishearing with Aggravating Circumstances",
    "Convicted of Lyrical Fraud in the Third Degree",
    "Guilty — Streaming Privileges Under Review",
  ],
  capital: [
    "Capital Crime Against Music",
    "Maximum Sentence: Must Explain Lyrics to Artist's Face",
    "Ears Revoked Permanently by Order of the Court",
    "The Worst Mishearing in Recorded History",
    "Guilty on All Counts — Music Itself Filed a Complaint",
    "Capital Offense: Lifetime Ban from All Audio Devices",
    "Unprecedented Verdict: The Jury Wept",
    "Maximum Guilt — A New Low for Human Hearing",
    "Capital Crime: The Dictionary Filed a Restraining Order",
    "Historic Verdict: The Mishearing That Broke the Court",
    "Guilty Beyond All Reasonable Doubt and Several Unreasonable Ones",
  ],
};

const SUMMARIES: Record<Severity, readonly string[]> = {
  acquitted: [
    "The court finds that '{misheard}' was a reasonable interpretation of '{real}'. Score: {score}/10. You're free to go, but maybe double-check the lyrics next time.",
    "With a severity of {score}/10, the court acknowledges that '{real}' and '{misheard}' are close enough to warrant mercy. You got lucky.",
    "'{misheard}' instead of '{real}' scores a mere {score}/10 on the severity scale. The court is feeling generous today. Case dismissed.",
    "The jury has shown compassion. At {score}/10, this mishearing of '{real}' as '{misheard}' falls within the range of human error. Barely.",
    "Honestly? '{misheard}' is almost what the artist said. At {score}/10, the court can't justify a conviction. But we're watching you.",
    "Score: {score}/10. The gap between '{real}' and '{misheard}' is narrow enough that the court is willing to look the other way. This time.",
    "At a severity of {score}/10, '{misheard}' is close enough to '{real}' that the jury felt bad about prosecuting. Walk away slowly.",
    "The mishearing scores {score}/10. '{misheard}' and '{real}' share enough DNA that the court considers this a victimless crime.",
    "With a score of {score}/10, this case barely warranted a trial. '{misheard}' for '{real}' is the lyrical equivalent of a parking ticket.",
    "'{real}' vs '{misheard}' — at {score}/10 severity, the court rules this was an honest mistake. Don't let it happen again.",
  ],
  misdemeanor: [
    "'{misheard}' instead of '{real}' lands at {score}/10 severity. Not the worst, but not great. The court prescribes lyrical rehabilitation.",
    "Scoring {score}/10, the transformation of '{real}' into '{misheard}' warrants a moderate sentence. You should have known better.",
    "At {score}/10, this mishearing of '{real}' as '{misheard}' falls squarely in misdemeanor territory. The court is disappointed but not surprised.",
    "The jury has spoken: {score}/10. '{misheard}' is definitively not '{real}', and the defendant should feel appropriately embarrassed.",
    "A severity of {score}/10 for hearing '{misheard}' instead of '{real}'. The court sentences you to actually reading lyrics for once.",
    "Score: {score}/10. '{misheard}' bears just enough resemblance to '{real}' to avoid a felony, but just barely. Consider this a warning.",
    "At {score}/10, the court finds '{misheard}' to be a notable departure from '{real}'. Not catastrophic, but definitely wrong.",
    "'{real}' became '{misheard}' at a severity of {score}/10. The court recommends headphones with better clarity and perhaps some self-reflection.",
    "The severity score of {score}/10 tells the story: '{misheard}' is wrong, '{real}' is right, and the defendant needs to do better.",
    "Scoring {score}/10, this case represents a mid-tier mishearing. '{misheard}' for '{real}' is the kind of mistake that will follow you.",
  ],
  felony: [
    "At {score}/10, '{misheard}' instead of '{real}' constitutes a serious offense. The court is deeply concerned about the defendant's ears.",
    "'{real}' to '{misheard}' scores a devastating {score}/10. The jury found no excuse adequate. The song deserved better.",
    "A severity of {score}/10 places this firmly in felony territory. '{misheard}' is so far from '{real}' that the court questions everything.",
    "Score: {score}/10. The gap between '{real}' and '{misheard}' is a CHASM. The court sentences the defendant to intensive lyrical rehabilitation.",
    "At {score}/10, this mishearing crosses the line from 'oops' to 'how.' '{misheard}' bears almost no relation to '{real}'.",
    "'{misheard}' for '{real}' at {score}/10 severity. The court has seen enough. This level of mishearing requires intervention.",
    "The severity of {score}/10 speaks volumes. '{real}' became '{misheard}' through a process the court can only describe as auditory alchemy.",
    "Scoring {score}/10: '{misheard}' is not a mishearing of '{real}' — it's a complete reinvention. The court is not impressed.",
    "At a terrifying {score}/10, the transformation from '{real}' to '{misheard}' suggests the defendant may need professional auditory assistance.",
    "'{real}' vs '{misheard}': {score}/10. The jury deliberated for exactly thirty seconds before reaching a guilty verdict.",
  ],
  capital: [
    "Score: {score}/10. '{misheard}' instead of '{real}' is the single worst mishearing this court has ever adjudicated. We may never recover.",
    "At an unprecedented {score}/10, the journey from '{real}' to '{misheard}' defies explanation, science, and basic human hearing. Maximum sentence.",
    "'{misheard}' for '{real}' at {score}/10 severity. The court is speechless. The jury is speechless. The stenographer stopped typing.",
    "A catastrophic {score}/10. '{real}' became '{misheard}' through a process so extreme that the court is considering new legislation.",
    "Score: {score}/10. This mishearing of '{real}' as '{misheard}' will be studied by future generations as a cautionary tale.",
    "At {score}/10, '{misheard}' instead of '{real}' represents a complete and total failure of the human auditory system. The court rests.",
    "'{real}' to '{misheard}' — {score}/10. The maximum severity. The maximum verdict. The maximum disappointment. From everyone.",
    "Scoring a devastating {score}/10: '{misheard}' and '{real}' exist in different galaxies. The defendant's ears have been found unfit for purpose.",
    "At a historic {score}/10, this case sets a new precedent. '{misheard}' is so far from '{real}' that the court is recommending this become a textbook example.",
    "The final score: {score}/10. '{misheard}' instead of '{real}'. The court has nothing left to say. The lyrics said it all — just not to the defendant.",
  ],
};

export function generateVerdict(input: CaseInput, score: number): Verdict {
  const severity = getSeverityCategory(score);
  const rng = seedableRandom(Math.round(score * 1000) + 4219);

  const title = pickRandom(TITLES[severity], rng);
  const summaryTemplate = pickRandom(SUMMARIES[severity], rng);

  const vars: Record<string, string> = {
    misheard: input.misheard,
    real: input.real,
    score: String(score),
    artist: input.artist ?? "the artist",
  };

  return {
    score,
    title,
    summary: fillTemplate(summaryTemplate, vars),
    severity,
  };
}
