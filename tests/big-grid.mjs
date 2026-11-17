// Times the creation of each large grid size in a real browser (parallel workers).
// Run with: npx firebase emulators:exec --only database,auth --project demo-arrowwords "node tests/big-grid.mjs"
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
const { chromium } = createRequire(import.meta.url)('playwright');
const NS = 'demo-arrowwords';
const PORT = 8124;
const root = new URL('..', import.meta.url).pathname;
const shots = new URL('shots/', import.meta.url).pathname;
const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], { cwd: root, stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
const browser = await chromium.launch();
try {
  const page = await (await browser.newContext({ viewport: { width: 1200, height: 1400 } })).newPage();
  page.on('dialog', (d) => d.accept());
  await page.goto(`http://127.0.0.1:${PORT}/?orga=1&emu=1`); // open rules in the emulator: organizer
  await page.getByText('Vos parties').waitFor();
  await page.getByPlaceholder('Nom de la partie').fill('Grande');
  await page.getByRole('button', { name: 'Créer la partie' }).click();
  await page.waitForTimeout(800);
  await page.goto(await page.locator('.rooms .small').first().innerText());
  await page.locator('#profile-name').fill('Orga');
  await page.getByRole('button', { name: "C'est parti" }).click();
  await page.locator('details.orga summary').click();
  for (const size of (process.argv[2] || 'moyenne,grande,geante').split(',')) {
    if (!(await page.locator('details.orga').evaluate((d) => d.open))) await page.locator('details.orga summary').click();
    await page.locator('details.orga select').nth(1).selectOption(size);
    const t0 = Date.now();
    await page.getByRole('button', { name: 'Nouvelle grille' }).click();
    // The button is disabled while the grid is being made.
    await page.waitForFunction(() => [...document.querySelectorAll('button')].some((b) => b.textContent === 'Nouvelle grille' && !b.disabled), null, { timeout: 200000 });
    const res = (await page.locator('#toast').textContent()).includes('Nouvelle grille') ? 'ok' : 'timeout';
    console.log(size, res, `${((Date.now() - t0) / 1000).toFixed(1)} s`, res === 'ok' ? '' : await page.locator('#toast').innerText());
    await page.waitForTimeout(500);
    if (res === 'ok') await page.screenshot({ path: `${shots}big-${size}.png` });
  }
} finally {
  await browser.close();
  server.kill();
}
process.exit(0);
