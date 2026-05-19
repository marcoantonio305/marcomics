import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ComicIndividual from '@/components/ui/Cuerpo/ComicIndividual';

interface Categoria {
    id: number;
    nombre: string;
}

interface Autor {
    id: number;
    nombre: string;
}

interface Comic {
    id: number;
    titulo: string;
    precio: number;
    lanzamiento: string;
    descripcion: string;
    imagen: string;
    stock: number;
    autors: Autor[];
    categorias: Categoria[];
}

interface Props {
    comics: Comic[];
    todas_las_categorias: Categoria[];
    filtros: {
        search: string;
        categorias_ids: number[];
        fecha_inicio: string;
        fecha_fin: string;
    };
}

export default function Busqueda({ comics, todas_las_categorias, filtros }: Props) {
    const [selectedCats, setSelectedCats] = useState<number[]>(filtros.categorias_ids || []);
    const [fechaInicio, setFechaInicio] = useState(filtros.fecha_inicio || '');
    const [fechaFin, setFechaFin] = useState(filtros.fecha_fin || '');

    const aplicarFiltros = (updatedCats = selectedCats, start = fechaInicio, end = fechaFin) => {
        router.get('/buscar', {
            search: filtros.search,
            categorias_ids: updatedCats,
            fecha_inicio: start,
            fecha_fin: end
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleCategoriaChange = (id: number) => {
        const updated = selectedCats.includes(id)
            ? selectedCats.filter(catId => catId !== id)
            : [...selectedCats, id];
        
        setSelectedCats(updated);
        aplicarFiltros(updated, fechaInicio, fechaFin);
    };

    return (
        <AppLayout>
            <div className="p-8">
                <h1 className="text-4xl font-black text-blue-700 mb-6">
                    {filtros.search ? `Resultados para: "${filtros.search}"` : 'Catálogo de Búsqueda'}
                </h1>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-64 flex-shrink-0 bg-gray-50 border p-4 rounded-lg h-fit">
                        <h2 className="font-bold text-lg text-gray-700 border-b pb-2 mb-4">Filtros</h2>
                        
                        <div className="mb-6">
                            <h3 className="font-semibold text-sm text-gray-600 mb-2">Categorías</h3>
                            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2">
                                {todas_las_categorias.map((cat) => (
                                    <label key={cat.id} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedCats.includes(cat.id)}
                                            onChange={() => handleCategoriaChange(cat.id)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        {cat.nombre}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold text-sm text-gray-600 mb-2">Fecha de lanzamiento</h3>
                            <div className="flex flex-col gap-3">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Desde:</label>
                                    <input
                                        type="date"
                                        value={fechaInicio}
                                        onChange={(e) => {
                                            setFechaInicio(e.target.value);
                                            aplicarFiltros(selectedCats, e.target.value, fechaFin);
                                        }}
                                        className="w-full text-xs border p-2 rounded bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Hasta:</label>
                                    <input
                                        type="date"
                                        value={fechaFin}
                                        onChange={(e) => {
                                            setFechaFin(e.target.value);
                                            aplicarFiltros(selectedCats, fechaInicio, e.target.value);
                                        }}
                                        className="w-full text-xs border p-2 rounded bg-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        {comics.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {comics.map((comic) => (
                                    <ComicIndividual key={comic.id} comic={comic} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-xl font-bold italic text-gray-400">
                                No se encontraron cómics con los criterios seleccionados.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}