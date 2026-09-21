/**
 * Sprawdza, czy każde przekierowanie 301 z dist/.htaccess ma istniejący cel.
 *
 * PO CO: przekierowanie na nieistniejący adres jest gorsze niż jego brak —
 * użytkownik i bot idą za 301 i lądują na powłoce z noindex, a z zewnątrz
 * wygląda to na działające. Po konsolidacji bloga (21.09.2026) reguł jest 24
 * i ręczne sprawdzenie każdej przestało być realne.
 *
 * Uruchamiane przez deploy.ps1 przed wysyłką.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const DIST = path.join(process.cwd(), 'dist');
const plik = path.join(DIST, '.htaccess');

if (!fs.existsSync(plik)) {
  console.error('[301] Brak dist/.htaccess — najpierw `npm run build`.');
  process.exit(1);
}

const odmiana = (n, jeden, dwaCztery, piec) => {
  if (n === 1) return jeden;
  const r10 = n % 10;
  const r100 = n % 100;
  return r10 >= 2 && r10 <= 4 && !(r100 >= 12 && r100 <= 14) ? dwaCztery : piec;
};

const istnieje = (sciezka) =>
  fs.existsSync(path.join(DIST, sciezka))
  || fs.existsSync(path.join(DIST, `${sciezka}.html`))
  || fs.existsSync(path.join(DIST, sciezka, 'index.html'));

const regula = /^[ \t]*RewriteRule[ \t]+(\S+)[ \t]+(\/\S*)[ \t]+\[[^\]]*R=301[^\]]*\]/gm;

const zle = [];
let ile = 0;

for (const [, wzorzec, cel] of fs.readFileSync(plik, 'utf8').matchAll(regula)) {
  ile += 1;
  const sciezka = cel.split('?')[0].replace(/^\/+|\/+$/g, '');
  // "/" = strona główna; cel budowany ze zmiennych (HTTPS, www) sprawdzić się nie da
  if (!sciezka || sciezka.includes('%') || sciezka.includes('{')) continue;
  if (!istnieje(sciezka)) zle.push(`${wzorzec} -> ${cel}`);
}

if (zle.length) {
  console.error(`[301] Cel nie istnieje w dist/:\n  ${zle.join('\n  ')}`);
  process.exit(1);
}

console.log(`[301] ${ile} ${odmiana(ile, 'przekierowanie ma', 'przekierowania mają', 'przekierowań ma')} istniejący cel.`);

// ——— Kolizja katalogu z plikiem o tej samej nazwie ———————————————————
// `blog/` obok `blog.html`: z warunkiem `!-d` reguła serwująca nie odpala się
// dla /blog, Apache próbuje wylistować katalog i zwraca 403. Tak padła strona
// listy bloga po wdrożeniu 20.09.2026 — na zewnątrz wyglądało to na działające,
// bo pojedyncze artykuły w środku katalogu serwowały się normalnie.
const tresc = fs.readFileSync(plik, 'utf8');
const kolizje = fs
  .readdirSync(DIST, { withFileTypes: true })
  .filter((w) => w.isDirectory() && fs.existsSync(path.join(DIST, `${w.name}.html`)))
  .map((w) => w.name);

if (kolizje.length) {
  // Sprawdzamy WYŁĄCZNIE regułę serwującą (tę przepisującą na /$1.html), a nie
  // dowolną regułę z `!-d`: reguła zapasowa kierująca na powloka.html ten warunek
  // ma mieć — bez niego istniejący katalog (np. /panel) też by na nią trafiał.
  const linie = tresc.split('\n');
  const iRegula = linie.findIndex((l) => /^\s*RewriteRule\s.*\/\$1\.html/.test(l));
  let maWykluczenieKatalogow = false;
  for (let i = iRegula - 1; i >= 0 && /^\s*RewriteCond\s/.test(linie[i]); i -= 1) {
    if (linie[i].includes('!-d')) maWykluczenieKatalogow = true;
  }
  if (iRegula !== -1 && maWykluczenieKatalogow) {
    console.error(
      `[htaccess] Katalog i plik o tej samej nazwie: ${kolizje.join(', ')} — a reguła serwująca ma `
        + 'warunek `!-d`, więc te adresy zwrócą 403. Usuń ten warunek (bezpiecznikiem jest `-f` na celu).',
    );
    process.exit(1);
  }
  console.log(`[htaccess] Kolizje katalog/plik: ${kolizje.join(', ')} — reguła serwująca je obsłuży.`);
}
