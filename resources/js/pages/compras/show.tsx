import AppLayout from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";

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
                    <div className="flex">
                        <a 
    href={`/compras/${compra.id}/pdf`} 
    className="btn bg-red-500 hover:bg-red-600 text-white ml-4 mb-4 w-55 h-10 p-2 flex items-center justify-center"
>
    Descargar PDF de la compra
</a>
                        <Link href="/compras" className="btn btn-primary ml-4 mb-4 w-55 h-10">
                            Volver a la lista de compras
                        </Link>
                        <Link href="/dashboard" className="btn btn-secondary ml-4 mb-4 w-55 h-10">
                            Volver al dashboard
                    </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}