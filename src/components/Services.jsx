import { memo, useState, useEffect, useCallback } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const services = [
    {
        icon: "fa-wind",
        title: "Klimatyzacja Racibórz",
        desc: "Montaż i serwis klimatyzacji dla domu i biura. Autoryzowany partner LG, Rotenso oraz Mitsubishi.",
        fullDesc: "Oferujemy kompleksowy montaż klimatyzacji w Raciborzu i na całym Śląsku. Jako autoryzowany partner marek LG, Rotenso oraz Mitsubishi, zapewniamy nowoczesne systemy split i multi-split z funkcją grzania i jonizacji powietrza. Darmowa wycena i dobór mocy u klienta.",
        features: ["Montaż klimatyzacji ściennej i kasetonowej", "Systemy multi-split do wielu pomieszczeń", "Klimatyzatory z funkcją grzania (pompy powietrze-powietrze)", "Energooszczędne modele inwerterowe A+++", "Bezpłatna wizja lokalna i profesjonalny projekt"]
    },
    {
        icon: "fa-temperature-arrow-down",
        title: "Chłodnictwo Przemysłowe",
        desc: "Budowa komór chłodniczych i mroźniczych. Serwis agregatów Bitzer i Danfoss.",
        fullDesc: "Specjalizujemy się w profesjonalnym chłodnictwie dla gastronomii, handlu i przemysłu. Projektujemy i budujemy komory chłodnicze oraz mroźnicze w oparciu o niezawodne komponenty Bitzer i Danfoss. Zapewniamy szybki serwis gwarancyjny i pogwarancyjny.",
        features: ["Komory chłodnicze i mroźnicze na wymiar", "Agregaty skraplające i sprężarki przemysłowe", "Instalacje chłodnicze dla sklepów i hurtowni", "Systemy schładzania procesowego", "Przeglądy okresowe i serwis 24/7"]
    },
    {
        icon: "fa-tools",
        title: "Serwis i Konserwacja",
        desc: "Profesjonalny serwis klimatyzacji i chłodnictwa. Pomiary szczelności i odgrzybianie.",
        fullDesc: "Zapewniamy regularną konserwację urządzeń chłodniczych i klimatyzacyjnych, co gwarantuje ich dłuższą żywotność i mniejsze zużycie energii. Posiadamy uprawnienia F-gazowe. Wykonujemy odgrzybianie, czyszczenie parowników oraz uzupełnianie czynnika chłodniczego.",
        features: ["Okresowe przeglądy klimatyzacji", "Naprawa agregatów chłodniczych", "Dezynfekcja i odgrzybianie metodą ultradźwiękową", "Pomiary efektywności i szczelności układów", "Dojazd serwisu na terenie województwa śląskiego"]
    },
    {
        icon: "fa-box-open",
        title: "Wypożyczalnia Klimatyzatorów",
        desc: "Wynajem mobilnych jednostek chłodzących. Idealne rozwiązanie na eventy i upały.",
        fullDesc: "Oferujemy wynajem klimatyzatorów przenośnych o dużej wydajności. To doskonałe rozwiązanie dla biur, serwerowni oraz na imprezy okolicznościowe. Oferujemy transport, montaż rury odprowadzającej ciepło oraz szkolenie z obsługi.",
        features: ["Klimatyzatory przenośne od 3.5 do 15 kW", "Wynajem krótko- i długoterminowy", "Urządzenia gotowe do pracy w 5 minut", "Obsługa eventów, wesel i namiotów", "Możliwość wykupu sprzętu po sezonie"]
    },
    {
        icon: "fa-virus-slash",
        title: "Oczyszczacze i Wentylacja",
        desc: "Czyste powietrze bez smogu i alergenów. Systemy rekuperacji dla domów.",
        fullDesc: "Dbamy o jakość powietrza, którym oddychasz. Oferujemy profesjonalne oczyszczacze powietrza z filtrami HEPA oraz systemy wentylacji mechanicznej z odzyskiem ciepła (rekuperacja). Skuteczna walka z PM2.5, pyłkami i drobnoustrojami.",
        features: ["Wydajne oczyszczacze powietrza z nawilżaniem", "Systemy rekuperacji (wentylacja mechaniczna)", "Profesjonalne filtry węglowe i HEPA", "Pomiary jakości powietrza w pomieszczeniach", "Doradztwo w zakresie poprawy mikroklimatu"]
    },
    {
        icon: "fa-leaf",
        title: "Pompy Ciepła",
        desc: "Ekologiczne ogrzewanie budynków. Pomoc w uzyskaniu dofinansowania Czyste Powietrze.",
        fullDesc: "Montujemy nowoczesne pompy ciepła powietrze-woda, które stanowią ekologiczną alternatywę dla kotłów węglowych i gazowych. Pomagamy w doborze odpowiedniego systemu oraz przygotowujemy dokumentację do programów dotacyjnych.",
        features: ["Pompy ciepła powietrze-woda uznanych marek", "Modernizacja kotłowni na systemy hybrydowe", "Integracja z fotowoltaiką", "Pomoc w dotacjach Czyste Powietrze", "Serwis i monitoring pracy układu"]
    }
];

