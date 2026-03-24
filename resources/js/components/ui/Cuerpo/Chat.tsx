import React, { useEffect, useRef } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
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
            preserveScroll: true, // PAra evitar que la página se desplace tras enviar el mensaje
            onSuccess: () => reset(), // BElimina el input solo si el mensaje se envio correctamente
        });
    };

    if (!chat) return <div className="p-4 text-gray-500">Cargando chat...</div>;

    return (
        <div className="flex flex-col h-full border border-black bg-white overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4" ref={scrollRef}>
                {chat.id === 1 ? <h2 className="text-2xl font-bold mb-4">Chat General</h2> : "No se ha encontrado el chat"}
                <div className="flex flex-col gap-4">
                    {postChats && postChats.length > 0 ? (
                        postChats.map((postChat) => (
                            <div key={postChat.id} className="bg-white text-blue p-3 rounded shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-sm text-blue-600">
                                        {postChat.user?.name}
                                    </span>
                                </div>
                                <p className="text-gray-800">{postChat.mensaje}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 text-sm italic">No hay mensajes aún...</p>
                    )}
                </div>
            </div>
            <form onSubmit={handleSubmit} className="p-4 bg-gray-100 border-t mt-auto">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={data.mensaje}
                        onChange={(e) => setData("mensaje", e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 font-bold transition-colors"
                    >
                        {processing ? "..." : "Enviar"}
                    </button>
                </div>
            </form>
        </div>
    );
}