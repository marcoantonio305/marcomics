<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Comic extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'titulo',
        'precio',
        'lanzamiento',
        'descripcion',
        'editora_id',
        'imagen',
        'codigo_comic',
        'stock',
        'preview1',
        'preview2'
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

    public function coleccions() {
        return $this->belongsToMany(Coleccion::class, 'coleccion_comic');
    }

    protected static function booted()
    {
        static::creating(function ($comic) {
            $nuevoCodigo = '';
            $existe = true;

            while ($existe) {
                $p1 = strtoupper(Str::random(4));
                $p2 = strtoupper(Str::random(2));
                $nuevoCodigo = "{$p1}-{$p2}";

                $existe = \App\Models\Comic::query()->where('codigo_comic', $nuevoCodigo)->exists();
            }

            $comic->codigo_comic = $nuevoCodigo;
        });
    }
}
