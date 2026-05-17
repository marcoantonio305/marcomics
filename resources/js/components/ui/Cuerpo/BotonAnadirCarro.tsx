import { usePage } from "@inertiajs/react";
import {router} from "@inertiajs/react";
import Swal from "sweetalert2";
import { useEffect } from "react";

interface Props {
    comicId: number;
    texto?: string;
    esPrecompra?: boolean;
}

export function BotonAnadirCarro({comicId, texto, esPrecompra}: Props) {
    const { carritoTotal } = usePage().props as any;;
    const { flash } = usePage().props as any;

    useEffect(() => {
    if (flash?.success) {
        Swal.fire({
            icon: 'success',
            title: '¡Hecho!',
            text: flash.success,
        });
    }
}, [flash]); 

    const anadir = () => {
        router.post('/carrito/anadir', {
            comic_id: comicId
        }, {
            preserveScroll: true,
            only: ['carrito', 'carritoTotal', 'flash'],
        });
    };

    return (
        <button onClick={anadir}
        className={`btn mt-7 mb-5 font-bold text-2xl rounded transition-colors border-2 border-black w-65 h-20 hover:scale-110 hover:text-3xl transition-all duration-200 transform ${
            esPrecompra 
            ? "bg-blue-500 hover:bg-[#FDF5E6] hover:text-blue-600 text-white" 
            : "bg-green-600 hover:bg-[#FDF5E6] hover:text-green-600 text-white"
        }`}>
            {texto || "Añadir al carrito"}
        </button>
    );
}