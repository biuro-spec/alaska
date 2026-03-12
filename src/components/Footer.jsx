import { memo } from 'react';
import { Link } from 'react-router-dom';

const MAPS_LINK = 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x471169338e7a89a9:0xeb85eba41038e5aa';
const FB_LINK = 'https://www.facebook.com/alaska.raciborz.3';

const Footer = memo(() => (
    <footer className="footer">
        <div className="container">
            {/* Main footer grid */}
            <div className="footer-grid">
                {/* Brand column */}
                <div className="footer-brand">
                    <div className="footer-logo">
                        <div className="logo-glass">
                            <img src="/logo.webp" alt="Alaska Logo" className="logo-img" />
                        </div>
                    </div>
                    <p className="footer-desc">
                        Twój ekspert od chłodnictwa i klimatyzacji w Raciborzu od 1997 roku.
                        Montaż, serwis i doradztwo — profesjonalnie i z gwarancją.
                    </p>
                    <div className="footer-social">
                        <a href={FB_LINK} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-link">
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" aria-label="Google Maps" className="footer-social-link">
                            <i className="fa-solid fa-map-location-dot"></i>
                        </a>
                        <a href="tel:607044336" aria-label="Telefon" className="footer-social-link">
                            <i className="fa-solid fa-phone"></i>
                        </a>
                        <a href="mailto:alaskarp@tlen.pl" aria-label="Email" className="footer-social-link">
                            <i className="fa-solid fa-envelope"></i>
                        </a>
                    </div>
                </div>

                {/* Quick links */}
                <div className="footer-col">
                    <h4 className="footer-heading">Nawigacja</h4>
                    <nav className="footer-nav">
                        <a href="#o-firmie">O firmie</a>
                        <a href="/#oferta-klimatyzacja">Oferta</a>
                        <a href="#salon">Salon</a>
                        <Link to="/blog">Blog</Link>
                        <a href="#kontakt">Kontakt</a>
                    </nav>
                </div>

                {/* Services */}
                <div className="footer-col">
                    <h4 className="footer-heading">Usługi</h4>
                    <nav className="footer-nav">
                        <a href="/#oferta-klimatyzacja">Klimatyzacja</a>
                        <a href="/#oferta-chlodnictwo">Chłodnictwo</a>
                        <a href="/#oferta-pompy">Pompy ciepła</a>
                        <a href="/#oferta-serwis">Serwis i montaż</a>
                    </nav>
                </div>

                {/* Contact info */}
                <div className="footer-col">
                    <h4 className="footer-heading">Kontakt</h4>
                    <div className="footer-contact-list">
                        <div className="footer-contact-item">
                            <i className="fa-solid fa-phone"></i>
                            <div>
                                <span className="footer-contact-label">Serwis / Właściciel</span>
                                <a href="tel:607044336">607 044 336</a>
                            </div>
                        </div>
                        <div className="footer-contact-item">
                            <i className="fa-solid fa-headset"></i>
                            <div>
                                <span className="footer-contact-label">Salon sprzedaży</span>
                                <a href="tel:607376336">607 376 336</a>
                            </div>
                        </div>
                        <div className="footer-contact-item">
                            <i className="fa-solid fa-envelope"></i>
                            <div>
                                <span className="footer-contact-label">Email</span>
                                <a href="mailto:alaskarp@tlen.pl">alaskarp@tlen.pl</a>
                            </div>
                        </div>
                        <div className="footer-contact-item">
                            <i className="fa-solid fa-location-dot"></i>
                            <div>
                                <span className="footer-contact-label">Adres</span>
                                <span>ul. Bosacka 52, Racibórz</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Alaska Rafał Paszczyński. Wszystkie prawa zastrzeżone.</p>
                <div className="footer-attribution">
                    <span>Stworzone z pasją dla Alaska-RP przez </span>
                    <a href="https://webstudio47.pl" target="_blank" rel="noopener noreferrer" className="webstudio-link">
                        <span className="webstudio-logo-branded">
                            &lt;WebStudio<span className="digit-highlight">47</span>&gt;
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </footer>
));

Footer.displayName = 'Footer';
export default Footer;
