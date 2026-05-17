import { Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { fechaLarga } from '@/lib/utils';
import { BotonAnadirCarro } from './BotonAnadirCarro';
import BotonBiblioteca from './BotonBiblioteca';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

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
    editora?: Editora;
    imagen: string;
    stock: number;
    preview1?: string; 
    preview2?: string; 
}

interface Props {
    comic: Comic;
    media: string | null;
    imagenes: string[];
}

export default function ComicShowComponente({ comic, media, imagenes }: Props) {
    const {
        titulo,
        id,
        autors = [],
        categorias = [],
        descripcion,
        editora,
        precio,
        lanzamiento
    } = comic;

    const [currentIdx, setCurrentIdx] = useState(0);

    const siguiente = () => {
        setCurrentIdx((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
    };

    const anterior = () => {
        setCurrentIdx((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
    };

    const esPrecompra = new Date(lanzamiento) > new Date();

    return (
        <div className="div-8 ml-15 mb-7">
            <div className='bg-yellow-100 w-fit h-20 flex items-center mb-6 mt-5 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ml-40'>
                <h1 className="text-4xl font-black ml-4 mr-4 text-black uppercase tracking-tighter">
                    {comic.titulo}
                </h1>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8 items-start">

                <div className="relative w-full lg:w-[50%] group bg-white overflow-hidden mx-auto lg:mx-0">
                    <img 
                        src={`/storage/${imagenes[currentIdx]}`} 
                        alt={`${comic.titulo} - vista {currentIdx + 1}`} 
                        className="w-full h-auto max-h-[75vh] object-contain transition-all duration-500 ease-in-out"
                        key={currentIdx} 
                    />

                    {imagenes.length > 1 && (
                        <>
                            <button 
                                onClick={anterior}
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-all z-10"
                            >
                                <ChevronLeft size={24} className="text-gray-800" />
                            </button>
                            <button 
                                onClick={siguiente}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-all z-10"
                            >
                                <ChevronRight size={24} className="text-gray-800" />
                            </button>
                            
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-black/10 px-2 py-1 rounded-full backdrop-blur-sm">
                                {imagenes.map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`w-2 h-2 rounded-full ${i === currentIdx ? 'bg-blue-600' : 'bg-white/60'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className=''>
                    <div className="mb-6 p-4 border-4 border-black bg-violet-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-fit">
                        {media && Number(media) > 0 ? (
                            <p className="text-2xl font-black uppercase">
                                <span className="text-yellow-700">Puntuación Media:</span> {media} 
                                <Star size={28} className="inline-block ml-2 mb-1" color="black" fill="#EAB308" />
                            </p>
                        ) : (
                            <p className="text-xl font-bold italic text-gray-500">
                                Nadie ha puntuado el comic aún
                            </p>
                        )}
                    </div>
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
        
                    <p className='mb-2'><span className='text-3xl font-bold mb-8 mt-8 text-blue-600'>Descripción: </span><span className='mb-6 ml-5 text-xl'>{comic.descripcion}</span></p>
                    
                    {esPrecompra ? (
                        <div className='flex flex-col'>
                            <div>
                                <BotonAnadirCarro comicId={comic.id} texto="Precompra" esPrecompra={true}></BotonAnadirCarro>
                                <BotonBiblioteca comic_id={comic.id}></BotonBiblioteca>
                            </div>
                        </div>
                    ) : comic.stock > 0 ? (
                        <div className='flex flex-col'>
                            <p className='text-green-600 text-2xl uppercase font-bold mt-3'>En stock</p>
                            <div>
                                <BotonAnadirCarro comicId={comic.id}></BotonAnadirCarro>
                                <BotonBiblioteca comic_id={comic.id}></BotonBiblioteca>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col'>
                            <p className='text-red-500 text-2xl uppercase font-bold mt-3 mb-9'>Sin stock</p>
                            <BotonBiblioteca comic_id={comic.id}></BotonBiblioteca>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}