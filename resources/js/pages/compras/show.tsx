import { BotonBase } from "@/components/ui/Cuerpo/BotonBase";
import AppLayout from "@/layouts/app-layout";
import { Link, router } from "@inertiajs/react";

interface HistorialCompra {
    id: number;
    user_id: number;
    compra_id: number;
    created_at: string;
    user?: User;
    compra?: Compra;
}

interface Compra {
    id: number;
    total: number;
    created_at: string;
    deleted_at: string | null;
}

interface User {
    id: number;
    name: string;
    foto_perfil: string | null;
}

interface Comic {
    id: number;
    titulo: string;
    precio: number;
    imagen: string;
    pivot: {
        cantidad: number;
        precio_unitario: number;
    };
}

interface Props {
    historialCompras: HistorialCompra[];
    user: User;
    compra: Compra;
    comics: Comic[];
}

export default function Show({ compra, user, comics }: { compra: Compra; user: User; comics: Comic[] }) {
    return (
        <AppLayout>
            <div className="div-8">
                <h1 className="text-4xl font-bold mb-6 text-pink-700 mt-6 ml-6">Detalles de la compra</h1>
                <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="card-body">
                        {user && user.foto_perfil && (
    <img 
        src={`/storage/${user.foto_perfil}`} 
        alt="Foto de perfil" 
        className="w-55 h-55 rounded-full object-cover border border-gray-200" 
    />
)}
                        <h2 className="text-blue-700 text-2xl"><strong>ID Compra:</strong> {compra.id}</h2>
                        <p className="text-xl"><strong>Usuario:</strong> {user ? user.name : 'N/A'}</p>
                        <div>
                            <table key={compra.id} className="border border-collapse rounded w-full mb-4 border-black">
                                    <thead className="bg-purple-200 text-xl font-bold">
                                        <tr>
                                        <th>Título</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        </tr>
                                    </thead>
                                    
                            {comics.map((comic) => (
                                <tbody>
                                        <tr className="border border-black text-xl text-center">
                                            <td className="font-bold text-blue-700">{comic.titulo}</td>
                                            <td>{Number(comic.pivot.precio_unitario).toFixed(2)}</td>
                                            <td>{comic.pivot.cantidad}</td>
                                        </tr>
                                        
                                    </tbody>
                                    ))}
                                    <tfoot className="bg-pink-100 w-full">
                                        <tr>
                                        <td className="text-left text-xl font-bold p-1">
                                            Total: 
                                        </td>
                                        <td> </td>
                                        <td className="font-bold text-center">${Number(compra.total).toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                                
                        </div>
                        
                        <p className="text-xl"><strong>Total:</strong> {Number(compra.total).toFixed(2)}</p>
                        <p className="text-xl"><strong>Fecha de compra:</strong> {new Date(compra.created_at).toLocaleDateString()}</p>
                        <p className="text-xl"><strong>Fecha de eliminación:</strong> {compra.deleted_at ? new Date(compra.deleted_at).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div className="flex items-center gap-7 mb-6 ml-6 flex-wrap"> 
                        <a 
                            href={`/compras/${compra.id}/pdf`} 
                            className="font-bold rounded transition-all duration-200 transform hover:scale-110 border-3 flex items-center justify-center w-55 h-11 text-sm bg-red-700 text-white hover:bg-white hover:text-red-700 border-red-800 shadow-sm"
                        >
                            <div className="flex items-center justify-center gap-2 w-full h-full">
                                <span>Descargar PDF de la compra</span>
                            </div>
                        </a>
                        <BotonBase
                                                                onClick={() => router.visit(`/compras`)}
                                                                texto="Regresar al historial de compras"
                                                                colorFondo="bg-pink-700" 
                                                                hoverFondo="hover:bg-white"
                                                                colorTexto="text-white"
                                                                hoverTexto="hover:text-pink-700"
                                                                borderClass="border-3 border-pink-800"
                                                                tamano="sm"
                                                                className="!w-auto px-6 whitespace-nowrap" 
                                                            />
                        <BotonBase
                                                                onClick={() => router.visit(`/dashboard`)}
                                                                texto="Volver al dashboard"
                                                                colorFondo="bg-zinc-800" 
                                                                hoverFondo="hover:bg-white"
                                                                colorTexto="text-white"
                                                                hoverTexto="hover:text-zinc-800"
                                                                borderClass="border-3 border-zinc-900"
                                                                tamano="sm"
                                                                className="gap-2"
                                                            />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}