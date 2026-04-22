import { Head, Link } from '@inertiajs/react';
import HomeFooter from '../Components/Layout/HomeFooter';
import HomeHeader from '../Components/Layout/HomeHeader';

const SECTIONS = [
    {
        title: '1. Общие положения',
        body: 'Настоящая Политика конфиденциальности определяет порядок обработки персональных данных пользователей сайта Колледжа декоративно-прикладного искусства им. Карла Фаберже (далее — Колледж). Используя сайт, вы соглашаетесь с условиями настоящей Политики.',
    },
    {
        title: '2. Собираемые данные',
        body: 'При заполнении форм на сайте мы собираем: имя, фамилию, номер телефона, адрес электронной почты, выбранное направление обучения. Данные используются исключительно для связи с потенциальными абитуриентами и слушателями курсов.',
    },
    {
        title: '3. Цели обработки',
        body: 'Персональные данные обрабатываются в целях: обратной связи по заявке на поступление; информирования о Днях открытых дверей и событиях Колледжа; ответа на вопросы по подготовительным курсам.',
    },
    {
        title: '4. Хранение и защита данных',
        body: 'Данные хранятся на защищённых серверах. Колледж принимает технические и организационные меры для предотвращения несанкционированного доступа, изменения, раскрытия или уничтожения персональных данных.',
    },
    {
        title: '5. Передача третьим лицам',
        body: 'Персональные данные не передаются третьим лицам без согласия субъекта, за исключением случаев, предусмотренных законодательством Российской Федерации.',
    },
    {
        title: '6. Права субъекта данных',
        body: 'Вы вправе запросить доступ к своим данным, их исправление или удаление. Для этого направьте запрос по адресу: priem.kdpi@yandex.ru или позвоните +7 (499) 617-15-55.',
    },
    {
        title: '7. Cookies',
        body: 'Сайт использует файлы cookie для улучшения работы. Вы можете отключить cookies в настройках браузера, однако это может повлиять на функциональность сайта.',
    },
    {
        title: '8. Изменения Политики',
        body: 'Колледж оставляет за собой право вносить изменения в настоящую Политику. Актуальная версия всегда доступна на этой странице.',
    },
];

export default function Privacy() {
    return (
        <>
            <Head>
                <title>Политика конфиденциальности | Колледж Фаберже</title>
                <meta name="robots" content="noindex" />
            </Head>

            <div className="page-news">
                <HomeHeader />

                <section className="news-hero">
                    <div className="home-container">
                        <div className="home-section__kicker" style={{ marginBottom: 16 }}>Документы</div>
                        <h1 className="news-hero__h1">Политика конфиденциальности</h1>
                        <div style={{ marginTop: 16, fontFamily: 'var(--ds2-font-sans)', fontSize: 'var(--ds2-text-body-sm)', color: 'var(--ds2-color-fg-tertiary)' }}>
                            Редакция от апреля 2026 года
                        </div>
                    </div>
                </section>

                <section style={{ paddingBlock: 64 }}>
                    <div className="home-container">
                        <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 0 }}>
                            {SECTIONS.map((s) => (
                                <div key={s.title} style={{ paddingBlock: 32, borderBottom: '1px solid var(--ds2-color-border-subtle)' }}>
                                    <h2 style={{ fontFamily: 'var(--ds2-font-sans)', fontSize: 'var(--ds2-text-h3)', fontWeight: 500, marginBottom: 16, color: 'var(--ds2-color-fg-primary)' }}>
                                        {s.title}
                                    </h2>
                                    <p style={{ fontFamily: 'var(--ds2-font-sans)', fontSize: 'var(--ds2-text-body)', lineHeight: 1.65, color: 'var(--ds2-color-fg-secondary)' }}>
                                        {s.body}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: 48 }}>
                            <Link href="/" style={{ fontFamily: 'var(--ds2-font-sans)', fontWeight: 500, fontSize: 'var(--ds2-text-body)', color: 'var(--ds2-color-fg-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                ← На главную
                            </Link>
                        </div>
                    </div>
                </section>

                <HomeFooter />
            </div>
        </>
    );
}
