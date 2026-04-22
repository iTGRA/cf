import { Head, Link } from '@inertiajs/react';
import { useRef } from 'react';
import HomeFooter from '../Components/Layout/HomeFooter';
import HomeHeader from '../Components/Layout/HomeHeader';

const TYPE_LABEL = {
    news: 'Новость',
    event: 'Событие',
};

export default function News({ items }) {
    const formRef = useRef(null);

    return (
        <>
            <Head>
                <title>Новости | Колледж Фаберже</title>
                <meta name="description" content="Новости и события Колледжа декоративно-прикладного искусства им. Карла Фаберже в Москве." />
            </Head>

            <div className="page-news">
                <HomeHeader />

                {/* ---- Hero ---- */}
                <section className="news-hero">
                    <div className="home-container">
                        <div className="home-section__kicker" style={{ marginBottom: 16 }}>Колледж Фаберже</div>
                        <h1 className="news-hero__h1">Новости</h1>
                    </div>
                </section>

                {/* ---- Grid ---- */}
                <section className="news-grid">
                    <div className="home-container">
                        <div className="news-grid__items">
                            {items.map((item) => (
                                <Link key={item.id} href={`/news/${item.slug}`} className="news-card">
                                    <div className="news-card__kicker">
                                        <span className="news-card__date">{item.published_at}</span>
                                        <span className="news-card__type-pill">{TYPE_LABEL[item.type] ?? item.type}</span>
                                    </div>
                                    <div className="news-card__title">{item.title}</div>
                                    {item.excerpt && (
                                        <div className="news-card__excerpt">{item.excerpt}</div>
                                    )}
                                    <div className="news-card__arrow">
                                        Читать <span aria-hidden>→</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <HomeFooter />
            </div>
        </>
    );
}
