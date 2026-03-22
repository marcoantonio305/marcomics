import React from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';



interface Categoria {
    id: number;
    nombre: string;
    imagen: string;
}


interface Props {
    coleccion1?: Categoria;
    coleccion2?: Categoria;
    coleccion3?: Categoria;
}

export default function ColumnaDestacados({coleccion1, coleccion2, coleccion3}:Props) {
    
    return (
        <div className='flex flex-col w-64 shadow-xl'>
            <div className="flex flex-col bg-[#2A2AE9] p-5 text-3xl text-white font-bold leading-tight">Colecciones destacadas</div>
<div className="flex flex-col bg-[#B4B4C7]"> 
    <Link href={`/categorias/${coleccion1?.id}`} className="flex flex-col group">
        
        <div className="h-44 flex justify-center items-center p-4">
            <img 
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                src={coleccion1?.imagen ? `/storage/${coleccion1.imagen}` : ''} 
                alt={coleccion1?.nombre} 
            />
        </div>


        <div className="bg-black w-full py-2 text-xl text-white text-center font-light uppercase tracking-wider">
            {coleccion1?.nombre}
        </div>
        
    </Link>
</div>
<div className="flex flex-col bg-[#B4B4C7]"> 
    <Link href={`/categorias/${coleccion2?.id}`} className="flex flex-col group">
        
        <div className="h-44 flex justify-center items-center p-4">
            <img 
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                src={coleccion2?.imagen ? `/storage/${coleccion2.imagen}` : ''} 
                alt={coleccion2?.nombre} 
            />
        </div>


        <div className="bg-black w-full py-2 text-xl text-white text-center font-light uppercase tracking-wider">
            {coleccion2?.nombre}
        </div>
        
    </Link>
</div>
<div className="flex flex-col bg-[#B4B4C7]"> 
    <Link href={`/categorias/${coleccion3?.id}`} className="flex flex-col group">
        
        <div className="h-44 flex justify-center items-center p-4">
            <img 
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                src={coleccion3?.imagen ? `/storage/${coleccion3.imagen}` : ''} 
                alt={coleccion3?.nombre} 
            />
        </div>


        <div className="bg-black w-full py-2 text-xl text-white text-center font-light uppercase tracking-wider">
            {coleccion3?.nombre}
        </div>
        
    </Link>
</div>
            {/* Me falta el "Ver más" pero no se que poner al pulsarlo*/}
        </div>
    )
}