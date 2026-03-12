import { memo } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const brands = [
    { name: "DANFOSS", desc: "Automatyka chłodnicza", url: "https://www.danfoss.com/pl-pl/" },
    { name: "LG", desc: "Klimatyzacja", url: "https://www.lg.com/pl/klimatyzacja" },
    { name: "MITSUBISHI", desc: "Pompy ciepła", url: "https://pl.mitsubishielectric.com/pl/" },
    { name: "BITZER", desc: "Sprężarki", url: "https://www.bitzer.de/" },
    { name: "ROTENSO", desc: "Klimatyzacja", url: "https://rotenso.com/pl/" },
];

const About = memo(() => {
    const [ref, isVisible] = useScrollAnimation({ once: true });

    return (
        <section id="o-firmie" className="about-light" ref={ref}>
            <div className="container">
                {/* Panoramic photo banner */}
                <div className={`about-hero-photo reveal ${isVisible ? 'reveal-visible' : ''}`}>
                    <img
                        src="https://common.v-manager.pl/uploads/images/websites/16/2f4f0de9f631d9fa45e88009a233e8ea-822293001618228852.jpg"
                        alt="Zespół Alaska - profesjonalny montaż klimatyzacji"
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="600"
                    />
                    <div className="about-hero-overlay">
                        <div className="about-hero-badge">
                            <span className="about-badge-number">28+</span>
                            <span className="about-badge-text">lat z Wami</span>
                        </div>
                    </div>
                </div>

                {/* Text content below */}
                <div className={`about-content reveal reveal-delay-1 ${isVisible ? 'reveal-visible' : ''}`}>
                    <div className="about-content-header">
                        <span className="about-label">Nasza historia</span>
                        <h2>Lider chłodnictwa i klimatyzacji w Raciborzu od 1997&nbsp;roku</h2>
                    </div>

                    <div className="about-text-columns">
                        <div className="about-text-col">
                            <p className="about-lead">
                                Firma Alaska powstała w <strong>1997 roku</strong> z pasji do nowoczesnych technologii chłodniczych. Rafał Paszczyński założył firmę w Raciborzu, stawiając na najwyższą jakość montażu klimatyzacji i niezawodność systemów chłodzenia przemysłowego.
                            </p>
                            <p>
                                Przez ponad <strong>28 lat</strong> staliśmy się zaufanym partnerem dla tysięcy mieszkańców Śląska oraz setek firm z branży spożywczej i handlowej. Specjalizujemy się w <strong>serwisie chłodniczym</strong> oraz zaawansowanych instalacjach klimatyzacyjnych, które zapewniają komfort nawet w największe upały.
                            </p>
                            <p>
                                Posiadamy salon wystawowy przy <strong>ul. Bosackiej 52</strong> w Raciborzu, gdzie możesz na żywo zobaczyć najnowsze modele klimatyzatorów LG czy Rotenso. Nasze wieloletnie doświadczenie to Twoja gwarancja, że instalacja zostanie wykonana zgodnie ze sztuką i przepisami F-gazowymi.
                            </p>
                        </div>

                        <div className="about-values-col">
                            <div className="about-value">
                                <div className="about-value-icon">
                                    <i className="fa-solid fa-handshake"></i>
                                </div>
                                <div>
                                    <strong>Uczciwe podejście</strong>
                                    <span>Doradzamy to, co najlepsze dla Ciebie, nie dla naszego portfela</span>
                                </div>
                            </div>
                            <div className="about-value">
                                <div className="about-value-icon">
                                    <i className="fa-solid fa-heart"></i>
                                </div>
                                <div>
                                    <strong>Pasja i zaangażowanie</strong>
                                    <span>Każdy montaż wykonujemy tak, jakbyśmy robili go u siebie w domu</span>
                                </div>
                            </div>
                            <div className="about-value">
                                <div className="about-value-icon">
                                    <i className="fa-solid fa-clock"></i>
                                </div>
                                <div>
                                    <strong>Zawsze na czas</strong>
                                    <span>Kiedy dzwonisz z awarią, nie każemy czekać — jedziemy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brand partners strip */}
                <div className={`about-brands-strip reveal reveal-delay-2 ${isVisible ? 'reveal-visible' : ''}`}>
                    <p className="brands-strip-label">Zaufali nam producenci</p>
                    <div className="brands-strip-list">
                        {brands.map((b, i) => (
                            <a
                                key={i}
                                href={b.url}
                                className="brand-strip-item"
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`Odwiedź stronę ${b.name}`}
                            >
                                <strong>{b.name}</strong>
                                <span>{b.desc}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

About.displayName = 'About';
export default About;
