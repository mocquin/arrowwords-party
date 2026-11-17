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
  petite: { label: 'Petite (10 × 10)', rows: 10, cols: 10, timeLimitMs: 60000 },
  normale: { label: 'Normale (10 × 14)', rows: 14, cols: 10, timeLimitMs: 60000 },
  moyenne: { label: 'Moyenne (12 × 16)', rows: 16, cols: 12, timeLimitMs: 90000 },
  grande: { label: 'Grande (14 × 18), environ 30 s', rows: 18, cols: 14, timeLimitMs: 120000 },
  geante: { label: 'Géante (15 × 20), 1 à 2 min', rows: 20, cols: 15, timeLimitMs: 150000 },
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


/**
 * Letter tree (trie) of the usable words, in flat typed arrays for speed.
 * Node 0 is the root; child[node * 26 + letter] is the next node or -1.
 */
function buildIndex(entries, weights) {
  let cap = 1 << 15;
  let child = new Int32Array(cap * 26).fill(-1);
  let weight = new Float64Array(cap); // summed weight of the words through the node
  let minLen = new Uint8Array(cap).fill(255); // shortest word through the node
  let wordId = new Int32Array(cap).fill(-1); // word ending exactly here
  let n = 1;
  const words = [];
  const grow = () => {
    const c2 = cap * 2;
    const ch = new Int32Array(c2 * 26).fill(-1);
    ch.set(child);
    const w = new Float64Array(c2);
    w.set(weight);
    const m = new Uint8Array(c2).fill(255);
    m.set(minLen);
    const id = new Int32Array(c2).fill(-1);
    id.set(wordId);
    [child, weight, minLen, wordId, cap] = [ch, w, m, id, c2];
  };
  for (const e of entries) {
    if (e.w.length > MAX_RUN || !/^[A-Z]+$/.test(e.w)) continue;
    const wt = weights[e.tier - 1];
    let node = 0;
    for (let i = 0; i < e.w.length; i++) {
      const L = e.w.charCodeAt(i) - 65;
      let next = child[node * 26 + L];
      if (next < 0) {
        if (n >= cap) grow();
        next = n++;
        child[node * 26 + L] = next;
      }
      node = next;
      weight[node] += wt;
      if (minLen[node] > e.w.length) minLen[node] = e.w.length;
    }
    if (wordId[node] < 0) {
      wordId[node] = words.length;
      words.push(e.w);
    }
  }
  return { child, weight, minLen, wordId, nWords: words.length };
}

const CLUE_CODE = 26;

