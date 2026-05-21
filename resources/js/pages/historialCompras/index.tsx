import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import appLayout from '@/layouts/app-layout';
import AppLayout from '@/layouts/app-layout';
import { BotonBase } from '@/components/ui/Cuerpo/BotonBase';

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

                        <div className="lg:col-span-3 flex gap-6 justify-end">
                            <BotonBase
                                onClick={handleFilter}
                                texto="Filtrar Resultados"
                                colorFondo="bg-purple-600"
                                hoverFondo="hover:bg-white"
                                colorTexto="text-white"
                                hoverTexto="hover:text-purple-600"
                                borderClass="border-3 border-purple-700"
                                tamano="md"
                                className="!w-auto px-8"
                            />
                            <BotonBase
                                onClick={handleReset}
                                texto="Limpiar Filtros"
                                colorFondo="bg-gray-200"
                                hoverFondo="hover:bg-gray-700"
                                colorTexto="text-gray-700"
                                hoverTexto="hover:text-gray-300"
                                borderClass="border-3 border-gray-300"
                                tamano="md"
                                className="!w-auto px-6"
                            />
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
                                                            <div className="flex items-center gap-2">
                                                                <BotonBase
                                                                    onClick={() => router.visit(`/compras/${historial.compra_id}`)}
                                                                    texto="Detalles"
                                                                    colorFondo="bg-yellow-600"
                                                                    hoverFondo="hover:bg-white"
                                                                    colorTexto="text-white"
                                                                    hoverTexto="hover:text-yellow-600"
                                                                    borderClass="border-3 border-yellow-700"
                                                                    tamano="xs"
                                                                    className="py-1 px-3 text-xs !w-auto !h-auto"
                                                                />
                                                                <BotonBase
                                                                    onClick={() => {
                                                                        if (confirm('¿Estás seguro de que deseas eliminar este historial?')) {
                                                                            router.delete(`/historialCompras/${historial.id}`);
                                                                        }
                                                                    }}
                                                                    texto="Eliminar"
                                                                    colorFondo="bg-red-600"
                                                                    hoverFondo="hover:bg-white"
                                                                    colorTexto="text-white"
                                                                    hoverTexto="hover:text-red-600"
                                                                    borderClass="border-3 border-red-700"
                                                                    tamano="xs"
                                                                    className="py-1 px-3 text-xs !w-auto !h-auto"
                                                                />
                                                                <a 
                                                                    href={`/compras/${historial.compra_id}/pdf`}
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="font-bold rounded transition-all duration-200 transform hover:scale-110 border-3 flex items-center justify-center text-xs py-1 px-3 !w-auto !h-auto bg-red-800 text-white hover:bg-white hover:text-red-800 border-red-900 shadow-sm"
                                                                >
                                                                    <div className="flex items-center justify-center gap-2 w-full h-full">
                                                                        <span>Generar PDF</span>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            
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