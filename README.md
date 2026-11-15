# Mots fléchés entre amis

A French arrow-word puzzle ("mots fléchés") that several people fill in together, live.

- Players open a game link, type a name and pick a color. There is no password.
- When someone finds a word, its boxes turn that player's color on every screen.
- The organizer creates as many games as they like, one link per group of friends.
  From any game, the organizer can start a new grid and choose a difficulty
  (Facile, Moyen, Difficile) and a size (15 × 20 or 10 × 12).

Site: **https://mocquin.github.io/arrowwords-party/**
Organizer space: **https://mocquin.github.io/arrowwords-party/?orga=1**

## How it works

| Part | Where | Cost |
|---|---|---|
| Web pages | GitHub Pages (this repository) | free |
| Shared game state | Firebase Realtime Database, free "Spark" plan | free, no card ever asked |
| Sign-in | Firebase Authentication: anonymous for players, Google for the organizer | free |

There is no server to run. The pages talk directly to Firebase.

## Safety

- **Nothing secret is in this repository.** The Firebase settings in `js/config.js` are public by
  design. The data is protected by the rules in `firebase/database.rules.json`, which run on
  Firebase's side.
- **The answers are never sent to players.** They are stored where nobody can read them. When a
  player completes a word, Firebase itself compares it with the hidden answer and accepts or
  refuses it. Reading the page's code does not reveal the grid's answers.
- **Only the organizer's Google account** can create or delete games and start new grids.
- **Nobody can cheat others' scores.** Each found word is written once, by its finder, with the
  server's clock. It cannot be erased or taken over.
- **Names are unique and belong to the browser that took them.** Names are checked against a list
  of allowed characters, and the page always shows them as plain text, so a name can't inject code.
- **Game links are hard to guess** (12 random characters), and nobody but the organizer can list
  the games.
- **No bill is possible.** The free plan has no payment method. If a limit were ever reached, the
  site would pause until the next day. A group of friends uses less than 1% of the limits.
- Pages load scripts only from this site (Firebase is bundled in `vendor/firebase.js`), and a
  Content-Security-Policy blocks everything else.

## Setup (once, about 10 minutes, no code)

1. **Firebase project**: go to <https://console.firebase.google.com>, click *Create a project*,
   name it `arrowwords-party`, turn Google Analytics off, then *Create project*.
2. **Database**: in the left menu, *Build → Realtime Database → Create Database*. Choose a
   location (for example Belgium, `europe-west1`), choose *Start in locked mode*, then *Enable*.
3. **Sign-in**: *Build → Authentication → Get started*. In *Sign-in method*, enable
   **Anonymous**, then enable **Google** (pick your email as support email) and save.
4. **Allow the site's address**: *Authentication → Settings → Authorized domains → Add domain*,
   type `mocquin.github.io`, then *Add*.
5. **Web settings**: click the gear (*Project settings*) → *General* → *Your apps* → the web
   icon `</>`. Nickname: `site`. Leave "Firebase Hosting" unticked. Click *Register app*. Firebase
   shows a block starting with `const firebaseConfig = {`. Copy that block and send it to Claude.
6. **GitHub Pages**: on GitHub, this repository → *Settings → Pages*. Source: *Deploy from a
   branch*, branch `main`, folder `/ (root)`, then *Save*.
7. When Claude confirms the settings are in place, open the organizer space
   (<https://mocquin.github.io/arrowwords-party/?orga=1>) and sign in with Google. The page shows
   the security rules with your organizer id already in them. Click *Copier les règles*, then in
   Firebase: *Realtime Database → Rules*, replace all the text with what you copied, and click
   *Publish*. Reload the organizer page: you can now create games.

## Playing

- Organizer: *Espace organisateur → Créer la partie*, then *Copier le lien* and send it to the
  group. Open the game, then *Outils organisateur → Nouvelle grille*.
- Players: tap a definition or a box, then type. Space bar or `⇄` switches direction. On phones,
  an on-screen keyboard appears. Letters you type stay on your device until the word is complete
  and right; then the word is yours and everyone sees it in your color.

## For developers (Claude)

```
npm install
npm run test:generator   # grid generator and dictionary
npm run test:rules       # security rules, against the local Firebase emulator
npm run test:e2e         # two browsers play a game, screenshots in tests/shots/
npm run build:vendor     # rebuild vendor/firebase.js after a Firebase upgrade
```

Locally, `?emu=1` (only on localhost) makes the page use the emulators instead of the real project.

Licences: the code and the word list are original to this project. `vendor/firebase.js` bundles
the Firebase JavaScript SDK (Apache License 2.0); its licence notices are at the end of that file.
