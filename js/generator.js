// Arrow-word ("mots fléchés") grid generator.
//
// Pure module: no DOM, no Firebase. It runs in the organizer's browser and in
// the Node tests (tests/generator.test.mjs).
//
// The grid is built by randomized greedy growth:
//   - every cell is EMPTY, LETTER or NONLETTER (a clue cell, or a dark block
//     when it ends with no clue);
//   - a word is placed only if its maximal run of letters is exactly the word,
//     and if every new letter that touches letters across forms a full
//     dictionary word too (that word is added with its own clue);
//   - each word gets a clue cell, either just before its first letter
//     (straight arrow) or beside its first letter (bent arrow), at most two
//     clues per clue cell.
// Several attempts are made; the densest grid wins.

const EMPTY = 0;
const LETTER = 1;
const NONLETTER = 2;

/** Difficulty levels. Everything a level changes lives here. */
export const LEVELS = {
  facile: { label: 'Facile', maxTier: 1, clue: 'first', givens: 0.18, maxLen: 7 },
  moyen: { label: 'Moyen', maxTier: 2, clue: 'random', givens: 0.07, maxLen: 9 },
  difficile: { label: 'Difficile', maxTier: 3, clue: 'last', givens: 0, maxLen: 11 },
};

/** Grid sizes the organizer can choose. */
export const SIZES = {
  normale: { label: 'Normale (15 × 20)', rows: 20, cols: 15 },
  petite: { label: 'Petite (10 × 12)', rows: 12, cols: 10 },
};

/**
 * Parse the dictionary text (data/dict-fr.txt).
 * Line format: MOT|tier|définition facile|définition plus difficile...
 * @returns {Array<{w: string, tier: number, clues: string[]}>}
 */
export function parseDictionary(text) {
  const byWord = new Map();
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const parts = line.split('|').map((s) => s.trim());
    const w = normalizeWord(parts[0]);
    const tier = Number(parts[1]);
    const clues = parts.slice(2).filter(Boolean);
    if (w.length < 2 || !(tier >= 1 && tier <= 3) || clues.length === 0) continue;
    const prev = byWord.get(w);
    if (prev) {
      prev.tier = Math.min(prev.tier, tier);
      prev.clues.push(...clues);
    } else {
      byWord.set(w, { w, tier, clues });
    }
  }
  return [...byWord.values()];
}

/** Uppercase, accents removed, letters only (crossword convention). */
export function normalizeWord(s) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/Œ/gi, 'OE')
    .replace(/Æ/gi, 'AE')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
}

/** Small seeded random generator (mulberry32), so a seed reproduces a grid. */
export function makeRng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class Board {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    const n = rows * cols;
    this.kind = new Uint8Array(n);
    this.ch = new Array(n).fill('');
    this.clues = Array.from({ length: n }, () => []); // word indices
    this.words = []; // {w, r, c, d, cr, cc}
    this.used = new Set();
    this.log = [];
  }
  inside(r, c) {
    return r >= 0 && c >= 0 && r < this.rows && c < this.cols;
  }
  idx(r, c) {
    return r * this.cols + c;
  }
  // --- reversible edits ---------------------------------------------------
  setLetter(i, ch) {
    this.log.push(['cell', i, this.kind[i], this.ch[i]]);
    this.kind[i] = LETTER;
    this.ch[i] = ch;
  }
  setNonLetter(i) {
    if (this.kind[i] === NONLETTER) return;
    this.log.push(['cell', i, this.kind[i], this.ch[i]]);
    this.kind[i] = NONLETTER;
  }
  addWord(word) {
    this.log.push(['word', word.w]);
    this.words.push(word);
    this.used.add(word.w);
    this.clues[this.idx(word.cr, word.cc)].push(this.words.length - 1);
  }
  mark() {
    return this.log.length;
  }
  rollback(mark) {
    while (this.log.length > mark) {
      const e = this.log.pop();
      if (e[0] === 'cell') {
        this.kind[e[1]] = e[2];
        this.ch[e[1]] = e[3];
      } else {
        const word = this.words.pop();
        this.used.delete(e[1]);
        this.clues[this.idx(word.cr, word.cc)].pop();
      }
    }
  }
}

