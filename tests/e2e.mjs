// End-to-end test in a real browser against the local emulators.
// Run with: npm run test:e2e   (screenshots go to tests/shots/)
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { spawn } from 'node:child_process';
import { readFileSync, mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const NS = 'demo-arrowwords';
const PORT = 8123;
const BASE = `http://127.0.0.1:${PORT}/`;
const root = new URL('..', import.meta.url).pathname;
const shots = new URL('shots/', import.meta.url).pathname;
mkdirSync(shots, { recursive: true });

const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], { cwd: root, stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));

async function setRules(adminUid) {
  const text = readFileSync(new URL('../firebase/database.rules.json', import.meta.url), 'utf8');
  const res = await fetch(`http://127.0.0.1:9000/.settings/rules.json?ns=${NS}`, {
    method: 'PUT',
    headers: { Authorization: 'Bearer owner' },
    body: text.replaceAll('__ADMIN_UID__', adminUid),
  });
  assert.equal(res.status, 200);
}
async function readAsOwner(path) {
  const res = await fetch(`http://127.0.0.1:9000/${path}.json?ns=${NS}`, { headers: { Authorization: 'Bearer owner' } });
  return res.json();
}

const browser = await chromium.launch();
const errors = [];
let org;
try {
  // --- organizer -------------------------------------------------------------
  const orgCtx = await browser.newContext({ viewport: { width: 1100, height: 900 } });
  org = await orgCtx.newPage();
  org.on('pageerror', (e) => errors.push(`org: ${e.message}`));
  org.on('console', (m) => m.type() === 'error' && errors.push(`org console: ${m.text()}`));
  await fetch(`http://127.0.0.1:9000/.json?ns=${NS}`, { method: 'DELETE', headers: { Authorization: 'Bearer owner' } });
  // Same state as a new Firebase project in "locked mode": everything refused.
  await fetch(`http://127.0.0.1:9000/.settings/rules.json?ns=${NS}`, {
    method: 'PUT',
    headers: { Authorization: 'Bearer owner' },
    body: JSON.stringify({ rules: { '.read': false, '.write': false } }),
  });
  await org.goto(`${BASE}?orga=1&emu=1`);
  await org.getByText('Dernière étape de configuration').waitFor();
  await org.screenshot({ path: `${shots}01-setup.png` });
  const uid = await org.locator('code').innerText();
  await setRules(uid);
  await org.reload();
  await org.getByText('Vos parties').waitFor();
  await org.getByPlaceholder('Nom de la partie').fill('Les cousins');
  await org.getByRole('button', { name: 'Créer la partie' }).click();
  await org.getByText('Les cousins').waitFor();
  await org.screenshot({ path: `${shots}02-rooms.png` });
  const link = await org.locator('.rooms .small').first().innerText();
  await org.goto(link);
  // Organizer profile
  await org.locator('#profile-name').fill('Orga');
  await org.getByRole('button', { name: "C'est parti" }).click();
  await org.getByText("La grille n'est pas encore prête").waitFor();
  org.on('dialog', (d) => d.accept());
  await org.locator('details.orga summary').click();
  await org.locator('details.orga select').nth(1).selectOption('petite');
  await org.getByRole('button', { name: 'Nouvelle grille' }).click();
  await org.locator('#grid').waitFor({ timeout: 150000 });
  assert.equal(await org.locator('#grid .cell.block').count(), 0, 'no black cells');
  await org.waitForTimeout(500);

  // --- player ------------------------------------------------------------------
  const plCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const pl = await plCtx.newPage();
  pl.on('pageerror', (e) => errors.push(`player: ${e.message}`));
  await pl.goto(link);
  await pl.locator('#profile-name').fill('Zoé');
  await pl.locator('.swatch').nth(4).click();
  await pl.getByRole('button', { name: "C'est parti" }).click();
  await pl.locator('#grid').waitFor();
  await pl.waitForTimeout(300);
  await pl.screenshot({ path: `${shots}03-player-start.png` });
  // Phone: no sideways scrolling, and every definition fully visible in its box.
  const layout = await pl.evaluate(() => {
    const over = [...document.querySelectorAll('#grid .q .t')].filter((t) => {
      const q = t.parentElement;
      return t.offsetHeight > q.clientHeight + 1 || t.scrollWidth > t.clientWidth + 1;
    }).map((t) => t.textContent);
    return { pageWidth: document.documentElement.scrollWidth, screen: innerWidth, over };
  });
  assert.ok(layout.pageWidth <= layout.screen, `page wider than the phone: ${layout.pageWidth} > ${layout.screen}`);
  assert.deepEqual(layout.over, [], 'definitions cut off');
  const small = await browser.newContext({ viewport: { width: 360, height: 740 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const sp = await small.newPage();
  await sp.goto(link);
  await sp.locator('#profile-name').fill('Petit');
  await sp.getByRole('button', { name: "C'est parti" }).click();
  await sp.locator('#grid').waitFor();
  await sp.locator('.q').first().click();
  await sp.waitForTimeout(300);
  await sp.screenshot({ path: `${shots}03b-small-phone.png` });
  await small.close();

  // Player finds word 0 using the on-screen keyboard.
  const roomId = new URL(link).searchParams.get('g');
  const secret = await readAsOwner(`secret/${roomId}`);
  const pub = await readAsOwner(`rooms/${roomId}/grid`);
  const w0 = pub.words[0];
  const answer = secret.w[0];
  await pl.locator(`.q[data-w="0"]`).click();
  const givens = new Set((pub.givens || '').split(';').filter(Boolean).map((s) => s.split(',').slice(0, 2).join(',')));
  // Type a wrong word first (only on the free cells), then the right one.
  for (let k = 0; k < answer.length; k++) {
    const key = `${w0.r + (w0.d === 'v' ? k : 0)},${w0.c + (w0.d === 'h' ? k : 0)}`;
    if (givens.has(key)) continue;
    await pl.locator('.kb .key', { hasText: new RegExp(`^${answer[k]}$`) }).click();
  }
  await pl.getByText(/est à toi/).waitFor({ timeout: 5000 });
  await pl.waitForTimeout(400);
  await pl.screenshot({ path: `${shots}04-player-found.png` });

  // The organizer sees the word colored with Zoé's color.
  const found = await readAsOwner(`found/${roomId}/${pub.id}`);
  assert.equal(found[0].w, answer);
  const firstKey = `${w0.r},${w0.c}`;
  await org.waitForTimeout(600);
  const bg = await org.evaluate((k) => {
    const [r, c] = k.split(',').map(Number);
    const ncols = Number(document.querySelector('#grid').style.gridTemplateColumns.match(/repeat\((\d+)/)[1]);
    return document.querySelectorAll('#grid .cell')[r * ncols + c].style.background;
  }, firstKey);
  assert.match(bg, /rgb\(143, 214, 168\)|#8fd6a8/, `cell color was ${bg}`);
  await org.screenshot({ path: `${shots}05-organizer-sees.png`, fullPage: true });
  // Hovering a found word shows its explanation.
  await org.locator(`#grid .cell[data-key="${firstKey}"]`).hover();
  await org.locator('#tip').waitFor({ state: 'visible', timeout: 3000 });
  assert.match(await org.locator('#tip').innerText(), new RegExp(answer));
  await org.screenshot({ path: `${shots}05b-explanation.png` });
  await org.mouse.move(0, 0);

  // The organizer finds a word crossing Zoé's: only the new letters count.
  const keysOf = (w) => Array.from({ length: w.l }, (_, k) => `${w.r + (w.d === 'v' ? k : 0)},${w.c + (w.d === 'h' ? k : 0)}`);
  const k0 = keysOf(w0);
  const j = pub.words.findIndex((w, i) => i !== 0 && keysOf(w).some((k) => k0.includes(k)));
  const wj = pub.words[j];
  await org.locator(`.q[data-w="${j}"]`).click();
  const kj = keysOf(wj);
  for (let k = 0; k < kj.length; k++) {
    if (k0.includes(kj[k]) || givens.has(kj[k])) continue; // locked boxes are skipped
    await org.keyboard.press(secret.w[j][k]);
  }
  await org.getByText(/est à toi/).waitFor({ timeout: 5000 });
  await org.waitForTimeout(500);
  const score = async (page, name) => Number(await page.locator('.chip', { hasText: name }).locator('b').innerText());
  const zoeLetters = k0.filter((k) => !givens.has(k)).length;
  const orgaLetters = kj.filter((k) => !givens.has(k) && !k0.includes(k)).length;
  assert.equal(await score(org, 'Zoé'), zoeLetters);
  assert.equal(await score(org, 'Orga'), orgaLetters);
  await org.screenshot({ path: `${shots}06-scores.png` });

  // A wrong guess is refused.
  const wrongIdx = pub.words.findIndex((w, i) => i !== 0 && i !== j && !keysOf(w).some((k) => k0.includes(k) || kj.includes(k) || givens.has(k)));
  await org.locator(`.q[data-w="${wrongIdx}"]`).click();
  for (const ch of secret.w[wrongIdx]) await org.keyboard.press(ch === 'Z' ? 'A' : 'Z');
  await org.waitForTimeout(800);
  const found2 = await readAsOwner(`found/${roomId}/${pub.id}`);
  assert.equal(found2[wrongIdx], undefined, 'wrong guess must not be accepted');

  // --- paper mode -----------------------------------------------------------------
  if (!(await org.locator('details.orga').evaluate((d) => d.open))) await org.locator('details.orga summary').click();
  await org.locator('details.orga select').nth(1).selectOption('petite');
  await org.locator('details.orga select').nth(2).selectOption('paper');
  await org.getByRole('button', { name: 'Nouvelle grille' }).click();
  await org.getByText(/comme sur papier/).first().waitFor({ timeout: 150000 });
  await pl.getByText(/comme sur papier/).first().waitFor({ timeout: 10000 });
  const pub2 = await readAsOwner(`rooms/${roomId}/grid`);
  const secret2 = await readAsOwner(`secret/${roomId}`);
  const givens2 = new Set((pub2.givens || '').split(';').filter(Boolean).map((s) => s.split(',').slice(0, 2).join(',')));
  // Zoé types one word on her phone keyboard: nobody is told whether it is right.
  const p0 = pub2.words[0];
  await pl.locator(`.q[data-w="0"]`).click();
    for (let k = 0; k < p0.l; k++) {
    if (givens2.has(keysOf(p0)[k])) continue;
    await pl.locator('.kb .key', { hasText: new RegExp(`^${secret2.w[0][k]}$`) }).click();
  }
  await org.waitForTimeout(800);
  const cells = await readAsOwner(`cells/${roomId}/${pub2.id}`);
  assert.equal(Object.keys(cells).length, keysOf(p0).filter((k) => !givens2.has(k)).length);
  await org.screenshot({ path: `${shots}07-paper-shared.png` });
  // Fill the rest of the grid, with one mistake.
  const all = {};
  pub2.words.forEach((w, i) => keysOf(w).forEach((k, n) => { if (!givens2.has(k)) all[k.replace(',', '_')] = secret2.w[i][n]; }));
  const firstKey2 = Object.keys(all)[0];
  const right = all[firstKey2];
  const body = {};
  for (const [k, l] of Object.entries(all)) body[k] = { l, u: 'someone', t: 1 };
  body[firstKey2] = { l: right === 'Z' ? 'A' : 'Z', u: 'someone', t: 1 };
  await fetch(`http://127.0.0.1:9000/cells/${roomId}/${pub2.id}.json?ns=${NS}`, { method: 'PUT', headers: { Authorization: 'Bearer owner' }, body: JSON.stringify(body) });
  await pl.getByText(/Pleine, mais des erreurs/).waitFor({ timeout: 5000 });
  await pl.screenshot({ path: `${shots}08-paper-errors.png` });
  await fetch(`http://127.0.0.1:9000/cells/${roomId}/${pub2.id}/${firstKey2}.json?ns=${NS}`, { method: 'PUT', headers: { Authorization: 'Bearer owner' }, body: JSON.stringify({ l: right, u: 'someone', t: 1 }) });
  await pl.getByText(/Grille juste/).waitFor({ timeout: 5000 });
  await pl.screenshot({ path: `${shots}09-paper-solved.png` });

  // The organizer deletes the game; its link stops working.
  await org.goto(`${BASE}?orga=1&emu=1`);
  await org.getByText('Vos parties').waitFor();
  assert.equal(await org.locator('.card.warn').count(), 0, 'rules are current: no warning');
  await org.getByRole('button', { name: 'Supprimer' }).click();
  await org.getByText('Aucune partie pour le moment.').waitFor({ timeout: 5000 });
  assert.equal(await readAsOwner(`rooms/${roomId}`), null);
  assert.equal(await readAsOwner(`cells/${roomId}`), null);

  // Unknown room link
  await pl.goto(`${BASE}?g=doesnotexist&emu=1`);
  await pl.getByText('Partie introuvable').waitFor();

  assert.deepEqual(errors, []);
  console.log('E2E OK');
} catch (e) {
  console.error('E2E FAILED', e, errors);
  if (org) {
    console.error('profile error:', await org.locator('#profile-error').innerText().catch(() => '?'));
    console.error('view:', (await org.locator('#view').innerText().catch(() => '?')).slice(0, 400));
    await org.screenshot({ path: `${shots}failure.png` });
  }
  process.exitCode = 1;
} finally {
  await browser.close();
  server.kill();
}
