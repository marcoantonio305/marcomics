<?php

namespace App\Http\Controllers;

use App\Models\Editora;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditoraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $editoras = Editora::all();
        return Inertia::render('editoras/index', [
            'editoras' => $editoras,
            'titulo' => 'Lista de editoras'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('editoras/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|max:255',
        ]);

        Editora::create($validated);
        return redirect()->route('editoras.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Editora $editora)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Editora $editora)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Editora $editora)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Editora $editora)
    {
        $editora->delete();
        return redirect()->route('editoras.index');
    }
}
