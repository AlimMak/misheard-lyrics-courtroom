import { CaseData, JudgeIntro } from "../types";
import { fillTemplate, pickRandom, TemplateSlots } from "./templates";
import { generateJudgeName } from "./names";

const OPENING_STATEMENTS: readonly string[] = [
  "Order in the court! We are gathered here today to adjudicate a most grievous crime against music.",
  "All rise! This court is now in session. What we are about to hear may disturb those with functioning ears.",
  "Silence! I have presided over many cases, but this... this is a new low for humanity.",
  "*slams gavel repeatedly* ORDER! I haven't been this upset since someone told me 'Bohemian Rhapsody' was about a farmer.",
  "Let the record show that I, against my better judgment, have agreed to hear this case.",
  "Court is in session. Bailiff, please distribute the earplugs. We're going to need them.",
  "I've read the case file, and I want everyone to know that I am NOT okay.",
  "Before we begin, I'd like to remind everyone that what happens in this courtroom stays in this courtroom. Mostly because it's too embarrassing.",
  "All rise! ...Actually, you may want to sit down for this one. It's going to be rough.",
  "Order! This court has seen some musical atrocities, but today's case may set a new precedent.",
  "I was about to retire. Then THIS case landed on my desk. Retirement will have to wait.",
  "*adjusts reading glasses* I've reviewed the evidence three times because I couldn't believe what I was reading.",
  "Court is now in session. I've cleared my schedule because I have a feeling this will be... memorable.",
  "Let the record show the judge entered the courtroom already shaking their head.",
  "I'd like to remind the gallery: gasping is permitted. Laughter will result in contempt charges.",
  "In my thirty years on the bench, I thought I'd seen it all. Today, the defendant proved me wrong.",
  "All rise! And may your musical taste rise with you, because what I'm about to read is subterranean.",
  "This court recognizes the gravity of today's proceedings. Someone has committed an unspeakable act against a perfectly good song.",
  "Before we begin — bailiff, is the defendant aware that songs have ACTUAL words?",
  "I want it noted for the record that I listened to the original song THREE times to prepare for this case.",
];

const CASE_DESCRIPTIONS: readonly string[] = [
  "The defendant stands accused of butchering \"{song}\" by {artist}. They claim to have heard \"{misheard}\" when the ACTUAL lyrics are \"{real}\". The audacity.",
  "We are here to examine Case #{id} — a flagrant mishearing of {artist}'s \"{song}\". The defendant insists the lyrics are \"{misheard}\" rather than the correct \"{real}\".",
  "Today's case: The People vs. This Person's Ears. The accused willfully misheard \"{real}\" from \"{song}\" by {artist} as — and I can barely say this — \"{misheard}\".",
  "Case #{id}: A crime of the highest musical order. {artist}'s \"{song}\" contains the lyric \"{real},\" but the defendant has been walking around thinking it says \"{misheard}.\"",
  "The defendant is charged with one count of lyrical manslaughter. They somehow heard \"{misheard}\" instead of \"{real}\" in {artist}'s classic \"{song}.\"",
  "We convene today for a most disturbing case. {artist} wrote \"{real}\" for the song \"{song},\" but the defendant's brain decided \"{misheard}\" was close enough.",
  "Ladies and gentlemen of the jury, the defendant has committed an acoustic atrocity: mishearing \"{real}\" as \"{misheard}\" in {artist}'s \"{song}.\"",
  "The prosecution alleges that the defendant has, for an unknown period of time, been singing \"{misheard}\" instead of the correct lyric \"{real}\" from \"{song}\" by {artist}.",
  "Case #{id} comes before this court today. {artist} poured their heart into writing \"{real}\" for \"{song},\" and the defendant repaid them by hearing \"{misheard}.\"",
  "Let the record show: the song is \"{song},\" the artist is {artist}, the lyric is \"{real},\" and the defendant had the NERVE to hear \"{misheard}.\"",
  "What we have here is a clear case of selective hearing. The lyric \"{real}\" from {artist}'s \"{song}\" somehow became \"{misheard}\" in the defendant's mind.",
  "This court will examine how a reasonable person could hear \"{misheard}\" when {artist} CLEARLY sang \"{real}\" in \"{song}.\" Spoiler: they couldn't.",
  "The facts are simple: {artist} sang \"{real}\" in \"{song}.\" The defendant heard \"{misheard}.\" We're all worse off for knowing this.",
];

export function generateJudgeIntro(caseData: CaseData): JudgeIntro {
  const character = generateJudgeName();
  const slots: TemplateSlots = {
    misheard: caseData.misheardLyric,
    real: caseData.realLyric,
    song: caseData.songTitle,
    artist: caseData.artist,
  };

  return {
    character,
    openingStatement: pickRandom(OPENING_STATEMENTS),
    caseDescription: fillTemplate(pickRandom(CASE_DESCRIPTIONS), slots),
  };
}
