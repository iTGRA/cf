# Design System: Колледж искусства, ювелирного дела и дизайна

> Editorial-дизайн-система в скандинавско-швейцарской традиции: строгая сетка Müller-Brockmann, воздух как главный визуальный инструмент, типографика вместо иллюстрации, редкие кислотные акценты. Основана на арт-дирекшене проекта и пакете референсов (Max Pratt, Nion, Whenevr, Rams, B+T Architects).

---

## 1. Основа

- **Стек:** Next.js 14 + TypeScript + Tailwind CSS + Prisma + Supabase
- **Целевые устройства:** desktop-first с полной mobile-адаптацией (тач-таргеты 44×44 min)
- **Тёмная тема:** не закладываем на MVP (светлая эстетика — часть идентичности)
- **i18n:** русский на старте, архитектура токенов готова к EN/мультиязычности
- **Базовая единица (base unit):** 4px
- **Baseline grid:** 8px
- **Scale ratio типографики:** 1.25 (major third) для body-шкалы, отдельные ступени для display
- **Принцип из арт-дирекшена:** тихая галерея, где ремесло говорит само за себя — UI отступает, редкий кислотный жест напоминает о новом формате

---

## 2. Цветовая система

### Палитра

| Token | HEX | RGB | Назначение |
|---|---|---|---|
| `--color-bg-primary` | `#F2F2EE` | 242 242 238 | основной off-white фон сайта |
| `--color-bg-secondary` | `#EDEDE9` | 237 237 233 | вторичный фон (секции, разделители) |
| `--color-bg-tertiary` | `#E4E4DF` | 228 228 223 | третичный фон (hover-зоны, skeletons) |
| `--color-bg-elevated` | `#FFFFFF` | 255 255 255 | плавающие контейнеры (карточки, nav pill, модалки) |
| `--color-bg-inverse` | `#0E0E0C` | 14 14 12 | инверсный фон (активный nav pill, тёмные акценты) |
| `--color-fg-primary` | `#0E0E0C` | 14 14 12 | основной текст |
| `--color-fg-secondary` | `#3B3B38` | 59 59 56 | вторичный текст (lead, описания) |
| `--color-fg-tertiary` | `#73736E` | 115 115 110 | приглушённый текст (meta, подписи, нумерация) |
| `--color-fg-quaternary` | `#A8A8A2` | 168 168 162 | disabled, placeholder |
| `--color-fg-inverse` | `#F2F2EE` | 242 242 238 | текст на тёмном фоне |
| `--color-border-subtle` | `#E0E0DB` | 224 224 219 | тонкие разделители |
| `--color-border-default` | `#CECEC8` | 206 206 200 | стандартные границы инпутов |
| `--color-border-strong` | `#0E0E0C` | 14 14 12 | сильный контраст (фокус, активный стейт) |
| `--color-accent-primary` | `#C6F24E` | 198 242 78 | салатовый CTA (основной акцент) |
| `--color-accent-primary-hover` | `#B8E63F` | 184 230 63 | hover для primary CTA |
| `--color-accent-primary-active` | `#A8D633` | 168 214 51 | active/pressed |
| `--color-accent-primary-subtle` | `#EDFACD` | 237 250 205 | светлая подложка под primary |
| `--color-accent-secondary` | `#7FD4E0` | 127 212 224 | голубой (второй акцент, info-accent) |
| `--color-accent-secondary-hover` | `#6CC4D1` | 108 196 209 | hover для secondary |
| `--color-accent-secondary-subtle` | `#DAF0F4` | 218 240 244 | светлая подложка под secondary |
| `--color-success` | `#6BA368` | 107 163 104 | состояние успеха |
| `--color-success-subtle` | `#DEEDDC` | 222 237 220 | подложка под success |
| `--color-warning` | `#C89B3F` | 200 155 63 | предупреждение |
| `--color-warning-subtle` | `#F2E5C4` | 242 229 196 | подложка под warning |
| `--color-error` | `#B8453E` | 184 69 62 | ошибка |
| `--color-error-subtle` | `#F0D6D4` | 240 214 212 | подложка под error |

### Контраст (WCAG)

| Пара | Ratio | WCAG |
|---|---|---|
| `fg-primary` на `bg-primary` | 17.8:1 | AAA |
| `fg-primary` на `bg-elevated` | 19.2:1 | AAA |
| `fg-secondary` на `bg-primary` | 10.1:1 | AAA |
| `fg-tertiary` на `bg-primary` | 4.7:1 | AA (normal), AAA (large) |
| `fg-primary` на `accent-primary` | 16.4:1 | AAA (ключевое — на салатовом CTA текст чёрный, не белый) |
| `fg-primary` на `accent-secondary` | 12.3:1 | AAA |
| `fg-inverse` на `bg-inverse` | 17.1:1 | AAA |

