import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import appLayout from '@/layouts/app-layout';
import AppLayout from '@/layouts/app-layout';

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
            <h1 className="text-4xl font-bold mb-6 text-primary">Editoras</h1>

            <div className="card bg-base-100 shadow-xl border border-base-300 p-4">
                {editoras.length > 0 ? (
                    <div className="space-y-2">
                        {editoras.map((editora) => (
                            <div key={editora.id} className="flex items-center justify-between gap-2">
                                <span className="text-xl font-bold text-primary">{editora.nombre}</span>
                                <button
                                    onClick={() => {
                                        if (confirm('¿Estás seguro de querer eliminar este editora?')) {
                                            router.delete(`/editoras/${editora.id}`);
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
                    <p className="text-center text-gray-500">No hay editoras</p>
                )}
            </div>

            <div className="mt-4">
                {auth.user?.rol_id !== 3 && (
                <Link href="/editoras/create" className="btn btn-primary">
                    Añadir Editora
                </Link>
                )}
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