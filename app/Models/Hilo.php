<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Hilo extends Model
{
    protected $table = 'hilos'; 
    protected $fillable = ['titulo', 'contenido', 'user_id'];


    public function posts(): HasMany
    {
        return $this->hasMany(HiloPost::class, 'hilo_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
