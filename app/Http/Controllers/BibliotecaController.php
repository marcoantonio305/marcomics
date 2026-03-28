<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BibliotecaController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'comic_id' => 'required|exists:comics,id',
        ]);

        $user = Auth::user();

        $user->comics()->syncWithoutDetaching([$request->comic_id]);

        return back()->with('success', 'Cómic agregado a tu biblioteca');
    }

    public function destroy(Request $request)
    {
        Auth::user()->comics()->detach($request->comic_id);
        
        return back()->with('success', 'Cómic eliminado de tu biblioteca');
    }
}
