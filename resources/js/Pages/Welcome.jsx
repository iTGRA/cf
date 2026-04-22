import { Head } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';

export default function Welcome() {
    return (
        <>
            <Head title="Колледж декоративно-прикладного искусства им. Карла Фаберже" />

            <div className="welcome-stub">
                <p className="welcome-stub__kicker">Сайт в разработке</p>
                <h1 className="welcome-stub__title">
                    Учим тех,
                    <br />
                    кто создаёт шедевры
                </h1>
                <p className="welcome-stub__lead">
                    Готовим новое цифровое пространство колледжа декоративно-прикладного искусства. Девять специальностей, три корпуса в Москве, один путь — в профессию.
                </p>
                <p className="welcome-stub__note">
                    Сейчас идёт итерация&nbsp;1 — согласование шапки и футера. Дальше — главная страница, страницы специальностей и раздел «Абитуриентам».
                </p>
            </div>
        </>
    );
}

Welcome.layout = (page) => <SiteLayout>{page}</SiteLayout>;
