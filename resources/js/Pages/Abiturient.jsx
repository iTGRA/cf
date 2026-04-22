import { Head, Link } from '@inertiajs/react';
import { useLayoutEffect, useRef, useState } from 'react';
import HomeFooter from '../Components/Layout/HomeFooter';
import HomeHeader from '../Components/Layout/HomeHeader';
import { SPECIALTIES, SPECIALTY_FILTERS, SPECIALTY_TYPES } from '../data/specialties';

/* ============================================================
   NavPillBar — filter component (DS2 signature)
   ============================================================ */

function PillBar({ items, active, onChange, label }) {
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
        <div role="group" aria-label={label} style={{ position: 'relative', display: 'inline-flex', background: 'var(--ds2-color-bg-elevated)', borderRadius: 'var(--ds2-radius-full)', padding: '4px', boxShadow: 'var(--ds2-shadow-float)', gap: 2, overflowX: 'auto', maxWidth: '100%', scrollbarWidth: 'none' }}>
            <span
                aria-hidden
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
            {items.map((item) => (
                <button
                    key={item}
                    ref={(el) => { refs.current[item] = el; }}
                    type="button"
                    role="radio"
                    aria-checked={active === item}
                    onClick={() => onChange(item)}
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
                        color: active === item ? 'var(--ds2-color-fg-inverse)' : 'var(--ds2-color-fg-secondary)',
                        cursor: 'pointer',
                        borderRadius: 'var(--ds2-radius-full)',
                        whiteSpace: 'nowrap',
                        transition: 'color 200ms',
                    }}
                >
                    {item}
                </button>
            ))}
        </div>
    );
}

/* ============================================================
   Courses form
   ============================================================ */

