import React from 'react';
import { Link } from '@inertiajs/react';

export default function Index({ comics, titulo}) {
    return (
    <div className="div-8">
            <h1 className="text-4xl font-bold mb-6 text-primary">{titulo}</h1>
        <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">

                        <thead>
                            <tr className="text-secondary text-sm">
                                <th>ID</th>
                                <th>Título</th>
                                <th>Precio</th>
                                <th>Lanzamiento</th>
                                <th>Descripción</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {comics.length > 0 ? (
                                comics.map((comic) => (
                                    <tr key={comic.id} className="hover">
                                        <th className="text-gray-500">{comic.id}</th>
                                        <td className="font-bold">{comic.titulo}</td>
                                        <td className="font-mono">{comic.precio}€</td>
                                        <td>{new Date(comic.lanzamiento).toLocaleDateString()}</td>
                                        <td className="max-w-xs truncate">{comic.descripcion}</td>
                                        <td className="text-center">
                                            <div className="flex justify-center gap-2">
                                                <button className="btn btn-ghost btn-xs text-info">Editar</button>
                                                <button className="btn btn-ghost btn-xs text-error">Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-10 text-gray-400">
                                        No hay cómics registrados actualmente.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        <div>
            <Link href="/comics/create" className='btn btn-primary'>
            Añadir Cómic
            </Link>
        </div>
    </div>
    );
}