import { Cabecera } from "@/components/cabecera";
import ContenedorComics from "@/components/ui/Cuerpo/contenedorComics";
import { Novedades } from "@/components/ui/Cuerpo/novedades";
import AppLayout from "@/layouts/app-layout";

interface Categoria {
    id: number;
    nombre: string;
}

interface Autor {
    id: number;
    nombre: string;
}

interface Comic {
    id: number;
    titulo: string;
    precio: number;
    lanzamiento: string;
    descripcion: string;
    autors: Autor[];
    categorias: Categoria[];
    imagen: string
}




interface Props {
    categorias: Categoria[];
    comics: Comic[]
}
export default function Inicio({categorias = [], comics = []}:Props) {
    const categoriaSuperheroes = categorias.find(categoria => categoria.nombre.toLocaleLowerCase() === 'superhéroes');
    const comicsSuperheroes = comics.filter(comic => categoriaSuperheroes && comic.categorias.some(categoria => categoria.nombre.toLocaleLowerCase() === 'superhéroes'));

    const categoriaManga = categorias.find(categoria => categoria.nombre.toLocaleLowerCase() === 'manga');
    const comicsManga = comics.filter(comic => categoriaManga && comic.categorias.some(categoria => categoria.nombre.toLocaleLowerCase() === 'manga'));
    
    return (
        <AppLayout>
            {/* Se añade condicionales porque el TypeScript es muy desconfiado */}
            {categoriaSuperheroes && (
                <div className="flex flex-col">
                    <Novedades nombre={categoriaSuperheroes?.nombre || ""} href={`/categorias/${categoriaSuperheroes?.id}`}></Novedades>
            <ContenedorComics categoria={{...categoriaSuperheroes, comics: comicsSuperheroes}}></ContenedorComics>
            </div>
            )}
            {categoriaManga && (
                <div className="flex flex-col">
            <Novedades nombre={categoriaManga?.nombre || ""} href={`/categorias/${categoriaManga?.id}`}></Novedades>
            <ContenedorComics categoria={{...categoriaManga, comics: comicsManga}}></ContenedorComics>
            </div>
            )}
        </AppLayout>
    )
}