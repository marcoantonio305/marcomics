import React from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ComponenteMiscomics from '@/components/ui/Cuerpo/componenteMiscomics';

interface User {
    id: number;
    name: string;
    email: string;
    foto_perfil?: string;
    biografia?: string;
    rol_id?: number;
    comics: Comic[];
}

interface Comic {
    id: number;
    titulo: string;
    precio: number;
    lanzamiento: string;
    descripcion: string;
    imagen: string;
    codigo_comic: string;
}

interface Compra {
    id: number;
    total: number;
    created_at: string;
    comics: ComicWithPivot[];
}

interface Pivot {
    compra_id: number;
    comic_id: number;
    cantidad: number;
    precio_unitario: number;
}

interface ComicWithPivot extends Comic {
    pivot: Pivot;
}

interface Props {
    compras: Compra[];
    user: User;
    esAdmin: boolean;
}

export default function miscomicsCompras({ user, compras, esAdmin }: {user: User, compras: Compra[], esAdmin: boolean}) {
    const { auth } = usePage().props as any;

    return (
        <AppLayout>
            <div className="max-w-[90%] mx-auto py-10 sm:px-6 lg:px-8">
                {(auth.user?.id === user.id || esAdmin) && (
                    <div className="space-y-8">
                        <h2 className="text-3xl font-extrabold text-pink-700 border-b-2 border-pink-100 pb-4">
                            Mi Historial de Compras
                        </h2>

                        {compras.map((compra) => (
                            <ComponenteMiscomics key={compra.id} compra={compra}></ComponenteMiscomics>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}