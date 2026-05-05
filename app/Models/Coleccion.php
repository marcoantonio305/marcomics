<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Coleccion extends Model
{
    use SoftDeletes;
    protected $fillable = ['nombre', 'mostrar_inicio', 'orden', 'imagen', 'es_destacado', 'posicion_destacado'];

    public function comics()
    {
        return $this->belongsToMany(Comic::class, 'coleccion_comic');
    }
}
