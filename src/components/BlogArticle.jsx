import { memo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogArticles, { BLOG_CATEGORIES } from '../data/blogArticles';

const BlogArticle = memo(() => {
    const { slug } = useParams();

    // Smooth scroll for ToC links
    const handleScroll = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 100; // Offset for fixed header
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const article = blogArticles.find(a => a.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // Dynamic SEO meta tags
    useEffect(() => {
        if (!article) return;
        const originalTitle = document.title;
        const originalDesc = document.querySelector('meta[name="description"]')?.content;
        const originalCanonical = document.querySelector('link[rel="canonical"]')?.href;

        document.title = `${article.title} | Alaska Klimatyzacja Racibórz`;

        const descMeta = document.querySelector('meta[name="description"]');
        if (descMeta) descMeta.content = article.excerpt;

        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.href = `https://alaskarp.pl/blog/${article.slug}`;

        // OG tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.content = article.title;
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.content = article.excerpt;
        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.content = `https://alaskarp.pl/blog/${article.slug}`;

        // Schema.org Article
        const schema = document.createElement('script');
        schema.type = 'application/ld+json';
        schema.id = 'article-schema';
        schema.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.excerpt,
            "url": `https://alaskarp.pl/blog/${article.slug}`,
            "author": { "@type": "Organization", "name": "Alaska - Chłodnictwo i Klimatyzacja" },
            "publisher": {
                "@type": "Organization",
                "name": "Alaska - Chłodnictwo i Klimatyzacja",
                "logo": { "@type": "ImageObject", "url": "https://alaskarp.pl/logo.png" }
            },
            "mainEntityOfPage": `https://alaskarp.pl/blog/${article.slug}`
        });
        document.head.appendChild(schema);

        return () => {
            document.title = originalTitle;
            if (descMeta && originalDesc) descMeta.content = originalDesc;
            if (canonical && originalCanonical) canonical.href = originalCanonical;
            const oldSchema = document.getElementById('article-schema');
            if (oldSchema) oldSchema.remove();
        };
    }, [article]);

    if (!article) {
        return (
            <div className="blog-page">
                <section className="blog-hero">
                    <div className="container">
                        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
                            <Link to="/">Strona główna</Link>
                            <span className="breadcrumb-sep">/</span>
                            <Link to="/blog">Baza Wiedzy</Link>
                        </nav>
                        <h1>Artykuł nie został znaleziony</h1>
                        <p className="blog-hero-desc">Przepraszamy, szukana strona nie istnieje.</p>
                        <Link to="/blog" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                            <i className="fa-solid fa-arrow-left"></i> Wróć do Bazy Wiedzy
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    const related = blogArticles
        .filter(a => a.category === article.category && a.slug !== article.slug)
        .slice(0, 3);

    const getHeroImage = (category) => {
        switch (category) {
            case 'Klimatyzacja': return '/images/blog-klimatyzacja.webp';
            case 'Pompy ciepła': return '/images/blog-pompy.webp';
            case 'Chłodnictwo': return '/images/blog-chlodnictwo.webp';
            case 'Porady': return '/images/blog-porady.webp';
            default: return '/images/blog-klimatyzacja.webp';
        }
    };

    const heroStyle = {
        backgroundImage: `url(${getHeroImage(article.category)})`
    };

    return (
        <div className="blog-page">
            <section className="blog-hero blog-article-hero" style={heroStyle}>
                <div className="container">
                    <div className="hero-glass-card blog-hero-glass">
                        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
                            <Link to="/">Strona główna</Link>
                            <span className="breadcrumb-sep">/</span>
                            <Link to="/blog">Baza Wiedzy</Link>
                            <span className="breadcrumb-sep">/</span>
                            <span>{article.title}</span>
                        </nav>
                        <span className="blog-article-category">{article.category}</span>
                        <h1>{article.title}</h1>
                        <div className="blog-article-meta">
                            <span><i className="fa-regular fa-clock"></i> Czas czytania: ok. {article.readTime || 3} min</span>
                        </div>
                        <p className="blog-hero-desc">{article.excerpt}</p>
                    </div>
                </div>
            </section>

            <section className="blog-article-content">
                <div className="container" style={{ marginBottom: '2rem' }}>
                    <div className="blog-categories">
                        <Link to="/blog" className="blog-cat-btn">
                            Wszystkie
                        </Link>
                        {BLOG_CATEGORIES.map(cat => (
                            <Link
                                key={cat.id}
                                to={`/blog?category=${cat.id}`}
                                className={`blog-cat-btn ${article.category === cat.label ? 'active' : ''}`}
                            >
                                {cat.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="container blog-article-layout">
                    {/* Sidebar: Table of Contents */}
                    <aside className="blog-sidebar">
                        <div className="blog-toc">
                            <h4>Spis treści</h4>
                            <ul>
                                {article.content.filter(b => b.type === 'heading').map((h, i) => {
                                    const id = h.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                    return (
                                        <li key={i}>
                                            <a href={`#${id}`} onClick={(e) => handleScroll(e, id)}>{h.value}</a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </aside>

                    <div className="blog-article-main">
                        <div className="blog-rich-content">
                            {article.content.map((block, index) => {
                                if (block.type === 'heading') {
                                    const id = block.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                    return <h3 key={index} id={id} className="blog-rich-heading">{block.value}</h3>;
                                } else if (block.type === 'paragraph') {
                                    return <p key={index} className="blog-rich-paragraph">{block.value}</p>;
                                } else if (block.type === 'quote') {
                                    return <blockquote key={index} className="blog-rich-quote">{block.value}</blockquote>;
                                }
                                return null;
                            })}
                        </div>

                        <div className="blog-article-cta">
                            <h3>Potrzebujesz pomocy lub wyceny?</h3>
                            <p>Zadzwoń lub napisz — bezpłatna konsultacja i wycena.</p>
                            <div className="blog-cta-buttons">
                                <a href="tel:607044336" className="btn btn-primary">
                                    <i className="fa-solid fa-phone"></i> 607 044 336
                                </a>
                                <Link to="/#kontakt" className="btn btn-outline blog-btn-outline">
                                    <i className="fa-solid fa-envelope"></i> Formularz kontaktowy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {related.length > 0 && (
                    <div className="container blog-related-container">
                        <div className="blog-related">
                            <h3>Powiązane artykuły</h3>
                            <div className="blog-related-grid">
                                {related.map(r => (
                                    <Link to={`/blog/${r.slug}`} key={r.slug} className="blog-card blog-card-small">
                                        <span className="blog-card-category">{r.category}</span>
                                        <h4>{r.title}</h4>
                                        <span className="blog-card-link">
                                            Czytaj <i className="fa-solid fa-arrow-right"></i>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
});

BlogArticle.displayName = 'BlogArticle';
export default BlogArticle;
