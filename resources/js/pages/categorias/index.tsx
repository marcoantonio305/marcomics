import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import appLayout from '@/layouts/app-layout';
import AppLayout from '@/layouts/app-layout';
import { BotonBase } from '@/components/ui/Cuerpo/BotonBase';

interface Categoria {
    id: number;
    nombre: string;
}

interface Props {
    categorias: Categoria[];
}

export default function Index({ categorias }: Props) {
    const {auth} = usePage().props as any;
    return (
        <AppLayout>
        <div className="div-8">
            <h1 className="text-4xl font-bold mb-6 text-pink-700 mt-5 ml-5">Categorías</h1>

            <div className="card bg-base-100 shadow-xl border border-base-300 p-4">
                {categorias.length > 0 ? (
                    <div className="space-y-2">
                        {categorias.map((categoria) => (
                            <div key={categoria.id} className="flex flex-rows items-center justify-between">
                                <Link href={`/categorias/${categoria.id}`} className="text-blue-500 hover:underline transition-colors"><span className="text-xl font-bold text-blue-700">{categoria.nombre}</span></Link>
                                <div className='flex flex-cols gap-3'>
                                <BotonBase
                                    onClick={() => router.visit(`/categorias/${categoria.id}/edit`)}
                                    texto="Editar"
                                    colorFondo="bg-blue-600"
                                    hoverFondo="hover:bg-white"
                                    hoverTexto="hover:text-blue-600"
                                    colorTexto="text-white"
                                    borderClass="border-blue-700"
                                    tamano="btn btn-ghost btn-xs"
                                />
                                <BotonBase
                                    onClick={() => {
                                        if (confirm('¿Estás seguro de querer eliminar esta categoría?')) {
                                            router.delete(`/categorias/${categoria.id}`);
                                        }
                                    }}
                                    texto="Eliminar"
                                    colorFondo="bg-red-600"
                                    hoverFondo="hover:bg-white"
                                    hoverTexto="hover:text-red-600"
                                    colorTexto="text-white"
                                    borderClass="border-red-700"
                                    tamano="btn btn-ghost btn-xs"
                                />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No hay autores</p>
                )}
            </div>

<div className='flex flex-rows gap-5 ml-6 mt-2 mb-5'>
            <div className="mt-4">
                {auth.user?.rol_id !== 3 && (
                <BotonBase
                                    onClick={() => router.visit(`/categorias/create`)}
                                    texto="Añadir Categoría"
                                    colorFondo="bg-indigo-600" 
                                                                hoverFondo="hover:bg-white"
                                                                hoverTexto="hover:text-indigo-500"
                                                                colorTexto="text-white"
                                                                borderClass="border-indigo-700"
                                                                tamano="sm"
                                                                className="gap-2"
                                                            />
                )}
            </div>
            <div className="mt-4">
                {auth.user?.rol_id !== 3 && (
                            <BotonBase
    onClick={() => router.visit(`/dashboard`)}
    texto="Volver al dashboard"
    colorFondo="bg-zinc-800" 
    hoverFondo="hover:bg-white"
    colorTexto="text-white"
    hoverTexto="hover:text-zinc-800"
    borderClass="border border-zinc-900"
    tamano="sm"
    className="gap-2"
/>
                        )}
                        </div>
                        </div>
        </div>
        </AppLayout>
    );
}