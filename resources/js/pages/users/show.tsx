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

interface Props {
    user: User;
    rol: Rol;
    comics: Comic[];
}

export default function Show({ user}: Props) {
    const { auth } = usePage().props as any;
    return (
        <AppLayout>
            <div className="div-8 ml-8">
                <div className="text-4xl font-bold mb-6 mt-5 text-blue-600">Perfil de {user.name} 
                    <Link href={`/users/${user.id}/edit`} className="ml-4 inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                            <Settings className="mr-2" />
                            Configurar perfil
                        </Link></div>
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
                </div>
        </AppLayout>
    );
}