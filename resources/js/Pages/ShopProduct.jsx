import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import HomeFooter from '../Components/Layout/HomeFooter';
import HomeHeader from '../Components/Layout/HomeHeader';
import { PRODUCTS } from '../data/products';

function formatPrice(n) {
    return n.toLocaleString('ru-RU') + '\u00a0₽';
}

const PALETTE = [
    'linear-gradient(135deg, #d0cec8 0%, #bbb9b3 100%)',
    'linear-gradient(135deg, #c8cdd0 0%, #b3b9bb 100%)',
    'linear-gradient(135deg, #cec8d0 0%, #b9b3bb 100%)',
    'linear-gradient(135deg, #c8d0cc 0%, #b3bbb7 100%)',
    'linear-gradient(135deg, #d0c8c8 0%, #bbb3b3 100%)',
];

export default function ShopProduct({ slug }) {
    const productIndex = PRODUCTS.findIndex((p) => p.slug === slug);
    const product = PRODUCTS[productIndex];

    const [added, setAdded] = useState(false);
    const [activeThumb, setActiveThumb] = useState(0);

    if (!product) return null;

    const related = PRODUCTS
        .filter((p) => p.slug !== slug && p.category === product.category)
        .slice(0, 4);

    const bg = PALETTE[productIndex % PALETTE.length];

    const handleAddToCart = () => {
        setAdded(true);
        setTimeout(() => setAdded(false), 2500);
    };

    const authorInitials = product.author
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <>
            <Head>
                <title>{`${product.title} — купить авторское изделие | Колледж Фаберже`}</title>
                <meta name="description" content={`${product.title}. ${product.description} Автор: ${product.author}, специальность «${product.specialty}».`} />
            </Head>

            <div className="page-shop">
                <HomeHeader />

                {/* ---- Hero: gallery + info ---- */}
                <section className="product-hero">
                    <div className="home-container">
                        <div className="product-hero__inner">

                            {/* Gallery */}
                            <div className="product-gallery">
                                <div className="product-gallery__main">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <>
                                            <div style={{ position: 'absolute', inset: 0, background: bg, transition: 'opacity 300ms' }} />
                                            <div className="product-gallery__placeholder">
                                                <div style={{ fontFamily: 'var(--ds2-font-sans)', fontWeight: 700, fontSize: 64, color: 'rgba(14,14,12,0.08)', letterSpacing: '-0.04em' }}>
                                                    {product.title.slice(0, 2)}
                                                </div>
                                                <div style={{ fontFamily: 'var(--ds2-font-sans)', fontSize: 'var(--ds2-text-meta)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ds2-color-fg-quaternary)' }}>
                                                    Фото скоро
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="product-gallery__thumbnails">
                                    {[0, 1, 2].map((i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            className={`product-gallery__thumb${activeThumb === i ? ' product-gallery__thumb--active' : ''}`}
                                            onClick={() => setActiveThumb(i)}
                                            aria-label={`Фото ${i + 1}`}
                                            style={product.image
                                                ? { backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: activeThumb === i ? 1 : 0.5 }
                                                : { background: bg, opacity: activeThumb === i ? 1 : 0.5 }
                                            }
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="product-info">
                                <nav className="product-info__breadcrumb" aria-label="Навигация">
                                    <Link href="/">Главная</Link>
                                    <span aria-hidden="true">→</span>
                                    <Link href="/shop">Магазин</Link>
                                    <span aria-hidden="true">→</span>
                                    <span>{product.category}</span>
                                </nav>

                                <div>
                                    <div className="product-info__category">{product.category}</div>
                                    <h1 className="product-info__title" style={{ marginTop: 10 }}>{product.title}</h1>
                                </div>

                                <div className="product-info__price">
                                    {formatPrice(product.price)}
                                    {!product.inStock ? (
                                        <span style={{ marginLeft: 16, fontFamily: 'var(--ds2-font-sans)', fontWeight: 600, fontSize: 'var(--ds2-text-label)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ds2-color-fg-quaternary)' }}>
                                            Нет в наличии
                                        </span>
                                    ) : null}
                                </div>

                                <p className="product-info__desc">{product.description}</p>

                                {/* Specs */}
                                <div className="product-specs">
                                    {[
                                        { label: 'Материал', value: product.material },
                                        { label: 'Размер', value: product.size },
                                        { label: 'Техника', value: product.technique },
                                    ].map((row) => (
                                        <div key={row.label} className="product-specs__row">
                                            <span className="product-specs__label">{row.label}</span>
                                            <span className="product-specs__value">{row.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="product-info__cta">
                                    <button
                                        type="button"
                                        className={`product-info__cta-btn${added ? ' product-info__cta-btn--added' : ''}`}
                                        disabled={!product.inStock}
                                        onClick={handleAddToCart}
                                        data-source="shop-product"
                                    >
                                        {added ? '✓ Добавлено' : product.inStock ? 'В корзину' : 'Нет в наличии'}
                                    </button>
                                    <Link
                                        href="/shop"
                                        className="ds2-btn ds2-btn--secondary ds2-btn--lg"
                                    >
                                        Все изделия
                                    </Link>
                                </div>

                                {/* Author */}
                                <div className="product-author">
                                    <div className="product-author__avatar">{authorInitials}</div>
                                    <div className="product-author__info">
                                        <div className="product-author__label">Автор</div>
                                        <div className="product-author__name">{product.author}</div>
                                        <div className="product-author__specialty">{product.specialty} · Колледж Фаберже</div>
                                    </div>
                                </div>

                                {/* Delivery note */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {[
                                        'Доставка по России — Почта РФ, СДЭК',
                                        'Оплата при получении или онлайн',
                                        'Возможна персонализация — уточняйте у продавца',
                                    ].map((line) => (
                                        <div key={line} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                            <span style={{ color: 'var(--ds2-color-accent-primary)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✦</span>
                                            <span style={{ fontFamily: 'var(--ds2-font-sans)', fontSize: 'var(--ds2-text-body-sm)', color: 'var(--ds2-color-fg-secondary)', lineHeight: 1.5 }}>{line}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---- Related products ---- */}
                {related.length > 0 ? (
                    <section className="home-section">
                        <div className="home-container">
                            <div className="home-section__head">
                                <div className="home-section__kicker">Из той же категории</div>
                                <h2 className="home-section__title">
                                    Ещё {product.category.toLowerCase()}
                                </h2>
                            </div>
                            <div className="shop-grid__items" style={{ gridTemplateColumns: `repeat(${Math.min(related.length, 4)}, 1fr)` }}>
                                {related.map((p, i) => (
                                    <div key={p.slug} className="product-card">
                                        <Link href={`/shop/${p.slug}`} style={{ display: 'contents' }}>
                                            <div className="product-card__media">
                                                {p.image ? (
                                                    <img src={p.image} alt={p.title} className="product-card__image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                                ) : (
                                                    <div className="product-card__image" style={{ background: PALETTE[i % PALETTE.length] }} />
                                                )}
                                                {p.isNew ? <span className="product-card__badge">Новинка</span> : null}
                                                {!p.inStock ? <div className="product-card__out">Нет в наличии</div> : null}
                                            </div>
                                            <div className="product-card__body">
                                                <div className="product-card__category">{p.category}</div>
                                                <div className="product-card__title">{p.title}</div>
                                                <div className="product-card__author">{p.author}</div>
                                                <div className="product-card__footer">
                                                    <span className="product-card__price">{formatPrice(p.price)}</span>
                                                </div>
                                            </div>
                                        </Link>
                                        <div style={{ padding: '0 20px 20px' }}>
                                            <Link
                                                href={`/shop/${p.slug}`}
                                                className="product-card__btn"
                                                data-source="related-product"
                                            >
                                                Подробнее
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: 40, textAlign: 'center' }}>
                                <Link href="/shop" className="ds2-btn ds2-btn--secondary ds2-btn--lg">
                                    Все изделия
                                </Link>
                            </div>
                        </div>
                    </section>
                ) : null}

                <HomeFooter />
            </div>
        </>
    );
}
