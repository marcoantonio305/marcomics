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
    public function index()
{
    $historialCompras = HistorialCompra::with(['compra.comics', 'user'])->get();

    return Inertia::render('historialCompras/index', [
        'historialCompras' => $historialCompras,
        'users' => User::all(),
        'compras' => Compra::all(),
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