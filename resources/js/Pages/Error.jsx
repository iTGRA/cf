import { Head, Link } from '@inertiajs/react';
import HomeFooter from '../Components/Layout/HomeFooter';
import HomeHeader from '../Components/Layout/HomeHeader';

const MESSAGES = {
    404: {
        code: '404',
        title: 'Страница не найдена',
        desc: 'Возможно, адрес изменился или страница была удалена',
    },
    403: {
        code: '403',
        title: 'Доступ запрещён',
        desc: 'У вас нет прав для просмотра этой страницы',
    },
    500: {
        code: '500',
        title: 'Ошибка сервера',
        desc: 'Что-то пошло не так. Мы уже разбираемся',
    },
    503: {
        code: '503',
        title: 'Сайт на обслуживании',
        desc: 'Скоро вернёмся — следите за обновлениями',
    },
};

export default function Error({ status }) {
    const info = MESSAGES[status] ?? {
        code: String(status),
        title: 'Что-то пошло не так',
        desc: 'Попробуйте вернуться на главную',
    };

    return (
        <>
            <Head>
                <title>{info.title} | Колледж Фаберже</title>
                <meta name="robots" content="noindex" />
            </Head>

            <div className="page-news">
                <HomeHeader />

                <section style={{ paddingTop: 160, paddingBottom: 160 }}>
                    <div className="home-container">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 560 }}>
                            <div style={{ fontFamily: 'var(--ds2-font-sans)', fontSize: 'clamp(80px, 12vw, 160px)', fontWeight: 200, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--ds2-color-fg-quaternary)' }}>
                                {info.code}
                            </div>
                            <h1 style={{ fontFamily: 'var(--ds2-font-sans)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--ds2-color-fg-primary)' }}>
                                {info.title}
                            </h1>
                            <p style={{ fontFamily: 'var(--ds2-font-sans)', fontSize: 'var(--ds2-text-lead)', lineHeight: 1.5, color: 'var(--ds2-color-fg-secondary)' }}>
                                {info.desc}
                            </p>
                            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
                                <Link href="/" className="ds2-btn ds2-btn--primary ds2-btn--lg">
                                    На главную
                                </Link>
                                <Link href="/contacts" className="ds2-btn ds2-btn--secondary ds2-btn--lg">
                                    Контакты
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <HomeFooter />
            </div>
        </>
    );
}
