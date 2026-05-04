<?php

namespace App\Http\Controllers;

use App\Models\Comic;
use App\Models\Compra;
use App\Models\HistorialCompra;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Charge;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use App\Mail\FacturaCompra;

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
    return DB::transaction(function () use ($request) {
        $nuevaCompra = Compra::create([
            'total' => $request->total_carrito
        ]);

        $usuario = Auth::user();
        if ($usuario) {
            $usuario->compras()->attach($nuevaCompra->id);
        }

        $itemsDelCarrito = session()->get('carrito', []);

        foreach ($itemsDelCarrito as $item) {
            $comicDb = Comic::find($item['id']);
            
            if ($comicDb) {
                $nuevaCompra->comics()->attach($item['id'], [
                    'cantidad'        => $item['cantidad'],
                    'precio_unitario' => $comicDb->precio, 
                ]);
            }
        }

        return $nuevaCompra;
    });
}

    /**
     * Display the specified resource.
     */
    public function show(Compra $compra)
{
    $usuario = Auth::user();
    
    $compra->load('historialCompra');

    $esAdmin = $usuario->rol_id == 1;
    
    $esDueño = $usuario->id === ($compra->historialCompra->user_id ?? null);

    if (!$esAdmin && !$esDueño) {
        abort(403, 'No tienes permiso para ver esta compra.');
    }

    $compra->load(['historialCompra.user', 'comics']);

    return Inertia::render('compras/show', [
        'compra' => $compra,
        'user' => $compra->historialCompra?->user,
        'comics' => $compra->comics
    ]);
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
        $compra->delete();
        return back()->with('success', 'Compra eliminada exitosamente.');
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

    public function procesarPago(Request $request)
    {
        // Se configura la clave secreta
        Stripe::setApiKey(env('STRIPE_SECRET'));

        
        //Recuperar el carrito de la sesión
        $carrito = session()->get('carrito', []);

        //Se calcula el total real en el servidor
        $totalReal = 0;
    foreach ($carrito as $item) {
        // Se busca el comic en la base de datos por cuestiones de seguridad
        $comic = \App\Models\Comic::find($item['id']);
        
        if ($comic) {
            $totalReal += $comic->precio * $item['cantidad'];
        }
    }

    // En caso de que el carrito esté vacío o el comic no exista
    if ($totalReal <= 0) {
        return back()->with('error', 'No se pudo calcular el total de la compra.');
    }

        // Se crea el cargo
        try {
    $charge = Charge::create([
        'amount' => $totalReal * 100, 
        'currency' => 'eur',
        'source' => $request->stripeToken,
        'description' => 'Compra de comics'
    ]);

    $request->merge(['total_carrito' => $totalReal, 'items' => array_values($carrito)]);
    
    $nuevaCompra = $this->store($request);

    // Se carga los datos para el pdf
    $compraCargada = Compra::with(['comics', 'historialCompra.user'])->find($nuevaCompra->id);
    $total = $compraCargada->total;
$baseImponible = $total / 1.21;
$iva = $total - $baseImponible;

$pdf = Pdf::loadView('pdf.compra', [
    'compra' => $compraCargada,
    'baseImponible' => $baseImponible,
    'iva' => $iva
]);
$pdfContent = $pdf->output();

    // Se le envia el correo al usuario
    Mail::to($request->user()->email)->send(new FacturaCompra($compraCargada, $pdfContent));

    session()->forget('carrito');

    return back()->with('success', 'Pago procesado y factura enviada a tu email');
    } catch (\Exception $e) {
            return back()->with('error', 'Error al procesar el pago: ' . $e->getMessage());
        }
}

public function generarPdf($id)
{
    $compra = Compra::with('historialCompra')->findOrFail($id);
    $usuario = Auth::user();

    $esAdmin = $usuario->rol_id == 1;
    $esDueño = $usuario->id === ($compra->historialCompra->user_id ?? null);

    if (!$esAdmin && !$esDueño) {
        abort(403, 'No tienes permiso para descargar esta factura.');
    }

    $compra->load(['comics', 'historialCompra.user']);

    $baseImponible = $compra->total / 1.21;
    $iva = $compra->total - $baseImponible;

    $pdf = Pdf::loadView('pdf.compra', [
        'compra'        => $compra,
        'user'          => $compra->historialCompra?->user,
        'comics'        => $compra->comics,
        'baseImponible' => $baseImponible,
        'iva'           => $iva
    ]);

    return $pdf->download('factura_compra_' . $compra->id . '.pdf');
}


}