<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Autor extends Model
{
    protected $fillable = [
        'nombre',
    ];
    public function comics() {
        return $this->belongsToMany(Comic::class);
    }

}
