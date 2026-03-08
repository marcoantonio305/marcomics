<?php

namespace App\Http\Controllers;

use App\Models\Autor;
use App\Models\Categoria;
use App\Models\Comic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comics = Comic::all();
        return Inertia::render('comics/index', [
            'comics' => Comic::with('categorias', 'autors')->get(),
            'titulo' => 'Catálogo de cómics'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('comics/create', [
            'todos_los_autores' => Autor::all(),                
        'todas_las_categorias' => Categoria::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|max:255',
            'precio' => 'required|numeric|min:0',
            'lanzamiento' => 'required|date',
            'descripcion' => 'required|max:2000',
            // validar de que sean array si vamos a usar en sync
            'autors_ids' => 'array',
        'categorias_ids' => 'array',
        ]);

        $comic = Comic::create($validated);
        

        $comic->categorias()->sync($request->categorias_ids);
        $comic->autors()->sync($request->autors_ids);
        return redirect()->route('comics.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Comic $comic)
    {
        return Inertia::render('comics/show', [
            'comic' => $comic->load('categorias')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comic $comic)
    {
        return Inertia::render('comics/edit', [
            'comic' => $comic->load(['autors', 'categorias']),
            'todos_los_autores' => Autor::all(),
        'todas_las_categorias' => Categoria::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comic $comic)
    {
        $validated = $request->validate([
            'titulo' => 'required|max:255',
            'precio' => 'required|numeric|min:0',
            'lanzamiento' => 'required|date',
            'descripcion' => 'required|max:2000'
        ]);

        $comic->update($validated);

        $comic->autors()->sync($request->autors_ids);
    $comic->categorias()->sync($request->categorias_ids);

        return redirect()->route('comics.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comic $comic)
    {
        $comic->delete();
        return redirect()->route('comics.index');
    }
}
