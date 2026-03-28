import Biblioteca from "@/components/ui/Cuerpo/Biblioteca";
import AppLayout from "@/layouts/app-layout";
import React from "react";

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
    return (
        <AppLayout>
            <div className="div-8">
                <h1 className="text-4xl font-bold mb-6 text-primary">Perfil de {user.name}</h1>
                <div className="flex flex-col ">
                    <img src={user.foto_perfil} alt={`${user.name} foto de perfil`} className="w-48 h-48 rounded-full object-cover mb-4" />
                    <div className="flex flex-row">
                        <h1 className="text-3xl font-bold">{user.name}</h1>
                        <div className="bg-grey-500">{user.biografia}</div>
                    </div>
                </div>
                <Biblioteca user={user} />
                </div>
        </AppLayout>
    );
}