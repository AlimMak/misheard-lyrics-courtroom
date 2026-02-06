import { pickRandom } from "./templates";
import { TrialCharacter } from "../types";

const JUDGE_FIRST_NAMES = [
  "Cornelius", "Bartholomew", "Prudence", "Reginald", "Eugenia",
  "Thaddeus", "Millicent", "Archibald", "Gertrude", "Percival",
  "Winifred", "Ambrose", "Beatrice", "Cuthbert", "Marigold",
  "Leopold", "Clementine", "Horatio", "Agatha", "Montgomery",
] as const;

const JUDGE_LAST_NAMES = [
  "Harmonsworth", "Bassington", "Tunesworth", "Melodica", "Sharpsworth",
  "Flatbottom", "Crescendo", "Fortissimo", "Decibel", "Pitchford",
  "Keynote", "Choirsley", "Cadenza", "Staccato", "Barrington",
  "Thundergavel", "Sternbrow", "Ironruling", "Gravitas", "Lawsworth",
] as const;

const LAWYER_FIRST_NAMES = [
  "Maximilian", "Cassandra", "Theodore", "Victoria", "Sebastian",
  "Penelope", "Nathaniel", "Isadora", "Reginald", "Arabella",
  "Fitzgerald", "Josephine", "Cornelius", "Magdalena", "Augustus",
  "Evangeline", "Bartholomew", "Desdemona", "Alistair", "Cleopatra",
] as const;

const LAWYER_LAST_NAMES = [
  "Sharpnote", "Lyricsplitter", "Versebreaker", "Songcrusher", "Tunewrecker",
  "Beatmasher", "Rhymeslayer", "Hookdestroyer", "Chorusbane", "Melodykiller",
  "Songwright", "Versecraft", "Lyricshield", "Tuneguard", "Rhythmkeeper",
  "Harmonywatch", "Balladeater", "Riffsmasher", "Notecruncher", "Vocalvenom",
] as const;

const JUROR_FIRST_NAMES = [
  "Karen", "Chad", "Brenda", "Kyle", "Deborah",
  "Trevor", "Gladys", "Brock", "Mildred", "Derek",
  "Ethel", "Todd", "Doris", "Lance", "Bertha",
  "Chet", "Agnes", "Blaine", "Phyllis", "Duane",
] as const;

const JUROR_LAST_NAMES = [
  "McListenwell", "Von Earworm", "Hearssomething", "O'Mishear", "Van Lyrics",
  "De Bassline", "St. Mumble", "Wrongsworth", "Heardright", "Songknower",
  "Tuneblind", "Lyrically", "Musiceater", "Soundcheck", "Wavelength",
  "Beatkeeper", "Pitchblack", "Noteworthy", "Rhythmless", "Freestyler",
] as const;

const JUDGE_TITLES = [
  "The Honorable", "The Most Esteemed", "The Illustrious",
  "The Formidable", "The Venerable",
] as const;

export function generateJudgeName(): TrialCharacter {
  return {
    name: `${pickRandom(JUDGE_FIRST_NAMES)} ${pickRandom(JUDGE_LAST_NAMES)}`,
    title: `${pickRandom(JUDGE_TITLES)} Judge`,
  };
}

export function generateProsecutorName(): TrialCharacter {
  return {
    name: `${pickRandom(LAWYER_FIRST_NAMES)} ${pickRandom(LAWYER_LAST_NAMES)}`,
    title: "Prosecutor",
  };
}

export function generateDefenseName(): TrialCharacter {
  return {
    name: `${pickRandom(LAWYER_FIRST_NAMES)} ${pickRandom(LAWYER_LAST_NAMES)}`,
    title: "Defense Attorney",
  };
}

export function generateJurorName(): TrialCharacter {
  return {
    name: `${pickRandom(JUROR_FIRST_NAMES)} ${pickRandom(JUROR_LAST_NAMES)}`,
    title: "Juror",
  };
}
