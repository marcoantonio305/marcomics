<?php

namespace App\Http\Controllers;

use App\Models\Comic;
use App\Models\Compra;
use App\Models\HistorialCompra;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompraController extends Controller
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $nuevaCompra = Compra::create(['total' => $request->total_carrito]);

        HistorialCompra::create([
            'user_id' => auth()->id,
            'compra_id' => $nuevaCompra->id
        ]);

        foreach ($request->items as $item) {
            $comic = Comic::find($item['id']);

            $nuevaCompra->comics()->attach($comic->id, [
                'cantidad' => $item['cantidad'],
                'precio_unitario' => $comic->precio
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Compra $compra)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Compra $compra)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Compra $compra)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Compra $compra)
    {
        //
    }

    public function anadirAlCarrito(Request $request)
    {
        $id = $request->comic_id;

        $carrito = session()->get('carrito', []);

        if (isset($carrito[$id])) {
            $carrito[$id]['cantidad'] += 1;
        } else {
            $comic = Comic::find($id);
            $carrito[$id] = [
                'id' => $comic->id,
                'titulo' => $comic->titulo,
                'precio' => $comic->precio,
                'cantidad' => 1
            ];
        }
        session()->put('carrito', $carrito);

        return back()->with('success', 'Comic añadido al carrito');
    }

    public function disminuirDelCarrito(Request $request)
    {
        $id = $request->comic_id;
        $carrito = session()->get('carrito', []);

        if (isset($carrito[$id])) {
            if ($carrito[$id]['cantidad'] > 1) {
                $carrito[$id]['cantidad'] -= 1;
            } else {
                unset($carrito[$id]);
            }
            session()->put('carrito', $carrito);
            return back()->with('success', 'Comic eliminado del carrito');
        }

        return back()->with('error', 'Comic no encontrado en el carrito');
    }

    public function eliminarDelCarrito(Request $request)
    {
        $id = $request->comic_id;
        $carrito = session()->get('carrito', []);

        if (isset($carrito[$id])) {
                unset($carrito[$id]);
                session()->put('carrito', $carrito);
            }

        return back()->with('error', 'Comic no encontrado en el carrito');
    }

    public function mostrarCarrito()
    {
        $carrito = session()->get('carrito', []);
        return Inertia::render('paginaCarrito', ['carrito' => $carrito,
        'comics' => Comic::all()
        ]);
    }
}
