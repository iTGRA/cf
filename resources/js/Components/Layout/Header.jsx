import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Header() {
    const { site, url } = usePage().props;
    const currentPath = usePage().url;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    return (
        <header
            className="site-header"
            data-scrolled={scrolled ? 'true' : 'false'}
        >
            {/* Utility strip — desktop only */}
            <div className="site-header__strip">
                <div className="site-header__strip-inner">
                    <div className="site-header__strip-left">
                        <a href={site.a11y.href} className="site-header__link">
                            {site.a11y.label}
                        </a>
                    </div>
                    <div className="site-header__strip-right">
                        <a
                            href={site.external.official_site.url}
                            className="site-header__link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {site.external.official_site.label}
                        </a>
                        <span className="site-header__dot" aria-hidden>
                            ·
                        </span>
                        <a
                            href={site.external.moscow_colleges.url}
                            className="site-header__link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {site.external.moscow_colleges.label}
                        </a>
                        <span className="site-header__dot" aria-hidden>
                            ·
                        </span>
                        <ul className="site-header__socials">
                            {site.socials.map((s) => (
                                <li key={s.name}>
                                    <a
                                        href={s.url}
                                        className="site-header__link"
                                        aria-label={s.name}
                                    >
                                        {s.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Main bar */}
            <div className="site-header__bar">
                <div className="site-header__bar-inner">
                    <Link href="/" className="site-header__logo">
                        <span className="site-header__logo-mark">Ф</span>
                        <span className="site-header__logo-text">
                            <span className="site-header__logo-name">
                                Колледж Фаберже
                            </span>
                            <span className="site-header__logo-sub">
                                декоративно-прикладного искусства · Москва
                            </span>
                        </span>
                    </Link>

                    <nav
                        className="site-header__nav"
                        aria-label="Основная навигация"
                    >
                        <ul>
                            {site.nav.map((item) => {
                                const isCurrent =
                                    item.active &&
                                    currentPath.startsWith(item.href);
                                return (
                                    <li key={item.label}>
                                        {item.active ? (
                                            <Link
                                                href={item.href}
                                                className="site-header__nav-link"
                                                aria-current={
                                                    isCurrent ? 'page' : undefined
                                                }
                                                data-current={
                                                    isCurrent ? 'true' : 'false'
                                                }
                                            >
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <span
                                                className="site-header__nav-link"
                                                data-pending="true"
                                                aria-disabled="true"
                                                title="Скоро"
                                            >
                                                {item.label}
                                            </span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="site-header__cta-wrap">
                        <a
                            href="#admission"
                            data-source="header"
                            className="site-header__cta"
                        >
                            Поступить
                        </a>
                        <button
                            type="button"
                            className="site-header__burger"
                            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen((v) => !v)}
                        >
                            <span data-open={mobileOpen ? 'true' : 'false'} />
                            <span data-open={mobileOpen ? 'true' : 'false'} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu overlay */}
            <div
                className="site-header__mobile"
                data-open={mobileOpen ? 'true' : 'false'}
                aria-hidden={!mobileOpen}
            >
                <nav className="site-header__mobile-nav">
                    <ul>
                        {site.nav.map((item) => (
                            <li key={item.label}>
                                {item.active ? (
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span data-pending="true">{item.label}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="site-header__mobile-actions">
                    <a
                        href="#admission"
                        data-source="header-mobile"
                        className="site-header__cta"
                        onClick={() => setMobileOpen(false)}
                    >
                        Поступить
                    </a>
                </div>
                <div className="site-header__mobile-meta">
                    <a
                        href={`tel:${site.priem.phone_tel}`}
                        data-source="header-mobile-call"
                    >
                        {site.priem.phone}
                    </a>
                    <ul className="site-header__mobile-socials">
                        {site.socials.map((s) => (
                            <li key={s.name}>
                                <a href={s.url}>{s.name}</a>
                            </li>
                        ))}
                    </ul>
                    <div className="site-header__mobile-external">
                        <a
                            href={site.external.official_site.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {site.external.official_site.label}
                        </a>
                        <a
                            href={site.external.moscow_colleges.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {site.external.moscow_colleges.label}
                        </a>
                        <a href={site.a11y.href}>{site.a11y.label}</a>
                    </div>
                </div>
            </div>
        </header>
    );
}
