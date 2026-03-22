import { Link } from "@inertiajs/react";
export function Icono() {
    return (
        <div className="flex justify-start">
            <Link href={'/inicio'} className="flex items-end">
        <img className="h-22 w-auto object-contain" src="/images/logo.png"/>
        <div className="text-3xl text-white font-black text-white decoration-4 tracking-tighter self-end pb-2">Marcómics</div>
        </Link>
        </div>
    );
}