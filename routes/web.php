<?php

use App\Http\Controllers\AutorController;
use App\Http\Controllers\BibliotecaController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\ComicController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\EditoraController;
use App\Http\Controllers\HistorialCompraController;
use App\Http\Controllers\PostChatController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\SoloAdmin;
use App\Http\Middleware\SoloAdminYVendedor;
use App\Models\Categoria;
use App\Models\Comic;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

//Route::inertia('/', 'welcome', [
//'canRegister' => Features::enabled(Features::registration()),
//])->name('home');

Route::get('/', function () {
    return Inertia::render('inicio', [
        'comics' => \App\Models\Comic::with(['autors', 'categorias'])->get(), 
        'canRegister' => Laravel\Fortify\Features::enabled(Laravel\Fortify\Features::registration()),
    ]);
})->name('home');

Route::get('/inicio', function () {
    return Inertia::render('inicio', [
        'categorias' => Categoria::all(),
        'comics' => Comic::with(['categorias', 'autors'])->latest()->take(12)->get(),
        'chat' => \App\Models\Chat::where('nombre_clave', 'general')->first(),
        'postChats' => \App\Models\PostChat::with('user')->whereHas('chat', function($q){
            $q->where('nombre_clave', 'general');
        })->latest()->take(10)->get()->reverse()->values(),
    ]);
})->name('inicio');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});



// Solo puede visitar estas rutas el admin y el vendedor
Route::middleware(['auth', SoloAdminYVendedor::class])->group(function () {
    Route::get('/comics', [ComicController::class, 'index'])->name('comics.index');
    Route::get('/comics/create', [ComicController::class, 'create'])->name('comics.create');
    Route::post('/comics', [ComicController::class, 'store'])->name('comics.store');
    Route::get('/comics/{comic}/edit', [ComicController::class, 'edit'])->name('comics.edit');
    Route::put('/comics/{comic}', [ComicController::class, 'update'])->name('comics.update');
    Route::delete('/comics/{comic}', [ComicController::class, 'destroy'])->name('comics.destroy');

    Route::get('/autors', [AutorController::class, 'index'])->name('autors.index');
Route::get('/autors/create', [AutorController::class, 'create'])->name('autors.create');
Route::post('/autors', [AutorController::class, 'store'])->name('autors.store');
Route::delete('/autors/{autor}', [AutorController::class, 'destroy'])->name('autors.destroy');

Route::get('/categorias/create', [CategoriaController::class, 'create'])->name('categorias.create');
Route::post('/categorias', [CategoriaController::class, 'store'])->name('categorias.store');
Route::get('/categorias', [CategoriaController::class, 'index'])->name('categorias.index');
Route::delete('/categorias/{categoria}', [CategoriaController::class, 'destroy'])->name('categorias.destroy');
Route::get('/categorias/{categoria}/edit', [CategoriaController::class, 'edit'])->name('categorias.edit');
Route::put('/categorias/{categoria}', [CategoriaController::class, 'update'])->name('categorias.update');


Route::get('/editoras', [EditoraController::class, 'index'])->name('editoras.index');
Route::get('/editoras/create', [EditoraController::class, 'create'])->name('editoras.create');
Route::post('/editoras', [EditoraController::class, 'store'])->name('editoras.store');
Route::delete('/editoras/{editora}', [EditoraController::class, 'destroy'])->name('editoras.destroy');


});

Route::get('/comics/{comic}', [ComicController::class, 'show'])->name('comics.show');




Route::get('/categorias/{categoria}', [CategoriaController::class, 'show'])->name('categorias.show'); //Ruta para mostrar todos los comics de una categoría

// Solo puede visitar estas rutas el admin
Route::middleware(['auth', SoloAdmin::class])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::delete('/comentarios/{comentario}', [ComentarioController::class, 'destroy'])->name('comentarios.destroy');
});


Route::get('/historialCompras', [HistorialCompraController::class, 'index'])->name('historialCompras.index');
Route::get('/historialCompras/create', [HistorialCompraController::class, 'create'])->name('historialCompras.create');
Route::post('/historialCompras', [HistorialCompraController::class, 'store'])->name('historialCompras.store');
Route::delete('/historialCompras/{historialCompra}', [HistorialCompraController::class, 'destroy'])->name('historialCompras.destroy');

Route::get('/postChats', [PostChatController::class, 'index'])->name('chat.index');
Route::post('/postChats/create', [PostChatController::class, 'store'])->name('post_chats.store');

Route::get('/api/buscador', [ComicController::class, 'buscador'])->name('api.buscador');


Route::get('/users/{user}', [UserController::class, 'show'])->name('user.show');
Route::delete('/comics/{comic}/biblioteca', [BibliotecaController::class, 'destroy'])->name('biblioteca_comic.destroy');
Route::post('/comics/{comic}/biblioteca', [BibliotecaController::class, 'store'])->name('biblioteca_comic.store');
Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
Route::patch('/users/{user}', [UserController::class, 'update'])->name('users.update');

Route::post('/carrito/anadir', [CompraController::class, 'anadirAlCarrito'])->name('carrito.anadir');
Route::post('/carrito/disminuir', [CompraController::class, 'disminuirDelCarrito'])->name('carrito.disminuir');
Route::delete('/carrito/eliminar', [CompraController::class, 'eliminarDelCarrito'])->name('carrito.eliminar');

Route::get('/carrito', [CompraController::class, 'mostrarCarrito'])->name('carrito.mostrar');

Route::post('/comentarios/{comic}', [ComentarioController::class, 'store'])->name('comentarios.store');
Route::get('/comentarios/create', [ComentarioController::class, 'create'])->name('comentarios.create');

require __DIR__.'/settings.php';