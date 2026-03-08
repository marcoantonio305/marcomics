import React from 'react';
import { Link, router } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';

interface Autor {
    id: number;
    nombre: string;
}

interface Categoria {
    id: number;
    nombre: string;
}

interface Comic {
    id: number;
    titulo: string;
    precio: number;
    lanzamiento: string;
    descripcion: string;
    autors: Autor[];
    categorias: Categoria[];
}

interface Props {
    comics: Comic[];
    titulo: string;
}

export default function Index({ comics, titulo} : Props) {
    return (
        <AppLayout>
    <div className="div-8">
            <h1 className="text-4xl font-bold mb-6 text-primary">{titulo}</h1>
        <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">

                        <thead>
                            <tr className="text-secondary text-sm">
                                <th>Título</th>
                                <th>Precio</th>
                                <th>Lanzamiento</th>
                                <th>Descripción</th>
                                <th>Autores</th>
                                <th>Categorías</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {comics.length > 0 ? (
                                comics.map((comic) => (
                                    <tr key={comic.id} className="hover">
                                        <td className="font-bold"><Link href={`/comics/${comic.id}`} className="link link-primary no-underline hover:underline transition-colors">{comic.titulo}</Link></td>
                                        <td className="font-mono">{comic.precio}€</td>
                                        <td>{new Date(comic.lanzamiento).toLocaleDateString()}</td>
                                        <td className="max-w-xs truncate">{comic.descripcion}</td>
                                        <td>
    <div className='flex flex-wrap gap-1'>
        {comic.autors && comic.autors.length > 0 ? (
            comic.autors.map((autor) => (
                <span key={autor.id} className='badge badge-ghost badge-sm'>
                    {autor.nombre}
                </span>
            ))
        ) : (
            <span className='text-gray-400 italic'>Anónimo</span>
        )}
    </div>
</td>
<td>
    <div className='flex flex-wrap gap-1'>
        {comic.categorias && comic.categorias.length > 0 ? (
            comic.categorias.map((categoria) => (
                <span key={categoria.id} className='badge badge-ghost badge-sm'>
                    {categoria.nombre}
                </span>
            ))
        ) : (
            <span className='text-gray-400 italic'>Ninguna</span>
        )}
    </div>
</td>
                                        <td className="text-center">
                                            <div className="flex justify-center gap-2">
                                                <Link href={`/comics/${comic.id}/edit`} className="btn btn-ghost btn-xs text-info">Editar</Link>
                                                <button onClick={()=> {
                                                    if (confirm('¿Estás seguro de querer eliminar este cómic?')) {
                                                        router.delete(`/comics/${comic.id}`)
                                                    }
                                                }} className="btn btn-ghost btn-xs text-error">Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-10 text-gray-400">
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
    </AppLayout>
    );
}