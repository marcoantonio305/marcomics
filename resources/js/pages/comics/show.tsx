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
import SeccionRecomendaciones from '@/components/ui/Cuerpo/SeccionRecomendaciones';


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

interface Coleccion {
    id: number;
    nombre: string;
    imagen?: string;
}

interface Comentario {
    id: number;
    contenido: string;
    puntuacion?: number;
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
    coleccions?: Coleccion[];
    editora?: Editora,
    imagen: string,
    stock: number,
    preview1?: string; 
    preview2?: string;
}

interface Props {
    comic: Comic;
    comentarios: Comentario[];
    comicsRecomendados: any[];
    titulo: string;
}

export default function Show({ comic, comentarios, comicsRecomendados } : Props) {
    const {auth} = usePage().props as any;
    const { data, setData, post, processing, reset } = useForm({
        subscribable_type: '', 
        subscribable_id: '',  
    });

    const imagenes = [
    comic.imagen,
    comic.preview1,
    comic.preview2
].filter(Boolean);
    const comentariosConPuntos = comentarios.filter(c => 
    c.puntuacion !== undefined && c.puntuacion !== null && Number(c.puntuacion) > 0
);

    const totalConPuntos = comentariosConPuntos.length;


    const sumaPuntuaciones = comentariosConPuntos.reduce((acc, curr) => {
    return acc + Number(curr.puntuacion || 0); 
}, 0);


    const mediaPuntuacion = totalConPuntos > 0 
    ? (sumaPuntuaciones / totalConPuntos).toFixed(1) 
    : null;

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.subscribable_type || !data.subscribable_id) return;

        post('/suscripciones', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                alert('Te has suscrito con éxito. Se te avisará de las novedades.');
            }
        });
    };
    return (
        <AppLayout>
            <ComicShowComponente comic={comic} media={mediaPuntuacion} imagenes={imagenes}>
                {auth.user && (
                    <div className='p-4 border-3 border-red-500 rounded-lg bg-card text-card-foreground shadow-sm max-w-xl w-full'>
                        <h3 className='text-xl text-pink-700 font-semibold mb-2 flex items-center gap-2'>
                            Suscribirte a la colección
                        </h3>
                        <p className='text-xs text-muted-foreground mb-4'>
                            Selecciona una categoría o colección de este cómic para recibir un correo electrónico cada vez que se publique un nuevo producto asignado a ella.
                        </p>

                        <form onSubmit={handleSubscribe} className='flex flex-col sm:flex-row gap-3 items-stretch sm:items-center'>
                            <div className='flex-1'>
                                <select 
                                    className='select select-bordered w-full text-sm h-10 px-3 rounded-md border bg-background'
                                    value={data.subscribable_type ? `${data.subscribable_type}:${data.subscribable_id}` : ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (!value) {
                                            setData({ subscribable_type: '', subscribable_id: '' });
                                            return;
                                        }
                                        const [type, id] = value.split(':');
                                        setData({
                                            subscribable_type: type,
                                            subscribable_id: id
                                        });
                                    }}
                                >
                                    <option value="">Escoge una opción</option>
                                    
                                    {comic.categorias && comic.categorias.length > 0 && (
                                        <optgroup label="Categorías">
                                            {comic.categorias.map(cat => (
                                                <option key={`cat-${cat.id}`} value={`App\\Models\\Categoria:${cat.id}`}>
                                                    Categoría: {cat.nombre}
                                                </option>
                                            ))}
                                        </optgroup>
                                    )}


                                    {comic.coleccions && comic.coleccions.length > 0 && (
                                        <optgroup label="Colecciones / Franquicias">
                                            {comic.coleccions.map(col => (
                                                <option key={`col-${col.id}`} value={`App\\Models\\Coleccion:${col.id}`}>
                                                    Colección: {col.nombre}
                                                </option>
                                            ))}
                                        </optgroup>
                                    )}
                                </select>
                            </div>

                            <button 
                                type="submit" 
                                className='btn bg-black text-white h-10 px-6 font-medium rounded-md transition-colors hover:text-white hover:bg-red-500 hover:scale-110 transition-all duration-200 transform'
                                disabled={processing || !data.subscribable_type}
                            >
                                {processing ? 'Uniendo...' : 'Suscribirse'}
                            </button>
                        </form>
                    </div>
                )}
            </ComicShowComponente>
            

            <div className='flex flex-col gap-4 ml-5'>
                <ComentariosPorComic comentarios={comentarios} comic={comic}></ComentariosPorComic>
                <CajaTextoComentario comicId={comic.id}></CajaTextoComentario>
            </div>
            <SeccionRecomendaciones comics={comicsRecomendados} />
            <div className='mb-3 ml-7'>
                {auth.user && auth.user.rol_id !== 3 && (
                    <Link href={`/comics/${comic.id}/edit`} className='btn btn-secondary mr-4'>Editar comic</Link>
                )}
                {auth.user && auth.user.rol_id !== 3 && (
                    <button 
                        onClick={() => router.delete(`/comics/${comic.id}`)} 
                        className='btn btn-warning mr-4' 
                    >
                        Eliminar comic
                    </button>
                )}
                {auth.user && auth.user.rol_id !== 3 && (
                    <Link href={`/comics`} className='btn btn-primary mr-4 ml-4'>Volver al index</Link>
                )}
            </div>
        </AppLayout>
    );
}