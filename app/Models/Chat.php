<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $fillable = ['nombre_clave', 'nombre'];

    public function postChats()
    {
        return $this->hasMany(PostChat::class);
    }
}
