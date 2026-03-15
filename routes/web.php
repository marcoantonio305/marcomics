<?php

use App\Http\Controllers\AutorController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ComicController;
use App\Http\Controllers\EditoraController;
use App\Http\Controllers\HistorialCompraController;
use App\Models\Categoria;
use App\Models\Comic;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::get('/inicio', function () {
    return Inertia::render('inicio', [
        'categorias' => Categoria::all(),
        'comics' => Comic::with(['categorias', 'autors'])->latest()->take(12)->get(),
    ]);
})->name('inicio');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('/comics', [ComicController::class, 'index'])->name('comics.index');
Route::get('/comics/create', [ComicController::class, 'create'])->name('comics.create');
Route::post('/comics', [ComicController::class, 'store'])->name('comics.store');
Route::get('/comics/{comic}/edit', [ComicController::class, 'edit'])->name('comics.edit');
Route::put('/comics/{comic}', [ComicController::class, 'update'])->name('comics.update');
Route::delete('/comics/{comic}', [ComicController::class, 'destroy'])->name('comics.destroy');
Route::get('/comics/{comic}', [ComicController::class, 'show'])->name('comics.show');

Route::get('/autors', [AutorController::class, 'index'])->name('autors.index');
Route::get('/autors/create', [AutorController::class, 'create'])->name('autors.create');
Route::post('/autors', [AutorController::class, 'store'])->name('autors.store');
Route::delete('/autors/{autor}', [AutorController::class, 'destroy'])->name('autors.destroy');

Route::get('/categorias', [CategoriaController::class, 'index'])->name('categorias.index');
Route::get('/categorias/create', [CategoriaController::class, 'create'])->name('categorias.create');
Route::post('/categorias', [CategoriaController::class, 'store'])->name('categorias.store');
Route::get('/categorias/{categoria}', [CategoriaController::class, 'show'])->name('categorias.show'); //Ruta para mostrar todos los comics de una categoría
Route::delete('/categorias/{categoria}', [CategoriaController::class, 'destroy'])->name('categorias.destroy');

Route::get('/editoras', [EditoraController::class, 'index'])->name('editoras.index');
Route::get('/editoras/create', [EditoraController::class, 'create'])->name('editoras.create');
Route::post('/editoras', [EditoraController::class, 'store'])->name('editoras.store');
Route::delete('/editoras/{editora}', [EditoraController::class, 'destroy'])->name('editoras.destroy');

Route::get('/historialCompras', [HistorialCompraController::class, 'index'])->name('historialCompras.index');
Route::get('/historialCompras/create', [HistorialCompraController::class, 'create'])->name('historialCompras.create');
Route::post('/historialCompras', [HistorialCompraController::class, 'store'])->name('historialCompras.store');
Route::delete('/historialCompras/{hisotialCompra}', [HistorialCompraController::class, 'destroy'])->name('historialCompras.destroy');



require __DIR__.'/settings.php';
