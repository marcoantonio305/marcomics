import React from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { fechaLarga } from '@/lib/utils';
import { BotonAnadirCarro } from './BotonAnadirCarro';
import BotonBiblioteca from './BotonBiblioteca';

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
    imagen: string,
    stock: number
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
        <div className="div-8 ml-15 mb-7">
                <div className='bg-gray-500 w-fit h-20 flex items-center mb-6 mt-5'>
                    <h1 className="text-4xl font-bold ml-4 mr-4 text-white">{comic.titulo}</h1>
                    </div>
                <div className="flex flex-row mb-5">
                    <img src={`/storage/${comic.imagen}`} 
            alt={comic.titulo} 
            className="w-100 h-150 object-cover mb-5 mr-30"
        />
                    <div>
                    
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
                        {comic.stock > 0 ? (
                            <div className='flex flex-col'>
                            <p className='text-green-500 text-2xl uppercase font-bold mt-3'>En stock</p>
                            <BotonAnadirCarro comicId={comic.id}></BotonAnadirCarro></div>
                        ) : (
                            <p className='text-red-500 text-2xl uppercase font-bold mt-3'>Sin stock</p>
                        )}
        <div className='mt-5'>
        <BotonBiblioteca comic_id={comic.id}></BotonBiblioteca>
        </div>
        </div>
        </div>
        </div>
    )
}
