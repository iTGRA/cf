import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { site } = usePage().props;
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <div className="site-footer__top">
                    <div>
                        <h2 className="site-footer__slogan">{site.slogan}</h2>
                    </div>

                    <div>
                        <div className="site-footer__col-title">Разделы</div>
                        <nav className="site-footer__nav" aria-label="Навигация по разделам">
                            <ul>
                                {site.nav.map((item) => (
                                    <li key={item.label}>
                                        {item.active ? (
                                            <Link href={item.href}>
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <span data-pending="true">
                                                {item.label}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div>
                        <div className="site-footer__col-title">
                            Приёмная комиссия
                        </div>
                        <div className="site-footer__priem">
                            <div>{site.priem.address}</div>
                            <div className="site-footer__priem-meta">
                                {site.priem.metro}
                            </div>
                            <a
                                href={`tel:${site.priem.phone_tel}`}
                                data-source="footer-call"
                            >
                                {site.priem.phone}
                            </a>
                            <a
                                href={`mailto:${site.priem.email}`}
                                data-source="footer-email"
                            >
                                {site.priem.email}
                            </a>
                            <div className="site-footer__priem-meta">
                                {site.priem.hours}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="site-footer__corpuses">
                    {site.corpuses.map((c) => (
                        <div key={c.name}>
                            <div className="site-footer__corpus-title">
                                {c.name}
                            </div>
                            <div className="site-footer__corpus-body">
                                <div>{c.address}</div>
                                <a
                                    href={`tel:${c.phone_tel}`}
                                    data-source="footer-corpus-call"
                                >
                                    {c.phone}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="site-footer__bottom">
                    <div>© {year} · {site.mark}</div>
                    <ul>
                        <li>
                            <a
                                href={site.external.official_site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {site.external.official_site.label}
                            </a>
                        </li>
                        <li>
                            <a
                                href={site.external.moscow_colleges.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {site.external.moscow_colleges.label}
                            </a>
                        </li>
                        {site.legal.map((l) => (
                            <li key={l.label}>
                                <Link href={l.href}>{l.label}</Link>
                            </li>
                        ))}
                        <li>
                            <a href={site.a11y.href}>{site.a11y.label}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
