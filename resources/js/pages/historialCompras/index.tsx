import React from 'react';
import { Link, router } from '@inertiajs/react';
import appLayout from '@/layouts/app-layout';
import AppLayout from '@/layouts/app-layout';

interface HistorialCompra {
    id: number;
    user_id: number;
    compra_id: number;
    created_at: string;
    user?: User;
    compra?: Compra;
}

interface PivotCompra {
    cantidad: number;
    precio_unitario: number;
}

interface Comic {
    id: number;
    titulo: string;
    precio: number;
    pivot: PivotCompra; 
}

interface Compra {
    id: number;
    total: number;
    created_at: string;
    comics?: Comic[]; 
}

interface User {
    id: number;
    name: string
}

interface Props {
    historialCompras: HistorialCompra[];
    users: User[];
    compras: Compra[];
}

export default function Index({ historialCompras, users, compras }: Props) {
    return (
        <AppLayout>
            <div className="div-8">
                <h1 className="text-4xl font-bold mb-6 text-green-700 mt-5 ml-5">Lista de historiales de compras</h1>
                <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="overflow-x-auto">
                        {users.map((user) => {
                            const comprasDelUsuario = historialCompras.filter(h => h.user_id === user.id);

                            return (
                                <div key={user.id} className="mb-10">
                                    <h1 className='text-red-600 p-4 text-2xl border-2 border-gray-500 font-bold w-fit ml-5 mt-5 rounded-lg mb-3'>
                                        {user.name}
                                    </h1>

                                    {comprasDelUsuario.length > 0 ? (
                                        <table className="table w-full border border-black ml-5">
                                            <thead>
                                                <tr className='text-blue-700 bg-blue-100'>
                                                    <th>ID Compra</th>
                                                    <th>Cantidad total productos</th> 
                                                    <th>Total Gasto</th>
                                                    <th>Fecha</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {comprasDelUsuario.map((historial) => {
                                                    const cantidadTotal = historial.compra?.comics?.reduce((acc, comic) => {
                                                        return acc + (comic.pivot?.cantidad || 0);
                                                    }, 0) || 0;

                                                    return (
                                                        <tr key={historial.id}>
                                                            <td>{historial.compra_id}</td>
                                                            <td className="font-semibold text-center">
                                                                <span className="badge badge-ghost">{cantidadTotal}</span>
                                                            </td>
                                                            <td>{historial.compra ? `${Number(historial.compra.total).toFixed(2)}€` : 'N/A'}</td>
                                                            <td>{historial.compra ? new Date(historial.compra.created_at).toLocaleDateString() : 'N/A'}</td>
                                                            <td>
                                                                <Link href={`/compras/${historial.compra_id}`} className="btn btn-sm bg-yellow-600 hover:bg-yellow-700 text-white">
                                                                    Detalles
                                                                </Link>
                                                                <Link 
                                                                    href={`/historialCompras/${historial.id}`} 
                                                                    method="delete" 
                                                                    as="button" 
                                                                    className="btn btn-sm bg-red-600 hover:bg-red-800 text-white ml-3"
                                                                >
                                                                    Eliminar
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="ml-8 p-4 bg-gray-100 rounded-lg w-fit text-gray-600 italic">
                                            El usuario no ha realizado ninguna compra aún.
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}