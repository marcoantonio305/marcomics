<?php

//Este archivo se crea tras hacer php artisan install:broadcasting (se escogió Reverb)

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chat.{id}', function ($user, $id) {
    return Auth::check(); // Para que cualquier usuario pueda "escuchar" el chat
});