/* Frost particles floating inside the section */
const FrostParticles = memo(() => {
    const particles = Array.from({ length: 20 }, (_, i) => {
        const size = 3 + Math.random() * 8;
        const left = Math.random() * 100;
        const delay = Math.random() * 12;
        const duration = 8 + Math.random() * 10;
        const opacity = 0.15 + Math.random() * 0.3;
        return (
            <div
                key={i}
                className="frost-particle"
                style={{
                    width: size,
                    height: size,
                    left: `${left}%`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    opacity
                }}
            />
        );
    });
    return <div className="frost-particles">{particles}</div>;
});
FrostParticles.displayName = 'FrostParticles';

/* Service detail modal */
const ServiceModal = memo(({ service, onClose }) => {
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
        };
    }, [onClose]);

    return (
        <div className="service-modal-backdrop" onClick={onClose}>
            <div className="service-modal" onClick={e => e.stopPropagation()}>
                <button className="service-modal-close" onClick={onClose} aria-label="Zamknij">
                    <i className="fa-solid fa-xmark"></i>
                </button>

                <div className="service-modal-frost-edge" />

                <div className="service-modal-header">
                    <div className="service-modal-icon">
                        <i className={`fa-solid ${service.icon}`}></i>
                    </div>
                    <h3>{service.title}</h3>
                </div>

                <p className="service-modal-desc">{service.fullDesc}</p>

                <ul className="service-modal-features">
                    {service.features.map((f, i) => (
                        <li key={i}>
                            <i className="fa-solid fa-snowflake"></i>
                            <span>{f}</span>
                        </li>
                    ))}
                </ul>

                <a href="#kontakt" className="btn btn-primary service-modal-cta" onClick={onClose}>
                    <i className="fa-solid fa-envelope"></i> Zapytaj o wycenę
                </a>
            </div>
        </div>
    );
});
ServiceModal.displayName = 'ServiceModal';

const Services = memo(() => {
    const [ref, isVisible] = useScrollAnimation({ once: true });
    const [activeService, setActiveService] = useState(null);
    const closeModal = useCallback(() => {
        setActiveService(null);
        history.replaceState('', document.title, window.location.pathname + window.location.search);
    }, []);


    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            const map = {
                '#oferta-klimatyzacja': 'Klimatyzacja Racibórz',
                '#oferta-chlodnictwo': 'Chłodnictwo Przemysłowe',
                '#oferta-pompy': 'Pompy Ciepła',
                '#oferta-serwis': 'Serwis i Konserwacja',
            };
            
            if (map[hash]) {
                const targetService = services.find(s => s.title === map[hash]);
                if (targetService) {
                    setActiveService(targetService);
                    setTimeout(() => {
                        const el = document.getElementById('oferta');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            }
        };

        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);


    return (
        <section id="oferta" className="services services-frost" ref={ref}>
            <FrostParticles />
            <div className="frost-glow frost-glow-top" />
            <div className="frost-glow frost-glow-bottom" />

            <div className="container">
                <div className={`section-header reveal ${isVisible ? 'reveal-visible' : ''}`}>
                    <h2><i className="fa-regular fa-snowflake frost-header-icon"></i> Klimatyzacja, chłodnictwo i pompy ciepła</h2>
                    <p>Profesjonalny dobór, montaż i serwis urządzeń klimatyzacyjnych w Raciborzu i na Śląsku.</p>
                </div>
                <div className="services-grid">
                    {services.map((s, i) => (
                        <div
                            key={i}
                            className={`service-card frost-card reveal reveal-delay-${(i % 3) + 1} ${isVisible ? 'reveal-visible' : ''}`}
                        >
                            <div className="frost-card-shine" />
                            <div className="service-icon"><i className={`fa-solid ${s.icon}`}></i></div>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                            <button
                                className="btn-read-more"
                                onClick={() => setActiveService(s)}
                            >
                                Czytaj więcej <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {activeService && <ServiceModal service={activeService} onClose={closeModal} />}
        </section>
    );
});

Services.displayName = 'Services';
export default Services;
