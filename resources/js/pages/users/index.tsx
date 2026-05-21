import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { BotonBase } from '@/components/ui/Cuerpo/BotonBase';

interface User {
    id: number;
    name: string;
    email: string;
    deleted_at: string | null;
    rol_id: number | null;
    rol?: {
        id: number;
        rol: string;
    }
    nombre: string;
    apellido1: string;
    apellido2: string;
}



interface Props {
    users: User[];
}

export default function Index({ users }: Props) {
    const {auth} = usePage().props as any;
    return (
        <AppLayout>
    <div className="div-8">
            <h1 className="text-4xl font-bold mb-6 mt-6 ml-6 text-green-700 w-40">Usuarios</h1>
        <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">

                        <thead>
                            <tr className="text-secondary text-sm">
                                <th>Nombre de usuario</th>
                                <th>Nombre completo</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id} className="hover">
                                        <td className="font-bold"><Link href={`/users/${user.id}`} className="text-blue-600 hover:text-blue-700 no-underline hover:underline transition-colors">{user.name}</Link></td>
                                        <td className="font-mono">{user.nombre} {user.apellido1} {user.apellido2}</td>
                                        <td>{user.email}</td>
                                        <td>{user.rol ? user.rol.rol : 'Sin rol asignado'}</td>
                                        <td className="text-center">
    <div className="flex justify-center gap-2">
        {auth.user?.rol_id === 1 && (
            <>
                {!user.deleted_at && (
                    <>
                        {user.rol_id === 3 && (
                            <BotonBase
                                                                                                onClick={() => {
                                if (confirm('¿Estás seguro de querer cambiar el rol de este usuario a Vendedor?')) {
                                    router.patch(`/users/${user.id}/modificar-rol`, { rol_id: 2 })
                                }
                            }}
                                                                                                texto="Cambiar a Vendedor"
                                                                                                colorFondo="bg-cyan-500" 
                                                                                                hoverFondo="hover:bg-white"
                                                                                                colorTexto="text-white"
                                                                                                hoverTexto="hover:text-cyan-500"
                                                                                                borderClass="border border-cyan-600"
                                                                                                tamano="xs"
                                                                                                className="gap-2"
                                                                                            />
                        )}
                        {user.rol_id === 2 && (
                            <BotonBase
                                                                                                onClick={() => {
                                if (confirm('¿Estás seguro de querer cambiar el rol de este usuario a Usuario?')) {
                                    router.patch(`/users/${user.id}/modificar-rol`, { rol_id: 3 })
                                }
                            }}
                                                                                                texto="Cambiar a Usuario"
                                                                                                colorFondo="bg-orange-500" 
                                                                                                hoverFondo="hover:bg-white"
                                                                                                colorTexto="text-white"
                                                                                                hoverTexto="hover:text-orange-500"
                                                                                                borderClass="border border-orange-600"
                                                                                                tamano="xs"
                                                                                                className="gap-2"
                                                                                            />
                        )}
                    </>
                )}
                {user.deleted_at ? (
                    <BotonBase
                                                                                                onClick={() => {
                        if (confirm('¿Estás seguro de querer restaurar este usuario?')) {
                            router.patch(`/users/${user.id}/restore`)
                        }
                    }}
                                                                                                texto="Restaurar"
                                                                                                colorFondo="bg-green-500" 
                                                                                                hoverFondo="hover:bg-white"
                                                                                                colorTexto="text-white"
                                                                                                hoverTexto="hover:text-green-500"
                                                                                                borderClass="border border-green-600"
                                                                                                tamano="xs"
                                                                                                className="gap-2"
                                                                                            />
                ) : (
                    auth.user.id !== user.id && (
                        <BotonBase
                                                                                                onClick={() => {
                            if (confirm('¿Estás seguro de querer eliminar este usuario?')) {
                                router.delete(`/users/${user.id}`)
                            }
                        }}
                                                                                                texto="Eliminar"
                                                                                                colorFondo="bg-red-500" 
                                                                                                hoverFondo="hover:bg-white"
                                                                                                colorTexto="text-white"
                                                                                                hoverTexto="hover:text-red-500"
                                                                                                borderClass="border border-red-600"
                                                                                                tamano="xs"
                                                                                                className="gap-2"
                                                                                            />
                    )
                )}
            </>
        )}
    </div>
</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center py-10 text-gray-400">
                                        No hay usuarios registrados actualmente.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        {/*<div>
            <Link href="/users/create" className='btn btn-primary'>
            Añadir Usuario
            </Link>
        </div>*/}
        <div className="mt-4 ml-5 mt-3">
            {auth.user?.rol_id === 1 && (
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
    </AppLayout>
    );
}