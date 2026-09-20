/**
 * Prerender treści dla botów (wzorzec z projektu life-centrum).
 *
 * PO CO: SPA serwuje botowi `<div id="root"></div>` i zero znaków treści.
 * Google uruchamia JS, więc problem jest częściowo niewidoczny — ale GPTBot,
 * PerplexityBot, ClaudeBot i podgląd linku na Facebooku JS-a NIE uruchamiają.
 * Do 09.2026 dostawały one canonical strony głównej dla KAŻDEGO adresu.
 *
 * Działa, bo main.jsx startuje przez `createRoot` (podmienia prerender bez
 * konfliktu). Przy przejściu na `hydrateRoot` trzeba by zrobić prawdziwy SSR.
 *
 * Uruchamiaj PO buildzie:  npm run build:deploy
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';

// ——— KONFIGURACJA ————————————————————————————————————————————————————
const DIST = path.join(process.cwd(), 'dist');
const BAZOWY_URL = 'https://alaskarp.pl';
const MIN_ZNAKOW = 800;
// Panel realizacji ciągnie zdjęcia z Google Apps Script — w prerenderze
// czekanie na tę odpowiedź tylko wydłuża render, a zdjęcia i tak doładują
// się u użytkownika. Stałe realizacje (SEED) są w kodzie i zostaną zapisane.
const BLOKUJ = /script\.google\.com|googletagmanager\.com|google-analytics\.com/;
// —————————————————————————————————————————————————————————————————————

/** Trzy formy liczby mnogiej: odmiana(n, 'trasę', 'trasy', 'tras'); 12–14 zawsze trzecia forma. */
const odmiana = (n, jeden, dwaCztery, piec) => {
  if (n === 1) return jeden;
  const r10 = n % 10;
  const r100 = n % 100;
  return r10 >= 2 && r10 <= 4 && !(r100 >= 12 && r100 <= 14) ? dwaCztery : piec;
};

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.gif': 'image/gif', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.ico': 'image/x-icon', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json',
};

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('[prerender] Brak dist/index.html — najpierw `npm run build`.');
  process.exit(1);
}

/**
 * Czysta powłoka SPA wczytana RAZ, przed renderem. Prerender trasy `/`
 * nadpisuje dist/index.html — gdyby serwer czytał go z dysku, każda kolejna
 * trasa startowałaby z tytułem i canonicalem strony głównej w <head>,
 * a React dokładałby swoje obok.
 */
const POWLOKA = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
if (!/<div id="root"><\/div>/.test(POWLOKA)) {
  console.error('[prerender] dist/index.html nie jest czystą powłoką (ma już prerender). Uruchom `npm run build:deploy`.');
  process.exit(1);
}

// Powłoka zapasowa: .htaccess kieruje na nią każdy adres bez własnego pliku.
// Dotąd fallback szedł na index.html, więc nieistniejący adres był duplikatem
// strony głównej z canonicalem „/" i „index, follow" — czyli miękkim 404.
{
  const zapasowa = POWLOKA.replace(
    /<meta name="robots" content="[^"]*"\s*\/?>/,
    '<meta name="robots" content="noindex, follow" />',
  );
  if (!/noindex/.test(zapasowa)) {
    console.error('[prerender] Nie udało się wstawić noindex do powloka.html (zmienił się <meta name="robots"> w index.html?).');
    process.exit(1);
  }
  fs.writeFileSync(path.join(DIST, 'powloka.html'), zapasowa, 'utf8');
}

// Sygnatury tagów <head> z powłoki — przy duplikacie usuwamy ten z powłoki,
// zostaje wersja wyniesiona przez React z komponentu Seo.
const SYGNATURY_POWLOKI = [
  ...POWLOKA.matchAll(
    /<title>([^<]*)<\/title>|<meta\s+(?:name|property)="([^"]+)"\s+content="([^"]*)"|<link\s+rel="canonical"\s+href="([^"]*)"/g,
  ),
].map((m) => (m[1] != null ? `title:${m[1]}` : m[2] ? `meta:${m[2]}=${m[3]}` : `link:canonical=${m[4]}`));

let PORT = 0;

function uruchomSerwer() {
  const serwer = http.createServer((req, res) => {
    const sciezka = decodeURIComponent(req.url.split('?')[0]);
    const plik = path.join(DIST, sciezka);
    if (!fs.existsSync(plik) || fs.statSync(plik).isDirectory()) {
      res.writeHead(200, { 'Content-Type': MIME['.html'] });
      res.end(POWLOKA);
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(plik).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(plik).pipe(res);
  });
  return new Promise((ok) =>
    serwer.listen(0, '127.0.0.1', () => {
      PORT = serwer.address().port;
      ok(serwer);
    }),
  );
}

/** Trasy z sitemap.xml — jedna lista prawdy dla sitemapy i prerenderu. */
function trasy() {
  const plik = path.join(DIST, 'sitemap.xml');
  if (!fs.existsSync(plik)) {
    console.error('[prerender] Brak dist/sitemap.xml — uruchom `npm run build`.');
    process.exit(1);
  }
  return [...fs.readFileSync(plik, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(BAZOWY_URL, ''))
    .filter((u) => !u.includes('?') && !u.includes('#'));
}

async function uruchomPrzegladarke() {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch();
  return {
    async nowaKarta() {
      const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
      await page.route((url) => BLOKUJ.test(url.href), (r) => r.abort());
      return {
        goto: (url) => page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }),
        evaluate: (fn, arg) => page.evaluate(fn, arg),
        czekaj: (ms) => page.waitForTimeout(ms),
      };
    },
    zamknij: () => browser.close(),
  };
}

