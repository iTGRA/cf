import { Head } from '@inertiajs/react';
import { useRef, useState } from 'react';
import HomeFooter from '../Components/Layout/HomeFooter';
import HomeHeader from '../Components/Layout/HomeHeader';
import { SPECIALTIES } from '../data/specialties';

const CAMPUSES = [
    {
        key: 'priem',
        label: 'Приёмная комиссия',
        name: 'Главный корпус',
        address: 'г. Москва, Якорная ул., д.6, к.1',
        metro: 'м. Коломенская',
        phone: '+7 (499) 617-15-55',
        phoneTel: '+74996171555',
        email: 'priem.kdpi@yandex.ru',
        hours: 'Пн–Пт · 9:00–17:30',
        accent: true,
    },
    {
        key: 'hudozh',
        label: 'Корпус',
        name: '«Художественное»',
        address: 'Шипиловская ул., д.17, к.1, стр.2',
        metro: 'м. Шипиловская',
        phone: '+7 (499) 782-07-27',
        phoneTel: '+74997820727',
        email: 'spo-36@edu.mos.ru',
        hours: 'Пн–Пт · 8:00–20:00',
        accent: false,
    },
    {
        key: 'it',
        label: 'Корпус',
        name: '«Информационно-технологическое»',
        address: 'Элеваторная ул., д.19',
        metro: 'м. Царицыно',
        phone: '+7 (495) 327-79-00',
        phoneTel: '+74953277900',
        email: 'spo-36@edu.mos.ru',
        hours: 'Пн–Пт · 8:00–20:00',
        accent: false,
    },
    {
        key: 'tekstil',
        label: 'Корпус',
        name: '«Художественный текстиль»',
        address: 'Якорная ул., д.6, к.1',
        metro: 'м. Коломенская',
        phone: '+7 (499) 618-01-29',
        phoneTel: '+74996180129',
        email: 'spo-36@edu.mos.ru',
        hours: 'Пн–Пт · 8:00–20:00',
        accent: false,
    },
];

function ContactForm({ specialties }) {
    const [form, setForm] = useState({ name: '', phone: '', direction: '', message: '' });
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
                data-source="contacts-form"
            >
                {status === 'loading' ? 'Отправляем...' : 'Поступить'}
            </button>
            <div className="home-form__consent">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </div>
        </form>
    );
}

export default function Contacts() {
    const formRef = useRef(null);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <>
            <Head>
                <title>Контакты и адреса колледжа Фаберже в Москве | Колледж Фаберже</title>
                <meta name="description" content="Адреса, телефоны и режим работы приёмной комиссии и корпусов Колледжа ДПИ им. Карла Фаберже в Москве." />
            </Head>

            <div className="page-contacts">
                <HomeHeader onCtaClick={scrollToForm} />

                {/* ---- Hero ---- */}
                <section className="contacts-hero">
                    <div className="home-container">
                        <div className="home-section__kicker" style={{ marginBottom: 20 }}>Контакты</div>
                        <h1 className="contacts-hero__h1">
                            Контакты и адреса колледжа Фаберже в Москве
                        </h1>
                        <p className="contacts-hero__sub">
                            Приёмная комиссия, три учебных корпуса — найди нас и приходи
                        </p>
                    </div>
                </section>

                {/* ---- Campus cards ---- */}
                <section className="contacts-grid">
                    <div className="home-container">
                        <div className="contacts-grid__items">
                            {CAMPUSES.map((c) => (
                                <div key={c.key} className={`contacts-card${c.accent ? ' contacts-card--accent' : ''}`}>
                                    <div className="contacts-card__kicker">{c.label}</div>
                                    <div className="contacts-card__title">{c.name}</div>

                                    <div className="contacts-card__details">
                                        <div className="contacts-card__row">
                                            <div className="contacts-card__label">Адрес</div>
                                            <div className="contacts-card__value">
                                                {c.address}
                                                <br />
                                                <span style={{ color: 'var(--ds2-color-fg-tertiary)', fontSize: 'var(--ds2-text-meta)' }}>{c.metro}</span>
                                            </div>
                                        </div>

                                        <div className="contacts-card__row">
                                            <div className="contacts-card__label">Телефон</div>
                                            <div className="contacts-card__value">
                                                <a href={`tel:${c.phoneTel}`}>{c.phone}</a>
                                            </div>
                                        </div>

                                        <div className="contacts-card__row">
                                            <div className="contacts-card__label">Email</div>
                                            <div className="contacts-card__value">
                                                <a href={`mailto:${c.email}`}>{c.email}</a>
                                            </div>
                                        </div>

                                        <div className="contacts-card__row">
                                            <div className="contacts-card__label">Режим</div>
                                            <div className="contacts-card__value">{c.hours}</div>
                                        </div>
                                    </div>

                                    {c.accent && (
                                        <button
                                            type="button"
                                            className="ds2-btn ds2-btn--secondary ds2-btn--sm"
                                            onClick={scrollToForm}
                                            data-source="contacts-hero-cta"
                                            style={{ alignSelf: 'flex-start', marginTop: 8 }}
                                        >
                                            Поступить
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---- Map placeholder ---- */}
                <section style={{ borderTop: '1px solid var(--ds2-color-border-subtle)' }}>
                    <div style={{ height: 360, background: 'var(--ds2-color-bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ fontFamily: 'var(--ds2-font-sans)', fontWeight: 600, fontSize: 'var(--ds2-text-label)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ds2-color-fg-quaternary)' }}>
                                Карта
                            </div>
                            <div style={{ fontFamily: 'var(--ds2-font-sans)', fontSize: 'var(--ds2-text-body-sm)', color: 'var(--ds2-color-fg-quaternary)' }}>
                                Якорная ул., д.6, к.1 (м. Коломенская)
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---- Form ---- */}
                <section className="contacts-form-section" ref={formRef}>
                    <div className="home-container">
                        <div className="contacts-form-inner">
                            <div className="contacts-form-promo">
                                <div className="home-section__kicker">Поступление</div>
                                <h2 className="contacts-form-promo__title">
                                    Ждём тебя в Колледже ДПИ им. Карла Фаберже
                                </h2>
                                <p style={{ fontSize: 'var(--ds2-text-body)', lineHeight: 1.6, color: 'var(--ds2-color-fg-secondary)', maxWidth: '44ch' }}>
                                    Заполни заявку — специалист приёмной комиссии расскажет о поступлении, датах, необходимых документах и ответит на все вопросы.
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                                    <a href="tel:+74996171555" style={{ fontFamily: 'var(--ds2-font-sans)', fontWeight: 600, fontSize: 'var(--ds2-text-h3)', color: 'var(--ds2-color-fg-primary)', textDecoration: 'none', letterSpacing: '-0.01em' }}>
                                        +7 (499) 617-15-55
                                    </a>
                                    <div style={{ fontSize: 'var(--ds2-text-body-sm)', color: 'var(--ds2-color-fg-tertiary)' }}>Пн–Пт · 9:00–17:30</div>
                                    <a href="mailto:priem.kdpi@yandex.ru" style={{ fontSize: 'var(--ds2-text-body-sm)', color: 'var(--ds2-color-fg-secondary)', textDecoration: 'none' }}>
                                        priem.kdpi@yandex.ru
                                    </a>
                                </div>
                            </div>

                            <ContactForm specialties={SPECIALTIES} />
                        </div>
                    </div>
                </section>

                <HomeFooter />
            </div>
        </>
    );
}
