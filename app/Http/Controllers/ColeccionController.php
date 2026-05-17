<?php

namespace App\Http\Controllers;

use App\Models\Coleccion;
use App\Models\Comic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class ColeccionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('coleccions/index', [
            'coleccions' => Coleccion::query()->orderBy('orden', 'asc')->get()
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
            'imagen' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('coleccion_images', 'public');
            $validated['imagen'] = $path;
        }

        Coleccion::query()->create($validated);

        return redirect()->route('coleccions.index')->with('success', 'Colección creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Coleccion $coleccion)
    {
        $comicsColeccion = $coleccion->comics()->with(['autors', 'categorias'])->get();

        $comicsDisponible = Comic::query()->whereDoesntHave('coleccions', function ($query) use ($coleccion) {
            $query->where('coleccion_id', '=', $coleccion->id);
        })->with(['autors', 'categorias'])->get();
        
        $comicsEnColeccionIds = $comicsColeccion->pluck('id')->all();
        $user = auth()->user();
        $comicsRecomendados = collect();

        if ($user) {
            $categoriasDeInteres = collect();

            if (method_exists($user, 'wishlist') || method_exists($user, 'deseados')) {
                $relacionDeseados = method_exists($user, 'wishlist') ? 'wishlist' : 'deseados';
                $categoriasDeInteres = $categoriasDeInteres->merge(
                    $user->$relacionDeseados()->with('categorias')->get()->pluck('categorias.*.id')->flatten()
                );
            }

            if (method_exists($user, 'biblioteca') || method_exists($user, 'comics')) {
                $relacionBiblioteca = method_exists($user, 'biblioteca') ? 'biblioteca' : 'comics';
                $categoriasDeInteres = $categoriasDeInteres->merge(
                    $user->$relacionBiblioteca()->with('categorias')->get()->pluck('categorias.*.id')->flatten()
                );
            }

            $categoriasDeInteres = $categoriasDeInteres->unique()->filter()->all();

            if (!empty($categoriasDeInteres)) {
                $comicsRecomendados = Comic::with(['autors', 'categorias'])
                    ->whereNotIn('id', $comicsEnColeccionIds)
                    ->whereHas('categorias', function ($query) use ($categoriasDeInteres) {
                        $query->whereIn('categoria_id', $categoriasDeInteres);
                    })
                    ->inRandomOrder()
                    ->take(7)
                    ->get();
            }
        }

        if ($comicsRecomendados->isEmpty()) {
            $comicsRecomendados = Comic::with(['autors', 'categorias'])
                ->whereNotIn('id', $comicsEnColeccionIds)
                ->inRandomOrder()
                ->take(7)
                ->get();
        }
        
        return Inertia::render('coleccions/show', [
            'coleccion' => $coleccion->load('comics'),
            'comicsColeccion' => $comicsColeccion,
            'comicsDisponible' => $comicsDisponible,
            'comicsRecomendados' => $comicsRecomendados
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
            'imagen' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('imagen')) {
            if ($coleccion->imagen) {
                Storage::disk('public')->delete($coleccion->imagen);
            }
            $path = $request->file('imagen')->store('coleccion_images', 'public');
            $validated['imagen'] = $path;
        }

        $coleccion->update($validated);

        return redirect()->route('coleccions.index')->with('success', 'Colección actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Coleccion $coleccion)
    {
        if ($coleccion->imagen) {
            Storage::disk('public')->delete($coleccion->imagen);
        }
        $coleccion->delete();
        return back()->with('success', 'Colección Talkada exitosamente.');
    }

    public function anadirComicAColeccion(Request $request, Coleccion $coleccion, Comic $comic)
    {
        $coleccion->comics()->syncWithoutDetaching($comic->id);

        /** @var \Illuminate\Database\Query\Builder $queryBuilder */
        $queryBuilder = DB::table('suscripciones');
        $userIds = $queryBuilder
            ->where('subscribable_type', '=', 'App\Models\Coleccion')
            ->where('subscribable_id', '=', $coleccion->id)
            ->pluck('user_id')
            ->all();

        $usuarios = \App\Models\User::query()->whereIn('id', $userIds)->get();
        foreach ($usuarios as $usuario) {
            $cacheKey = "notificado_user_{$usuario->id}_comic_{$comic->id}";

            if (!Cache::has($cacheKey)) {
                Cache::put($cacheKey, true, now()->addDays(7));
                /** @var \Illuminate\Mail\PendingMail $mailer */
                $mailer = Mail::to($usuario->email);
                $mailer->queue(new \App\Mail\NuevoComicNotification($comic, "Colección: " . $coleccion->nombre));
            }
        }

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
        
        Coleccion::query()->where('orden', '=', $request->orden)
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

    public function coleccionAlDestacados(Request $request, Coleccion $coleccion)
    {
        $request->validate([
            'posicion' => 'required|integer|between:1,3' 
        ]);
        
        Coleccion::query()->where('posicion_destacado', '=', $request->posicion)
            ->update(['posicion_destacado' => null, 'es_destacado' => false]);

        $coleccion->update([
            'es_destacado' => true,
            'posicion_destacado' => $request->posicion
        ]);

        return back()->with('success', 'Colección marcada como destacada exitosamente.');
    }

    public function quitarColeccionDeDestacados(Request $request, Coleccion $coleccion)
    {
        $coleccion->update([
            'es_destacado' => false,
            'posicion_destacado' => null
        ]);

        return back()->with('success', 'Colección desmarcada como destacada exitosamente.');
    }
}