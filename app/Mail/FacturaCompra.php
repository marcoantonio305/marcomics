<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class FacturaCompra extends Mailable
{
    use Queueable, SerializesModels;

    public $compra;
    public $pdfContent;

    public function __construct($compra, $pdfContent)
    {
        $this->compra = $compra;
        $this->pdfContent = $pdfContent;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Tu factura de Marcómics - Compra #' . $this->compra->id,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.factura-texto', 
        );
    }

    public function attachments(): array
    {
        return [
            Attachment::fromData(fn () => $this->pdfContent, 'Factura_Marcomics_' . $this->compra->id . '.pdf')
                ->withMime('application/pdf'),
        ];
    }
}