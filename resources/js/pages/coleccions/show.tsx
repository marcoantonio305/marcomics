import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import SeccionRecomendaciones from '@/components/ui/Cuerpo/SeccionRecomendaciones';

interface Coleccion {
    id: number;
    nombre: string;
    mostrar_inicio: boolean;
    orden: number;
    imagen?: string;
}

interface Comic {
    id: number;
    titulo: string;
    precio: number;
    lanzamiento: string;
    descripcion: string;
    imagen: string;
    stock: number;
    autors: {
        id: number;
        nombre: string;
    }[];
    categorias: {
        id: number;
        nombre: string;
    }[];
}

interface Props {
    coleccion: Coleccion;
    comicsColeccion: Comic[];
    comicsDisponible: Comic[];
    comicsRecomendados?: Comic[];
}

export default function Show({coleccion, comicsColeccion, comicsDisponible, comicsRecomendados = []}:Props) {
    const ComicsColeccion = comicsColeccion || [];
    const ComicsDisponible = comicsDisponible || [];
    const auth = usePage().props.auth as any;

    const anadir = (comicId: number) => {
        router.post(`/coleccions/${coleccion.id}/comics/${comicId}`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                alert('Comic añadido a la colección');
            }
        });
    }

    const eliminar = (comicId: number) => {
        router.delete(`/coleccions/${coleccion.id}/comics/${comicId}`, {
            preserveScroll: true,
            onSuccess: () => {
                alert('Comic eliminado de la colección');
            }
        });
    }

    const gestionarInicio = (orden: number) => {
        router.post(`/coleccions/${coleccion.id}/al-inicio`, { orden }, {
            preserveScroll: true,
            onSuccess: () => {
                alert(`Colección asignada al slot ${orden} del inicio`);
            }
        });
    }
    
    const quitarDeInicio = () => {
        router.delete(`/coleccions/${coleccion.id}/quitar-inicio`, {
            preserveScroll: true,
            onSuccess: () => {
                alert('Colección quitada del inicio');
            }
        });
    }

    return (
        <AppLayout>
        <div className='p-8 flex flex-col'>
            <h1 className='text-4xl font-black text-blue-700'>{coleccion.nombre}</h1>
            <img className="w-64 h-96 object-contain mt-4" src={coleccion.imagen ? `/storage/${coleccion.imagen}` : '/img/default-category.png'} alt="Imagen de colección" />
            <div className="flex gap-4 mt-4">
            {auth.user?.rol_id === 1 && (
                        <Link href={`/coleccions/${coleccion.id}/edit`} className='btn btn-secondary mr-4'>Editar colección</Link>
                        )}
            {auth.user?.rol_id === 1 && (
                <button 
        onClick={() => router.delete(`/coleccions/${coleccion.id}`)} 
        className='btn btn-warning mr-4' 
    >
        Eliminar colección
    </button>
            )}
            {/* {auth.user?.rol_id === 1 && (
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-4">
                            <p className="font-bold text-sm text-blue-800">Escoger su posición en el Inicio:</p>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(num => (
                                    <button
                                        key={num}
                                        onClick={() => gestionarInicio(num)}
                                        className={`w-8 h-8 rounded font-bold transition-all border ${
                                            coleccion.orden === num 
                                            ? 'bg-blue-600 text-white border-blue-700' 
                                            : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-100'
                                        }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                            {coleccion.mostrar_inicio && (
                                <button 
                                    onClick={quitarDeInicio}
                                    className="btn text-xs font-bold bg-red-400 text-white hover:bg-red-500 ml-2"
                                >
                                    Quitar de inicio
                                </button>
                            )}
                        </div>
                    )} */}
            </div>
            <div className='flex flex-col gap-6 mt-6'>
                <h1 className='text-gray-600 text-3xl font-bold'>Comics en la colección</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
                {ComicsColeccion.length > 0 ? (
                    ComicsColeccion.map(comic => (
                    <div key={comic.id} className='flex flex-col gap-2'>
                        <Link href={`/comics/${comic.id}`}><img className="w-32 h-48" src={comic.imagen ? `/storage/${comic.imagen}` : ''} alt="Imagen" /></Link>
                        <h2 className='font-bold'>{comic.titulo}</h2>
                        {comic.autors?.length > 0 ? (
                            <p>
                            {comic.autors.map(autor => autor.nombre).join(', ')}
                                </p>
                        ) : (<p className="font-bold italic text-gray-400">Anónimo</p>)}
                        <p>{comic.lanzamiento}</p>
                        <p>{comic.precio}</p>
                        {auth.user?.rol_id === 1 && (
                            <button className='btn bg-yellow-500 text-black-500 w-50' onClick={() => eliminar(comic.id)}>
                                Eliminar de colección
                            </button>
                        )}
                    </div>
                    
                ))
                ) : (
                    <p className="text-xl font-bold italic text-gray-400">No hay comics en esta categoría.</p>
                )
            }
            </div>

            {auth.user?.rol_id === 1 && (
                <>
                    <h1 className='text-gray-500 text-3xl font-bold mt-6'>Comics disponibles</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
                    {ComicsDisponible.length > 0 ? (
                        ComicsDisponible.map(comic => (
                            <div key={comic.id} className='flex flex-col gap-2'>
                                <Link href={`/comics/${comic.id}`}><img className="w-32 h-48" src={comic.imagen ? `/storage/${comic.imagen}` : ''} alt="Imagen" /></Link>
                                <h2 className='font-bold'>{comic.titulo}</h2>
                                {comic.autors?.length > 0 ? (
                                    <p>
                                    {comic.autors.map(autor => autor.nombre).join(', ')}
                                        </p>
                                ) : (<p className="font-bold italic text-gray-400">Anónimo</p>)}
                                <p>{comic.lanzamiento}</p>
                                <p>{comic.precio}€</p>
                                <button className='btn bg-blue-400 text-black-500 w-50' onClick={() => anadir(comic.id)}>
                                    Añadir a colección
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-xl font-bold italic text-gray-400">No hay comics disponibles.</p>
                    )}
                    </div>
                </>
            )}
            </div>

            <div className="mt-12">
                <SeccionRecomendaciones comics={comicsRecomendados} />
            </div>
        </div>
        </AppLayout>
    )
}