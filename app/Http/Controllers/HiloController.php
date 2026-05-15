<?php

namespace App\Http\Controllers;

use App\Models\Hilo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HiloController extends Controller
{
    public function index()
    {
        return Inertia::render('hilos/index', [
            'hilos' => Hilo::with('user:id,name,foto_perfil')->latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('hilos/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
        ]);

        $hilo = Hilo::create([
            'titulo' => $data['titulo'],
            'contenido' => $data['contenido'],
            'user_id' => Auth::id()
        ]);

        return redirect()->route('hilos.show', $hilo->id)
                         ->with('success', 'Hilo creado con éxito');
    }

    public function show(Hilo $hilo)
    {
        return Inertia::render('hilos/show', [
            'hilo' => $hilo->load(['user:id,name,foto_perfil', 'posts.user:id,name,foto_perfil'])
        ]);
    }

    public function destroy(Hilo $hilo)
{
    if (Auth::id() !== $hilo->user_id && Auth::user()->rol_id !== 1) {
        return back()->with('error', 'No tienes permisos para eliminar este hilo.');
    }

    $hilo->delete();
    return redirect()->route('hilos.index')->with('success', 'Hilo eliminado.');
}
}