Для `fg-quaternary` на `bg-primary` контраст 2.6:1 — используется только для disabled и декоративных placeholder, никогда для читаемого текста.

### Правила применения цвета

- Фон **никогда не чисто белый** (`#FFFFFF`), только для плавающих контейнеров (white card поверх off-white полотна)
- Салатовый (`accent-primary`) используется на 3–5% площади экрана максимум. Primary CTA, единичные выделения, маркер активности
- Голубой (`accent-secondary`) — второй акцент, информационный. На тегах, прогресс-индикаторах, иллюстративных элементах
- Салатовый и голубой **не соседствуют в одном блоке** — они работают на разных уровнях иерархии или разных страницах
- Семантические цвета (success/warning/error) используются только в функциональных UI-состояниях (формы, тосты), не в декоре
- Никаких градиентов как фона блоков. Градиенты существуют **только как маска в компоненте MediaCard**

---

## 3. Типографика

### Гарнитуры

**Display/Heading/Body:** Inter (Google Fonts, переменный шрифт)
- Причина выбора: одинаково сильная работа в латинице и кириллице, широкий набор начертаний, optical sizing в variable-версии, бесплатная лицензия
- Начертания: 400 Regular, 500 Medium, 600 SemiBold, 700 Bold
- Опционально: **Inter Display** для самых крупных кеглей (72px+) — более плотные межбуквенные просветы

**Mono:** JetBrains Mono (для кода, табличных чисел, tech-элементов)

**Fallback stack:**
```css
--font-sans: 'Inter', 'Inter Display', -apple-system, BlinkMacSystemFont,
             'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', Monaco, Consolas,
             'Liberation Mono', 'Courier New', monospace;
```

### Type scale

| Token | Size (desktop) | Line-height | Weight | Tracking | Использование |
|---|---|---|---|---|---|
| `--text-display-xl` | 96px / 6rem | 1.02 | 500 | -0.025em | hero-заголовки на промо-экранах |
| `--text-display-lg` | 72px / 4.5rem | 1.05 | 500 | -0.02em | hero H1 на главных страницах |
| `--text-display-md` | 56px / 3.5rem | 1.08 | 500 | -0.02em | крупные заголовки секций |
| `--text-h1` | 44px / 2.75rem | 1.1 | 500 | -0.015em | H1 детальных страниц |
| `--text-h2` | 32px / 2rem | 1.15 | 500 | -0.01em | H2 внутри статей и карточек |
| `--text-h3` | 24px / 1.5rem | 1.25 | 500 | -0.005em | H3, заголовки подсекций |
| `--text-h4` | 20px / 1.25rem | 1.3 | 600 | 0 | H4, заголовки карточек листинга |
| `--text-lead` | 18px / 1.125rem | 1.5 | 500 | 0 | lead-абзац на детальных страницах |
| `--text-body-lg` | 17px / 1.0625rem | 1.6 | 400 | 0 | body в статьях, длинные тексты |
| `--text-body` | 15px / 0.9375rem | 1.6 | 400 | 0 | основной текст интерфейса |
| `--text-body-sm` | 14px / 0.875rem | 1.5 | 400 | 0 | вспомогательный текст, описания |
| `--text-caption` | 13px / 0.8125rem | 1.4 | 400 | 0 | подписи к фото, captions |
| `--text-meta` | 12px / 0.75rem | 1.4 | 500 | 0.02em | служебная мета, даты, номера |
| `--text-label` | 11px / 0.6875rem | 1.3 | 600 | 0.08em | uppercase-лейблы секций, теги |
| `--text-button` | 15px / 0.9375rem | 1 | 500 | 0 | кнопки (primary/secondary) |
| `--text-button-sm` | 13px / 0.8125rem | 1 | 500 | 0 | кнопки sm, пилюли навигации |
| `--text-quote` | 22px / 1.375rem | 1.4 | 400 | -0.005em | цитаты внутри статей |

### Mobile adjustments

На экранах ≤768px display-шкала сжимается сильнее, чем body-шкала — сохраняется иерархия, но без потери читаемости на small screen.

| Token | Desktop | Mobile |
|---|---|---|
| `--text-display-xl` | 96px | 56px |
| `--text-display-lg` | 72px | 44px |
| `--text-display-md` | 56px | 36px |
| `--text-h1` | 44px | 30px |
| `--text-h2` | 32px | 24px |
| `--text-h3` | 24px | 20px |
| `--text-lead` | 18px | 17px |
| `--text-body-lg` | 17px | 16px |
| `--text-body` | 15px | 15px |

Шкала меньше body не адаптируется — 12–14px работают одинаково на всех устройствах.

### Типографические принципы

- **Left-aligned** по умолчанию для всех блоков текста. Justified не использовать — в кириллице работает плохо
- **Переносы:** hyphens отключены для заголовков, разрешены для body на mobile
- **Optical sizing:** для Inter Variable включить `font-optical-sizing: auto`
- **Tabular numbers** (`font-variant-numeric: tabular-nums`) — для чисел в таблицах, расписаниях, прайсе
- **Smart quotes** — «русские» кавычки для RU, “английские” для EN, никогда "прямые"
- **Em-dash** (—) как разделитель в editorial-вёрстке, не hyphen (-)

