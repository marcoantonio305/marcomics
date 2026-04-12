import { usePage } from "@inertiajs/react";
import {router} from "@inertiajs/react";

interface Props {
    comicId: number;
}

export function BotonAnadirCarro({comicId}: Props) {
    const { carritoTotal } = usePage().props as any;;

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
        className="btn ml-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Añadir al carrito
        </button>
    );
}