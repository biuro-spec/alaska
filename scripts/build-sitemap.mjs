/**
 * Generuje public/sitemap.xml z danych aplikacji.
 *
 * PO CO: ręcznie pisana sitemapa rozjeżdża się z serwisem. Ta z 03.2026 miała
 * `lastmod` sprzed pół roku i nie znała ani jednej strony usługowej, bo ich
 * wtedy nie było. Tutaj lista tras ma jedno źródło — pliki w src/data.
 *
 * Sitemapa jest zarazem listą tras dla scripts/prerender.mjs, więc każdy adres,
 * który trafia do indeksu, dostaje własny prerenderowany plik HTML.
 *
 * Uruchamiane automatycznie przez `npm run build`.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const BAZA = 'https://alaskarp.pl';
const KORZEN = process.cwd();

const uslugi = (await import('../src/data/uslugi.js')).default;
const artykuly = (await import('../src/data/blogArticles.js')).default;

const dzis = new Date().toISOString().slice(0, 10);

const trasy = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  // Strony usługowe tuż za stroną główną: to one mają przejąć frazy typu
  // „montaż klimatyzacji Racibórz", na których dotąd rankowała strona główna.
  ...uslugi.map((u) => ({ loc: `/${u.slug}`, priority: '0.9', changefreq: 'monthly' })),
  { loc: '/realizacje', priority: '0.8', changefreq: 'weekly' },
  { loc: '/blog', priority: '0.7', changefreq: 'weekly' },
  ...artykuly.map((a) => ({ loc: `/blog/${a.slug}`, priority: '0.6', changefreq: 'monthly' })),
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...trasy.map((t) =>
    [
      '  <url>',
      `    <loc>${BAZA}${t.loc}</loc>`,
      `    <lastmod>${dzis}</lastmod>`,
      `    <changefreq>${t.changefreq}</changefreq>`,
      `    <priority>${t.priority}</priority>`,
      '  </url>',
    ].join('\n'),
  ),
  '</urlset>',
  '',
].join('\n');

const cel = path.join(KORZEN, 'public', 'sitemap.xml');
fs.writeFileSync(cel, xml, 'utf8');

const odmiana = (n, jeden, dwaCztery, piec) => {
  if (n === 1) return jeden;
  const r10 = n % 10;
  const r100 = n % 100;
  return r10 >= 2 && r10 <= 4 && !(r100 >= 12 && r100 <= 14) ? dwaCztery : piec;
};
console.log(
  `[sitemap] ${trasy.length} ${odmiana(trasy.length, 'adres', 'adresy', 'adresów')} ` +
    `(w tym ${uslugi.length} stron usługowych) -> public/sitemap.xml`,
);
