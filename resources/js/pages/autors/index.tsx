import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import appLayout from '@/layouts/app-layout';
import AppLayout from '@/layouts/app-layout';
import { BotonBase } from '@/components/ui/Cuerpo/BotonBase';

interface Autor {
    id: number;
    nombre: string;
}

interface Props {
    autors: Autor[];
}

export default function Index({ autors }: Props) {
    const {auth} = usePage().props as any;
    return (
        <AppLayout>
        <div className="div-8">
            <h1 className="text-4xl font-bold mb-6 text-primary">Autores</h1>

            <div className="card bg-base-100 shadow-xl border border-base-300 p-4">
                {autors.length > 0 ? (
                    <div className="space-y-2">
                        {autors.map((autor) => (
                            <div key={autor.id} className="flex items-center justify-between gap-2">
                                <span className="text-xl font-bold text-primary">{autor.nombre}</span>
                                <BotonBase
                                    onClick={() => {
                                        if (confirm('¿Estás seguro de querer eliminar este autor?')) {
                                            router.delete(`/autors/${autor.id}`);
                                        }
                                    }}
                                    texto="Eliminar"
                                    colorFondo="bg-red-600"
                                    hoverFondo="hover:bg-white"
                                    hoverTexto="hover:text-red-600"
                                    colorTexto="text-white"
                                    borderClass="border-red-700"
                                    tamano='sm text-ms'
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No hay autores</p>
                )}
            </div>

            <div className="flex flex-cols mt-4 ml-5 mb-5 gap-5">
                <div>
                {auth.user?.rol_id !== 3 && (
                <BotonBase
                    onClick={() => router.visit(`/autors/create`)}
                    texto="Añadir Autor"
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
            <div>
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