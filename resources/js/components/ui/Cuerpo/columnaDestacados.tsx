import React from 'react';
import { Link } from '@inertiajs/react';

interface Coleccion {
    id: number;
    nombre: string;
    imagen: string;
    es_destacado: boolean;
    posicion_destacado: number | null;
}

interface Props {
    colecciones: Coleccion[];
}

export default function ColumnaDestacados({ colecciones }: Props) {
    if (!colecciones || colecciones.length === 0) {
        return null;
    }
    
    return (
        <div className='flex flex-col w-64 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-black'>
            <div className="flex flex-col bg-yellow-100 p-5 text-3xl font-mono font-black leading-tight border-b-4 border-black">
                Colecciones destacadas
            </div>

            {colecciones.map((coleccion) => (
                <div key={coleccion.id} className="flex flex-col bg-[#B4B4C7] border-b-4 border-black last:border-b-0"> 
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
                        <div className="bg-black w-full py-2 text-xl text-white text-center font-mono font-black uppercase uppercase tracking-wider">
                            {coleccion.nombre}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}