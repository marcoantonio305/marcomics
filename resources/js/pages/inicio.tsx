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
}

export default function Inicio({ categorias = [], comics = [], chat, postChats }: Props) {
    const categoriaSuperheroes = categorias.find(categoria => categoria.nombre.toLocaleLowerCase() === 'superhéroes');
    const categoriaManga = categorias.find(categoria => categoria.nombre.toLocaleLowerCase() === 'manga');

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
            <div className="flex flex-row p-4 gap-6 items-start">
                <div className="flex-1 flex flex-col gap-8">
                    <div className="flex flex-col">
                        <Novedades nombre={categoriaSuperheroes?.nombre || ""} href={`/categorias/${categoriaSuperheroes?.id}`}></Novedades>
                        <div className="flex flex-row gap-4">
                            {comic0 && <ComicIndividual comic={comic0} />}
                            {comic1 && <ComicIndividual comic={comic1} />}
                            {comic2 && <ComicIndividual comic={comic2} />}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Novedades nombre={categoriaManga?.nombre || ""} href={`/categorias/${categoriaManga?.id}`}></Novedades>
                        <div className="flex flex-row gap-4">
                            {comic3 && <ComicIndividual comic={comic3} />}
                            {comic4 && <ComicIndividual comic={comic4} />}
                        </div>
                    </div>
                </div>
                <aside className="sticky top-4 w-80">
                    <ColumnaDestacados coleccion1={coleccion1} coleccion2={coleccion2} coleccion3={coleccion3}></ColumnaDestacados>
                    <div className="h-[500px] mt-6 flex flex-col">
                        <Chat chat={chat} postChats={postChats} />
                    </div>
                </aside>
            </div>
        </AppLayout>
    )
}