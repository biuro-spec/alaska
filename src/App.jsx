import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import Seo from './components/Seo'
import uslugi, { TELEFON_TEL, EMAIL } from './data/uslugi'
import PYTANIA from './data/faq'

// Critical components (above the fold)
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Services from './components/Services'
import Footer from './components/Footer'

// Lazy-loaded components (below the fold / route-based)
const BlogSection = lazy(() => import('./components/BlogSection'))
const Salon = lazy(() => import('./components/Salon'))
const FAQ = lazy(() => import('./components/FAQ'))
const ContactForm = lazy(() => import('./components/ContactForm'))
const BlogPage = lazy(() => import('./components/BlogPage'))
const BlogArticle = lazy(() => import('./components/BlogArticle'))
const Realizacje = lazy(() => import('./pages/Realizacje'))
const Usluga = lazy(() => import('./pages/Usluga'))
const IntroScreen = lazy(() => import('./components/IntroScreen'))
const CookieConsent = lazy(() => import('./components/CookieConsent'))

const FloatingButtons = ({ visible }) => (
  <div className={`floating-btns ${visible ? 'floating-btns-visible' : ''}`}>
    <a href="tel:607044336" className="floating-btn floating-btn-phone" aria-label="Zadzwoń">
      <i className="fa-solid fa-phone"></i>
    </a>
    <button
      className="floating-btn floating-btn-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Powrót na górę"
    >
      <i className="fa-solid fa-chevron-up"></i>
    </button>
  </div>
);

const NavLink = ({ hash, children, onClick }) => {
  const location = useLocation();
  const isBlog = location.pathname !== '/';

  if (isBlog) {
    return <Link to={`/${hash}`} onClick={onClick}>{children}</Link>;
  }
  return <a href={hash} onClick={onClick}>{children}</a>;
};

const Navigation = ({ scrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="logo" aria-label="Alaska RP Logo" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <div className="logo-glass">
            <img src="/logo.webp" alt="Alaska Logo" className="logo-img" width="48" height="48" decoding="async" />
          </div>
        </Link>
        <div className={`nav-links ${menuOpen ? 'nav-links-visible' : ''}`}>
          <NavLink hash="#o-firmie" onClick={closeMenu}>O firmie</NavLink>
          <NavLink hash="#oferta" onClick={closeMenu}>Oferta</NavLink>
          <NavLink hash="#salon" onClick={closeMenu}>Salon</NavLink>
          <Link to="/realizacje" onClick={closeMenu}>Realizacje</Link>
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
          <NavLink hash="#kontakt" onClick={closeMenu}>Kontakt</NavLink>
          <a href="tel:607044336" className="mobile-phone-link" onClick={closeMenu}>
            <i className="fa-solid fa-phone"></i> 607 044 336
          </a>
        </div>
        <a href="tel:607044336" className="btn btn-primary nav-phone-btn" aria-label="Zadzwoń do nas">
          <span><i className="fa-solid fa-phone"></i> 607 044 336</span>
        </a>
        <button
          className={`hamburger ${menuOpen ? 'hamburger-active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      {menuOpen && <div className="menu-backdrop" onClick={closeMenu}></div>}
    </nav>
  );
};

// Dane firmy w jednym miejscu. Wcześniej schemat siedział w index.html z telefonem
// 607 044 336, podczas gdy sekcja Salon podaje 607 376 336 — rozjechany NAP
// (nazwa, adres, telefon) obniża pozycję w wynikach lokalnych, a katalogi
// branżowe podają jeszcze trzeci adres niż strona.
const FIRMA = {
  '@type': 'HVACBusiness',
  '@id': 'https://alaskarp.pl/#firma',
  name: 'Alaska — Chłodnictwo i Klimatyzacja',
  alternateName: 'Alaska Rafał Paszczyński',
  description: 'Montaż, serwis i wypożyczalnia klimatyzacji oraz chłodnictwo przemysłowe w Raciborzu od 1997 roku.',
  image: 'https://alaskarp.pl/og-image.png',
  logo: 'https://alaskarp.pl/logo.png',
  url: 'https://alaskarp.pl',
  telephone: TELEFON_TEL,
  email: EMAIL,
  priceRange: '$$',
  foundingDate: '1997',
  areaServed: ['Racibórz', 'Kuźnia Raciborska', 'Wodzisław Śląski', 'Kędzierzyn-Koźle', 'Rybnik', 'Śląsk'],
  sameAs: ['https://www.facebook.com/alaska.raciborz.3'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1 Maja 4',
    addressLocality: 'Racibórz',
    postalCode: '47-400',
    addressCountry: 'PL',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 50.0915, longitude: 18.2192 },
  contactPoint: [
    { '@type': 'ContactPoint', telephone: TELEFON_TEL, contactType: 'serwis', areaServed: 'PL', availableLanguage: 'pl' },
    { '@type': 'ContactPoint', telephone: '+48607376336', contactType: 'sprzedaż', areaServed: 'PL', availableLanguage: 'pl' },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  makesOffer: uslugi.map((u) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: u.h1, url: `https://alaskarp.pl/${u.slug}` },
  })),
};