function CoursesForm({ specialties }) {
    const [form, setForm] = useState({ name: '', phone: '', direction: '' });
    const [status, setStatus] = useState('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');
        setTimeout(() => setStatus('success'), 800);
    };

    if (status === 'success') {
        return (
            <div className="home-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 260, gap: 16, textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--ds2-color-accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>✓</div>
                <div style={{ fontFamily: 'var(--ds2-font-sans)', fontWeight: 600, fontSize: 'var(--ds2-text-h3)', color: 'var(--ds2-color-fg-primary)' }}>
                    Спасибо!
                </div>
                <div style={{ fontSize: 'var(--ds2-text-body-sm)', color: 'var(--ds2-color-fg-secondary)', maxWidth: 36 + 'ch' }}>
                    Мы свяжемся с вами и расскажем о ближайшем наборе
                </div>
            </div>
        );
    }

    return (
        <form className="home-form" onSubmit={handleSubmit}>
            <div className="home-form__title">Записаться на подготовительные курсы</div>
            <div className="home-form__fields">
                <input
                    className="home-form__input"
                    type="text"
                    placeholder="Ваше имя"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    className="home-form__input"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                />
                <select
                    className="home-form__select"
                    value={form.direction}
                    onChange={(e) => setForm({ ...form, direction: e.target.value })}
                >
                    <option value="">Выберите специальность</option>
                    {specialties.map((s) => (
                        <option key={s.slug} value={s.slug}>{s.title}</option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                className="ds2-btn ds2-btn--primary ds2-btn--lg"
                style={{ width: '100%' }}
                disabled={status === 'loading'}
                data-source="courses-abit"
            >
                {status === 'loading' ? 'Отправляем...' : 'Записаться'}
            </button>
            <div className="home-form__consent">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </div>
        </form>
    );
}

/* ============================================================
   Specialty Card
   ============================================================ */

function SpecCard({ spec }) {
    return (
        <Link href={`/specialnosti/${spec.slug}`} className="home-spec-card">
            <div className="home-spec-card__media">
                <div className="home-spec-card__image">
                    {spec.image ? (
                        <img src={spec.image} alt="" className="home-spec-card__image-bg" />
                    ) : null}
                </div>
                <div className="home-spec-card__pill">{spec.tag}</div>
            </div>
            <div className="home-spec-card__body">
                <div className="home-spec-card__meta">{spec.type} · {spec.code}</div>
                <div className="home-spec-card__title">{spec.title}</div>
                <div className="home-spec-card__utp">{spec.utp}</div>
                <div style={{ marginTop: 'auto', paddingTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--ds2-font-sans)', fontSize: 'var(--ds2-text-meta)', color: 'var(--ds2-color-fg-tertiary)', fontWeight: 500 }}>
                        {spec.duration}
                    </span>
                    <span style={{ color: 'var(--ds2-color-fg-quaternary)' }}>·</span>
                    <span style={{ fontFamily: 'var(--ds2-font-sans)', fontSize: 'var(--ds2-text-meta)', color: 'var(--ds2-color-fg-tertiary)', fontWeight: 500 }}>
                        {spec.campus}
                    </span>
                </div>
            </div>
        </Link>
    );
}

/* ============================================================
   Page
   ============================================================ */

export default function Abiturient({ openDay }) {
    const [activeTag, setActiveTag] = useState('Все');
    const [activeType, setActiveType] = useState('Все');
    const formRef = useRef(null);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const filtered = SPECIALTIES.filter((s) => {
        const tagOk = activeTag === 'Все' || s.tag === activeTag;
        const typeOk = activeType === 'Все' || s.type === activeType;
        return tagOk && typeOk;
    });

    return (
        <>
            <Head>
                <title>Абитуриентам — специальности и поступление | Колледж Фаберже</title>
                <meta name="description" content="9 специальностей — дизайн, ювелирное дело, флористика, текстиль. Поступление после 9 класса. Бюджетные места. Колледж им. Карла Фаберже, Москва." />
            </Head>

            <div className="page-abiturient">
                <HomeHeader onCtaClick={scrollToForm} />

                {/* ---- Hero ---- */}
                <section className="abit-hero">
                    <div className="home-container">
                        <div className="abit-hero__kicker">Абитуриентам</div>
                        <h1 className="abit-hero__h1">
                            Поступить в колледж дизайна и искусства в Москве
                        </h1>
                        <p className="abit-hero__sub">
                            Кем хочешь стать? Найди своё направление — и сделай первый шаг в профессию
                        </p>

                        <div className="abit-hero__filters">
                            <PillBar
                                items={SPECIALTY_FILTERS}
                                active={activeTag}
                                onChange={setActiveTag}
                                label="Фильтр по направлению"
                            />
                            <div className="abit-hero__filter-row">
                                {SPECIALTY_TYPES.map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        className={`abit-type-btn${activeType === t ? ' abit-type-btn--active' : ''}`}
                                        onClick={() => setActiveType(t)}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---- Specialties grid ---- */}
                <section className="abit-specs">
                    <div className="home-container">
                        <div className="abit-specs__controls">
                            <div className="abit-specs__count">
                                {filtered.length === SPECIALTIES.length
                                    ? `${SPECIALTIES.length} специальностей и профессий`
                                    : `${filtered.length} из ${SPECIALTIES.length}`}
                            </div>
                        </div>

                        {filtered.length > 0 ? (
                            <div className="home-spec-grid">
                                {filtered.map((s) => (
                                    <SpecCard key={s.slug} spec={s} />
                                ))}
                            </div>
                        ) : (
                            <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--ds2-color-fg-tertiary)', fontFamily: 'var(--ds2-font-sans)' }}>
                                Ничего не найдено — попробуй другой фильтр
                            </div>
                        )}
                    </div>
                </section>

                {/* ---- Admission calendar ---- */}
                <section className="abit-calendar">
                    <div className="home-container">
                        <div className="home-section__head">
                            <div className="home-section__kicker">Когда поступать</div>
                            <h2 className="home-section__title">Календарь абитуриента</h2>
                        </div>

                        <div className="abit-calendar__grid">
                            <div className="abit-calendar__step">
                                <div className="abit-calendar__num">01</div>
                                <div className="abit-calendar__label">Шаг первый</div>
                                <div className="abit-calendar__title">Дни открытых дверей</div>
                                <div className="abit-calendar__desc">
                                    Приходи, смотри мастерские, задавай вопросы — найди своё направление
                                </div>
                                <button
                                    type="button"
                                    className="ds2-btn ds2-btn--secondary ds2-btn--sm"
                                    onClick={scrollToForm}
                                    data-source="calendar-dod"
                                    style={{ alignSelf: 'flex-start', marginTop: 8 }}
                                >
                                    Записаться на ДОД
                                </button>
                            </div>

                            <div className="abit-calendar__step abit-calendar__step--accent">
                                <div className="abit-calendar__num">02</div>
                                <div className="abit-calendar__label">Шаг второй</div>
                                <div className="abit-calendar__title">Подача документов</div>
                                <div className="abit-calendar__desc">
                                    С 20 июня по 15 августа — подай документы в приёмную комиссию
                                </div>
                                <button
                                    type="button"
                                    className="ds2-btn ds2-btn--secondary ds2-btn--sm"
                                    onClick={() => {
                                        document.querySelector('.abit-docs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }}
                                    data-source="calendar-docs"
                                    style={{ alignSelf: 'flex-start', marginTop: 8 }}
                                >
                                    Какие документы нужны
                                </button>
                            </div>

                            <div className="abit-calendar__step">
                                <div className="abit-calendar__num">03</div>
                                <div className="abit-calendar__label">Шаг третий</div>
                                <div className="abit-calendar__title">Зачисление</div>
                                <div className="abit-calendar__desc">
                                    До 25 августа — приказ о зачислении, начало занятий в сентябре
                                </div>
                                <button
                                    type="button"
                                    className="ds2-btn ds2-btn--primary ds2-btn--sm"
                                    onClick={scrollToForm}
                                    data-source="calendar-enroll"
                                    style={{ alignSelf: 'flex-start', marginTop: 8 }}
                                >
                                    Поступить
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---- Documents ---- */}
                <section className="abit-docs">
                    <div className="home-container">
                        <div className="abit-docs__inner">
                            <div>
                                <div className="home-section__head" style={{ marginBottom: 0 }}>
                                    <div className="home-section__kicker">Поступление</div>
                                    <h2 className="home-section__title">Какие документы нужны</h2>
                                </div>

                                <div className="abit-docs__list" style={{ marginTop: 40 }}>
                                    {[
                                        'Паспорт (оригинал + копия)',
                                        'Аттестат об окончании 9 классов (оригинал)',
                                        'Медицинская справка (форма 086/у)',
                                        '6 фотографий 3×4',
                                        'СНИЛС',
                                        'Для льготников — подтверждающие документы',
                                    ].map((doc) => (
                                        <div key={doc} className="abit-docs__item">
                                            <div className="abit-docs__icon">
                                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
                                                    <path d="M1 4l2.5 2.5L9 1" stroke="#0E0E0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <span className="abit-docs__text">{doc}</span>
                                        </div>
                                    ))}
                                </div>

                                <p className="abit-docs__note">
                                    Всё остальное объяснят в приёмной комиссии
                                </p>
                                <div className="abit-docs__contact">
                                    <a href="tel:+74996171555">+7 (499) 617-15-55</a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                <div style={{ background: 'var(--ds2-color-bg-elevated)', padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div className="home-section__kicker">Приёмная комиссия</div>
                                    <div style={{ fontFamily: 'var(--ds2-font-sans)', fontSize: 'var(--ds2-text-h3)', fontWeight: 500, lineHeight: 1.3, color: 'var(--ds2-color-fg-primary)' }}>
                                        г. Москва, Якорная ул., д.6, к.1
                                        <br />
                                        <span style={{ fontWeight: 400, fontSize: 'var(--ds2-text-body)', color: 'var(--ds2-color-fg-tertiary)' }}>м. Коломенская</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <a
                                            href="tel:+74996171555"
                                            style={{ fontFamily: 'var(--ds2-font-sans)', fontWeight: 600, fontSize: 'var(--ds2-text-body)', color: 'var(--ds2-color-fg-primary)', textDecoration: 'none' }}
                                        >
                                            +7 (499) 617-15-55
                                        </a>
                                        <a
                                            href="mailto:priem.kdpi@yandex.ru"
                                            style={{ fontFamily: 'var(--ds2-font-sans)', fontWeight: 400, fontSize: 'var(--ds2-text-body-sm)', color: 'var(--ds2-color-fg-secondary)', textDecoration: 'none' }}
                                        >
                                            priem.kdpi@yandex.ru
                                        </a>
                                        <div style={{ fontFamily: 'var(--ds2-font-sans)', fontSize: 'var(--ds2-text-meta)', color: 'var(--ds2-color-fg-tertiary)', marginTop: 4 }}>
                                            Пн–Пт · 9:00–17:30
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="ds2-btn ds2-btn--primary ds2-btn--sm"
                                        onClick={scrollToForm}
                                        data-source="docs-cta"
                                        style={{ alignSelf: 'flex-start', marginTop: 8 }}
                                    >
                                        Хочу поступить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---- Prep courses ---- */}
                <section className="abit-courses" ref={formRef}>
                    <div className="home-container">
                        <div className="abit-courses__inner">
                            <div className="abit-courses__promo">
                                <div className="home-section__kicker">Подготовительные курсы</div>
                                <h2 className="abit-courses__title">
                                    Подготовься к творческому конкурсу
                                </h2>
                                <p className="abit-courses__desc">
                                    Запишись на подготовительные курсы колледжа — и приди на вступительные испытания уверенно.
                                    Занятия ведут преподаватели колледжа.
                                </p>
                                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
                                    {['Академический рисунок', 'Живопись', 'Композиция'].map((tag) => (
                                        <span key={tag} style={{ fontFamily: 'var(--ds2-font-sans)', fontWeight: 600, fontSize: 'var(--ds2-text-label)', letterSpacing: '0.04em', padding: '6px 14px', border: '1.5px solid var(--ds2-color-border-default)', borderRadius: 'var(--ds2-radius-full)', color: 'var(--ds2-color-fg-secondary)' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <CoursesForm specialties={SPECIALTIES} />
                        </div>
                    </div>
                </section>

                <HomeFooter />
            </div>
        </>
    );
}
