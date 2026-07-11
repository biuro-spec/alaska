import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

// Stałe realizacje (lokalne, ładują się natychmiast) — pokazane pierwsze,
// reszta z panelu (Google Dysk) doładowuje się w tle.
const SEED = [
    {
        ID: 'seed-1',
        Url: '/realizacje/seed-1.webp',
        Tytul: 'Montaż klimatyzacji Rotenso — dom jednorodzinny',
        Opis: 'Montaż klimatyzacji ściennej Rotenso na elewacji domu jednorodzinnego w Raciborzu. Zadbaliśmy o estetyczne poprowadzenie instalacji i cichą pracę jednostki zewnętrznej — komfortowe chłodzenie latem i dogrzewanie w chłodniejsze dni.',
    },
    {
        ID: 'seed-2',
        Url: '/realizacje/seed-2.webp',
        Tytul: 'Chłodnictwo sklepowe — regały i komory chłodnicze',
        Opis: 'Instalacja przeszklonych regałów chłodniczych dla obiektu handlowego na Śląsku. Kompleksowe chłodnictwo sklepowe: dobór urządzeń, montaż i uruchomienie — pewne przechowywanie produktów w wymaganej temperaturze.',
    },
    {
        ID: 'seed-3',
        Url: '/realizacje/seed-3.webp',
        Tytul: 'Klimatyzacja kasetonowa LG — montaż wewnętrzny',
        Opis: 'Montaż klimatyzacji kasetonowej (sufitowej) LG we wnętrzu w Raciborzu. Dyskretna jednostka wpuszczona w sufit równomiernie rozprowadza powietrze, nie zajmując miejsca na ścianach — idealne rozwiązanie do mieszkań i biur.',
    },
];

export default function Realizacje() {
    const [items, setItems] = useState(SEED);
    const [loading, setLoading] = useState(true);
    const [lightbox, setLightbox] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Realizacje - montaż klimatyzacji i chłodnictwa | Alaska Racibórz';
        fetch(API_URL + '?action=getRealizacje')
            .then(r => r.json())
            .then(res => {
                if (res.ok && Array.isArray(res.data) && res.data.length) {
                    setItems([...SEED, ...res.data]);
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        document.body.style.overflow = lightbox !== null ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [lightbox]);

    const imgUrl = (item, size) =>
        item.FileId ? `https://drive.google.com/thumbnail?id=${item.FileId}&sz=w${size}` : item.Url;

    return (
        <main className="realizacje-page">
            <div className="container">
                <div className="realizacje-header">
                    <span className="realizacje-eyebrow">Nasze prace</span>
                    <h1>Realizacje Alaska — klimatyzacja i chłodnictwo w Raciborzu</h1>
                    <p>Zobacz przykłady naszych montaży i instalacji. Każda realizacja to gwarancja jakości i wieloletniego doświadczenia od 1997&nbsp;roku.</p>
                    <Link to="/" className="realizacje-back">← Powrót na stronę główną</Link>
                </div>

                <div className="realizacje-grid">
                    {items.map((item, i) => (
                        <button
                            key={item.ID || i}
                            className="realizacja-card"
                            onClick={() => setLightbox(i)}
                            aria-label={`Powiększ: ${item.Tytul || 'realizacja'}`}
                        >
                            <div className="realizacja-thumb">
                                <img
                                    src={imgUrl(item, 600)}
                                    alt={item.Tytul || 'Realizacja Alaska - klimatyzacja Racibórz'}
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                                <span className="realizacja-zoom"><i className="fa-solid fa-magnifying-glass-plus"></i></span>
                            </div>
                            {(item.Tytul || item.Opis) && (
                                <div className="realizacja-info">
                                    {item.Tytul && <h2>{item.Tytul}</h2>}
                                    {item.Opis && <p>{item.Opis}</p>}
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {loading && <p className="realizacje-loading">Wczytuję kolejne realizacje…</p>}
            </div>

            {lightbox !== null && items[lightbox] && (
                <div className="realizacje-lightbox" onClick={() => setLightbox(null)}>
                    <button className="rl-close" onClick={() => setLightbox(null)} aria-label="Zamknij">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    {items.length > 1 && (
                        <button
                            className="rl-nav rl-prev"
                            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + items.length) % items.length); }}
                            aria-label="Poprzednie"
                        ><i className="fa-solid fa-chevron-left"></i></button>
                    )}
                    <div className="rl-content" onClick={(e) => e.stopPropagation()}>
                        <div className="rl-image">
                            <img src={imgUrl(items[lightbox], 1200)} alt={items[lightbox].Tytul || 'Realizacja Alaska'} referrerPolicy="no-referrer" />
                        </div>
                        {(items[lightbox].Tytul || items[lightbox].Opis) && (
                            <div className="rl-caption">
                                {items[lightbox].Tytul && <h3>{items[lightbox].Tytul}</h3>}
                                {items[lightbox].Opis && <p>{items[lightbox].Opis}</p>}
                            </div>
                        )}
                    </div>
                    {items.length > 1 && (
                        <button
                            className="rl-nav rl-next"
                            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % items.length); }}
                            aria-label="Następne"
                        ><i className="fa-solid fa-chevron-right"></i></button>
                    )}
                </div>
            )}
        </main>
    );
}