---

## 4. Пространство и сетка

### Spacing scale

Все значения кратны 4px (base unit), главные ступени кратны 8px (baseline grid).

```
0     = 0px
0.5   = 2px
1     = 4px
2     = 8px
3     = 12px
4     = 16px
5     = 20px
6     = 24px
8     = 32px
10    = 40px
12    = 48px
16    = 64px
20    = 80px
24    = 96px
32    = 128px
40    = 160px
48    = 192px
64    = 256px
```

**Принцип использования:**
- Внутри компонентов (padding, gap): 8–24px
- Между компонентами в секции: 24–48px
- Между секциями на странице: 96–160px (воздух — ключевая ценность)
- Поля по краям страницы (desktop): 80–120px
- Поля по краям страницы (mobile): 20–24px

### Layout grid (Müller-Brockmann)

Классическая 12-колоночная сетка с большими полями и узкими gutter.

| Breakpoint | Min width | Columns | Gutter | Margin |
|---|---|---|---|---|
| `sm` (mobile) | 0px | 4 | 16px | 20px |
| `md` (tablet) | 768px | 8 | 24px | 40px |
| `lg` (desktop) | 1024px | 12 | 24px | 64px |
| `xl` (wide) | 1440px | 12 | 32px | 96px |
| `2xl` (ultrawide) | 1920px | 12 | 32px | 120px |

**Max container width:** 1680px — выше сайт не растягивается, поля увеличиваются.

**Editorial column patterns:**
- `editorial-hero`: col-span 2 (meta) + col-span 10 (heading) на desktop
- `editorial-detail`: col-span 4 (title) + col-span 6 (content) + col-span 2 (anchor) на desktop
- `editorial-mixed-listing`: col-span 8–9 (projects grid) + col-span 3–4 (articles column) на desktop

### Вертикальный ритм

Все вертикальные отступы внутри длинного текста кратны 8px. Связки в editorial-статье:

- H1 → lead: 48px
- Lead → em-dash разделитель: 32px
- Em-dash → body: 32px
- Body абзац → Body абзац: 24px
- Body → H2: 64px
- H2 → H3: 32px
- H3 → body: 16px
- Body → изображение: 48px
- Изображение → caption: 12px
- Caption → body: 48px

---

## 5. Радиусы, тени, границы

### Radius scale

| Token | Value | Использование |
|---|---|---|
| `--radius-none` | 0 | таблицы, editorial-элементы, meta-маркеры |
| `--radius-sm` | 8px | мелкие чипы, маленькие инпуты |
| `--radius-md` | 12px | кнопки, инпуты, select, textarea |
| `--radius-lg` | 16px | small cards, compact tiles |
| `--radius-xl` | 20px | карточки listing, MediaCard |
| `--radius-2xl` | 24px | крупные hero-карточки, модалки |
| `--radius-3xl` | 32px | flagship hero-containers |
| `--radius-full` | 9999px | pills, теги, аватары, nav-капсулы, FloatingActionBar |

**Правило:** на одной странице используется не более трёх уровней радиусов одновременно, чтобы сохранить ритм.

### Border width

| Token | Value | Использование |
|---|---|---|
| `--border-hairline` | 1px | subtle-разделители, edges карточек |
| `--border-default` | 1.5px | границы инпутов (только на focus) |
| `--border-strong` | 2px | активные состояния, выделенные элементы |

### Shadows

**По умолчанию shadow-свойства не используются.** Это принципиальное ограничение системы — глубина создаётся воздухом, цветом фона и типографическим контрастом.

Исключения — три технических сценария:

| Token | Value | Использование |
|---|---|---|
| `--shadow-none` | `none` | default |
| `--shadow-float` | `0 1px 2px rgba(14,14,12,0.04), 0 4px 12px rgba(14,14,12,0.06)` | только для floating-компонентов (FloatingActionBar, Toast, Tooltip) |
| `--shadow-modal` | `0 8px 32px rgba(14,14,12,0.12)` | только для модалок и drawer |
| `--shadow-focus` | `0 0 0 3px rgba(198,242,78,0.3)` | focus-ring на интерактивных элементах (салатовый с прозрачностью) |

Никаких теней на карточках, кнопках, инпутах и других базовых элементах.

---

## 6. Motion

### Длительности

| Token | Value | Использование |
|---|---|---|
| `--duration-instant` | 0ms | мгновенные изменения (фокус) |
| `--duration-fast` | 150ms | hover-стейты, микроизменения |
| `--duration-base` | 250ms | стандартные переходы (большинство случаев) |
| `--duration-slow` | 400ms | sliding-элементы, page transitions |
| `--duration-slower` | 600ms | layout-анимации, сложные переходы |

