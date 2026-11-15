// Grid generator tests. Run with: npm run test:generator
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseDictionary, generateGrid, lettersOf, arrowKind, answerString, sha256, LEVELS } from '../js/generator.js';

const entries = parseDictionary(readFileSync(new URL('../data/dict-fr.txt', import.meta.url), 'utf8'));
const known = new Set(entries.map((e) => e.w));

test('dictionary is large and clean', () => {
  assert.ok(entries.length > 1500, `only ${entries.length} entries`);
  for (const e of entries) {
    assert.match(e.w, /^[A-Z]{2,}$/);
    for (const q of e.clues) assert.ok(q.length <= 40, `clue too long for ${e.w}: ${q}`);
  }
});

/** Every maximal run of 2+ letters, across and down, must be a placed word. */
function checkGrid(g) {
  const L = lettersOf(g.words);
  const placed = new Set(g.words.map((w) => `${w.r},${w.c},${w.d}`));
  const clueCells = new Map();
  for (const w of g.words) {
    assert.ok(known.has(w.w), `unknown word ${w.w}`);
    assert.ok(!L.has(`${w.cr},${w.cc}`), `clue cell of ${w.w} holds a letter`);
    const k = `${w.cr},${w.cc}`;
    clueCells.set(k, (clueCells.get(k) || 0) + 1);
    // the clue cell touches the first letter (straight or bent arrow)
    const dist = Math.abs(w.cr - w.r) + Math.abs(w.cc - w.c);
    assert.equal(dist, 1, `clue of ${w.w} is not next to its first letter`);
    assert.ok(['right', 'down', 'right-down', 'down-right'].includes(arrowKind(w)));
    assert.ok(w.q && w.q.length > 0);
  }
  for (const n of clueCells.values()) assert.ok(n <= 2, 'more than two clues in a cell');
  for (const d of ['h', 'v']) {
    for (let a = 0; a < (d === 'h' ? g.rows : g.cols); a++) {
      let start = null;
      const len = d === 'h' ? g.cols : g.rows;
      for (let b = 0; b <= len; b++) {
        const key = d === 'h' ? `${a},${b}` : `${b},${a}`;
        if (b < len && L.has(key)) {
          if (start === null) start = b;
        } else if (start !== null) {
          if (b - start >= 2) {
            const sk = d === 'h' ? `${a},${start},h` : `${start},${a},v`;
            assert.ok(placed.has(sk), `run at ${sk} is not a word`);
          }
          start = null;
        }
      }
    }
  }
  // every letter belongs to at least one word, no duplicate words
  assert.equal(new Set(g.words.map((w) => w.w)).size, g.words.length);
  return L;
}

/** No black cells: every cell is a letter or a clue cell. */
function checkFull(g, L) {
  const clues = new Set(g.words.map((w) => `${w.cr},${w.cc}`));
  for (let r = 0; r < g.rows; r++) {
    for (let c = 0; c < g.cols; c++) {
      const k = `${r},${c}`;
      assert.ok(L.has(k) !== clues.has(k), `cell ${k} is ${L.has(k) ? 'both' : 'neither'} letter and clue`);
    }
  }
}

for (const level of Object.keys(LEVELS)) {
  test(`complete ${level} grids (10 × 10)`, () => {
    for (const seed of [1, 2]) {
      const g = generateGrid({ entries, level, rows: 10, cols: 10, seed, timeLimitMs: 120000 });
      const L = checkGrid(g);
      checkFull(g, L);
      assert.equal(g.givens.length, Math.round(LEVELS[level].givens * L.size));
    }
  });
}

test('paper-mode fingerprint changes with any letter', async () => {
  const g = generateGrid({ entries, level: 'moyen', rows: 10, cols: 10, seed: 3, timeLimitMs: 120000 });
  const L = lettersOf(g.words);
  const right = await sha256('salt' + answerString(10, 10, L));
  const k = [...L.keys()][5];
  L.set(k, L.get(k) === 'A' ? 'B' : 'A');
  assert.notEqual(await sha256('salt' + answerString(10, 10, L)), right);
});

test('same seed gives the same grid', () => {
  const a = generateGrid({ entries, level: 'difficile', rows: 10, cols: 10, seed: 7, timeLimitMs: 1e9 });
  const b = generateGrid({ entries, level: 'difficile', rows: 10, cols: 10, seed: 7, timeLimitMs: 1e9 });
  assert.deepEqual(a.words, b.words);
});
