<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Compra extends Model
{
    use SoftDeletes;
    public function comics() {
        return $this->belongsToMany(Comic::class);
    }

    public function historialCompra() {
        return $this->belongsTo(HistorialCompra::class);
    }
}
