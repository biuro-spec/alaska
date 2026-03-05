import { useState, useRef } from 'react';

// --- Pomocnicze funkcje walidacji ---
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
const validatePhone = (phone) => !phone || /^[\d\s\-+()]{7,20}$/.test(phone.trim());
const sanitize = (str) => str.replace(/<[^>]*>/g, '').slice(0, 2000);

const RATE_LIMIT_MS = 60 * 1000; // 60 sekund między wysyłkami

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        // Pole honeypot — wypełniane przez boty, ludzie nie widzą go
        website: '',
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | success | ratelimit
    const lastSubmitRef = useRef(0);

    const validate = () => {
        const e = {};
        const name = formData.name.trim();
        const msg = formData.message.trim();

        if (!name || name.length < 2) e.name = 'Podaj imię i nazwisko (min. 2 znaki).';
        if (name.length > 100) e.name = 'Imię i nazwisko jest za długie (max 100 znaków).';
        if (!formData.email) e.email = 'Podaj adres email.';
        else if (!validateEmail(formData.email)) e.email = 'Nieprawidłowy format adresu email.';
        if (!validatePhone(formData.phone)) e.phone = 'Nieprawidłowy numer telefonu.';
        if (!msg || msg.length < 10) e.message = 'Wiadomość jest za krótka (min. 10 znaków).';
        if (msg.length > 2000) e.message = 'Wiadomość jest za długa (max 2000 znaków).';

        return e;
    };

    const handleChange = (field) => (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        // Usuń błąd przy edycji
        if (errors[field]) setErrors((prev) => { const ne = { ...prev }; delete ne[field]; return ne; });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Honeypot — boty wypełnią ukryte pole "website"
        if (formData.website) {
            // Cicho ignoruj — nie informuj bota o wykryciu
            setStatus('success');
            return;
        }

        // Rate limit
        const now = Date.now();
        if (now - lastSubmitRef.current < RATE_LIMIT_MS) {
            setStatus('ratelimit');
            return;
        }

        // Walidacja
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Sanityzacja danych
        const safeData = {
            name: sanitize(formData.name),
            email: sanitize(formData.email),
            phone: sanitize(formData.phone),
            message: sanitize(formData.message),
        };

        // TODO: W przyszłości — wysyłka przez backend/API (np. EmailJS, Formspree)
        console.info('Formularz gotowy do wysyłki:', safeData);

        lastSubmitRef.current = now;
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '', website: '' });
        setErrors({});
    };

    return (
        <div className="contact-card">
            <h3>Wyślij Zapytanie</h3>
            <p>Napisz do nas – przygotujemy dla Ciebie darmową wycenę.</p>

            {status === 'success' && (
                <div className="form-success-msg" role="alert">
                    <i className="fa-solid fa-circle-check"></i> Dziękujemy! Skontaktujemy się wkrótce.
                </div>
            )}
            {status === 'ratelimit' && (
                <div className="form-error-banner" role="alert">
                    <i className="fa-solid fa-clock"></i> Możesz wysłać kolejną wiadomość za 60 sekund.
                </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form" noValidate>

                {/* Honeypot — ukryte przed użytkownikami, widoczne dla botów */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                    <label htmlFor="website">Strona WWW (nie wypełniaj)</label>
                    <input
                        type="text"
                        id="website"
                        name="website"
                        tabIndex="-1"
                        autoComplete="off"
                        value={formData.website}
                        onChange={handleChange('website')}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="name">Imię i Nazwisko <span aria-hidden="true">*</span></label>
                    <input
                        type="text"
                        id="name"
                        required
                        maxLength={100}
                        placeholder="Jan Kowalski"
                        value={formData.name}
                        onChange={handleChange('name')}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={errors.name ? 'input-error' : ''}
                    />
                    {errors.name && <span id="name-error" className="field-error" role="alert">{errors.name}</span>}
                </div>

                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
                        <input
                            type="email"
                            id="email"
                            required
                            maxLength={254}
                            placeholder="twoj@email.pl"
                            value={formData.email}
                            onChange={handleChange('email')}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <span id="email-error" className="field-error" role="alert">{errors.email}</span>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="phone">Telefon</label>
                        <input
                            type="tel"
                            id="phone"
                            maxLength={20}
                            placeholder="000 000 000"
                            value={formData.phone}
                            onChange={handleChange('phone')}
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? 'phone-error' : undefined}
                            className={errors.phone ? 'input-error' : ''}
                        />
                        {errors.phone && <span id="phone-error" className="field-error" role="alert">{errors.phone}</span>}
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="message">Wiadomość <span aria-hidden="true">*</span></label>
                    <textarea
                        id="message"
                        rows="4"
                        required
                        maxLength={2000}
                        placeholder="W czym możemy pomóc?"
                        value={formData.message}
                        onChange={handleChange('message')}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={errors.message ? 'input-error' : ''}
                    ></textarea>
                    <span className="char-counter">{formData.message.length}/2000</span>
                    {errors.message && <span id="message-error" className="field-error" role="alert">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                    Wyślij wiadomość <i className="fa-solid fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
