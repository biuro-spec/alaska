import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import uslugi, { znajdzUsluge, TELEFON, TELEFON_TEL, EMAIL } from '../data/uslugi';
import Seo from '../components/Seo';

const BASE = 'https://alaskarp.pl';

const idNaglowka = (tekst) =>
  tekst
    .toLowerCase()
    .replace(/ą/g, 'a').replace(/ć/g, 'c').replace(/ę/g, 'e').replace(/ł/g, 'l')
    .replace(/ń/g, 'n').replace(/ó/g, 'o').replace(/ś/g, 's').replace(/ź|ż/g, 'z')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

/**
 * Strona pojedynczej usługi.
 *
 * Treść leci w HTML od razu, bez modala i bez kliknięcia — inaczej niż w
 * Services.jsx na stronie głównej, gdzie opisy usług renderują się dopiero
 * po otwarciu okna i nigdy nie trafiły do indeksu Google.
 */
const Usluga = ({ slug: slugZTrasy }) => {
  // Trasy usługowe są wypisane jawnie w App.jsx (path="/montaz-klimatyzacji-raciborz"),
  // więc useParams nie ma czego zwrócić — slug przychodzi propsem.
  const { slug: slugZParametru } = useParams();
  const slug = slugZTrasy ?? slugZParametru;
  const usluga = znajdzUsluge(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!usluga) {
    return (
      <div className="blog-page">
        <Seo
          title="Nie znaleziono strony | Alaska Racibórz"
          description="Taka strona nie istnieje. Wróć na stronę główną Alaska — klimatyzacja i chłodnictwo w Raciborzu."
          path={`/${slug}`}
          noindex
        />
        <section className="blog-hero">
          <div className="container">
            <div className="hero-glass-card blog-hero-glass">
              <h1>Nie znaleziono strony</h1>
              <p className="blog-hero-desc">
                Taka usługa nie figuruje w naszej ofercie. <Link to="/">Wróć na stronę główną</Link>.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const url = `${BASE}/${usluga.slug}`;
  const powiazane = (usluga.powiazane || []).map(znajdzUsluge).filter(Boolean);

  // Trzy schematy naraz: usługa, okruszki i FAQ. FAQ jest tu istotny —
  // w Search Console raport „Wygląd w wyszukiwarce" jest pusty, czyli serwis
  // nie ma ani jednego wyniku rozszerzonego, mimo że treść jest w formie Q&A.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: usluga.h1,
        description: usluga.opis,
        url,
        serviceType: usluga.h1,
        areaServed: [
          { '@type': 'City', name: 'Racibórz' },
          { '@type': 'City', name: 'Kuźnia Raciborska' },
          { '@type': 'City', name: 'Wodzisław Śląski' },
          { '@type': 'City', name: 'Kędzierzyn-Koźle' },
          { '@type': 'City', name: 'Rybnik' },
        ],
        provider: {
          '@type': 'HVACBusiness',
          '@id': `${BASE}/#firma`,
          name: 'Alaska — Chłodnictwo i Klimatyzacja',
          telephone: TELEFON_TEL,
          email: EMAIL,
          url: BASE,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Strona główna', item: BASE },
          { '@type': 'ListItem', position: 2, name: usluga.h1, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: usluga.faq.map((p) => ({
          '@type': 'Question',
          name: p.q,
          acceptedAnswer: { '@type': 'Answer', text: p.a },
        })),
      },
    ],
  };

  return (
    <div className="blog-page usluga-page">
      <Seo title={usluga.tytul} description={usluga.opis} path={`/${usluga.slug}`} jsonLd={jsonLd} />

      <section className="blog-hero blog-article-hero usluga-hero">
        <div className="container">
          <div className="hero-glass-card blog-hero-glass">
            <nav className="blog-breadcrumb" aria-label="Ścieżka nawigacji">
              <Link to="/">Strona główna</Link>
              <span className="breadcrumb-sep">/</span>
              <span>{usluga.h1}</span>
            </nav>
            <span className="blog-article-category">
              <i className={`fa-solid ${usluga.ikona}`}></i> Oferta
            </span>
            <h1>{usluga.h1}</h1>
            <p className="blog-hero-desc">{usluga.lead}</p>
            <div className="usluga-hero-akcje">
              <a href={`tel:${TELEFON_TEL}`} className="btn btn-primary">
                <i className="fa-solid fa-phone"></i> {TELEFON}
              </a>
              <Link to="/#kontakt" className="btn btn-secondary">
                <i className="fa-solid fa-envelope"></i> Bezpłatna wycena
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-article-content">
        <div className="container blog-article-layout">
          <aside className="blog-sidebar">
            <div className="blog-toc">
              <h4>Na tej stronie</h4>
              <ul>
                {usluga.sekcje.map((s) => (
                  <li key={s.naglowek}>
                    <a href={`#${idNaglowka(s.naglowek)}`}>{s.naglowek}</a>
                  </li>
                ))}
                <li><a href="#pytania">Częste pytania</a></li>
              </ul>
            </div>

            <div className="blog-toc usluga-toc-uslugi">
              <h4>Pozostałe usługi</h4>
              <ul>
                {uslugi
                  .filter((u) => u.slug !== usluga.slug)
                  .map((u) => (
                    <li key={u.slug}>
                      <Link to={`/${u.slug}`}>{u.h1}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>

          <div className="blog-article-main">
            <div className="blog-rich-content">
              {usluga.wstep.map((p, i) => (
                <p key={i} className="blog-rich-paragraph usluga-wstep">{p}</p>
              ))}

              <ul className="usluga-cechy">
                {usluga.cechy.map((c) => (
                  <li key={c}>
                    <i className="fa-solid fa-snowflake"></i>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              {usluga.sekcje.map((s) => (
                <div key={s.naglowek}>
                  <h2 id={idNaglowka(s.naglowek)} className="blog-rich-heading">{s.naglowek}</h2>
                  {s.tresc.map((p, i) => (
                    <p key={i} className="blog-rich-paragraph">{p}</p>
                  ))}
                </div>
              ))}

              <h2 id="pytania" className="blog-rich-heading">Częste pytania</h2>
              {usluga.faq.map((p) => (
                <div key={p.q} className="usluga-faq">
                  <h3 className="usluga-faq-pytanie">{p.q}</h3>
                  <p className="blog-rich-paragraph">{p.a}</p>
                </div>
              ))}
            </div>

            <div className="blog-article-cta">
              <h3>Bezpłatna wycena w Raciborzu i okolicy</h3>
              <p>
                Przyjeżdżamy, mierzymy i podajemy cenę końcową — bez zobowiązania.
                Zadzwoń pod <a href={`tel:${TELEFON_TEL}`}>{TELEFON}</a> albo napisz na{' '}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>
              <a href={`tel:${TELEFON_TEL}`} className="btn btn-primary">
                <i className="fa-solid fa-phone"></i> Zadzwoń teraz
              </a>
            </div>

            {powiazane.length > 0 && (
              <div className="blog-related">
                <h3>Zobacz także</h3>
                <div className="blog-related-grid">
                  {powiazane.map((u) => (
                    <Link key={u.slug} to={`/${u.slug}`} className="blog-related-card">
                      <span className="blog-article-category">
                        <i className={`fa-solid ${u.ikona}`}></i> Oferta
                      </span>
                      <h4>{u.h1}</h4>
                      <p>{u.lead}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Usluga;
