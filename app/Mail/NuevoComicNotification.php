<?php

namespace App\Mail;

use App\Models\Comic;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NuevoComicNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $comic;
    public $nombreItem;

    /**
     * Recibe el cómic y la etiqueta
     */
    public function __construct(Comic $comic, string $nombreItem)
    {
        $this->comic = $comic;
        $this->nombreItem = $nombreItem;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '¡Novedad en tu suscripción: ' . $this->comic->titulo . '!',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.nuevo_comic', 
        );
    }
}