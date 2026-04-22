import { Head } from '@inertiajs/react';

export default function Welcome() {
    const year = new Date().getFullYear();

    return (
        <>
            <Head title="Колледж декоративно-прикладного искусства им. Карла Фаберже" />

            <div
                className="flex min-h-screen flex-col justify-between"
                style={{
                    padding: 'var(--container-padding)',
                    background: 'var(--color-background)',
                    color: 'var(--color-ink)',
                }}
            >
                <header
                    className="flex items-center justify-between"
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        fontSize: 'var(--text-caps)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-secondary)',
                    }}
                >
                    <span
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 400,
                            fontSize: '18px',
                            letterSpacing: '0.02em',
                            textTransform: 'none',
                            color: 'var(--color-ink)',
                        }}
                    >
                        КДПИ им. Карла Фаберже
                    </span>
                    <span>Москва</span>
                </header>

                <main className="flex max-w-4xl flex-1 flex-col justify-center py-20">
                    <p
                        className="mb-8"
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 500,
                            fontSize: 'var(--text-caps)',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--color-secondary)',
                        }}
                    >
                        Новый сайт — скоро
                    </p>

                    <h1
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 300,
                            fontSize: 'var(--text-hero)',
                            lineHeight: 'var(--leading-tight)',
                            letterSpacing: '-0.02em',
                            color: 'var(--color-ink)',
                        }}
                    >
                        Учим тех,
                        <br />
                        кто создаёт шедевры
                    </h1>

                    <p
                        className="mt-10 max-w-xl"
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-body-l)',
                            lineHeight: 'var(--leading-loose)',
                            color: 'var(--color-secondary)',
                        }}
                    >
                        Готовим новое цифровое лицо колледжа декоративно-прикладного искусства. Девять специальностей, три корпуса в Москве, один путь — в профессию.
                    </p>

                    <a
                        href="https://collegefaberge.mskobr.ru"
                        className="group mt-12 inline-flex items-center gap-3"
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 500,
                            fontSize: 'var(--text-caps)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--color-ink)',
                            borderBottom: '1px solid var(--color-ink)',
                            paddingBottom: '4px',
                            alignSelf: 'flex-start',
                            transition: 'opacity var(--duration-base) var(--ease-base)',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                        Официальный сайт колледжа
                        <span aria-hidden>→</span>
                    </a>
                </main>

                <footer
                    className="flex flex-wrap items-end justify-between gap-4 pt-8"
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        fontSize: 'var(--text-caps)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-secondary)',
                        borderTop: '1px solid var(--color-border)',
                    }}
                >
                    <span>© {year} · Колледж Фаберже</span>
                    <span>Сайт в разработке</span>
                </footer>
            </div>
        </>
    );
}
