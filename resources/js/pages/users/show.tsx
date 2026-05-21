import Biblioteca from "@/components/ui/Cuerpo/Biblioteca";
import AppLayout from "@/layouts/app-layout";
import React from "react";
import { usePage, Link, useForm } from "@inertiajs/react"
import { Settings, Cross } from "lucide-react";

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

interface Suscripcion {
    id: number;
    subscribable_type: string;
    subscribable_id: number;
    subscribable?: {
        id: number;
        nombre: string;
    };
}

interface Props {
    user: User;
    rol: Rol;
    comics: Comic[];
}

export default function Show({ user, compras, esAdmin, suscripciones = [] }: {user: User, compras: Compra[], esAdmin: boolean, suscripciones: Suscripcion[]}) {
    const { auth } = usePage().props as any;
    const { data, setData, delete: destroy, processing, reset } = useForm({
        subscribable_type: '',
        subscribable_id: 0
    });

    const handleUnsubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.subscribable_type || !data.subscribable_id) return;


        destroy('/suscripciones', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                alert('Te has desuscrito correctamente.');
            }
        });
    };

    return (
        <AppLayout>
            <div className="div-8 ml-8">
                <div className="text-4xl font-bold mb-6 mt-5 text-blue-600">Perfil de {user.name} 
                    {auth.user?.id === user.id && (
                    <Link href={`/users/${user.id}/edit`} className="ml-4 inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-white hover:text-blue-600 border-2 border-blue-600 transition-colors">
                            <Settings className="mr-2" />
                            Configurar perfil
                        </Link>
                    )}
                        </div>
                <div className="flex flex-cols gap-6 mb-8 mr-8">
                    <img src={user.foto_perfil ? `/storage/${user.foto_perfil}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}&background=random`} alt={`${user.name} foto de perfil`} className="w-48 h-48 rounded-full object-cover mb-4" />
                    <div className="flex flex-cols gap-4">
                        <h1 className="text-3xl text-red font-bold">{user.name}</h1>
<div className="bg-gray-200 rounded-md border border-black p-4 w-[800px] h-40 ml-8">
    {user.biografia ? (
        user.biografia
    ) : (
        <span className="italic text-gray-700">
            El usuario no tiene una biografía escrita.
        </span>
    )}
</div>
                    </div>
                </div>

                {auth.user?.id === user.id && (
                    <div className="mx-5 my-6 p-4 border-3 border-blue-500 rounded-lg bg-card text-card-foreground shadow-sm max-w-2xl">
                        <h3 className="text-xl text-blue-700 font-semibold mb-2 flex items-center gap-2">
                            Mis Suscripciones Activas
                        </h3>
                        <p className="text-xs text-muted-foreground mb-4">
                            Selecciona una de tus suscripciones actuales si deseas dejar de recibir correos de sus novedades.
                        </p>

                        {suscripciones.length > 0 ? (
                            <form onSubmit={handleUnsubscribe} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                                <div className="flex-1">
                                    <select 
                                        className="select select-bordered w-full text-sm h-10 px-3 rounded-md border bg-background text-black"
                                        value={data.subscribable_type ? `${data.subscribable_type}:${data.subscribable_id}` : ''}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (!value) {
                                                setData({ subscribable_type: '', subscribable_id: 0 });
                                                return;
                                            }
                                            const [type, id] = value.split(':');
                                            setData({
                                                subscribable_type: type,
                                                subscribable_id: Number(id)
                                            });
                                        }}
                                    >
                                        <option value="">Selecciona una suscripción para eliminar</option>
                                        
                                        <optgroup label="Categorías / Colecciones">
                                            {suscripciones.map((sub) => {
                                                const tipoNombre = sub.subscribable_type.includes('Categoria') ? 'Categoría' : 'Colección';
                                                return (
                                                    <option key={sub.id} value={`${sub.subscribable_type}:${sub.subscribable_id}`}>
                                                        {tipoNombre}: {sub.subscribable?.nombre || `ID: ${sub.subscribable_id}`}
                                                    </option>
                                                );
                                            })}
                                        </optgroup>
                                    </select>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn bg-black text-white h-10 px-6 font-medium rounded-md transition-all duration-200 transform hover:bg-red-600 hover:scale-105 disabled:opacity-50"
                                    disabled={processing || !data.subscribable_type}
                                >
                                    {processing ? 'Cancelando...' : 'Desuscribirse'}
                                </button>
                            </form>
                        ) : (
                            <p className="text-sm italic text-gray-500">No estás suscrito a ninguna categoría o colección actualmente.</p>
                        )}
                    </div>
                )}

                {auth.user?.id === user.id && (
                    <div className="flex mb-4">
                        {/* <Link href={`/users/${user.id}/edit`} className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                            <Settings className="mr-2" />
                            Configurar perfil
                        </Link> */}
                    </div>
                )}
                <Biblioteca user={user} />
                {/*
                {(auth.user?.id === user.id || esAdmin) && (
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
                */}
                </div>
        </AppLayout>
    );
}
