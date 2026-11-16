// Arrow-word ("mots fléchés") grid generator.
//
// Pure module: no DOM, no Firebase. It runs in a Web Worker in the organizer's
// browser (js/generator-worker.js) and in the Node tests.
//
// Every cell is either a letter or a clue cell: no black cells.
// The grid is filled cell by cell, row by row, with backtracking:
//   - the top row and the left column alternate clue / letter, as in printed
//     grids (their clues point down and right with bent arrows);
//   - every run of 2+ letters, across and down, must be a dictionary word, used
//     once; while a run is open it must stay the start of a word that can still
//     end before the edge of the grid;
//   - every letter belongs to at least one word;
//   - every clue cell must point to one or two words that start just right of
//     it or just below it; each word gets exactly one clue cell.
// Attempts restart with new random choices until one succeeds or time is up.

/**
 * Difficulty levels. Everything a level changes lives here:
 *   weights  how much the search prefers words of tier 1, 2, 3 (common → rare)
 *   clue     which definition is shown: the easy one, a random one, the hard one
 *   givens   share of letters shown from the start
 */
export const LEVELS = {
  facile: { label: 'Facile', weights: [1, 0.15, 0.03], clue: 'first', givens: 0.18 },
  moyen: { label: 'Moyen', weights: [1, 0.6, 0.25], clue: 'random', givens: 0.07 },
  difficile: { label: 'Difficile', weights: [1, 1, 1], clue: 'last', givens: 0 },
};

/** Grid sizes the organizer can choose (columns × rows). */
export const SIZES = {
  normale: { label: 'Normale (10 × 14)', rows: 14, cols: 10 },
  petite: { label: 'Petite (10 × 10)', rows: 10, cols: 10 },
  grande: { label: 'Grande (12 × 16), plus longue à créer', rows: 16, cols: 12 },
};

/** How answers are checked (chosen by the organizer for each grid). */
export const MODES = {
  instant: { label: 'Mot par mot' },
  paper: { label: 'À la fin, comme sur papier' },
};

/** Longest word the generator places. Short words make grids fillable. */
const MAX_RUN = 7;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CLUE = '#';

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
      for (const q of clues) if (!prev.clues.includes(q)) prev.clues.push(q);
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


/** Prefix tables used by the search. */
function buildIndex(entries, weights) {
  const words = new Set();
  const weight = new Map(); // prefix -> summed weight of words with it
  const minLen = new Map(); // prefix -> shortest word length with it
  for (const e of entries) {
    if (e.w.length > MAX_RUN) continue;
    words.add(e.w);
    const wt = weights[e.tier - 1];
    for (let i = 1; i <= e.w.length; i++) {
      const p = e.w.slice(0, i);
      weight.set(p, (weight.get(p) || 0) + wt);
      if (!minLen.has(p) || minLen.get(p) > e.w.length) minLen.set(p, e.w.length);
    }
  }
  return { words, weight, minLen };
}

