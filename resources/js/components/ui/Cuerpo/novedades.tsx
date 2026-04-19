import {Link} from '@inertiajs/react'

interface Categoria {
    id: number;
    nombre: string
}

interface Coleccion {
    id: number;
    nombre: string;
}

interface Props {
    nombre: string;
    id: number;
    tipo: 'coleccion' | 'categoria';
}

export function Novedades({ nombre, id, tipo }: Props) {
    const href = tipo === 'coleccion' 
        ? `/coleccions/${id}` 
        : `/categorias/${id}`;

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
            {nombre}
        </Link>
    );
}