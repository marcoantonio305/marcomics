import React from 'react';
import { useForm, usePage, Link, router } from '@inertiajs/react'; // Añadimos router
import AppLayout from '@/layouts/app-layout';
import { fechaLarga } from '@/lib/utils';

interface User {
    id: number;
    name: string;
    foto_perfil: string | null;
    rol_id: number;
    biografia?: string;
}

interface HiloPost {
    id: number;
    mensaje: string;
    created_at: string;
    user: User; 
}

interface Hilo {
    id: number;
    titulo: string;
    contenido: string;
    created_at: string;
    user: User; 
    posts: HiloPost[];
}

export default function Show({ hilo }: { hilo: Hilo }) {
    const { auth }: any = usePage().props;
    
    const { data, setData, post, processing, reset } = useForm({
        mensaje: '',
        hilo_id: hilo.id
    });

    const enviarRespuesta = (e: React.FormEvent) => {
        e.preventDefault();
        post('/hiloPosts', {
            onSuccess: () => reset('mensaje'),
            preserveScroll: true
        });
    };


    const borrarPost = (id: number) => {
        if (confirm('¿Seguro que quieres borrar este mensaje?')) {
            router.delete(`/hiloPosts/${id}`, {
                preserveScroll: true
            });
        }
    };

    const getAvatar = (user: User) => {
        // Añadimos comprobación por si user viene vacío en algún momento
        if (user?.foto_perfil) {
            return `/storage/${user.foto_perfil}`;
        }
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Admin')}&background=random&color=fff`;
    };

    return (
        <AppLayout>
            <div className="p-8 max-w-5xl mx-auto">
                
                <div className="flex gap-4 mb-10">
                    <div className="flex flex-col items-center gap-2">
                        <img 
                            src={getAvatar(hilo.user)} 
                            className="w-16 h-16 rounded-full border-2 border-black object-cover"
                            alt={hilo.user.name}
                        />
                        <p className="text-sm font-black text-red-600 mb-1">{hilo.user.name}</p>
                        <span className="text-xs font-black uppercase bg-black text-white px-2 py-0.5">Autor</span>
                        
                    </div>
                    
                    <div className="flex-1 bg-yellow-200 border-3 border-black p-6">
                        
                        <h1 className="text-3xl font-black uppercase mb-2 leading-none">{hilo.titulo}</h1>
                        <p className="text-xs font-bold mb-4 opacity-70 italic">Publicación: {fechaLarga(hilo.created_at)}</p>
                        <p className="text-lg">{hilo.contenido}</p>
                    </div>
                </div>

                <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                    <span className="text-blue-600 border-2 rounded-lg border-blue-400 px-3 py-1">Respuestas ({hilo.posts.length})</span>
                </h3>


                <div className="space-y-6 mb-12">
                    {hilo.posts.map((respuesta) => (
                        <div key={respuesta.id} className="flex gap-4 ml-6 lg:ml-12">
                            <img 
                                src={getAvatar(respuesta.user)} 
                                className="w-12 h-12 rounded-full border-2 border-black object-cover"
                                alt={respuesta.user.name}
                            />
                            <div className="flex-1 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative group">
                                <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-1">
                                    <span className="font-black text-sm text-blue-600">{respuesta.user.name}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase">{fechaLarga(respuesta.created_at)}</span>
                                    </div>
                                </div>
                                <p className="text-gray-800">{respuesta.mensaje}</p>
                                <div className='flex justify-end'>{(auth.user.id === respuesta.user.id || auth.user.rol_id === 1) && (
                                            <button 
                                                onClick={() => borrarPost(respuesta.id)}
                                                className="btn bg-red-500 hover:text-red-600 text-white font-bold text-xs"
                                            >
                                                Eliminar
                                            </button>
                                        )}</div>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="mt-10 border-t-4 border-black pt-8">
                    <form onSubmit={enviarRespuesta} className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 mb-2">
                            <img src={getAvatar(auth.user)} className="w-8 h-8 rounded-full border-2 border-black object-cover" />
                            <span className="font-bold uppercase text-sm">Responde como {auth.user.name}:</span>
                        </div>
                        <textarea 
                            className="w-full border-4 border-black p-4 text-lg outline-none focus:bg-violet-50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            value={data.mensaje}
                            onChange={e => setData('mensaje', e.target.value)}
                            placeholder="Escribe tu respuesta..."
                            rows={4}
                            required
                        />
                        <div className='flex flex-rows gap-7'>
                        <Link href={`/hilos`} className='className="self-end bg-blue-500 text-white border-4 border-black px-10 py-3 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50"'>Volver al índice del foro</Link>
                        <button 
                            disabled={processing}
                            className="self-end bg-green-500 text-white border-4 border-black px-10 py-3 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50"
                        >
                            {processing ? 'Enviando...' : 'Enviar post'}
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}