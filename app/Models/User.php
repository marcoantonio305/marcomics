<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use SoftDeletes;
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'biografia',
        'foto_perfil'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function comics() {
        return $this->belongsToMany(Comic::class);
    }

    public function comentarios() {
        return $this->hasMany(Comentario::class);
    }

    public function rol() {
        return $this->belongsTo(Rol::class);
    }
    
    public function historialCompra() {
        return $this->hasOne(HistorialCompra::class);
    }
    
    public function postChats()
    {
        return $this->hasMany(PostChat::class);
    }

    public function compras() {
        return $this->belongsToMany(Compra::class, 'historial_compras', 'user_id', 'compra_id')->withTimestamps();
    }
}
