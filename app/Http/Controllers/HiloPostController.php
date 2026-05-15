<?php

namespace App\Http\Controllers;

use App\Models\HiloPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HiloPostController extends Controller
{
    public function store(Request $request)
{
    $request->validate(['mensaje' => 'required', 'hilo_id' => 'required']);

    HiloPost::create([
        'mensaje' => $request->mensaje,
        'hilo_id' => $request->hilo_id,
        'user_id' => Auth::id(),
    ]);

    return back();
}

    public function destroy(HiloPost $hiloPost)
{
    if (Auth::id() !== $hiloPost->user_id && Auth::user()->rol_id !== 1) {
        return back()->with('error', 'No tienes permisos para eliminar este mensaje.');
    }

    $hiloPost->delete();
    return back()->with('success', 'Mensaje eliminado.');
}
}