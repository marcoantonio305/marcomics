import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import appLayout from '@/layouts/app-layout';
import AppLayout from '@/layouts/app-layout';
import { BotonBase } from '@/components/ui/Cuerpo/BotonBase';

interface Editora {
    id: number;
    nombre: string;
}

interface Props {
    editoras: Editora[];
}

export default function Index({ editoras }: Props) {
    const {auth} = usePage().props as any;
    return (
        <AppLayout>
        <div className="div-8">
            <h1 className="text-4xl font-bold mb-6 text-primary">Editorial</h1>

            <div className="card bg-base-100 shadow-xl border border-base-300 p-4">
                {editoras.length > 0 ? (
                    <div className="space-y-2">
                        {editoras.map((editora) => (
                            <div key={editora.id} className="flex items-center justify-between gap-2">
                                <span className="text-xl font-bold text-primary">{editora.nombre}</span>
                                <BotonBase
                                                                                                onClick={()=> {
                                                                                            if (confirm('¿Estás seguro de querer eliminar este editora?')) {
                                                                                                router.delete(`/editoras/${editora.id}`)
                                                                                            }
                                                                                        }}
                                                                                                texto="Eliminar Editorial"
                                                                                                colorFondo="bg-red-600"
                                                                                                hoverFondo="hover:bg-white"
                                                                                                hoverTexto="hover:text-red-600"
                                                                                                colorTexto="text-white"
                                                                                                borderClass="border border-red-700"
                                                                                                tamano="xs"
                                                                                                className="py-1 px-2 text-xs"
                                                                                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No hay editoras</p>
                )}
            </div>

            <div className="mt-4 flex flex-cols gap-5 ml-5">
                {auth.user?.rol_id !== 3 && (
                <BotonBase
                                                                texto="Añadir Editorial"
                                                                colorFondo="bg-indigo-600"
                                                                hoverFondo="hover:bg-white"
                                                                hoverTexto='hover:text-indigo-600'
                                                                colorTexto="text-white"
                                                                borderClass="border border-indigo-700"
                                                                tamano="sm"
                                                                className="gap-2"
                                                                onClick={() => router.visit('/editoras/create')}
                                                            />
                )}
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
                        </div>
        </div>
        </AppLayout>
    );
}