const SCHEMAT_STRONY_GLOWNEJ = {
  '@context': 'https://schema.org',
  '@graph': [
    FIRMA,
    {
      '@type': 'WebSite',
      '@id': 'https://alaskarp.pl/#strona',
      url: 'https://alaskarp.pl',
      name: 'Alaska — Chłodnictwo i Klimatyzacja',
      inLanguage: 'pl-PL',
      publisher: { '@id': 'https://alaskarp.pl/#firma' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: PYTANIA.map((p) => ({
        '@type': 'Question',
        name: p.q,
        acceptedAnswer: { '@type': 'Answer', text: p.a },
      })),
    },
  ],
};

function HomePage() {
  return (
    <main>
      <Seo
        title="Klimatyzacja i chłodnictwo Racibórz — montaż i serwis | Alaska"
        description="Klimatyzacja, chłodnictwo i pompy ciepła w Raciborzu od 1997 roku. Montaż, serwis, wypożyczalnia. Bezpłatna wycena. Tel. 607 044 336."
        path="/"
        jsonLd={SCHEMAT_STRONY_GLOWNEJ}
      />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Suspense fallback={null}>
        <BlogSection />
        <Salon />
        <FAQ />

        <section id="kontakt" className="contact-light">
          <div className="container contact-grid-main">
            <div className="contact-text">
              <h2>Skontaktuj się z nami</h2>
              <p>Masz pytania? Chcesz zamówić darmową wycenę? Jesteśmy do Twojej dyspozycji.</p>

              <div className="contact-methods">
                <div className="method-card">
                  <i className="fa-solid fa-phone"></i>
                  <h3>Zadzwoń</h3>
                  <p>607 044 336</p>
                </div>
                <div className="method-card">
                  <i className="fa-solid fa-envelope"></i>
                  <h3>Napisz email</h3>
                  <p>alaskarp@tlen.pl</p>
                </div>
                <div className="method-card">
                  <i className="fa-solid fa-location-dot"></i>
                  <h3>Adres biura</h3>
                  <p>1 Maja 4 (przy SP Orlen), 47-400 Racibórz</p>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </Suspense>
    </main>
  );
}

function HashScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Small delay to let the page render before scrolling
      const timer = setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return null;
}

/**
 * Ekran powitalny pokazujemy TYLKO przy pierwszym wejściu na stronę główną
 * w danej sesji. Wcześniej zasłaniał treść przez 4 sekundy na każdym adresie,
 * także komuś, kto wszedł z Google prosto na stronę usługową — a to 60%
 * kliknięć z komórki, które najszybciej wracają do wyników.
 */
function czyPokazacIntro(sciezka) {
  if (sciezka !== '/') return false
  try {
    if (sessionStorage.getItem('alaska_intro') === '1') return false
  } catch {
    // Tryb prywatny albo zablokowane dane witryny — wtedy po prostu pokazujemy.
  }
  return true
}

function App() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [showIntro, setShowIntro] = useState(() => czyPokazacIntro(location.pathname))

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      try {
        sessionStorage.setItem('alaska_intro', '1')
      } catch {
        // Bez zapisu ekran pokaże się ponownie — to gorsze doświadczenie, nie błąd.
      }
    }
  }, [showIntro])

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50)
      })
    }
    // passive: true for performance (client-passive-event-listeners)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      {showIntro && <Suspense fallback={null}><IntroScreen onEnter={() => setShowIntro(false)} /></Suspense>}
      <HashScrollHandler />
      {!showIntro && <Navigation scrolled={scrolled} />}

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/realizacje" element={<Realizacje />} />
          {/* Trasy usługowe wypisane jawnie z danych, a nie jako "/:slug" —
              catch-all przechwytywałby też literówki i stare adresy, które
              mają się kończyć przekierowaniem 301 albo stroną 404. */}
          {uslugi.map((u) => (
            <Route key={u.slug} path={`/${u.slug}`} element={<Usluga slug={u.slug} />} />
          ))}
        </Routes>
      </Suspense>

      <Footer />
      <Suspense fallback={null}><CookieConsent /></Suspense>
      <FloatingButtons visible={scrolled} />
    </div>
  )
}

export default App
