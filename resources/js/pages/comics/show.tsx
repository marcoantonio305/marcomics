import React from 'react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import BotonBiblioteca from '@/components/ui/Cuerpo/BotonBiblioteca';
import { BotonAnadirCarro } from '@/components/ui/Cuerpo/BotonAnadirCarro';
import { fechaLarga } from '@/lib/utils';
import ComentariosPorComic from '@/components/ui/Cuerpo/ComentariosPorComic';
import CajaTextoComentario from '@/components/ui/Cuerpo/CajaTextoComentario';


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

interface Comentario {
    id: number;
    contenido: string;
    punctuation?: number;
    created_at: string;
    user: {
        id: number;
        name: string;
        foto_perfil?: string;
    };
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
    comic: Comic;
    comentarios: Comentario[];
    titulo: string;
}

export default function Show({ comic, comentarios } : Props) {
    const {auth} = usePage().props as any;
    return (
        <AppLayout>
    <div className="div-8 ml-5 mb-7">
        <div className='bg-gray-500 w-fit h-20 flex items-center mb-6 mt-5'>
            <h1 className="text-4xl font-bold ml-4 mr-4 text-white">{comic.titulo}</h1>
            </div>
        <div className="card bg-base-100 shadow-xl border border-base-300 mb-5">
            <img 
    src={`/storage/${comic.imagen}`} 
    alt={comic.titulo} 
    className="w-50 h-66 object-cover mb-5"
/>
            <p className='mb-2 mt-3'><span className='text-3xl font-bold mb-8 mt-8 text-blue-600'>Titulo: </span><span className='mb-6 ml-4 text-xl font-bold'>{comic.titulo}</span></p>
            <p className='mb-2'><span className='text-3xl font-bold mb-6 text-blue-600'>Autores: </span>
            <span className='mb-6 ml-4 text-xl font-bold'>
            {comic.autors && comic.autors.length > 0 ? (
            comic.autors.map((autor) => (
                <span key={autor.id} className='badge badge-ghost badge-xl'>
                    {autor.nombre}  &nbsp; &nbsp;
                </span>
            ))
        ) : (
            <span className='text-gray-400 italic'>Anónimo</span>
        )}
            </span></p>
            <p className='mb-2'><span className='text-3xl font-bold mb-8 mt-8 text-blue-600'>Precio: </span><span className='mb-6 ml-5 text-xl'>{comic.precio}€</span></p>
            <p className='mb-2'><span className='text-3xl font-bold mb-8 mt-8 text-blue-600'>Lanzamiento: </span><span className='mb-6 ml-5 text-xl'>{fechaLarga(comic.lanzamiento)}</span></p>
            <p className='mb-2'><span className='text-3xl font-bold mb-8 mt-8 text-blue-600'>Editorial: </span><span className='mb-6 ml-5 text-xl'>{comic.editora?.nombre || 'Sin editora'}</span></p>
            
            <p className='mb-2'><span className='text-3xl font-bold mb-8 mt-8 text-blue-600'>Categorías: </span><span className='mb-6 ml-5 text-xl'>
                {comic.categorias && comic.categorias.length > 0 ? (
            comic.categorias.map((categoria) => (
                <span key={categoria.id} className='badge badge-ghost badge-sm text-xl font-bold'>
                    {categoria.nombre} &nbsp; &nbsp;
                </span>
            ))
        ) : (
            <span className='text-gray-400 italic'>Ninguna</span>
        )}
                </span></p>

                <p className='mb-2 border border-base-300 p-4'><span className='text-3xl font-bold mb-8 mt-8 text-blue-600'>Descripción: </span><span className='mb-6 ml-5 text-xl'>{comic.descripcion}</span></p>
<div><BotonAnadirCarro comicId={comic.id}></BotonAnadirCarro></div>
            </div>


            <div className='flex flex-col gap-4'>
                <ComentariosPorComic comentarios={comentarios} comic={comic}></ComentariosPorComic>
                <CajaTextoComentario comicId={comic.id}></CajaTextoComentario>
            </div>

            {auth.user?.rol_id !== 3 && (
            <Link href={`/comics/${comic.id}/edit`} className='btn btn-secondary mr-4'>Editar comic</Link>
            )}
            {auth.user?.rol_id !== 3 && (
            <button 
        onClick={() => router.delete(`/comics/${comic.id}`)} 
        className='btn btn-warning mr-4' 
    >
        Eliminar comic
    </button>
            )}
            {auth.user?.rol_id !== 3 && (
            <Link href={`/comics`} className='btn btn-secondary mr-4 ml-4'>Volver al index</Link>
            )}
            <BotonBiblioteca comic_id={comic.id}></BotonBiblioteca>
            
    </div>
    </AppLayout>
    );
}