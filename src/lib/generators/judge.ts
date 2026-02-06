import { CaseInput } from "../types";
import { seedableRandom, pickRandom, fillTemplate } from "./templates";
import { generateJudgeName } from "./names";

const TEMPLATES: readonly string[] = [
  "Order in the court! We are gathered here today to examine a most disturbing case. The defendant stands accused of hearing '{misheard}' when the artist clearly — CLEARLY — sang '{real}'. {artist_line}The court is appalled.",
  "Ladies and gentlemen, I have presided over this courtroom for thirty years. I have seen crimes against humanity. But I have never — and I mean NEVER — seen someone hear '{misheard}' and not realize it was '{real}'. {artist_line}I need a moment.",
  "*slams gavel* Order! The case before us today involves the defendant mishearing '{real}' as — and I wish I were making this up — '{misheard}'. {artist_line}I've read the filing four times. It doesn't get better.",
  "All rise! Actually, stay seated. You're going to need the support. The defendant allegedly heard '{misheard}' when the lyrics clearly state '{real}'. {artist_line}The court will now attempt to process this information.",
  "This court is now in session. Before me lies a case so egregious that I considered recusing myself on emotional grounds. '{misheard}' instead of '{real}'. {artist_line}Let the record show the judge sighed audibly.",
  "I have reviewed the evidence submitted to this court, and I must say: in all my years on the bench, '{misheard}' is perhaps the most creative destruction of '{real}' I have ever encountered. {artist_line}Proceed.",
  "*adjusts reading glasses, reads file, removes reading glasses, pinches bridge of nose* The defendant heard '{misheard}'. The actual lyric is '{real}'. {artist_line}I'm going to need a recess after this.",
  "Court is in session. Today's case involves what can only be described as an auditory hallucination. The defendant interpreted '{real}' as '{misheard}'. {artist_line}The prosecution may begin — and heaven help us all.",
  "Before we begin, I want the gallery to know that gasping, weeping, and quiet sobbing are all permitted responses to what you're about to hear. The defendant claims '{misheard}' when the lyric is '{real}'. {artist_line}You have been warned.",
  "I've presided over arson cases that were less destructive than what the defendant did to these lyrics. '{real}' became '{misheard}'. {artist_line}The court recognizes that music itself may never recover.",
  "Let the record show that I, {judge}, am deeply troubled. The defendant took '{real}' — a perfectly good lyric — and somehow arrived at '{misheard}'. {artist_line}I will be requiring explanations.",
  "Order! ORDER! I haven't even read the charges yet and I'm already upset. *reads file* '{misheard}' instead of '{real}'. {artist_line}It's worse than I thought.",
  "The defendant is brought before this court on charges of lyrical misconduct in the first degree. They allegedly converted '{real}' into '{misheard}'. {artist_line}How does the defendant plead? Actually, don't answer that. I've heard enough.",
  "This case was flagged as 'urgent' by the clerk's office, and now I understand why. '{misheard}' instead of '{real}'. {artist_line}Some things simply cannot wait for the regular docket.",
  "I was about to retire. I had the paperwork filled out. Then this case arrived: '{misheard}' in place of '{real}'. {artist_line}Retirement will have to wait until justice is served.",
  "As your presiding judge, it is my duty to remain impartial. I want you all to know I am TRYING. '{misheard}' instead of '{real}'. {artist_line}I am trying very hard right now.",
  "Bailiff, please confirm the defendant has functioning ears. Because the evidence suggests otherwise. '{real}' somehow became '{misheard}'. {artist_line}The court awaits an explanation it knows will not satisfy.",
  "In the matter of The People vs. The Defendant's Ears: the accused is charged with hearing '{misheard}' where '{real}' was clearly performed. {artist_line}The severity of this offense cannot be overstated.",
  "I've consulted with three colleagues about this case. Two refused to believe it. The third wept. '{misheard}' instead of '{real}'. {artist_line}We are in uncharted territory, people.",
  "*enters courtroom already shaking head* I've read the brief. '{misheard}'. The actual lyric: '{real}'. {artist_line}Let's get this over with before I lose what remains of my faith in the human ear.",
  "Court is in session for what I can only describe as a landmark case in auditory negligence. The lyrics '{real}' were interpreted as '{misheard}'. {artist_line}Historians will study this one.",
  "I want everyone here to take a deep breath. Good. Now: the defendant heard '{misheard}' instead of '{real}'. {artist_line}You may now exhale in horror.",
  "The case file landed on my desk this morning. My clerk found me twenty minutes later, staring at the wall. '{misheard}' where '{real}' should be. {artist_line}We begin immediately.",
  "I've seen a lot in this courtroom. But '{misheard}'? When the lyric is clearly '{real}'? {artist_line}This is a new chapter in the annals of musical injustice.",
  "All rise for the most baffling case this court has seen since its founding. The defendant transformed '{real}' into — brace yourselves — '{misheard}'. {artist_line}God help us.",
  "I asked the bailiff to double-check the case file because I assumed it was a typo. It wasn't. '{misheard}' instead of '{real}'. {artist_line}We proceed with heavy hearts.",
];

function buildVars(input: CaseInput, judgeName: string): Record<string, string> {
  const artistLine = input.artist
    ? `This offense was committed against the work of ${input.artist}. `
    : "";

  return {
    misheard: input.misheard,
    real: input.real,
    artist_line: artistLine,
    artist: input.artist ?? "the artist",
    judge: judgeName,
  };
}

export function generateJudgeIntro(input: CaseInput, seed: number): string {
  const rng = seedableRandom(seed + 3571);
  const judgeName = generateJudgeName(seed);
  const template = pickRandom(TEMPLATES, rng);
  return fillTemplate(template, buildVars(input, judgeName));
}
