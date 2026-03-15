import {Link} from '@inertiajs/react'

interface Categoria {
    id: number;
    nombre: string
}

interface Props {
    nombre: string;
    href: string;
}

export function Novedades({ nombre, href}: Props) {
    return (
        <Link 
            href={href} 
            className="py-2 px-4 
            bg-black
                text-white text-xl font-black uppercase tracking-tighter
                border-2 border-black 
                py-1
                px-8
                transition-all duration-200 transform
                hover:underline
                flex items-center justify-center"
        >
            Novedades {nombre}
        </Link>
    );
}