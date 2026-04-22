import { Head, Link } from '@inertiajs/react';
import { useRef, useState } from 'react';
import HomeFooter from '../Components/Layout/HomeFooter';
import HomeHeader from '../Components/Layout/HomeHeader';
import { SPECIALTIES } from '../data/specialties';

/* ============================================================
   Admission form
   ============================================================ */

function AdmissionForm({ specialty, specialties }) {
    const [form, setForm] = useState({
        name: '',
        lastname: '',
        phone: '',
        direction: specialty?.slug || '',
    });
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
                <div style={{ fontSize: 'var(--ds2-text-body-sm)', color: 'var(--ds2-color-fg-secondary)', maxWidth: '36ch' }}>
                    Специалист приёмной комиссии свяжется с вами в ближайшее время
                </div>
            </div>
        );
    }

    return (
        <form className="home-form" onSubmit={handleSubmit}>
            <div className="home-form__title">Хочу учиться здесь</div>
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
                    type="text"
                    placeholder="Ваша фамилия"
                    value={form.lastname}
                    onChange={(e) => setForm({ ...form, lastname: e.target.value })}
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
                data-source="specialty-form"
            >
                {status === 'loading' ? 'Отправляем...' : 'Поступить'}
            </button>
            <div className="home-form__consent">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </div>
        </form>
    );
}

/* ============================================================
   Page
   ============================================================ */

