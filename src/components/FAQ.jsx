import { useState } from 'react';
import './FAQ.css';

// Hoist static data outside the component (rendering-hoist-jsx)
const QUESTIONS = [
    {
        q: "Jakie marki klimatyzacji oferujecie w Raciborzu?",
        a: "Jesteśmy autoryzowanym partnerem marek LG, Rotenso oraz Mitsubishi Electric i Heavy Industries. Na życzenie klienta montujemy również urządzenia innych producentów. Obsługujemy Racibórz i cały region Śląska."
    },
    {
        q: "Ile kosztuje montaż klimatyzacji?",
        a: "Koszt montażu klimatyzacji zależy od typu urządzenia, liczby jednostek i warunków technicznych. Każda wycena i doradztwo techniczne u klienta są całkowicie bezpłatne i niezobowiązujące — zadzwoń pod 607 044 336."
    },
    {
        q: "Jak często należy serwisować klimatyzację?",
        a: "Zalecamy serwis klimatyzacji dwa razy w roku – przed sezonem letnim oraz po jego zakończeniu, aby zapewnić czystość filtrów i optymalne parametry pracy. Oferujemy umowy serwisowe dla firm i klientów indywidualnych."
    },
    {
        q: "Czy oferujecie pompy ciepła i ogrzewanie?",
        a: "Tak, montujemy pompy ciepła powietrze-woda i powietrze-powietrze. Pompy ciepła mogą obniżyć koszty ogrzewania nawet o 70%. Pomagamy również w uzyskaniu dofinansowania z programu Czyste Powietrze."
    },
    {
        q: "Czy wynajmujecie klimatyzatory przenośne?",
        a: "Tak, posiadamy wypożyczalnię klimatyzatorów przenośnych w Raciborzu. To idealne rozwiązanie na imprezy okolicznościowe, eventy lub do przetestowania przed stałym montażem klimatyzacji."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section id="faq" className="faq-hero-style">
            <div className="faq-background-overlay"></div>
            <div className="container">
                <div className="faq-hero-container">
                    <div className="faq-glass-card-hero">
                        <div className="faq-card-content">
                            <div className="section-header-centered">
                                <div className="badge badge-accent">Centrum Pomocy</div>
                                <h2 className="faq-heading-hero">Najczęściej zadawane pytania</h2>
                                <p className="faq-subheading-hero">Wszystko, co musisz wiedzieć o klimatyzacji i chłodnictwie w Twoim domu.</p>
                            </div>

                            <div className="faq-list-hero">
                                {QUESTIONS.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`faq-item-hero ${activeIndex === index ? 'active' : ''}`}
                                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                    >
                                        <div className="faq-question-hero">
                                            <span>{item.q}</span>
                                            <i className={`fa-solid fa-chevron-${activeIndex === index ? 'up' : 'down'}`}></i>
                                        </div>
                                        <div className={`faq-answer-hero ${activeIndex === index ? 'answer-visible' : ''}`}>
                                            <p>{item.a}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="faq-footer-cta">
                                <p>Nie znalazłeś odpowiedzi? Jesteśmy do Twojej dyspozycji.</p>
                                <a href="#kontakt" className="btn btn-primary">Darmowa wycena i konsultacja</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
