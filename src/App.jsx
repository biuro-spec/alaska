import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'

// Component Imports
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import Salon from './components/Salon'
import About from './components/About'
import FAQ from './components/FAQ'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import BlogPage from './components/BlogPage'
import BlogArticle from './components/BlogArticle'
import IntroScreen from './components/IntroScreen'
import BlogSection from './components/BlogSection'
import CookieConsent from './components/CookieConsent';

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
  const location = useLocation();
  const isBlog = location.pathname !== '/';

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="logo" aria-label="Alaska RP Logo" onClick={closeMenu}>
          <div className="logo-glass">
            <img src="/logo.png" alt="Alaska Logo" className="logo-img" />
          </div>
        </Link>
        <div className={`nav-links ${menuOpen ? 'nav-links-visible' : ''}`}>
          <NavLink hash="#o-firmie" onClick={closeMenu}>O firmie</NavLink>
          <NavLink hash="#oferta" onClick={closeMenu}>Oferta</NavLink>
          <NavLink hash="#salon" onClick={closeMenu}>Salon</NavLink>
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

function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <Services />
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
                <p>ul. Rudzka 53/18, Racibórz</p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
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

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
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
      {showIntro && <IntroScreen onEnter={() => setShowIntro(false)} />}
      <HashScrollHandler />
      <Navigation scrolled={scrolled} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
      </Routes>

      <Footer />
      <CookieConsent />
      <FloatingButtons visible={scrolled} />
    </div>
  )
}

export default App
