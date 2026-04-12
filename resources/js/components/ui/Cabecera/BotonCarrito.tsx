import { ShoppingCart } from "lucide-react"
import { Link, usePage } from "@inertiajs/react";

export function BotonCarrito() {
    const { carritoTotal } = usePage().props as any;;


    return (
        <Link href="/carrito" className="relative bg-red">
            <ShoppingCart size={40} />
            {parseFloat(carritoTotal) > 0 && (
                <span className="font-bold">
                    {carritoTotal}€
                </span>
            )}
        </Link>
    );
}