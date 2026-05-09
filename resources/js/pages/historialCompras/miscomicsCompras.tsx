import React from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    name: string;
    email: string;
    foto_perfil?: string;
    biografia?: string;
    rol_id?: number;
    comics: Comic[];
}

interface Comic {
    id: number;
    titulo: string;
    precio: number;
    lanzamiento: string;
    descripcion: string;
    imagen: string;
    codigo_comic: string;
}

interface Compra {
    id: number;
    total: number;
    created_at: string;
    comics: ComicWithPivot[];
}

interface Pivot {
    compra_id: number;
    comic_id: number;
    cantidad: number;
    precio_unitario: number;
}

interface ComicWithPivot extends Comic {
    pivot: Pivot;
}

interface Props {
    compras: Compra[];
    user: User;
    esAdmin: boolean;
}

export default function miscomicsCompras({ user, compras, esAdmin }: {user: User, compras: Compra[], esAdmin: boolean}) {
    const { auth } = usePage().props as any;

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                {(auth.user?.id === user.id || esAdmin) && (
                    <div className="space-y-8">
                        <h2 className="text-3xl font-extrabold text-pink-700 border-b-2 border-pink-100 pb-4">
                            Mi Historial de Compras
                        </h2>

                        {compras.map((compra) => (
                            <div key={compra.id} className="bg-white overflow-hidden shadow-xl sm:rounded-lg border border-gray-200">
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
                                            className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 transition ease-in-out duration-150"
                                        >
                                            Generar PDF
                                        </a>
                                    </div>
                                </div>

                                <div className="px-6 py-4">
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
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}