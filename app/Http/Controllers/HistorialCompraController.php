<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\HistorialCompra;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistorialCompraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    // Usamos query() para ayudar a Intelephense
    $query = HistorialCompra::query()->with(['compra.comics', 'user']);

    if ($request->filled('user_id')) {
        $query->where('user_id', '=', $request->user_id);
    }

    if ($request->filled('comic_id')) {
        $query->whereHas('compra.comics', function ($q) use ($request) {
            $q->where('comics.id', '=', $request->comic_id);
        });
    }

    if ($request->filled('fecha_desde')) {
        $query->whereDate('created_at', '>=', $request->fecha_desde);
    }

    if ($request->filled('fecha_hasta')) {
        $query->whereDate('created_at', '<=', $request->fecha_hasta);
    }

    if ($request->filled('fecha_lanzamiento')) {
        $query->whereHas('compra.comics', function ($q) use ($request) {
            $q->whereDate('lanzamiento', '=', $request->fecha_lanzamiento);
        });
    
        if ($request->filled('lanzamiento_desde')) {
    $query->whereHas('compra.comics', function ($q) use ($request) {
        $q->whereDate('lanzamiento', '>=', $request->lanzamiento_desde);
    });
}
if ($request->filled('lanzamiento_hasta')) {
    $query->whereHas('compra.comics', function ($q) use ($request) {
        $q->whereDate('lanzamiento', '<=', $request->lanzamiento_hasta);
    });
}
    }

    return Inertia::render('historialCompras/index', [
        'historialCompras' => $query->latest()->get(),
        'users' => User::all(),
        'allComics' => \App\Models\Comic::query()->orderBy('titulo', 'asc')->get(), 
        'filters' => $request->only(['user_id', 'comic_id', 'fecha_desde', 'fecha_hasta', 'fecha_lanzamiento'])
    ]);
}
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(HistorialCompra $historialCompra)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HistorialCompra $historialCompra)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HistorialCompra $historialCompra)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HistorialCompra $historialCompra)
    {
        $historialCompra->delete();
        return back()->with('success', 'Historial de compra eliminado exitosamente.');
    }

    public function misComicsCompras(User $user)
{
    $usuarioAutenticado = Auth::user();

    if ($usuarioAutenticado->id !== $user->id && $usuarioAutenticado->rol_id !== 1) {
        abort(403);
    }

    return Inertia::render('historialCompras/miscomicsCompras', [ 
        'user' => $user,
        'compras' => $user->compras()
            ->with(['comics' => function($query) {
                $query->withPivot('cantidad', 'precio_unitario');
            }])
            ->latest()
            ->get(),
        'esAdmin' => $usuarioAutenticado->rol_id === 1,
    ]);
}
}