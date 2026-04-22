# DESIGN SYSTEM — КДПИ им. Карла Фаберже

> Заполнен на этапе 06 · DESIGN
> Референс: gallery-victoria.ru — минимализм культурной институции
> Адаптация: чуть теплее и доступнее для абитуриентской аудитории
> Статус: ✅ Утверждён — апрель 2026

---

## Визуальный характер

Сайт культурной институции — не образовательного учреждения.
Строгий, кураторский, с достоинством. Работы студентов говорят
сами за себя — дизайн им не мешает.

Три слова: **сдержанный · живой · достойный**

Что это означает на практике:
- Много белого пространства — воздух вокруг контента
- Типографика несёт всю выразительность
- Изображения — единственный источник цвета и эмоции
- Никаких декоративных элементов, теней, скруглений

---

## Цветовая палитра

| Токен | HEX | Применение |
|-------|-----|-----------|
| `--color-background` | `#FAFAF8` | Фон страницы — тёплый белый, не стерильный |
| `--color-surface` | `#F2F0EC` | Карточки, блоки на фоне, аккордеоны |
| `--color-ink` | `#1A1817` | Основной текст — тёплый чёрный |
| `--color-secondary` | `#6B6762` | Вторичный текст, метаданные, подписи |
| `--color-muted` | `#A8A4A0` | Плейсхолдеры, разделители, disabled |
| `--color-accent` | `#1A1817` | CTA, кнопки — тот же чёрный (как у Виктории) |
| `--color-accent-hover` | `#3D3A38` | Hover на кнопках |
| `--color-border` | `#E0DDD8` | Границы, разделители |
| `--color-border-strong` | `#C8C4BE` | Акцентные разделители |

**Принцип:** нет цветовых акцентов кроме чёрного — цвет приходит только
из фотографий работ студентов. Это создаёт эффект галереи.

**Запрещено:**
- Никакого синего, зелёного, красного в UI
- Никаких градиентов
- Никаких цветных кнопок
- Чистый `#FFFFFF` и `#000000` — только через токены

---

## Типографика

### Пара шрифтов

**Display: Cormorant Garamond**
— Для H1, H2, крупных заголовков страниц
— Вес: 300 (Light) и 400 (Regular) — никогда Bold
— Характер: изысканный, художественный, с историей
— Связь с Фаберже: ювелирное, рукотворное, классика

**UI: Inter**
— Для навигации, подписей, кнопок, форм, мелкого текста
— Вес: 400 (Regular) и 500 (Medium)
— Капители через `font-variant: small-caps` или `text-transform: uppercase + letter-spacing`

**Google Fonts import:**
```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Inter:wght@400;500&display=swap
```

### Типографическая шкала

| Роль | Шрифт | Размер | Вес | Интерлиньяж | Letter-spacing |
|------|-------|--------|-----|-------------|----------------|
| H1 (hero) | Cormorant | 64–80px | 300 | 1.05 | -0.02em |
| H1 (страница) | Cormorant | 48–56px | 300 | 1.1 | -0.02em |
| H2 | Cormorant | 36–42px | 400 | 1.15 | -0.01em |
| H3 | Cormorant | 26–30px | 400 | 1.2 | 0 |
| Header-caps (навигация) | Inter | 11–12px | 500 | 1.4 | 0.12em |
| Body L | Inter | 18px | 400 | 1.7 | 0 |
| Body M | Inter | 16px | 400 | 1.6 | 0 |
| Body S | Inter | 14px | 400 | 1.5 | 0 |
| Caption / метка | Inter | 11–12px | 500 | 1.4 | 0.1em |

**Ключевое правило:** H1 и H2 — всегда Cormorant, light/regular.
Никогда не Bold — теряется изящество.

---

## Пространство и ритм

```
spacing-base:      8px
section-padding:   80px (mobile) / 120px (desktop)
section-gap:       64px (mobile) / 96px (desktop)
container-max:     1280px
container-padding: 24px (mobile) / 48px (desktop)
border-radius:     0px — никаких скруглений
```

**Принцип сетки:** 12 колонок, gap 24px.
Контент занимает 10 из 12 колонок на десктопе — много воздуха по краям.

**Border-radius: 0** — принципиально.
Прямые углы — это язык галереи, архитектуры, серьёзного учреждения.
Скругления дают ощущение «приложения», не «институции».

---

## Компоненты-атомы

### Кнопка primary (как у Виктории — текст + стрелка)
```
Фон: transparent
Цвет текста: var(--color-ink)
Бордер: none
Нижняя линия: 1px solid var(--color-ink)
Padding: 0 0 4px 0
Font: Inter 500, 12px, uppercase, letter-spacing 0.1em
Иконка: SVG-стрелка справа →
Hover: opacity 0.6, transition 200ms
```

### Кнопка CTA (filled — для форм и hero)
```
Фон: var(--color-ink)
Цвет текста: var(--color-background)
Бордер: none
Border-radius: 0
Padding: 14px 32px
Font: Inter 500, 12px, uppercase, letter-spacing 0.1em
Hover: background var(--color-accent-hover), transition 150ms
```

### Кнопка secondary (outline)
```
Фон: transparent
Бордер: 1px solid var(--color-ink)
Цвет текста: var(--color-ink)
Border-radius: 0
Padding: 13px 31px
Hover: background var(--color-ink), color var(--color-background)
```

### Карточка специальности
```
Фон: var(--color-surface)
Border: none
Border-radius: 0
Padding: 0
Изображение: aspect-ratio 4:3, object-fit cover
Hover: изображение scale(1.03), transition 400ms ease
Заголовок: H3 Cormorant
УТП: Body S Inter, color secondary
```

