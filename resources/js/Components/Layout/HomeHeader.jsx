import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const NAV = [
    { label: 'Абитуриентам', href: '/abiturientam' },
    { label: 'Студентам', href: '/studentam' },
    { label: 'Чем занимаемся', href: '#works' },
    { label: 'О нас', href: '#about' },
    { label: 'Магазин', href: '/shop' },
];

const SOCIALS = [
    { label: 'VK', href: 'https://vk.com/kdpi_faberge' },
    { label: 'TG', href: 'https://t.me/kdpi_faberge' },
    { label: 'MAX', href: '#' },
];

export default function HomeHeader({ onCtaClick }) {
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 16);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    useEffect(() => {
        document.body.style.overflow = drawerOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [drawerOpen]);

    return (
        <>
            <header className={`home-header${scrolled ? ' home-header--scrolled' : ''}`}>
                <div className="home-container">
                    <div className="home-header__inner">
                        <Link href="/" className="home-header__logo">
                            <span className="home-header__logo-name">Колледж Фаберже</span>
                            <span className="home-header__logo-sub">им. Карла Фаберже · Москва</span>
                        </Link>

                        <nav className="home-header__nav" aria-label="Основная навигация">
                            {NAV.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="home-header__nav-link"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="home-header__actions">
                            <div className="home-header__social" aria-label="Социальные сети">
                                {SOCIALS.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        className="home-header__social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                    >
                                        {s.label}
                                    </a>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="ds2-btn ds2-btn--primary ds2-btn--sm"
                                onClick={onCtaClick}
                                data-source="header"
                            >
                                Поступить
                            </button>

                            <button
                                type="button"
                                className="home-header__burger"
                                onClick={() => setDrawerOpen(true)}
                                aria-label="Открыть меню"
                                aria-expanded={drawerOpen}
                            >
                                <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
                                    <rect y="0" width="20" height="2" rx="1" fill="currentColor" />
                                    <rect y="6" width="20" height="2" rx="1" fill="currentColor" />
                                    <rect y="12" width="14" height="2" rx="1" fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div
                className={`home-drawer${drawerOpen ? ' home-drawer--open' : ''}`}
                aria-hidden={!drawerOpen}
            >
                <div
                    className="home-drawer__backdrop"
                    onClick={() => setDrawerOpen(false)}
                />
                <div className="home-drawer__panel" role="dialog" aria-label="Меню навигации">
                    <div className="home-drawer__head">
                        <Link href="/" className="home-header__logo" onClick={() => setDrawerOpen(false)}>
                            <span className="home-header__logo-name">Колледж Фаберже</span>
                        </Link>
                        <button
                            type="button"
                            className="home-drawer__close"
                            onClick={() => setDrawerOpen(false)}
                            aria-label="Закрыть меню"
                        >
                            ×
                        </button>
                    </div>

                    <nav className="home-drawer__nav">
                        {NAV.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="home-drawer__nav-link"
                                onClick={() => setDrawerOpen(false)}
                            >
                                {item.label}
                                <span aria-hidden style={{ color: 'var(--ds2-color-fg-quaternary)', fontSize: 20 }}>→</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="home-drawer__footer">
                        <button
                            type="button"
                            className="ds2-btn ds2-btn--primary ds2-btn--lg"
                            style={{ width: '100%' }}
                            onClick={() => { setDrawerOpen(false); onCtaClick?.(); }}
                            data-source="header-mobile"
                        >
                            Поступить
                        </button>
                        <div style={{ display: 'flex', gap: 8 }}>
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    className="home-header__social-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {s.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
