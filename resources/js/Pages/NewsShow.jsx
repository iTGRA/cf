import { Head, Link } from '@inertiajs/react';
import { useRef } from 'react';
import HomeFooter from '../Components/Layout/HomeFooter';
import HomeHeader from '../Components/Layout/HomeHeader';

const TYPE_LABEL = {
    news: 'Новость',
    event: 'Событие',
};

export default function NewsShow({ item, related }) {
    const formRef = useRef(null);

    return (
        <>
            <Head>
                <title>{`${item.title} | Колледж Фаберже`}</title>
                <meta name="description" content={item.excerpt ?? item.title} />
            </Head>

            <div className="page-news">
                <HomeHeader />

                {/* ---- Hero ---- */}
                <section className="news-article-hero">
                    <div className="home-container">
                        <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--ds2-font-sans)', fontSize: 'var(--ds2-text-meta)', color: 'var(--ds2-color-fg-tertiary)', marginBottom: 32, flexWrap: 'wrap' }}>
                            <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 150ms' }}>Главная</Link>
                            <span aria-hidden>→</span>
                            <Link href="/news" style={{ color: 'inherit', textDecoration: 'none' }}>Новости</Link>
                            <span aria-hidden>→</span>
                            <span>{item.title}</span>
                        </nav>

                        <div className="news-article-hero__inner">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                <span style={{ fontWeight: 600, fontSize: 'var(--ds2-text-label)', letterSpacing: '0.06em', color: 'var(--ds2-color-fg-tertiary)', textTransform: 'uppercase' }}>
                                    {item.published_at}
                                </span>
                                <span style={{ fontWeight: 600, fontSize: 'var(--ds2-text-label)', letterSpacing: '0.04em', padding: '3px 10px', borderRadius: 'var(--ds2-radius-full)', background: 'var(--ds2-color-accent-primary-subtle)', color: 'var(--ds2-color-fg-secondary)' }}>
                                    {TYPE_LABEL[item.type] ?? item.type}
                                </span>
                            </div>

                            <h1 className="news-article-hero__h1">{item.title}</h1>
                        </div>
                    </div>
                </section>

                {/* ---- Article body ---- */}
                <section className="news-article-body">
                    <div className="home-container">
                        <div className="news-article-body__content">
                            {item.excerpt && <p style={{ fontWeight: 500, color: 'var(--ds2-color-fg-primary)', fontSize: 'var(--ds2-text-lead)', lineHeight: 1.55, marginBottom: 32 }}>{item.excerpt}</p>}
                            {item.body
                                ? <div dangerouslySetInnerHTML={{ __html: item.body }} />
                                : (
                                    <p style={{ color: 'var(--ds2-color-fg-quaternary)', fontStyle: 'italic' }}>
                                        Полный текст материала готовится к публикации.
                                    </p>
                                )
                            }
                        </div>
                    </div>
                </section>

                {/* ---- Related ---- */}
                {related && related.length > 0 && (
                    <section className="home-section" style={{ background: 'var(--ds2-color-bg-secondary)' }}>
                        <div className="home-container">
                            <div className="home-section__head">
                                <div className="home-section__kicker">Другие материалы</div>
                                <h2 className="home-section__title">Читайте также</h2>
                            </div>
                            <div className="news-grid__items">
                                {related.map((r) => (
                                    <Link key={r.id} href={`/news/${r.slug}`} className="news-card">
                                        <div className="news-card__kicker">
                                            <span className="news-card__date">{r.published_at}</span>
                                            <span className="news-card__type-pill">{TYPE_LABEL[r.type] ?? r.type}</span>
                                        </div>
                                        <div className="news-card__title">{r.title}</div>
                                        <div className="news-card__arrow">
                                            Читать <span aria-hidden>→</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <HomeFooter />
            </div>
        </>
    );
}
