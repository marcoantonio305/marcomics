import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { BotonBase } from '@/components/ui/Cuerpo/BotonBase';

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
    <div className="p-8"> {/* Cambiado 'div-8' por 'p-8' para que Tailwind aplique el padding correctamente */}
            <h1 className="text-4xl font-bold mb-6 mt-5 ml-3 text-blue-600">{titulo}</h1>
        <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full table-auto">

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
                                        <td className="whitespace-nowrap align-middle">
                                            <div className="flex items-center justify-center gap-2 h-full">
                                                {auth.user?.rol_id !== 3 && (
                                                    <>
                                                        <BotonBase
                                                                onClick={() => router.visit(`/comics/${comic.id}/edit`)}
                                                                texto="Editar Cómic"
                                                                colorFondo="bg-blue-600"
                                                                hoverFondo="hover:bg-white"
                                                                hoverTexto="hover:text-blue-600"
                                                                colorTexto="text-white"
                                                                borderClass="border border-blue-700"
                                                                tamano="xs"
                                                                className="py-1 px-2 text-xs"
                                                            />
                                                            <BotonBase
                                                                onClick={()=> {
                                                            if (confirm('¿Estás seguro de querer eliminar este cómic?')) {
                                                                router.delete(`/comics/${comic.id}`)
                                                            }
                                                        }}
                                                                texto="Eliminar Cómic"
                                                                colorFondo="bg-red-600"
                                                                hoverFondo="hover:bg-white"
                                                                hoverTexto="hover:text-red-600"
                                                                colorTexto="text-white"
                                                                borderClass="border border-red-700"
                                                                tamano="xs"
                                                                className="py-1 px-2 text-xs"
                                                                />
                                                        <div className='flex flex-col items-center justify-center ml-2'>
    <BotonBase
        onClick={() => {
            const input = document.getElementById(`anadirCantidad-${comic.id}`) as HTMLInputElement;
            const stock = parseInt(input.value);
            if (!isNaN(stock) && stock > 0) {
                router.post(`/comics/${comic.id}/anadir-stock`, { stock });
                input.value = '';
            } else {
                alert('Por favor, ingresa una cantidad válida.');
            }
        }}
        texto="Añadir al stock"
        colorFondo="bg-emerald-500"
        hoverFondo="hover:bg-white"
        hoverTexto="hover:text-emerald-600"
        colorTexto="text-white"
        borderClass="border border-emerald-500"
        tamano="xs"
        className="py-1 px-2 text-xs mb-1"
    />
    <input 
        type="number" 
        min={1} 
        placeholder="0" 
        className="border border-gray-300 input input-bordered input-xs w-16 text-center" 
        id={`anadirCantidad-${comic.id}`} 
    />
</div>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="text-center py-10 text-gray-400">
                                        No hay cómics registrados actualmente.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        <div className='p-3 flex flex-cols gap-5 '>
            {auth.user?.rol_id !== 3 && (
                <BotonBase
                                                texto="Añadir Cómic"
                                                colorFondo="bg-indigo-600"
                                                hoverFondo="hover:bg-white"
                                                hoverTexto='hover:text-indigo-600'
                                                colorTexto="text-white"
                                                borderClass="border border-indigo-700"
                                                tamano="sm"
                                                className="gap-2"
                                                onClick={() => router.visit('/comics/create')}
                                            />
            )}
            {auth.user?.rol_id !== 3 && (
                        <BotonBase
                                            onClick={() => router.visit(`/dashboard`)}
                                            texto="Volver al dashboard"
                                            colorFondo="bg-zinc-800" 
                                            hoverFondo="hover:bg-white"
                                            colorTexto="text-white"
                                            hoverTexto="hover:text-zinc-800"
                                            borderClass="border border-zinc-900"
                                            tamano="sm"
                                            className="gap-2"
                                        />
                    )}
                    </div>
    </div>
    </AppLayout>
    );
}