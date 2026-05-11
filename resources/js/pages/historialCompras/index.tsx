import React, { useState } from 'react';
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
    allComics: { id: number; titulo: string }[];
    filters: any;
}

export default function Index({ historialCompras, users, compras, allComics, filters }: Props) {
    const [values, setValues] = useState({
        user_id: filters?.user_id || '',
        comic_id: filters?.comic_id || '',
        fecha_desde: filters?.fecha_desde || '',
        fecha_hasta: filters?.fecha_hasta || '',
        lanzamiento_desde: filters?.lanzamiento_desde || '',
        lanzamiento_hasta: filters?.lanzamiento_hasta || '',
    });

    function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleFilter() {
        router.get('/historialCompras', values, { preserveState: true, replace: true });
    }

    function handleReset() {
        setValues({ 
            user_id: '', 
            comic_id: '', 
            fecha_desde: '', 
            fecha_hasta: '', 
            lanzamiento_desde: '', 
            lanzamiento_hasta: '' 
        });
        router.get('/historialCompras');
    }

    return (
        <AppLayout>
            <div className="div-8">
                <h1 className="text-4xl font-bold mb-6 text-green-700 mt-5 ml-5">Lista de historiales de compras</h1>


                <div className="mx-5 mb-6 p-4 bg-violet-100 border-2 border-purple-500 rounded-xl shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                        <div>
                            <label className="block text-sm font-bold text-purple-800">Usuario / Cómic</label>
                            <div className="flex gap-2">
                                <select name="user_id" value={values.user_id} onChange={handleChange} className="select select-bordered w-full">
                                    <option value="">Todos los Usuarios</option>
                                    {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                                </select>
                                <select name="comic_id" value={values.comic_id} onChange={handleChange} className="select select-bordered w-full">
                                    <option value="">Todos los Cómics</option>
                                    {allComics?.map(c => <option key={c.id} value={c.id}>{c.titulo}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-purple-800">Rango Fecha Compra</label>
                            <div className="flex gap-2">
                                <input type="date" name="fecha_desde" value={values.fecha_desde} onChange={handleChange} className="input input-bordered w-full" title="Desde" />
                                <input type="date" name="fecha_hasta" value={values.fecha_hasta} onChange={handleChange} className="input input-bordered w-full" title="Hasta" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-purple-800">Rango Fecha Lanzamiento</label>
                            <div className="flex gap-2">
                                <input type="date" name="lanzamiento_desde" value={values.lanzamiento_desde} onChange={handleChange} className="input input-bordered w-full" />
                                <input type="date" name="lanzamiento_hasta" value={values.lanzamiento_hasta} onChange={handleChange} className="input input-bordered w-full" />
                            </div>
                        </div>

                        <div className="lg:col-span-3 flex gap-2 justify-end">
                            <button onClick={handleFilter} className="btn bg-purple-600 hover:bg-purple-700 text-white px-8 border-none">Filtrar Resultados</button>
                            <button onClick={handleReset} className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 border-none">Limpiar Filtros</button>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="overflow-x-auto">
                        {users.map((user) => {
                            const comprasDelUsuario = historialCompras.filter(h => h.user_id === user.id);

                            if (comprasDelUsuario.length === 0) return null;

                            return (
                                <div key={user.id} className="mb-10">
                                    <h1 className='text-red-600 p-4 text-2xl border-2 border-gray-500 font-bold w-fit ml-5 mt-5 rounded-lg mb-3'>
                                        {user.name}
                                    </h1>

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
                                                        <td>
                                                            <Link 
                                                                href={`/compras/${historial.compra_id}`}
                                                                className="text-blue-600 hover:underline font-bold"
                                                            >
                                                                #{historial.compra_id}
                                                            </Link>
                                                        </td>
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
                                                            <a 
        href={`/compras/${historial.compra_id}/pdf`}
        target="_blank" 
        rel="noopener noreferrer"
        className="btn btn-sm bg-red-800 hover:bg-red-900 text-white ml-3"
    >
        Generar PDF
    </a>
                                                            
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            );
                        })}
                        {historialCompras.length === 0 && (
                            <div className="p-10 text-center text-gray-500 italic text-xl">
                                No se han encontrado historiales que coincidan con los filtros.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}