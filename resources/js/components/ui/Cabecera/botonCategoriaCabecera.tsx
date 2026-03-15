import {Link} from '@inertiajs/react'

interface Categoria {
    id: number;
    nombre: string
}

interface Props {
    nombre: string;
    href: string;
}

export function BotonCategoriaCabecera({ nombre, href}: Props) {
    return (
        <Link 
            href={href} 
            className="py-2 px-4 
                text-white font-black uppercase tracking-tighter
                border-2 border-black 
                transition-all duration-200 transform
                hover:bg-white hover:text-red-600 
                hover:scale-110 hover:text-xl
                flex items-center justify-center
                h-full"
        >
            {nombre}
        </Link>
    );
}