/**
 * Pick and claim a clue cell for a word starting at (r, c) in direction d.
 * Straight arrow: the cell just before the word. Bent arrow: the cell beside
 * the first letter (above it for an across word, left of it for a down word).
 */
function claimClueCell(b, r, c, d) {
  const dr = d === 'v' ? 1 : 0;
  const dc = d === 'h' ? 1 : 0;
  const options = [
    [r - dr, c - dc],
    [r - dc, c - dr],
  ];
  // Prefer a clue cell that already exists (keeps the grid dense).
  let best = null;
  for (const [cr, cc] of options) {
    if (!b.inside(cr, cc)) continue;
    const i = b.idx(cr, cc);
    if (b.kind[i] === LETTER) continue;
    if (b.kind[i] === NONLETTER && b.clues[i].length >= 2) continue;
    const score = b.kind[i] === NONLETTER ? 2 : 1;
    if (!best || score > best.score) best = { cr, cc, score };
  }
  if (!best) return null;
  b.setNonLetter(b.idx(best.cr, best.cc));
  return best;
}

/** Make the cells just before and just after a run non-letters. */
function closeRun(b, r, c, d, len) {
  const dr = d === 'v' ? 1 : 0;
  const dc = d === 'h' ? 1 : 0;
  for (const [rr, cc] of [
    [r - dr, c - dc],
    [r + len * dr, c + len * dc],
  ]) {
    if (!b.inside(rr, cc)) continue;
    const i = b.idx(rr, cc);
    if (b.kind[i] === LETTER) return false;
    b.setNonLetter(i);
  }
  return true;
}

/**
 * Try to place `word` at (r, c) in direction d. On success the board is
 * changed and the result describes the gain; on failure the board is left
 * unchanged and null is returned.
 */
function tryPlace(b, dictSet, word, r, c, d) {
  const len = word.length;
  const dr = d === 'v' ? 1 : 0;
  const dc = d === 'h' ? 1 : 0;
  if (!b.inside(r, c) || !b.inside(r + (len - 1) * dr, c + (len - 1) * dc)) return null;
  if (b.used.has(word)) return null;
  const mark = b.mark();
  const fail = () => {
    b.rollback(mark);
    return null;
  };
  let newLetters = 0;
  let crossings = 0;
  const fresh = [];
  for (let k = 0; k < len; k++) {
    const i = b.idx(r + k * dr, c + k * dc);
    if (b.kind[i] === NONLETTER) return fail();
    if (b.kind[i] === LETTER) {
      if (b.ch[i] !== word[k]) return fail();
      crossings++;
    } else {
      b.setLetter(i, word[k]);
      newLetters++;
      fresh.push(k);
    }
  }
  if (newLetters === 0) return fail();
  if (!closeRun(b, r, c, d, len)) return fail();
  const clue = claimClueCell(b, r, c, d);
  if (!clue) return fail();
  b.addWord({ w: word, r, c, d, cr: clue.cr, cc: clue.cc });

  // Every new letter that touches letters across must form a real word.
  const pd = d === 'h' ? 'v' : 'h';
  const pr = dc;
  const pc = dr;
  let extra = 0;
  for (const k of fresh) {
    const r0 = r + k * dr;
    const c0 = c + k * dc;
    let a = 0;
    while (b.inside(r0 - (a + 1) * pr, c0 - (a + 1) * pc) && b.kind[b.idx(r0 - (a + 1) * pr, c0 - (a + 1) * pc)] === LETTER) a++;
    let z = 0;
    while (b.inside(r0 + (z + 1) * pr, c0 + (z + 1) * pc) && b.kind[b.idx(r0 + (z + 1) * pr, c0 + (z + 1) * pc)] === LETTER) z++;
    if (a === 0 && z === 0) continue;
    const sr = r0 - a * pr;
    const sc = c0 - a * pc;
    let run = '';
    for (let t = 0; t <= a + z; t++) run += b.ch[b.idx(sr + t * pr, sc + t * pc)];
    if (!dictSet.has(run) || b.used.has(run)) return fail();
    if (!closeRun(b, sr, sc, pd, run.length)) return fail();
    const cl = claimClueCell(b, sr, sc, pd);
    if (!cl) return fail();
    b.addWord({ w: run, r: sr, c: sc, d: pd, cr: cl.cr, cc: cl.cc });
    extra++;
  }
  return { newLetters, crossings, extra, mark };
}

