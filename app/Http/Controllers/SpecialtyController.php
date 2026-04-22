<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SpecialtyController extends Controller
{
    private const SLUGS = [
        'dizajn-interera',
        'dizajn-yuvelir',
        'dizajn-legkaya',
        'dpi',
        'tekstil',
        'kostyum',
        'floristika',
        'yuvelir',
        'grafika',
    ];

    public function show(string $slug)
    {
        if (!in_array($slug, self::SLUGS, true)) {
            abort(404);
        }

        return Inertia::render('Specialty', [
            'slug' => $slug,
        ]);
    }
}
