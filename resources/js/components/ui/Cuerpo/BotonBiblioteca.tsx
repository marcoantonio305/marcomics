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
        }});
    }
    
    return (
        <button className="btn bg-orange-500 text-white hover:bg-orange-600" onClick={anadir} disabled={processing}>{processing ? 'Cargando...' : 'Añadir a favoritos'}</button>
    )
}