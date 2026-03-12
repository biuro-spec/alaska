import { memo } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Stats = memo(() => {
    const [ref, isVisible] = useScrollAnimation({ once: true });

    const statsData = [
        { value: "28+", label: "Lat doświadczenia" },
        { value: "Salon", label: "ul. Bosacka 52, Racibórz" },
        { value: "24h", label: "Wsparcie serwisowe" }
    ];

    return (
        <section className="stats" ref={ref}>
            <div className="container stats-grid">
                {statsData.map((s, i) => (
                    <div
                        key={i}
                        className={`stat-card glass reveal reveal-delay-${i + 1} ${isVisible ? 'reveal-visible' : ''}`}
                    >
                        <p className="stat-value">{s.value}</p>
                        <p>{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
});

Stats.displayName = 'Stats';
export default Stats;
