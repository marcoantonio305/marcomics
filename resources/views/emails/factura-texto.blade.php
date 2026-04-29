<h1>¡Gracias por tu compra en Marcómics!</h1>
<p>Hola {{ $compra->historialCompra->user->name }}, adjunto encontrarás la factura de tu pedido.</p>
<p>Total pagado: ${{ number_format($compra->total, 2) }}</p>