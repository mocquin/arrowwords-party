# arrowwords-party: notes for Claude

The owner does not read or write code. Claude owns this repository. Explain results in plain
words and in terms of what the owner clicks.

## Shape
- Static site served by GitHub Pages from `main`, root folder. No build step for the site.
- `js/generator.js`: pure grid generator (also used by Node tests). Difficulty levels and grid
  sizes live in `LEVELS` and `SIZES`, the only place to change them.
- `js/db.js`: the only module that touches Firebase. The data layout is documented at its top.
- `js/app.js`: the UI. Database text goes through `textContent`, never `innerHTML`.
- `data/dict-fr.txt`: word list `MOT|niveau|définition facile|définition difficile`. Words
  without accents. Tier 1 = common, 3 = rare. A clue must not contain its answer.
- `firebase/database.rules.json`: the security rules. `__ADMIN_UID__` is replaced by the
  organizer's uid when the organizer copies the rules from the organizer page.
- `vendor/firebase.js`: bundled Firebase SDK (`npm run build:vendor`).

## Checks before each push
`npm run test:generator`, `npm run test:rules`, `npm run test:e2e`, then look at
`tests/shots/*.png`. Add an entry to `CHANGELOG.md`.

## Known limits (v1)
- About 13% of cells end up as dark blocks: the generator needs more short words. Growing
  `data/dict-fr.txt` is the main lever.
- A player who clears their browser loses their name; the organizer can free names (not in the
  UI yet).
- A player can try many guesses for a word; there is no rate limit (no server).
