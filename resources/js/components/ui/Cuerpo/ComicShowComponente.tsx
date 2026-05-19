import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { fechaLarga } from '@/lib/utils';
import { BotonAnadirCarro } from './BotonAnadirCarro';
import BotonBiblioteca from './BotonBiblioteca';
import { Star, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import React, { useState, ReactNode } from 'react';

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
    children?: ReactNode;
}

export default function ComicShowComponente({ comic, media, imagenes, children }: Props) {
    const propsInertia = usePage().props as any;
    const carritoSeguro = propsInertia.carrito || {};
    
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

    const itemEnCarrito = Object.values(carritoSeguro).find(
        (item: any) => Number(item.id || item.comic_id) === Number(comic.id)
    ) as any;
    const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

    const actualizarCantidad = (comicId: number, accion: 'anadir' | 'disminuir') => {
        const url = accion === 'anadir' ? '/carrito/anadir' : '/carrito/disminuir';
        router.post(url, {
            comic_id: comicId
        }, {
            preserveScroll: true,
            only: ['carrito', 'carritoTotal'],
        });
    }

    const siguiente = () => {
        setCurrentIdx((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
    };

    const anterior = () => {
        setCurrentIdx((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
    };

    const esPrecompra = new Date(lanzamiento) > new Date();

    const claseContenedorDato = "mb-5 inline-flex items-center bg-blue-600 text-white rounded-full px-6 py-2 text-xl shadow-md flex-nowrap gap-2 whitespace-nowrap";

    return (
        <div className="w-full mb-7 px-8 mt-2">
            <div className="mb-1">
                <span className="text-xl font-black text-pink-600 uppercase tracking-wider">
                    {comic.categorias && comic.categorias.length > 0 
                        ? comic.categorias.map(c => c.nombre).join(' / ') 
                        : 'Sin Categoría'}
                </span>
            </div>

            <div className='bg-yellow-100 w-fit h-20 flex items-center mb-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
                <h1 className="text-4xl font-black ml-4 mr-4 text-black uppercase tracking-tighter">
                    {comic.titulo}
                </h1>
            </div>
            

            <div className="flex flex-col lg:flex-row gap-16 items-start">

                <div className="relative w-full lg:w-[600px] h-fit flex-shrink-0 group bg-white mx-auto lg:mx-0">
                    <div className="w-full h-[800px] flex items-center justify-center bg-zinc-50 p-2">
                        <img 
                            src={`/storage/${imagenes[currentIdx]}`} 
                            alt={`${comic.titulo} - vista ${currentIdx + 1}`} 
                            className="max-w-full max-h-full object-contain transition-all duration-500 ease-in-out"
                            key={currentIdx} 
                        />
                    </div>

                    {imagenes.length > 1 && (
                        <>
                            <button 
                                onClick={anterior}
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-all z-10 border-2 border-black"
                            >
                                <ChevronLeft size={24} className="text-gray-800" />
                            </button>
                            <button 
                                onClick={siguiente}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-all z-10 border-2 border-black"
                            >
                                <ChevronRight size={24} className="text-gray-800" />
                            </button>
                            
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
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


                <div className='flex-1 w-full flex flex-col items-start relative pt-0'>

                    <div className="absolute top-0 right-0 p-4 border-4 border-black bg-yellow-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-fit hidden lg:block">
                        {media && Number(media) > 0 ? (
                            <div className="text-2xl uppercase flex items-center font-bold whitespace-nowrap ">
                                <span className="text-black mr-4">Puntuación Media:</span> 
                                <div className='border-3 rounded-full border-blue-400 bg-blue-300 flex flex-row items-center p-2 px-4 shadow-sm'>
                                    <span className='text-3xl leading-none text-black'>{media}</span>
                                    <Star size={32} className="ml-2" color="black" fill="#EAB308" />
                                </div>
                            </div>
                        ) : (
                            <p className="text-xl font-bold italic text-gray-500 whitespace-nowrap">
                                Nadie ha puntuado el comic aún
                            </p>
                        )}
                    </div>
                    
                    <div className={claseContenedorDato}>
                        <span className="font-bold">Título:</span>
                        <span className="font-normal">{comic.titulo}</span>
                    </div>
                    
                    <div className={claseContenedorDato}>
                        <span className="font-bold">Autores:</span>
                        <span className="font-normal">
                            {comic.autors && comic.autors.length > 0 
                                ? comic.autors.map(a => a.nombre).join(', ') 
                                : 'Anónimo'}
                        </span>
                    </div>
                    
                    <div className={claseContenedorDato}>
                        <span className="font-bold">Precio:</span>
                        <span className="font-normal">{comic.precio}€</span>
                    </div>

                    <div className={claseContenedorDato}>
                        <span className="font-bold">Lanzamiento:</span>
                        <span className="font-normal">{fechaLarga(comic.lanzamiento)}</span>
                    </div>

                    <div className={claseContenedorDato}>
                        <span className="font-bold">Editorial:</span>
                        <span className="font-normal">{comic.editora?.nombre || 'Sin editora'}</span>
                    </div>
                    
                    <div className={claseContenedorDato}>
                        <span className="font-bold">Categorías:</span>
                        <span className="font-normal">
                            {comic.categorias && comic.categorias.length > 0 
                                ? comic.categorias.map(c => c.nombre).join(', ') 
                                : 'Ninguna'}
                        </span>
                    </div>
        
                    <div className="mt-2 w-full">
                        <div className="inline-flex items-center bg-blue-600 text-white font-bold rounded-full px-6 py-2 text-xl shadow-md mb-2">
                            Descripción
                        </div>
                        <p className='text-xl text-black leading-relaxed bg-white p-3 border-3 border-blue-600 rounded-lg shadow-inner w-full'>{comic.descripcion}</p>
                    </div>
                    
                    <div className='mt-3 w-full border-t-2 border-gray-100 pt-4'>
                        {esPrecompra ? (
                            <div className='flex flex-col gap-4'>
                                <p className='text-blue-600 text-xl uppercase font-bold'>Disponible para precompra</p>
                                <div className='flex flex-col lg:flex-row gap-8 items-start w-full'>
                                    <div className='flex flex-col gap-4 items-start w-fit flex-shrink-0'>
                                        <div className='flex gap-4 items-center'>
                                            <BotonAnadirCarro comicId={comic.id} texto="Precompra" esPrecompra={true}></BotonAnadirCarro>
                                            <BotonBiblioteca comic_id={comic.id}></BotonBiblioteca>
                                        </div>
                                        
                                        {cantidadEnCarrito > 0 && (
                                            <div className="flex flex-col items-start gap-1">
                                                <span className="font-black text-gray-800 text-lg uppercase tracking-wide">Cantidad</span>
                                                <div className="flex items-center gap-4 bg-zinc-100 px-4 py-2 rounded-xl border border-gray-300">
                                                    <button onClick={() => actualizarCantidad(comic.id, 'disminuir')} className="p-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-all">
                                                        <Minus size={18} />
                                                    </button>
                                                    <span className="text-2xl font-black text-black px-2 min-w-[24px] text-center">{cantidadEnCarrito}</span>
                                                    <button onClick={() => actualizarCantidad(comic.id, 'anadir')} className="p-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all">
                                                        <Plus size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Bloque de Suscripción al lado de cantidad (Precompra) */}
                                    <div className="flex-1 w-full">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        ) : comic.stock > 0 ? (
                            <div className='flex flex-col'>
                                <p className='text-green-600 text-3xl uppercase font-bold'>En stock</p>
                                <div className='flex flex-col lg:flex-row gap-8 items-start w-full'>
                                    <div className='flex flex-col items-start w-fit flex-shrink-0'>
                                        <div className='flex gap-4 items-center'>
                                            <BotonAnadirCarro comicId={comic.id}></BotonAnadirCarro>
                                            <BotonBiblioteca comic_id={comic.id}></BotonBiblioteca>
                                        </div>
                                        
                                        {cantidadEnCarrito > 0 && (
                                            <div className="flex flex-col items-start gap-1">
                                                <span className="font-black text-black ml-7 text-lg uppercase tracking-wide">Cantidad</span>
                                                <div className="flex items-center gap-4 bg-zinc-100 px-4 py-2 rounded-xl border-4 border-black">
                                                    <button onClick={() => actualizarCantidad(comic.id, 'disminuir')} className="p-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-all">
                                                        <Minus size={18} />
                                                    </button>
                                                    <span className="text-2xl font-black text-black px-2 min-w-[24px] text-center">{cantidadEnCarrito}</span>
                                                    <button onClick={() => actualizarCantidad(comic.id, 'anadir')} className="p-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all">
                                                        <Plus size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Bloque de Suscripción al lado de cantidad (En Stock) */}
                                    <div className="flex-1 w-full">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-4'>
                                <p className='text-red-500 text-3xl uppercase font-bold mb-2'>Sin stock</p>
                                <div className='flex flex-col lg:flex-row gap-8 items-start w-full'>
                                    <div className='w-fit flex-shrink-0'>
                                        <BotonBiblioteca comic_id={comic.id}></BotonBiblioteca>
                                    </div>
                                    
                                    {/* Bloque de Suscripción al lado (Sin Stock) */}
                                    <div className="flex-1 w-full">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}