import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Coleccion {
    id: number;
    nombre: string;
    mostrar_inicio: boolean;
    orden: number;
    es_destacado: boolean;
    posicion_destacado: number | null;
}

interface Props {
    coleccions: Coleccion[];
}

export default function Index({ coleccions }: Props) {
    const {auth} = usePage().props as any;

    const gestionarInicio = (coleccionId: number, ordenSeleccionado: number) => {
        router.post(`/coleccions/${coleccionId}/al-inicio`, {
            orden: ordenSeleccionado 
        }, { preserveScroll: true });
    };

    const quitarDeInicio = (coleccionId: number) => {
        router.delete(`/coleccions/${coleccionId}/quitar-inicio`, { preserveScroll: true });
    };

    const gestionarDestacado = (coleccionId: number, posicionSeleccionada: number) => {
        router.post(`/coleccions/${coleccionId}/destacado`, {
            posicion: posicionSeleccionada 
        }, { preserveScroll: true });
    }

    const quitarDestacado = (coleccionId: number) => {
        router.delete(`/coleccions/${coleccionId}/quitar-destacado`, { preserveScroll: true });
    }
    
    return (
        <AppLayout>
        <div className="div-8">
            <h1 className="text-4xl font-bold mb-6 mt-4 text-blue-700">Colecciones</h1>
<div className="bg-white p-4 border-2 border-black mb-10">
                    <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                        <span className="text-blue-600">Órden de las colecciones en el inicio</span>
                    </h2>
                    <div className="grid grid-cols-5 gap-2">
                        {[1, 2, 3, 4, 5].map(orden => {
                            const ocupante = coleccions.find(c => c.mostrar_inicio && c.orden === orden);
                            return (
                                <div key={orden} className={`border-2 border-black p-2 text-center ${ocupante ? 'bg-blue-50' : 'bg-gray-50 opacity-40'}`}>
                                    <p className="text-[10px] font-black text-gray-400">POS {orden}</p>
                                    <p className="font-bold text-[11px] truncate uppercase">
                                        {ocupante ? ocupante.nombre : 'Vacío'}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-white p-4 border-2 border-black mb-10">
    <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
        <span className="text-green-600">Columnas Destacadas (Lateral)</span>
    </h2>
    <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map(pos => {
            const ocupante = coleccions.find(c => c.es_destacado && c.posicion_destacado === pos);
            return (
                <div key={pos} className={`border-2 border-black p-2 text-center ${ocupante ? 'bg-green-50' : 'bg-gray-50 opacity-40'}`}>
                    <p className="text-[10px] font-black text-gray-400">COLUMNA {pos}</p>
                    <p className="font-bold text-[11px] truncate uppercase">
                        {ocupante ? ocupante.nombre : 'Vacío'}
                    </p>
                </div>
            );
        })}
    </div>
</div>

            <div className="space-y-4">
                    {coleccions.map((coleccion) => (
                        <div key={coleccion.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white border-2 border-black hover:bg-gray-50 transition-colors">
                            
                            <div className="mb-4 md:mb-0">
                                <Link className='text-xl font-bold text-blue-600 hover:underline' href={`/coleccions/${coleccion.id}`}>
                                    {coleccion.nombre}
                                </Link>
                                {coleccion.mostrar_inicio && (
                                    <div className="mt-1">
                                        <span className="text-pink-500 text-[10px] font-black px-2 py-0.5 border border-black">
                                            En Inicio, en la posición {coleccion.orden}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-black uppercase">Orden:</label>
                                    <select 
                                        id={`select-orden-${coleccion.id}`}
                                        className="select select-bordered select-sm border-2 border-black font-bold h-10"
                                        defaultValue={coleccion.orden || 1}
                                    >
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <option key={n} value={n}>{n}</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    onClick={() => {
                                        const select = document.getElementById(`select-orden-${coleccion.id}`) as HTMLSelectElement;
                                        gestionarInicio(coleccion.id, Number(select.value));
                                    }}
                                    className="btn bg-blue-600 text-white font-bold text-xs px-3 py-2 border-2 hover:bg-blue-700"
                                >
                                    {coleccion.mostrar_inicio ? 'Cambiar Orden' : 'Añadir a Inicio'}
                                </button>

                                {coleccion.mostrar_inicio && (
                                    <button
                                        onClick={() => quitarDeInicio(coleccion.id)}
                                        className="btn bg-orange-400 text-black font-bold text-xs px-3 py-2 border-2 hover:bg-red-600"
                                    >
                                        Quitar
                                    </button>
                                )}

                                <div className="flex items-center gap-2 border-l-2 border-gray-200 pl-4">
    <label className="text-xs font-black uppercase">Columna:</label>
    <select 
        id={`select-destacado-${coleccion.id}`}
        className="select select-bordered select-sm border-2 border-black font-bold h-10"
        defaultValue={coleccion.posicion_destacado || 1}
    >
        {[1, 2, 3].map(n => (
            <option key={n} value={n}>{n}</option>
        ))}
    </select>

    <button
        onClick={() => {
            const select = document.getElementById(`select-destacado-${coleccion.id}`) as HTMLSelectElement;
            gestionarDestacado(coleccion.id, Number(select.value));
        }}
        className="btn bg-green-600 text-white font-bold text-xs px-3 py-2  hover:bg-green-700 "
    >
        {coleccion.es_destacado ? 'Mover' : 'Añadir a Destacados'}
    </button>

    {coleccion.es_destacado && (
        <button
            onClick={() => quitarDestacado(coleccion.id)}
            className="btn bg-red-500 text-white font-bold text-xs px-3 py-2  hover:bg-red-600"
        >
            Quitar
        </button>
    )}
</div>

                                <div className="h-6 w-[2px] bg-black mx-2 hidden md:block"></div>

                                <Link href={`/coleccions/${coleccion.id}/edit`} className="btn bg-purple-700 text-white font-bold text-xs px-3 py-2 border-2 hover:bg-green-700">
                                    Editar
                                </Link>

                                <button
                                    onClick={() => confirm('¿Borrar?') && router.delete(`/coleccions/${coleccion.id}`)}
                                    className="btn bg-yellow-400 text-black font-bold text-xs px-3 py-2 border-2 hover:bg-yellow-500"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
<div className="flex flex-row mb-4">
            <div className="mt-4 ml-4 mr-2">
                {auth.user?.rol_id === 1 && (
                <Link href="/coleccions/create" className="btn btn-primary">
                    Añadir Colección
                </Link>
                )}
            </div>
            <div className="mt-4 ml-4">
                {auth.user?.rol_id === 1 && (
                <Link href="dashboard" className="btn btn-success">
                    Volver al dashboard
                </Link>
                )}
            </div>
            </div>
        </div>

        </AppLayout>
    );
}