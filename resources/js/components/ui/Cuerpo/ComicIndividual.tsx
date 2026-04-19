import React from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { fechaLarga } from '@/lib/utils';

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
    imagen: string
}

interface Props {
    comic: Comic
}

export default function ComicIndividual({comic}:Props) {
    const {titulo,
    id,
    autors = [],
    categorias = [],
    imagen,
    descripcion,
    editora,
    precio,
    lanzamiento} = comic
    return (
        <div className='p-8 flex flex-col'>
                    <div className='flex flex-col gap-2 items-center'>
                        <Link href={`/comics/${id}`}><img className="w-32 h-48 object-cover transition-transform duration-300 group-hover:scale-105" src={imagen ? `/storage/${imagen}` : '/img/default-comic.png'} alt="Imagen" /></Link>
                        <h2 className='font-bold'>{titulo}</h2>
                        {autors?.length > 0 ? (
                            <p>
                            {autors.map(autor => autor.nombre).join(', ')}
                                </p>
                        ) : (<p className="font-bold italic text-gray-400">Anónimo</p>)}
                        <p>{fechaLarga(lanzamiento)}</p>
                        <p>{precio}€</p>
                    </div>
            </div>
    )
}