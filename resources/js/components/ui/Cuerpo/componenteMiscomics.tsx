import React from 'react';

// Definimos las interfaces para que TypeScript no de errores
interface Comic {
    id: number;
    titulo: string;
    imagen: string;
    codigo_comic: string;
    precio: number;
    pivot: {
        cantidad: number;
        precio_unitario: number;
    };
}

interface Compra {
    id: number;
    total: number;
    created_at: string;
    comics?: Comic[];
}

interface Props {
    compra: Compra;
}

export default function ComponenteMiscomics({ compra }: Props) {
    return (
        <div className="w-full max-w-[90%] mx-auto bg-white overflow-hidden shadow-xl sm:rounded-lg border border-gray-200 mb-6">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-500 uppercase font-bold">Compra #{compra.id}</p>
                    <p className="text-lg font-semibold text-blue-800">
                        Fecha: {new Date(compra.created_at).toLocaleDateString()}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Total Pagado</p>
                    <p className="text-2xl font-bold text-green-600">{Number(compra.total).toFixed(2)}€</p>
                </div>
                <div className="ml-4">
                    <a 
                        href={`/compras/${compra.id}/pdf`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 transition ease-in-out duration-150"
                    >
                        Generar PDF
                    </a>
                </div>
            </div>

            <div className="px-6 py-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-blue-500 uppercase">Portada</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-blue-500 uppercase">Detalles</th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-blue-500 uppercase">Cantidad</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-blue-500 uppercase">Precio</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {compra.comics?.map((comic) => (
                                <tr key={comic.id}>
                                    <td className="px-4 py-3">
                                        <img 
                                            src={`/storage/${comic.imagen}`} 
                                            alt={comic.titulo} 
                                            className="w-16 h-24 object-cover rounded shadow-sm"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-sm font-bold text-gray-900">{comic.titulo}</div>
                                        <div className="text-xs text-gray-500">Cod: {comic.codigo_comic}</div>
                                        <div className="text-xs text-blue-600">{Number(comic.precio).toFixed(2)}€</div>
                                    </td>
                                    <td className="px-4 py-3 text-center text-sm text-gray-600">
                                        {comic.pivot.cantidad}
                                    </td>
                                    <td className="px-4 py-3 text-right text-sm font-bold text-gray-800">
                                        {(comic.pivot.cantidad * comic.pivot.precio_unitario).toFixed(2)}€
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}