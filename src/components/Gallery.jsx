import { memo, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const PHOTOS = [
    {
        src: 'https://common.v-manager.pl/uploads/images/websites/16/2f4f0de9f631d9fa45e88009a233e8ea-822293001618228852.jpg',
        thumb: 'https://common.v-manager.pl/uploads/images/websites/16/frame/300x300/2f4f0de9f631d9fa45e88009a233e8ea-822293001618228852.jpg',
        alt: 'Realizacja Alaska - klimatyzacja'
    },
    {
        src: 'https://common.v-manager.pl/uploads/images/websites/16/39176d42eaadc7cda564b790d551137a-173501001618228902.jpg',
        thumb: 'https://common.v-manager.pl/uploads/images/websites/16/frame/300x300/39176d42eaadc7cda564b790d551137a-173501001618228902.jpg',
        alt: 'Realizacja Alaska - montaż'
    },
    {
        src: 'https://common.v-manager.pl/uploads/images/websites/16/eb00d2473a86753432c49bf5ef48f3f0-338029001618228902.jpg',
        thumb: 'https://common.v-manager.pl/uploads/images/websites/16/frame/300x300/eb00d2473a86753432c49bf5ef48f3f0-338029001618228902.jpg',
        alt: 'Realizacja Alaska - serwis'
    },
    {
        src: 'https://common.v-manager.pl/uploads/images/websites/16/16fa40ad3c25ccc520e3345417504d78-118093001618228853.jpg',
        thumb: 'https://common.v-manager.pl/uploads/images/websites/16/frame/300x300/16fa40ad3c25ccc520e3345417504d78-118093001618228853.jpg',
        alt: 'Realizacja Alaska - urządzenia'
    }
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
