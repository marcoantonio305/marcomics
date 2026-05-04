<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Factura #{{ $compra->id }}</title>
    <style>
        body { font-family: sans-serif; font-size: 14px; }
        .header { text-align: center; color: #be185d; margin-bottom: 30px; } 
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid black; padding: 10px; text-align: center; }
        .total-row { background-color: #fce7f3; font-weight: bold; }
        .text-blue { color: #1d4ed8; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Factura de Compra</h1>
    </div>

    <div style="margin-bottom: 20px;">
        <p><strong>Cliente:</strong> {{ $compra->historialCompra->user->nombre }} {{ $compra->historialCompra->user->apellido1 }} {{ $compra->historialCompra->user->apellido2 }}</p>
        <p><strong>DNI:</strong> {{ $compra->historialCompra->user->dni }}</p>
        <p><strong>Dirección:</strong> {{ $compra->historialCompra->user->direccion }}</p>
        <p><strong>Fecha:</strong> {{ $compra->created_at->format('d/m/Y H:i') }}</p>
    </div>

    <table>
        <thead>
            <tr style="background-color: #e9d5ff;">
                <th>Título</th>
                <th>Precio Unit.</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($compra->comics as $comic)
            <tr>
                <td style="text-align: left;" class="text-blue">{{ $comic->titulo }}</td>
                <td>{{ number_format($comic->pivot->precio_unitario, 2) }}€</td>
                <td>{{ $comic->pivot->cantidad }}</td> 
                <td>{{ number_format($comic->pivot->precio_unitario * $comic->pivot->cantidad, 2) }}€</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3" style="text-align: right; padding-right: 15px;">Base Imponible:</td>
                <td>{{ number_format($baseImponible, 2) }}€</td>
            </tr>
            <tr>
                <td colspan="3" style="text-align: right; padding-right: 15px;">IVA (21%):</td>
                <td>{{ number_format($iva, 2) }}€</td>
            </tr>
            <tr class="total-row">
                <td colspan="3" style="text-align: right; padding-right: 15px;">Total a Pagar (IVA Incluido):</td>
                <td>{{ number_format($compra->total, 2) }}€</td>
            </tr>
        </tfoot>
    </table>
</body>
</html>