<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('users/index', [
            'users' => User::with('rol')->get(),
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
        $user->load(['comics', 'rol']);
        return Inertia::render('users/show', [
            'user' => $user,
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
            'name' => 'required|string|max:255',
            'biografia' => 'nullable|string',
            'foto_perfil' => 'nullable|image|max:2048',
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

        return redirect()->route('inicio')->with('success', 'Cuenta eliminada correctamente.');
    }
}
