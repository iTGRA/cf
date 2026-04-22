import { Head, Link } from '@inertiajs/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/* === Data =============================================================== */

const BG_COLORS = [
    { token: '--ds2-color-bg-primary', hex: '#F2F2EE', role: 'Основной off-white фон сайта' },
    { token: '--ds2-color-bg-secondary', hex: '#EDEDE9', role: 'Вторичный фон секций и разделителей' },
    { token: '--ds2-color-bg-tertiary', hex: '#E4E4DF', role: 'Hover-зоны, skeleton-стейты' },
    { token: '--ds2-color-bg-elevated', hex: '#FFFFFF', role: 'Карточки, nav-pill, модалки' },
    { token: '--ds2-color-bg-inverse', hex: '#0E0E0C', role: 'Инверс: активный pill, акценты' },
];
const FG_COLORS = [
    { token: '--ds2-color-fg-primary', hex: '#0E0E0C', role: 'Основной текст' },
    { token: '--ds2-color-fg-secondary', hex: '#3B3B38', role: 'Lead, описания' },
    { token: '--ds2-color-fg-tertiary', hex: '#73736E', role: 'Meta, подписи, нумерация' },
    { token: '--ds2-color-fg-quaternary', hex: '#A8A8A2', role: 'Disabled, placeholder' },
    { token: '--ds2-color-fg-inverse', hex: '#F2F2EE', role: 'Текст на тёмном фоне' },
];
const ACCENTS = [
    { token: '--ds2-color-accent-primary', hex: '#C6F24E', role: 'Primary CTA · лайм' },
    { token: '--ds2-color-accent-primary-hover', hex: '#B8E63F', role: 'Hover primary' },
    { token: '--ds2-color-accent-primary-active', hex: '#A8D633', role: 'Active/pressed primary' },
    { token: '--ds2-color-accent-primary-subtle', hex: '#EDFACD', role: 'Подложка primary' },
    { token: '--ds2-color-accent-secondary', hex: '#7FD4E0', role: 'Secondary · голубой' },
    { token: '--ds2-color-accent-secondary-hover', hex: '#6CC4D1', role: 'Hover secondary' },
    { token: '--ds2-color-accent-secondary-subtle', hex: '#DAF0F4', role: 'Подложка secondary' },
    { token: '--ds2-color-success', hex: '#6BA368', role: 'Success' },
    { token: '--ds2-color-warning', hex: '#C89B3F', role: 'Warning' },
    { token: '--ds2-color-error', hex: '#B8453E', role: 'Error' },
];

const TYPE = [
    { name: 'Display XL', token: '--ds2-text-display-xl', spec: '96 / 1.02 / 500 / -0.025em', sample: 'Шедевры' },
    { name: 'Display LG', token: '--ds2-text-display-lg', spec: '72 / 1.05 / 500 / -0.02em', sample: 'Учим тех, кто создаёт' },
    { name: 'Display MD', token: '--ds2-text-display-md', spec: '56 / 1.08 / 500 / -0.02em', sample: 'Девять специальностей' },
    { name: 'H1', token: '--ds2-text-h1', spec: '44 / 1.1 / 500 / -0.015em', sample: 'Поступить в колледж дизайна' },
    { name: 'H2', token: '--ds2-text-h2', spec: '32 / 1.15 / 500 / -0.01em', sample: 'Найди свою специальность' },
    { name: 'H3', token: '--ds2-text-h3', spec: '24 / 1.25 / 500 / -0.005em', sample: 'Мастер флористического сервиса' },
    { name: 'H4', token: '--ds2-text-h4', spec: '20 / 1.3 / 600', sample: 'Карточка листинга', weight: 600 },
    { name: 'Lead', token: '--ds2-text-lead', spec: '18 / 1.5 / 500', sample: 'Первыми купите изделия молодых художников — только здесь, только оригиналы.', weight: 500 },
    { name: 'Body LG', token: '--ds2-text-body-lg', spec: '17 / 1.6 / 400', sample: 'Нет цветовых акцентов кроме салатового — цвет приходит из фотографий работ студентов.', weight: 400 },
    { name: 'Body', token: '--ds2-text-body', spec: '15 / 1.6 / 400', sample: 'Основной текст интерфейса, кнопки, формы.', weight: 400 },
    { name: 'Body SM', token: '--ds2-text-body-sm', spec: '14 / 1.5 / 400', sample: 'Вспомогательный текст, описания карточек.', weight: 400 },
    { name: 'Caption', token: '--ds2-text-caption', spec: '13 / 1.4 / 400', sample: 'Подписи к фотографиям работ.', weight: 400 },
    { name: 'Meta', token: '--ds2-text-meta', spec: '12 / 1.4 / 500 / 0.02em', sample: '№ 012 · 22 АПРЕЛЯ 2026', variant: 'meta' },
    { name: 'Label', token: '--ds2-text-label', spec: '11 / 1.3 / 600 / 0.08em', sample: 'UPPERCASE ЛЕЙБЛ СЕКЦИИ', variant: 'label' },
];

