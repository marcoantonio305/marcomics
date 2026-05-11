<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordCustom extends Notification
{
    use Queueable;
    public $token;

    /**
     * Create a new notification instance.
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
{
    $url = url(config('app.url').route('password.reset', [
        'token' => $this->token,
        'email' => $notifiable->getEmailForPasswordReset(),
    ], false));

    return (new \Illuminate\Notifications\Messages\MailMessage)
        ->subject('Restablecer contraseña - ' . config('app.name'))
        ->greeting('Hola, ' . ($notifiable->nombre ?? 'usuario') . '.')
        ->line('Se te ha mandado este correo porque solicitaste un cambio de contraseña para tu cuenta.')
        ->action('Cambiar mi contraseña', $url)
        ->line('En caso de que no haya sido tú el que ha solicitado el cambio de contraseña, simplemente ignora este correo.')
        ->salutation('Tenga un buen día de parte de Marcómics.');
}


    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
