<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostChat extends Model
{
    protected $fillable = ['user_id', 'chat_id', 'mensaje', 'mencionado_id'];

    protected $table = 'post_chats';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function chat()
    {
        return $this->belongsTo(Chat::class);
    }
}
