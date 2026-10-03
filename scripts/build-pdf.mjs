/**
 * Składa dokument z dokumenty/*.html do PDF-u na Pulpicie właściciela.
 *
 * PO CO: lista zadań dla Rafała powstała 21.09.2026 w katalogu tymczasowym
 * i przepadła przy zmianie sesji — został sam PDF, bez źródła do poprawienia.
 * Źródło leży teraz w repozytorium, więc dokument da się zaktualizować.
 *
 *   node scripts/build-pdf.mjs lista-dla-rafala
 */
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const CELE = {
  'lista-dla-rafala': {
    plik: 'Alaska-lista-dla-Rafala.pdf',
    stopka: 'Alaska — lista zadań',
  },
};

const nazwa = process.argv[2];
const cel = CELE[nazwa];
if (!cel) {
  console.error(`Użycie: node scripts/build-pdf.mjs <${Object.keys(CELE).join('|')}>`);
  process.exit(1);
}

const PULPIT = path.join(process.env.USERPROFILE || process.env.HOME, 'Desktop', 'VS Code');
const zrodlo = path.join(process.cwd(), 'dokumenty', `${nazwa}.html`);
const wyjscie = path.join(PULPIT, cel.plik);

const przegladarka = await chromium.launch();
const karta = await przegladarka.newPage();
await karta.goto(pathToFileURL(zrodlo).href, { waitUntil: 'networkidle' });
await karta.pdf({
  path: wyjscie,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate:
    '<div style="width:100%;font-size:8pt;color:#7c8a99;padding:0 15mm;text-align:right;">'
    + `${cel.stopka} &middot; strona <span class="pageNumber"></span> z <span class="totalPages"></span>`
    + '</div>',
  margin: { top: '16mm', right: '15mm', bottom: '14mm', left: '15mm' },
});
await przegladarka.close();
console.log(`[pdf] ${wyjscie}`);
