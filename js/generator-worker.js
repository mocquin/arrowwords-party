// Runs the grid generator off the main thread, so the page stays responsive.
// The page starts several of these with different seeds; the first grid wins.
import { parseDictionary, generateGrid } from './generator.js';

let entries = null;

self.onmessage = async (e) => {
  const { dictUrl, level, rows, cols, seed, timeLimitMs } = e.data;
  try {
    entries ??= parseDictionary(await (await fetch(dictUrl)).text());
    const grid = generateGrid({ entries, level, rows, cols, seed, timeLimitMs });
    self.postMessage({ ok: true, grid });
  } catch (err) {
    self.postMessage({ ok: false, error: String(err?.message || err) });
  }
};
