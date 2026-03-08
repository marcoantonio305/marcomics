import React from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Comic {
    id: number;
    titulo: string;
    precio: number;
    lanzamiento: string;
    descripcion: string;
}

interface Props {
    comic: Comic;
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
            <p><span className='text-xl font-bold mb-6 text-primary'>Descripción: </span><span className='mb-6'>{comic.descripcion}</span></p>
            </div>
            <Link href={`/comics`} className='btn btn-ghost btn-secondary'>Volver al index</Link>
    </div>
    </AppLayout>
    );
}