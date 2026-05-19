<?php

namespace App\Http\Controllers;

use App\Models\Autor;
use App\Models\Categoria;
use App\Models\Comic;
use App\Models\Editora;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache; 
use Inertia\Inertia;
use App\Mail\NuevoComicNotification;

class ComicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $comics = Comic::query()
        ->when($search, function ($query, $search) {
            $query->where('titulo', 'ILIKE', "%{$search}%");
        })
                ->with(['categorias', 'autors', 'editora'])
                ->get();
        
        return Inertia::render('comics/index', [
            'comics' => $comics,
            'titulo' => $search ? 'Resultados para: ' . $search : 'Catálogo de cómics',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('comics/create', [
            'todos_los_autores' => Autor::all(),
        'todas_las_categorias' => Categoria::all(),
        'todas_las_editoras' => Editora::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|max:255',
            'precio' => 'required|numeric|min:0',
            'lanzamiento' => 'required|date',
            'descripcion' => 'required|max:2000',
            // validar que sean arrays si vamos a usar en sync
            'autors_ids' => 'array',
            'categorias_ids' => 'array',
            'editora_id' => 'nullable|exists:editoras,id', 
            'imagen' => 'required|image|max:2048',
            'preview1' => 'nullable|image|max:2048',
            'preview2' => 'nullable|image|max:2048',
        ]);


        if ($request->hasFile('imagen')) {
            $validated['imagen'] = $request->file('imagen')->store('images', 'public');
        }


        if ($request->hasFile('preview1')) {
            $validated['preview1'] = $request->file('preview1')->store('images', 'public');
        } else {
            unset($validated['preview1']); 
        }


        if ($request->hasFile('preview2')) {
            $validated['preview2'] = $request->file('preview2')->store('images', 'public');
        } else {
            unset($validated['preview2']);
        }

        /** @var Comic $comic */
        $comic = Comic::query()->create($validated);
        
        $cambiosCategorias = $comic->categorias()->sync($request->categorias_ids);
        $comic->autors()->sync($request->autors_ids);

        $userIdsParaNotificar = [];
        $razonesSuscripcion = [];

        $categoriasNuevas = isset($cambiosCategorias['attached']) ? (array)$cambiosCategorias['attached'] : [];
        foreach ($categoriasNuevas as $catId) {
            $categoria = Categoria::query()->where('id', '=', $catId)->first();
            if ($categoria instanceof Categoria) {
                $ids = DB::table('suscripciones')
                    ->where('subscribable_type', '=', 'App\Models\Categoria')
                    ->where('subscribable_id', '=', $catId)
                    ->pluck('user_id')
                    ->all();

                foreach ($ids as $id) {
                    $userIdsParaNotificar[] = $id;
                    $razonesSuscripcion[$id] = "Categoría: " . $categoria->nombre;
                }
            }
        }

        $comic->load('coleccions');
        foreach ($comic->coleccions as $coleccion) {
            $ids = DB::table('suscripciones')
                ->where('subscribable_type', '=', 'App\Models\Coleccion')
                ->where('subscribable_id', '=', $coleccion->id)
                ->pluck('user_id')
                ->all();

            foreach ($ids as $id) {
                $userIdsParaNotificar[] = $id;
                $razonesSuscripcion[$id] = "Colección: " . $coleccion->nombre;
            }
        }

        $userIdsUnicos = array_unique($userIdsParaNotificar);

        if (!empty($userIdsUnicos)) {
            $usuarios = \App\Models\User::query()->whereIn('id', $userIdsUnicos)->get();
            foreach ($usuarios as $usuario) {
                $cacheKey = "notificado_user_{$usuario->id}_comic_{$comic->id}";

                if (!Cache::has($cacheKey)) {
                    Cache::put($cacheKey, true, now()->addDays(7));
                    $textoOrigen = $razonesSuscripcion[$usuario->id] ?? 'Tus suscripciones';
                    /** @var \Illuminate\Mail\PendingMail $mailer */
                    $mailer = Mail::to($usuario->email);
                    $mailer->queue(new NuevoComicNotification($comic, $textoOrigen));
                }
            }
        }

        return redirect()->route('comics.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Comic $comic)
    {
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
                    ->where('id', '!=', $comic->id)
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
                ->where('id', '!=', $comic->id)
                ->inRandomOrder()
                ->take(7)
                ->get();
        }

        return Inertia::render('comics/show', [
            'comic' => $comic->load('categorias', 'autors', 'editora', 'coleccions'),
            'comentarios' => $comic->comentarios()->with('user')->get(),
            'comicsRecomendados' => $comicsRecomendados,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comic $comic)
    {
        return Inertia::render('comics/edit', [
            'comic' => $comic->load(['autors', 'categorias']),
            'todos_los_autores' => Autor::all(),
        'todas_las_categorias' => Categoria::all(),
        'todas_las_editoras' => Editora::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comic $comic)
    {
        $validated = $request->validate([
            'titulo' => 'required|max:255',
            'precio' => 'required|numeric|min:0',
            'lanzamiento' => 'required|date',
            'descripcion' => 'required|max:2000',
            'editora_id' => 'nullable|exists:editoras,id', // Cambiado a nullable
            'autors_ids' => 'array',
            'categorias_ids' => 'array',
            'imagen' => 'nullable|image|max:2048',
            'preview1' => 'nullable|image|max:2048',
            'preview2' => 'nullable|image|max:2048',
        ]);


        unset($validated['imagen'], $validated['preview1'], $validated['preview2']);


        if ($request->hasFile('imagen')) {
            if ($comic->imagen) {
                Storage::disk('public')->delete($comic->imagen);
            }
            $validated['imagen'] = $request->file('imagen')->store('images', 'public');
        }


        if ($request->hasFile('preview1')) {
            if ($comic->preview1) {
                Storage::disk('public')->delete($comic->preview1);
            }
            $validated['preview1'] = $request->file('preview1')->store('images', 'public');
        }


        if ($request->hasFile('preview2')) {
            if ($comic->preview2) {
                Storage::disk('public')->delete($comic->preview2);
            }
            $validated['preview2'] = $request->file('preview2')->store('images', 'public');
        }

        $comic->update($validated);

        $comic->autors()->sync($request->autors_ids);
        $cambiosCategorias = $comic->categorias()->sync($request->categorias_ids);

        $userIdsParaNotificar = [];
        $razonesSuscripcion = [];

        $categoriasNuevas = isset($cambiosCategorias['attached']) ? (array)$cambiosCategorias['attached'] : [];
        foreach ($categoriasNuevas as $catId) {
            $categoria = Categoria::query()->where('id', '=', $catId)->first();
            if ($categoria instanceof Categoria) {
                $ids = DB::table('suscripciones')
                    ->where('subscribable_type', '=', 'App\Models\Categoria')
                    ->where('subscribable_id', '=', $catId)
                    ->pluck('user_id')
                    ->all();

                foreach ($ids as $id) {
                    $userIdsParaNotificar[] = $id;
                    $razonesSuscripcion[$id] = "Categoría: " . $categoria->nombre;
                }
            }
        }

        $comic->load('coleccions');
        foreach ($comic->coleccions as $coleccion) {
            $ids = DB::table('suscripciones')
                ->where('subscribable_type', '=', 'App\Models\Coleccion')
                ->where('subscribable_id', '=', $coleccion->id)
                ->pluck('user_id')
                ->all();

            foreach ($ids as $id) {
                $userIdsParaNotificar[] = $id;
                $razonesSuscripcion[$id] = "Colección: " . $coleccion->nombre;
            }
        }

        $userIdsUnicos = array_unique($userIdsParaNotificar);

        if (!empty($userIdsUnicos)) {
            $usuarios = \App\Models\User::query()->whereIn('id', $userIdsUnicos)->get();
            foreach ($usuarios as $usuario) {
                $cacheKey = "notificado_user_{$usuario->id}_comic_{$comic->id}";

                if (!Cache::has($cacheKey)) {
                    Cache::put($cacheKey, true, now()->addDays(7));
                    $textoOrigen = $razonesSuscripcion[$usuario->id] ?? 'Tus suscripciones';
                    /** @var \Illuminate\Mail\PendingMail $mailer */
                    $mailer = Mail::to($usuario->email);
                    $mailer->queue(new NuevoComicNotification($comic, $textoOrigen));
                }
            }
        }

        return redirect()->route('comics.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comic $comic)
    {
        //$comic->comentarios()->delete();
        
        //$comic->autors()->detach();
    //$comic->categorias()->detach();

    //if ($comic->imagen) {
        //\Illuminate\Support\Facades\Storage::disk('public')->delete($comic->imagen);
    //}
    
        $comic->delete();
        return redirect()->route('comics.index');
    }


    public function buscador(Request $request)
    {
        $term = $request->input('term');

        if (!$term || strlen($term) < 2) {
        return response()->json(['comics' => [], 'categorias' => []]);
    }

        $comics = Comic::query()->where('titulo', 'ILIKE', "%{$term}%")
            ->limit(7)
            ->get(['id', 'imagen', 'titulo']);

        $categorias = Categoria::query()->where('nombre', 'ILIKE', "%{$term}%")
            ->limit(3)
            ->get(['id', 'nombre', 'imagen']);

        return response()->json([
            'comics' => $comics,
            'categorias' => $categorias
        ]);
    }

    public function anadirStock(Request $request, Comic $comic)
    {
        $validated = $request->validate([
            'stock' => 'required|integer|min:1'
        ]);

        $comic->increment('stock', $validated['stock']);

        return redirect()->route('comics.index');
    }

    public function suscribir(Request $request)
    {
        $validated = $request->validate([
            'subscribable_type' => 'required|string',
            'subscribable_id' => 'required|integer',
        ]);

        /** @var \Illuminate\Database\Query\Builder $queryBuilder */
        $queryBuilder = DB::table('suscripciones');
        $queryBuilder->updateOrInsert(
            [
                'user_id' => Auth::id(),
                'subscribable_type' => $validated['subscribable_type'],
                'subscribable_id' => $validated['subscribable_id'],
            ],
            [
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );


        return back()->with('success', '¡Te has suscrito con éxito!');
    }

    public function desuscribir(Request $request)
    {
        $validated = $request->validate([
            'subscribable_type' => 'required|string',
            'subscribable_id'   => 'required|integer',
        ]);

        DB::table('suscripciones')
            ->where('user_id', Auth::id())
            ->where('subscribable_type', $validated['subscribable_type'])
            ->where('subscribable_id', $validated['subscribable_id'])
            ->delete();

        return redirect()->back();
    }

    public function buscadorExtenso(Request $request)
    {
        $search = $request->input('search');
        $categoriasIds = $request->input('categorias_ids', []);
        $fechaInicio = $request->input('fecha_inicio');
        $fechaFin = $request->input('fecha_fin');

        $comics = Comic::query()
            ->with(['categorias', 'autors', 'editora'])
            ->when($search, function ($query, $search) {
                $query->where('titulo', 'ILIKE', "%{$search}%");
            })
            ->when(!empty($categoriasIds), function ($query) use ($categoriasIds) {
                $query->whereHas('categorias', function ($q) use ($categoriasIds) {
                    $q->whereIn('categoria_id', $categoriasIds);
                });
            })
            ->when($fechaInicio, function ($query, $fechaInicio) {
                $query->where('lanzamiento', '>=', $fechaInicio);
            })
            ->when($fechaFin, function ($query, $fechaFin) {
                $query->where('lanzamiento', '<=', $fechaFin);
            })
            ->get();

        return Inertia::render('buscar', [
            'comics' => $comics,
            'todas_las_categorias' => Categoria::all(),
            'filtros' => [
                'search' => $search ?? '',
                'categorias_ids' => array_map('intval', $categoriasIds),
                'fecha_inicio' => $fechaInicio ?? '',
                'fecha_fin' => $fechaFin ?? '',
            ]
        ]);
    }
}