import React from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';



interface Categoria {
    id: number;
    nombre: string;
    imagen: string;
    es_destacado: boolean;
    posicion_destacado: number | null;
}

interface Coleccion {
    id: number;
    nombre: string;
    imagen: string;
    es_destacado: boolean;
    posicion_destacado: number | null;
}

interface ItemDestacado {
    id: number;
    nombre: string;
    imagen: string;
    tipo: 'categoria' | 'coleccion';
}


interface Props {
    colecciones: Coleccion[];
}

export default function ColumnaDestacados({ colecciones }: Props) {
    if (!colecciones || colecciones.length === 0) {
        return null;
    }
    return (
        <div className='flex flex-col w-64 shadow-xl'>
            <div className="flex flex-col bg-[#2A2AE9] p-5 text-3xl text-white font-bold leading-tight">Colecciones destacadas</div>
{colecciones.map((coleccion) => (
                <div key={coleccion.id} className="flex flex-col bg-[#B4B4C7] border-b border-gray-400"> 
                    <Link 
                        href={`/coleccions/${coleccion.id}`} 
                        className="flex flex-col group"
                    >
                        <div className="h-44 flex justify-center items-center p-4">
                            <img 
                                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                                src={coleccion.imagen ? `/storage/${coleccion.imagen}` : ''} 
                                alt={coleccion.nombre} 
                            />
                        </div>
                        <div className="bg-black w-full py-2 text-xl text-white text-center font-light uppercase tracking-wider">
                            {coleccion.nombre}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}