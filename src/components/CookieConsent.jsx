import { useState, useEffect } from 'react';
import './CookieConsent.css';

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [showCookieDetails, setShowCookieDetails] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const [preferences, setPreferences] = useState({
        necessary: true,
        functional: false,
        statistical: false,
        marketing: false,
    });

    useEffect(() => {
        setIsMounted(true);
        const consent = localStorage.getItem('alaska_cookie_consent');
        if (!consent) {
            // Slight delay before showing banner for better UX
            const timer = setTimeout(() => setShowBanner(true), 1000);
            return () => clearTimeout(timer);
        } else {
            try {
                const parsed = JSON.parse(consent);
                // Ensure necessary is always true even if tampered
                setPreferences({ ...parsed, necessary: true });
            } catch (e) {
                console.error("Cookie parsing error", e);
                setShowBanner(true);
            }
        }
    }, []);

    const saveConsent = (prefs) => {
        localStorage.setItem('alaska_cookie_consent', JSON.stringify(prefs));
        setPreferences(prefs);
        setShowBanner(false);
        setShowModal(false);
    };

    const handleAcceptAll = () => {
        saveConsent({ necessary: true, functional: true, statistical: true, marketing: true });
    };

    const handleRejectAll = () => {
        saveConsent({ necessary: true, functional: false, statistical: false, marketing: false });
    };

    const togglePreference = (key) => {
        if (key === 'necessary') return;
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const openModal = () => {
        setShowBanner(false);
        setShowModal(true);
    };

    // Wait for mount to prevent hydration mismatch issues if SSR (though this is Vite SPA, it's good practice)
    if (!isMounted) return null;

    return (
        <>
            {/* Discrete revist button */}
            {!showBanner && !showModal && (
                <button
                    className="cookie-revisit-btn"
                    onClick={openModal}
                    aria-label="Ustawienia prywatności"
                    title="Zarządzaj plikami cookie"
                >
                    <i className="fa-solid fa-cookie-bite"></i>
                </button>
            )}

            {/* Bottom Banner */}
            <div className={`cookie-banner ${showBanner ? 'visible' : ''}`}>
                <div className="cookie-banner-content">
                    <div className="cookie-banner-text">
                        <div className="cookie-banner-header">
                            <i className="fa-solid fa-shield-halved"></i>
                            <h4>Cenimy Twoją prywatność</h4>
                        </div>
                        <p>
                            Używamy plików cookie i podobnych technologii, aby zapewnić prawidłowe działanie strony,
                            analizować ruch i personalizować treści. Możesz zaakceptować wszystkie pliki cookie
                            lub dostosować swoje ustawienia prywatności.
                        </p>
                    </div>
                    <div className="cookie-banner-actions">
                        <button className="btn-cookie btn-cookie-accept" onClick={handleAcceptAll}>Akceptuj wszystkie</button>
                        <button className="btn-cookie btn-cookie-settings" onClick={openModal}>Ustawienia</button>
                        <button className="btn-cookie btn-cookie-reject" onClick={handleRejectAll}>Tylko niezbędne</button>
                    </div>
                </div>
            </div>

            {/* Detailed Modal Overlay */}
            <div className={`cookie-modal-overlay ${showModal ? 'visible' : ''}`}>
                <div className="cookie-modal">
                    <div className="cookie-modal-header">
                        <div className="cookie-modal-title">
                            <div className="cookie-logo-icon">
                                <i className="fa-solid fa-snowflake"></i>
                            </div>
                            <h3>Ty kontrolujesz swoje dane</h3>
                        </div>
                        <button className="cookie-modal-close" onClick={() => {
                            if (!localStorage.getItem('alaska_cookie_consent')) {
                                setShowBanner(true);
                            }
                            setShowModal(false);
                        }}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <div className="cookie-modal-body">
                        <p className="cookie-modal-intro">
                            Wraz z naszymi partnerami korzystamy z technologii, w tym z plików cookie, aby
                            gromadzić informacje o Tobie w różnych celach. Klikając "Akceptuję wszystkie",
                            wyrażasz zgodę na wszystkie wymienione cele. Możesz także określić konkretne cele,
                            używając przełączników poniżej i klikając "Zapisz ustawienia".
                        </p>

                        <div className="cookie-categories">
                            <div className="cookie-category">
                                <div className="cookie-category-header">
                                    <div className="cookie-category-title">
                                        <h4>Absolutnie niezbędne</h4>
                                        <span className="cookie-badge always-active">Zawsze aktywne</span>
                                    </div>
                                    <label className="cookie-switch disabled">
                                        <input type="checkbox" checked={preferences.necessary} disabled />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <p className="cookie-category-desc">
                                    Te pliki cookie o charakterze absolutnie niezbędnym ułatwiają nawigację,
                                    aktywując podstawowe funkcje, jak nawigacja na stronie i dostęp do zabezpieczonych
                                    obszarów witryny. Bez takich plików witryna nie jest w stanie działać poprawnie.
                                </p>
                            </div>

                            <div className="cookie-category">
                                <div className="cookie-category-header">
                                    <div className="cookie-category-title">
                                        <h4>Funkcjonalne</h4>
                                    </div>
                                    <label className="cookie-switch">
                                        <input
                                            type="checkbox"
                                            checked={preferences.functional}
                                            onChange={() => togglePreference('functional')}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <p className="cookie-category-desc">
                                    Funkcjonalne pliki cookie ułatwiają zapisywanie informacji, która zmienia wygląd
                                    lub działanie witryny. Na przykład wybrany język, region lub zaawansowane
                                    preferencje interfejsu.
                                </p>
                            </div>

                            <div className="cookie-category">
                                <div className="cookie-category-header">
                                    <div className="cookie-category-title">
                                        <h4>Statystyka</h4>
                                    </div>
                                    <label className="cookie-switch">
                                        <input
                                            type="checkbox"
                                            checked={preferences.statistical}
                                            onChange={() => togglePreference('statistical')}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <p className="cookie-category-desc">
                                    Dzięki zbieraniu i raportowaniu informacji statystyczne pliki cookie pomagają
                                    właścicielowi strony zrozumieć interakcje odwiedzających z witryną w celu
                                    ciągłego ulepszania usług.
                                </p>
                            </div>

                            <div className="cookie-category">
                                <div className="cookie-category-header">
                                    <div className="cookie-category-title">
                                        <h4>Reklamy</h4>
                                    </div>
                                    <label className="cookie-switch">
                                        <input
                                            type="checkbox"
                                            checked={preferences.marketing}
                                            onChange={() => togglePreference('marketing')}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <p className="cookie-category-desc">
                                    Pliki reklamowe służą do śledzenia użytkowników w witrynach. Ich celem jest
                                    wyświetlanie reklam dostosowanych do potrzeb i interesujących dla użytkownika
                                    indywidualnego, a tym samym bardziej cennych z punktu widzenia wydawców.
                                </p>
                            </div>
                        </div>

                        <div className="cookie-links">
                            <button className="cookie-link-btn" onClick={() => setShowPrivacyPolicy(true)}>Polityka prywatności</button>
                            <span className="separator">•</span>
                            <button className="cookie-link-btn" onClick={() => setShowCookieDetails(true)}>Szczegóły plików cookie</button>
                        </div>
                    </div>

                    <div className="cookie-modal-footer">
                        <button className="btn-cookie btn-cookie-reject" onClick={() => saveConsent(preferences)}>Zapisz ustawienia</button>
                        <div className="cookie-footer-actions">
                            <button className="btn-cookie btn-cookie-reject-all" onClick={handleRejectAll}>Odrzuć wszystkie</button>
                            <button className="btn-cookie btn-cookie-accept" onClick={handleAcceptAll}>Akceptuj wszystkie</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Privacy Policy Sub-Modal */}
            <div className={`cookie-submodal-overlay ${showPrivacyPolicy ? 'visible' : ''}`}>
                <div className="cookie-submodal">
                    <div className="cookie-modal-header">
                        <h3>Polityka prywatności</h3>
                        <button className="cookie-modal-close" onClick={() => setShowPrivacyPolicy(false)} aria-label="Wróć">
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                    </div>
                    <div className="cookie-modal-body submodal-content">
                        <h4>1. Administrator Danych</h4>
                        <p>Administratorem Twoich danych osobowych jest Rafał Paszczyński prowadzący działalność pod nazwą "Alaska" Klimatyzacja i Chłodnictwo z siedzibą w Raciborzu.</p>

                        <h4>2. Cele Przetwarzania</h4>
                        <p>Twoje dane przetwarzane są w celu m.in.: realizacji usług serwisowych i montażowych, kontaktu z klientem, celów analitycznych oraz marketingowych (za Twoją wyraźną zgodą).</p>

                        <h4>3. Twoje Prawa</h4>
                        <p>Przysługuje Ci pełne prawo dostępu do zawartości swoich danych osobowych, prawo ich sprostowania, usunięcia, ograniczenia przetwarzania, prawo wniesienia sprzeciwu oraz prawo do przenoszenia danych.</p>

                        <h4>4. Kontakt w sprawach RODO</h4>
                        <p>We wszystkich sprawach związanych z ochroną danych osobowych prosimy o kontakt pod adresem e-mail: <strong>alaskarp@tlen.pl</strong></p>
                    </div>
                </div>
            </div>

            {/* Cookie Details Sub-Modal */}
            <div className={`cookie-submodal-overlay ${showCookieDetails ? 'visible' : ''}`}>
                <div className="cookie-submodal">
                    <div className="cookie-modal-header">
                        <h3>Szczegóły plików cookie</h3>
                        <button className="cookie-modal-close" onClick={() => setShowCookieDetails(false)} aria-label="Wróć">
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                    </div>
                    <div className="cookie-modal-body submodal-content">
                        <p className="cookie-modal-intro">Poniżej znajduje się szczegółowa lista plików cookie używanych w naszej witrynie w poszczególnych kategoriach.</p>

                        <div className="cookie-detail-section">
                            <h4>Niezbędne (Zawsze włączone)</h4>
                            <ul>
                                <li><strong>alaska_cookie_consent:</strong> Zapamiętuje Twoje preferencje dotyczące plików cookie. Ważność: 1 rok.</li>
                            </ul>
                        </div>

                        <div className="cookie-detail-section">
                            <h4>Funkcjonalne</h4>
                            <ul>
                                <li><strong>Brak specyficznych plików:</strong> W standardowej konfiguracji nie instalujemy dodatkowych plików funkcjonalnych. Miejsce to jest zarezerwowane na ewentualne zapamiętywanie ustawień UI.</li>
                            </ul>
                        </div>

                        <div className="cookie-detail-section">
                            <h4>Statystyczne</h4>
                            <ul>
                                <li><strong>_ga, _gid (Google Analytics):</strong> Służą do rozróżniania unikalnych użytkowników i zbierania anonimowych danych o ruchu. Ważność: _ga (2 lata), _gid (24 godziny).</li>
                            </ul>
                        </div>

                        <div className="cookie-detail-section">
                            <h4>Reklamowe</h4>
                            <ul>
                                <li><strong>_fbp (Meta/Facebook Pixel):</strong> Służy do celów remarketingu i śledzenia konwersji ze spersonalizowanych kampanii reklamowych. Ważność: 3 miesiące.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
