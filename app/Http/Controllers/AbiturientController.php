<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AbiturientController extends Controller
{
    public function index()
    {
        return Inertia::render('Abiturient', [
            'openDay' => null,
        ]);
    }
}