### Easing

| Token | Value | Использование |
|---|---|---|
| `--ease-linear` | `linear` | прогресс-бары, loading |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | появления, входы (основной easing системы) |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | двусторонние переходы |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | sliding nav pill, упругие элементы |

### Принципы motion

- **Что анимируется всегда:** переходы состояний (hover, focus, active), sliding nav pill, появление тултипов и модалок, loading-состояния, FloatingActionBar (появление/скрытие при скролле)
- **Что никогда не анимируется:** page scroll (никакого smooth scroll), цвет фона секций при скролле, размер шрифта, позиция текста
- **Характер движения:** сдержанный, функциональный. Никаких bounce-эффектов на обычных элементах, никакого parallax, никакого confetti
- **Spring разрешён только для sliding nav pill** — это фирменный элемент, его упругость — часть идентичности
- **Reduced motion:** при `prefers-reduced-motion: reduce` все длительности сокращаются до `--duration-fast`, spring заменяется на ease-out, sliding-анимации становятся instant fade

---

## 7. Компоненты — инвентарь

### Atoms

**Button**
- Назначение: основное действие интерфейса
- Варианты: `primary` (салатовый фон, чёрный текст), `secondary` (белый фон, чёрный текст и border), `ghost` (прозрачный фон, чёрный текст), `inverse` (чёрный фон, белый текст)
- Размеры: `sm` (h-32, px-16), `md` (h-40, px-20), `lg` (h-48, px-24)
- Radius: 12px (md/lg), 8px (sm), `full` для pill-варианта
- Состояния: default / hover (затемнение/осветление на 8%) / active (на 16%) / focus (focus-ring) / disabled (opacity 0.4) / loading (spinner + disabled текст)
- Специфика: **primary CTA всегда салатовый с чёрным текстом**, не наоборот

**ButtonPill**
- Отдельный вариант: radius full, размеры sm/md
- Используется в nav-контейнере, фильтрах, чипах действий
- Активное состояние: чёрный фон, белый текст (`inverse`)

**IconButton**
- Квадратная/круглая кнопка с иконкой, без текста
- Размеры: 32 / 40 / 48 / 56 px
- Radius: full по умолчанию, 12px для квадратного варианта
- Применение: FloatingActionBar, close-кнопки, навигационные стрелки

**Input**
- Размеры: sm (h-36), md (h-44), lg (h-52)
- Radius: 12px
- Border: 1px `border-default` по default, 1.5px `border-strong` на focus
- Без тени, без inner-highlight
- Placeholder: цвет `fg-quaternary`, weight 400

**Textarea**
- Radius 12px, min-height 96px, resize vertical only
- Остальные свойства — как Input

**Select**
- Визуально идентичен Input, иконка chevron справа
- Dropdown: белая подложка, radius 16px, shadow-float, max-height 320px со скроллом

**Checkbox / Radio**
- Размер 20×20px (touch-area 44×44px)
- Default: border 1.5px `border-default`, radius 4px (checkbox) / full (radio)
- Checked: салатовый фон, чёрный чек (SVG), border matches fill

**Switch**
- Размер 44×24px, radius full
- Off: `bg-tertiary`, thumb `bg-elevated`
- On: `accent-primary`, thumb `bg-inverse`
- Transition 250ms ease-out на thumb

**Link**
- Inline-text link: underline 1px offset 2px, hover — цвет `fg-secondary`
- Standalone link (в листингах): нет underline, hover — подчёркивание на 200ms + стрелка →

**Tag / Badge / Pill**
- Высота: 24px (sm) / 28px (md) / 32px (lg)
- Radius: full
- Фон: `bg-elevated` (нейтральный) / `accent-primary-subtle` / `accent-secondary-subtle` / `success-subtle` и т.п.
- Текст: `label` style (11px, uppercase, letter-spacing 0.08em) или `meta` (12px, без uppercase)

**Avatar**
- Размеры: xs (24) / sm (32) / md (40) / lg (56) / xl (80) px
- Radius: full
- Fallback: инициалы на `bg-tertiary` фоне с `fg-secondary` текстом

**Divider**
- Horizontal: 1px, `border-subtle`
- Em-dash divider (editorial): `—` символ как отдельный элемент с `fg-tertiary` цветом, 32px вертикальных отступов

**ItemNumber** (meta-маркер)
- Служебная нумерация проектов, глав, секций
- Стиль: `--text-meta` (12px, weight 500, letter-spacing 0.02em)
- Цвет: `fg-tertiary`
- Позиция: сверху над заголовком элемента, с отступом 24–32px

### Molecules

