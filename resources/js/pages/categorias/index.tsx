import React from 'react';
import { Link, router } from '@inertiajs/react';
import appLayout from '@/layouts/app-layout';
import AppLayout from '@/layouts/app-layout';

interface Categoria {
    id: number;
    nombre: string;
}

interface Props {
    categorias: Categoria[];
}

export default function Index({ categorias }: Props) {
    return (
        <AppLayout>
        <div className="div-8">
            <h1 className="text-4xl font-bold mb-6 text-primary">Categorías</h1>

            <div className="card bg-base-100 shadow-xl border border-base-300 p-4">
                {categorias.length > 0 ? (
                    <div className="space-y-2">
                        {categorias.map((categoria) => (
                            <div key={categoria.id} className="flex items-center justify-between gap-2">
                                <Link href={`/categorias/${categoria.id}`} className="link link-primary no-underline hover:underline transition-colors"><span className="text-xl font-bold text-primary">{categoria.nombre}</span></Link>
                                <button
                                    onClick={() => {
                                        if (confirm('¿Estás seguro de querer eliminar este categoria?')) {
                                            router.delete(`/categorias/${categoria.id}`);
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
                <Link href="/categorias/create" className="btn btn-primary">
                    Añadir Categoría
                </Link>
            </div>
            <div className="mt-4">
                            <Link href="dashboard" className="btn btn-success">
                                Volver al dashboard
                            </Link>
                        </div>
        </div>
        </AppLayout>
    );
}