import { describe, it, expect } from 'vitest';
import { computeGuide } from '../lib/heuristic';

describe('computeGuide', () => {
  it('prioritizes favorite team game with high score', () => {
    const guide = computeGuide({
      favorite: 'UVA',
      objective: 'Make CFP',
      chaosLevel: 70,
      sosWeight: 40,
      confBias: 60,
      schedule: [{ home: 'UVA', away: 'UNC', conference: 'ACC', week: 1 }],
      rankings: [{ team: 'UVA', rank: 26, conference: 'ACC' }, { team: 'UNC', rank: 22, conference: 'ACC' }],
      opponentsPlayed: [],
      confMap: { UVA: 'ACC', UNC: 'ACC' }
    });
    expect(guide[0].pick).toBe('UVA');
    expect(guide[0].score).toBeGreaterThan(900);
  });

  it('recommends upset vs team ranked ahead when chaos is high', () => {
    const guide = computeGuide({
      favorite: 'UVA',
      objective: 'Make CFP',
      chaosLevel: 100,
      sosWeight: 0,
      confBias: 0,
      schedule: [{ home: 'Georgia', away: 'Texas', conference: 'SEC', week: 1 }],
      rankings: [{ team: 'Georgia', rank: 1, conference: 'SEC' }, { team: 'Texas', rank: 3, conference: 'SEC' }, { team: 'UVA', rank: 26, conference: 'ACC' }],
      opponentsPlayed: [],
      confMap: { Georgia: 'SEC', Texas: 'SEC', UVA: 'ACC' }
    });
    expect(['Georgia','Texas']).toContain(guide[0].pick);
    expect(guide[0].score).toBeGreaterThan(10);
  });
});
