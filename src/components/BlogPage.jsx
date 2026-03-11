import { memo, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import blogArticles, { BLOG_CATEGORIES } from '../data/blogArticles';

const BlogPage = memo(() => {
    const [activeCategory, setActiveCategory] = useState('all');

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('category');
        if (categoryParam) {
            setActiveCategory(categoryParam);
        }
        window.scrollTo(0, 0);
    }, [location]);

    const featuredArticle = activeCategory === 'all' ? blogArticles[0] : null;
    const filtered = activeCategory === 'all'
        ? blogArticles.slice(1)
        : blogArticles.filter(a => a.category === activeCategory);

    const getHeroImage = (category) => {
        switch (category) {
            case 'Klimatyzacja': return '/images/blog-porady.webp';
            case 'Pompy ciepła': return '/images/blog-chlodnictwo.webp';
            case 'Chłodnictwo': return '/images/blog-pompy.webp';
            case 'Porady': return '/images/blog-klimatyzacja.webp';
            default: return '/images/blog-klimatyzacja.webp';
        }
    };

    const heroStyle = {
        backgroundImage: `url(${getHeroImage(activeCategory)})`
    };

    return (
        <div className="blog-page">
            <section className="blog-hero blog-article-hero" style={heroStyle}>
                <div className="container">
                    <div className="hero-glass-card blog-hero-glass">
                        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
                            <Link to="/">Strona główna</Link>
                            <span className="breadcrumb-sep">/</span>
                            <span>Baza Wiedzy</span>
                        </nav>
                        <h1>Baza wiedzy — klimatyzacja, pompy ciepła i chłodnictwo</h1>
                        <p className="blog-hero-desc">
                            Praktyczne poradniki i odpowiedzi na najczęstsze pytania naszych klientów z Raciborza i okolic.
                            Dowiedz się więcej o klimatyzacji, pompach ciepła i chłodnictwie.
                        </p>
                    </div>
                </div>
            </section>

            <section className="blog-listing">
                <div className="container">
                    <div className="blog-categories">
                        {BLOG_CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                className={`blog-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {featuredArticle && (
                        <div className="blog-featured">
                            <div className="blog-featured-content">
                                <span className="blog-card-category">{featuredArticle.category}</span>
                                <h2>{featuredArticle.title}</h2>
                                <div className="blog-article-meta featured-meta">
                                    <span><i className="fa-regular fa-clock"></i> Czas czytania: ok. {featuredArticle.readTime || 3} min</span>
                                </div>
                                <p>{featuredArticle.excerpt}</p>
                                <Link to={`/blog/${featuredArticle.slug}`} className="btn btn-primary">
                                    Czytaj artykuł <i className="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>
                            <div className="blog-featured-image">
                                <img
                                    src="/images/featured-ac.webp"
                                    alt="Nowoczesny klimatyzator"
                                    className="featured-ac-img"
                                />
                            </div>
                        </div>
                    )}

                    <div className="blog-grid">
                        {filtered.map(article => (
                            <Link
                                to={`/blog/${article.slug}`}
                                key={article.slug}
                                className="blog-card"
                            >
                                <span className="blog-card-category">{article.category}</span>
                                <h2>{article.title}</h2>
                                <p>{article.excerpt}</p>
                                <span className="blog-card-link">
                                    Czytaj więcej <i className="fa-solid fa-arrow-right"></i>
                                </span>
                            </Link>
                        ))}
                    </div>

                    <div className="blog-cta-section">
                        <h2>Masz pytanie, którego tu nie ma?</h2>
                        <p>Skontaktuj się z nami — chętnie pomożemy i doradzimy bezpłatnie.</p>
                        <div className="blog-cta-buttons">
                            <a href="tel:607044336" className="btn btn-primary">
                                <i className="fa-solid fa-phone"></i> 607 044 336
                            </a>
                            <Link to="/#kontakt" className="btn btn-outline blog-btn-outline">
                                <i className="fa-solid fa-envelope"></i> Napisz do nas
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
});

BlogPage.displayName = 'BlogPage';
export default BlogPage;
