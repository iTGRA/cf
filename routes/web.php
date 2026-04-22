<?php

use App\Http\Controllers\AbiturientController;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\SpecialtyController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/abiturientam', [AbiturientController::class, 'index'])->name('abiturientam');
Route::redirect('/specialnosti', '/abiturientam', 301);
Route::get('/specialnosti/{slug}', [SpecialtyController::class, 'show'])->name('specialnosti.show');
Route::get('/contacts', [ContactsController::class, 'index'])->name('contacts');
Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{slug}', [NewsController::class, 'show'])->name('news.show');

Route::get('/lab', function () {
    return Inertia::render('Lab');
})->name('lab');

Route::get('/lab2', function () {
    return Inertia::render('Lab');
})->name('lab2');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
