<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('users/index', [
            'users' => User::withTrashed()->with('rol')->get(),
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
    public function show(User $user)
{
    $usuario = Auth::user();
    $esAdmin = $usuario->rol_id == 1;
    $esDueño = $usuario->id === $user->id;

    if ($esAdmin || $esDueño) {
        $user->load(['compras' => function($query) {
            $query->latest(); 
        }]);
    }

    // Obtenemos las suscripciones directamente desde la tabla
    $suscripciones = DB::table('suscripciones')
        ->where('user_id', $user->id)
        ->get()
        ->map(function ($suscripcion) {
            // Resolvemos la entidad usando su respectiva clase de modelo directamente
            $claseModelo = $suscripcion->subscribable_type;
            
            // Si la clase existe, buscamos el registro correspondiente
            $suscripcion->subscribable = class_exists($claseModelo) 
                ? $claseModelo::find($suscripcion->subscribable_id) 
                : null;
                
            return $suscripcion;
        });

    return Inertia::render('users/show', [
    'user' => $user->load('comics'), 
    'compras' => ($esAdmin || $esDueño) ? $user->compras : [],
    'esAdmin' => $esAdmin,
    'suscripciones' => $suscripciones
]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        if (Auth::id() != $id) {
            abort(403, 'No tienes permiso para editar este usuario.');
        }

        return Inertia::render('users/edit', [
            'user' => User::findOrFail($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        if (Auth::id() != $id) {
            abort(403, 'No tienes permiso para editar este usuario.');
        }

        $data = $request->validate([
            'name' => 'required|string|max:255|unique:users,name,' . $user->id,  //Para que le deje cambiar su nombre de usuario sin que le diga que ya existe',
            'biografia' => 'nullable|string',
            'foto_perfil' => 'nullable|image|max:2048',
            'nombre' => 'required|string|max:255',
            'apellido1' => 'required|string|max:255',
            'apellido2' => 'nullable|string|max:255',
            'direccion' => 'required|string|max:255'
        ]);

        if ($request->hasFile('foto_perfil')) {
            if ($user->foto_perfil) {
                Storage::disk('public')->delete($user->foto_perfil);
            }
            $path = $request->file('foto_perfil')->store('fotos_perfil', 'public');
            $data['foto_perfil'] = $path;
        }

        $user->update($data);

        return redirect()->route('user.show', $user)->with('success', 'Perfil actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        if (Auth::user()->rol_id != 1) {
            abort(403, 'No tienes permiso para eliminar este usuario.');
        }

        if (Auth::id() == $id) {
            abort(403, 'No puedes eliminar tu propia cuenta.');
        }

        if ($user->foto_perfil) {
            Storage::disk('public')->delete($user->foto_perfil);
        }

        $user->delete();

        return redirect()->back()->with('success', 'Cuenta eliminada correctamente.');
    }

    public function restore(string $id)
{
    $user = User::onlyTrashed()->findOrFail($id);

    if (Auth::user()->rol_id != 1) {
        abort(403, 'No tienes permiso para restaurar este usuario.');
    }

    $user->restore(); 

    return redirect()->back()->with('success', 'Usuario reactivado correctamente.');
}

public function modificarRol(Request $request, string $id)
{

    if (Auth::user()->rol_id != 1) {
        abort(403, 'No tienes permiso para modificar el rol de este usuario.');
    }

    $user = User::withTrashed()->findOrFail($id);

    $request->validate([
        'rol_id' => 'required|in:2,3',
    ]);

    $user->update([
        'rol_id' => $request->rol_id,
    ]);

    $nombreRol = $request->rol_id == 2 ? 'Vendedor' : 'Usuario';

    return redirect()->back()->with('success', 'Rol modificado correctamente.');
}

}