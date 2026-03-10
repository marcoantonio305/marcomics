<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comic extends Model
{
    protected $fillable = [
        'titulo',
        'precio',
        'lanzamiento',
        'descripcion',
        'editora_id',
        'imagen',
    ];

    //protected $casts = [
    //    'lanzamiento' => 'datetime',
    //];

    public function categorias() {
        return $this->belongsToMany(Categoria::class);
    }

    public function comentarios() {
        return $this->hasMany(Comentario::class);
    }

    public function users() {
        return $this->belongsToMany(User::class);
    }

    public function editora() {
        return $this->belongsTo(Editora::class);
    }

    public function autors() {
        return $this->belongsToMany(Autor::class);
    }

    public function compras() {
        return $this->belongsToMany(Compra::class);
    }
}
