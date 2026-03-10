<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistorialCompra extends Model
{

protected $fillable = [
        'user_id',
        'compra_id',
    ];
        public function compras() {
        return $this->hasMany(Compra::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
