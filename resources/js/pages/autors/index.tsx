import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import appLayout from '@/layouts/app-layout';
import AppLayout from '@/layouts/app-layout';

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
                                <button
                                    onClick={() => {
                                        if (confirm('¿Estás seguro de querer eliminar este autor?')) {
                                            router.delete(`/autors/${autor.id}`);
                                        }
                                    }}
                                    className="btn btn-ghost btn-xs text-error"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No hay autores</p>
                )}
            </div>

            <div className="mt-4">
                {auth.user?.rol_id !== 3 && (
                <Link href="/autors/create" className="btn btn-primary">
                    Añadir Autor
                </Link>
                )}
            </div>
            <div className="mt-4">
                {auth.user?.rol_id !== 3 && (
                <Link href="dashboard" className="btn btn-success">
                    Volver al dashboard
                </Link>
                )}
            </div>
        </div>
        </AppLayout>
    );
}