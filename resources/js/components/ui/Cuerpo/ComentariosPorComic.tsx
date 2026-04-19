import { Link, router, usePage } from "@inertiajs/react";

interface Comentario {
    id: number;
    contenido: string;
    user: {
        id: number;
        name: string;
        foto_perfil?: string;
    },
    created_at: string;
    puntuacion?: number;
}

interface Comic {
    id: number;
    titulo: string;
}

interface Props {
    comentarios: Comentario[];
    comic: Comic;
}

export default function ComentariosPorComic({comentarios, comic}: Props) {
    const { auth } = usePage().props as any; // Se obtiene el usuario logeado
    return (
        <div className="card bg-base-100 border p-4 mb-4 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Comentarios</h2>
            {comentarios.length > 0 ? (
                comentarios.map(comentario => (
                    <div key={comentario.id} className="card bg-base-100 border p-4 mb-4 shadow-sm">
                        <div className="flex items-start gap-3">
                        <div className="avatar w-10 h-10 rounded-full">
                            <img className="w-full h-full object-cover rounded-full" src={comentario.user?.foto_perfil ? `/storage/${comentario.user.foto_perfil}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(comentario.user?.name || 'U')}&background=random`} alt="Foto de perfil" />
                        </div>
                        <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-blue-500 hover:text-blue-700">
                                        <Link href={comentario.user ? `/users/${comentario.user.id}` : '#'}>
                                            {comentario.user ? comentario.user.name : 'Usuario Desconocido'}
                                        </Link>
                                    </span>
                        {comentario.puntuacion !== undefined && (
                                        <span className="text-lg font-bold text-yellow-500">
                                            Puntuación: {comentario.puntuacion}/5
                                        </span>
                                    )}
                        </div>
                        <div className="bg-base-200 p-3 rounded-lg mt-2">{comentario.contenido}</div>
                        <div className="text-sm text-gray-500 mt-2">{new Date(comentario.created_at).toLocaleString()}</div>
                        {auth.user && (auth.user.id === comentario.user?.id || auth.user.rol_id === 1) && (
                        <button 
                                onClick={() => router.delete(`/comentarios/${comentario.id}`, {
                                    preserveScroll: true,
                                    onSuccess: () => alert('Comentario eliminado con éxito')
                                })} 
                                className='btn btn-warning mr-4 w-50' 
                            >
                                Eliminar comentario
                            </button>
                        )}
                        </div>
                    </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No hay comentarios aún.</p>
            )}
        </div>
    );
}
