<?php

/**
 * Static site content for Queue 1.
 * Mirrors what SiteSettings (key/value) will hold once the admin is wired.
 * When the Orchid screen lands, HandleInertiaRequests switches source from
 * config('site') to SiteSettings::asArray() — component props shape stays.
 */

return [
    'name_full' => 'Колледж декоративно-прикладного искусства им. Карла Фаберже',
    'name_short' => 'Колледж Фаберже',
    'mark' => 'КДПИ им. Карла Фаберже',
    'slogan' => 'Учим тех, кто создаёт шедевры',

    'external' => [
        'official_site' => [
            'label' => 'Официальный сайт',
            'url' => 'https://collegefaberge.mskobr.ru',
        ],
        'moscow_colleges' => [
            'label' => 'Колледжи Москвы',
            'url' => 'https://xn--80adfdgvdeanqg3b.xn--p1ai',
        ],
    ],

    'socials' => [
        ['name' => 'VK', 'url' => '#'],
        ['name' => 'Telegram', 'url' => '#'],
        ['name' => 'MAX', 'url' => '#'],
    ],

    'nav' => [
        ['label' => 'Абитуриентам', 'href' => '/abiturientam', 'active' => true],
        ['label' => 'Студентам', 'href' => '#', 'active' => false],
        ['label' => 'Чем занимаемся', 'href' => '#', 'active' => false],
        ['label' => 'О нас', 'href' => '#', 'active' => false],
        ['label' => 'Магазин', 'href' => '#', 'active' => false],
    ],

    'priem' => [
        'address' => 'г. Москва, Якорная ул., д.6, к.1',
        'metro' => 'м. Коломенская',
        'phone' => '+7 (499) 617-15-55',
        'phone_tel' => '+74996171555',
        'email' => 'priem.kdpi@yandex.ru',
        'hours' => 'Пн–Пт 9:00–17:30',
    ],

    'corpuses' => [
        [
            'name' => 'Художественное',
            'address' => 'Шипиловская ул., д.17, к.1, стр.2',
            'phone' => '+7 (499) 782-07-27',
            'phone_tel' => '+74997820727',
        ],
        [
            'name' => 'Информационно-технологическое',
            'address' => 'Элеваторная ул., д.19',
            'phone' => '+7 (495) 327-79-00',
            'phone_tel' => '+74953277900',
        ],
        [
            'name' => 'Художественный текстиль',
            'address' => 'Якорная ул., д.6, к.1',
            'phone' => '+7 (499) 618-01-29',
            'phone_tel' => '+74996180129',
        ],
    ],

    'legal' => [
        ['label' => 'Политика конфиденциальности', 'href' => '/privacy'],
    ],

    'a11y' => [
        'label' => 'Версия для слабовидящих',
        'href' => '#',
    ],
];
