import { Head } from '@inertiajs/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import HomeHeader from '../Components/Layout/HomeHeader';
import HomeFooter from '../Components/Layout/HomeFooter';

/* ============================================================
   Data
   ============================================================ */

const SPECIALTIES = [
    { slug: 'dizajn-interera', title: 'Дизайн интерьера', utp: 'Создавай пространства, в которых хочется жить', type: 'Специальность', tag: 'Дизайн', image: '/images/02_interior_design.svg' },
    { slug: 'dizajn-yuvelir', title: 'Дизайн в ювелирной промышленности', utp: 'Проектируй украшения с помощью 3D-технологий', type: 'Специальность', tag: 'Дизайн', image: '/images/01_jewelry_design.svg' },
    { slug: 'dizajn-legkaya', title: 'Дизайн в лёгкой промышленности', utp: 'Шей авторские коллекции и работай с брендами', type: 'Специальность', tag: 'Дизайн', image: '/images/07_light_industry.svg' },
    { slug: 'dpi', title: 'ДПИ и народные промыслы', utp: 'Роспись, керамика, лаковая миниатюра — живые традиции', type: 'Специальность', tag: 'ДПИ', image: '/images/03_folk_crafts.svg' },
    { slug: 'tekstil', title: 'Художественное оформление текстиля', utp: 'Создавай узоры и коллекции для лёгкой промышленности', type: 'Специальность', tag: 'Текстиль', image: '/images/06_textile.svg' },
    { slug: 'kostyum', title: 'Художник по костюму', utp: 'Твои костюмы — на сцене Большого театра', type: 'Специальность', tag: 'Текстиль', image: '/images/08_costume_designer.svg' },
    { slug: 'floristika', title: 'Мастер флористического сервиса', utp: 'Флористика как профессия — быстрый старт за 2 года', type: 'Профессия', tag: 'Флористика', image: '/images/09_florist.svg' },
    { slug: 'yuvelir', title: 'Ювелир', utp: 'Альма-матер российских ювелиров — начни здесь', type: 'Профессия', tag: 'Ювелирное дело', image: '/images/05_jeweler.svg' },
    { slug: 'grafika', title: 'Графический дизайнер', utp: 'Логотипы, айдентика, визуальные коммуникации', type: 'Профессия', tag: 'Графика', image: '/images/04_graphic_design.svg' },
];

const FILTERS = ['Все', 'Дизайн', 'Ювелирное дело', 'Текстиль', 'ДПИ', 'Флористика', 'Графика'];

const WORKS = [
    { title: 'Кольцо «Листва»', author: 'Мария К., Ювелир', tag: 'Ювелирное дело' },
    { title: 'Платок шёлковый', author: 'Алина В., Текстиль', tag: 'Текстиль' },
    { title: 'Жостовский поднос', author: 'Дарья М., ДПИ', tag: 'ДПИ' },
    { title: 'Керамика — ваза', author: 'Иван П., ДПИ', tag: 'ДПИ' },
    { title: 'Интерьер студии', author: 'Анна Л., Дизайн', tag: 'Дизайн' },
    { title: 'Авторский букет', author: 'Елена С., Флористика', tag: 'Флористика' },
    { title: 'Брошь «Ветка»', author: 'Ксения О., Ювелир', tag: 'Ювелирное дело' },
    { title: 'Айдентика бренда', author: 'Тимур Г., Графика', tag: 'Графика' },
];

const PARTNERS = [
    'Большой театр России',
    'Жостовская фабрика декоративной росписи',
    'Мануфактура «Московская игрушка»',
    'ЮВЕЛИРНЫЙ ДОМ «ЭСТЕТ»',
    'Студия дизайна FORMA',
];

const NEWS_PLACEHOLDER = [
    { date: '18 апреля 2026', title: 'Студенты колледжа победили на Всероссийской олимпиаде по ювелирному делу' },
    { date: '10 апреля 2026', title: 'День открытых дверей: более 300 абитуриентов познакомились с колледжем' },
    { date: '2 апреля 2026', title: 'Выставка дипломных работ — лучшее из 2025 года' },
];

/* ============================================================
   NavPillBar (spec from DS2.md)
   ============================================================ */

