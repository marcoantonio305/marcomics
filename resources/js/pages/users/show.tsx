import Biblioteca from "@/components/ui/Cuerpo/Biblioteca";
import AppLayout from "@/layouts/app-layout";
import React from "react";
import { usePage, Link } from "@inertiajs/react"
import { Settings } from "lucide-react";

interface User {
    id: number;
    name: string;
    email: string;
    foto_perfil?: string;
    biografia?: string;
    rol_id?: number;
    comics: Comic[];
}

interface Rol {
    id: number;
    rol: string;
}

interface Comic {
    id: number;
    titulo: string;
    precio: number;
    lanzamiento: string;
    descripcion: string;
    imagen: string;
}

interface Compra {
    id: number;
    total: number;
    created_at: string;
}

interface Props {
    user: User;
    rol: Rol;
    comics: Comic[];
}

export default function Show({ user, compras, esAdmin }: {user: User, compras: Compra[], esAdmin: boolean}) {
    const { auth } = usePage().props as any;
    return (
        <AppLayout>
            <div className="div-8 ml-8">
                <div className="text-4xl font-bold mb-6 mt-5 text-blue-600">Perfil de {user.name} 
                    {auth.user?.id === user.id && (
                    <Link href={`/users/${user.id}/edit`} className="ml-4 inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                            <Settings className="mr-2" />
                            Configurar perfil
                        </Link>
                    )}
                        </div>
                <div className="flex flex-cols gap-6 mb-8 mr-8">
                    <img src={user.foto_perfil ? `/storage/${user.foto_perfil}` : ''} alt={`${user.name} foto de perfil`} className="w-48 h-48 rounded-full object-cover mb-4" />
                    <div className="flex flex-cols gap-4">
                        <h1 className="text-3xl text-red font-bold">{user.name}</h1>
                        <div className="bg-gray-300 rounded-md border border-black p-4 w-200 h-40 ml-8">{user.biografia}</div>
                    </div>
                </div>
                {auth.user?.id === user.id && (
                    <div className="flex mb-4">
                        {/* <Link href={`/users/${user.id}/edit`} className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                            <Settings className="mr-2" />
                            Configurar perfil
                        </Link> */}
                    </div>
                )}
                <Biblioteca user={user} />
                {esAdmin && (
                <div className="mt-10 p-6 bg-white border-2 border-black-500 rounded-lg shadow-lg mb-5 mt-5">
                    <h2 className="text-2xl font-bold text-pink-700 mb-4">
                        Panel de Administración: Historial de Compras
                    </h2>
                    
                    <table className="table w-full border-collapse border border-gray-300">
                        <thead className="bg-purple-100">
                            <tr  className="text-center">
                                <th className="border border-gray-300 p-2">ID</th>
                                <th className="border border-gray-300 p-2">Fecha</th>
                                <th className="border border-gray-300 p-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compras.map(compra => (
                                <tr key={compra.id} className="text-center">
                                    <td className="border border-gray-300 p-2"><a href={`/compras/${compra.id}`} className="text-blue-500 hover:text-blue-700 hover:underline">
                                        {compra.id}
                                    </a></td>
                                    <td className="border border-gray-300 p-2">
                                        {new Date(compra.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-300 p-2 font-bold text-green-600">
                                        ${Number(compra.total).toFixed(2)}
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
                </div>
        </AppLayout>
    );
}