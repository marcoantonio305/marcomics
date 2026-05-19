<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'categorias' => \App\Models\Categoria::all(), //coge todas las categorías de la base de datos y lo envia al frontend de React, permitiendo que se pueda usar en el usePage().prop que pusimos en el layout
            'auth' => [
                'user' => $request->user(),
            ],
            // Mensajes de notificaciones
            'flash' => [
    'success' => fn () => $request->session()->get('success'),
    'error' => fn () => $request->session()->get('error'),
],
'carrito' => $request->session()->get('carrito', []),
'carritoTotal' => number_format(collect($request->session()->get('carrito', []))->sum(function($item) {
            return $item['precio'] * $item['cantidad'];
        }), 2),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