### Карточка товара (магазин)
```
Фон: transparent
Border-radius: 0
Изображение: aspect-ratio 1:1, object-fit cover
Подпись: Body S, автор курсивом (Cormorant italic)
Цена: Inter 500
```

### Метка / тег (тип специальности)
```
Font: Inter 500, 11px, uppercase, letter-spacing 0.1em
Color: var(--color-secondary)
Фон: none
Border: 1px solid var(--color-border)
Padding: 3px 8px
Border-radius: 0
```

### Поле формы (editorial style — как у Виктории)
```
Border: none
Border-bottom: 1px solid var(--color-border-strong)
Background: transparent
Padding: 12px 0
Font: Inter 400, 16px
Placeholder color: var(--color-muted)
Focus: border-bottom color var(--color-ink), transition 200ms
Border-radius: 0
```

### Разделитель секций
```
Border-top: 1px solid var(--color-border)
```

---

## Граница design-keeper / frontend

| Задача | Кто |
|--------|-----|
| Цвет кнопки | Design Keeper → tokens |
| `<button class="btn-primary">` | Frontend |
| Решить что hero fullscreen | Design Keeper |
| `<section class="hero h-screen">` | Frontend |
| Новый токен в tokens.css | Design Keeper (согласовать) |
| Реализовать hover-анимацию | Frontend по спеку |

---

## Запрещённые паттерны

- `border-radius` > 0 — только прямые углы везде
- `overflow-x: hidden` на html/body → только `clip` (R2 из playbook)
- Element-resets вне `@layer base` (R3 из playbook)
- Цветные кнопки (синий, красный, зелёный)
- Градиенты в UI
- Box-shadow на карточках
- Стоковые иконки — только SVG из набора проекта или Lucide
- Bold (600+) на Cormorant Garamond — теряет изящество
- `#FFFFFF` и `#000000` напрямую — только через токены
- Скругления на input-полях

---

## tokens.css — готово для вставки

```css
/* resources/css/tokens.css */
@theme {
  /* === ЦВЕТА === */
  --color-background: #FAFAF8;
  --color-surface:    #F2F0EC;
  --color-ink:        #1A1817;
  --color-secondary:  #6B6762;
  --color-muted:      #A8A4A0;
  --color-accent:     #1A1817;
  --color-accent-hover: #3D3A38;
  --color-border:     #E0DDD8;
  --color-border-strong: #C8C4BE;

  /* === ТИПОГРАФИКА === */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body:    'Inter', system-ui, sans-serif;

  /* === РАЗМЕРЫ ШРИФТОВ === */
  --text-hero:    clamp(48px, 6vw, 80px);
  --text-h1:      clamp(36px, 4vw, 56px);
  --text-h2:      clamp(28px, 3vw, 42px);
  --text-h3:      clamp(22px, 2.5vw, 30px);
  --text-caps:    12px;
  --text-body-l:  18px;
  --text-body-m:  16px;
  --text-body-s:  14px;

  /* === ИНТЕРЛИНЬЯЖ === */
  --leading-tight:  1.05;
  --leading-snug:   1.2;
  --leading-normal: 1.6;
  --leading-loose:  1.75;

  /* === ОТСТУПЫ === */
  --spacing-section-mobile:  80px;
  --spacing-section-desktop: 120px;
  --spacing-gap-mobile:      64px;
  --spacing-gap-desktop:     96px;
  --container-max:           1280px;
  --container-padding:       clamp(24px, 4vw, 48px);

  /* === АНИМАЦИИ === */
  --duration-fast:   150ms;
  --duration-base:   250ms;
  --duration-slow:   400ms;
  --ease-base:       cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out:        cubic-bezier(0, 0, 0.2, 1);
}
```

---

## Визуальный спек ключевых блоков

### Hero
```
Фон: var(--color-background)
Изображение: fullwidth, aspect-ratio 16:9 (desktop) / 4:3 (mobile)
             position: cover, object-position center
H1: font-display, var(--text-hero), weight 300, leading-tight
    color: var(--color-ink)
Подзаголовок: font-body, var(--text-body-l), leading-loose, color secondary
УТП-строка: font-body, var(--text-caps), uppercase, letter-spacing 0.1em
            color secondary, разделитель «·»
CTA: кнопка filled + кнопка outline рядом, gap 16px
```

### Карточка специальности
```
Сетка: 3 колонки desktop / 2 tablet / 1 mobile
Gap: 1px (создаёт эффект сетки-витрины — как в галерее)
Изображение: aspect-ratio 4:3, object-fit cover
             hover: scale(1.03), transition var(--duration-slow)
Контент-зона: padding 20px 0, background var(--color-background)
Тег (тип): метка caps, color secondary
Заголовок: H3 Cormorant, color ink
УТП: body-s Inter, color secondary, margin-top 8px
Нижняя линия: 1px solid var(--color-border)
```

### Карусель работ
```
Горизонтальный скролл без скроллбара
Карточка: width 280px (mobile) / 320px (desktop)
          flex-shrink: 0
Изображение: aspect-ratio 3:4 (портретные работы) или 4:3
Автор: font-display italic, var(--text-body-s), color secondary
Специальность: font-body, var(--text-caps), uppercase, color muted
Цена: font-body 500, var(--text-body-m), color ink
```

### Секция приёмной комиссии
```
Сетка: 2 колонки — контакты слева (5/12), форма справа (6/12)
       gap 1 колонка
Разделитель сверху: 1px solid var(--color-border)
Заголовок: H2 Cormorant
Контакты: body-m, каждая строка с иконкой
Форма: editorial style — поля только с нижней линией
```