const serwer = await uruchomSerwer();
const przegladarka = await uruchomPrzegladarke();
const karta = await przegladarka.nowaKarta();

const nieudane = [];
let zapisane = 0;
let znakiRazem = 0;

for (const trasa of trasy()) {
  try {
    await karta.goto(`http://127.0.0.1:${PORT}${trasa}`);

    // Ekran powitalny zasłania stronę i ustawia overflow: hidden na body.
    // Sam znika po 4 s, ale bez tego kliknięcia scroll poniżej nic nie da.
    await karta.evaluate(() => {
      const intro = document.querySelector('.intro-overlay');
      if (intro) intro.click();
    });
    await karta.czekaj(1000);

    // Przewijamy całą stronę: sekcje z useScrollAnimation odsłaniają się
    // dopiero w kadrze. Bez tego zapiszemy treść pod `opacity: 0`.
    await karta.evaluate(async () => {
      const html = document.documentElement;
      html.style.scrollBehavior = 'auto';
      const krok = window.innerHeight / 2;
      for (let y = 0; y <= document.body.scrollHeight; y += krok) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 110));
      }
      window.scrollTo(0, 0);
      html.style.removeProperty('scroll-behavior');
      if (!html.getAttribute('style')) html.removeAttribute('style');
    });
    await karta.czekaj(500);

    const html = await karta.evaluate((sygnaturyPowloki) => {
      const root = document.getElementById('root');
      if (root) {
        // Nic nie może zostać zapisane jako niewidoczne — bot potraktowałby
        // to jako ukrywanie tekstu przed użytkownikiem.
        root.querySelectorAll('*').forEach((el) => {
          const cs = getComputedStyle(el);
          if (parseFloat(cs.opacity) < 1) el.style.opacity = '1';
          if (cs.transform !== 'none') el.style.transform = 'none';
          if (cs.visibility === 'hidden') el.style.visibility = 'visible';
        });
        // Baner cookies i ekran powitalny zasłaniają treść i nie mają czego szukać w indeksie
        root.querySelectorAll('.intro-overlay, .cookie-consent, .cookie-banner').forEach((el) => el.remove());
      }
      // React 19 wynosi <title>/<meta>/<link> z komponentu Seo do <head>, obok
      // statycznych z index.html. Z każdego klucza zostaje JEDEN tag: przy
      // duplikacie usuwamy ten, który był w powłoce.
      const klucz = (el) =>
        el.tagName === 'TITLE' ? 'title'
          : el.tagName === 'LINK' ? `link:${el.getAttribute('rel')}`
            : `meta:${el.getAttribute('name') || el.getAttribute('property')}`;
      const sygnatura = (el) =>
        el.tagName === 'TITLE' ? `title:${el.textContent}`
          : el.tagName === 'LINK' ? `link:canonical=${el.getAttribute('href')}`
            : `${klucz(el)}=${el.getAttribute('content')}`;
      const grupy = new Map();
      document.head
        .querySelectorAll('title, link[rel="canonical"], meta[name], meta[property]')
        .forEach((el) => {
          const k = klucz(el);
          if (k === 'meta:null' || k === 'meta:viewport') return;
          if (!grupy.has(k)) grupy.set(k, []);
          grupy.get(k).push(el);
        });
      for (const elementy of grupy.values()) {
        if (elementy.length < 2) continue;
        const zPowloki = elementy.filter((el) => sygnaturyPowloki.includes(sygnatura(el)));
        const doUsuniecia = zPowloki.length < elementy.length ? zPowloki : elementy.slice(1);
        doUsuniecia.forEach((el) => el.remove());
      }
      return '<!doctype html>\n' + document.documentElement.outerHTML;
    }, SYGNATURY_POWLOKI);

    // ——— Strażnik: pusty prerender jest GORSZY niż żaden, bo wygląda na udany.
    if (!/<h1/i.test(html)) throw new Error('brak <h1> po renderze');
    const canonicale = [...html.matchAll(/<link rel="canonical"/g)].length;
    if (canonicale !== 1) throw new Error(`${canonicale} canonicali zamiast jednego`);
    const oczekiwany = `${BAZOWY_URL}${trasa === '/' ? '/' : trasa}`;
    if (!html.includes(`<link rel="canonical" href="${oczekiwany}">`)) {
      throw new Error(`canonical nie wskazuje na ${oczekiwany}`);
    }
    const znaki = html
      .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim().length;
    if (znaki < MIN_ZNAKOW) throw new Error(`tylko ${znaki} znaków treści`);

    const plik = trasa === '/'
      ? path.join(DIST, 'index.html')
      : path.join(DIST, `${trasa.replace(/^\//, '').replace(/\/$/, '')}.html`);
    fs.mkdirSync(path.dirname(plik), { recursive: true });
    fs.writeFileSync(plik, html, 'utf8');
    zapisane += 1;
    znakiRazem += znaki;
    console.log(`[prerender] ${trasa} -> ${path.relative(DIST, plik)} (${znaki} ${odmiana(znaki, 'znak', 'znaki', 'znaków')})`);
  } catch (blad) {
    nieudane.push(`${trasa} -> ${blad.message}`);
  }
}

await przegladarka.zamknij();
serwer.close();

const srednia = zapisane ? Math.round(znakiRazem / zapisane) : 0;
console.log(
  `[prerender] Zapisano ${zapisane} ${odmiana(zapisane, 'trasę', 'trasy', 'tras')}, ` +
    `średnio ${srednia} ${odmiana(srednia, 'znak', 'znaki', 'znaków')} treści`,
);
if (nieudane.length) {
  console.error(`[prerender] Nie udało się:\n  ${nieudane.join('\n  ')}`);
  process.exitCode = 1;
}
