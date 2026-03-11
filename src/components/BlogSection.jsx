import { memo } from 'react';
import { Link } from 'react-router-dom';
import blogArticles from '../data/blogArticles';

// Nowe, dedykowane zdjęcia do kart
const categoryImages = {
    'Klimatyzacja': '/images/blog-karta-klimatyzacja.webp',
    'Pompy ciepła': '/images/blog-karta-pompy.webp',
    'Chłodnictwo': '/images/blog-karta-chlodnictwo.webp',
    'Porady': '/images/blog-porady.webp',
};

const categoryIcons = {
    'Klimatyzacja': 'fa-wind',
    'Pompy ciepła': 'fa-leaf',
    'Chłodnictwo': 'fa-temperature-arrow-down',
    'Porady': 'fa-lightbulb',
};

const BlogSection = memo(() => {
    // 3 artykuły z różnych kategorii (jeden z każdej)
    const featured = [
        blogArticles.find(a => a.category === 'Klimatyzacja'),
        blogArticles.find(a => a.category === 'Pompy ciepła'),
        blogArticles.find(a => a.category === 'Chłodnictwo'),
    ].filter(Boolean);

    return (
        <section className="blog-section-home services-frost">
            <div className="frost-glow frost-glow-top" />

            <div className="container">
                <div className="section-header">
                    <h2>
                        <i className="fa-solid fa-newspaper frost-header-icon"></i> Baza Wiedzy Alaska
                    </h2>
                    <p>
                        Praktyczne poradniki ekspertów — klimatyzacja, pompy ciepła i chłodnictwo.
                    </p>
                </div>

                <div className="blog-grid-home">
                    {featured.map((article) => {
                        const img = categoryImages[article.category] || '/images/blog-klimatyzacja.webp';
                        const icon = categoryIcons[article.category] || 'fa-newspaper';
                        return (
                            <Link
                                to={`/blog/${article.slug}`}
                                key={article.slug}
                                className="blog-card-home frost-card"
                            >
                                <div className="frost-card-shine" />
                                <div className="blog-card-image" style={{ backgroundImage: `url(${img})` }}>
                                    <div className="blog-card-image-overlay" />
                                    <div className="blog-card-icon-badge">
                                        <i className={`fa-solid ${icon}`}></i>
                                    </div>
                                </div>
                                <div className="blog-card-home-content">
                                    <span className="blog-card-category">{article.category}</span>
                                    <h3>{article.title}</h3>
                                    <p>{article.excerpt}</p>
                                    <span className="read-more">
                                        Czytaj więcej <i className="fa-solid fa-arrow-right"></i>
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Przycisk oderwany od kart – poniżej siatki */}
                <div className="blog-cta-home">
                    <Link to="/blog" className="btn btn-primary">
                        <i className="fa-solid fa-layer-group"></i> Zobacz wszystkie artykuły
                    </Link>
                </div>
            </div>
        </section>
    );
});

BlogSection.displayName = 'BlogSection';
export default BlogSection;
