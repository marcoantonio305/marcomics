<?php

namespace App\Http\Controllers;

use App\Models\HistorialCompra;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistorialCompraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('historialCompras/index', [
        'historialCompras' => HistorialCompra::with(['compra', 'user'])->get(),
        'users' => \App\Models\User::all(),
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
}
