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
            // validar que sean arrays si vamos a usar en sync
            'autors_ids' => 'array',
            'categorias_ids' => 'array',
            'editora_id' => 'nullable|exists:editoras,id', 
            'imagen' => 'required|image|max:2048',
            'preview1' => 'nullable|image|max:2048',
            'preview2' => 'nullable|image|max:2048',
        ]);


        if ($request->hasFile('imagen')) {
            $validated['imagen'] = $request->file('imagen')->store('images', 'public');
        }


        if ($request->hasFile('preview1')) {
            $validated['preview1'] = $request->file('preview1')->store('images', 'public');
        } else {
            unset($validated['preview1']); 
        }


        if ($request->hasFile('preview2')) {
            $validated['preview2'] = $request->file('preview2')->store('images', 'public');
        } else {
            unset($validated['preview2']);
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
            'comentarios' => $comic->comentarios()->with('user')->get(),
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
            'editora_id' => 'nullable|exists:editoras,id', // Cambiado a nullable
            'autors_ids' => 'array',
            'categorias_ids' => 'array',
            'imagen' => 'nullable|image|max:2048',
            'preview1' => 'nullable|image|max:2048',
            'preview2' => 'nullable|image|max:2048',
        ]);


        unset($validated['imagen'], $validated['preview1'], $validated['preview2']);


        if ($request->hasFile('imagen')) {
            if ($comic->imagen) {
                Storage::disk('public')->delete($comic->imagen);
            }
            $validated['imagen'] = $request->file('imagen')->store('images', 'public');
        }


        if ($request->hasFile('preview1')) {
            if ($comic->preview1) {
                Storage::disk('public')->delete($comic->preview1);
            }
            $validated['preview1'] = $request->file('preview1')->store('images', 'public');
        }


        if ($request->hasFile('preview2')) {
            if ($comic->preview2) {
                Storage::disk('public')->delete($comic->preview2);
            }
            $validated['preview2'] = $request->file('preview2')->store('images', 'public');
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
        //$comic->comentarios()->delete();
        
        //$comic->autors()->detach();
    //$comic->categorias()->detach();

    //if ($comic->imagen) {
        //\Illuminate\Support\Facades\Storage::disk('public')->delete($comic->imagen);
    //}
    
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

    public function anadirStock(Request $request, Comic $comic)
    {
        $validated = $request->validate([
            'stock' => 'required|integer|min:1'
        ]);

        $comic->increment('stock', $validated['stock']);

        return redirect()->route('comics.index');
    }

}
