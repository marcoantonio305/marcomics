import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    name: string;
    email: string;
    rol?: {
        id: number;
        rol: string;
    }
}



interface Props {
    users: User[];
}

export default function Index({ users }: Props) {
    const {auth} = usePage().props as any;
    return (
        <AppLayout>
    <div className="div-8">
            <h1 className="text-4xl font-bold mb-6 text-primary">Usuarios</h1>
        <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">

                        <thead>
                            <tr className="text-secondary text-sm">
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id} className="hover">
                                        <td className="font-bold"><Link href={`/users/${user.id}`} className="link link-primary no-underline hover:underline transition-colors">{user.name}</Link></td>
                                        <td className="font-mono">{user.email}</td>
                                        <td>{user.rol ? user.rol.rol : 'Sin rol asignado'}</td>
                                        <td className="text-center">
                                            <div className="flex justify-center gap-2">
                                                {/* <Link href={`/users/${user.id}/edit`} className="btn btn-ghost btn-xs text-info">Editar</Link> */}
                                                {auth.user?.rol_id === 1 && (
                                                    <button onClick={()=> {
                                                        if (confirm('¿Estás seguro de querer eliminar este usuario?')) {
                                                            router.delete(`/users/${user.id}`)
                                                        }
                                                    }} className="btn btn-ghost btn-xs text-error">Eliminar</button>
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
        <div className="mt-4">
            {auth.user?.rol_id === 1 && (
                        <Link href="dashboard" className="btn btn-success">
                            Volver al dashboard
                        </Link>
            )}
                    </div>
    </div>
    </AppLayout>
    );
}