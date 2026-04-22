<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ShopController extends Controller
{
    private const SLUGS = [
        'kolco-listva', 'sergi-hrizantema', 'platoc-osen', 'zhostovskij-podnos',
        'keramika-vaza', 'bresh-vetka', 'bukety-suhocvety', 'plakat-arhitektura',
        'sharf-uzor', 'brelok-lunat', 'nabor-igrushek', 'listovka-kolleg',
    ];

    public function index()
    {
        return Inertia::render('Shop');
    }

    public function show(string $slug)
    {
        if (!in_array($slug, self::SLUGS, true)) {
            abort(404);
        }

        return Inertia::render('ShopProduct', ['slug' => $slug]);
    }
}