function SpecFilter({ filters, active, onChange }) {
    const [slider, setSlider] = useState({ left: 6, width: 0 });
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
        <div className="home-specialties__filters" role="group" aria-label="Фильтр специальностей">
            <div
                style={{
                    position: 'relative',
                    display: 'inline-flex',
                    background: 'var(--ds2-color-bg-elevated)',
                    borderRadius: 'var(--ds2-radius-full)',
                    padding: '4px',
                    boxShadow: 'var(--ds2-shadow-float)',
                    gap: 2,
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    maxWidth: '100%',
                    scrollbarWidth: 'none',
                }}
            >
                <span
                    aria-hidden
                    style={{
                        position: 'absolute',
                        top: 4,
                        height: 'calc(100% - 8px)',
                        left: slider.left,
                        width: slider.width,
                        background: 'var(--ds2-color-bg-inverse)',
                        borderRadius: 'var(--ds2-radius-full)',
                        transition: `left 400ms cubic-bezier(0.34,1.56,0.64,1), width 400ms cubic-bezier(0.34,1.56,0.64,1)`,
                        zIndex: 0,
                    }}
                />
                {filters.map((f) => (
                    <button
                        key={f}
                        ref={(el) => (refs.current[f] = el)}
                        type="button"
                        role="radio"
                        aria-checked={active === f}
                        onClick={() => onChange(f)}
                        className="home-spec-filter"
                        style={{
                            position: 'relative',
                            zIndex: 1,
                            color: active === f ? 'var(--ds2-color-fg-inverse)' : undefined,
                            flexShrink: 0,
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ============================================================
   Admission form
   ============================================================ */

const SPEC_OPTIONS = SPECIALTIES.map((s) => s.title);

function AdmissionForm({ onSuccess }) {
    const [form, setForm] = useState({ name: '', surname: '', phone: '', spec: '' });
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        setLoading(false);
        setDone(true);
        onSuccess?.();
    };

    if (done) {
        return (
            <div className="home-form__success" role="status">
                <span style={{ fontSize: 20 }}>✓</span>
                Спасибо! Специалист приёмной комиссии свяжется с вами в ближайшее время
            </div>
        );
    }

    return (
        <form className="home-form" onSubmit={handleSubmit} noValidate>
            <h3 className="home-form__title">Хочу учиться здесь</h3>

            <div className="home-form__row">
                <div className="home-form__field">
                    <label className="home-form__label" htmlFor="hf-name">Имя</label>
                    <input
                        id="hf-name"
                        type="text"
                        className="home-form__input"
                        placeholder="Ваше имя"
                        required
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        aria-required="true"
                    />
                </div>
                <div className="home-form__field">
                    <label className="home-form__label" htmlFor="hf-surname">Фамилия</label>
                    <input
                        id="hf-surname"
                        type="text"
                        className="home-form__input"
                        placeholder="Ваша фамилия"
                        required
                        value={form.surname}
                        onChange={(e) => setForm((p) => ({ ...p, surname: e.target.value }))}
                        aria-required="true"
                    />
                </div>
            </div>

            <div className="home-form__field">
                <label className="home-form__label" htmlFor="hf-phone">Телефон</label>
                <input
                    id="hf-phone"
                    type="tel"
                    className="home-form__input"
                    placeholder="+7 (___) ___-__-__"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    aria-required="true"
                />
            </div>

            <div className="home-form__field">
                <label className="home-form__label" htmlFor="hf-spec">Направление</label>
                <select
                    id="hf-spec"
                    className="home-form__select"
                    value={form.spec}
                    onChange={(e) => setForm((p) => ({ ...p, spec: e.target.value }))}
                >
                    <option value="">Выберите специальность</option>
                    {SPEC_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="ds2-btn ds2-btn--primary ds2-btn--lg"
                style={{ width: '100%' }}
                disabled={loading}
                data-source="admission-form"
            >
                {loading ? 'Отправляем...' : 'Поступить'}
            </button>

            <p className="home-form__consent">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
        </form>
    );
}

/* ============================================================
   Page
   ============================================================ */

const HERO_IMAGES = [
    '/images/hero_block3.jpg',
    '/images/hero_block1.jpg',
    '/images/hero_block5.jpg',
    '/images/hero_block2.jpg',
    '/images/hero_block6.jpg',
    '/images/hero_block4.jpg',
];

export default function Home({ openDay }) {
    const [specFilter, setSpecFilter] = useState('Все');
    const [heroIndex, setHeroIndex] = useState(0);
    const formRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
        }, 1500);
        return () => clearInterval(timer);
    }, []);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const filtered = specFilter === 'Все'
        ? SPECIALTIES
        : SPECIALTIES.filter((s) => s.tag === specFilter);

    return (
        <>
            <Head>
                <title>Колледж Фаберже — учим тех, кто создаёт шедевры | Москва</title>
                <meta name="description" content="КДПИ им. Карла Фаберже — колледж дизайна и декоративно-прикладного искусства в Москве. 9 специальностей: ювелир, дизайн интерьера, флористика, текстиль и другие. Поступи после 9 класса." />
            </Head>

            <div className="page-home">
                <HomeHeader onCtaClick={scrollToForm} />

                <main>
                    {/* ================================================
                        01 · HERO
                        ================================================ */}
                    <section className="home-hero">
                        <div className="home-container">
                            <div className="home-hero__inner">
                                <div className="home-hero__content">
                                    <div className="home-hero__kicker">
                                        Колледж декоративно-прикладного искусства
                                    </div>

                                    <h1 className="home-hero__title">
                                        Учим тех, кто создаёт шедевры
                                    </h1>

                                    <p className="home-hero__subtitle">
                                        Здесь рождаются ювелиры, дизайнеры и художники — те, чьи работы останутся
                                    </p>

                                    <div className="home-hero__utp">
                                        Девять специальностей · Три корпуса в Москве · Один путь — в профессию
                                    </div>

                                    <div className="home-hero__ctas">
                                        <button
                                            type="button"
                                            className="ds2-btn ds2-btn--primary ds2-btn--lg"
                                            onClick={scrollToForm}
                                            data-source="hero"
                                        >
                                            Поступить
                                        </button>
                                        <a
                                            href="#works"
                                            className="ds2-btn ds2-btn--ghost ds2-btn--lg"
                                            data-source="hero-works"
                                        >
                                            Смотреть работы →
                                        </a>
                                    </div>

                                    {openDay && (
                                        <div className="home-hero__dod">
                                            <div className="home-hero__dod-text">
                                                День открытых дверей — {openDay.date}, {openDay.time}
                                                <br />
                                                <span style={{ color: 'var(--ds2-color-fg-tertiary)', fontWeight: 400, fontSize: 'var(--ds2-text-body-sm)' }}>
                                                    Приходи — покажем мастерские, расскажем о поступлении
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                className="ds2-btn ds2-btn--primary ds2-btn--sm"
                                                data-source="dod-banner"
                                                style={{ flexShrink: 0 }}
                                            >
                                                Записаться
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="home-hero__visual" aria-hidden="true">
                                    {HERO_IMAGES.map((src, i) => (
                                        <img
                                            key={src}
                                            src={src}
                                            alt=""
                                            className="home-hero__image"
                                            style={{ opacity: heroIndex === i ? 1 : 0 }}
                                        />
                                    ))}
                                    <div className="home-hero__image-label">Студенческие работы</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ================================================
                        02 · SPECIALTIES
                        ================================================ */}
                    <section className="home-section home-specialties" id="specialties">
                        <div className="home-container">
                            <div className="home-section__head">
                                <div className="home-section__kicker">Направления</div>
                                <h2 className="home-section__title">Найди свою специальность</h2>
                            </div>

                            <SpecFilter
                                filters={FILTERS}
                                active={specFilter}
                                onChange={setSpecFilter}
                            />

                            <div className="home-spec-grid">
                                {filtered.map((spec) => (
                                    <a
                                        key={spec.slug}
                                        href={`/specialnosti/${spec.slug}`}
                                        className="home-spec-card"
                                        data-source="spec-card"
                                    >
                                        <div className="home-spec-card__media">
                                            <div className="home-spec-card__image">
                                                {spec.image ? (
                                                    <img src={spec.image} alt="" className="home-spec-card__image-bg" />
                                                ) : null}
                                            </div>
                                            <div className="home-spec-card__pill">{spec.type}</div>
                                        </div>
                                        <div className="home-spec-card__body">
                                            <div className="home-spec-card__meta">{spec.tag}</div>
                                            <h3 className="home-spec-card__title">{spec.title}</h3>
                                            <p className="home-spec-card__utp">{spec.utp}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="home-specialties__footer">
                                <a
                                    href="/abiturientam"
                                    className="home-link-arrow"
                                    data-source="specialnosti-cta"
                                >
                                    Как поступить →
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* ================================================
                        03 · WORKS
                        ================================================ */}
                    <section className="home-section" id="works">
                        <div className="home-container">
                            <div className="home-section__head">
                                <div className="home-section__kicker">Студенческие работы</div>
                                <h2 className="home-section__title">
                                    Они начинают зарабатывать во время учёбы
                                </h2>
                                <p className="home-section__lead">
                                    Первыми купите изделия молодых художников — только здесь, только оригиналы
                                </p>
                            </div>
                        </div>

                        <div className="home-works__carousel-wrap">
                            <div className="home-works__carousel" role="list">
                                {WORKS.map((w) => (
                                    <div key={w.title} className="home-work-tile" role="listitem">
                                        <div className="home-work-tile__image" aria-hidden />
                                        <div className="home-work-tile__caption">
                                            <span>{w.title}</span>
                                            <span className="home-work-tile__author">{w.author}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="home-container">
                            <div className="home-works__footer">
                                <div className="home-works__utp">
                                    Доставка по России · Авторские изделия · Ваш эскиз на изделии
                                </div>
                                <a
                                    href="/shop"
                                    className="ds2-btn ds2-btn--inverse"
                                    data-source="works-gallery"
                                >
                                    Смотреть все работы →
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* ================================================
                        04 · ADVANTAGES
                        ================================================ */}
                    <section className="home-section" style={{ background: 'var(--ds2-color-bg-secondary)' }}>
                        <div className="home-container">
                            <div className="home-section__head">
                                <div className="home-section__kicker">Почему мы</div>
                                <h2 className="home-section__title">
                                    Альма-матер российских художников
                                </h2>
                            </div>

                            <div className="home-advantages__stats">
                                <div className="home-stat">
                                    <div className="home-stat__value">99%</div>
                                    <div className="home-stat__label">выпускников работают по специальности</div>
                                </div>
                                <div className="home-stat">
                                    <div className="home-stat__value">70%</div>
                                    <div className="home-stat__label">открыли своё дело или работают на себя</div>
                                </div>
                                <div className="home-stat">
                                    <div className="home-stat__value">150 000 ₽+</div>
                                    <div className="home-stat__label">средний заработок в первые 3 года</div>
                                </div>
                            </div>

                            <div className="home-partners__title">Где практикуются наши студенты</div>
                            <div className="home-partners__grid">
                                {PARTNERS.map((p) => (
                                    <div key={p} className="home-partner-chip">{p}</div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ================================================
                        05 · ADMISSION
                        ================================================ */}
                    <section className="home-section" id="admission" ref={formRef}>
                        <div className="home-container">
                            <div className="home-admission__inner">
                                <div className="home-contacts">
                                    <h2 className="home-contacts__title">
                                        Ждём тебя в Колледже ДПИ им. Карла Фаберже
                                    </h2>

                                    <div className="home-contacts__list">
                                        <div className="home-contact-item">
                                            <div className="home-contact-item__label">Адрес</div>
                                            <div className="home-contact-item__value">
                                                г. Москва, Якорная ул., д.6, к.1
                                                <br />
                                                <span style={{ color: 'var(--ds2-color-fg-tertiary)', fontSize: 'var(--ds2-text-body-sm)' }}>
                                                    м. Коломенская
                                                </span>
                                            </div>
                                        </div>

                                        <div className="home-contact-item">
                                            <div className="home-contact-item__label">Телефон</div>
                                            <a
                                                href="tel:+74996171555"
                                                className="home-contact-item__value"
                                                data-source="footer-call"
                                            >
                                                +7 (499) 617-15-55
                                            </a>
                                        </div>

                                        <div className="home-contact-item">
                                            <div className="home-contact-item__label">Email</div>
                                            <a
                                                href="mailto:priem.kdpi@yandex.ru"
                                                className="home-contact-item__value"
                                            >
                                                priem.kdpi@yandex.ru
                                            </a>
                                        </div>

                                        <div className="home-contact-item">
                                            <div className="home-contact-item__label">Режим работы</div>
                                            <div className="home-contact-item__value">
                                                Понедельник–пятница
                                                <br />
                                                <span style={{ color: 'var(--ds2-color-fg-tertiary)' }}>9:00–17:30</span>
                                            </div>
                                        </div>
                                    </div>

                                    {openDay && (
                                        <div className="home-hero__dod" style={{ marginTop: 8 }}>
                                            <div className="home-hero__dod-text">
                                                День открытых дверей — {openDay.date}, {openDay.time}
                                            </div>
                                            <button
                                                type="button"
                                                className="ds2-btn ds2-btn--primary ds2-btn--sm"
                                                data-source="dod-main"
                                                style={{ flexShrink: 0 }}
                                            >
                                                Записаться
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <AdmissionForm />
                            </div>
                        </div>
                    </section>

                    {/* ================================================
                        06 · NEWS
                        ================================================ */}
                    <section className="home-section home-news" style={{ background: 'var(--ds2-color-bg-secondary)' }}>
                        <div className="home-container">
                            <div className="home-section__head">
                                <div className="home-section__kicker">Жизнь колледжа</div>
                                <h2 className="home-section__title">Новости</h2>
                            </div>

                            <div className="home-news__grid">
                                {NEWS_PLACEHOLDER.map((n) => (
                                    <a
                                        key={n.title}
                                        href="/news"
                                        className="home-news-card"
                                    >
                                        <div className="home-news-card__meta">{n.date}</div>
                                        <h3 className="home-news-card__title">{n.title}</h3>
                                        <span className="home-news-card__arrow" aria-hidden>↗</span>
                                    </a>
                                ))}
                            </div>

                            <div className="home-news__footer">
                                <a href="/news" className="home-link-arrow" data-source="news-all">
                                    Все новости →
                                </a>
                            </div>
                        </div>
                    </section>
                </main>

                <HomeFooter />
            </div>
        </>
    );
}
