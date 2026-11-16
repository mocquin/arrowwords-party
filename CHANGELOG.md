# Change log

## 2026-11-16 — Better on phones
- The grid always fits the screen width: no more sideways scrolling.
- Definitions are never cut with "…": each one takes the largest text size that fits its box,
  with a narrow font, and words are split only when they can't fit whole.
- The definition bar has ‹ › buttons to go to the previous / next definition.
- Phone layout: smaller header, bigger keyboard keys, no accidental zoom when tapping fast.

## 2026-11-16 — Deleting a game
- "Supprimer" now works even if the security rules in Firebase are an older copy, and says so
  if Firebase refuses.
- The organizer page shows a yellow warning when the rules in Firebase need to be pasted again.

## 2026-11-15 — Full grids, paper mode, fair scores
- Grids have no black boxes any more: every box is a letter or a definition, like printed grids.
  The top row and the left column alternate definition / letter.
- Sizes: Petite (10 × 10), Normale (10 × 14), Grande (12 × 16, can take up to a minute to create).
  15 × 20 is not possible yet: it needs a larger word list.
- Word list grown from about 1,750 to about 8,100 words, each with its own definitions.
- New choice in Outils organisateur → Validation:
  - Mot par mot (as before): each right word is confirmed.
  - À la fin, comme sur papier: everyone's letters show for all, in each writer's color, with no
    confirmation; when the grid is full, the page says whether it is right or has errors.
- Scores count letters, not words: a word found later only earns the boxes that were still empty.
- Tapping one of the two definitions in a box now selects that definition (it always took the first).

## 2026-11-15 — First sign-in fix
- The organizer page shows the rules to paste before reading anything (it got "permission denied" on a new Firebase project).

## 2026-11-15 — Organizer page fix
- The organizer page goes straight to Google sign-in, without the anonymous sign-in.
- Error pages now show the exact error code.

## 2026-11-15 — Site connected to Firebase
- The site now uses the live Firebase project.

## 2026-11-15 — First version
- Shared French arrow-word grid, live for every player, with each found word in its finder's color.
- No password: a name and a color per player, unique names.
- Organizer space (Google sign-in): several games, one link per group of friends.
- New grid from any game, with difficulty (Facile, Moyen, Difficile) and size (15 × 20, 10 × 12).
- Answers checked by Firebase against hidden answers; scores cannot be faked.
- On-screen keyboard on phones; letters typed stay on the device until the word is right.
