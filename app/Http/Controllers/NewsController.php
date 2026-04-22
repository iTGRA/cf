<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class NewsController extends Controller
{
    // Placeholder until Orchid/CMS wiring is done
    private const PLACEHOLDER = [
        [
            'id'           => 1,
            'slug'         => 'olimpiada-yuvelirnoye-delo-2026',
            'title'        => 'Студенты колледжа победили на Всероссийской олимпиаде по ювелирному делу',
            'excerpt'      => 'Команда колледжа заняла первое место в категории «Художественное литьё» и второе место в категории «Ручная работа».',
            'published_at' => '18 апреля 2026',
            'type'         => 'news',
        ],
        [
            'id'           => 2,
            'slug'         => 'den-otkrytyh-dverej-aprel-2026',
            'title'        => 'День открытых дверей: более 300 абитуриентов познакомились с колледжем',
            'excerpt'      => 'В этом году рекордная посещаемость: абитуриенты из 12 регионов России приехали узнать о специальностях и посмотреть мастерские.',
            'published_at' => '10 апреля 2026',
            'type'         => 'event',
        ],
        [
            'id'           => 3,
            'slug'         => 'vystavka-diplomnyh-rabot-2025',
            'title'        => 'Выставка дипломных работ — лучшее из 2025 года',
            'excerpt'      => 'Более 80 дипломных проектов — ювелирные украшения, костюмы, интерьеры, жостовские подносы — представлены в главном корпусе.',
            'published_at' => '2 апреля 2026',
            'type'         => 'news',
        ],
        [
            'id'           => 4,
            'slug'         => 'partnerstvo-bolshoj-teatr',
            'title'        => 'Колледж и Большой театр продлили соглашение о сотрудничестве',
            'excerpt'      => 'Студенты специальности «Художник по костюму» продолжат проходить практику в мастерских Большого театра.',
            'published_at' => '25 марта 2026',
            'type'         => 'news',
        ],
        [
            'id'           => 5,
            'slug'         => 'nabor-podgotovitelnyh-kursov-2026',
            'title'        => 'Открыт набор на подготовительные курсы к вступительным испытаниям',
            'excerpt'      => 'Занятия по академическому рисунку, живописи и композиции начинаются в мае. Ведут преподаватели колледжа.',
            'published_at' => '15 марта 2026',
            'type'         => 'event',
        ],
        [
            'id'           => 6,
            'slug'         => 'masterklass-zhostovo',
            'title'        => 'Мастер-класс по жостовской росписи для школьников',
            'excerpt'      => 'В рамках профориентационной программы мы проводим открытые мастер-классы для учеников 8–9 классов.',
            'published_at' => '5 марта 2026',
            'type'         => 'event',
        ],
    ];

    public function index()
    {
        return Inertia::render('News', [
            'items' => self::PLACEHOLDER,
        ]);
    }

    public function show(string $slug)
    {
        $item = collect(self::PLACEHOLDER)->firstWhere('slug', $slug);
        if (!$item) {
            abort(404);
        }

        return Inertia::render('NewsShow', [
            'item' => $item,
            'related' => collect(self::PLACEHOLDER)
                ->where('slug', '!=', $slug)
                ->take(3)
                ->values()
                ->toArray(),
        ]);
    }
}
