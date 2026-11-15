// Security rules tests. Run with: npm run test:rules
// (starts the local Firebase emulators, then runs this file).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, connectAuthEmulator } from 'firebase/auth';
import {
  getDatabase,
  ref,
  get,
  set,
  update,
  serverTimestamp,
  connectDatabaseEmulator,
} from 'firebase/database';

const NS = 'demo-arrowwords';
let n = 0;

async function client() {
  const app = initializeApp(
    { apiKey: 'demo', projectId: NS, databaseURL: `http://127.0.0.1:9000/?ns=${NS}` },
    `c${n++}`,
  );
  const auth = getAuth(app);
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  const db = getDatabase(app);
  connectDatabaseEmulator(db, '127.0.0.1', 9000);
  const { user } = await signInAnonymously(auth);
  return { db, uid: user.uid };
}

async function setRules(adminUid) {
  const text = readFileSync(new URL('../firebase/database.rules.json', import.meta.url), 'utf8');
  const res = await fetch(`http://127.0.0.1:9000/.settings/rules.json?ns=${NS}`, {
    method: 'PUT',
    headers: { Authorization: 'Bearer owner' },
    body: text.replaceAll('__ADMIN_UID__', adminUid),
  });
  assert.equal(res.status, 200, await res.text());
}

const ok = (p) => assert.doesNotReject(p);
const denied = (p) => assert.rejects(p, /permission|PERMISSION/i);

async function profile(c, name, color = '#8fc2f2') {
  await update(ref(c.db), { [`players/${c.uid}`]: { n: name, c: color }, [`names/${name.toLowerCase()}`]: c.uid });
}

test('security rules', async (t) => {
  const admin = await client();
  const alice = await client();
  const bob = await client();
  await setRules(admin.uid);

  const room = 'room1abc';
  await t.test('only the organizer creates rooms and lists them', async () => {
    await denied(set(ref(alice.db, `rooms/${room}/title`), 'Pirate'));
    await denied(get(ref(alice.db, 'roomIndex')));
    await ok(update(ref(admin.db), { [`rooms/${room}/title`]: 'Amis', [`roomIndex/${room}`]: { title: 'Amis', createdAt: 1 } }));
    await ok(get(ref(admin.db, 'roomIndex')));
  });

  await t.test('players can read a room by its id but not list rooms', async () => {
    await ok(get(ref(alice.db, `rooms/${room}`)));
    await denied(get(ref(alice.db, 'rooms')));
  });

  await t.test('profiles and unique names', async () => {
    await ok(profile(alice, 'Alice', '#f4a3a3'));
    await denied(profile(bob, 'alice')); // taken (case-insensitive)
    await denied(update(ref(bob.db), { [`players/${bob.uid}`]: { n: 'Bob', c: '#8fc2f2' } })); // no name reservation
    await denied(profile(bob, '<script>'));
    await denied(profile(bob, 'Bob', 'red'));
    await denied(profile(bob, ' Bob'));
    await denied(profile(bob, 'Un nom beaucoup trop long pour la grille'));
    await ok(profile(bob, 'Bob', '#8fc2f2'));
    await denied(set(ref(bob.db, `players/${alice.uid}/c`), '#000000')); // someone else's profile
    await denied(set(ref(bob.db, `names/zorro`), bob.uid)); // name squatting
    await denied(get(ref(bob.db, 'players'))); // no listing
    await ok(get(ref(bob.db, `players/${alice.uid}`)));
  });

  await t.test('only the organizer publishes grids; answers stay secret', async () => {
    await denied(set(ref(alice.db, `rooms/${room}/grid`), { id: 'g1' }));
    await ok(
      update(ref(admin.db), {
        [`rooms/${room}/grid`]: { id: 'g1', rows: 2, cols: 2 },
        [`secret/${room}`]: { g: 'g1', w: { 0: 'CHAT', 1: 'EAU' } },
      }),
    );
    await denied(get(ref(alice.db, `secret/${room}`)));
    await denied(get(ref(admin.db, `secret/${room}`)));
  });

  await t.test('claiming words', async () => {
    const claim = (c, idx, w, grid = 'g1') =>
      set(ref(c.db, `found/${room}/${grid}/${idx}`), { u: c.uid, w, t: serverTimestamp() });
    await denied(claim(alice, 0, 'CHAT')); // not a member yet
    await ok(set(ref(alice.db, `rooms/${room}/members/${alice.uid}`), true));
    await ok(set(ref(bob.db, `rooms/${room}/members/${bob.uid}`), true));
    await denied(set(ref(bob.db, `rooms/${room}/members/${alice.uid}`), true));
    await denied(claim(alice, 0, 'CHIEN')); // wrong answer
    await denied(claim(alice, 0, 'CHAT', 'g0')); // old grid
    await denied(set(ref(alice.db, `found/${room}/g1/0`), { u: bob.uid, w: 'CHAT', t: serverTimestamp() })); // for someone else
    await denied(set(ref(alice.db, `found/${room}/g1/0`), { u: alice.uid, w: 'CHAT', t: 5 })); // fake time
    await ok(claim(alice, 0, 'CHAT'));
    await denied(claim(bob, 0, 'CHAT')); // already found
    await denied(set(ref(bob.db, `found/${room}/g1/0`), null)); // cannot erase
    await ok(claim(bob, 1, 'EAU'));
    const found = (await get(ref(bob.db, `found/${room}/g1`))).val();
    assert.equal(found[0].u, alice.uid);
    assert.equal(found[1].u, bob.uid);
  });

  await t.test('renaming frees the old name', async () => {
    await ok(update(ref(bob.db), {
      [`players/${bob.uid}`]: { n: 'Robert', c: '#8fc2f2' },
      [`names/robert`]: bob.uid,
      [`names/bob`]: null,
    }));
    await denied(set(ref(alice.db, 'names/robert'), null));
  });

  await t.test('paper mode: shared letters, no answer check', async () => {
    const cell = (c, key, l, grid = 'p1', u = c.uid) =>
      set(ref(c.db, `cells/${room}/${grid}/${key}`), { l, u, t: serverTimestamp() });
    await denied(cell(alice, '1_1', 'A', 'g1')); // grid g1 is not in paper mode
    await ok(update(ref(admin.db), { [`rooms/${room}/grid`]: { id: 'p1', mode: 'paper', rows: 2, cols: 2 } }));
    await ok(cell(alice, '1_1', 'A'));
    await ok(cell(bob, '1_1', 'B')); // like on paper, anyone may correct a box
    await denied(cell(alice, '1_2', 'ab'));
    await denied(cell(alice, '1_2', '1'));
    await denied(cell(alice, '1_2', 'A', 'p1', bob.uid)); // in someone else's name
    await denied(cell(alice, '1_2', 'A', 'p0')); // old grid
    await denied(cell(alice, 'x', 'A'));
    const carol = await client();
    await denied(cell(carol, '1_2', 'A')); // not a member of this game
    await ok(set(ref(alice.db, `cells/${room}/p1/1_1`), null)); // erase
  });

  await t.test('organizer deletes a room', async () => {
    await ok(update(ref(admin.db), { [`rooms/${room}`]: null, [`roomIndex/${room}`]: null, [`secret/${room}`]: null, [`found/${room}`]: null, [`cells/${room}`]: null }));
  });
  process.exit(0);
});
