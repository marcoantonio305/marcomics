import { Cabecera } from "@/components/cabecera";
import ContenedorComics from "@/components/ui/Cuerpo/contenedorComics";
import ComicIndividual from "@/components/ui/Cuerpo/ComicIndividual";
import { Novedades } from "@/components/ui/Cuerpo/novedades";
import AppLayout from "@/layouts/app-layout";
import ColumnaDestacados from "@/components/ui/Cuerpo/columnaDestacados";

interface Categoria {
    id: number;
    nombre: string;
    imagen: string;
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
    const categoriaManga = categorias.find(categoria => categoria.nombre.toLocaleLowerCase() === 'manga');
    //const comicsSuperheroes = comics.filter(comic => categoriaSuperheroes && comic.categorias.some(categoria => categoria.nombre.toLocaleLowerCase() === 'superhéroes'));

    const coleccion1 = categorias.find(categoria => categoria.nombre === 'Aventuras');
    const coleccion2 = categorias.find(categoria => categoria.nombre === 'Acción');
    const coleccion3 = categorias.find(categoria => categoria.nombre === 'Image Comics');

    const comic0 = comics.find(comic => comic.id === 13);
    const comic1 = comics.find(comic => comic.id === 14);
    const comic2 = comics.find(comic => comic.id === 15);
    const comic3 = comics.find(comic => comic.id === 16);
    const comic4 = comics.find(comic => comic.id === 17);
    
    return (
        <AppLayout>
                <div className="flex flex-col">
                    <Novedades nombre={categoriaSuperheroes?.nombre || ""} href={`/categorias/${categoriaSuperheroes?.id}`}></Novedades>
                    <div className="flex flex-row">
            {comic0 && <ComicIndividual comic={comic0} />}
            {comic1 && <ComicIndividual comic={comic1} />}
            {comic2 && <ComicIndividual comic={comic2} />}
            
            </div>
            </div>
                <div className="flex flex-col">
            <Novedades nombre={categoriaManga?.nombre || ""} href={`/categorias/${categoriaManga?.id}`}></Novedades>
            <div className="flex flex-row">
            {comic3 && <ComicIndividual comic={comic3} />}
            {comic4 && <ComicIndividual comic={comic4} />}
            </div>
            <ColumnaDestacados coleccion1={coleccion1} coleccion2={coleccion2} coleccion3={coleccion3}></ColumnaDestacados>
            </div>
        </AppLayout>
    )
}