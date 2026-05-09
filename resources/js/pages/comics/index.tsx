import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';

interface Editora {
    id: number;
    nombre: string;
}

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
    editora?: Editora,
    stock: number,
    codigo_comic: string,
}

interface Props {
    comics: Comic[];
    titulo: string;
}

export default function Index({ comics, titulo} : Props) {
    const {auth} = usePage().props as any;
    return (
        <AppLayout>
    <div className="div-8">
            <h1 className="text-4xl font-bold mb-6 mt-5 ml-3 text-blue-600">{titulo}</h1>
        <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">

                        <thead>
                            <tr className="text-secondary text-sm">
                                <th>Título</th>
                                <th>Código</th>
                                <th>Precio</th>
                                <th>Lanzamiento</th>
                                <th>Editora</th>
                                <th>Autores</th>
                                <th>Categorías</th>
                                <th>Stock</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {comics.length > 0 ? (
                                comics.map((comic) => (
                                    <tr key={comic.id} className="hover">
                                        <td className="font-bold text-blue-700"><Link href={`/comics/${comic.id}`} className="link no-underline hover:underline transition-colors">{comic.titulo}</Link></td>
                                        <td>{comic.codigo_comic}</td>
                                        <td className="font-mono">{comic.precio}€</td>
                                        <td>{comic.lanzamiento}</td>
                                        <td>{comic.editora?.nombre || 'Sin editora'}</td>
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
<td>{comic.stock}</td>
                                        <td className="text-center">
                                            <div className="flex justify-center gap-2">
                                                {auth.user?.rol_id !== 3 && (
                                                    <>
                                                        <Link href={`/comics/${comic.id}/edit`} className="btn btn-ghost btn-xs text-info">Editar</Link>
                                                        <button onClick={()=> {
                                                            if (confirm('¿Estás seguro de querer eliminar este cómic?')) {
                                                                router.delete(`/comics/${comic.id}`)
                                                            }
                                                        }} className="btn btn-ghost btn-xs text-error">Eliminar</button>
                                                        <div className='flex flex-col'>
                                                            <button onClick={() => {
                                                                const input = document.getElementById(`anadirCantidad-${comic.id}`) as HTMLInputElement;
                                                                const stock = parseInt(input.value);
                                                                if (!isNaN(stock) && stock > 0) {
                                                                    router.post(`/comics/${comic.id}/anadir-stock`, { stock });
                                                                    input.value = '';
                                                                } else {
                                                                    alert('Por favor, ingresa una cantidad válida.');
                                                                }
                                                            }} className="btn btn-ghost btn-xs text-success w-30 mb-3">Añadir al stock</button>
                                                            <input type="number" min={1} className="border border-black input input-bordered input-sm ml-2 w-10 ml-11 mb-3" id={`anadirCantidad-${comic.id}`} />
                                                        </div>
                                                    </>
                                                )}
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
        <div className='p-3'>
            {auth.user?.rol_id !== 3 && (
                <Link href="/comics/create" className='btn btn-primary mr-5'>
                    Añadir Cómic
                </Link>
            )}
            {auth.user?.rol_id !== 3 && (
                        <Link href="dashboard" className="btn btn-success">
                            Volver al dashboard
                        </Link>
                    )}
                    </div>
    </div>
    </AppLayout>
    );
}