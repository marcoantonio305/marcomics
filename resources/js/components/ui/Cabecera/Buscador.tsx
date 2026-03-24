import React, {useState, useEffect} from "react";
import { router, Link } from "@inertiajs/react";
import axios from "axios";  //Librería de JS para hacer peticiones HTTP

interface Comic {
    id: number;
    titulo: string;
    imagen: string;
}

interface Categoria {
    id: number;
    nombre: string;
    imagen: string;
}

interface SearchResults {
    comics: Comic[];
    categorias: Categoria[];
}


export default function Buscador() {
    const [term, setTerm] = useState("");
    const [results, setResults] = useState<SearchResults>({ comics: [], categorias: [] });
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (term.length >= 2) {
            axios.get(`/api/buscador?term=${term}`)
                .then(response => {
                    setResults( response.data );
                    setShowDropdown(true);
                })
                .catch(error => {
                    console.error("Error al limpiar resultados:", error);
                });
        } else {
            setShowDropdown(false);
        }
    }, [term]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setShowDropdown(false);
        router.get("/comics", { search: term });
    };

    return (
        <div className="relative flex-1 h-full flex items-center"> 
        <form onSubmit={handleSearch} className="w-full px-2">
            <input
                type="text"
                placeholder="Buscar..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                    className="w-full h-8 bg-white text-black px-4 border-2 border-black focus:outline-none"
                />
            </form>
        {showDropdown && (results.comics.length > 0 || results.categorias.length > 0) && (
            <div className="absolute left-2 right-2 bg-white border-2 border-black shadow-2xl overflow-y-auto"
                style={{ 
                    top: '100%', 
                    zIndex: 9999, 
                    minHeight: '50px',
                    maxHeight: '400px' 
                }}
            >
                {results.comics.map((comic) => (
                    <Link
                        key={comic.id}
                        href={`/comics/${comic.id}`}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100"
                    >
                        <img src={`/storage/${comic.imagen}`} 
        alt={comic.titulo} 
        className="w-10 h-14 object-cover border border-black shadow-sm" />
                        <span>{comic.titulo}</span>
                    </Link>
                    ))}
                    {results.categorias.map((cat) => (
                    <Link
                        key={cat.id}
                        href={`/categorias/${cat.id}`}
                        className="block p-2 text-xs font-bold text-blue-700 hover:bg-blue-50 border-t-2 border-black italic"
                        onClick={() => setShowDropdown(false)}
                    >
                                                <img src={`/storage/${cat.imagen}`} 
        alt={cat.nombre} 
        className="w-10 h-14 object-cover border border-black shadow-sm" />
                                                <span>Categoria {cat.nombre}</span>
                    </Link>
                    ))}
                </div>
            )}
            </div>

    )
}