**NavPillBar** ★ (ключевой компонент системы)
- Контейнер: белая капсула, radius full, padding 6px, `bg-elevated`, высота 48px
- Пункты: pill-кнопки, radius full, padding-x 20px, text `button-sm`
- Активный пункт: `bg-inverse` (чёрный), текст `fg-inverse` (off-white)
- Неактивные пункты: прозрачный фон, текст `fg-primary`, hover — `bg-tertiary` подложка
- **Sliding-анимация:** активный чёрный pill перемещается между пунктами через CSS transform с `--ease-spring` easing и `--duration-slow` (400ms). Реализация: абсолютно позиционированный элемент внутри контейнера, позиция и ширина вычисляются по активному пункту
- Состояния: default / hover (per item) / active (per item) / focus (focus-ring на активном item)
- Mobile: трансформируется в нижнее меню-таб-бар или вертикальный список

**FloatingActionBar**
- Position: fixed, bottom 32px, right 32px
- Контейнер: не всегда обязателен — кнопки могут быть отдельными
- Button-pills: диаметр 48px, radius full, вариант `primary` (салатовый) для главного действия, `secondary` (белый с border) для вторичных
- Появление: при скролле 200px+ вниз, через opacity + translateY fade-in, `--duration-base`
- Скрытие: при скролле обратно к началу страницы
- Mobile: остаётся в том же позиционировании, размер увеличивается до 56px

**MediaCard** ★ (ключевой компонент системы)
- Контейнер: `bg-elevated` (чистый белый), radius 20px, без тени
- **Ключевая техника — gradient fade integration:** белая подложка карточки «съедает» край изображения через CSS mask или linear-gradient наложение, а не тёмный оверлей

**MediaCard — вариант `horizontal`:**
- Layout: grid 2 колонки (изображение + текст)
- Пропорции: изображение ~40%, текст ~60%
- Gradient fade: `linear-gradient(90deg, transparent 0%, transparent 60%, var(--color-bg-elevated) 100%)` как псевдо-элемент поверх изображения; ширина fade-зоны 20–25% от ширины изображения
- Текст: лежит на чистой белой зоне справа
- Тег-пилюля (опционально): единственный элемент, разрешённый поверх изображения, в левом верхнем углу или правом верхнем
- Внутренний padding текстовой зоны: 32–48px
- Высота: фиксированная (aspect-ratio контейнера ~2.5:1) или content-based

**MediaCard — вариант `vertical`:**
- Layout: flex-column (изображение сверху + текст снизу)
- Пропорции: изображение ~60%, текст ~40%
- Gradient fade: `linear-gradient(180deg, transparent 0%, transparent 65%, var(--color-bg-elevated) 100%)`; высота fade-зоны 35–40% высоты изображения
- Текст: лежит на чистой белой зоне снизу
- Тег-пилюля: правый верхний угол изображения
- Внутренний padding текстовой зоны: 24–32px
- Aspect-ratio изображения: 4:3 или 16:10

**MediaCard — вариант `tile`:**
- Квадратная карточка, изображение занимает всю площадь
- Текст только в форме небольшой подписи-пилюли внизу на `bg-elevated` с radius full
- Либо радиальная маска, которая создаёт «окно» для подписи в нижней части
- Aspect-ratio: 1:1

**Правила для всех вариантов MediaCard:**
- **Никогда** не используется тёмный оверлей под текст (`rgba(0,0,0,0.5)` и подобное запрещено)
- Основной текст всегда лежит на чистой белой зоне после градиента
- Тег-пилюля — единственный элемент, который может находиться поверх изображения
- Изображение с radius, совпадающим с радиусом карточки на видимых углах (внутренняя маска через `overflow: hidden` на контейнере)
- Hover: `transform: translateY(-4px)` + `--shadow-float` плавно появляется, `--duration-base`

**Card (базовая)**
- Без изображения, только контент
- `bg-elevated`, radius 20px, padding 32px
- Варианты: `default` / `outlined` (1px `border-subtle`) / `elevated` (с shadow-float на hover)

**ContentMixedListingModule**
- Контейнер листинга с content zoning
- Grid: col-span 8–9 (projects zone) + col-span 3–4 (articles zone) на desktop
- Projects zone: внутренняя 3-колоночная сетка MediaCard-ов (variant vertical)
- Articles zone: вертикальный список из 3–5 articles-анонсов без изображений, разделённых 1px `border-subtle`
- Каждый article-анонс: uppercase-лейбл секции (`label` style) сверху, заголовок (`h4` style), 2–3 строки превью (`body-sm`), стрелка →
- Gap между zones: 48–64px
- Mobile: zones стекуются вертикально, projects сверху, articles снизу

**ArticleDetailLayout** ★ (editorial three-column)
- Grid: col-span 4 (title-column) + col-span 6 (content-column) + col-span 2 (anchor-column) на desktop (lg+)
- Gap между колонками: 48–64px
- `title-column`: H1 (`--text-display-md` или `--text-h1`), ниже meta-блок (автор, дата, номер главы)
- `content-column`: lead-абзац (`--text-lead`), em-dash divider, body (`--text-body-lg`)
- `anchor-column`: номер главы/страницы (`--text-meta` но крупнее — 20–24px), progress-индикатор опционально
- Tablet (md): сжимается в 2 колонки — title+content рядом (4+6), anchor уходит вверх как sticky-бейдж
- Mobile (sm): всё в один вертикальный поток — meta → title → lead → em-dash → body

