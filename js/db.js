// All access to Firebase goes through this module.
//
// Data layout (see also firebase/database.rules.json):
//   roomIndex/{room}            {title, createdAt}           organizer only
//   rooms/{room}                {title, createdAt, grid, members/{uid}: true}
//   rooms/{room}/grid           public grid: clues, positions, given letters
//   secret/{room}               {g: gridId, w: {idx: ANSWER}} nobody can read it;
//                               the rules compare claims against it
//   found/{room}/{grid}/{idx}   {u: uid, w: ANSWER, t: time} written once
//   cells/{room}/{grid}/{r_c}   paper mode: {l: letter, u: uid, t: time}, shared by
//                               all players, checked only when the grid is full
//   players/{uid}               {n: name, c: color}
//   names/{lowercase name}      uid (one name per player, no duplicates)

import {
  initializeApp,
  getAuth,
  signInAnonymously,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  connectAuthEmulator,
  getDatabase,
  ref,
  get,
  set,
  update,
  onValue,
  serverTimestamp,
  connectDatabaseEmulator,
} from '../vendor/firebase.js';
import { firebaseConfig } from './config.js';

let auth = null;
let db = null;
let emulator = false;

/** True when the page runs against the local emulators (tests only). */
export function isEmulator() {
  return emulator;
}

/**
 * Connect to Firebase. Returns false when the site is not configured yet.
 * Emulator mode: only on localhost, with ?emu=1 in the address.
 */
export function initFirebase() {
  const local = ['localhost', '127.0.0.1'].includes(location.hostname);
  emulator = local && new URLSearchParams(location.search).get('emu') === '1';
  const config = emulator
    ? {
        apiKey: 'demo-key',
        projectId: 'demo-arrowwords',
        authDomain: 'demo-arrowwords.firebaseapp.com',
        databaseURL: 'http://127.0.0.1:9000/?ns=demo-arrowwords',
      }
    : firebaseConfig;
  if (!config) return false;
  const app = initializeApp(config);
  auth = getAuth(app);
  db = getDatabase(app);
  if (emulator) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    connectDatabaseEmulator(db, '127.0.0.1', 9000);
  }
  return true;
}

// --- identity ---------------------------------------------------------------

/** Resolves with the current user, signing in anonymously if needed. */
export function ensureUser() {
  return new Promise((resolve, reject) => {
    const stop = onAuthStateChanged(auth, (user) => {
      stop();
      if (user) resolve(user);
      else signInAnonymously(auth).then((c) => resolve(c.user), reject);
    });
  });
}

/** Resolves with the signed-in user, or null. Never signs in. */
export function currentAuth() {
  return new Promise((resolve) => {
    const stop = onAuthStateChanged(auth, (user) => {
      stop();
      resolve(user);
    });
  });
}

/** Organizer sign-in with a Google account (anonymous in emulator mode). */
export async function organizerSignIn() {
  if (emulator) return ensureUser();
  const cred = await signInWithPopup(auth, new GoogleAuthProvider());
  return cred.user;
}

export async function organizerSignOut() {
  await signOut(auth);
}

export function currentUser() {
  return auth.currentUser;
}

/** True when the rules let this user act as organizer. */
export async function checkOrganizer() {
  try {
    await get(ref(db, 'roomIndex'));
    return true;
  } catch {
    return false;
  }
}

// --- players -----------------------------------------------------------------

export function nameKey(name) {
  return name.toLowerCase();
}

/**
 * Clean a typed name: allowed characters only (same list as the rules),
 * single spaces, trimmed, at most 20 characters.
 */