/** One attempt. Returns the cell array ('#' or a letter per cell) or null. */
function fillOnce(rows, cols, index, rng, nodeLimit) {
  const { child, weight, minLen, wordId, nWords } = index;
  const N = rows * cols;
  const g = new Int8Array(N).fill(-1); // -1 undecided, 0..25 letter, 26 clue
  const aNode = new Int32Array(N);
  const aLen = new Uint8Array(N);
  const dNode = new Int32Array(N);
  const dLen = new Uint8Array(N);
  const used = new Uint8Array(nWords);
  const single = [new Uint8Array(N), new Uint8Array(N)]; // [across run of 1, down run of 1]
  const logW = (node) => Math.log(weight[node]);
  let nodes = 0;

  const canEnd = (node, len, room) => len === 1 || wordId[node] >= 0 || minLen[node] - len <= room;
  const at = (r, c) => g[r * cols + c];
  const isLetter = (r, c) => r >= 0 && c >= 0 && r < rows && c < cols && at(r, c) !== CLUE_CODE; // undecided counts
  const startsDown = (r, c) => r === 0 || at(r - 1, c) === CLUE_CODE || at(r - 1, c) === -1;
  const startsAcross = (r, c) => c === 0 || at(r, c - 1) === CLUE_CODE || at(r, c - 1) === -1;
  // Can the clue cell (r, c) still point to a word? Undecided cells count as letters.
  const clueUseful = (r, c) =>
    (isLetter(r, c + 1) && isLetter(r, c + 2)) ||
    (isLetter(r + 1, c) && isLetter(r + 2, c)) ||
    (isLetter(r, c + 1) && isLetter(r + 1, c + 1) && startsDown(r, c + 1)) ||
    (isLetter(r + 1, c) && isLetter(r + 1, c + 1) && startsAcross(r + 1, c));

  function markSingle(dir, i, undo) {
    single[dir][i] = 1;
    undo.push(() => (single[dir][i] = 0));
    return !single[1 - dir][i];
  }
  function closeWord(node, len, undo) {
    if (len < 2) return true;
    const id = wordId[node];
    if (id < 0 || used[id]) return false;
    used[id] = 1;
    undo.push(() => (used[id] = 0));
    return true;
  }

  const NEAR = [[0, 0], [0, -1], [0, -2], [-1, 0], [-2, 0], [-1, -1], [-1, 1], [-1, -2]];
  const order = new Int8Array(27);
  const scores = new Float64Array(27);

  function rec(i) {
    if (i === N) return true;
    if (++nodes > nodeLimit) return false;
    const r = Math.floor(i / cols);
    const c = i % cols;
    const prevA = c > 0 && g[i - 1] >= 0 && g[i - 1] < 26;
    const an0 = prevA ? aNode[i - 1] : 0;
    const al0 = prevA ? aLen[i - 1] : 0;
    const prevD = r > 0 && g[i - cols] >= 0 && g[i - cols] < 26;
    const dn0 = prevD ? dNode[i - cols] : 0;
    const dl0 = prevD ? dLen[i - cols] : 0;

    // Candidate values, best first.
    const frame = r === 0 || c === 0 ? (r === 0 ? c : r) % 2 === 0 : null; // true: clue forced
    let k = 0;
    if (frame !== true) {
      const roomA = Math.min(cols - 1 - c, MAX_RUN - al0 - 1);
      const roomD = Math.min(rows - 1 - r, MAX_RUN - dl0 - 1);
      for (let L = 0; L < 26; L++) {
        const na = child[an0 * 26 + L];
        if (na < 0) continue;
        const nd = child[dn0 * 26 + L];
        if (nd < 0) continue;
        if (!canEnd(na, al0 + 1, roomA) || !canEnd(nd, dl0 + 1, roomD)) continue;
        order[k] = L;
        scores[k] = logW(na) + logW(nd) + rng() * 3;
        k++;
      }
      // insertion sort, best first
      for (let x = 1; x < k; x++) {
        const L = order[x];
        const sc = scores[x];
        let y = x - 1;
        while (y >= 0 && scores[y] < sc) {
          order[y + 1] = order[y];
          scores[y + 1] = scores[y];
          y--;
        }
        order[y + 1] = L;
        scores[y + 1] = sc;
      }
    }
    const clueAllowed = frame !== false && !(r === rows - 1 && c === cols - 1);
    if (clueAllowed) {
      let pos;
      if (frame === true) pos = 0;
      else if (al0 === 0 && dl0 === 0) pos = k;
      else {
        const good = (al0 >= 2 && wordId[an0] >= 0) || (dl0 >= 2 && wordId[dn0] >= 0);
        pos = good && rng() < 0.5 ? 0 : Math.min(k, 1 + Math.floor(rng() * 3));
      }
      for (let x = k; x > pos; x--) order[x] = order[x - 1];
      order[pos] = CLUE_CODE;
      k++;
    }
    const opts = order.slice(0, k);

    for (const L of opts) {
      const undo = [];
      let ok = true;
      if (L === CLUE_CODE) {
        if (al0 === 1) ok = markSingle(0, i - 1, undo);
        if (ok && dl0 === 1) ok = markSingle(1, i - cols, undo);
        if (ok) ok = closeWord(an0, al0, undo) && closeWord(dn0, dl0, undo);
      } else {
        const na = child[an0 * 26 + L];
        const nd = child[dn0 * 26 + L];
        aNode[i] = na;
        aLen[i] = al0 + 1;
        dNode[i] = nd;
        dLen[i] = dl0 + 1;
        if (c === cols - 1) ok = al0 === 0 ? markSingle(0, i, undo) : closeWord(na, al0 + 1, undo);
        if (ok && r === rows - 1) ok = dl0 === 0 ? markSingle(1, i, undo) : closeWord(nd, dl0 + 1, undo);
      }
      if (ok) {
        g[i] = L;
        // Clue cells whose neighbourhood just changed must stay useful.
        for (const [dy, dx] of NEAR) {
          const y = r + dy;
          const x = c + dx;
          if (y >= 0 && x >= 0 && x < cols && at(y, x) === CLUE_CODE && !clueUseful(y, x)) {
            ok = false;
            break;
          }
        }
        if (ok && rec(i + 1)) return true;
        g[i] = -1;
      }
      for (let u = undo.length - 1; u >= 0; u--) undo[u]();
      if (nodes > nodeLimit) return false;
    }
    return false;
  }

  if (!rec(0)) return null;
  return Array.from(g, (x) => (x === CLUE_CODE ? CLUE : String.fromCharCode(65 + x)));
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