**Modal**
- Overlay: `rgba(14, 14, 12, 0.4)` с backdrop-blur 8px
- Контейнер: `bg-elevated`, radius 24px, max-width 560px (по умолчанию), padding 40px, `--shadow-modal`
- Close: IconButton в правом верхнем углу
- Анимация: overlay fade + modal scale 0.96→1, `--duration-base` ease-out

**Drawer**
- Слайд справа или слева, full-height
- `bg-elevated`, no radius на примыкающей стороне, radius 24px на противоположной
- Width: 480px (desktop) / 100vw (mobile)
- Анимация: translateX, `--duration-slow` ease-out

**Toast**
- Position: fixed, top-right или bottom-right
- Контейнер: `bg-inverse`, `fg-inverse` текст, radius 16px, padding 16px 20px, `--shadow-float`
- Варианты: default / success (accent-primary левая полоска) / warning / error
- Auto-dismiss: 4000ms по умолчанию, можно отключить
- Анимация: slide + fade

**Tooltip**
- Контейнер: `bg-inverse`, `fg-inverse` текст, radius 8px, padding 8px 12px, `--text-caption`
- Показ: через 300ms после hover/focus, скрытие сразу
- Размер стрелки: 6px

**Tabs**
- Horizontal line-style: текст-лейблы с underline на активной
- Underline: 2px, `border-strong`, анимирован sliding (как nav pill, но 1D)
- Активный текст: `fg-primary`, weight 500
- Неактивный: `fg-tertiary`, weight 400
- Gap между tabs: 24–32px

**Breadcrumb**
- Разделитель: `/` с отступами 8px, цвет `fg-tertiary`
- Активный (последний): `fg-primary`, weight 500, без underline
- Остальные: `fg-secondary`, link-style

**Pagination**
- Number-pills: 36×36px, radius full
- Активный: `bg-inverse`, `fg-inverse`
- Неактивные: transparent, `fg-primary`, hover `bg-tertiary`
- Arrows (prev/next): IconButton sm

**Table**
- Без вертикальных границ, только horizontal 1px `border-subtle` между строками
- Header: `--text-label` (uppercase), `fg-tertiary`, padding 12px vertical
- Cell: `--text-body`, padding 16px vertical
- Hover row: `bg-secondary`

**Skeleton / Loader**
- Shimmer-анимация через gradient: `bg-tertiary` → `bg-secondary` → `bg-tertiary`
- Длительность: 1600ms infinite
- Radius совпадает с radius загружаемого элемента

**Empty state**
- Центрированный блок: иконка (48–64px) + заголовок (`--text-h3`) + описание (`--text-body-sm`) + опциональная CTA
- Padding vertical: 96–128px
- Иконка — линейная, outline-style, не filled

### Editorial-specific

**LeadBodyPair**
- Lead: `--text-lead` (18px, weight 500, line-height 1.5)
- Em-dash divider: символ `—` как отдельная строка, `fg-tertiary`, отступы 32px сверху и снизу
- Body: `--text-body-lg` (17px, weight 400, line-height 1.6)
- Максимальная ширина колонки контента: 680px (optimal reading length)

**MetaColumn** (editorial left column)
- Используется в hero-блоках и детальных страницах
- Ширина: col-span 2 в 12-колоночной сетке
- Содержимое: автор/подпись (`--text-body-sm`), дата (`--text-meta`), номер (`--text-meta`), категория (`--text-label`)
- Spacing между элементами внутри: 24px
- Alignment: left, каждый элемент с собственной строкой

---

## 8. Паттерны взаимодействия

**Навигация**
- Главное меню — NavPillBar в шапке, sticky или non-sticky (зависит от сценария)
- Активный раздел определяется по URL, pill плавно перескакивает при переходах
- Mobile: NavPillBar трансформируется в burger-menu или нижний таб-бар

**Поиск и фильтрация**
- Поиск: overlay full-screen при активации (inspired by Algolia DocSearch), backdrop-blur, input крупный (`--text-h3` по размеру)
- Фильтры каталога: левая колонка на desktop (300px), bottom-sheet drawer на mobile
- Активные фильтры — chip-pills с close-иконкой, которые можно удалить по клику
- Применение фильтров — мгновенное (без submit-кнопки), с debounce 300ms

