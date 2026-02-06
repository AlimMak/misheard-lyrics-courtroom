import { CaseData, JurorReaction } from "../types";
import { fillTemplate, pickRandom, TemplateSlots } from "./templates";
import { generateJurorName } from "./names";
import { JUROR_COUNT } from "../constants";

const GUILTY_REACTIONS: readonly string[] = [
  "I've been singing \"{real}\" correctly my WHOLE life. No excuse. GUILTY.",
  "My grandmother could hear the difference, and she's been deaf since '94. GUILTY.",
  "I just played \"{song}\" on my phone. It's SO clear. How do you get \"{misheard}\" from that?!",
  "\"{misheard}\"?! In what UNIVERSE does that make sense in the context of \"{song}\"?",
  "I'm not even a big {artist} fan but even I know it's \"{real}.\" Come on.",
  "The defendant should be banned from all streaming services immediately. GUILTY.",
  "I've never been more certain of anything in my life. This is a clear case of ears gone wrong.",
  "My five-year-old nephew knows the words to \"{song}.\" FIVE. YEARS. OLD. Guilty.",
  "I tried to see it from the defendant's perspective. I tried \"{misheard}\" three times. Nope. Can't do it.",
  "Honestly, I'm offended on behalf of {artist}. They worked HARD on those lyrics.",
  "The defendant had access to Google. To Spotify lyrics. To asking literally anyone. No mercy.",
  "\"{misheard}\" doesn't even make GRAMMATICAL sense! At least mishear something coherent!",
  "I was on the fence until I heard the actual song again. Now I'm firmly in the guilty camp.",
  "This isn't a mishearing — this is a REWRITE. And not a good one. Guilty.",
  "I've lost sleep over this. \"{misheard}\" instead of \"{real}\"? The AUDACITY.",
  "Hold on — *pulls out phone* — yep, just confirmed. The lyrics are RIGHT THERE. Guilty as charged.",
  "I work in audio engineering. There is NO acoustic explanation for hearing \"{misheard}.\" None.",
  "Even autocorrect wouldn't have come up with \"{misheard}.\" This is beyond technology's ability to predict.",
];

const NOT_GUILTY_REACTIONS: readonly string[] = [
  "Honestly? I kinda hear it too. \"{misheard}\" isn't THAT far from \"{real}\"... is it?",
  "Look, {artist}'s enunciation in \"{song}\" is... not the clearest. I'm sympathetic.",
  "I've been singing \"{misheard}\" for YEARS too! *nervous laughter* Not guilty!",
  "In the defendant's defense, music is LOUD and lyrics are HARD. We've all been there.",
  "I just realized I've been singing the wrong lyrics to at least four songs. Glass houses, people.",
  "Not guilty. The real crime is that {artist} didn't enunciate more clearly in \"{song}.\"",
  "I ran \"{misheard}\" past my friend and they said 'wait, that's NOT what it says?' Case closed.",
  "The acoustics defense convinced me. In a car, at volume, \"{real}\" could ABSOLUTELY sound like \"{misheard}.\"",
  "Not guilty. Life's too short to google every lyric. Let people sing their hearts out.",
  "If mishearing lyrics is a crime, we should ALL be in jail. Not guilty.",
  "I'm voting not guilty because I just checked my own lyric accuracy and I'm scared.",
  "The defendant's version \"{misheard}\" is honestly funnier than the real lyric. Acquit on creativity grounds.",
  "Not guilty. {artist}'s vocal style is objectively hard to parse. I blame the mixing engineer.",
  "I relate to this on a spiritual level. Not guilty, and I'd like to file my own confession.",
  "In my professional opinion as someone with ears: \"{real}\" and \"{misheard}\" sound similar enough. Not guilty.",
  "Honestly, the defendant's version makes the song MORE interesting. Innovation isn't a crime.",
];

export function generateJuryReactions(
  caseData: CaseData,
  guiltyRatio: number
): readonly JurorReaction[] {
  const slots: TemplateSlots = {
    misheard: caseData.misheardLyric,
    real: caseData.realLyric,
    song: caseData.songTitle,
    artist: caseData.artist,
  };

  const guiltyCount = Math.round(JUROR_COUNT * guiltyRatio);
  const jurors: JurorReaction[] = [];

  for (let i = 0; i < JUROR_COUNT; i++) {
    const isGuilty = i < guiltyCount;
    const reactions = isGuilty ? GUILTY_REACTIONS : NOT_GUILTY_REACTIONS;
    jurors.push({
      character: generateJurorName(),
      reaction: fillTemplate(pickRandom(reactions), slots),
      vote: isGuilty ? "guilty" : "not-guilty",
    });
  }

  return jurors.sort(() => Math.random() - 0.5);
}
