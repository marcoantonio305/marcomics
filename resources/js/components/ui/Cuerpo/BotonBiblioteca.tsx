import { useForm } from "@inertiajs/react";
import { Button } from "../button";

export default function BotonBiblioteca({ comic_id }: { comic_id: number }) {
    const { post, processing } = useForm({
        comic_id: comic_id
    });

    const anadir = () => {
        //se pone una ruta absoluta (poner la barra / al principio de la ruta) para evitar problemas. Sin ruta relativa, se haría la petición /comics/{comic_id}/comics/{comic_id}/biblioteca
        post(`/comics/${comic_id}/biblioteca`, {
            preserveScroll: true,
            onSuccess: () => {
                alert('Comic añadido a tu favoritos');
            }
        });
    }
    
    return (
        <button className="border-2 border-black rounded-lg w-55 h-10 ml-15 bg-yellow-600 text-white hover:text-purple-600 hover:bg-yellow-100 hover:scale-110 hover:text-xl transition-all duration-200 transform " onClick={anadir} disabled={processing}>{processing ? 'Cargando...' : 'Añadir a favoritos'}</button>
    )
}