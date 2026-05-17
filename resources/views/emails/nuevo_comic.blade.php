<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>¡Este comic te puede interesar!</title>
</head>
<body style="font-family: sans-serif; background-color: #f4f4f5; padding: 20px; color: #1f2937; margin: 0;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e5e7eb;">
        <h2 style="color: #2563eb; margin-top: 0;">¡Aumenta tu colección!</h2>
        <p>Hola,</p>
        <p>Se ha añadido un nuevo cómic a Marcomics que te puede interesar debido a que te has suscrito a: <strong>{{ $nombreItem }}</strong>.</p>
        
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        
        <div style="margin-bottom: 20px;">
            <h3 style="margin: 0 0 10px 0; color: #111827; font-size: 18px;">{{ $comic->titulo }}</h3>
            <p style="margin: 0 0 15px 0; font-size: 14px; color: #4b5563; line-height: 1.5;">{{ $comic->descripcion }}</p>
            <p style="margin: 0; font-weight: bold; color: #059669; font-size: 16px;">Precio: {{ $comic->precio }}€</p>
        </div>

        <div style="text-align: center; margin-top: 25px;">
            <a href="{{ url('/comics/' . $comic->id) }}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">Ver detalles del Cómic</a>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 25px 0;">
        <p style="font-size: 11px; color: #9ca3af; text-align: center; margin: 0;">Si no deseas recibir más notificaciones, puedes gestionar tus suscripciones desde tu perfil de usuario.</p>
    </div>
</body>
</html>