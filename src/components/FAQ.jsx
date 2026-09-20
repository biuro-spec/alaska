import { useState } from 'react';
import './FAQ.css';
import QUESTIONS from '../data/faq';


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
