import { Link, useForm, usePage, router } from "@inertiajs/react";
import React, { useEffect, useRef } from "react";
import { useEcho } from '@laravel/echo-react'; //Para conectarnos al reverb de app.tsx

interface Chat {
    id: number;
    nombre_clave: string;
}

interface PostChat {
    id: number;
    user_id: number;
    chat_id: number;
    mensaje: string;
    mencionado_id: number | null;
    user: {
        id: number;
        name: string;
        foto_perfil?: string
    };
}

interface Props {
    chat: Chat;
    postChats: PostChat[];
}

export default function Chat({ chat, postChats }: Props) {
    //Para extraer auth de la propiedades globales de Inertia aka coger el id del usuario que está escribiendo
    const { auth } = usePage().props as any;

    //scroll automático
    const scrollRef = useRef<HTMLDivElement>(null);

    
useEcho(
    `chat.${chat?.id}`,            // El nombre del canal
    '.mensaje.enviado',            // El nombre del evento
    (e: any) => {                  // Lo que hace cuando recibe el mensaje
        console.log("¡Evento recibido!", e);
        router.reload({ only: ['postChats'] });
    },
    [chat?.id]                     // Se actualiza si cambia el chat
);

    const { data, setData, post, processing, reset } = useForm({
        mensaje: "",
        chat_id: chat?.id,
        user_id: auth?.user?.id,
        mencionado_id: null,
    });

    // Escuchar el canal de WebSocket, para así poder recibir mensajes en tiempo real
    useEffect(() => {
    if (chat?.id && (window as any).Echo) {
        // Escuchamos el "apodo" que pusimos en el backend con un punto delante
        (window as any).Echo.private(`chat.${chat.id}`)
            .listen('.mensaje.enviado', (e: any) => {
                console.log("¡Evento recibido!", e);
                router.reload({ only: ['postChats'] });
            });

        return () => {
            (window as any).Echo.leave(`chat.${chat.id}`);
        };
    }
}, [chat?.id]);

    //baja el scroll cuando hay mensajes nuevos
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [postChats]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.mensaje.trim()) return; //para no enviar mensaje vacíos
        post("/postChats/create", {
            preserveScroll: true, // Para evitar que la página se desplace tras enviar el mensaje
            onSuccess: () => reset(), // Elimina el input solo si el mensaje se envio correctamente
        });
    };

    if (!chat) return <div className="p-4 text-gray-500">Cargando chat...</div>;

    return (
        /* Cambiado: Borde 4 y sombra de cómic en el contenedor principal */
        <div className="flex flex-col h-full border-4 border-black bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex-1 overflow-y-auto p-4" ref={scrollRef}>
                <h2 className="text-2xl font-mono font-black uppercase mb-4">
                    {chat.id === 1 ? "Chat General" : "Chat de Colección"}
                </h2>
                
                <div className="flex flex-col gap-4">
                    {postChats && postChats.length > 0 ? (
                        postChats.map((postChat) => (
                            <div key={postChat.id} className="flex gap-3 bg-white p-3 rounded shadow-sm border border-gray-100">
                                <div className="flex-shrink-0">
                                    <Link href={`/users/${postChat.user?.id}`}>
                                        <img 
                                            src={postChat.user?.foto_perfil 
                                                ? `/storage/${postChat.user.foto_perfil}` 
                                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(postChat.user?.name || 'U')}&background=random`
                                            } 
                                            alt={postChat.user?.name} 
                                            className="w-10 h-10 rounded-full object-cover border border-gray-200 hover:opacity-80 transition-opacity"
                                        />
                                    </Link>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Link 
                                            href={`/users/${postChat.user?.id}`}
                                            className="font-bold text-sm text-blue-600 hover:underline hover:text-blue-800"
                                        >
                                            {postChat.user?.name || "Usuario"}
                                        </Link>
                                    </div>
                                    <p className="text-gray-800 text-sm leading-relaxed">
                                        {postChat.mensaje}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 text-sm italic">No hay mensajes aún...</p>
                    )}
                </div>
            </div>

            {auth?.user ? (
                /* Cambiado: Borde superior 4 */
                <form onSubmit={handleSubmit} className="p-4 bg-gray-100 border-t-4 border-black mt-auto">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={data.mensaje}
                            onChange={(e) => setData("mensaje", e.target.value)}
                            placeholder="Escribe un mensaje..."
                            className="w-full p-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            disabled={processing}
                            /* Cambiado: Borde 4, sombra de cómic y efecto hover en el botón */
                            className="px-4 py-2 bg-blue-500 text-white border-4 border-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50"
                        >
                            {processing ? "..." : "Enviar"}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="p-4 bg-gray-50 border-t-4 border-black text-center text-sm text-gray-500">
                    Inicia sesión para participar en el chat.
                </div>
            )}
        </div>
    );
}