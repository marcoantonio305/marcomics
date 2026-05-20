import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ComicIndividual from '@/components/ui/Cuerpo/ComicIndividual';
import SeccionRecomendaciones from '@/components/ui/Cuerpo/SeccionRecomendaciones';
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
    imagen?: string;
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
    editora?: Editora;
    imagen: string;
    stock: number;
}

interface Props {
    categoria: Categoria;
    comicsRecomendados?: Comic[];
}

export default function Show({categoria, comicsRecomendados = []}:Props) {
    const listaComics = categoria.comics || [];
    const auth = usePage().props.auth as any;
    return (
        <AppLayout>
        <div className='p-8 flex flex-col'>
            <h1 className='text-4xl font-black text-blue-700'>{categoria.nombre}</h1>
            {auth.user?.rol_id === 1 ? (
    <img 
        className="w-64 h-96 object-contain mt-4" 
        src={categoria.imagen ? `/storage/${categoria.imagen}` : '/img/default-category.png'} 
        alt="Imagen de categoría" 
    />
) : null}
            <div className="flex gap-4 mt-4">
            {auth.user?.rol_id === 1 && (
                        <BotonBase
        onClick={() => router.visit(`/categorias/${categoria.id}/edit`)}
                                    texto="Editar categoría"
                                    colorFondo="bg-blue-600"
                                    hoverFondo="hover:bg-white"
                                    hoverTexto="hover:text-blue-600"
                                    colorTexto="text-white"
                                    borderClass="border-blue-700"
                                    tamano="sm"
                                    className="gap-2"
                                />
            )}
            {auth.user?.rol_id === 1 && (
        
        <BotonBase
        onClick={() => router.delete(`/categorias/${categoria.id}`)} 
                                    texto="Eliminar categoría"
                                    colorFondo="bg-red-600"
                                    hoverFondo="hover:bg-white"
                                    hoverTexto="hover:text-red-600"
                                    colorTexto="text-white"
                                    borderClass="border-red-700"
                                    tamano="sm"
                                    className="gap-2"
                                />
            )}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
                {listaComics.length > 0 ? (
                    listaComics.map(comic => (
                    <ComicIndividual key={comic.id} comic={comic} />
                ))
                ) : (
                    <p className="text-xl font-bold italic text-gray-400">No hay comics en esta categoría.</p>
                )
            }
            </div>

            <div className="mt-12">
                <SeccionRecomendaciones comics={comicsRecomendados} />
            </div>
        </div>
        </AppLayout>
    )
}