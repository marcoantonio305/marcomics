import { usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { BotonBase } from "./BotonBase"; // Asegúrate de poner la ruta correcta
import { ShoppingCart } from "lucide-react";

interface Props {
    comicId: number;
    texto?: string;
    esPrecompra?: boolean;
}

export function BotonAnadirCarro({ comicId, texto, esPrecompra }: Props) {
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: "success",
                title: "¡Hecho!",
                text: flash.success,
            });
        }
    }, [flash]);

    const anadir = () => {
        router.post("/carrito/anadir", { comic_id: comicId }, {
            preserveScroll: true,
            only: ["carrito", "carritoTotal", "flash"],
        });
    };

    return (
        <BotonBase
            texto={texto || "Añadir al carrito"}
            tamano="sm"
            className="mt-7 mb-5"
            onClick={anadir}
            colorFondo={esPrecompra ? "bg-blue-500" : "bg-green-600"}
            hoverFondo="hover:bg-[#FDF5E6]"
            hoverTexto={esPrecompra ? "hover:text-blue-600" : "hover:text-green-600"}
            borderClass={esPrecompra ? "border-blue-800" : "border-green-800"}
            icono={<ShoppingCart size={20} />}
        />
    );
}
