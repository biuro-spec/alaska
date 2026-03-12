import { useState, useEffect } from 'react';

const IntroScreen = ({ onEnter }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    // Generate random particles for the "cold/ice" effect
    const [particles] = useState(() => Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 1}px`,
        delay: `${Math.random() * 5}s`,
        duration: `${Math.random() * 10 + 20}s`,
        opacity: Math.random() * 0.5 + 0.3
    })));

    const handleExit = () => {
        if (isClosing) return;
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            onEnter();
        }, 800);
    };

    // Auto-dismiss after 1.5s
    useEffect(() => {
        const timer = setTimeout(handleExit, 1500);
        return () => clearTimeout(timer);
    }, []);

    const splitText = (text, startDelay) => {
        return text.split('').map((char, index) => (
            <span
                key={index}
                className="letter"
                style={{ '--delay': `${startDelay + index * 0.08}s` }}
            >
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    if (!isVisible) return null;

    return (
        <div
            className={`intro-overlay ${isClosing ? 'intro-closing' : ''}`}
            onClick={handleExit}
        >
            
            
            
            <div className="intro-particles">
                {particles.map(p => (
                    <div
                        key={p.id}
                        className="ice-particle"
                        style={{
                            left: p.left,
                            top: p.top,
                            width: p.size,
                            height: p.size,
                            animationDelay: p.delay,
                            animationDuration: p.duration,
                            opacity: p.opacity
                        }}
                    />
                ))}
            </div>

            <div className="intro-fog">
                <div className="fog-layer layer-1"></div>
                <div className="fog-layer layer-2"></div>
            </div>

            <div className="intro-content">
                <div className="intro-logo-wrap">
                    <img src="/logo.webp" alt="Alaska Logo" className="intro-logo" />
                </div>
                <div className="intro-text-group">
                    <h1 className="intro-name-flow">
                        <div className="name-part firstName">
                            <span className="initial">{splitText('R', 0.5)}</span>
                            <span className="rest">{splitText('afał', 2.5)}</span>
                        </div>
                        <div className="name-part lastName">
                            <span className="initial">{splitText('P', 0.8)}</span>
                            <span className="rest">{splitText('aszczyński', 3.0)}</span>
                        </div>
                    </h1>
                    <div className="intro-divider-glow"></div>
                    <p className="intro-hint-premium">Kliknij, aby wejść w świat chłodu</p>
                </div>
            </div>

            <div className="frost-corner top-left"></div>
            <div className="frost-corner bottom-right"></div>
        </div>
    );
};

export default IntroScreen;
