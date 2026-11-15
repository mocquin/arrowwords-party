// Grid generator tests. Run with: npm run test:generator
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseDictionary, generateGrid, lettersOf, arrowKind, LEVELS, SIZES } from '../js/generator.js';

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

for (const level of Object.keys(LEVELS)) {
  for (const [sizeName, size] of Object.entries(SIZES)) {
    test(`valid ${level} grid, size ${sizeName}`, () => {
      for (const seed of [1, 2, 3]) {
        const g = generateGrid({ entries, level, rows: size.rows, cols: size.cols, seed, attempts: 4 });
        const L = checkGrid(g);
        const fill = L.size / (g.rows * g.cols);
        assert.ok(fill > 0.5, `grid too empty: ${(fill * 100).toFixed(0)}% letters`);
        assert.equal(g.givens.length, Math.round(LEVELS[level].givens * L.size));
      }
    });
  }
}

test('same seed gives the same grid', () => {
  const a = generateGrid({ entries, level: 'moyen', rows: 12, cols: 10, seed: 7, attempts: 2 });
  const b = generateGrid({ entries, level: 'moyen', rows: 12, cols: 10, seed: 7, attempts: 2 });
  assert.deepEqual(a.words, b.words);
});
