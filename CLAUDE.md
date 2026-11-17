# arrowwords-party: notes for Claude

The owner does not read or write code. Claude owns this repository. Explain results in plain
words and in terms of what the owner clicks.

## Shape
- Static site served by GitHub Pages from `main`, root folder. No build step for the site.
- `js/generator.js`: pure grid generator (also used by Node tests). Difficulty levels and grid
  sizes live in `LEVELS` and `SIZES`, the only place to change them.
- `js/db.js`: the only module that touches Firebase. The data layout is documented at its top.
- `js/app.js`: the UI. Database text goes through `textContent`, never `innerHTML`.
- `js/generator-worker.js`: runs the generator in Web Workers (several seeds in parallel).
- `data/dict-fr.txt`: word list `MOT|niveau|définition facile|définition difficile`. Words
  without accents. Tier 1 = common, 3 = rare. A clue must not contain its answer.
- `firebase/database.rules.json`: the security rules. `__ADMIN_UID__` is replaced by the
  organizer's uid when the organizer copies the rules from the organizer page.
- `vendor/firebase.js`: bundled Firebase SDK (`npm run build:vendor`).

## Checks before each push
`npm run test:generator`, `npm run test:rules`, `npm run test:e2e`, then look at
`tests/shots/*.png`. Add an entry to `CHANGELOG.md`.

## Known limits (v1)
- The generator fills every cell (no black cells), using a typed-array trie. 15 × 20 takes
  10 s–2 min in a browser with parallel workers; wider grids need more words or a smarter search.
  `tests/big-grid.mjs` times the large sizes in a real browser.
- Paper mode trusts players for letters (anyone in the game can overwrite a box); only a SHA-256
  fingerprint of the full grid is public, so single answers stay hidden.
- A player who clears their browser loses their name; the organizer can free names (not in the
  UI yet).
- A player can try many guesses for a word; there is no rate limit (no server).
