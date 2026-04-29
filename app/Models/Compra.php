<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Compra extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'total',
    ];

    public function comics() {
        return $this->belongsToMany(Comic::class, 'comic_compra')->withPivot('cantidad', 'precio_unitario')->withTimestamps();
    }

    public function historialCompra()
{
    return $this->hasOne(HistorialCompra::class, 'compra_id');
}

    public function users() {
        return $this->belongsToMany(User::class, 'historial_compras', 'compra_id', 'user_id')->withTimestamps();
    }
}
