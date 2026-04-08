import { ShoppingCart } from "lucide-react"
import { usePage } from "@inertiajs/react";

export function BotonCarrito() {
    const { carritoTotal } = usePage().props as any;;


    return (
        <button className="relative bg-red-500">
            <ShoppingCart size={24} />
            {parseFloat(carritoTotal) > 0 && (
                <span className="font-bold">
                    {carritoTotal}€
                </span>
            )}
        </button>
    );
}