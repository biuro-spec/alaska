import { memo } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const MAPS_LINK = 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x471169338e7a89a9:0xeb85eba41038e5aa';
const FB_LINK = 'https://www.facebook.com/alaska.raciborz.3';

const Salon = memo(() => {
    const [ref, isVisible] = useScrollAnimation({ once: true });

    return (
        <section id="salon" className="salon-light" ref={ref}>
            <div className="container">
                <div className={`section-header reveal ${isVisible ? 'reveal-visible' : ''}`}>
                    <h2 className="salon-light-heading">Salon klimatyzacji w Raciborzu</h2>
                    <p className="salon-light-subheading">Odwiedź nas na ul. Bosackiej 52, porozmawiaj z ekspertami i zobacz urządzenia na żywo.</p>
                </div>

                <div className={`salon-photo reveal reveal-delay-1 ${isVisible ? 'reveal-visible' : ''}`}>
                    <picture>
                        <source
                            media="(max-width: 768px)"
                            srcSet="/images/salon-front-mobile.webp"
                        />
                        <img
                            src="/images/salon-front.webp"
                            alt="Salon Alaska Klimatyzacja - budynek przy ul. Bosackiej 52 w Raciborzu"
                            loading="lazy"
                            width="1828"
                            height="749"
                        />
                    </picture>
                </div>

                <div className={`salon-light-grid reveal reveal-delay-2 ${isVisible ? 'reveal-visible' : ''}`}>
                    <div className="salon-light-info">
                        <div className="salon-light-card">
                            <div className="salon-detail-item">
                                <div className="salon-detail-icon"><i className="fa-solid fa-map-location-dot"></i></div>
                                <div>
                                    <strong>Adres salonu</strong>
                                    <span>ul. Bosacka 52, 47-400 Racibórz</span>
                                </div>
                            </div>
                            <div className="salon-detail-item">
                                <div className="salon-detail-icon"><i className="fa-solid fa-headset"></i></div>
                                <div>
                                    <strong>Sprzedaż</strong>
                                    <span>607 376 336 (Mirek)</span>
                                </div>
                            </div>
                            <div className="salon-detail-item">
                                <div className="salon-detail-icon"><i className="fa-solid fa-envelope"></i></div>
                                <div>
                                    <strong>Email</strong>
                                    <span>sklep@alaskarp.pl</span>
                                </div>
                            </div>
                        </div>

                        <div className="salon-light-buttons">
                            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary salon-btn">
                                <i className="fa-solid fa-map-pin"></i> Nawiguj do nas
                            </a>
                            <a href={FB_LINK} target="_blank" rel="noopener noreferrer" className="btn salon-btn salon-btn-fb">
                                <i className="fa-brands fa-facebook-f"></i> Facebook
                            </a>
                        </div>
                    </div>

                    <div className="salon-light-map">
                        <iframe
                            src="https://maps.google.com/maps?q=Bosacka+52,+47-400+Racib%C3%B3rz&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Alaska - lokalizacja na mapie"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
});

Salon.displayName = 'Salon';
export default Salon;
