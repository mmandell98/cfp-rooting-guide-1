export type Ranking = { team: string; rank: number; conference?: string };
export type Game = { home: string; away: string; conference?: string; week: number };

export function computeGuide(opts: {
  favorite: string;
  objective: 'Make CFP' | 'Top 12 Seed' | 'Win Conference';
  chaosLevel: number;
  sosWeight: number;
  confBias: number;
  schedule: Game[];
  rankings: Ranking[];
  opponentsPlayed: string[];
  confMap: Record<string, string | undefined>;
}) {
  const { favorite, objective, chaosLevel, sosWeight, confBias, schedule, rankings, opponentsPlayed, confMap } = opts;
  const rankMap: Record<string, number> = Object.fromEntries(rankings.map((r) => [r.team, r.rank]));
  const youRank = rankMap[favorite] ?? 30;
  const youConf = confMap[favorite] || rankings.find((r) => r.team === favorite)?.conference || '';

  return schedule.map((g) => {
    const { home, away } = g;
    const rHome = rankMap[home] ?? 40;
    const rAway = rankMap[away] ?? 40;
    const confHome = confMap[home];
    const confAway = confMap[away];

    if (home === favorite || away === favorite) {
      return { ...g, pick: favorite, score: 1000, reasons: [`You're ${youRank ? `~#${youRank}` : 'unranked'}; winning keeps the path alive.`] };
    }

    let scoreHome = 0, scoreAway = 0;
    const reasonsHome: string[] = [], reasonsAway: string[] = [];

    const chaosBoost = (chaosLevel / 100) * 50;
    const aheadHome = rHome < youRank, aheadAway = rAway < youRank;
    if (aheadHome) { scoreAway += chaosBoost; reasonsAway.push(`${home} is ahead of ${favorite}; upset helps.`); }
    if (aheadAway) { scoreHome += chaosBoost; reasonsHome.push(`${away} is ahead of ${favorite}; upset helps.`); }

    const confBoost = (confBias / 100) * 25;
    if (confHome === youConf && rHome <= youRank - 1) { scoreAway += confBoost; reasonsAway.push(`${home} is a ranked conf rival; loss eases path.`); }
    if (confAway === youConf && rAway <= youRank - 1) { scoreHome += confBoost; reasonsHome.push(`${away} is a ranked conf rival; loss eases path.`); }

    const sosBoost = (sosWeight / 100) * 30;
    if (opponentsPlayed.includes(home)) { scoreHome += sosBoost; reasonsHome.push(`Elevates SOS: you've played ${home}.`); }
    if (opponentsPlayed.includes(away)) { scoreAway += sosBoost; reasonsAway.push(`Elevates SOS: you've played ${away}.`); }

    if (objective === 'Top 12 Seed') {
      if (aheadHome) { scoreAway += 15; reasonsAway.push(`Fewer high-seed competitors if ${home} loses.`); }
      if (aheadAway) { scoreHome += 15; reasonsHome.push(`Fewer high-seed competitors if ${away} loses.`); }
    } else if (objective === 'Win Conference') {
      if (youConf && confHome === youConf) { scoreHome += 6; reasonsHome.push(`Tiebreakers/standings nudge inside your conf.`); }
      if (youConf && confAway === youConf) { scoreAway += 6; reasonsAway.push(`Tiebreakers/standings nudge inside your conf.`); }
    }

    const pick = scoreHome === scoreAway ? (rHome > rAway ? home : away) : (scoreHome > scoreAway ? home : away);
    const score = Math.max(scoreHome, scoreAway);
    const reasons = pick === home ? reasonsHome : reasonsAway;

    return { ...g, pick, score, reasons };
  }).sort((a, b) => b.score - a.score);
}
