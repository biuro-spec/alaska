/**
 * Sprawdza, czy własne wykroje fontów i ikon faktycznie się wczytały i rysują.
 *
 * PO CO: po przejściu z Google Fonts i cdnjs na własne pliki (02.10.2026)
 * literówka w ścieżce albo brakujący znak w wykroju daje stronę, która ładuje
 * się szybko i wygląda na sprawną — tyle że bez ikon albo w foncie zapasowym.
 * Żaden pomiar wydajności tego nie pokaże, bo wynik wtedy ROŚNIE.
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';
import { chromium } from 'playwright';

const DIST = path.join(process.cwd(), 'dist');
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.svg': 'image/svg+xml',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
};

const serwer = http.createServer((req, res) => {
  const sciezka = decodeURIComponent(req.url.split('?')[0]);
  for (const kandydat of [sciezka, `${sciezka}.html`, path.join(sciezka, 'index.html')]) {
    const plik = path.join(DIST, kandydat);
    if (fs.existsSync(plik) && fs.statSync(plik).isFile()) {
      res.writeHead(200, { 'Content-Type': MIME[path.extname(plik).toLowerCase()] || 'application/octet-stream' });
      fs.createReadStream(plik).pipe(res);
      return;
    }
  }
  res.writeHead(404).end('nie ma');
});
const port = await new Promise((ok) => serwer.listen(0, '127.0.0.1', () => ok(serwer.address().port)));

const przegladarka = await chromium.launch();
const karta = await przegladarka.newPage({ viewport: { width: 412, height: 823 } });

const bledy = [];
karta.on('response', (r) => {
  if (r.status() >= 400 && /\.(woff2|css)$/.test(r.url())) bledy.push(`${r.status()} ${r.url()}`);
});

await karta.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' });
await karta.evaluate(() => document.querySelector('.intro-overlay')?.click());
await karta.waitForTimeout(1200);

const wynik = await karta.evaluate(async () => {
  await document.fonts.ready;
  const rodziny = [...document.fonts].map((f) => `${f.family} ${f.weight}`);
  // Ikona bez wczytanego fontu ma szerokość bliską zeru albo rysuje zastępczy znak.
  // Tylko ikony faktycznie widoczne: przyciski pływające i telefon w belce są
  // na komórce ukryte do czasu przewinięcia i mają zerową szerokość z definicji.
  const widoczny = (el) => {
    if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') return false;
    const cs = getComputedStyle(el);
    return cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0;
  };
  const ikony = [...document.querySelectorAll('i.fa-solid, i.fa-brands')]
    .filter((el) => widoczny(el) && (!el.closest('.floating-btns') || el.closest('.floating-btns-visible')))
    .map((el) => ({
      klasa: el.className,
      szerokosc: Math.round(el.getBoundingClientRect().width),
    }));
  return {
    rodziny: [...new Set(rodziny)].sort(),
    wczytane: {
      inter: document.fonts.check('400 16px Inter'),
      outfit: document.fonts.check('800 16px Outfit'),
      fa: document.fonts.check('900 16px "Font Awesome 6 Free"'),
    },
    puste: ikony.filter((i) => i.szerokosc < 6).map((i) => i.klasa),
    ikonRazem: ikony.length,
  };
});

await przegladarka.close();
serwer.close();

console.log('[fonty] zadeklarowane:', wynik.rodziny.join(' | '));
console.log('[fonty] wczytane: Inter %s, Outfit %s, Font Awesome %s',
  wynik.wczytane.inter ? 'tak' : 'NIE', wynik.wczytane.outfit ? 'tak' : 'NIE', wynik.wczytane.fa ? 'tak' : 'NIE');
console.log(`[ikony] ${wynik.ikonRazem} ikon na stronie, bez szerokości: ${wynik.puste.length}`);

let kod = 0;
if (bledy.length) { console.error('[fonty] Nie udało się pobrać:\n  ' + bledy.join('\n  ')); kod = 1; }
if (!wynik.wczytane.inter || !wynik.wczytane.outfit || !wynik.wczytane.fa) {
  console.error('[fonty] Któryś z krojów się nie wczytał.');
  kod = 1;
}
if (wynik.puste.length) {
  console.error('[ikony] Ikony bez szerokości (brak znaku w wykroju?):\n  ' + wynik.puste.join('\n  '));
  kod = 1;
}
process.exit(kod);
