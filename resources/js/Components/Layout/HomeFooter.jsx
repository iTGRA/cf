import { Link } from '@inertiajs/react';

const NAV = [
    { label: 'Абитуриентам', href: '/abiturientam' },
    { label: 'Студентам', href: '/studentam' },
    { label: 'Чем занимаемся', href: '#works' },
    { label: 'О нас', href: '#about' },
    { label: 'Магазин', href: '/shop' },
];

const CAMPUSES = [
    {
        name: '«Художественное»',
        address: 'Шипиловская ул., д.17, к.1, стр.2',
        phone: '+7 (499) 782-07-27',
        phoneTel: '+74997820727',
    },
    {
        name: '«Информационно-технологическое»',
        address: 'Элеваторная ул., д.19',
        phone: '+7 (495) 327-79-00',
        phoneTel: '+74953277900',
    },
    {
        name: '«Художественный текстиль»',
        address: 'Якорная ул., д.6, к.1',
        phone: '+7 (499) 618-01-29',
        phoneTel: '+74996180129',
    },
];

const SOCIALS = [
    { label: 'VK', href: 'https://vk.com/kdpi_faberge' },
    { label: 'TG', href: 'https://t.me/kdpi_faberge' },
    { label: 'MAX', href: '#' },
];

export default function HomeFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="home-footer">
            <div className="home-container">
                <div className="home-footer__top">
                    <div className="home-footer__brand">
                        <div className="home-footer__logo">
                            Колледж декоративно-прикладного искусства<br />им. Карла Фаберже
                        </div>
                        <div className="home-footer__slogan">
                            Учим тех, кто создаёт шедевры
                        </div>
                        <div className="home-footer__socials">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    className="home-footer__social-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                >
                                    {s.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="home-footer__col-title">Разделы</div>
                        <nav className="home-footer__nav" aria-label="Навигация по разделам">
                            {NAV.map((item) => (
                                <Link key={item.label} href={item.href} className="home-footer__nav-link">
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <div className="home-footer__col-title">Корпуса</div>
                        <div className="home-footer__campuses">
                            {CAMPUSES.map((c) => (
                                <div key={c.name} className="home-footer__campus">
                                    <div className="home-footer__campus-name">{c.name}</div>
                                    <div className="home-footer__campus-addr">{c.address}</div>
                                    <a
                                        href={`tel:${c.phoneTel}`}
                                        className="home-footer__campus-addr"
                                        style={{ color: 'rgba(242,242,238,0.5)', textDecoration: 'none' }}
                                        data-source="footer-campus-call"
                                    >
                                        {c.phone}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="home-footer__bottom">
                    <div>© {year} · Колледж ДПИ им. Карла Фаберже</div>
                    <div className="home-footer__bottom-links">
                        <a
                            href="https://collegefaberge.mskobr.ru"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Официальный сайт
                        </a>
                        <a
                            href="https://xn--80adfdgvdeanqg3b.xn--p1ai"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Колледжи Москвы
                        </a>
                        <Link href="/privacy">Политика конфиденциальности</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
