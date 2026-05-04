import { ShoppingCart } from "lucide-react"
import { Link, usePage } from "@inertiajs/react";

export function BotonCarrito() {
    const { carritoTotal } = usePage().props as any;;


    return (
        <div className="hover:bg-white hover:text-red-500 border-2 border-black rounded-full w-[75px] h-[75px] flex items-center justify-center hover:scale-110 transition-all duration-200 transform cursor-pointer -mt-2.5">
            <Link href="/carrito" className="flex flex-col items-center justify-center">
                <ShoppingCart size={36} />
                
                {parseFloat(carritoTotal) > 0 && (
    <span className="font-black text-[11px] leading-none mt-1">
        {Number(carritoTotal).toFixed(2)}€
    </span>
)}
            </Link>
        </div>
    );
}