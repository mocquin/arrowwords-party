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
  await setRules('__nobody__'); // the emulator starts with open rules
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
  await org.locator('details.orga summary').click();
  await org.getByRole('button', { name: 'Nouvelle grille' }).click();
  await org.locator('#grid').waitFor();
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
  await pl.screenshot({ path: `${shots}03-player-start.png` });

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

  // A wrong guess by the organizer on word 1 is refused.
  const ans1 = secret.w[1];
  await org.locator(`.q[data-w="1"]`).click();
  for (let k = 0; k < ans1.length; k++) await org.keyboard.press(ans1[k] === 'Z' ? 'A' : 'Z');
  await org.waitForTimeout(800);
  const found2 = await readAsOwner(`found/${roomId}/${pub.id}`);
  assert.equal(found2[1], undefined, 'wrong guess must not be accepted');

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
