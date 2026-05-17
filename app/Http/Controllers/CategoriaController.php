<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Comic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categorias = Categoria::all();
        return Inertia::render('categorias/index', [
            'categorias' => $categorias,
            'titulo' => 'Lista de categorías'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('categorias/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|max:255',
            'imagen' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('imagen')) {
            $rutaImagen = $request->file('imagen')->store('images', 'public');
            $validated['imagen'] = $rutaImagen;
        }


        Categoria::create($validated);
        return redirect()->route('categorias.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Categoria $categoria)
    {
        $categoria->load(['comics.autors', 'comics.categorias']);
        
        $comicsEnCategoriaIds = $categoria->comics->pluck('id')->all();
        $user = auth()->user();
        $comicsRecomendados = collect();

        if ($user) {
            $categoriasDeInteres = collect();

            if (method_exists($user, 'wishlist') || method_exists($user, 'deseados')) {
                $relacionDeseados = method_exists($user, 'wishlist') ? 'wishlist' : 'deseados';
                $categoriasDeInteres = $categoriasDeInteres->merge(
                    $user->$relacionDeseados()->with('categorias')->get()->pluck('categorias.*.id')->flatten()
                );
            }

            if (method_exists($user, 'biblioteca') || method_exists($user, 'comics')) {
                $relacionBiblioteca = method_exists($user, 'biblioteca') ? 'biblioteca' : 'comics';
                $categoriasDeInteres = $categoriasDeInteres->merge(
                    $user->$relacionBiblioteca()->with('categorias')->get()->pluck('categorias.*.id')->flatten()
                );
            }

            $categoriasDeInteres = $categoriasDeInteres->unique()->filter()->all();

            if (!empty($categoriasDeInteres)) {
                $comicsRecomendados = Comic::with(['autors', 'categorias'])
                    ->whereNotIn('id', $comicsEnCategoriaIds)
                    ->whereHas('categorias', function ($query) use ($categoriasDeInteres) {
                        $query->whereIn('categoria_id', $categoriasDeInteres);
                    })
                    ->inRandomOrder()
                    ->take(7)
                    ->get();
            }
        }

        if ($comicsRecomendados->isEmpty()) {
            $comicsRecomendados = Comic::with(['autors', 'categorias'])
                ->whereNotIn('id', $comicsEnCategoriaIds)
                ->inRandomOrder()
                ->take(7)
                ->get();
        }

        return Inertia::render('categorias/show', [
            'categoria' => $categoria,
            'comicsRecomendados' => $comicsRecomendados,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categoria $categoria)
    {
        return Inertia::render('categorias/edit', [
            'categoria' => $categoria,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categoria $categoria)
    {
        $validated = $request->validate([
            'nombre' => 'required|max:255',
            'imagen' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('imagen')) {
            if ($categoria->imagen) {
                Storage::disk('public')->delete($categoria->imagen);
            }
            $rutaImagen = $request->file('imagen')->store('images', 'public');
            $validated['imagen'] = $rutaImagen;
        }

        $categoria->update($validated);
        return redirect()->route('categorias.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categoria $categoria)
    {
        $categoria->delete();
        return redirect()->route('categorias.index');
    }
}