function buildIndex(entries) {
  const byLen = new Map();
  for (const e of entries) {
    if (!byLen.has(e.w.length)) byLen.set(e.w.length, []);
    byLen.get(e.w.length).push(e.w);
  }
  return byLen;
}

function shuffleInPlace(arr, rng) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** One greedy attempt. Returns the board. */
function growOnce(rows, cols, words, dictSet, byLen, opts, rng) {
  const b = new Board(rows, cols);
  const maxLen = Math.min(opts.maxLen, Math.max(rows, cols));
  let stale = 0;
  while (stale < 4) {
    let best = null;
    for (let s = 0; s < opts.samples; s++) {
      const d = rng() < 0.5 ? 'h' : 'v';
      const dr = d === 'v' ? 1 : 0;
      const dc = d === 'h' ? 1 : 0;
      const len = 2 + Math.floor(rng() * (maxLen - 1));
      const r = Math.floor(rng() * (rows - (len - 1) * dr));
      const c = Math.floor(rng() * (cols - (len - 1) * dc));
      if (r < 0 || c < 0) continue;
      // Build the pattern; skip quickly if blocked.
      let pattern = '';
      let fixed = 0;
      let blocked = false;
      for (let k = 0; k < len; k++) {
        const i = b.idx(r + k * dr, c + k * dc);
        if (b.kind[i] === NONLETTER) {
          blocked = true;
          break;
        }
        if (b.kind[i] === LETTER) {
          pattern += b.ch[i];
          fixed++;
        } else pattern += '.';
      }
      if (blocked || fixed === len) continue;
      if (fixed === 0 && b.words.length > 0 && rng() < 0.85) continue;
      const list = byLen.get(len);
      if (!list) continue;
      // Scan from a random offset for up to 3 matching words.
      let tried = 0;
      const start = Math.floor(rng() * list.length);
      for (let t = 0; t < list.length && tried < 3; t++) {
        const w = list[(start + t) % list.length];
        let ok = true;
        for (let k = 0; k < len; k++) {
          if (pattern[k] !== '.' && pattern[k] !== w[k]) {
            ok = false;
            break;
          }
        }
        if (!ok) continue;
        tried++;
        const res = tryPlace(b, dictSet, w, r, c, d);
        if (!res) continue;
        const score =
          res.newLetters + 2.5 * res.crossings + 3 * res.extra + (fixed === 0 ? 0 : 1) + rng() * 0.5;
        b.rollback(res.mark);
        if (!best || score > best.score) best = { score, w, r, c, d };
      }
    }
    if (best && tryPlace(b, dictSet, best.w, best.r, best.c, best.d)) {
      stale = 0;
    } else {
      stale++;
    }
  }
  fillHoles(b, dictSet, byLen, maxLen, rng);
  return b;
}

/**
 * Exhaustive pass: for every empty cell, try every slot through it with every
 * matching word, and keep the best placement. Repeats until nothing fits.
 */
function fillHoles(b, dictSet, byLen, maxLen, rng) {
  let changed = true;
  while (changed) {
    changed = false;
    for (let r0 = 0; r0 < b.rows; r0++) {
      for (let c0 = 0; c0 < b.cols; c0++) {
        if (b.kind[b.idx(r0, c0)] !== EMPTY) continue;
        let best = null;
        for (const d of ['h', 'v']) {
          const dr = d === 'v' ? 1 : 0;
          const dc = d === 'h' ? 1 : 0;
          for (let len = 2; len <= maxLen; len++) {
            const list = byLen.get(len);
            if (!list) continue;
            for (let off = 0; off < len; off++) {
              const r = r0 - off * dr;
              const c = c0 - off * dc;
              if (!b.inside(r, c) || !b.inside(r + (len - 1) * dr, c + (len - 1) * dc)) continue;
              let pattern = '';
              let blocked = false;
              for (let k = 0; k < len; k++) {
                const i = b.idx(r + k * dr, c + k * dc);
                if (b.kind[i] === NONLETTER) {
                  blocked = true;
                  break;
                }
                pattern += b.kind[i] === LETTER ? b.ch[i] : '.';
              }
              if (blocked) continue;
              for (const w of list) {
                let ok = true;
                for (let k = 0; k < len; k++) {
                  if (pattern[k] !== '.' && pattern[k] !== w[k]) {
                    ok = false;
                    break;
                  }
                }
                if (!ok) continue;
                const res = tryPlace(b, dictSet, w, r, c, d);
                if (!res) continue;
                const score = res.newLetters + 2.5 * res.crossings + 3 * res.extra + rng() * 0.5;
                b.rollback(res.mark);
                if (!best || score > best.score) best = { score, w, r, c, d };
              }
            }
          }
        }
        if (best && tryPlace(b, dictSet, best.w, best.r, best.c, best.d)) changed = true;
      }
    }
  }
}

