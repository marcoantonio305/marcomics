import AppLayout from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";
import React from "react";

interface User {
    id: number;
    name: string;
    comics: Comic[];
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
}

export default function Biblioteca({ user }: Props) {
    return (
        <div className="div-8 rounded-lg border border-black p-6 mb-6 bg-violet-200">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Favoritos</h1>
            <div className="flex flex-wrap gap-6 bg-violet-200">
                {user.comics.map((comic) => (
                    <div key={comic.id} className="bg-violet-200 rounded-lg shadow-md overflow-hidden">
                        <Link href={`/comics/${comic.id}`}>
                            <img src={comic.imagen ? `/storage/${comic.imagen}` : '/img/default-comic.png'} alt={comic.titulo} className="w-32 h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                        </Link>
                        <h2 className="text-xl font-bold mb-2">{comic.titulo}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
};