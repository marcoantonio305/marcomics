import { Cabecera } from "@/components/cabecera";
import ContenedorComics from "@/components/ui/Cuerpo/contenedorComics";
import ComicIndividual from "@/components/ui/Cuerpo/ComicIndividual";
import { Novedades } from "@/components/ui/Cuerpo/novedades";
import AppLayout from "@/layouts/app-layout";
import ColumnaDestacados from "@/components/ui/Cuerpo/columnaDestacados";
import Chat from "@/components/ui/Cuerpo/Chat";

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

interface Coleccion {
    id: number;
    nombre: string;
    mostrar_inicio: boolean;
    orden: number;
    comics: Comic[];
}

interface ChatData {
    id: number;
    nombre_clave: string;
}

interface PostChat {
    id: number;
    user_id: number;
    chat_id: number;
    mensaje: string;
    mencionado_id: number | null;
    user: {
        id: number;
        name: string;
    };
}

interface Props {
    categorias: Categoria[];
    comics: Comic[]
    chat: ChatData;
    postChats: PostChat[];
    coleccionesInicio: Coleccion[];
}

export default function Inicio({ categorias = [], comics = [], chat, postChats = [], coleccionesInicio = [] }: Props) {
    //const categoriaSuperheroes = categorias.find(categoria => categoria.nombre.toLocaleLowerCase() === 'superhéroes');
    //const categoriaManga = categorias.find(categoria => categoria.nombre.toLocaleLowerCase() === 'manga');

    const coleccion1 = categorias.find(categoria => categoria.nombre === 'Aventuras');
    const coleccion2 = categorias.find(categoria => categoria.nombre === 'Acción');
    const coleccion3 = categorias.find(categoria => categoria.nombre === 'Image Comics');

    //const comic0 = comics.find(comic => comic.id === 13);
    //const comic1 = comics.find(comic => comic.id === 14);
    //const comic2 = comics.find(comic => comic.id === 15);
    //const comic3 = comics.find(comic => comic.id === 16);
    //const comic4 = comics.find(comic => comic.id === 17);
    //const comic5 = comics.find(comic => comic.id === 18);
    //const comic6 = comics.find(comic => comic.id === 19);
    //const comic7 = comics.find(comic => comic.id === 20);
    //const comic8 = comics.find(comic => comic.id === 21);

    return (
        <AppLayout>
            <div className="flex flex-row p-4 gap-6 items-start">
                <div className="flex-1 flex flex-col gap-8">
                        {/*
                        <Novedades nombre={categoriaSuperheroes?.nombre || ""} href={`/categorias/${categoriaSuperheroes?.id}`}></Novedades>
                        <div className="flex flex-row gap-4">
                            {comic0 && <ComicIndividual comic={comic0} />}
                            {comic1 && <ComicIndividual comic={comic1} />}
                            {comic2 && <ComicIndividual comic={comic2} />}
                            {comic7 && <ComicIndividual comic={comic7} />}
                            {comic8 && <ComicIndividual comic={comic8} />}
                        </div>*/}
                        {coleccionesInicio.map(coleccion => (
                            <div key={coleccion.id}>
                                <Novedades nombre={coleccion.nombre} id={coleccion.id} tipo="coleccion"></Novedades>
                                <div className="flex flex-row gap-4">
                                    {coleccion.comics.map(comic => (
                                        <ComicIndividual key={comic.id} comic={comic} />
                                    ))}
                                </div>
                            </div>
                        ))}
                        {/*
                        <Novedades nombre={categoriaManga?.nombre || ""} href={`/categorias/${categoriaManga?.id}`}></Novedades>
                        <div className="flex flex-row gap-4">
                            {comic3 && <ComicIndividual comic={comic3} />}
                            {comic4 && <ComicIndividual comic={comic4} />}
                            {comic5 && <ComicIndividual comic={comic5} />}
                            {comic6 && <ComicIndividual comic={comic6} />}
                        </div>
                        */}
                </div>
                <aside className="sticky top-4 w-80">
                    <ColumnaDestacados coleccion1={coleccion1} coleccion2={coleccion2} coleccion3={coleccion3}></ColumnaDestacados>
                    <div className="h-[500px] mt-6 flex flex-col">
                        {chat && <Chat chat={chat} postChats={postChats} />}
                    </div>
                </aside>
            </div>
        </AppLayout>
    )
}