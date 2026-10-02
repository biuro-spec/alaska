/**
 * Lokalny serwer dist/ udający home.pl: trasy z własnym plikiem (/blog → blog.html), fallback SPA,
 * kompresja gzip i nagłówki cache jak na produkcji – inaczej Lighthouse liczy surowe bajty
 * (224 kB Reacta zamiast 72 kB) i wynik jest o 15–20 pkt zaniżony.
 *   node scripts/serwer-dist.mjs [port]   (domyślnie 4180)
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';
import zlib from 'node:zlib';

const DIST = path.join(process.cwd(), 'dist');
const PORT = Number(process.argv[2]) || 4180;
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.woff2': 'font/woff2',
};
const KOMPRESUJ = new Set(['.html', '.js', '.css', '.json', '.svg', '.xml', '.txt']);

http.createServer((req, res) => {
  const sciezka = decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '') || '/';
  const kandydaci = [path.join(DIST, sciezka), path.join(DIST, `${sciezka}.html`), path.join(DIST, sciezka, 'index.html')];
  // Fallback jak na produkcji (.htaccess): powloka.html z noindex, a nie prerender strony głównej
  const zapasowy = fs.existsSync(path.join(DIST, 'powloka.html')) ? path.join(DIST, 'powloka.html') : path.join(DIST, 'index.html');
  const plik = kandydaci.find((p) => fs.existsSync(p) && fs.statSync(p).isFile()) || zapasowy;
  const ext = path.extname(plik).toLowerCase();
  const naglowki = {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    // jak Vercel: assets z hashem na rok, reszta „sprawdź przy każdym wejściu” (bf-cache dozwolony)
    'Cache-Control': sciezka.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate',
  };
  const gzip = KOMPRESUJ.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] || '');
  if (gzip) { naglowki['Content-Encoding'] = 'gzip'; naglowki.Vary = 'Accept-Encoding'; }
  res.writeHead(200, naglowki);
  const strumien = fs.createReadStream(plik);
  (gzip ? strumien.pipe(zlib.createGzip({ level: 6 })) : strumien).pipe(res);
}).listen(PORT, () => console.log(`[dist] http://localhost:${PORT}/ (gzip)`));
