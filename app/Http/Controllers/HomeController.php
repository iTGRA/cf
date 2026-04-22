<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'openDay' => null, // TODO: OpenDay::active()->first()
        ]);
    }
}
