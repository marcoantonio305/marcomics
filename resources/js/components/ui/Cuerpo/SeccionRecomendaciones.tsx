import React from 'react';
import ComicIndividual from '@/components/ui/Cuerpo/ComicIndividual';

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
}

interface SeccionRecomendacionesProps {
    comics: Comic[];
}

export default function SeccionRecomendaciones({ comics }: SeccionRecomendacionesProps) {
    if (!comics || comics.length === 0) return null;

    return (
        <div className="mx-5 my-4 p-4 bg-card text-card-foreground rounded-lg shadow-sm border overflow-hidden">
            <h3 className="text-xl font-bold text-pink-700 mb-2 flex items-center gap-2 px-4">
                Recomendados para ti
            </h3>
            
            <div 
                className="flex gap-2 overflow-x-auto pb-4 pt-2 px-4 scroll-smooth snap-x snap-mandatory" 
                style={{ scrollbarWidth: 'thin' }}
            >
                {comics.map((item) => (
                    <div 
                        key={item.id} 
                        className="flex-shrink-0 snap-start transform scale-95 origin-top transition-transform duration-200 hover:scale-100
                                   w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                    >
                        <ComicIndividual comic={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}