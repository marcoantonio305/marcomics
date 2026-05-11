<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\ResetPasswordCustom;
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
        'rol_id',
        'biografia',
        'foto_perfil',
        'nombre',
        'apellido1',
        'apellido2',
        'dni',
        'direccion',
        'stripe_id',
        'pm_id',
        'tarjeta_4_ultimos'
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
        return $this->hasManyThrough(
        Compra::class, 
        HistorialCompra::class, 
        'user_id',   
        'id',        
        'id',        
        'compra_id'  
    );
    }
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordCustom($token));
    }
}