export default function Specialty({ slug }) {
    const specialty = SPECIALTIES.find((s) => s.slug === slug);
    const formRef = useRef(null);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    if (!specialty) {
        return null;
    }

    const otherSpecs = SPECIALTIES.filter((s) => s.slug !== slug && s.tag === specialty.tag).slice(0, 3);

    return (
        <>
            <Head>
                <title>{specialty.h1} | Колледж Фаберже</title>
                <meta name="description" content={`${specialty.title} — ${specialty.utp}. Поступление после 9 класса, бюджетные места. Колледж им. Карла Фаберже, Москва.`} />
            </Head>

            <div className="page-specialty">
                <HomeHeader onCtaClick={scrollToForm} />

                {/* ---- Hero ---- */}
                <section className="spec-hero">
                    <div className="home-container">
                        <nav className="spec-hero__breadcrumb" aria-label="Навигация">
                            <Link href="/">Главная</Link>
                            <span aria-hidden>→</span>
                            <Link href="/abiturientam">Абитуриентам</Link>
                            <span aria-hidden>→</span>
                            <span>{specialty.title}</span>
                        </nav>

                        <div className="spec-hero__inner">
                            <div>
                                <div className="spec-hero__kicker">{specialty.type} · {specialty.tag}</div>
                                <h1 className="spec-hero__h1">{specialty.h1}</h1>
                                <p className="spec-hero__intro">{specialty.intro}</p>

                                <div className="spec-hero__tags">
                                    <span className="spec-hero__tag">{specialty.code}</span>
                                    <span className="spec-hero__tag">{specialty.duration}</span>
                                    <span className="spec-hero__tag">{specialty.base}</span>
                                </div>

                                <div className="spec-hero__ctas">
                                    <button
                                        type="button"
                                        className="ds2-btn ds2-btn--primary ds2-btn--lg"
                                        onClick={scrollToForm}
                                        data-source="specialty-hero"
                                    >
                                        Поступить
                                    </button>
                                    <Link
                                        href="/abiturientam"
                                        className="ds2-btn ds2-btn--secondary ds2-btn--lg"
                                        data-source="specialty-all"
                                    >
                                        Все специальности
                                    </Link>
                                </div>
                            </div>

                            <div className="spec-sidebar">
                                <div className="spec-sidebar__card">
                                    <div className="spec-sidebar__label">Диплом</div>
                                    <div className="spec-sidebar__value">{specialty.diploma}</div>
                                    <div className="spec-sidebar__sub">Квалификация: {specialty.qualification}</div>
                                </div>

                                <div className="spec-sidebar__card">
                                    <div className="spec-sidebar__label">Срок обучения</div>
                                    <div className="spec-sidebar__value">{specialty.duration}</div>
                                    <div className="spec-sidebar__sub">Очная форма · Бюджетные места</div>
                                </div>

                                <div className="spec-sidebar__card">
                                    <div className="spec-sidebar__label">Вступительные испытания</div>
                                    <div className="spec-sidebar__value">{specialty.tests}</div>
                                    <div className="spec-sidebar__sub">{specialty.base}</div>
                                </div>

                                <div className="spec-sidebar__card" style={{ background: 'var(--ds2-color-accent-primary)' }}>
                                    <div className="spec-sidebar__label" style={{ color: 'rgba(14,14,12,0.5)' }}>Зарплата в профессии</div>
                                    <div className="spec-sidebar__value">{specialty.salary}</div>
                                    <div className="spec-sidebar__sub">по данным рынка труда</div>
                                </div>

                                <div className="spec-sidebar__card">
                                    <div className="spec-sidebar__label">Корпус</div>
                                    <div className="spec-sidebar__value" style={{ fontSize: 'var(--ds2-text-body)', fontWeight: 500 }}>«{specialty.campus}»</div>
                                    <div className="spec-sidebar__sub">{specialty.campusAddress}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---- Careers ---- */}
                <section className="spec-info">
                    <div className="home-container">
                        <div className="spec-info__inner">
                            <div>
                                <div className="home-section__head" style={{ marginBottom: 32 }}>
                                    <div className="home-section__kicker">После выпуска</div>
                                    <h2 className="home-section__title" style={{ maxWidth: '24ch' }}>Кем ты станешь</h2>
                                </div>

                                <div className="spec-careers__list">
                                    {specialty.careers.map((c) => (
                                        <div key={c} className="spec-careers__item">
                                            <div className="spec-careers__dot" />
                                            {c}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
                                <div>
                                    <div className="home-section__kicker" style={{ marginBottom: 20 }}>Карьерный путь</div>
                                    <div className="spec-path">
                                        {specialty.careerPath.map((step, i) => (
                                            <span key={step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <span className={`spec-path__step${i === specialty.careerPath.length - 1 ? ' spec-path__step--last' : ''}`}>
                                                    {step}
                                                </span>
                                                {i < specialty.careerPath.length - 1 ? (
                                                    <span className="spec-path__arrow" aria-hidden="true">→</span>
                                                ) : null}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="home-section__kicker" style={{ marginBottom: 16 }}>Базы практики</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                        {specialty.practice.map((p) => (
                                            <div key={p} style={{ padding: '16px 0', borderBottom: '1px solid var(--ds2-color-border-subtle)', fontFamily: 'var(--ds2-font-sans)', fontSize: 'var(--ds2-text-body)', color: 'var(--ds2-color-fg-primary)' }}>
                                                {p}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---- Form ---- */}
                <section className="spec-form-section" ref={formRef}>
                    <div className="home-container">
                        <div className="spec-form-section__inner">
                            <div className="spec-form-promo">
                                <div className="home-section__kicker">Поступление</div>
                                <h2 className="spec-form-promo__title">
                                    Ждём тебя в Колледже ДПИ им. Карла Фаберже
                                </h2>
                                <p className="spec-form-promo__desc">
                                    Заполни заявку — специалист приёмной комиссии расскажет о поступлении, датах, необходимых документах и ответит на все вопросы.
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                                    <a href="tel:+74996171555" style={{ fontFamily: 'var(--ds2-font-sans)', fontWeight: 600, fontSize: 'var(--ds2-text-h3)', color: 'var(--ds2-color-fg-primary)', textDecoration: 'none', letterSpacing: '-0.01em' }}>
                                        +7 (499) 617-15-55
                                    </a>
                                    <div style={{ fontSize: 'var(--ds2-text-body-sm)', color: 'var(--ds2-color-fg-tertiary)' }}>Пн–Пт · 9:00–17:30</div>
                                </div>
                            </div>

                            <AdmissionForm specialty={specialty} specialties={SPECIALTIES} />
                        </div>
                    </div>
                </section>

                {/* ---- Other specialties in same tag ---- */}
                {otherSpecs.length > 0 ? (
                    <section className="home-section">
                        <div className="home-container">
                            <div className="home-section__head">
                                <div className="home-section__kicker">Похожие направления</div>
                                <h2 className="home-section__title">Ещё из {specialty.tag.toLowerCase()}</h2>
                            </div>
                            <div className="home-spec-grid" style={{ gridTemplateColumns: `repeat(${Math.min(otherSpecs.length, 3)}, 1fr)` }}>
                                {otherSpecs.map((s) => (
                                    <Link key={s.slug} href={`/specialnosti/${s.slug}`} className="home-spec-card">
                                        <div className="home-spec-card__media">
                                            <div className="home-spec-card__image" />
                                            <div className="home-spec-card__pill">{s.tag}</div>
                                        </div>
                                        <div className="home-spec-card__body">
                                            <div className="home-spec-card__meta">{s.type} · {s.code}</div>
                                            <div className="home-spec-card__title">{s.title}</div>
                                            <div className="home-spec-card__utp">{s.utp}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div style={{ marginTop: 40, textAlign: 'center' }}>
                                <Link href="/abiturientam" className="ds2-btn ds2-btn--secondary ds2-btn--lg">
                                    Все специальности
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
