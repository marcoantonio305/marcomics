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
}

interface Comic {
    id: number;
    titulo: string;
    precio: number;
    lanzamiento: string;
    descripcion: string;
    autors: Autor[];
    categorias: Categoria[];
    editora?: Editora
}

interface Props {
    comic: Comic;
    titulo: string;
}

export default function Show({ comic} : Props) {
    return (
        <AppLayout>
    <div className="div-8">
            <h1 className="text-4xl font-bold mb-6 text-primary">{comic.titulo}</h1>
        <div className="card bg-base-100 shadow-xl border border-base-300">
            <p><span className='text-xl font-bold mb-6 text-primary'>Titulo: </span><span className='mb-6'>{comic.titulo}</span></p>
            <p><span className='text-xl font-bold mb-6 text-primary'>Precio: </span><span className='mb-6'>{comic.precio}</span></p>
            <p><span className='text-xl font-bold mb-6 text-primary'>Lanzamiento: </span><span className='mb-6'>{comic.lanzamiento}</span></p>
            <p><span className='text-xl font-bold mb-6 text-primary'>Editora: </span><span className='mb-6'>{comic.editora?.nombre || 'Sin editora'}</span></p>
            <p><span className='text-xl font-bold mb-6 text-primary'>Descripción: </span><span className='mb-6'>{comic.descripcion}</span></p>
            <p><span className='text-xl font-bold mb-6 text-primary'>Autores: </span>
            <span className='mb-6'>
            {comic.autors && comic.autors.length > 0 ? (
            comic.autors.map((autor) => (
                <span key={autor.id} className='badge badge-ghost badge-sm'>
                    {autor.nombre}  &nbsp; &nbsp;
                </span>
            ))
        ) : (
            <span className='text-gray-400 italic'>Anónimo</span>
        )}
            </span></p>
            <p><span className='text-xl font-bold mb-6 text-primary'>Categorías: </span><span className='mb-6'>
                {comic.categorias && comic.categorias.length > 0 ? (
            comic.categorias.map((categoria) => (
                <span key={categoria.id} className='badge badge-ghost badge-sm'>
                    {categoria.nombre} &nbsp; &nbsp;
                </span>
            ))
        ) : (
            <span className='text-gray-400 italic'>Ninguna</span>
        )}
                </span></p>
            </div>
            <Link href={`/comics`} className='btn btn-ghost btn-secondary'>Volver al index</Link>
    </div>
    </AppLayout>
    );
}