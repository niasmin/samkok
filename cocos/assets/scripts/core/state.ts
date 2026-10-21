// Player save data. Plain JSON so it can live in localStorage on web or sys.localStorage in Cocos.
export interface HeroOwned { lv: number; star: number; copies: number; aw: number; eq: Record<string, number>; mech?: boolean }
export interface GameState {
  v: 1;
  gold: number; gems: number; exp: number; stage: number; tower: number; tickets: number;
  afkSince: number; seed: number; battleSeed: number;
  heroes: Record<string, HeroOwned>;
  team: (string | null)[];
  pityS: number; pitySP: number; pulls: number;
  souls: Record<string, number>;
  story: Record<string, 1>;
  gear: { uid: number; slot: string; q: number; il: number; enh: number }[];
  gearSeq: number;
  beasts: Record<string, number>;
  fishPts: number;
}

const starter = (lv: number): HeroOwned => ({ lv, star: 1, copies: 0, aw: 0, eq: {} });

export function newGame(now = Date.now()): GameState {
  return {
    v: 1, gold: 20000, gems: 3000, exp: 6000, stage: 1, tower: 1, tickets: 10,
    afkSince: now - 2 * 3600e3, seed: 20261021, battleSeed: 1,
    heroes: { liubei: starter(5), zhangfei: starter(5), huangzhong: starter(5), ganning: starter(5), huatuo: starter(5) },
    team: ['zhangfei', 'liubei', 'huangzhong', 'ganning', 'huatuo'],
    pityS: 0, pitySP: 0, pulls: 0, souls: {}, story: {}, gear: [], gearSeq: 1, beasts: {}, fishPts: 0,
  };
}

// Same LCG as the web prototype, so a save played in both gives the same pulls.
export function nextRandom(s: GameState): number {
  s.seed = (Math.imul(s.seed, 1664525) + 1013904223) >>> 0;
  return s.seed / 4294967296;
}
