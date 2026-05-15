import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { fechaLarga } from '@/lib/utils';

interface User {
    id: number;
    name: string;
    foto_perfil: string | null;
    rol_id: number;
}

interface Hilo {
    id: number;
    titulo: string;
    contenido: string;
    created_at: string;
    user: User;
}

interface Props {
    hilos: Hilo[];
}

export default function Index({ hilos }: Props) {
    const { auth }: any = usePage().props;

    const borrarHilo = (e: React.MouseEvent, id: number) => {
        e.preventDefault(); 
        if (confirm('¿Estás seguro de borrar este hilo? Se eliminarán todos sus mensajes.')) {
            router.delete(`/hilos/${id}`);
        }
    };

    // CORRECCIÓN: Lógica de avatar más robusta
    const getAvatar = (user: User) => {
        if (user?.foto_perfil) {
            return `/storage/${user.foto_perfil}`;
        }
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=random&color=fff`;
    };

    return (
        <AppLayout>
            <div className="p-8 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl text-blue-600 font-black uppercase tracking-tighter">Foro</h1>
                        <p className="font-bold text-blue-400 uppercase text-sm">Discusión, teorías, nuevos lanzamientos, offtopic, etc.</p>
                    </div>
                    <Link 
                        href="/hilos/create" 
                        className="bg-yellow-100 border-4 border-black px-8 py-3 font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                    >
                        Nuevo hilo
                    </Link>
                </div>

                <div className="grid gap-6">
                    {hilos.length > 0 ? hilos.map((hilo) => (
                        <div key={hilo.id} className="relative group">
                            <Link 
                                href={`/hilos/${hilo.id}`}
                                className="flex items-center gap-4 bg-white border-4 border-black p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-100 transition-colors block"
                            >
                                <img 
                                    src={getAvatar(hilo.user)} 
                                    className="w-14 h-14 rounded-full border-2 border-black object-cover bg-white" 
                                    alt={hilo.user.name}
                                />
                                <div className="flex-1">
                                    <h2 className="text-2xl font-black uppercase leading-tight">{hilo.titulo}</h2>
                                    <p className="text-xs font-bold text-gray-500 uppercase">
                                        Por <span className="text-black">{hilo.user.name}</span> • {fechaLarga(hilo.created_at)}
                                    </p>
                                </div>
                                <div className="text-3xl font-black opacity-20 group-hover:opacity-100 transition-opacity">➜</div>
                            </Link>


                            {(auth.user.id === hilo.user.id || auth.user.rol_id === 1) && (
                                <button 
                                    onClick={(e) => borrarHilo(e, hilo.id)}
                                    className="absolute -top-3 -right-3 bg-red-500 text-white border-2 border-black px-2 py-1 text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                                >
                                    Eliminar
                                </button>
                            )}
                        </div>
                    )) : (
                        <div className="bg-gray-100 border-4 border-black p-10 text-center font-bold uppercase text-gray-400">
                            No hay hilos todavía. ¡Sé el primero!
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}