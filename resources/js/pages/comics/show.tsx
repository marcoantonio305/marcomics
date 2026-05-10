import React from 'react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import BotonBiblioteca from '@/components/ui/Cuerpo/BotonBiblioteca';
import { BotonAnadirCarro } from '@/components/ui/Cuerpo/BotonAnadirCarro';
import { fechaLarga } from '@/lib/utils';
import ComentariosPorComic from '@/components/ui/Cuerpo/ComentariosPorComic';
import CajaTextoComentario from '@/components/ui/Cuerpo/CajaTextoComentario';
import ComicShowComponente from '@/components/ui/Cuerpo/ComicShowComponente';


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
    imagen: string,
    stock: number
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
            <ComicShowComponente comic={comic}></ComicShowComponente>
            

            <div className='flex flex-col gap-4 ml-5'>
                <ComentariosPorComic comentarios={comentarios} comic={comic}></ComentariosPorComic>
                <CajaTextoComentario comicId={comic.id}></CajaTextoComentario>
            </div>
            <div className='mb-3 ml-7'>
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
            <Link href={`/comics`} className='btn btn-primary mr-4 ml-4'>Volver al index</Link>
            )}
</div>
            
    </AppLayout>
    );
}