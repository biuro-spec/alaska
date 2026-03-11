import { memo, useEffect, useState, Suspense, lazy } from 'react';
const Snowfall = lazy(() => import('./Snowfall'));

const Hero = memo(() => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <header
            className="hero"
            style={{ '--hero-bg': `url('/hero-refrigeration.webp')` }}
        >
            <div className="container hero-container">
                <div className={`hero-glass-card reveal ${loaded ? 'reveal-visible' : ''}`}>
                    <div className="hero-badge">
                        Profesjonalna Klimatyzacja i Chłodnictwo · Racibórz
                    </div>

                    <h1 className="hero-title">
                        Nowoczesne <span className='text-highlight-cool'>chłodnictwo</span> i klimatyzacja dla biznesu
                    </h1>

                    <p className="hero-desc">
                        Specjalistyczny montaż i serwis urządzeń chłodniczych oraz klimatyzacyjnych od 1997 roku.
                        Zapewniamy bezawaryjną pracę Twoich lad chłodniczych, regałów i systemów klimatyzacji 24/7.
                    </p>

                    <div className="hero-btns">
                        <a href="#oferta" className="btn btn-primary">Zobacz ofertę</a>
                        <a href="#kontakt" className="btn btn-outline">Darmowa wycena</a>
                    </div>
                </div>
            </div>
        </header>
    );
});

Hero.displayName = 'Hero';
export default Hero;
