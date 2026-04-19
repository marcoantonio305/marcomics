<?php

namespace App\Http\Controllers;

use App\Models\Coleccion;
use App\Models\Comic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ColeccionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('coleccions/index', [
            'coleccions' => Coleccion::orderBy('orden', 'asc')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('coleccions/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|max:255',
        ]);

        Coleccion::create($validated);

        return redirect()->route('coleccions.index')->with('success', 'Colección creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Coleccion $coleccion)
    {
        $comicsColeccion = $coleccion->comics()->with(['autors', 'categorias'])->get();

        $comicsDisponible = Comic::whereDoesntHave('coleccions', function ($query) use ($coleccion) {
        $query->where('coleccion_id', $coleccion->id);
    })->with(['autors', 'categorias'])->get();
    
        return Inertia::render('coleccions/show', [
            'coleccion' => $coleccion->load('comics'),
            'comicsColeccion' => $comicsColeccion,
            'comicsDisponible' => $comicsDisponible
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Coleccion $coleccion)
    {
        return Inertia::render('coleccions/edit', [
            'coleccion' => $coleccion
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Coleccion $coleccion)
    {
        $validated = $request->validate([
            'nombre' => 'required|max:255',
        ]);

        $coleccion->update($validated);

        return redirect()->route('coleccions.index')->with('success', 'Colección actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Coleccion $coleccion)
    {
        $coleccion->delete();
        return back()->with('success', 'Colección eliminada exitosamente.');
    }

    public function anadirComicAColeccion(Request $request, Coleccion $coleccion, Comic $comic)
    {
        $coleccion->comics()->syncWithoutDetaching($comic->id);

        return back()->with('success', 'Comic añadido a la colección exitosamente.');
    }

    public function quitarComicDeColeccion(Request $request, Coleccion $coleccion, Comic $comic)
    {
        $coleccion->comics()->detach($comic->id);
        
        return back()->with('success', 'Comic eliminado de la colección exitosamente.');
    }

    public function coleccionAlInicio(Request $request, Coleccion $coleccion)
    {
        $request->validate([
        'orden' => 'required|integer|between:1,5' 
    ]);
    Coleccion::where('orden', $request->orden)
    ->where('id', '!=', $coleccion->id)
        ->update(['mostrar_inicio' => false, 'orden' => 0]);

        $coleccion->update([
        'mostrar_inicio' => true,
        'orden' => $request->orden
    ]);

        return back()->with('success', 'Colección marcada para mostrar en el inicio exitosamente.');
    }

    public function quitarColeccionDelInicio(Request $request, Coleccion $coleccion)
    {
        $coleccion->update([
            'mostrar_inicio' => false,
            'orden' => 0
        ]);

        return back()->with('success', 'Colección desmarcada para mostrar en el inicio exitosamente.');
    }

}