function quality(b) {
  let letters = 0;
  let blocks = 0;
  for (let i = 0; i < b.kind.length; i++) {
    if (b.kind[i] === LETTER) letters++;
    else if (b.kind[i] !== NONLETTER || b.clues[i].length === 0) blocks++;
  }
  return { letters, blocks, score: letters - 1.5 * blocks };
}

/**
 * Generate a grid.
 * @param {object} p
 * @param {Array} p.entries   parsed dictionary (parseDictionary)
 * @param {string} p.level    key of LEVELS
 * @param {number} p.rows
 * @param {number} p.cols
 * @param {number} [p.seed]
 * @param {number} [p.attempts=6]
 * @returns {{rows, cols, level, words: Array<{w,r,c,d,cr,cc,q}>, givens: Array<[number,number]>}}
 *   `w` is the answer (kept secret by the caller), `q` the clue text.
 */
export function generateGrid({ entries, level, rows, cols, seed, attempts = 6, samples = 260 }) {
  const lv = LEVELS[level];
  if (!lv) throw new Error(`unknown level ${level}`);
  const rng = makeRng(seed ?? Math.floor(Math.random() * 2 ** 32));
  const pool = entries.filter((e) => e.tier <= lv.maxTier);
  const byWord = new Map(entries.map((e) => [e.w, e]));
  // Words across may come from the whole dictionary: they are forced by the
  // crossing letters, so restricting them only makes grids emptier.
  const dictSet = new Set(entries.map((e) => e.w));
  const byLen = buildIndex(shuffleInPlace([...pool], rng));
  const opts = { maxLen: lv.maxLen, samples };

  let best = null;
  for (let a = 0; a < attempts; a++) {
    const b = growOnce(rows, cols, pool, dictSet, byLen, opts, rng);
    const q = quality(b);
    if (!best || q.score > best.q.score) best = { b, q };
  }
  const b = best.b;

  const words = b.words.map((x) => {
    const e = byWord.get(x.w);
    let q;
    if (lv.clue === 'first') q = e.clues[0];
    else if (lv.clue === 'last') q = e.clues[e.clues.length - 1];
    else q = e.clues[Math.floor(rng() * e.clues.length)];
    return { w: x.w, r: x.r, c: x.c, d: x.d, cr: x.cr, cc: x.cc, q };
  });

  // Given letters (shown from the start), spread over the grid.
  const letterCells = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) if (b.kind[b.idx(r, c)] === LETTER) letterCells.push([r, c]);
  shuffleInPlace(letterCells, rng);
  const givens = letterCells.slice(0, Math.round(lv.givens * letterCells.length));

  return { rows, cols, level, words, givens, stats: best.q };
}

/**
 * Letters of a grid, recomputed from its words.
 * @returns {Map<string, string>} "r,c" -> letter
 */
export function lettersOf(words) {
  const m = new Map();
  for (const x of words) {
    for (let k = 0; k < x.w.length; k++) {
      const r = x.r + (x.d === 'v' ? k : 0);
      const c = x.c + (x.d === 'h' ? k : 0);
      m.set(`${r},${c}`, x.w[k]);
    }
  }
  return m;
}

/** Arrow kind of a clue: 'right', 'down', 'right-down' or 'down-right'. */
export function arrowKind(x) {
  const startRight = x.r === x.cr && x.c === x.cc + 1;
  if (startRight) return x.d === 'h' ? 'right' : 'right-down';
  return x.d === 'v' ? 'down' : 'down-right';
}
