<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use App\Models\Comic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ComentarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('comentarios/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Comic $comic)
    {
        
        $validated = $request->validate([
            'contenido' => 'required|max:2000',
                'puntuacion' => 'required|integer|min:1|max:5',
        ]);

        

        $comic->comentarios()->create([
            'contenido' => $validated['contenido'],
            'puntuacion' => $validated['puntuacion'],
            'user_id' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'Comentario agregado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Comentario $comentario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comentario $comentario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comentario $comentario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comentario $comentario)
    {
        $comentario->delete();

        return redirect()->back()->with('success', 'Comentario eliminado exitosamente.');
    }
}