**Формы**
- Inline-валидация: через 600ms после blur, либо мгновенно для обязательных полей после первой ошибки
- Сообщения об ошибке: красная подложка input (1.5px border `error`), текст ошибки снизу (`--text-caption`, цвет `error`)
- Submit-кнопка: `primary` вариант, полная ширина на mobile, auto-width на desktop
- Loading-state submit: disabled + spinner + текст меняется на «Отправляем...»
- Success после submit: toast + переход на thank-you-экран или inline-подтверждение с salatовой подложкой

**Empty state**
- Пустой листинг: иконка + заголовок «Пока ничего нет» + описание + опциональная CTA
- Отсутствие результатов поиска: заголовок «Ничего не нашли» + совет «Попробуйте другие ключевые слова» + кнопка «Сбросить фильтры»

**Loading**
- Skeleton-состояния для любых контентных блоков, загружающихся >300ms
- Для быстрых операций (<300ms) — без индикатора, мгновенное появление контента
- Глобальные page transitions — без индикатора (Next.js App Router с Suspense), интерфейс не blocking

**Переходы между страницами**
- Без явных анимаций по умолчанию — мгновенный переход, но с сохранением scroll-позиции для back-navigation
- Плавные page transitions только для тематических разделов (например, вход в статью) — через view transitions API когда доступно

**Scroll behavior**
- Обычный нативный скролл, без smooth scroll на всей странице
- Anchor-links работают с smooth scroll (CSS `scroll-behavior: smooth` на html при `prefers-reduced-motion: no-preference`)
- FloatingActionBar появляется после 200px scroll down, исчезает при scroll up near top

**Hover-состояния**
- На touch-устройствах hover-эффекты отключены через `@media (hover: hover)`
- MediaCard на hover: translateY(-4px) + shadow-float
- Кнопки на hover: лёгкое затемнение/осветление фона
- Изображения на hover в листингах: опционально — лёгкий scale(1.02) у внутреннего img через `overflow: hidden` на контейнере

**Keyboard navigation**
- Все интерактивные элементы доступны через Tab
- Focus-ring видимый всегда на focus-visible: `0 0 0 3px rgba(198, 242, 78, 0.3)` (салатовый с прозрачностью)
- Esc закрывает модалки, drawer, overlay-поиск
- Arrow keys — навигация внутри Tabs, Pagination, Select-dropdown
- Enter/Space — активация focused-элемента

---

## 9. Accessibility

- **WCAG AA обязательно**, AAA там, где возможно без ущерба эстетике
- **Минимальный контраст для текста:** 4.5:1 (normal), 3:1 (large text ≥18px или 14px bold)
- **Focus states:** всегда видимые через `:focus-visible`, focus-ring салатовый с прозрачностью (не полагаемся только на изменение цвета)
- **Тач-таргеты:** минимум 44×44px для всех интерактивных элементов на mobile
- **Keyboard navigation:** все действия доступны с клавиатуры, логический Tab-order
- **Semantic HTML:** `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`. Правильная иерархия заголовков (один H1 на страницу)
- **ARIA:** `aria-label` на IconButton без видимого текста; `aria-current="page"` на активном пункте NavPillBar; `aria-expanded` на disclosure-элементах; `role="status"` на Toast
- **Screen reader:** все декоративные изображения с `alt=""`, контентные — с осмысленным alt; NavPillBar — `<nav aria-label="Main">`
- **Motion:** уважение `prefers-reduced-motion: reduce` — sliding nav становится instant, spring заменяется на ease-out, длительности → `--duration-fast`
- **Контент:** alt-тексты для всех фото студенческих работ (имя автора + название работы + материал), логичная иерархия заголовков внутри статей
- **Forms:** все input связаны с label через `for`/`id`, обязательные поля помечены `aria-required="true"` и визуально символом `*`, ошибки связаны через `aria-describedby`
- **Цвет не единственный носитель информации:** ошибки в форме показываются и цветом, и иконкой, и текстом

---

## 10. Чеклист для разработчика

1. Фон сайта всегда `--color-bg-primary` (off-white), никогда чистый белый
2. Primary CTA — **только** салатовый (`--color-accent-primary`) с **чёрным** текстом, не белым
3. Ни один компонент, кроме FloatingActionBar, Toast, Tooltip, Modal — не имеет тени
4. Focus-ring присутствует на всех интерактивных элементах в `:focus-visible`
5. NavPillBar имеет sliding-анимацию активного pill с spring-easing 400ms
6. MediaCard использует gradient fade, **никогда** тёмный оверлей под текст
7. Тег-пилюля — единственный элемент, который может лежать поверх изображения в MediaCard
8. Типографика использует Inter Variable с включённым `font-optical-sizing: auto` и `font-feature-settings: "cv02", "cv03", "cv04", "cv11"`
9. В статьях между lead и body всегда em-dash divider с 32px отступами
10. Body-текст имеет максимальную ширину 680px для читаемости
11. Все тач-таргеты ≥44×44px на mobile
12. `prefers-reduced-motion: reduce` уважается — spring отключается, sliding становится instant
13. На страницах листинга используется `ContentMixedListingModule` с зонированием projects/articles
14. Breakpoints строго по сетке: sm/md/lg/xl/2xl, margins и gutter из токенов
15. Все интерактивные состояния (default/hover/active/focus/disabled/loading) реализованы для каждого компонента

