<?php

namespace App\Http\Controllers;

use App\Models\Autor;
use App\Models\Categoria;
use App\Models\Comic;
use App\Models\Editora;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ComicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $comics = Comic::query()
        ->when($search, function ($query, $search) {
            $query->where('titulo', 'ILIKE', "%{$search}%");
        })
                ->with(['categorias', 'autors', 'editora'])
                ->get();
        
        return Inertia::render('comics/index', [
            'comics' => $comics,
            'titulo' => $search ? 'Resultados para: ' . $search : 'Catálogo de cómics',
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
        'todas_las_editoras' => Editora::all(),
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
        'editora_id' => 'exists:editoras,id'
        ]);
        if ($request->hasFile('imagen')) {
            $rutaImagen = $request->file('imagen')->store('images', 'public');
            $validated['imagen'] = $rutaImagen;
        }

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
            'comic' => $comic->load('categorias', 'autors', 'editora'),
            'comentarios' => $comic->comentarios()->with('user:id,name')->get(),
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
        'todas_las_editoras' => Editora::all()
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
            'descripcion' => 'required|max:2000',
        'editora_id' => 'exists:editoras,id',
        'autors_ids' => 'array',
        'categorias_ids' => 'array'
        ]);

        if ($request->hasFile('imagen')) {
            if ($comic->imagen) {
            Storage::disk('public')->delete($comic->imagen);
        }
            $rutaImagen = $request->file('imagen')->store('images', 'public');
            $validated['imagen'] = $rutaImagen;
        }

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
        $comic->autors()->detach();
    $comic->categorias()->detach();

    if ($comic->imagen) {
        \Illuminate\Support\Facades\Storage::disk('public')->delete($comic->imagen);
    }
    
        $comic->delete();
        return redirect()->route('comics.index');
    }


    public function buscador(Request $request)
    {
        $term = $request->input('term');

        if (!$term || strlen($term) < 2) {
        return response()->json(['comics' => [], 'categorias' => []]);
    }

        $comics = Comic::where('titulo', 'ILIKE', "%{$term}%")
            ->limit(7)
            ->get(['id', 'imagen', 'titulo']);

        $categorias = Categoria::where('nombre', 'ILIKE', "%{$term}%")
            ->limit(3)
            ->get(['id', 'nombre', 'imagen']);

        return response()->json([
            'comics' => $comics,
            'categorias' => $categorias
        ]);
    }
}