/** One attempt. Returns the cell array or null. */
function fillOnce(rows, cols, index, rng, nodeLimit) {
  const { words, weight, minLen } = index;
  const N = rows * cols;
  const g = new Array(N).fill(null);
  const used = new Set();
  const single = [new Uint8Array(N), new Uint8Array(N)]; // [across run of 1, down run of 1]
  const at = (r, c) => g[r * cols + c];
  let nodes = 0;

  const canEnd = (p, room) => p.length === 1 || words.has(p) || minLen.get(p) - p.length <= room;
  const isLetter = (r, c) => r >= 0 && c >= 0 && r < rows && c < cols && at(r, c) !== CLUE; // undecided counts
  const startsDown = (r, c) => r === 0 || at(r - 1, c) === CLUE || at(r - 1, c) === null;
  const startsAcross = (r, c) => c === 0 || at(r, c - 1) === CLUE || at(r, c - 1) === null;
  // Can the clue cell (r, c) still point to a word? Undecided cells count as letters.
  const clueUseful = (r, c) =>
    (isLetter(r, c + 1) && isLetter(r, c + 2)) ||
    (isLetter(r + 1, c) && isLetter(r + 2, c)) ||
    (isLetter(r, c + 1) && isLetter(r + 1, c + 1) && startsDown(r, c + 1)) ||
    (isLetter(r + 1, c) && isLetter(r + 1, c + 1) && startsAcross(r + 1, c));

  function runBefore(r, c, dr, dc) {
    let s = '';
    for (let y = r - dr, x = c - dc; y >= 0 && x >= 0 && at(y, x) !== CLUE; y -= dr, x -= dc) s = at(y, x) + s;
    return s;
  }

  // Mark a closed run of length 1 and fail if its letter is alone both ways.
  function markSingle(dir, i, undo) {
    single[dir][i] = 1;
    undo.push(() => (single[dir][i] = 0));
    return !single[1 - dir][i];
  }

  function closeRun(s, undo) {
    if (s.length < 2) return true;
    if (!words.has(s) || used.has(s)) return false;
    used.add(s);
    undo.push(() => used.delete(s));
    return true;
  }

  function rec(i) {
    if (i === N) return true;
    if (++nodes > nodeLimit) return false;
    const r = Math.floor(i / cols);
    const c = i % cols;
    const a = runBefore(r, c, 0, 1);
    const d = runBefore(r, c, 1, 0);

    // Candidate values, best first.
    const frame = r === 0 || c === 0 ? (r === 0 ? c : r) % 2 === 0 : null; // true: clue forced
    const letters = [];
    if (frame !== true) {
      for (const L of ALPHABET) {
        const na = a + L;
        const nd = d + L;
        if (na.length > MAX_RUN || nd.length > MAX_RUN) continue;
        const wa = weight.get(na);
        const wd = weight.get(nd);
        if (!wa || !wd) continue;
        if (!canEnd(na, Math.min(cols - 1 - c, MAX_RUN - na.length))) continue;
        if (!canEnd(nd, Math.min(rows - 1 - r, MAX_RUN - nd.length))) continue;
        letters.push({ L, s: Math.log(wa) + Math.log(wd) + rng() * 3 });
      }
      letters.sort((x, y) => y.s - x.s);
    }
    const order = letters.map((x) => x.L);
    const clueAllowed = frame !== false && !(r === rows - 1 && c === cols - 1);
    if (clueAllowed) {
      if (frame === true) order.unshift(CLUE);
      else if (a.length === 0 && d.length === 0) order.push(CLUE);
      else {
        const good = words.has(a) || words.has(d);
        order.splice(good && rng() < 0.5 ? 0 : Math.min(order.length, 1 + Math.floor(rng() * 3)), 0, CLUE);
      }
    }

    for (const L of order) {
      const undo = [];
      let ok = true;
      if (L === CLUE) {
        if (a.length === 1) ok = markSingle(0, i - 1, undo);
        if (ok && d.length === 1) ok = markSingle(1, i - cols, undo);
        if (ok) ok = closeRun(a, undo) && closeRun(d, undo);
      } else {
        if (c === cols - 1) ok = (a + L).length === 1 ? markSingle(0, i, undo) : closeRun(a + L, undo);
        if (ok && r === rows - 1) ok = (d + L).length === 1 ? markSingle(1, i, undo) : closeRun(d + L, undo);
      }
      if (ok) {
        g[i] = L;
        // Clue cells whose neighbourhood just changed must stay useful.
        for (const [y, x] of [[r, c], [r, c - 1], [r, c - 2], [r - 1, c], [r - 2, c], [r - 1, c - 1], [r - 1, c + 1], [r - 1, c - 2]]) {
          if (y >= 0 && x >= 0 && x < cols && at(y, x) === CLUE && !clueUseful(y, x)) {
            ok = false;
            break;
          }
        }
        if (ok && rec(i + 1)) return true;
        g[i] = null;
      }
      for (let k = undo.length - 1; k >= 0; k--) undo[k]();
      if (nodes > nodeLimit) return false;
    }
    return false;
  }

  return rec(0) ? g : null;
}

/** All runs of 2+ letters, as words with their position. */
function extractWords(g, rows, cols) {
  const out = [];
  const at = (r, c) => g[r * cols + c];
  for (const d of ['h', 'v']) {
    const dr = d === 'v' ? 1 : 0;
    const dc = d === 'h' ? 1 : 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (at(r, c) === CLUE) continue;
        const pr = r - dr;
        const pc = c - dc;
        if (pr >= 0 && pc >= 0 && at(pr, pc) !== CLUE) continue; // not a start
        let w = '';
        for (let y = r, x = c; y < rows && x < cols && at(y, x) !== CLUE; y += dr, x += dc) w += at(y, x);
        if (w.length >= 2) out.push({ w, r, c, d });
      }
    }
  }
  return out;
}

/**
 * Give each word a clue cell (straight: just before its first letter; bent:
 * beside it), at most two per clue cell, every clue cell used.
 * Returns false if impossible.
 */