---

## 11. Tailwind integration

### Базовая конфигурация `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '0px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1920px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '20px',
        md: '40px',
        lg: '64px',
        xl: '96px',
        '2xl': '120px',
      },
      screens: {
        '2xl': '1680px',
      },
    },
    extend: {
      colors: {
        bg: {
          primary: '#F2F2EE',
          secondary: '#EDEDE9',
          tertiary: '#E4E4DF',
          elevated: '#FFFFFF',
          inverse: '#0E0E0C',
        },
        fg: {
          primary: '#0E0E0C',
          secondary: '#3B3B38',
          tertiary: '#73736E',
          quaternary: '#A8A8A2',
          inverse: '#F2F2EE',
        },
        border: {
          subtle: '#E0E0DB',
          DEFAULT: '#CECEC8',
          strong: '#0E0E0C',
        },
        accent: {
          primary: {
            DEFAULT: '#C6F24E',
            hover: '#B8E63F',
            active: '#A8D633',
            subtle: '#EDFACD',
          },
          secondary: {
            DEFAULT: '#7FD4E0',
            hover: '#6CC4D1',
            subtle: '#DAF0F4',
          },
        },
        success: { DEFAULT: '#6BA368', subtle: '#DEEDDC' },
        warning: { DEFAULT: '#C89B3F', subtle: '#F2E5C4' },
        error: { DEFAULT: '#B8453E', subtle: '#F0D6D4' },
      },
      fontFamily: {
        sans: ['Inter', 'Inter Display', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['96px', { lineHeight: '1.02', letterSpacing: '-0.025em', fontWeight: '500' }],
        'display-lg': ['72px', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '500' }],
        'display-md': ['56px', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '500' }],
        'h1': ['44px', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '500' }],
        'h2': ['32px', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '500' }],
        'h3': ['24px', { lineHeight: '1.25', letterSpacing: '-0.005em', fontWeight: '500' }],
        'h4': ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        'lead': ['18px', { lineHeight: '1.5', fontWeight: '500' }],
        'body-lg': ['17px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['15px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['13px', { lineHeight: '1.4', fontWeight: '400' }],
        'meta': ['12px', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
        'label': ['11px', { lineHeight: '1.3', letterSpacing: '0.08em', fontWeight: '600' }],
      },
      borderRadius: {
        none: '0',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
        full: '9999px',
      },
      boxShadow: {
        none: 'none',
        float: '0 1px 2px rgba(14,14,12,0.04), 0 4px 12px rgba(14,14,12,0.06)',
        modal: '0 8px 32px rgba(14,14,12,0.12)',
        focus: '0 0 0 3px rgba(198,242,78,0.3)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '250ms',
        slow: '400ms',
        slower: '600ms',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}

export default config
```

### Typography plugin settings для Inter

В `app/layout.tsx` или глобальных стилях:

```css
html {
  font-family: 'Inter', 'Inter Display', sans-serif;
  font-optical-sizing: auto;
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11', 'ss01';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## 12. Открытые вопросы

1. **Название колледжа** не определено — оно может потребовать корректировки тональности logo-treatment и микрокопии. Inter одинаково хорошо работает и с кириллицей, и с латиницей, поэтому от выбора названия technical stack не зависит.

2. **Изображения студенческих работ** — от их реального качества зависит, как именно настроить gradient fade (длина зоны размытия, общий светлый тон). На старте, пока работ мало, я бы заложил fallback: если у работы нет изображения — карточка показывает типографический treatment (крупный заголовок работы + материал + автор на `bg-elevated`), а не пустую фотозону.

3. **Тёмная тема** — не в MVP, но архитектура токенов готова. При добавлении понадобится переопределить только группу `bg-*` и `fg-*`, акценты остаются прежними.

4. **Mobile nav pattern** — решить на этапе прототипа: burger-drawer (традиционный) или bottom-tab-bar (продуктовый). Для editorial-проекта я бы рекомендовал burger-drawer — меньше ломает читательский flow.

5. **View Transitions API** — использовать для page transitions между статьями? Технология поддерживается в Chrome 111+, для остальных браузеров — graceful degradation. Решение — скорее после MVP.

6. **Custom-иконки vs. Lucide** — на старте используем Lucide React (уже в stack), но в дальнейшем стоит заказать custom-набор иконок в editorial-стиле (тонкие линии 1.5px, сдержанный характер, совпадающий с типографикой).

---

## Версия документа

**v1.0** — начальная версия на основе 5 референсов и арт-дирекшена проекта.

Документ живой — обновляется при появлении новых паттернов, решений и уточнений. Все изменения вносятся с инкрементом версии и записью в changelog.
