import AppLayout from "@/layouts/app-layout";
import { usePage, router, Link, App} from "@inertiajs/react";
import { Trash, Plus, Minus, Hourglass, Loader, Loader2, RefreshCw } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

//API clave pública
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface Comic {
    id: number;
    titulo: string;
    precio: number;
    imagen: string;
}

interface Props {
    comics: Comic[];
}

export default function PaginaCarrito({comics = []}: Props) {
    const { carrito = {}, carritoTotal = 0, flash = {} } = usePage().props as any;

    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                icon: 'success',
                title: '¡Pago realizado con éxito!',
                text: flash.success,
            }).then((result) => {
            if (result.isConfirmed) {
                // Esto es lo que te lleva a inicio manualmente
                router.visit('/inicio');
            }
            });
        } else if (flash.error) {
            Swal.fire({
                icon: 'error',
                title: 'Error en el pago',
                text: flash.error,
            });
        }
    }, [flash]);

    const items = Object.values(carrito) as any[];

const [cargando, setCargando] = useState(false);

    const actualizarCantidad = (comicId: number, accion: 'anadir' | 'disminuir') => {
        const url = accion === 'anadir' ? '/carrito/anadir' : '/carrito/disminuir';
        router.post(url, {
            comic_id: comicId
        }, {
            preserveScroll: true,
            only: ['carrito', 'carritoTotal', 'flash'],
        });
        
    }
    
    

    

const manejarPago = async () => {
    setCargando(true);
    
    // Coge el token de la tarjeta
    router.post('/compras/procesar-pago', {
        stripeToken: 'tok_visa',
        total_carrito: carritoTotal
    }, {
        onStart: () => setCargando(true),
        onFinish: () => setCargando(false),
        onSuccess: () => {
        },
        onError: (errors) => {
            alert("Hubo un problema con el pago.");
            console.error(errors);
        }
    });
}



    return (
        <AppLayout>
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">Carrito de compras</h1>

            {items.length === 0 ? (
                <div>
                <p className="text-center text-gray-500">Tu carrito está vacío.</p>
                <Link href="/" className="btn bg-blue-500 text-white hover:underline mt-4">Volver al inicio</Link>
                </div>
            ) : (
                <div className="flex flex-col gap-10">
                    {items.map((item) => {
                        const idEnSesion = item.id || item.comic_id;

    const comic = comics.find((c) => Number(c.id) === Number(idEnSesion));

                        if (!comic) {
                            return <div key={idEnSesion} className="p-4 border">Cargando datos del cómic #{idEnSesion}...</div>;
                        }

                        return (
                            <div key={comic.id} className="flex flex-row">
                                <img src={`/storage/${comic.imagen}`} alt={comic.titulo} className="w-32 h-48 object-cover" />
                                <div className="flex flex-col ml-4">
                                    <h2 className="card-title">{comic.titulo}</h2>
                                    <p>Precio: ${comic.precio}</p>
                                    <p>Cantidad: {item.cantidad}</p>
                                    <div className="card-actions">
                                        <button onClick={() => actualizarCantidad(comic.id, 'anadir')} className="btn btn-sm bg-green-500 text-white hover:bg-green-600">
                                            <Plus size={16} />
                                        </button>
                                        <button onClick={() => actualizarCantidad(comic.id, 'disminuir')} className="btn btn-sm bg-yellow-500 text-white hover:bg-yellow-600">
                                            <Minus size={16} />
                                        </button>
                                        <button onClick={() => router.delete('/carrito/eliminar', {
                                            data: { comic_id: comic.id },
                                            preserveScroll: true,
                                            only: ['carrito', 'carritoTotal', 'flash'],
                                        })} className="btn btn-sm bg-red-500 text-white hover:bg-red-600">
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {items.length > 0 && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Total: ${carritoTotal}</h2>
                    <button onClick={manejarPago} disabled={cargando} className={`btn bg-green-500 text-white hover:bg-green-600" ${
                cargando 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-green-200'
            }`}>
                        {cargando ? (
                <span className="flex items-center justify-center gap-2">
                    <Loader className="animate-spin"></Loader> Procesando...
                </span>
            ) : (
                "Confirmar y Pagar ahora"
            )}
        </button>
                </div>
            )}
        </div>
        </AppLayout>
    );
}