const SPACING = [
    ['0', 0], ['0.5', 2], ['1', 4], ['2', 8], ['3', 12], ['4', 16], ['5', 20], ['6', 24],
    ['8', 32], ['10', 40], ['12', 48], ['16', 64], ['20', 80], ['24', 96], ['32', 128],
];

const RADII = [
    { token: 'none', value: 0 },
    { token: 'sm', value: 8 },
    { token: 'md', value: 12 },
    { token: 'lg', value: 16 },
    { token: 'xl', value: 20 },
    { token: '2xl', value: 24 },
    { token: '3xl', value: 32 },
    { token: 'full', value: 9999, display: 'full' },
];

const MOTION = [
    { name: 'Fast', token: '--ds2-duration-fast', ms: 150, class: 'ds2-motion__demo--fast', use: 'Hover-стейты, микроизменения' },
    { name: 'Base', token: '--ds2-duration-base', ms: 250, class: 'ds2-motion__demo--base', use: 'Стандартные переходы' },
    { name: 'Slow · out-expo', token: '--ds2-duration-slow', ms: 400, class: 'ds2-motion__demo--slow', use: 'Sliding, page transitions' },
    { name: 'Slow · spring', token: '--ease-spring', ms: 400, class: 'ds2-motion__demo--spring', use: 'Sliding nav pill · фирменный жест' },
];

const TOC = [
    ['colors', '01 · Цвета'],
    ['typography', '02 · Типографика'],
    ['spacing', '03 · Пространство'],
    ['radii', '04 · Радиусы'],
    ['shadows', '05 · Тени'],
    ['buttons', '06 · Кнопки'],
    ['tags', '07 · Метки'],
    ['navpill', '08 · NavPillBar'],
    ['forms', '09 · Формы'],
    ['cards', '10 · Карточки'],
    ['mediacard', '11 · MediaCard'],
    ['dividers', '12 · Разделители'],
    ['motion', '13 · Анимации'],
    ['fab', '14 · FloatingActionBar'],
    ['a11y', '15 · Accessibility'],
    ['donts', '16 · Запреты'],
];

/* === Bits =============================================================== */

function Section({ id, number, kicker, title, lead, children }) {
    return (
        <section id={id} className="ds2__section">
            <div className="ds2__container">
                <div className="ds2__section-head">
                    <div className="ds2__section-number">{number}</div>
                    <div className="ds2__section-meta">
                        {kicker && <div className="ds2__section-kicker">{kicker}</div>}
                        <h2 className="ds2__section-title">{title}</h2>
                        {lead && <p className="ds2__section-lead">{lead}</p>}
                    </div>
                </div>
                <div className="ds2__container" style={{ paddingInline: 0 }}>
                    {children}
                </div>
            </div>
        </section>
    );
}

function Swatch({ token, hex, role, invert }) {
    return (
        <div className="ds2-swatch">
            <div
                className="ds2-swatch__chip"
                style={{
                    background: `var(${token})`,
                    boxShadow: invert ? 'inset 0 0 0 1px rgba(255,255,255,0.08)' : undefined,
                }}
            />
            <div className="ds2-swatch__meta">
                <div className="ds2-swatch__hex">{hex}</div>
                <div className="ds2-swatch__token">{token}</div>
                <div className="ds2-swatch__role">{role}</div>
            </div>
        </div>
    );
}

function NavPillBar({ items }) {
    const [active, setActive] = useState(items[0].id);
    const [slider, setSlider] = useState({ left: 6, width: 0 });
    const itemRefs = useRef({});

    useLayoutEffect(() => {
        const el = itemRefs.current[active];
        if (el) {
            const parentLeft = el.parentElement.getBoundingClientRect().left;
            const rect = el.getBoundingClientRect();
            setSlider({
                left: rect.left - parentLeft,
                width: rect.width,
            });
        }
    }, [active]);

    return (
        <nav className="ds2-navpill" role="tablist">
            <span
                className="ds2-navpill__slider"
                style={{ left: slider.left, width: slider.width }}
                aria-hidden
            />
            {items.map((item) => (
                <button
                    key={item.id}
                    ref={(el) => (itemRefs.current[item.id] = el)}
                    type="button"
                    role="tab"
                    aria-current={active === item.id}
                    className="ds2-navpill__item"
                    onClick={() => setActive(item.id)}
                >
                    {item.label}
                </button>
            ))}
        </nav>
    );
}

/* === Page =============================================================== */

