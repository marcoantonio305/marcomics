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
use Stripe\Customer;
use Stripe\PaymentMethod;

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
            \App\Models\HistorialCompra::create([
                'user_id'   => $usuario->id,
                'compra_id' => $nuevaCompra->id,
            ]);
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
    $compra->load(['historialCompra.user', 'comics' => function($query) {
        $query->withPivot('cantidad', 'precio_unitario');
    }]);

    $esAdmin = $usuario->rol_id == 1;
    $esDueño = $usuario->id === ($compra->historialCompra->user_id ?? null);

    if (!$esAdmin && !$esDueño) {
        abort(403);
    }

    return Inertia::render('compras/show', [
        'compra' => $compra,
        'user' => $compra->historialCompra->user,
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
                $carrito[$id]['cantidad'] -= 1;
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
    $user = Auth::user();
    
    $precomprasPasadasActivas = DB::table('comic_compra')
        ->join('comics', 'comic_compra.comic_id', '=', 'comics.id')
        ->join('compras', 'comic_compra.compra_id', '=', 'compras.id')
        ->join('historial_compras', 'compras.id', '=', 'historial_compras.compra_id')
        ->where('historial_compras.user_id', $user->id)
        ->where('comics.lanzamiento', '>', now())
        ->sum('comic_compra.cantidad');

    $nuevasPrecompras = 0;

    //Se calcula el total real en el servidor
    $totalReal = 0;
    foreach ($carrito as $item) {
        // Se busca el comic en la base de datos por cuestiones de seguridad
        /** @var \App\Models\Comic $comic */
        $comic = \App\Models\Comic::find($item['id']);
        
        $esPrecompra = $comic->lanzamiento > now();
        if ($esPrecompra) {
            $nuevasPrecompras += $item['cantidad'];
        }

        if (!$esPrecompra && $comic->stock < $item['cantidad']) {
            return back()->with('error', "No hay stock suficiente de: " . $comic->titulo);
        }
        $totalReal += $comic->precio * $item['cantidad'];
    }

    if (($precomprasPasadasActivas + $nuevasPrecompras) > 5) {
        return back()->with('error', "No puedes tener más de 5 cómics en precompra activos simultáneamente. Actualmente tienes {$precomprasPasadasActivas} activos en tus lanzamientos futuros.");
    }

    // En caso de que el carrito esté vacío o el comic no exista
    if ($totalReal <= 0) {
        return back()->with('error', 'No se pudo calcular el total de la compra.');
    }

    // Se crea el cargo
    try {

        $sourceId = ($request->usar_guardada && $user->pm_id) 
                    ? $user->pm_id 
                    : $request->stripeToken;

        if (!$sourceId) {
            return back()->with('error', 'No se seleccionó ningún método de pago válido.');
        }

       
        if (str_starts_with($sourceId, 'pm_')) {
            
            \Stripe\PaymentIntent::create([
                'amount' => $totalReal * 100,
                'currency' => 'eur',
                'customer' => $user->stripe_id,
                'payment_method' => $sourceId,
                'off_session' => true,
                'confirm' => true,
                'description' => 'Compra de comics - Usuario ID: ' . $user->id,
            ]);
        } else {
            
            $chargeParams = [
                'amount' => $totalReal * 100, 
                'currency' => 'eur',
                'description' => 'Compra de comics - Usuario ID: ' . $user->id,
                'source' => $sourceId,
            ];

            if ($request->usar_guardada && $user->stripe_id) {
                $chargeParams['customer'] = $user->stripe_id;
            }

            \Stripe\Charge::create($chargeParams);
        }
        

        foreach ($carrito as $item) {
            /** @var \App\Models\Comic $comic */
            $comic = \App\Models\Comic::find($item['id']);
            if ($comic) {
                $esPrecompra = $comic->lanzamiento > now();
                if (!$esPrecompra) {
                    $comic->decrement('stock', (int)$item['cantidad']);
                }
            }
        }

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

public function guardarTarjeta(Request $request)
{
    $request->validate([
        'payment_method_id' => 'required|string',
        'last4' => 'required|string|size:4',
    ]);

    $user = Auth::user();
    \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

    try {
         // Se crea una stripe_id si el usuario no la tiene
        if (!$user->stripe_id) {
            $customer = Customer::create([
                'email' => $user->email,
                'name' => $user->name,
            ]);
            $user->stripe_id = $customer->id;
            $user->save(); // Importante: Guardamos el stripe_id antes de seguir
        }

        $paymentMethod = PaymentMethod::retrieve($request->payment_method_id);
        $paymentMethod->attach(['customer' => $user->stripe_id]);

        // Se guarda la información en users
        $user->update([
            'pm_id' => $request->payment_method_id,
            'tarjeta_4_ultimos' => $request->last4, // Cambiado de card_last4 a tarjeta_4_ultimos
            'stripe_id' => $user->stripe_id,
        ]);

        return redirect()->route('carrito.mostrar')->with('success', 'Tarjeta guardada correctamente.');

    } catch (\Exception $e) {
        return back()->with('error', 'Error al guardar la tarjeta: ' . $e->getMessage());
    }
}


}