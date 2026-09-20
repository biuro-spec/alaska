// SEO per strona — React 19 wynosi <title>/<meta>/<link> z komponentu do <head>.
//
// PO CO: do 09.2026 cały serwis miał jeden <head> z index.html, w tym canonical
// wbity na sztywno na "https://alaskarp.pl/". Każdy artykuł bloga, /realizacje
// i każdy stary adres /pl/* mówił Google „jestem kopią strony głównej" —
// w Search Console strona główna brała 92 z 96 kliknięć, reszta serwisu 4.
//
// Duplikaty tagów (ten z powłoki index.html + ten z komponentu) sprząta
// scripts/prerender.mjs; w przeglądarce React trzyma jedną kopię sam.

const SITE = 'Alaska — Chłodnictwo i Klimatyzacja';
const BASE = 'https://alaskarp.pl';
const OG_DEFAULT = `${BASE}/og-image.png`;

const Seo = ({ title, description, path = '/', image, jsonLd, noindex = false }) => {
  const url = `${BASE}${path}`;
  const obraz = image ? (image.startsWith('http') ? image : `${BASE}${image}`) : OG_DEFAULT;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:site_name" content={SITE} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={obraz} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={obraz} />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
};

export default Seo;
