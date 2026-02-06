import { seedableRandom, pickRandom, pickMultiple } from "./templates";

const JUDGE_NAMES: readonly string[] = [
  "The Honorable Judge Crescendo McBassline",
  "Justice Vinyl Scratchworth III",
  "Her Honor Melody Misconduct",
  "The Right Honorable Judge Forte Pianissimo",
  "Chief Justice Tempo Rubato-Graves",
  "Judge Bartholomew Q. Syncopation",
  "The Esteemed Judge Dolce Fortissimo",
  "Her Excellency Justice Aria Wrongnote",
  "Judge Reginald Von Trebleclef",
  "The Venerable Judge Staccato McBeat",
  "Justice Harmony B. Dissonance",
  "Judge Octavia Sharpe-Flatt",
  "The Distinguished Judge Allegro Misconduct",
  "Her Honor Cadence Thundergavel",
  "Judge Cornelius P. Diminuendo",
  "The Formidable Justice Fermata Longpause",
  "Judge Vivace Sternbrow IV",
  "Her Majesty Judge Coda Finality",
  "Justice Percival Downbeat-Smythe",
  "The Impartial Judge Sforzando Loudly",
  "Judge Adelaide Restless-Note",
  "The Stern Justice Ritardando Slowly",
  "Judge Montgomery Clef-Hanger",
  "Her Honor Priscilla Pitchfork",
  "Justice Thaddeus Offkey-Worthington",
  "The Grand Judge Maestro Misjudgement",
  "Judge Eugenia Von Earworm",
  "The Presiding Justice Baton Dropsworth",
  "Judge Reginald Tritone-Devil",
  "Her Honor Philharmonica Gavel-Smash",
  "Justice Wolfgang Amadeus Mishearing",
  "The Legendary Judge Decrescendo Doom",
];

const JUROR_NAMES: readonly string[] = [
  "Juror #1 (retired karaoke host with 'opinions')",
  "Juror #2 (hasn't listened to music since 2003)",
  "Juror #3 (claims to have perfect pitch)",
  "Juror #4 (professional wedding DJ)",
  "Juror #5 (once cried during a car commercial jingle)",
  "Juror #6 (thinks all music peaked in 1987)",
  "Juror #7 (is literally just a Spotify algorithm)",
  "Juror #8 (mumbles every lyric to every song)",
  "Juror #9 (has strong feelings about music theory)",
  "Juror #10 (still uses a Walkman, unironically)",
  "Juror #11 (got jury duty confused with American Idol)",
  "Juror #12 (only listens to instrumentals 'on principle')",
  "Juror #1 (former backup singer, VERY judgmental)",
  "Juror #2 (audiologist who takes this personally)",
  "Juror #3 (can't name a single song but has opinions anyway)",
  "Juror #4 (writes angry letters to radio stations)",
  "Juror #5 (exclusively listens to music in other languages)",
  "Juror #6 (their ringtone is the default iPhone marimba)",
  "Juror #7 (memorized the lyrics to 3,000 songs, allegedly)",
  "Juror #8 (once sued a parrot for copyright infringement)",
  "Juror #9 (brings their own gavel, which is not allowed)",
  "Juror #10 (has been humming the wrong song all morning)",
  "Juror #11 (professional lip reader, surprisingly unhelpful here)",
  "Juror #12 (fell asleep during jury selection, somehow still here)",
  "Juror #1 (competitive shower singer, regional champion)",
  "Juror #2 (has Shazam running at all times, even now)",
  "Juror #3 (passive-aggressively corrects lyrics at parties)",
  "Juror #4 (owns vinyl records they've never played)",
  "Juror #5 (thinks every song is secretly about them)",
  "Juror #6 (their Spotify Wrapped was just one song on repeat)",
  "Juror #7 (believes auto-tune is a war crime)",
  "Juror #8 (has a PhD in musicology and won't let you forget it)",
  "Juror #9 (still mourning a band that broke up in 1995)",
  "Juror #10 (listens to 10-hour ambient loops for 'focus')",
  "Juror #11 (once tried to citizen's arrest a busker)",
  "Juror #12 (only knows the chorus of every song ever made)",
  "Juror #1 (wore a band t-shirt to court, held in contempt)",
  "Juror #2 (hearing aid turned up to maximum, still confused)",
  "Juror #3 (takes detailed notes on a tiny notepad)",
  "Juror #4 (convinced music is a government conspiracy)",
  "Juror #5 (been quietly singing the wrong lyrics this whole trial)",
  "Juror #6 (self-proclaimed 'lyric truther')",
];

export function generateJudgeName(seed: number): string {
  const rng = seedableRandom(seed);
  return pickRandom(JUDGE_NAMES, rng);
}

export function generateJurorNames(seed: number): [string, string, string] {
  const rng = seedableRandom(seed + 7919);
  const picks = pickMultiple(JUROR_NAMES, 3, rng);
  return [picks[0], picks[1], picks[2]];
}
