import React from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { fechaLarga } from '@/lib/utils';
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { ShoppingCart } from 'lucide-react';

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
    stock,
    lanzamiento} = comic
    const { carritoTotal } = usePage().props as any;;
        const { flash, auth } = usePage().props as any;
    
        useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: 'success',
                title: '¡Hecho!',
                text: flash.success,
            });
        }
    }, [flash]); 
    
        const anadir = (e: React.MouseEvent) => {
        e.preventDefault(); 
        router.post('/carrito/anadir', {
            comic_id: id 
        }, {
            preserveScroll: true,
            only: ['carrito', 'carritoTotal', 'flash'],
        });
    };

    const esPrecompra = new Date(lanzamiento) > new Date();

    return (
        <div className='p-8 flex flex-col'>
                    <div className='flex flex-col gap-2 items-center'>
                        <Link href={`/comics/${id}`}><img className="w-32 h-48 object-cover rounded shadow-md transition-transform duration-300 hover:scale-115 hover:z-50 relative" src={imagen ? `/storage/${imagen}` : '/img/default-comic.png'} alt="Imagen" /></Link>
                        <h2 className='font-bold mt-3'>{titulo}</h2>
                        {autors?.length > 0 ? (
                            <p>
                            {autors.map(autor => autor.nombre).join(', ')}
                                </p>
                        ) : (<p className="font-bold italic text-gray-400">Anónimo</p>)}
                        <p>{fechaLarga(lanzamiento)}</p>
                        <p>{precio}€</p>
                        {auth?.user && (
                            esPrecompra ? (
                                <button 
                                    onClick={anadir}
                                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-[#FDF5E6] hover:text-blue-600 text-white font-bold rounded transition-all duration-200 border-2 border-black w-56 h-10 hover:scale-110 transform"
                                >
                                    <ShoppingCart size={20} />
                                    Precompra
                                </button>
                            ) : stock > 0 ? (
                                <button 
                                    onClick={anadir}
                                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-[#FDF5E6] hover:text-green-600 text-white font-bold rounded transition-all duration-200 border-2 border-black w-56 h-10 hover:scale-110 transform"
                                >
                                    <ShoppingCart size={20} />
                                    Añadir al carrito
                                </button>
                            ) : (
                                <div className="flex items-center justify-center text-red-600 font-bold w-56 h-10 italic">
                                    Sin stock disponible
                                </div>
                            )
                        )}
            </div>
        </div>
    );
}