import { Head } from '@inertiajs/react';
import { useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';

const COLORS = [
    { token: '--color-background', hex: '#FAFAF8', role: 'Фон страницы — тёплый белый' },
    { token: '--color-surface', hex: '#F2F0EC', role: 'Карточки, блоки на фоне' },
    { token: '--color-ink', hex: '#1A1817', role: 'Основной текст, CTA' },
    { token: '--color-secondary', hex: '#6B6762', role: 'Вторичный текст, метаданные' },
    { token: '--color-muted', hex: '#A8A4A0', role: 'Плейсхолдеры, разделители, disabled' },
    { token: '--color-accent-hover', hex: '#3D3A38', role: 'Hover на кнопках' },
    { token: '--color-border', hex: '#E0DDD8', role: 'Границы, разделители' },
    { token: '--color-border-strong', hex: '#C8C4BE', role: 'Акцентные разделители' },
];

const TYPE = [
    { name: 'H1 Hero', token: '--text-hero', weight: 300, family: 'display', sample: 'Учим тех, кто создаёт шедевры' },
    { name: 'H1 Page', token: '--text-h1', weight: 300, family: 'display', sample: 'Поступить в колледж дизайна в Москве' },
    { name: 'H2', token: '--text-h2', weight: 400, family: 'display', sample: 'Найди свою специальность' },
    { name: 'H3', token: '--text-h3', weight: 400, family: 'display', sample: 'Мастер флористического сервиса' },
    { name: 'Body L', token: '--text-body-l', weight: 400, family: 'body', sample: 'Первыми купите изделия молодых художников — только здесь, только оригиналы.' },
    { name: 'Body M', token: '--text-body-m', weight: 400, family: 'body', sample: 'Девять специальностей, три корпуса в Москве, один путь — в профессию.' },
    { name: 'Body S', token: '--text-body-s', weight: 400, family: 'body', sample: 'Практика на ведущих ювелирных предприятиях Москвы.' },
    { name: 'Caps', token: '--text-caps', weight: 500, family: 'body', caps: true, sample: 'После 9 класса · 1 год 10 месяцев' },
];

const SPACING = [
    { name: 'Section padding (mobile)', value: '80px' },
    { name: 'Section padding (desktop)', value: '120px' },
    { name: 'Section gap (mobile)', value: '64px' },
    { name: 'Section gap (desktop)', value: '96px' },
    { name: 'Container max', value: '1280px' },
    { name: 'Container padding', value: 'clamp(24px, 4vw, 48px)' },
    { name: 'Border radius', value: '0 — везде' },
];

const MOTION = [
    { name: 'Fast', token: '--duration-fast', ms: 150, use: 'Hover/press, мелкие смены состояния' },
    { name: 'Base', token: '--duration-base', ms: 250, use: 'Переходы между состояниями, появление' },
    { name: 'Slow', token: '--duration-slow', ms: 400, use: 'Крупные трансформации, изображения' },
];

function Section({ id, kicker, title, lead, children }) {
    return (
        <section id={id} className="lab__section">
            <div className="lab__section-head">
                {kicker && <div className="lab__kicker">{kicker}</div>}
                <h2 className="lab__section-title">{title}</h2>
                {lead && <p className="lab__section-lead">{lead}</p>}
            </div>
            {children}
        </section>
    );
}

function ColorSwatch({ token, hex, role }) {
    return (
        <div className="lab__swatch">
            <div
                className="lab__swatch-chip"
                style={{ background: `var(${token})` }}
            />
            <div className="lab__swatch-meta">
                <div className="lab__swatch-hex">{hex}</div>
                <div className="lab__swatch-token">{token}</div>
                <div className="lab__swatch-role">{role}</div>
            </div>
        </div>
    );
}

function TypeRow({ name, token, weight, family, caps, sample }) {
    return (
        <div className="lab__type-row">
            <div className="lab__type-meta">
                <div className="lab__type-name">{name}</div>
                <div className="lab__type-token">
                    {token} · {family === 'display' ? 'Cormorant' : 'Inter'} {weight}
                </div>
            </div>
            <div
                className={`lab__type-sample${caps ? ' lab__type-sample--caps' : ''}`}
                style={{
                    fontFamily:
                        family === 'display'
                            ? 'var(--font-display)'
                            : 'var(--font-body)',
                    fontSize: `var(${token})`,
                    fontWeight: weight,
                }}
            >
                {sample}
            </div>
        </div>
    );
}

function LabSpecialtyCard({ tag, title, utp, image }) {
    return (
        <article className="lab-spec">
            <div className="lab-spec__media">
                <div
                    className="lab-spec__image"
                    style={{
                        background: `linear-gradient(135deg, var(--color-border-strong) 0%, var(--color-surface) 100%)`,
                    }}
                    aria-hidden
                />
            </div>
            <div className="lab-spec__body">
                <div className="lab-spec__tag">{tag}</div>
                <h3 className="lab-spec__title">{title}</h3>
                <p className="lab-spec__utp">{utp}</p>
            </div>
        </article>
    );
}

function LabProductCard({ title, author, price, specialty }) {
    return (
        <article className="lab-product">
            <div
                className="lab-product__image"
                style={{
                    background: `linear-gradient(160deg, var(--color-surface) 0%, var(--color-border) 100%)`,
                }}
                aria-hidden
            />
            <div className="lab-product__body">
                <div className="lab-product__specialty">{specialty}</div>
                <h3 className="lab-product__title">{title}</h3>
                <div className="lab-product__author">{author}</div>
                <div className="lab-product__price">{price}</div>
            </div>
        </article>
    );
}

export default function Lab() {
    const [formValue, setFormValue] = useState('');

    return (
        <>
            <Head title="Лаборатория — дизайн-система" />

            <div className="lab">
                <header className="lab__hero">
                    <div className="lab__kicker">Лаборатория</div>
                    <h1 className="lab__hero-title">
                        Дизайн-система
                        <br />
                        <em className="lab__hero-title-em">в одном месте</em>
                    </h1>
                    <p className="lab__hero-lead">
                        Токены, типографика, компоненты, запреты. Правим здесь — меняется везде. Всё читается из{' '}
                        <code className="lab__code">resources/css/tokens.css</code>, компоненты разметки — из BEM-классов в{' '}
                        <code className="lab__code">resources/css/layout.css</code> и{' '}
                        <code className="lab__code">resources/css/lab.css</code>.
                    </p>
                    <nav className="lab__toc" aria-label="Содержание">
                        {[
                            ['Цвета', 'colors'],
                            ['Типографика', 'typography'],
                            ['Пространство', 'spacing'],
                            ['Кнопки', 'buttons'],
                            ['Поля формы', 'forms'],
                            ['Карточки', 'cards'],
                            ['Метки', 'tags'],
                            ['Разделители', 'dividers'],
                            ['Анимации', 'motion'],
                            ['Запреты', 'restrictions'],
                        ].map(([label, id]) => (
                            <a key={id} href={`#${id}`}>
                                {label}
                            </a>
                        ))}
                    </nav>
                </header>

                <Section
                    id="colors"
                    kicker="01"
                    title="Цветовая палитра"
                    lead="Нет цветовых акцентов кроме чёрного — цвет приходит только из фотографий работ студентов. Это создаёт эффект галереи."
                >
                    <div className="lab__swatches">
                        {COLORS.map((c) => (
                            <ColorSwatch key={c.token} {...c} />
                        ))}
                    </div>
                </Section>

                <Section
                    id="typography"
                    kicker="02"
                    title="Типографика"
                    lead="Cormorant Garamond 300/400 для заголовков. Inter 400/500 для UI и текста. Никогда не Bold — теряется изящество."
                >
                    <div className="lab__type">
                        {TYPE.map((t) => (
                            <TypeRow key={t.name} {...t} />
                        ))}
                    </div>
                </Section>

                <Section
                    id="spacing"
                    kicker="03"
                    title="Пространство и ритм"
                    lead="12 колонок, gap 24px, контент на 10 из 12 — много воздуха по краям. Радиус — 0 везде, принципиально."
                >
                    <dl className="lab__table">
                        {SPACING.map((s) => (
                            <div key={s.name} className="lab__table-row">
                                <dt>{s.name}</dt>
                                <dd>{s.value}</dd>
                            </div>
                        ))}
                    </dl>
                </Section>

                <Section
                    id="buttons"
                    kicker="04"
                    title="Кнопки и ссылки"
                    lead="Три варианта. Filled — главный CTA. Outline — второй план. Text+arrow — текстовая ссылка в editorial-стиле."
                >
                    <div className="lab__btn-grid">
                        <div className="lab__btn-cell">
                            <button className="lab__btn lab__btn--filled" type="button">
                                Поступить
                            </button>
                            <div className="lab__btn-label">Primary · filled</div>
                            <div className="lab__btn-note">
                                background var(--color-ink), hover var(--color-accent-hover)
                            </div>
                        </div>
                        <div className="lab__btn-cell">
                            <button className="lab__btn lab__btn--outline" type="button">
                                Смотреть работы
                            </button>
                            <div className="lab__btn-label">Secondary · outline</div>
                            <div className="lab__btn-note">
                                1px solid ink, hover инвертируется
                            </div>
                        </div>
                        <div className="lab__btn-cell">
                            <a href="#" className="lab__btn lab__btn--text">
                                Как поступить <span aria-hidden>→</span>
                            </a>
                            <div className="lab__btn-label">Text link + arrow</div>
                            <div className="lab__btn-note">
                                подчёркнута снизу на 1px, hover opacity 0.6
                            </div>
                        </div>
                    </div>
                </Section>

                <Section
                    id="forms"
                    kicker="05"
                    title="Поля формы"
                    lead="Editorial-стиль. Только нижняя линия. Без рамок, без фона, без скруглений."
                >
                    <form className="lab__form" onSubmit={(e) => e.preventDefault()}>
                        <div className="lab__field">
                            <label htmlFor="lab-name">Имя</label>
                            <input
                                id="lab-name"
                                type="text"
                                placeholder="Ваше имя"
                                value={formValue}
                                onChange={(e) => setFormValue(e.target.value)}
                            />
                        </div>
                        <div className="lab__field">
                            <label htmlFor="lab-phone">Телефон</label>
                            <input
                                id="lab-phone"
                                type="tel"
                                placeholder="+7 (___) ___-__-__"
                            />
                        </div>
                        <div className="lab__field">
                            <label htmlFor="lab-dir">Направление</label>
                            <select id="lab-dir" defaultValue="">
                                <option value="" disabled>
                                    Выберите специальность
                                </option>
                                <option>Ювелир</option>
                                <option>Флористика</option>
                                <option>Дизайн интерьера</option>
                            </select>
                        </div>
                        <button className="lab__btn lab__btn--filled" type="submit">
                            Поступить
                        </button>
                    </form>
                </Section>

                <Section
                    id="cards"
                    kicker="06"
                    title="Карточки"
                    lead="Карточка специальности — для блока 02 главной и хаба «Абитуриентам». Карточка товара — для магазина и блока 04."
                >
                    <div className="lab__cards-block">
                        <div className="lab__cards-label">Карточка специальности — сетка gap:1px</div>
                        <div className="lab__spec-grid">
                            <LabSpecialtyCard
                                tag="Профессия"
                                title="Ювелир"
                                utp="Альма-матер российских ювелиров — начни здесь"
                            />
                            <LabSpecialtyCard
                                tag="Специальность"
                                title="Дизайн интерьера"
                                utp="Создавай пространства, в которых хочется жить"
                            />
                            <LabSpecialtyCard
                                tag="Профессия"
                                title="Мастер флористического сервиса"
                                utp="Флористика как профессия — быстрый старт за 2 года"
                            />
                        </div>
                    </div>
                    <div className="lab__cards-block">
                        <div className="lab__cards-label">Карточка товара — для карусели/магазина</div>
                        <div className="lab__product-grid">
                            <LabProductCard
                                specialty="Ювелирное дело"
                                title="Кольцо «Листва»"
                                author="Анна Петрова"
                                price="28 400 ₽"
                            />
                            <LabProductCard
                                specialty="Текстиль"
                                title="Платок шёлковый, 90×90"
                                author="Мария Иванова"
                                price="12 900 ₽"
                            />
                            <LabProductCard
                                specialty="ДПИ"
                                title="Жостовский поднос"
                                author="Студия 3-го курса"
                                price="18 500 ₽"
                            />
                        </div>
                    </div>
                </Section>

                <Section
                    id="tags"
                    kicker="07"
                    title="Метки и таги"
                    lead="Тип специальности, категория магазина, статус. Caps · letter-spacing 0.1em."
                >
                    <div className="lab__tags">
                        <span className="lab__tag">Специальность</span>
                        <span className="lab__tag">Профессия</span>
                        <span className="lab__tag">ДПИ</span>
                        <span className="lab__tag">Ювелирное</span>
                        <span className="lab__tag">Текстиль</span>
                        <span className="lab__tag lab__tag--solid">В наличии</span>
                    </div>
                </Section>

                <Section
                    id="dividers"
                    kicker="08"
                    title="Разделители секций"
                    lead="Один приём — тонкая горизонтальная линия 1px. Никаких орнаментов."
                >
                    <div className="lab__dividers">
                        <div className="lab__divider" />
                        <div className="lab__divider-note">
                            1px solid var(--color-border)
                        </div>
                        <div className="lab__divider lab__divider--strong" />
                        <div className="lab__divider-note">
                            1px solid var(--color-border-strong)
                        </div>
                    </div>
                </Section>

                <Section
                    id="motion"
                    kicker="09"
                    title="Анимации"
                    lead="Три длительности, одна функция. cubic-bezier(0.4, 0, 0.2, 1) — плавно без отскоков."
                >
                    <div className="lab__motion">
                        {MOTION.map((m) => (
                            <div key={m.name} className="lab__motion-cell">
                                <div
                                    className="lab__motion-demo"
                                    style={{
                                        transitionDuration: `${m.ms}ms`,
                                    }}
                                />
                                <div className="lab__motion-meta">
                                    <div className="lab__motion-name">{m.name}</div>
                                    <div className="lab__motion-value">
                                        {m.token} · {m.ms}ms
                                    </div>
                                    <div className="lab__motion-use">{m.use}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="lab__motion-hint">
                        Наведи на демо-квадраты — увидишь разницу.
                    </p>
                </Section>

                <Section
                    id="restrictions"
                    kicker="10"
                    title="Запрещено"
                    lead="Паттерны, которые ломают язык институции. Если видишь такое в макете — отклоняем."
                >
                    <ul className="lab__dont">
                        <li>Цветные кнопки (синий, зелёный, красный)</li>
                        <li>Градиенты в UI</li>
                        <li>Box-shadow на карточках</li>
                        <li>Скругления <code>border-radius &gt; 0</code></li>
                        <li><code>overflow-x: hidden</code> на html/body — только <code>clip</code></li>
                        <li>Bold (600+) на Cormorant Garamond</li>
                        <li>Чистый <code>#FFFFFF</code> и <code>#000000</code> напрямую — только через токены</li>
                        <li>Element-resets вне <code>@layer base</code></li>
                        <li>Стоковые цветные иконки — только SVG из набора проекта</li>
                        <li>«Уважаемые абитуриенты», «Добро пожаловать» — в любом тексте</li>
                    </ul>
                </Section>
            </div>
        </>
    );
}

Lab.layout = (page) => <SiteLayout>{page}</SiteLayout>;
