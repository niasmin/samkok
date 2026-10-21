import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as G from '../assets/scripts/core/game-data.ts';

const team = ['zhangfei', 'liubei', 'huangzhong', 'ganning', 'huatuo'].map(id => ({ id, lv: 5, star: 1, aw: 0 }));

test('battles are deterministic for the same seed', () => {
  const a = G.simulate(team, G.enemyTeam(3), 42), b = G.simulate(team, G.enemyTeam(3), 42);
  assert.deepEqual(a, b);
});

test('starter team clears stage 1-1', () => {
  assert.equal(G.simulate(team, G.enemyTeam(1), 1).winner, 'p');
});

test('level cap reaches 1000 at 5 stars and 5 awakenings', () => {
  assert.equal(G.levelCap(5, 5), 1000);
  assert.equal(G.levelCap(1, 0), 100);
});

test('every story stage builds a full enemy team', () => {
  for (let c = 0; c < G.STORY.length; c++) for (let s = 0; s < 3; s++) {
    const t = G.storyTeam(c, s);
    assert.equal(t.length, 5);
    assert.ok(t.every(x => G.HERO[x.id]));
  }
});

test('every general has a placeholder portrait and a bond reference that exists', () => {
  for (const h of G.HEROES) assert.match(G.portrait(h.id), /^<svg/);
  for (const b of G.BONDS) assert.ok(b.ids.every(id => G.HERO[id]), b.name);
});
