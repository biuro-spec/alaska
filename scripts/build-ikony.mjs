/**
 * Wykrój Font Awesome: zostawia tylko znaki, których strona faktycznie używa.
 *
 * PO CO: index.html ściągał z cdnjs trzy pełne rodziny FA — 147 KB (solid),
 * 106 KB (brands) i 25 KB (regular) — plus 18 KB arkusza, z czego 16 KB
 * nieużywanego. Strona rysuje z tego około czterdziestu ikon, a `fa-brands`
 * służył JEDNEJ: Facebookowi w stopce. Zmierzone 02.10.2026 Lighthouse'em:
 * 278 KB samych fontów ikon na komórce.
 *
 * Wynik trafia do public/ikony/ i jest commitowany — build nie potrzebuje sieci.
 * Uruchamiać po dodaniu nowej ikony:  npm run ikony
 *
 * Wymaga: python z fontTools (pyftsubset).
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const WERSJA = '6.4.0';
const CDN = `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/${WERSJA}`;
const WYJSCIE = path.join(process.cwd(), 'public', 'ikony');
const ROBOCZY = path.join(process.cwd(), 'node_modules', '.cache', 'fa');

// Nazwy składane w kodzie z wyrażeń (`fa-chevron-${...}`) — ekstrakcja tekstowa
// zobaczy tylko urwany przedrostek, więc wypisujemy je tutaj.
const SKLADANE = ['fa-chevron-up', 'fa-chevron-down'];

const STYLE = {
  solid: { plik: 'fa-solid-900', rodzina: 'Font Awesome 6 Free', waga: 900, klasa: '.fa-solid, .fas' },
  brands: { plik: 'fa-brands-400', rodzina: 'Font Awesome 6 Brands', waga: 400, klasa: '.fa-brands, .fab' },
};

// ——— 1. Jakie ikony są w kodzie ———————————————————————————————————————
const zrodla = [];
const zbierz = (katalog) => {
  for (const wpis of fs.readdirSync(katalog, { withFileTypes: true })) {
    const pelna = path.join(katalog, wpis.name);
    if (wpis.isDirectory()) zbierz(pelna);
    else if (/\.(jsx?|html|css)$/.test(wpis.name)) zrodla.push(pelna);
  }
};
zbierz(path.join(process.cwd(), 'src'));
const panel = path.join(process.cwd(), 'public', 'panel');
if (fs.existsSync(panel)) zbierz(panel);

const uzyte = new Set(SKLADANE);
for (const plik of zrodla) {
  for (const [, nazwa] of fs.readFileSync(plik, 'utf8').matchAll(/\b(fa-[a-z0-9]+(?:-[a-z0-9]+)*)\b/g)) {
    if (['fa-solid', 'fa-regular', 'fa-brands', 'fa-fw', 'fa-spin'].includes(nazwa)) continue;
    // `fa-chevron-${...}` daje przy ekstrakcji urwane „fa-chevron"; pełne nazwy
    // stoją w SKLADANE.
    if (SKLADANE.some((pelna) => pelna.startsWith(`${nazwa}-`))) continue;
    uzyte.add(nazwa);
  }
}

// ——— 2. Mapa nazwa → znak, z arkusza Font Awesome ——————————————————————
fs.mkdirSync(ROBOCZY, { recursive: true });
const pobierz = async (url, cel) => {
  if (fs.existsSync(cel)) return cel;
  const odp = await fetch(url);
  if (!odp.ok) throw new Error(`${url} -> HTTP ${odp.status}`);
  fs.writeFileSync(cel, Buffer.from(await odp.arrayBuffer()));
  return cel;
};

const arkusz = fs.readFileSync(
  await pobierz(`${CDN}/css/all.min.css`, path.join(ROBOCZY, 'all.min.css')),
  'utf8',
);
// Arkusz FA zapisuje aliasy jako osobne selektory, każdy z własnym `:before`:
// `.fa-location-dot:before,.fa-map-marker-alt:before{content:"\f3c5"}`.
const mapa = new Map();
for (const [, selektory, kod] of arkusz.matchAll(/((?:\.fa-[a-z0-9-]+::?before,?)+)\{content:"\\([0-9a-f]+)"\}/g)) {
  for (const [, n] of selektory.matchAll(/\.fa-([a-z0-9-]+)::?before/g)) mapa.set(`fa-${n}`, kod);
}
if (mapa.size < 500) {
  console.error(`[ikony] Z arkusza FA wyszło tylko ${mapa.size} ikon — zmienił się jego format?`);
  process.exit(1);
}

// Brands ma własną listę nazw w arkuszu — rozpoznajemy po tym, że ikona
// występuje w regule `.fab` albo jest znana z użycia w kodzie jako fa-brands.
const markowe = new Set();
for (const plik of zrodla) {
  for (const [, nazwa] of fs.readFileSync(plik, 'utf8').matchAll(/fa-brands\s+(fa-[a-z0-9-]+)/g)) markowe.add(nazwa);
}

const nieznane = [...uzyte].filter((n) => !mapa.has(n));
if (nieznane.length) {
  console.error(`[ikony] Nie ma takich ikon w Font Awesome ${WERSJA}: ${nieznane.join(', ')}`);
  process.exit(1);
}

const wgStylu = {
  solid: [...uzyte].filter((n) => !markowe.has(n)).sort(),
  brands: [...markowe].sort(),
};

// ——— 3. Wykrój fontów ————————————————————————————————————————————————
fs.mkdirSync(WYJSCIE, { recursive: true });
const reguly = [];

for (const [styl, opis] of Object.entries(STYLE)) {
  const nazwy = wgStylu[styl];
  if (!nazwy.length) continue;
  const zrodlo = await pobierz(`${CDN}/webfonts/${opis.plik}.woff2`, path.join(ROBOCZY, `${opis.plik}.woff2`));
  const cel = path.join(WYJSCIE, `${opis.plik}-wykroj.woff2`);
  const znaki = nazwy.map((n) => `U+${mapa.get(n).toUpperCase()}`).join(',');

  execFileSync('python', [
    '-m', 'fontTools.subset', zrodlo,
    `--unicodes=${znaki}`,
    '--flavor=woff2',
    '--layout-features=',
    '--no-hinting',
    '--desubroutinize',
    `--output-file=${cel}`,
  ], { stdio: 'pipe' });

  const przed = fs.statSync(zrodlo).size;
  const po = fs.statSync(cel).size;
  console.log(`[ikony] ${opis.plik}: ${nazwy.length} ${nazwy.length === 1 ? 'znak' : 'znaków'}, `
    + `${(przed / 1024).toFixed(1)} KB -> ${(po / 1024).toFixed(1)} KB`);

  reguly.push(`@font-face{font-family:"${opis.rodzina}";font-style:normal;font-weight:${opis.waga};`
    + `font-display:block;src:url(/ikony/${opis.plik}-wykroj.woff2) format("woff2")}`);
  reguly.push(`${opis.klasa}{font-family:"${opis.rodzina}";font-weight:${opis.waga}}`);
}

// ——— 4. Arkusz: tylko potrzebne reguły —————————————————————————————————
// `font-display: block` zamiast `swap`: ikona zastąpiona znakiem z fontu
// zapasowego to przez chwilę przypadkowa litera w miejscu symbolu.
reguly.unshift(
  '.fa,.fas,.far,.fab,.fa-solid,.fa-regular,.fa-brands{'
  + '-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;'
  + 'display:var(--fa-display,inline-block);font-style:normal;font-variant:normal;'
  + 'line-height:1;text-rendering:auto}',
  // Zestaw „regular” nie jest już wczytywany — trzy ikony, które go używały,
  // przestawiono na solid. Mapowanie zostaje, żeby stary kod nie znikał.
  '.fa-regular,.far{font-family:"Font Awesome 6 Free";font-weight:900}',
);

for (const nazwa of [...uzyte].sort()) {
  reguly.push(`.${nazwa}::before{content:"\\${mapa.get(nazwa)}"}`);
}

const arkuszWyjsciowy = `/* Wygenerowane przez scripts/build-ikony.mjs — nie edytować ręcznie.
   Font Awesome ${WERSJA}, wykrój do ${uzyte.size} ikon używanych na stronie. */\n`
  + reguly.join('\n') + '\n';
fs.writeFileSync(path.join(WYJSCIE, 'ikony.css'), arkuszWyjsciowy, 'utf8');

console.log(`[ikony] ikony.css: ${uzyte.size} ikon, ${(Buffer.byteLength(arkuszWyjsciowy) / 1024).toFixed(1)} KB`);
