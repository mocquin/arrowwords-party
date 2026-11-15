// User interface. Three pages, chosen from the address:
//   ?g=<room id>   a game (the link the organizer shares)
//   ?orga=1        the organizer's space (create games, setup help)
//   (nothing)      a welcome page
//
// Rule of this file: text from the database is always inserted with
// textContent (never innerHTML), so a name or a clue cannot inject code.

import * as DB from './db.js';
import { LEVELS, SIZES, parseDictionary, generateGrid, lettersOf, arrowKind } from './generator.js';

const COLORS = [
  '#f4a3a3', '#f7c08a', '#f5e17a', '#b9e08a', '#8fd6a8', '#8ad3d6',
  '#8fc2f2', '#a9a8f0', '#cfa6ef', '#f2a6d8', '#d9b99b', '#c9c9c9',
];

const $ = (sel) => document.querySelector(sel);

/** Small DOM builder: el('div', {class: 'x', onclick: f}, 'text', child) */
function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null || v === false) continue;
    if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else node.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat()) {
    if (c === null || c === undefined || c === false) continue;
    node.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return node;
}

let toastTimer = null;
function toast(msg, kind = '') {
  const t = $('#toast');
  t.textContent = msg;
  t.className = `toast show ${kind}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.className = 'toast'), 2600);
}

function view(...children) {
  const v = $('#view');
  v.replaceChildren(...children);
  return v;
}

// --- state --------------------------------------------------------------------

const S = {
  user: null,
  profile: null,
  organizer: false,
  playerCache: new Map(), // uid -> {n, c}
  playerWatch: new Map(),
};

function params() {
  return new URLSearchParams(location.search);
}

function linkFor(roomId) {
  const u = new URL(location.href);
  u.search = `?g=${roomId}`;
  if (DB.isEmulator()) u.search += '&emu=1';
  u.hash = '';
  return u.toString();
}

// --- start ----------------------------------------------------------------------

async function main() {
  if (!DB.initFirebase()) {
    view(
      el('h1', {}, 'Site en cours de préparation'),
      el('p', {}, "Le site n'est pas encore relié à sa base de données. Revenez bientôt !"),
    );
    return;
  }
  if (DB.isEmulator()) $('#orga-link').href = '?orga=1&emu=1';
  const p = params();
  try {
    if (p.get('orga')) await organizerPage();
    else if (p.get('g')) await roomPage(p.get('g'));
    else await homePage();
  } catch (e) {
    console.error(e);
    view(
      el('h1', {}, 'Oups'),
      el('p', {}, 'Un problème est survenu. Rechargez la page.'),
      el('p', { class: 'muted small' }, 'Détail : ', el('code', { text: String(e?.code || e?.message || e) })),
    );
  }
}

async function signInPlayer() {
  S.user = await DB.ensureUser();
  S.profile = await DB.getPlayer(S.user.uid);
  if (S.profile) S.playerCache.set(S.user.uid, S.profile);
  S.organizer = await DB.checkOrganizer();
  renderMe();
}

function renderMe(onChange) {
  const me = $('#me');
  if (!S.profile) {
    me.replaceChildren();
    return;
  }
  me.replaceChildren(
    el('span', { class: 'dot', style: `background:${S.profile.c}` }),
    el('span', { class: 'name', text: S.profile.n }),
    el('button', { class: 'link', onclick: () => editProfile().then(onChange) }, 'modifier'),
  );
}

async function homePage() {
  await signInPlayer();
  view(
    el('section', { class: 'card narrow' },
      el('h1', {}, 'Bienvenue !'),
      el('p', {}, 'Ici, on remplit des mots fléchés à plusieurs, en direct.'),
      el('p', {}, "Pour jouer, ouvrez le lien de partie que l'organisateur vous a envoyé."),
    ),
  );
}

// --- profile --------------------------------------------------------------------

/**
 * Ask for name and color. `taken` = colors already used by others in the room.
 * Resolves when saved (or immediately if cancelled and a profile exists).
 */
function editProfile(taken = new Set()) {
  const dlg = $('#profile-dialog');
  const form = $('#profile-form');
  const input = $('#profile-name');
  const err = $('#profile-error');
  const box = $('#profile-colors');
  let color = S.profile?.c || COLORS.find((c) => !taken.has(c)) || COLORS[0];
  input.value = S.profile?.n || '';
  err.hidden = true;
  const drawSwatches = () =>
    box.replaceChildren(
      ...COLORS.map((c) =>
        el('button', {
          type: 'button',
          class: `swatch${c === color ? ' on' : ''}${taken.has(c) ? ' taken' : ''}`,
          style: `background:${c}`,
          title: taken.has(c) ? 'Déjà prise par un autre joueur' : '',
          'aria-label': `Couleur ${c}`,
          'aria-pressed': c === color ? 'true' : 'false',
          onclick: () => {
            color = c;
            drawSwatches();
          },
        }),
      ),
    );
  drawSwatches();
  $('#profile-cancel').hidden = !S.profile;
  return new Promise((resolve) => {
    const onSubmit = async (ev) => {
      ev.preventDefault();
      const name = DB.cleanName(input.value);
      if (!name) {
        err.textContent = 'Choisis un nom (lettres, chiffres, espaces).';
        err.hidden = false;
        return;
      }
      try {
        await DB.saveProfile(S.user.uid, name, color, S.profile?.n);
        S.profile = { n: name, c: color };
        S.playerCache.set(S.user.uid, S.profile);
        done();
      } catch (e) {
        err.textContent = e.message === 'taken'
          ? 'Ce nom est déjà pris. Ajoute une initiale, par exemple.'
          : "Impossible d'enregistrer. Réessaie.";
        err.hidden = false;
      }
    };
    const onCancel = () => done();
    const done = () => {
      form.removeEventListener('submit', onSubmit);
      $('#profile-cancel').removeEventListener('click', onCancel);
      dlg.close();
      renderMe();
      resolve();
    };
    form.addEventListener('submit', onSubmit);
    $('#profile-cancel').addEventListener('click', onCancel);
    dlg.showModal();
    input.focus();
  });
}

/** Player name and color, loaded once and kept up to date. */
function player(uid, onChange) {
  if (!S.playerWatch.has(uid)) {
    S.playerWatch.set(
      uid,
      DB.watchPlayer(uid, (p) => {
        if (p) S.playerCache.set(uid, p);
        onChange();
      }),
    );
  }
  return S.playerCache.get(uid);
}

// --- organizer ------------------------------------------------------------------

async function organizerPage() {
  // The organizer signs in with Google: no anonymous sign-in on this page.
  S.user = DB.isEmulator() ? await DB.ensureUser() : await DB.currentAuth();
  if (!DB.isEmulator() && (!S.user || S.user.isAnonymous)) {
    view(
      el('section', { class: 'card narrow' },
        el('h1', {}, 'Espace organisateur'),
        el('p', {}, "Connectez-vous avec votre compte Google d'organisateur."),
        el('button', {
          class: 'primary',
          onclick: async () => {
            try {
              await DB.organizerSignIn();
              location.reload();
            } catch (e) {
              console.error(e);
              toast(`Connexion refusée (${e.code || e.message}).`, 'bad');
            }
          },
        }, 'Se connecter avec Google'),
      ),
    );
    return;
  }
  S.organizer = await DB.checkOrganizer();
  if (!S.organizer) {
    // Rules not pasted yet: the database refuses every read, so show the setup first.
    view(await setupPanel());
    return;
  }
  S.profile = await DB.getPlayer(S.user.uid);
  renderMe(() => organizerPage());

  const list = el('ul', { class: 'rooms' });
  const title = el('input', { placeholder: 'Nom de la partie (ex. Famille)', maxlength: 40 });
  const refresh = async () => {
    const rooms = await DB.listRooms();
    list.replaceChildren(
      ...(rooms.length
        ? rooms.map((r) =>
            el('li', {},
              el('div', { class: 'grow' },
                el('strong', { text: r.title }),
                el('div', { class: 'muted small', text: linkFor(r.id) }),
              ),
              el('button', { onclick: () => copy(linkFor(r.id)) }, 'Copier le lien'),
              el('a', { class: 'button', href: linkFor(r.id) }, 'Ouvrir'),
              el('button', {
                class: 'danger',
                onclick: async () => {
                  if (!confirm(`Supprimer la partie « ${r.title} » ? Les joueurs perdront leur grille.`)) return;
                  await DB.deleteRoom(r.id);
                  refresh();
                },
              }, 'Supprimer'),
            ),
          )
        : [el('li', { class: 'muted' }, 'Aucune partie pour le moment.')]),
    );
  };
  view(
    el('section', { class: 'card' },
      el('h1', {}, 'Vos parties'),
      el('p', { class: 'muted' }, "Chaque partie a son propre lien et sa propre grille. Donnez un lien différent à chaque groupe d'amis."),
      el('form', {
        class: 'row',
        onsubmit: async (ev) => {
          ev.preventDefault();
          const t = title.value.trim().slice(0, 40);
          if (!t) return;
          const id = await DB.createRoom(t);
          title.value = '';
          await refresh();
          toast('Partie créée. Ouvrez-la pour lancer une grille.');
          return id;
        },
      }, title, el('button', { class: 'primary', type: 'submit' }, 'Créer la partie')),
      list,
    ),
    el('details', { class: 'card' },
      el('summary', {}, 'Réglages de sécurité (règles Firebase)'),
      await setupPanel(true),
    ),
    el('p', {},
      el('button', { class: 'link', onclick: async () => { await DB.organizerSignOut(); location.href = './'; } }, 'Se déconnecter'),
    ),
  );
  refresh();
}

/** Shows the organizer id and the ready-to-paste security rules. */
async function setupPanel(compact = false) {
  const res = await fetch('firebase/database.rules.json');
  const rules = (await res.text()).replaceAll('__ADMIN_UID__', S.user.uid);
  const area = el('textarea', { class: 'code', readonly: true, rows: 10 });
  area.value = rules;
  return el('section', { class: compact ? '' : 'card' },
    compact ? null : el('h1', {}, 'Dernière étape de configuration'),
    compact ? null : el('p', {}, "Ce compte n'est pas encore reconnu comme organisateur. Collez ces règles dans Firebase :"),
    el('ol', {},
      el('li', {}, 'Cliquez sur « Copier les règles » ci-dessous.'),
      el('li', {}, 'Console Firebase → Realtime Database → onglet « Règles ».'),
      el('li', {}, 'Remplacez tout le texte par celui copié, puis « Publier ».'),
      el('li', {}, 'Revenez ici et rechargez la page.'),
    ),
    el('p', { class: 'muted small' }, 'Votre identifiant organisateur : ', el('code', { text: S.user.uid })),
    area,
    el('p', {}, el('button', { class: 'primary', onclick: () => copy(rules) }, 'Copier les règles')),
  );
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast('Copié !');
  } catch {
    prompt('Copiez ce texte :', text);
  }
}

// --- game room --------------------------------------------------------------------

let dictPromise = null;
function loadDictionary() {
  dictPromise ??= fetch('data/dict-fr.txt').then((r) => r.text()).then(parseDictionary);
  return dictPromise;
}

async function roomPage(roomId) {
  await signInPlayer();
  const game = new Game(roomId);
  renderMe(() => game.render());
  await game.start();
}

class Game {
  constructor(roomId) {
    this.roomId = roomId;
    this.room = undefined;
    this.model = null;
    this.found = {};
    this.unwatchFound = null;
    this.sel = null; // {w: word index, k: cell key}
    this.drafts = {};
    this.tried = new Map(); // word idx -> Set of wrong strings
    this.cellEls = new Map();
    this.joined = false;
  }

  async start() {
    DB.watchRoom(this.roomId, (room) => this.onRoom(room));
    document.addEventListener('keydown', (e) => this.onKey(e));
    window.addEventListener('resize', () => this.sizeGrid());
  }

  async onRoom(room) {
    if (!room || !room.title) {
      view(
        el('section', { class: 'card narrow' },
          el('h1', {}, 'Partie introuvable'),
          el('p', {}, "Ce lien ne correspond à aucune partie. Vérifiez-le auprès de l'organisateur."),
        ),
      );
      return;
    }
    const first = this.room === undefined;
    this.room = room;
    if (first) await this.ensureJoined();
    const gridId = room.grid?.id;
    if (first || gridId !== this.model?.id) {
      this.unwatchFound?.();
      this.model = room.grid ? buildModel(room.grid) : null;
      this.found = {};
      this.sel = null;
      this.tried.clear();
      this.drafts = this.loadDrafts();
      if (this.model) this.unwatchFound = DB.watchFound(this.roomId, gridId, (f) => this.onFound(f));
      this.render();
    } else {
      this.renderScores();
    }
  }

  async ensureJoined() {
    if (!S.profile) await editProfile(this.takenColors());
    if (!this.joined) {
      await DB.joinRoom(this.roomId, S.user.uid);
      this.joined = true;
    }
  }

  takenColors() {
    const taken = new Set();
    for (const uid of Object.keys(this.room?.members || {})) {
      if (uid === S.user.uid) continue;
      const p = player(uid, () => {});
      if (p) taken.add(p.c);
    }
    return taken;
  }

  // --- drafts (letters typed but not yet a found word) are kept in this browser
  draftKey() {
    return `aw:${this.roomId}:${this.model?.id}`;
  }
  loadDrafts() {
    if (!this.model) return {};
    try {
      return JSON.parse(localStorage.getItem(this.draftKey()) || '{}');
    } catch {
      return {};
    }
  }
  saveDrafts() {
    try {
      localStorage.setItem(this.draftKey(), JSON.stringify(this.drafts));
    } catch {
      /* private mode: drafts live in memory only */
    }
  }

  // --- rendering --------------------------------------------------------------------
  render() {
    const m = this.model;
    this.cellEls.clear();
    const head = el('div', { class: 'gamehead' },
      el('div', {},
        el('h1', { text: this.room.title }),
        el('div', { class: 'muted small', id: 'progress' }),
      ),
      el('div', { id: 'scores', class: 'scores' }),
    );
    const parts = [head];
    if (!m) {
      parts.push(
        el('section', { class: 'card narrow' },
          el('p', {}, "La grille n'est pas encore prête. Elle apparaîtra ici automatiquement."),
        ),
      );
    } else {
      const grid = el('div', { class: 'grid', id: 'grid', role: 'grid' });
      grid.style.gridTemplateColumns = `repeat(${m.cols}, var(--cell))`;
      for (let r = 0; r < m.rows; r++) {
        for (let c = 0; c < m.cols; c++) {
          const key = `${r},${c}`;
          const info = m.cell.get(key);
          let node;
          if (!info) node = el('div', { class: 'cell block' });
          else if (info.type === 'C') {
            node = el('div', { class: `cell clue n${info.clues.length}`, onclick: () => this.clickClue(key) },
              ...info.clues.map((wi) => {
                const w = m.words[wi];
                return el('div', { class: `q a-${w.arrow}`, 'data-w': wi },
                  el('span', { class: 't', text: w.q }),
                  el('span', { class: 'arrow', 'aria-hidden': 'true' }),
                );
              }),
            );
          } else {
            node = el('div', { class: 'cell letter', onclick: () => this.clickLetter(key) }, el('span', { class: 'ch' }));
          }
          this.cellEls.set(key, node);
          grid.append(node);
        }
      }
      parts.push(
        el('div', { class: 'cluebar', id: 'cluebar' }),
        el('div', { class: 'gridwrap', id: 'gridwrap' }, grid),
        keyboard((k) => this.input(k)),
      );
    }
    if (S.organizer) parts.push(this.organizerTools());
    view(...parts);
    this.sizeGrid();
    this.refreshAll();
  }

  sizeGrid() {
    const g = $('#grid');
    if (!g || !this.model) return;
    const avail = Math.min($('#view').clientWidth, 960) - 4;
    const size = Math.max(40, Math.min(60, Math.floor(avail / this.model.cols)));
    g.style.setProperty('--cell', `${size}px`);
  }

  organizerTools() {
    const level = el('select', {}, ...Object.entries(LEVELS).map(([k, v]) => el('option', { value: k, selected: k === 'moyen' }, v.label)));
    const size = el('select', {}, ...Object.entries(SIZES).map(([k, v]) => el('option', { value: k }, v.label)));
    const btn = el('button', {
      class: 'primary',
      onclick: async () => {
        if (this.model && !confirm('Remplacer la grille actuelle pour tout le monde ?')) return;
        btn.disabled = true;
        btn.textContent = 'Génération…';
        try {
          const entries = await loadDictionary();
          const sz = SIZES[size.value];
          await new Promise((r) => setTimeout(r, 20));
          const grid = generateGrid({ entries, level: level.value, rows: sz.rows, cols: sz.cols, attempts: 16, samples: 400 });
          grid.letters = lettersOf(grid.words);
          await DB.publishGrid(this.roomId, grid);
          toast(`Nouvelle grille : ${grid.words.length} mots.`);
        } catch (e) {
          console.error(e);
          toast('La génération a échoué.', 'bad');
        } finally {
          btn.disabled = false;
          btn.textContent = 'Nouvelle grille';
        }
      },
    }, 'Nouvelle grille');
    return el('details', { class: 'card orga' },
      el('summary', {}, 'Outils organisateur'),
      el('div', { class: 'row wrap' },
        el('label', {}, 'Difficulté ', level),
        el('label', {}, 'Taille ', size),
        btn,
        el('button', { onclick: () => copy(linkFor(this.roomId)) }, 'Copier le lien de la partie'),
      ),
      el('p', { class: 'muted small' }, 'Facile : mots courants, définitions simples, quelques lettres offertes. Difficile : définitions plus subtiles, aucune lettre offerte.'),
    );
  }

  onFound(found) {
    this.found = found;
    this.refreshAll();
    const m = this.model;
    if (m && Object.keys(found).length === m.words.length && m.words.length > 0) {
      toast('Grille terminée, bravo à tous !', 'good');
    }
  }

  /** Letter shown in a cell: found > given > draft. */
  letterAt(key) {
    const info = this.model.cell.get(key);
    for (const wi of [info.h, info.v]) {
      if (wi === undefined) continue;
      const f = this.found[wi];
      if (f) return { ch: f.w[this.model.words[wi].keys.indexOf(key)], kind: 'found' };
    }
    if (this.model.givens.has(key)) return { ch: this.model.givens.get(key), kind: 'given' };
    if (this.drafts[key]) return { ch: this.drafts[key], kind: 'draft' };
    return { ch: '', kind: '' };
  }

  locked(key) {
    const k = this.letterAt(key).kind;
    return k === 'found' || k === 'given';
  }

  refreshAll() {
    if (!this.model) {
      this.renderScores();
      return;
    }
    for (const key of this.cellEls.keys()) this.refreshCell(key);
    this.renderScores();
    this.renderClueBar();
  }

  refreshCell(key) {
    const node = this.cellEls.get(key);
    const info = this.model.cell.get(key);
    if (!node || !info) return;
    const selWord = this.sel ? this.model.words[this.sel.w] : null;
    if (info.type === 'C') {
      node.classList.toggle('active', !!selWord && selWord.ck === key);
      for (const q of node.querySelectorAll('.q')) {
        const wi = Number(q.dataset.w);
        q.classList.toggle('active', !!this.sel && this.sel.w === wi);
        q.classList.toggle('done', !!this.found[wi]);
      }
      return;
    }
    const { ch, kind } = this.letterAt(key);
    node.firstChild.textContent = ch;
    node.dataset.kind = kind;
    const colors = [info.h, info.v]
      .filter((wi) => wi !== undefined && this.found[wi])
      .map((wi) => player(this.found[wi].u, () => this.refreshAll())?.c || '#ddd');
    if (colors.length === 2 && colors[0] !== colors[1]) {
      node.style.background = `linear-gradient(135deg, ${colors[0]} 50%, ${colors[1]} 50%)`;
    } else {
      node.style.background = colors[0] || '';
    }
    node.classList.toggle('inword', !!selWord && selWord.keys.includes(key));
    node.classList.toggle('cur', !!this.sel && this.sel.k === key);
  }

  renderScores() {
    const box = $('#scores');
    if (!box) return;
    const counts = new Map();
    for (const uid of Object.keys(this.room?.members || {})) counts.set(uid, 0);
    for (const f of Object.values(this.found)) counts.set(f.u, (counts.get(f.u) || 0) + 1);
    const rows = [...counts.entries()]
      .map(([uid, n]) => ({ uid, n, p: player(uid, () => this.refreshAll()) }))
      .filter((x) => x.p)
      .sort((a, b) => b.n - a.n || a.p.n.localeCompare(b.p.n));
    box.replaceChildren(
      ...rows.map((x) =>
        el('span', { class: `chip${x.uid === S.user.uid ? ' me' : ''}` },
          el('span', { class: 'dot', style: `background:${x.p.c}` }),
          el('span', { text: x.p.n }),
          el('b', { text: String(x.n) }),
        ),
      ),
    );
    const prog = $('#progress');
    if (prog && this.model) {
      const lv = LEVELS[this.model.level]?.label || '';
      prog.textContent = `${Object.keys(this.found).length} / ${this.model.words.length} mots trouvés · ${lv}`;
    }
  }

  renderClueBar() {
    const bar = $('#cluebar');
    if (!bar) return;
    if (!this.sel) {
      bar.replaceChildren(el('span', { class: 'muted' }, 'Touchez une case ou une définition pour commencer.'));
      return;
    }
    const w = this.model.words[this.sel.w];
    const f = this.found[this.sel.w];
    const who = f ? player(f.u, () => {}) : null;
    bar.replaceChildren(
      el('span', { class: `dirtag ${w.d}`, text: w.d === 'h' ? '→' : '↓' }),
      el('span', { class: 'cq', text: w.q }),
      el('span', { class: 'muted small', text: `${w.l} lettres` }),
      who ? el('span', { class: 'chip' }, el('span', { class: 'dot', style: `background:${who.c}` }), el('span', { text: `trouvé par ${who.n}` })) : null,
    );
  }

  // --- interaction -------------------------------------------------------------------
  select(wi, key) {
    const old = this.sel ? [...this.model.words[this.sel.w].keys, this.model.words[this.sel.w].ck] : [];
    this.sel = { w: wi, k: key };
    const w = this.model.words[wi];
    for (const k of new Set([...old, ...w.keys, w.ck])) this.refreshCell(k);
    this.renderClueBar();
    this.cellEls.get(key)?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  firstOpen(wi) {
    const w = this.model.words[wi];
    return w.keys.find((k) => !this.locked(k)) || w.keys[0];
  }

  clickLetter(key) {
    const info = this.model.cell.get(key);
    const options = [info.h, info.v].filter((x) => x !== undefined);
    let wi;
    if (this.sel && this.sel.k === key && options.length === 2) {
      wi = options.find((x) => x !== this.sel.w);
    } else if (this.sel && options.includes(this.sel.w)) {
      wi = this.sel.w;
    } else {
      const pref = this.sel ? this.model.words[this.sel.w].d : 'h';
      wi = options.find((x) => this.model.words[x].d === pref) ?? options[0];
    }
    this.select(wi, key);
  }

  clickClue(key) {
    const clues = this.model.cell.get(key).clues;
    let wi = clues[0];
    if (this.sel && clues.includes(this.sel.w)) wi = clues[(clues.indexOf(this.sel.w) + 1) % clues.length];
    this.select(wi, this.firstOpen(wi));
  }

  onKey(e) {
    if (!this.model || e.ctrlKey || e.metaKey || e.altKey) return;
    if ($('#profile-dialog').open) return;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
    const k = e.key;
    if (/^[a-zA-ZàâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ]$/.test(k)) this.input(k);
    else if (k === 'Backspace' || k === 'Delete') this.input('⌫');
    else if (k === ' ' || k === 'Tab') this.input('⇄');
    else if (k.startsWith('Arrow')) this.move(k);
    else return;
    e.preventDefault();
  }

  move(arrow) {
    if (!this.sel) return;
    const [r, c] = this.sel.k.split(',').map(Number);
    const [dr, dc] = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[arrow];
    for (let s = 1; s < Math.max(this.model.rows, this.model.cols); s++) {
      const key = `${r + dr * s},${c + dc * s}`;
      const info = this.model.cell.get(key);
      if (info?.type === 'L') {
        const want = dr ? 'v' : 'h';
        const wi = [info.h, info.v].find((x) => x !== undefined && this.model.words[x].d === want) ?? info.h ?? info.v;
        this.select(wi, key);
        return;
      }
    }
  }

  input(k) {
    if (!this.sel) return;
    const w = this.model.words[this.sel.w];
    let pos = w.keys.indexOf(this.sel.k);
    if (k === '⇄') {
      this.clickLetter(this.sel.k);
      return;
    }
    if (k === '⌫') {
      let key = this.sel.k;
      if (this.locked(key) || !this.drafts[key]) {
        for (let p = pos - 1; p >= 0; p--) {
          if (!this.locked(w.keys[p])) {
            key = w.keys[p];
            break;
          }
        }
      }
      if (!this.locked(key)) {
        delete this.drafts[key];
        this.saveDrafts();
      }
      this.select(this.sel.w, key);
      return;
    }
    const ch = k.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
    while (pos < w.keys.length && this.locked(w.keys[pos])) pos++;
    if (pos >= w.keys.length) return;
    const key = w.keys[pos];
    this.drafts[key] = ch;
    this.saveDrafts();
    this.refreshCell(key);
    this.checkWords(key);
    let next = pos + 1;
    while (next < w.keys.length && this.locked(w.keys[next])) next++;
    this.select(this.sel.w, w.keys[Math.min(next, w.keys.length - 1)] ?? key);
  }

  /** When a word through `key` is complete, ask the server if it is right. */
  checkWords(key) {
    const info = this.model.cell.get(key);
    for (const wi of [info.h, info.v]) {
      if (wi === undefined || this.found[wi]) continue;
      const w = this.model.words[wi];
      const letters = w.keys.map((k) => this.letterAt(k).ch);
      if (letters.some((x) => !x)) continue;
      const guess = letters.join('');
      const tried = this.tried.get(wi) || new Set();
      if (tried.has(guess)) continue;
      tried.add(guess);
      this.tried.set(wi, tried);
      DB.claimWord(this.roomId, this.model.id, wi, guess, S.user.uid).then((ok) => {
        if (ok) {
          toast(`Bravo, « ${guess} » est à toi !`, 'good');
        } else if (!this.found[wi]) {
          for (const k of w.keys) {
            const n = this.cellEls.get(k);
            n?.classList.add('wrong');
            setTimeout(() => n?.classList.remove('wrong'), 700);
          }
        }
      });
    }
  }
}

/** Turn the public grid into lookup tables for rendering. */
function buildModel(g) {
  const words = Object.values(g.words || {}).map((x, i) => {
    const keys = [];
    for (let k = 0; k < x.l; k++) keys.push(`${x.r + (x.d === 'v' ? k : 0)},${x.c + (x.d === 'h' ? k : 0)}`);
    return { ...x, i, keys, ck: `${x.cr},${x.cc}`, arrow: arrowKind(x) };
  });
  const cell = new Map();
  words.forEach((w, i) => {
    for (const k of w.keys) {
      const info = cell.get(k) || { type: 'L' };
      info[w.d] = i;
      cell.set(k, info);
    }
  });
  words.forEach((w, i) => {
    const info = cell.get(w.ck) || { type: 'C', clues: [] };
    info.clues.push(i);
    cell.set(w.ck, info);
  });
  // In a clue cell, show the across clue first (top), like printed grids.
  for (const info of cell.values()) {
    if (info.type === 'C') info.clues.sort((a, b) => (words[a].arrow.startsWith('right') ? 0 : 1) - (words[b].arrow.startsWith('right') ? 0 : 1));
  }
  const givens = new Map();
  for (const part of (g.givens || '').split(';')) {
    if (!part) continue;
    const [r, c, ch] = part.split(',');
    givens.set(`${r},${c}`, ch);
  }
  return { id: g.id, rows: g.rows, cols: g.cols, level: g.level, words, cell, givens };
}

/** On-screen keyboard (AZERTY). Shown on touch screens by the CSS. */
function keyboard(onKey) {
  const rows = ['AZERTYUIOP', 'QSDFGHJKLM', 'WXCVBN'];
  const kb = el('div', { class: 'kb', id: 'kb' });
  rows.forEach((row, i) => {
    const line = el('div', { class: 'kbrow' });
    if (i === 2) line.append(el('button', { class: 'key wide', title: 'Changer de sens', onclick: () => onKey('⇄') }, '⇄'));
    for (const ch of row) line.append(el('button', { class: 'key', onclick: () => onKey(ch) }, ch));
    if (i === 2) line.append(el('button', { class: 'key wide', title: 'Effacer', onclick: () => onKey('⌫') }, '⌫'));
    kb.append(line);
  });
  return kb;
}

main();
