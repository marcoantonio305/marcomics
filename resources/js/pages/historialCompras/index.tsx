import React from 'react';
import { Link, router } from '@inertiajs/react';
import appLayout from '@/layouts/app-layout';
import AppLayout from '@/layouts/app-layout';

interface HistorialCompra {
    id: number;
    user_id: number;
    compra_id: number;
    user?: User;
    compra?: Compra;
}

interface Compra {
    id: number;
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

export default function Index({ historialCompras}: Props) {
    return (
            <AppLayout>
        <div className="div-8">
                <h1 className="text-4xl font-bold mb-6 text-primary">Lista de historiales de compras</h1>
            <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
    
                            <thead>
                                <tr className="text-secondary text-sm">
                                    <th>ID Historia Compra</th>
                                    <th>ID Usuario</th>
                                    <th>ID Compra</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>
    
                            <tbody>
                                {historialCompras.length > 0 ? (
                                    historialCompras.map((hisCom) => (
                                        <tr key={hisCom.id} className="hover">
                                            <td className="font-bold"><Link href={`/historialCompras/${hisCom}`} className="link link-primary no-underline hover:underline transition-colors"></Link></td>
                                            <td className="font-mono">{hisCom.id}€</td>
                                            <td>{hisCom.user?.name}</td>
                                            <td>{hisCom.compra?.id}</td>
                                            <td className="text-center">
                                                <div className="flex justify-center gap-2">
                                                    <Link href={`/historialCompras/${hisCom}/edit`} className="btn btn-ghost btn-xs text-info">Editar</Link>
                                                    <button onClick={()=> {
                                                        if (confirm('¿Estás seguro de querer eliminar este cómic?')) {
                                                            router.delete(`/historialCompras/${hisCom}`)
                                                        }
                                                    }} className="btn btn-ghost btn-xs text-error">Eliminar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="text-center py-10 text-gray-400">
                                            No hay ningúnhistorial de compras registrados actualmente.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            <div>
                <Link href="/historialCompras/create" className='btn btn-primary'>
                Añadir Cómic
                </Link>
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