function assignClues(words, g, rows, cols) {
  const isClue = (r, c) => r >= 0 && c >= 0 && r < rows && c < cols && g[r * cols + c] === CLUE;
  const cand = words.map((w) => {
    const straight = w.d === 'h' ? [w.r, w.c - 1] : [w.r - 1, w.c];
    const bent = w.d === 'h' ? [w.r - 1, w.c] : [w.r, w.c - 1];
    return [straight, bent].filter(([r, c]) => isClue(r, c)).map(([r, c]) => r * cols + c);
  });
  const load = new Map();
  const owner = new Map(); // clue cell -> word indices
  const choice = new Array(words.length).fill(-1);
  const clueCells = [];
  for (let i = 0; i < g.length; i++) if (g[i] === CLUE) clueCells.push(i);
  // 1) every clue cell gets one word (bipartite matching, augmenting paths)
  const matchOfWord = new Array(words.length).fill(-1);
  const matchOfCell = new Map();
  const wordsOfCell = new Map(clueCells.map((k) => [k, []]));
  cand.forEach((cs, wi) => cs.forEach((k) => wordsOfCell.get(k).push(wi)));
  function augment(k, seen) {
    for (const wi of wordsOfCell.get(k)) {
      if (seen.has(wi)) continue;
      seen.add(wi);
      if (matchOfWord[wi] === -1 || augment(matchOfWord[wi], seen)) {
        matchOfWord[wi] = k;
        matchOfCell.set(k, wi);
        return true;
      }
    }
    return false;
  }
  for (const k of clueCells) if (!augment(k, new Set())) return false;
  for (let wi = 0; wi < words.length; wi++) {
    if (matchOfWord[wi] !== -1) {
      choice[wi] = matchOfWord[wi];
      load.set(choice[wi], (load.get(choice[wi]) || 0) + 1);
    }
  }
  // 2) the other words take any candidate with room left
  for (let wi = 0; wi < words.length; wi++) {
    if (choice[wi] !== -1) continue;
    const k = cand[wi].find((x) => (load.get(x) || 0) < 2);
    if (k === undefined) return false;
    choice[wi] = k;
    load.set(k, (load.get(k) || 0) + 1);
  }
  words.forEach((w, wi) => {
    w.cr = Math.floor(choice[wi] / cols);
    w.cc = choice[wi] % cols;
    if (!owner.has(choice[wi])) owner.set(choice[wi], []);
    owner.get(choice[wi]).push(wi);
  });
  return true;
}

function shuffleInPlace(arr, rng) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Current time in ms (works in browsers, workers and Node). */
const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

/**
 * Generate a grid with no black cells.
 * @param {object} p
 * @param {Array} p.entries        parsed dictionary (parseDictionary)
 * @param {string} p.level         key of LEVELS
 * @param {number} p.rows
 * @param {number} p.cols
 * @param {number} [p.seed]        same seed, same grid
 * @param {number} [p.timeLimitMs=60000]
 * @param {number} [p.nodeLimit=150000]  search steps per attempt
 * @returns {{rows, cols, level, words: Array<{w,r,c,d,cr,cc,q}>, givens: Array<[number,number]>, attempts: number}}
 *   `w` is the answer (kept secret by the caller), `q` the clue text.
 * @throws Error('timeout') when no grid was found in time.
 */
export function generateGrid({ entries, level, rows, cols, seed, timeLimitMs = 60000, nodeLimit = 150000 }) {
  const lv = LEVELS[level];
  if (!lv) throw new Error(`unknown level ${level}`);
  const rng = makeRng(seed ?? Math.floor(Math.random() * 2 ** 32));
  const index = buildIndex(entries, lv.weights);
  const byWord = new Map(entries.map((e) => [e.w, e]));
  const t0 = now();
  for (let attempt = 1; now() - t0 < timeLimitMs; attempt++) {
    const g = fillOnce(rows, cols, index, rng, nodeLimit);
    if (!g) continue;
    const found = extractWords(g, rows, cols);
    if (!assignClues(found, g, rows, cols)) continue;
    const words = found.map((x) => {
      const e = byWord.get(x.w);
      let q;
      if (lv.clue === 'first') q = e.clues[0];
      else if (lv.clue === 'last') q = e.clues[e.clues.length - 1];
      else q = e.clues[Math.floor(rng() * e.clues.length)];
      return { ...x, q };
    });
    const letterCells = [];
    for (let i = 0; i < g.length; i++) if (g[i] !== CLUE) letterCells.push([Math.floor(i / cols), i % cols]);
    shuffleInPlace(letterCells, rng);
    const givens = letterCells.slice(0, Math.round(lv.givens * letterCells.length));
    return { rows, cols, level, words, givens, attempts: attempt };
  }
  throw new Error('timeout');
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

/**
 * All letters of the grid in reading order (letter cells only). In paper mode
 * the page publishes only a fingerprint of this string, so players learn
 * whether the full grid is right without learning any single answer.
 * @param {Map<string,string>} letters "r,c" -> letter
 */
export function answerString(rows, cols, letters) {
  let s = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) s += letters.get(`${r},${c}`) ?? '';
  return s;
}

/** SHA-256 of a text, as hex (browsers, workers and Node 20+). */
export async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
