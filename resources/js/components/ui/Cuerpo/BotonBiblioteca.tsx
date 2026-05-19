import { useForm } from "@inertiajs/react";
import { BotonBase } from "./BotonBase";

export default function BotonBiblioteca({ comic_id }: { comic_id: number }) {
    const { post, processing } = useForm({
        comic_id: comic_id,
    });

    const anadir = () => {
        post(`/comics/${comic_id}/biblioteca`, {
            preserveScroll: true,
            onSuccess: () => {
                alert("Comic añadido a tu favoritos");
            },
        });
    };

    return (
        <BotonBase
            texto="Añadir a favoritos"
            tamano="sm"
            className="ml-15" 
            onClick={anadir}
            processing={processing}
            colorFondo="bg-yellow-600"
            colorTexto="text-white"
            hoverFondo="hover:bg-yellow-100"
            hoverTexto="hover:text-purple-700"
            borderClass="border-yellow-800"
        />
    );
}
