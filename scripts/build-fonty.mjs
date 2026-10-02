/**
 * Wykrój fontów Inter i Outfit pod polski alfabet, serwowany z własnego serwera.
 *
 * PO CO: Google Fonts dawał 182 KB w czterech plikach (Inter 83,3 + 47,3 KB,
 * Outfit 31,5 + 14,4 KB) plus dwa dodatkowe połączenia — do fonts.googleapis.com
 * po arkusz i do fonts.gstatic.com po pliki. Oba na ścieżce krytycznej.
 * Zmierzone Lighthouse'em 02.10.2026.
 *
 * Polski potrzebuje z latin-ext tylko ośmiu liter (ąćęłńóśźż i wielkich), więc
 * pełne podzbiory są marnotrawstwem.
 *
 * Wynik trafia do public/fonty/ i jest commitowany — build nie potrzebuje sieci.
 * Uruchamiać po zmianie krojów lub grubości:  npm run fonty
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const WYJSCIE = path.join(process.cwd(), 'public', 'fonty');
const ROBOCZY = path.join(process.cwd(), 'node_modules', '.cache', 'fonty');

// Grubości faktycznie używane w arkuszu (--font-body: Inter, --font-heading: Outfit)
const KROJE = [
  { rodzina: 'Inter', wagi: [400, 600, 700] },
  { rodzina: 'Outfit', wagi: [600, 800] },
];

// Podstawowa łacina + polskie znaki + typografia, której używamy w tekstach
// (półpauza, myślnik, cudzysłowy «„ ”», wielokropek, interpunkt, stopnie, euro).
const ZAKRES = [
  'U+0020-007E',
  'U+00A0', 'U+00AB', 'U+00BB', 'U+00B0', 'U+00B7', 'U+00D7',
  'U+0104-0107', 'U+0118-011B', 'U+0141-0144', 'U+015A-015B',
  'U+0179-017C', 'U+00D3', 'U+00F3',
  'U+2013-2014', 'U+2018-201E', 'U+2026', 'U+20AC', 'U+2122',
].join(',');

// Bez przeglądarkowego User-Agenta Google odda format TTF zamiast woff2.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
  + '(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';

fs.mkdirSync(ROBOCZY, { recursive: true });
fs.mkdirSync(WYJSCIE, { recursive: true });

const reguly = [];
let przedRazem = 0;
let poRazem = 0;

for (const { rodzina, wagi } of KROJE) {
  for (const waga of wagi) {
    const url = `https://fonts.googleapis.com/css2?family=${rodzina}:wght@${waga}&display=swap`;
    const arkusz = await (await fetch(url, { headers: { 'User-Agent': UA } })).text();

    // Bierzemy podzbiór latin-ext — zawiera polskie znaki; sam latin ich nie ma.
    // Google formatuje arkusz z wcięciami i spacją przed klamrą:
    // `/* latin-ext */\n@font-face {\n  ...  src: url(...) format('woff2');\n}`
    const bloki = [...arkusz.matchAll(/\/\*\s*([a-z-]+)\s*\*\/\s*@font-face\s*\{[^}]*?src:\s*url\(([^)]+)\)[^}]*\}/g)];
    const blok = bloki.find(([, nazwa]) => nazwa === 'latin-ext') || bloki.find(([, nazwa]) => nazwa === 'latin');
    if (!blok) throw new Error(`${rodzina} ${waga}: nie znalazłem podzbioru w arkuszu Google`);

    const zrodloUrl = blok[2];
    const zrodlo = path.join(ROBOCZY, `${rodzina}-${waga}.woff2`);
    if (!fs.existsSync(zrodlo)) {
      const odp = await fetch(zrodloUrl, { headers: { 'User-Agent': UA } });
      if (!odp.ok) throw new Error(`${zrodloUrl} -> HTTP ${odp.status}`);
      fs.writeFileSync(zrodlo, Buffer.from(await odp.arrayBuffer()));
    }

    const nazwaPliku = `${rodzina.toLowerCase()}-${waga}.woff2`;
    const cel = path.join(WYJSCIE, nazwaPliku);
    execFileSync('python', [
      '-m', 'fontTools.subset', zrodlo,
      `--unicodes=${ZAKRES}`,
      '--flavor=woff2',
      '--layout-features=kern,liga',
      '--no-hinting',
      '--desubroutinize',
      `--output-file=${cel}`,
    ], { stdio: 'pipe' });

    const przed = fs.statSync(zrodlo).size;
    const po = fs.statSync(cel).size;
    przedRazem += przed;
    poRazem += po;
    console.log(`[fonty] ${rodzina} ${waga}: ${(przed / 1024).toFixed(1)} KB -> ${(po / 1024).toFixed(1)} KB`);

    reguly.push(`@font-face{font-family:"${rodzina}";font-style:normal;font-weight:${waga};`
      + `font-display:swap;src:url(/fonty/${nazwaPliku}) format("woff2")}`);
  }
}

const arkuszWyjsciowy = '/* Wygenerowane przez scripts/build-fonty.mjs — nie edytować ręcznie.\n'
  + '   Wykrój pod polski alfabet; wcześniej Google Fonts, 182 KB i dwa obce połączenia. */\n'
  + reguly.join('\n') + '\n';
fs.writeFileSync(path.join(WYJSCIE, 'fonty.css'), arkuszWyjsciowy, 'utf8');

console.log(`[fonty] Razem ${(przedRazem / 1024).toFixed(1)} KB -> ${(poRazem / 1024).toFixed(1)} KB `
  + `w ${reguly.length} plikach + fonty.css`);
