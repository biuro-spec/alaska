/**
 * Zrzut ekranu prerenderowanej strony z dist/ — kontrola wyglądu przed wysyłką.
 *
 * PO CO: prerender i strażniki sprawdzają, że treść JEST w HTML, ale nie że da
 * się ją przeczytać. Strony usługowe pojechały 20.09.2026 z białym tekstem na
 * jasnym tle (lista cech) i kartami bez stylów (sekcja „Zobacz także”) — wszystkie
 * kontrole przeszły, bo tekst był w dokumencie.
 *
 * Użycie: node scripts/zrzut-strony.mjs /nabijanie-klimatyzacji-raciborz zrzut.png
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';
import { chromium } from 'playwright';

const DIST = path.join(process.cwd(), 'dist');
const [trasa = '/', cel = 'zrzut.png', szerokosc = '1280'] = process.argv.slice(2);

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
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
const karta = await przegladarka.newPage({ viewport: { width: Number(szerokosc), height: 1000 } });
await karta.goto(`http://127.0.0.1:${port}${trasa}`, { waitUntil: 'networkidle' });
// Ekran powitalny zasłania stronę na 4 sekundy
await karta.evaluate(() => document.querySelector('.intro-overlay')?.click());
await karta.waitForTimeout(1200);
await karta.evaluate(async () => {
  const krok = window.innerHeight / 2;
  for (let y = 0; y <= document.body.scrollHeight; y += krok) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 90));
  }
  window.scrollTo(0, 0);
});
await karta.waitForTimeout(400);

// Element szerszy niż ekran rozpycha stronę w bok — na komórce objawia się to
// poziomym przewijaniem i „wychodzeniem strony poza ekran”.
const rozpychacze = await karta.evaluate(() => {
  const szer = document.documentElement.clientWidth;
  if (document.documentElement.scrollWidth <= szer) return [];
  return [...document.querySelectorAll('body *')]
    .filter((el) => el.getBoundingClientRect().right > szer + 1)
    .slice(0, 5)
    .map((el) => `${el.tagName.toLowerCase()}.${el.className?.toString().split(' ')[0] || ''} `
      + `(${Math.round(el.getBoundingClientRect().right)}px > ${szer}px)`);
});
if (rozpychacze.length) {
  console.error(`[zrzut] Strona wychodzi poza ekran:\n  ${rozpychacze.join('\n  ')}`);
} else {
  console.log(`[zrzut] Bez poziomego przewijania przy ${szerokosc} px.`);
}

await karta.screenshot({ path: path.resolve(cel), fullPage: true });
await przegladarka.close();
serwer.close();
console.log(`Zrzut ${trasa} -> ${path.resolve(cel)}`);