export default function Lab() {
    const [switchOn, setSwitchOn] = useState(true);
    const [choice, setChoice] = useState('yuvelir');

    return (
        <>
            <Head title="Лаборатория · Дизайн-система v2" />

            <div className="ds2">
                <header className="ds2-topbar">
                    <div className="ds2__container">
                        <div className="ds2-topbar__inner">
                            <Link href="/" className="ds2-topbar__mark">
                                Колледж Фаберже<span>Дизайн-система v2</span>
                            </Link>
                            <Link href="/" className="ds2-topbar__back">
                                ← На сайт
                            </Link>
                        </div>
                    </div>
                </header>

                <section className="ds2-hero">
                    <div className="ds2__container">
                        <div className="ds2-hero__kicker">Laboratory · v2 draft</div>
                        <h1 className="ds2-hero__title">
                            Editorial-система
                            <br />
                            в швейцарской традиции
                        </h1>
                        <p className="ds2-hero__lead">
                            Сдержанная сетка Müller-Brockmann, воздух как главный инструмент, типографика вместо иллюстрации, редкий кислотный жест. Основан на арт-дирекшене проекта — референсы Max Pratt, Nion, Whenevr, Rams, B+T Architects.
                        </p>
                        <dl className="ds2-hero__meta">
                            <div className="ds2-hero__meta-item">
                                <dt className="ds2-hero__meta-label">Base unit</dt>
                                <dd className="ds2-hero__meta-value">4px</dd>
                            </div>
                            <div className="ds2-hero__meta-item">
                                <dt className="ds2-hero__meta-label">Grid</dt>
                                <dd className="ds2-hero__meta-value">12 cols · 1680 max</dd>
                            </div>
                            <div className="ds2-hero__meta-item">
                                <dt className="ds2-hero__meta-label">Шрифт</dt>
                                <dd className="ds2-hero__meta-value">Inter Variable</dd>
                            </div>
                            <div className="ds2-hero__meta-item">
                                <dt className="ds2-hero__meta-label">Акцент</dt>
                                <dd className="ds2-hero__meta-value">#C6F24E / #7FD4E0</dd>
                            </div>
                        </dl>
                    </div>
                </section>

                <div className="ds2-toc">
                    <div className="ds2-toc__inner">
                        {TOC.map(([id, label]) => (
                            <a key={id} href={`#${id}`}>
                                {label}
                            </a>
                        ))}
                    </div>
                </div>

                <Section
                    id="colors"
                    number="01"
                    kicker="Palette"
                    title="Цветовая система"
                    lead="Off-white фон — никогда чистого белого. Чистый белый только для плавающих контейнеров. Салатовый — primary CTA, не более 3–5% площади. Голубой — второй акцент, живёт на других уровнях."
                >
                    <div className="ds2-colors">
                        <div className="ds2-colors__group-title">Backgrounds</div>
                        {BG_COLORS.map((c) => (
                            <Swatch key={c.token} {...c} invert={c.hex === '#0E0E0C'} />
                        ))}
                        <div className="ds2-colors__group-title">Foregrounds</div>
                        {FG_COLORS.map((c) => (
                            <Swatch key={c.token} {...c} />
                        ))}
                        <div className="ds2-colors__group-title">Accents & Semantic</div>
                        {ACCENTS.map((c) => (
                            <Swatch key={c.token} {...c} />
                        ))}
                    </div>
                </Section>

                <Section
                    id="typography"
                    number="02"
                    kicker="Type"
                    title="Типографика"
                    lead="Inter Variable. Display-шкала с плотными трекинг-минусами для крупных кеглей. Body — просторный line-height 1.6. Никогда не Justified — в кириллице ломается."
                >
                    <div className="ds2-type">
                        {TYPE.map((t) => (
                            <div key={t.name} className="ds2-type__row">
                                <div className="ds2-type__meta">
                                    <div className="ds2-type__name">{t.name}</div>
                                    <div className="ds2-type__spec">{t.token}</div>
                                    <div className="ds2-type__spec" style={{ color: 'var(--ds2-color-fg-secondary)' }}>
                                        {t.spec}
                                    </div>
                                </div>
                                <div
                                    className={
                                        'ds2-type__sample' +
                                        (t.variant === 'label' ? ' ds2-type__sample--label' : '') +
                                        (t.variant === 'meta' ? ' ds2-type__sample--meta' : '')
                                    }
                                    style={{
                                        fontSize: `var(${t.token})`,
                                        fontWeight:
                                            t.variant === 'label'
                                                ? 600
                                                : t.variant === 'meta'
                                                  ? 500
                                                  : t.weight || 500,
                                        letterSpacing:
                                            t.variant === 'label'
                                                ? '0.08em'
                                                : t.variant === 'meta'
                                                  ? '0.02em'
                                                  : undefined,
                                    }}
                                >
                                    {t.sample}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section
                    id="spacing"
                    number="03"
                    kicker="Space"
                    title="Пространство и сетка"
                    lead="Base unit 4px, baseline 8px. Воздух между секциями — 96–160px. Поля по краям (desktop): 64–120px. 12-колоночная сетка Müller-Brockmann с узким gutter."
                >
                    <div className="ds2-spacing">
                        <div className="ds2-spacing__stack">
                            {SPACING.map(([name, val]) => (
                                <div key={name} className="ds2-spacing__row">
                                    <div className="ds2-spacing__token">space-{name}</div>
                                    <div
                                        className="ds2-spacing__bar"
                                        style={{ width: `${val}px`, minWidth: val === 0 ? 1 : undefined }}
                                    />
                                    <div className="ds2-spacing__value">{val}px</div>
                                </div>
                            ))}
                        </div>
                        <div className="ds2-grid-demo">
                            <div className="ds2-grid-demo__title">Layout grid · 12 cols · desktop</div>
                            <div className="ds2-grid-demo__cols">
                                {Array.from({ length: 12 }, (_, i) => (
                                    <div key={i} className="ds2-grid-demo__col">
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                            <div
                                className="ds2-grid-demo__title"
                                style={{ marginTop: 32 }}
                            >
                                Editorial-паттерны
                            </div>
                            <div className="ds2-spacing__stack" style={{ gap: 8 }}>
                                <div className="ds2-spacing__row">
                                    <div className="ds2-spacing__token">hero</div>
                                    <div className="ds2-spacing__bar" style={{ height: 8, width: '83%' }} />
                                    <div className="ds2-spacing__value">2 + 10</div>
                                </div>
                                <div className="ds2-spacing__row">
                                    <div className="ds2-spacing__token">detail</div>
                                    <div
                                        className="ds2-spacing__bar"
                                        style={{
                                            height: 8,
                                            width: '100%',
                                            background: `linear-gradient(to right,
                                                var(--ds2-color-accent-primary) 0 33.33%,
                                                var(--ds2-color-fg-primary) 33.33% 83.33%,
                                                var(--ds2-color-accent-secondary) 83.33% 100%)`,
                                        }}
                                    />
                                    <div className="ds2-spacing__value">4+6+2</div>
                                </div>
                                <div className="ds2-spacing__row">
                                    <div className="ds2-spacing__token">listing</div>
                                    <div
                                        className="ds2-spacing__bar"
                                        style={{
                                            height: 8,
                                            width: '100%',
                                            background: `linear-gradient(to right,
                                                var(--ds2-color-fg-primary) 0 66.66%,
                                                var(--ds2-color-accent-secondary) 66.66% 100%)`,
                                        }}
                                    />
                                    <div className="ds2-spacing__value">8 + 4</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                <Section
                    id="radii"
                    number="04"
                    kicker="Radius"
                    title="Скругления"
                    lead="Восемь ступеней. На одной странице — не более трёх уровней одновременно. Радиус full — только для pill, тегов, аватаров."
                >
                    <div className="ds2-radii">
                        {RADII.map((r) => (
                            <div key={r.token} className="ds2-radius">
                                <div
                                    className="ds2-radius__box"
                                    style={{
                                        borderRadius: `var(--ds2-radius-${r.token})`,
                                    }}
                                />
                                <div>
                                    <div className="ds2-radius__value">{r.display || `${r.value}px`}</div>
                                    <div className="ds2-radius__token">radius-{r.token}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section
                    id="shadows"
                    number="05"
                    kicker="Elevation"
                    title="Тени"
                    lead="По умолчанию shadow не используется — глубина создаётся воздухом. Исключения только три: floating-компоненты, модалки, focus-ring."
                >
                    <div className="ds2-shadows">
                        <div className="ds2-shadow-cell">
                            <div className="ds2-shadow-cell__surface ds2-shadow-cell__surface--float" />
                            <div className="ds2-shadow-cell__label">--ds2-shadow-float</div>
                            <div className="ds2-shadow-cell__note">
                                FloatingActionBar, Toast, Tooltip. Едва заметный отрыв от полотна.
                            </div>
                        </div>
                        <div className="ds2-shadow-cell">
                            <div className="ds2-shadow-cell__surface ds2-shadow-cell__surface--modal" />
                            <div className="ds2-shadow-cell__label">--ds2-shadow-modal</div>
                            <div className="ds2-shadow-cell__note">
                                Modal и Drawer. Чёткий контекст поверх backdrop-blur.
                            </div>
                        </div>
                        <div className="ds2-shadow-cell">
                            <div className="ds2-shadow-cell__surface ds2-shadow-cell__surface--focus" />
                            <div className="ds2-shadow-cell__label">--ds2-shadow-focus</div>
                            <div className="ds2-shadow-cell__note">
                                Focus-ring на всех интерактивных элементах. Салатовый с прозрачностью.
                            </div>
                        </div>
                    </div>
                </Section>

                <Section
                    id="buttons"
                    number="06"
                    kicker="Actions"
                    title="Кнопки"
                    lead="Primary CTA — всегда салатовый с чёрным текстом, не наоборот. Радиус 12px для обычных, full для pill-вариантов. Focus-ring на всех."
                >
                    <div className="ds2-btn-grid">
                        <div className="ds2-btn-cell">
                            <div className="ds2-btn-cell__label">Primary · filled</div>
                            <div className="ds2-btn-cell__row">
                                <button className="ds2-btn ds2-btn--primary ds2-btn--sm">Поступить</button>
                                <button className="ds2-btn ds2-btn--primary">Поступить</button>
                                <button className="ds2-btn ds2-btn--primary ds2-btn--lg">Поступить</button>
                            </div>
                            <div className="ds2-btn-cell__note">
                                Лайм #C6F24E — чёрный текст. Не инвертируем.
                            </div>
                        </div>
                        <div className="ds2-btn-cell">
                            <div className="ds2-btn-cell__label">Secondary · outline</div>
                            <div className="ds2-btn-cell__row">
                                <button className="ds2-btn ds2-btn--secondary ds2-btn--sm">
                                    Смотреть работы
                                </button>
                                <button className="ds2-btn ds2-btn--secondary">
                                    Смотреть работы
                                </button>
                            </div>
                            <div className="ds2-btn-cell__note">
                                Белая карточка с 1px border. Hover — усиленный border.
                            </div>
                        </div>
                        <div className="ds2-btn-cell">
                            <div className="ds2-btn-cell__label">Ghost</div>
                            <div className="ds2-btn-cell__row">
                                <button className="ds2-btn ds2-btn--ghost">Отмена</button>
                                <button className="ds2-btn ds2-btn--ghost ds2-btn--sm">Подробнее</button>
                            </div>
                            <div className="ds2-btn-cell__note">
                                Без фона. Hover — подложка bg-tertiary.
                            </div>
                        </div>
                        <div className="ds2-btn-cell">
                            <div className="ds2-btn-cell__label">Inverse</div>
                            <div className="ds2-btn-cell__row">
                                <button className="ds2-btn ds2-btn--inverse">Записаться</button>
                                <button className="ds2-btn ds2-btn--inverse ds2-btn--pill">
                                    Открыть каталог
                                </button>
                            </div>
                            <div className="ds2-btn-cell__note">
                                На светлом окружении — как сильный контраст.
                            </div>
                        </div>
                        <div className="ds2-btn-cell">
                            <div className="ds2-btn-cell__label">Pill · nav</div>
                            <div className="ds2-btn-cell__row">
                                <button className="ds2-btn ds2-btn--primary ds2-btn--pill ds2-btn--sm">
                                    Абитуриентам
                                </button>
                                <button className="ds2-btn ds2-btn--secondary ds2-btn--pill ds2-btn--sm">
                                    Студентам
                                </button>
                                <button className="ds2-btn ds2-btn--ghost ds2-btn--pill ds2-btn--sm">
                                    Магазин
                                </button>
                            </div>
                            <div className="ds2-btn-cell__note">
                                Pill-варианты для фильтров, навигации.
                            </div>
                        </div>
                        <div className="ds2-btn-cell">
                            <div className="ds2-btn-cell__label">Icon button</div>
                            <div className="ds2-btn-cell__row">
                                <button className="ds2-btn ds2-btn--secondary ds2-btn--icon" aria-label="Назад">
                                    ←
                                </button>
                                <button className="ds2-btn ds2-btn--secondary ds2-btn--icon" aria-label="Вперёд">
                                    →
                                </button>
                                <button className="ds2-btn ds2-btn--primary ds2-btn--icon" aria-label="Добавить">
                                    +
                                </button>
                                <button className="ds2-btn ds2-btn--inverse ds2-btn--icon" aria-label="Закрыть">
                                    ×
                                </button>
                            </div>
                            <div className="ds2-btn-cell__note">
                                Навигационные стрелки, close, FAB-кнопки.
                            </div>
                        </div>
                    </div>
                </Section>

                <Section
                    id="tags"
                    number="07"
                    kicker="Tags"
                    title="Метки, теги, бейджи"
                    lead="Pill-радиус, разные фоны для семантики. Label-стиль — caps 11px, letter-spacing 0.08em. Meta-стиль — 12px без uppercase."
                >
                    <div className="ds2-tags">
                        <div className="ds2-tag-row">
                            <span className="ds2-tag-row__label">Neutral</span>
                            <span className="ds2-tag">Специальность</span>
                            <span className="ds2-tag">Профессия</span>
                            <span className="ds2-tag ds2-tag--label">После 9 класса</span>
                            <span className="ds2-tag ds2-tag--dot">
                                2 года 10 месяцев
                            </span>
                        </div>
                        <div className="ds2-tag-row">
                            <span className="ds2-tag-row__label">Accent</span>
                            <span className="ds2-tag ds2-tag--primary">Есть бюджет</span>
                            <span className="ds2-tag ds2-tag--primary ds2-tag--label">Новое</span>
                            <span className="ds2-tag ds2-tag--secondary">Дистанционно</span>
                            <span className="ds2-tag ds2-tag--secondary ds2-tag--dot">Info</span>
                        </div>
                        <div className="ds2-tag-row">
                            <span className="ds2-tag-row__label">Semantic</span>
                            <span className="ds2-tag ds2-tag--success ds2-tag--dot">Принят</span>
                            <span className="ds2-tag ds2-tag--warning ds2-tag--dot">Рассматривается</span>
                            <span className="ds2-tag ds2-tag--error ds2-tag--dot">Ошибка</span>
                        </div>
                    </div>
                </Section>

                <Section
                    id="navpill"
                    number="08"
                    kicker="Signature"
                    title="NavPillBar со sliding-анимацией"
                    lead="Активный чёрный pill перемещается между пунктами с упругим spring-easing. Это фирменный жест системы — используется только здесь, больше нигде."
                >
                    <div className="ds2-navpill-demo">
                        <NavPillBar
                            items={[
                                { id: 'a', label: 'Абитуриентам' },
                                { id: 's', label: 'Студентам' },
                                { id: 'w', label: 'Чем занимаемся' },
                                { id: 'o', label: 'О нас' },
                                { id: 'shop', label: 'Магазин' },
                            ]}
                        />
                        <p className="ds2-navpill-demo__caption">
                            Кликни по пунктам — активный pill переезжает с упругим bounce. Transition: left + width, 400ms, cubic-bezier(0.34, 1.56, 0.64, 1).
                        </p>
                        <NavPillBar
                            items={[
                                { id: '1', label: 'Все' },
                                { id: '2', label: 'Ювелирное' },
                                { id: '3', label: 'Дизайн' },
                                { id: '4', label: 'Текстиль' },
                            ]}
                        />
                    </div>
                </Section>

                <Section
                    id="forms"
                    number="09"
                    kicker="Inputs"
                    title="Поля форм"
                    lead="Белая подложка, 1px border, радиус 12px. Focus усиливает границу до 1.5px + салатовый ring. Placeholder — цвет quaternary."
                >
                    <form className="ds2-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="ds2-field">
                            <label className="ds2-field__label" htmlFor="ds2-name">
                                Имя
                            </label>
                            <input
                                id="ds2-name"
                                type="text"
                                className="ds2-input"
                                placeholder="Ваше имя"
                            />
                        </div>
                        <div className="ds2-field">
                            <label className="ds2-field__label" htmlFor="ds2-phone">
                                Телефон
                            </label>
                            <input
                                id="ds2-phone"
                                type="tel"
                                className="ds2-input"
                                placeholder="+7 (___) ___-__-__"
                            />
                            <div className="ds2-field__hint">
                                Для SMS с приглашением на День открытых дверей.
                            </div>
                        </div>
                        <div className="ds2-field">
                            <label className="ds2-field__label" htmlFor="ds2-dir">
                                Направление
                            </label>
                            <select id="ds2-dir" className="ds2-select" defaultValue="">
                                <option value="" disabled>
                                    Выберите специальность
                                </option>
                                <option>Ювелир</option>
                                <option>Флористика</option>
                                <option>Дизайн интерьера</option>
                                <option>Графический дизайнер</option>
                            </select>
                        </div>
                        <div className="ds2-field">
                            <label className="ds2-field__label" htmlFor="ds2-about">
                                Комментарий
                            </label>
                            <textarea
                                id="ds2-about"
                                className="ds2-textarea"
                                placeholder="Что хотите узнать?"
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <label className="ds2-choice ds2-choice--checkbox">
                                <input type="checkbox" defaultChecked />
                                <span className="ds2-choice__box" />
                                Согласен с обработкой персональных данных
                            </label>
                            <label className="ds2-choice ds2-choice--checkbox">
                                <input type="checkbox" />
                                <span className="ds2-choice__box" />
                                Получать новости колледжа
                            </label>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <label className="ds2-choice ds2-choice--radio">
                                <input
                                    type="radio"
                                    name="ds2-spec"
                                    checked={choice === 'yuvelir'}
                                    onChange={() => setChoice('yuvelir')}
                                />
                                <span className="ds2-choice__box" />
                                Ювелир
                            </label>
                            <label className="ds2-choice ds2-choice--radio">
                                <input
                                    type="radio"
                                    name="ds2-spec"
                                    checked={choice === 'dpi'}
                                    onChange={() => setChoice('dpi')}
                                />
                                <span className="ds2-choice__box" />
                                Декоративно-прикладное искусство
                            </label>
                            <label className="ds2-choice ds2-choice--radio">
                                <input
                                    type="radio"
                                    name="ds2-spec"
                                    checked={choice === 'florist'}
                                    onChange={() => setChoice('florist')}
                                />
                                <span className="ds2-choice__box" />
                                Флористика
                            </label>
                        </div>
                        <label className="ds2-switch">
                            <input
                                type="checkbox"
                                checked={switchOn}
                                onChange={(e) => setSwitchOn(e.target.checked)}
                            />
                            <span className="ds2-switch__track">
                                <span className="ds2-switch__thumb" />
                            </span>
                            <span className="ds2-switch__label">
                                Показать подготовительные курсы
                            </span>
                        </label>
                        <button className="ds2-btn ds2-btn--primary ds2-btn--lg" type="submit">
                            Поступить
                        </button>
                    </form>
                </Section>

                <Section
                    id="cards"
                    number="10"
                    kicker="Cards"
                    title="Базовые карточки"
                    lead="Без тени по умолчанию — радиус 20px, padding 32px, белая подложка. Outlined — без фона, только тонкая граница. Elevated — с shadow-float на hover."
                >
                    <div className="ds2-card-grid">
                        <div className="ds2-card">
                            <div className="ds2-card__number">№ 001</div>
                            <h3 className="ds2-card__title">Default</h3>
                            <p className="ds2-card__body">
                                Белая карточка на off-white фоне. Никакой тени. Глубина — через контраст заливки.
                            </p>
                            <div className="ds2-card__variant">variant: default</div>
                        </div>
                        <div className="ds2-card ds2-card--outlined">
                            <div className="ds2-card__number">№ 002</div>
                            <h3 className="ds2-card__title">Outlined</h3>
                            <p className="ds2-card__body">
                                Без фона, 1px border. Для вторичных блоков, когда нужна структура без акцента.
                            </p>
                            <div className="ds2-card__variant">variant: outlined</div>
                        </div>
                        <div className="ds2-card ds2-card--elevated">
                            <div className="ds2-card__number">№ 003</div>
                            <h3 className="ds2-card__title">Elevated · hover</h3>
                            <p className="ds2-card__body">
                                Наведи курсор — карточка поднимается на 4px и получает shadow-float.
                            </p>
                            <div className="ds2-card__variant">variant: elevated</div>
                        </div>
                    </div>
                </Section>

                <Section
                    id="mediacard"
                    number="11"
                    kicker="Signature"
                    title="MediaCard · gradient fade"
                    lead="Ключевая техника: белая подложка «съедает» край изображения через linear-gradient. Текст всегда на чистом белом, никогда на тёмном оверлее. Pill — единственный элемент поверх фото."
                >
                    <div className="ds2-mc-row">
                        <div className="ds2-mc-row__caption">Horizontal · 4+6 columns</div>
                        <div className="ds2-mc ds2-mc--horizontal">
                            <div className="ds2-mc__pill">Профессия</div>
                            <div className="ds2-mc__media">
                                <div className="ds2-mc__image" />
                            </div>
                            <div className="ds2-mc__body">
                                <div className="ds2-mc__meta">Ювелирное дело · 1 год 10 месяцев</div>
                                <h3 className="ds2-mc__title">
                                    Ювелир — альма-матер российских ювелиров
                                </h3>
                                <p className="ds2-mc__desc">
                                    Создавай украшения руками и в 3D — от эскиза до готового изделия. Практика на ведущих ювелирных предприятиях Москвы.
                                </p>
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: 12,
                                        marginTop: 8,
                                    }}
                                >
                                    <button className="ds2-btn ds2-btn--primary ds2-btn--sm">
                                        Поступить
                                    </button>
                                    <button className="ds2-btn ds2-btn--ghost ds2-btn--sm">
                                        Подробнее →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ds2-mc-row ds2-mc-row--verticals">
                        {[
                            {
                                tag: 'Специальность',
                                meta: 'Дизайн · 3 года 10 месяцев',
                                title: 'Дизайн интерьера',
                                desc: 'Создавай пространства, в которых хочется жить.',
                            },
                            {
                                tag: 'Профессия',
                                meta: 'Флористика · 1 год 10 месяцев',
                                title: 'Мастер флористического сервиса',
                                desc: 'Флористика как профессия — быстрый старт за 2 года.',
                            },
                            {
                                tag: 'Специальность',
                                meta: 'ДПИ · 2 года 10 месяцев',
                                title: 'ДПИ и народные промыслы',
                                desc: 'Роспись, керамика, лаковая миниатюра — живые традиции.',
                            },
                        ].map((c) => (
                            <div key={c.title} className="ds2-mc ds2-mc--vertical">
                                <div className="ds2-mc__pill">{c.tag}</div>
                                <div className="ds2-mc__media">
                                    <div className="ds2-mc__image" />
                                </div>
                                <div className="ds2-mc__body">
                                    <div className="ds2-mc__meta">{c.meta}</div>
                                    <h3 className="ds2-mc__title">{c.title}</h3>
                                    <p className="ds2-mc__desc">{c.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="ds2-mc-row">
                        <div className="ds2-mc-row__caption">Tile · square with pill caption</div>
                    </div>
                    <div className="ds2-mc-row ds2-mc-row--tiles">
                        {[
                            { t: 'Кольцо «Листва»', p: '28 400 ₽' },
                            { t: 'Платок шёлковый', p: '12 900 ₽' },
                            { t: 'Жостовский поднос', p: '18 500 ₽' },
                            { t: 'Керамика, ваза', p: '9 200 ₽' },
                        ].map((t) => (
                            <div key={t.t} className="ds2-mc ds2-mc--tile">
                                <div className="ds2-mc__image" />
                                <div className="ds2-mc__caption">
                                    <span>{t.t}</span>
                                    <span style={{ color: 'var(--ds2-color-fg-tertiary)' }}>
                                        {t.p}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section
                    id="dividers"
                    number="12"
                    kicker="Rule"
                    title="Разделители"
                    lead="1px линия для структурных делений. Em-dash как отдельный элемент для editorial-переходов между lead и body."
                >
                    <div className="ds2-dividers">
                        <div className="ds2-divider" />
                        <div className="ds2-divider-note">1px · border-subtle (обычный разделитель)</div>
                        <div className="ds2-divider-note" style={{ marginTop: 24 }}>
                            Em-dash · editorial divider между lead и body:
                        </div>
                        <div className="ds2-divider--emdash">—</div>
                    </div>
                </Section>

                <Section
                    id="motion"
                    number="13"
                    kicker="Motion"
                    title="Анимации"
                    lead="Четыре длительности × два easing'а. Spring разрешён только на sliding nav pill. На остальных элементах — сдержанный out-expo."
                >
                    <div className="ds2-motion">
                        {MOTION.map((m) => (
                            <div key={m.name} className="ds2-motion__cell">
                                <div className={`ds2-motion__demo ${m.class}`} />
                                <div>
                                    <div className="ds2-motion__name">{m.name}</div>
                                    <div className="ds2-motion__value">
                                        {m.token} · {m.ms}ms
                                    </div>
                                </div>
                                <div className="ds2-motion__use">{m.use}</div>
                            </div>
                        ))}
                    </div>
                    <p
                        style={{
                            marginTop: 24,
                            fontFamily: 'var(--ds2-font-sans)',
                            fontSize: 'var(--ds2-text-body-sm)',
                            color: 'var(--ds2-color-fg-tertiary)',
                        }}
                    >
                        Наведи на квадраты — сравни длительности и spring vs ease.
                    </p>
                </Section>

                <Section
                    id="fab"
                    number="14"
                    kicker="Overlay"
                    title="FloatingActionBar"
                    lead="Капсула из icon-кнопок в правом нижнем углу. Появляется после 200px скролла вниз, скрывается при возврате к верху."
                >
                    <div
                        style={{
                            padding: 48,
                            background: 'var(--ds2-color-bg-secondary)',
                            borderRadius: 'var(--ds2-radius-xl)',
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <div className="ds2-fab">
                            <button className="ds2-fab__btn" aria-label="Поделиться">
                                ↗
                            </button>
                            <button className="ds2-fab__btn" aria-label="Сохранить">
                                ♡
                            </button>
                            <button className="ds2-fab__btn ds2-fab__btn--primary" aria-label="Позвонить">
                                ✆
                            </button>
                        </div>
                    </div>
                </Section>

                <Section
                    id="a11y"
                    number="15"
                    kicker="A11y"
                    title="Accessibility чеклист"
                    lead="WCAG AA обязательно, AAA — где возможно без потери эстетики. Все контрасты проверены, focus-ring виден всегда."
                >
                    <div className="ds2-a11y">
                        {[
                            ['Контраст текста ≥ 4.5:1', 'primary на primary bg = 17.8:1 (AAA)'],
                            ['Focus-ring через :focus-visible', 'салатовый с прозрачностью 0.35'],
                            ['Тач-таргеты ≥ 44×44px', 'на всех интерактивных на mobile'],
                            ['Semantic HTML', 'header, nav, main, article, footer'],
                            ['ARIA на неочевидных элементах', 'aria-current, aria-expanded, aria-label'],
                            ['Keyboard navigation', 'Tab, Enter, Esc, стрелки в меню'],
                            ['prefers-reduced-motion', 'spring → ease-out, durations → fast'],
                            ['Цвет — не единственный носитель', 'ошибки и иконкой, и текстом, и цветом'],
                        ].map(([text, note]) => (
                            <div key={text} className="ds2-a11y__item">
                                <span className="ds2-a11y__check" aria-hidden />
                                <div className="ds2-a11y__text">
                                    {text} <em>· {note}</em>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section
                    id="donts"
                    number="16"
                    kicker="Never"
                    title="Запрещено"
                    lead="Паттерны, ломающие язык системы. В макетах и коде отклоняем без обсуждения."
                >
                    <ul className="ds2-donts">
                        <li>Чисто белый (<code>#FFFFFF</code>) как фон страницы — только для плавающих контейнеров</li>
                        <li>Белый текст на салатовой кнопке — primary CTA всегда с чёрным текстом</li>
                        <li>Салатовый и голубой в одном блоке — работают на разных уровнях</li>
                        <li>Тёмный оверлей под текст на MediaCard — только gradient fade на белое</li>
                        <li>Box-shadow на кнопках, инпутах, карточках — только float/modal/focus</li>
                        <li>Градиенты как фон секций — только как маска внутри MediaCard</li>
                        <li>Bold (700+) на display-заголовках — weight 500 максимум</li>
                        <li>Justified text в кириллице — ломается, только left-aligned</li>
                        <li>Параллакс, confetti, bounce на обычных элементах — spring только для nav pill</li>
                        <li>Smooth scroll всей страницы — только anchor-переходы</li>
                        <li>Иконки на изображении MediaCard кроме pill-тега</li>
                        <li>Прямые кавычки <code>"..."</code> — только «ёлочки» в RU, "curly" в EN</li>
                    </ul>
                </Section>

                <footer className="ds2-foot">
                    <div className="ds2__container" style={{ display: 'contents' }}>
                        <div className="ds2-foot__text">
                            Дизайн-система v2 · Swiss-editorial в стиле Müller-Brockmann
                        </div>
                        <div className="ds2-foot__version">
                            v1.0 · 2026-04-22
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
