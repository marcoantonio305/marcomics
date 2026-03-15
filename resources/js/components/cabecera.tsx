import { Icono } from "./ui/Cabecera/icono"
import { BotonCategoriaCabecera } from "./ui/Cabecera/botonCategoriaCabecera"

interface Categoria {
    id: number;
    nombre: string;
}

interface Props {
    categorias: Categoria[]
}

export function Cabecera({categorias = []}:Props) {
    const marvel = categorias.find(cat => cat.nombre.toLocaleLowerCase() === 'marvel');
    const dc = categorias.find(cat => cat.nombre.toLocaleLowerCase() === 'dc');
    const manga = categorias.find(cat => cat.nombre.toLocaleLowerCase() === 'manga');
    const indie = categorias.find(cat => cat.nombre.toLocaleLowerCase() === 'indie');
    const europeo = categorias.find(cat => cat.nombre.toLocaleLowerCase() === 'europeo');
    const infantil = categorias.find(cat => cat.nombre.toLocaleLowerCase() === 'infantil');
    return (
        <header className="bg-[#d00000] border-b-4 flex flex-col">
            <div className="flex w-full border-b-2">
                <div className="flex-[3] flex items-center border-r-2">
                    <Icono></Icono>
                </div>
            </div>
            <div className="flex w-full h-12">
                {marvel && (<BotonCategoriaCabecera nombre={marvel.nombre} href={`/categorias/${marvel.id}`} />)}
                {dc && <BotonCategoriaCabecera nombre={dc.nombre} href={`/categorias/${dc.id}`} />}
    {manga && <BotonCategoriaCabecera nombre={manga.nombre} href={`/categorias/${manga.id}`} />}
    {indie && <BotonCategoriaCabecera nombre={indie.nombre} href={`/categorias/${indie.id}`} />}
    {europeo && <BotonCategoriaCabecera nombre={europeo.nombre} href={`/categorias/${europeo.id}`} />}
    {infantil && <BotonCategoriaCabecera nombre={infantil.nombre} href={`/categorias/${infantil.id}`} />}
            </div>
        </header>
    )
}