export function cleanName(name) {
  return name
    .replace(/Œ/g, 'OE')
    .replace(/œ/g, 'oe')
    .replace(/[^0-9A-Za-zÀ-ÖØ-öø-ÿ _'!?-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 20)
    .trim();
}

export async function getPlayer(uid) {
  const snap = await get(ref(db, `players/${uid}`));
  return snap.val();
}

export function watchPlayer(uid, cb) {
  return onValue(ref(db, `players/${uid}`), (s) => cb(s.val()));
}

/**
 * Save the profile. Throws Error('taken') when another player has the name.
 */
export async function saveProfile(uid, name, color, oldName) {
  const key = nameKey(name);
  const owner = (await get(ref(db, `names/${key}`))).val();
  if (owner && owner !== uid) throw new Error('taken');
  const changes = {
    [`players/${uid}`]: { n: name, c: color },
    [`names/${key}`]: uid,
  };
  if (oldName && nameKey(oldName) !== key) changes[`names/${nameKey(oldName)}`] = null;
  await update(ref(db), changes);
}

// --- rooms -------------------------------------------------------------------

function randomId(len) {
  const abc = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  return [...bytes].map((b) => abc[b % abc.length]).join('');
}

export async function createRoom(title) {
  const id = randomId(12);
  const now = Date.now();
  await update(ref(db), {
    [`rooms/${id}/title`]: title,
    [`rooms/${id}/createdAt`]: now,
    [`roomIndex/${id}`]: { title, createdAt: now },
  });
  return id;
}

export async function deleteRoom(id) {
  await update(ref(db), {
    [`rooms/${id}`]: null,
    [`roomIndex/${id}`]: null,
    [`secret/${id}`]: null,
    [`found/${id}`]: null,
  });
  // Paper-mode letters: separate, so a game can be deleted even if the rules
  // in Firebase are older than paper mode.
  await set(ref(db, `cells/${id}`), null).catch(() => {});
}

/**
 * True when the rules pasted in Firebase are the current ones. Probes the most
 * recent part of the rules (paper mode); older rules refuse to read it.
 */
export async function rulesUpToDate() {
  try {
    await get(ref(db, 'cells/__probe'));
    return true;
  } catch {
    return false;
  }
}

export async function listRooms() {
  const snap = await get(ref(db, 'roomIndex'));
  const v = snap.val() || {};
  return Object.entries(v)
    .map(([id, x]) => ({ id, ...x }))
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function watchRoom(id, cb) {
  return onValue(
    ref(db, `rooms/${id}`),
    (s) => cb(s.val()),
    () => cb(null),
  );
}

export async function joinRoom(id, uid) {
  await set(ref(db, `rooms/${id}/members/${uid}`), true);
}

/**
 * Publish a new grid in a room. The answers go to `secret/`, which no player
 * can read; the previous grid's found words are cleared.
 */
export async function publishGrid(roomId, grid) {
  const gridId = randomId(8);
  const pub = {
    id: gridId,
    rows: grid.rows,
    cols: grid.cols,
    level: grid.level,
    createdAt: serverTimestamp(),
    words: grid.words.map((x) => ({ r: x.r, c: x.c, d: x.d, l: x.w.length, cr: x.cr, cc: x.cc, q: x.q })),
    givens: grid.givens.map(([r, c]) => `${r},${c},${grid.letters.get(`${r},${c}`)}`).join(';'),
    mode: grid.mode || 'instant',
  };
  if (pub.mode === 'paper') {
    pub.salt = grid.salt;
    pub.hash = grid.hash;
  }
  const answers = {};
  grid.words.forEach((x, i) => {
    answers[i] = x.w;
  });
  await update(ref(db), {
    [`rooms/${roomId}/grid`]: pub,
    [`secret/${roomId}`]: { g: gridId, w: answers },
    [`found/${roomId}`]: null,
    [`cells/${roomId}`]: null,
  });
  return gridId;
}

export function watchFound(roomId, gridId, cb) {
  return onValue(ref(db, `found/${roomId}/${gridId}`), (s) => cb(s.val() || {}));
}

/** Claim a word. Resolves true if the answer is right and nobody had it. */
export async function claimWord(roomId, gridId, idx, word, uid) {
  try {
    await set(ref(db, `found/${roomId}/${gridId}/${idx}`), { u: uid, w: word, t: serverTimestamp() });
    return true;
  } catch {
    return false;
  }
}

// --- paper mode ----------------------------------------------------------------

export function watchCells(roomId, gridId, cb) {
  return onValue(ref(db, `cells/${roomId}/${gridId}`), (s) => cb(s.val() || {}));
}

/** Write one shared letter (or erase it with null). Key is "r_c". */
export async function writeCell(roomId, gridId, key, letter, uid) {
  await set(ref(db, `cells/${roomId}/${gridId}/${key}`), letter ? { l: letter, u: uid, t: serverTimestamp() } : null);
}
