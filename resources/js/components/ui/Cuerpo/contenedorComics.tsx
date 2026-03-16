import React from 'react';
import { Link, router } from '@inertiajs/react';
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
    comics?: Comic[];
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
    imagen: string
}

interface Props {
    categoria: Categoria
}

export default function ContenedorComics({categoria}:Props) {
    const listaComics = categoria.comics || [];
    return (
        <div className='p-8 flex flex-col'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
                {listaComics.length > 0 ? (
                    listaComics.map(comic => (
                    <div key={comic.id} className='flex flex-col gap-2'>
                        <Link href={`/comics/${comic.id}`}><img className="w-32 h-48" src={comic.imagen ? `/storage/${comic.imagen}` : '/img/default-comic.png'} alt="Imagen" /></Link>
                        <h2>{comic.titulo}</h2>
                        {comic.autors?.length > 0 ? (
                            <p>
                            {comic.autors.map(autor => autor.nombre).join(', ')}
                                </p>
                        ) : (<p className="font-bold italic text-gray-400">Anónimo</p>)}
                        <p>{comic.lanzamiento}</p>
                        <p>{comic.precio}</p>
                    </div>
                ))
                ) : (
                    <p className="text-xl font-bold italic text-gray-400">No hay comics en esta categoría.</p>
                )
            }
            </div>
        </div>
    )
}