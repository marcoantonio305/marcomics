<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HiloPost extends Model
{
    protected $table = 'hilo_posts';
    protected $fillable = ['mensaje', 'hilo_id', 'user_id'];

    public function hilo(): BelongsTo
    {
        return $this->belongsTo(Hilo::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}