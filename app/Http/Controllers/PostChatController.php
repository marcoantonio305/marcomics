<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Chat;
use App\Models\PostChat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $chat = Chat::where('nombre_clave', 'general')->first();

        if (!$chat) {
        $chat = Chat::create(['nombre_clave' => 'general', 'nombre' => 'Chat General']);
    }

        $postChats = PostChat::with('user') 
            ->where('chat_id', $chat->id)
            ->latest() 
            ->take(10) 
            ->get()
            ->reverse() 
            ->values();

return Inertia::render('inicio', [
            'chat' => $chat,
            'postChats' => $postChats,
            'categorias' => \App\Models\Categoria::all(), 
        'comics' => \App\Models\Comic::with(['categorias', 'autors'])->latest()->take(12)->get(), 
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
        $validated = $request->validate([
            'mensaje' => 'required|max:2000',
            'chat_id' => 'required|exists:chats,id',
            'mencionado_id' => 'nullable|exists:users,id'
        ]);

        $postChat = PostChat::create([
            'user_id' => Auth::user()->id,
            'chat_id' => $validated['chat_id'],
            'mensaje' => $validated['mensaje'],
            'mencionado_id' => $validated['mencionado_id'] ?? null
        ]);

        broadcast(new MessageSent($postChat)); //Dispara el evento de MessageSent

        return back()->with('success', 'Mensaje enviado.');
    }

    /**
     * Display the specified resource.
     */
    public function show(PostChat $postChat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PostChat $postChat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PostChat $postChat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PostChat $postChat)
    {
        //
    }
}
