<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    public function comics() {
        return $this->belongsToMany(Comic::class);
    }

    public function historialCompra() {
        return $this->belongsTo(HistorialCompra::class);
    }
}
