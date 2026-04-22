import { Head } from '@inertiajs/react';

export default function Welcome() {
    const year = new Date().getFullYear();

    return (
        <>
            <Head title="Колледж Фаберже" />

            <div className="relative flex min-h-screen flex-col justify-between overflow-hidden p-6 sm:p-10 md:p-12">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(ellipse at 20% 30%, rgba(200,165,114,0.10), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(200,165,114,0.06), transparent 55%)',
                    }}
                />

                <header className="relative z-10 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-paper-muted)] sm:text-xs">
                    <span className="font-serif text-base tracking-[0.08em] text-[color:var(--color-paper)] normal-case sm:text-lg">
                        Колледж Фаберже
                    </span>
                    <span>Санкт-Петербург</span>
                </header>

                <main className="relative z-10 flex max-w-3xl flex-1 flex-col justify-center py-16">
                    <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[9rem]">
                        Сайт{' '}
                        <em
                            className="italic"
                            style={{ color: 'var(--color-gold)' }}
                        >
                            в разработке
                        </em>
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--color-paper-muted)] sm:mt-8 sm:text-lg">
                        Готовим новое цифровое пространство колледжа — о специальностях, приёмной кампании, жизни и истории. Скоро здесь появится всё самое важное.
                    </p>
                </main>

                <footer className="relative z-10 flex flex-wrap items-end justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-paper-muted)] sm:text-xs">
                    <span className="inline-flex items-center gap-2.5">
                        <span
                            className="h-1.5 w-1.5 animate-pulse rounded-full"
                            style={{ background: 'var(--color-gold)' }}
                        />
                        В работе
                    </span>
                    <span>© {year}</span>
                </footer>
            </div>
        </>
    );
}
