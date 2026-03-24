<?php

// Se creó este archivo con el comando "php artisan make:event MessageSent"

namespace App\Events;

use App\Models\PostChat;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $postChat;

    public function __construct(PostChat $postChat)
    {
        $this->postChat = $postChat->load('user');
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('chat.' . $this->postChat->chat_id),
        ];
    }
    public function broadcastAs(): string
{
    return 'mensaje.enviado';
}
}
