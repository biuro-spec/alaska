import { memo, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const PHOTOS = [
    { src: '/images/gal-1.webp', thumb: '/images/gal-1-thumb.webp', alt: 'Van Alaska Klimatyzacja - flota serwisowa w Raciborzu' },
    { src: '/images/gal-2.webp', thumb: '/images/gal-2-thumb.webp', alt: 'Oznakowany pojazd Alaska przy siedzibie firmy' },
    { src: '/images/gal-3.webp', thumb: '/images/gal-3-thumb.webp', alt: 'Flota Alaska - klimatyzacja i chłodnictwo' },
    { src: '/images/gal-4.webp', thumb: '/images/gal-4-thumb.webp', alt: 'Van serwisowy Alaska Chłodnictwo' },
    { src: '/images/gal-5.webp', thumb: '/images/gal-5-thumb.webp', alt: 'Siedziba Alaska w Raciborzu - hale serwisowe' },
    { src: '/images/gal-6.webp', thumb: '/images/gal-6-thumb.webp', alt: 'Baza serwisowa Alaska - hale i pojazdy' },
];

const Gallery = memo(() => {
    const [ref, isVisible] = useScrollAnimation({ once: true });
    const [lightbox, setLightbox] = useState(null);

    return (
        <section id="galeria" className="gallery-section section" ref={ref}>
            <div className="container">
                <div className={`section-header reveal ${isVisible ? 'reveal-visible' : ''}`}>
                    <h2>Nasze Realizacje</h2>
                    <p>Zobacz przykłady naszych prac i montaży.</p>
                </div>
                <div className="gallery-grid">
                    {PHOTOS.map((photo, i) => (
                        <div
                            key={i}
                            className={`gallery-item reveal reveal-delay-${(i % 3) + 1} ${isVisible ? 'reveal-visible' : ''}`}
                            onClick={() => setLightbox(i)}
                        >
                            <img src={photo.thumb} alt={photo.alt} loading="lazy" decoding="async" width="300" height="300" />
                            <div className="gallery-overlay">
                                <i className="fa-solid fa-magnifying-glass-plus"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {lightbox !== null && (
                <div className="lightbox" onClick={() => setLightbox(null)}>
                    <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Zamknij galerię">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <button
                        className="lightbox-nav lightbox-prev"
                        onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length); }}
                        aria-label="Poprzednie zdjęcie"
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <img
                        src={PHOTOS[lightbox].src}
                        alt={PHOTOS[lightbox].alt}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        className="lightbox-nav lightbox-next"
                        onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % PHOTOS.length); }}
                        aria-label="Następne zdjęcie"
                    >
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            )}
        </section>
    );
});

Gallery.displayName = 'Gallery';
export default Gallery;
