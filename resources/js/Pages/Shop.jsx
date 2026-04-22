import { Head, Link } from '@inertiajs/react';
import { useLayoutEffect, useRef, useState } from 'react';
import HomeFooter from '../Components/Layout/HomeFooter';
import HomeHeader from '../Components/Layout/HomeHeader';
import { PRODUCT_CATEGORIES, PRODUCTS } from '../data/products';

/* ============================================================
   Утилиты
   ============================================================ */

function formatPrice(n) {
    return n.toLocaleString('ru-RU') + '\u00a0₽';
}

function getInitials(name) {
    return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

/* ============================================================
   NavPillBar — фильтр категорий
   ============================================================ */

function CategoryBar({ categories, active, onChange }) {
    const [slider, setSlider] = useState({ left: 4, width: 0 });
    const refs = useRef({});

    useLayoutEffect(() => {
        const el = refs.current[active];
        if (el) {
            const parent = el.parentElement.getBoundingClientRect();
            const rect = el.getBoundingClientRect();
            setSlider({ left: rect.left - parent.left, width: rect.width });
        }
    }, [active]);

    return (
        <div
            role="group"
            aria-label="Фильтр категорий"
            style={{
                position: 'relative',
                display: 'inline-flex',
                background: 'var(--ds2-color-bg-elevated)',
                borderRadius: 'var(--ds2-radius-full)',
                padding: '4px',
                boxShadow: 'var(--ds2-shadow-float)',
                gap: 2,
                overflowX: 'auto',
                maxWidth: '100%',
                scrollbarWidth: 'none',
            }}
        >
            <span
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: 4,
                    left: slider.left,
                    width: slider.width,
                    height: 'calc(100% - 8px)',
                    background: 'var(--ds2-color-bg-inverse)',
                    borderRadius: 'var(--ds2-radius-full)',
                    transition: 'left 400ms cubic-bezier(0.34,1.56,0.64,1), width 400ms cubic-bezier(0.34,1.56,0.64,1)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />
            {categories.map((cat) => (
                <button
                    key={cat}
                    ref={(el) => { refs.current[cat] = el; }}
                    type="button"
                    role="radio"
                    aria-checked={active === cat}
                    onClick={() => onChange(cat)}
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        fontFamily: 'var(--ds2-font-sans)',
                        fontWeight: 600,
                        fontSize: 'var(--ds2-text-label)',
                        letterSpacing: '0.04em',
                        padding: '8px 16px',
                        border: 'none',
                        background: 'transparent',
                        color: active === cat ? 'var(--ds2-color-fg-inverse)' : 'var(--ds2-color-fg-secondary)',
                        cursor: 'pointer',
                        borderRadius: 'var(--ds2-radius-full)',
                        whiteSpace: 'nowrap',
                        transition: 'color 200ms',
                    }}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}

/* ============================================================
   Карточка товара
   ============================================================ */

const PALETTE = [
    'linear-gradient(135deg, #d0cec8 0%, #bbb9b3 100%)',
    'linear-gradient(135deg, #c8cdd0 0%, #b3b9bb 100%)',
    'linear-gradient(135deg, #cec8d0 0%, #b9b3bb 100%)',
    'linear-gradient(135deg, #c8d0cc 0%, #b3bbb7 100%)',
    'linear-gradient(135deg, #d0c8c8 0%, #bbb3b3 100%)',
];

function ProductCard({ product, index, onAddToCart }) {
    return (
        <div className="product-card">
            <Link href={`/shop/${product.slug}`} style={{ display: 'contents' }}>
                <div className="product-card__media">
                    <div
                        className="product-card__image"
                        style={{ background: PALETTE[index % PALETTE.length] }}
                    />
                    {product.isNew ? (
                        <span className="product-card__badge">Новинка</span>
                    ) : null}
                    {!product.inStock ? (
                        <div className="product-card__out">Нет в наличии</div>
                    ) : null}
                </div>
                <div className="product-card__body">
                    <div className="product-card__category">{product.category}</div>
                    <div className="product-card__title">{product.title}</div>
                    <div className="product-card__author">{product.author} · {product.specialty}</div>
                    <div className="product-card__footer">
                        <span className="product-card__price">{formatPrice(product.price)}</span>
                    </div>
                </div>
            </Link>
            <div style={{ padding: '0 20px 20px' }}>
                <button
                    type="button"
                    className={`product-card__btn${!product.inStock ? ' product-card__btn--disabled' : ''}`}
                    disabled={!product.inStock}
                    onClick={(e) => { e.preventDefault(); onAddToCart(product); }}
                    data-source="shop-catalog"
                >
                    {product.inStock ? 'В корзину' : 'Нет в наличии'}
                </button>
            </div>
        </div>
    );
}

/* ============================================================
   Страница каталога
   ============================================================ */

export default function Shop() {
    const [activeCategory, setActiveCategory] = useState('Все');
    const [toast, setToast] = useState({ visible: false, text: '' });

    const filtered = activeCategory === 'Все'
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeCategory);

    const handleAddToCart = (product) => {
        setToast({ visible: true, text: `«${product.title}» — корзина скоро появится` });
        setTimeout(() => setToast({ visible: false, text: '' }), 3000);
    };

    return (
        <>
            <Head>
                <title>Магазин авторских изделий | Колледж Фаберже</title>
                <meta name="description" content="Авторские изделия студентов Колледжа им. Карла Фаберже — ювелирные украшения, текстиль, керамика, графика. Доставка по России." />
            </Head>

            <div className="page-shop">
                <HomeHeader />

                {/* ---- Hero ---- */}
                <section className="shop-hero">
                    <div className="home-container">
                        <div className="home-section__kicker" style={{ marginBottom: 16 }}>Магазин</div>
                        <div className="shop-hero__inner">
                            <div>
                                <h1 className="shop-hero__h1">
                                    Изделия молодых художников
                                </h1>
                                <p className="shop-hero__sub">
                                    Авторские украшения, текстиль, керамика и графика — студенты начинают зарабатывать ещё во время учёбы
                                </p>
                            </div>
                            <div className="shop-hero__usp">
                                <span className="shop-hero__usp-item">Доставка по России</span>
                                <span className="shop-hero__usp-item">Авторские изделия</span>
                                <span className="shop-hero__usp-item">Ваш эскиз на изделии</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---- Toolbar ---- */}
                <div className="home-container">
                    <div className="shop-toolbar">
                        <CategoryBar
                            categories={PRODUCT_CATEGORIES}
                            active={activeCategory}
                            onChange={setActiveCategory}
                        />
                        <div className="shop-count">
                            {filtered.length === PRODUCTS.length
                                ? `${PRODUCTS.length} изделий`
                                : `${filtered.length} из ${PRODUCTS.length}`}
                        </div>
                    </div>
                </div>

                {/* ---- Grid ---- */}
                <section className="shop-grid">
                    <div className="home-container">
                        {filtered.length > 0 ? (
                            <div className="shop-grid__items">
                                {filtered.map((product, i) => (
                                    <ProductCard
                                        key={product.slug}
                                        product={product}
                                        index={i}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--ds2-color-fg-tertiary)' }}>
                                В этой категории пока нет изделий
                            </div>
                        )}
                    </div>
                </section>

                {/* ---- Promo strip ---- */}
                <section style={{ borderTop: '1px solid var(--ds2-color-border-subtle)', background: 'var(--ds2-color-bg-secondary)', padding: '64px 0' }}>
                    <div className="home-container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                            {[
                                { icon: '✦', title: 'Авторские изделия', desc: 'Каждая работа — в единственном экземпляре. Не тираж, не копия.' },
                                { icon: '◎', title: 'Ваш эскиз', desc: 'Закажи изделие по своему эскизу — студент воплотит идею в жизнь.' },
                                { icon: '→', title: 'Доставка по России', desc: 'Отправляем в любой город. Бережная упаковка, надёжные службы.' },
                            ].map((item) => (
                                <div key={item.title} style={{ background: 'var(--ds2-color-bg-elevated)', padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div style={{ fontFamily: 'var(--ds2-font-sans)', fontSize: 28, color: 'var(--ds2-color-fg-quaternary)' }}>{item.icon}</div>
                                    <div style={{ fontFamily: 'var(--ds2-font-sans)', fontWeight: 500, fontSize: 'var(--ds2-text-h3)', letterSpacing: '-0.01em', color: 'var(--ds2-color-fg-primary)' }}>{item.title}</div>
                                    <div style={{ fontFamily: 'var(--ds2-font-sans)', fontSize: 'var(--ds2-text-body-sm)', lineHeight: 1.55, color: 'var(--ds2-color-fg-secondary)' }}>{item.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <HomeFooter />

                {/* ---- Toast ---- */}
                <div
                    className={`shop-toast${toast.visible ? '' : ' shop-toast--hidden'}`}
                    role="status"
                    aria-live="polite"
                >
                    <span aria-hidden="true">✓</span>
                    {toast.text}
                </div>
            </div>
        </>
    );
}
