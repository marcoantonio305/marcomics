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

interface Compra {
    id: number;
    total: number;
    created_at: string;
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
                <h1 className="text-4xl font-bold mb-6 text-primary">Lista de historiales de compras</h1>
            <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="overflow-x-auto">
                        {users.map((user) => (
                            <div key={user.id}>
                                <h1 className='bg-blue-700 text-white p-4 text-xl w-fit ml-5 mt-5 rounded mb-3'> {user.name} </h1>
                                <table className="table w-full border border-black">
                                    <thead>
                                        <tr className='text-pink-700 bg-pink-200'>
                                            <th>ID Compras</th>
                                            <th>Gasto</th>
                                            <th>Fecha de compra</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                            {historialCompras.filter(historial => historial.user_id === user.id).map((historial) => (
                                                <tr key={historial.id}>
                                                    <td>{historial.compra_id}</td>
                                                    <td>{historial.compra ? historial.compra.total : 'N/A'}</td>
                                                    <td>{historial.compra ? new Date(historial.compra.created_at).toLocaleDateString() : 'N/A'}</td>
                                                    <td>
                                                        <Link href={`/compras/${historial.compra_id}`} className="btn btn-primary">
                                                            Ver detalles
                                                        </Link>
                                                        <Link href={`/historialCompras/${historial.compra_id}/destroy`} className="btn btn-secondary ml-2">
                                                            Eliminar
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            
            <div className="mt-4">
                            <Link href="dashboard" className="btn btn-success">
                                Volver al dashboard
                            </Link>
                        </div>
        </div>
        </AppLayout>
        );
}