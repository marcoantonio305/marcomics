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
    const { carrito = {}, carritoTotal = 0, flash = {}, auth } = usePage().props as any;
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
            only: ['carrito', 'carritoTotal'],
        });
        
    }
    
    

    

const manejarPago = async () => {
    if (cargando) return;
    setCargando(true);

    // Si el usuario tiene pm_id, se avisa al backend, sino, se le redirige a añadir una o usar el flujo de la nueva tarjeta
    const datosPago = auth.user.pm_id 
        ? { usar_guardada: true } 
        : { stripeToken: 'tok_visa', usar_guardada: false }; // 'tok_visa' sirve para realizar pruebas rápidas
    
    // Coge el token de la tarjeta
    router.post('/compras/procesar-pago', datosPago, {
        onStart: () => setCargando(true),
        onFinish: () => setCargando(false),
        onError: (errors) => {
            Swal.fire('Error', "Hubo un problema con el pago.", 'error');
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
                                    <p>Precio: {comic.precio}€</p>
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
                                            only: ['carrito', 'carritoTotal'],
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
    <div className="mt-6 p-6 bg-gray-100 rounded-lg border border-gray-200 ">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 ">
            
            <div className="space-y-1">
                <p className="text-sm text-gray-600">
                    Base Imponible: <span className="font-medium">{(carritoTotal / 1.21).toFixed(2)}€</span>
                </p>
                <p className="text-sm text-gray-600">
                    IVA (21%): <span className="font-medium">{(carritoTotal - (carritoTotal / 1.21)).toFixed(2)}€</span>
                </p>
                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                    Total: <span className="text-3xl font-bold">{carritoTotal}€</span>
                </h2>
                {/* <p className="text-[10px] text-gray-400 italic mt-1">
                    * El total incluye IVA del 21%
                </p>*/}
            </div>

            <div className="w-full md:w-auto">
                <div className="mb-6 p-4 bg-blue-200 text-blue-700 rounded-lg border border-blue-800 shadow-sm">
    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        Metodo de Pago
    </h3>
    
    {auth.user.tarjeta_4_ultimos ? (
        <div className="flex items-start gap-3">
        <div className="bg-blue-100 p-2 rounded">
            <RefreshCw className="text-blue-600" size={20} />
        </div>
        
        <div className="flex flex-col"> 
            <p className="font-medium text-gray-800">
                Visa terminada en **** {auth.user.tarjeta_4_ultimos}
            </p>
            <p className="text-xs text-gray-500">
                Tarjeta guardada en tu cuenta
            </p>
            
            <Link 
                href={`/metodo-pago`} 
                className="w-fit block text-xs bg-blue-600 text-white hover:bg-blue-700 font-medium mt-2 px-3 py-1.5 rounded-lg border-2 border-blue-700 transition-colors"
            >
                Cambiar tarjeta
            </Link>
        </div>
    </div>
    ) : (
        <div className="flex flex-col items-center py-2">
            <p className="text-sm mb-3 text-center">
                No tienes ningún método de pago guardado para realizar la compra.
            </p>
            <Link 
                href={`/metodo-pago`} 
                className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 px-6"
            >
                Añadir Tarjeta
            </Link>
        </div>
    )}
</div>
                <button 
    onClick={manejarPago} 
    disabled={cargando || !auth.user.pm_id} 
    className={`btn w-full md:w-64 py-3 px-6 rounded-md font-bold text-white transition-all duration-200 ${
        (cargando || !auth.user.pm_id) 
        ? 'bg-gray-400 cursor-not-allowed' 
        : 'bg-green-500 hover:bg-green-600 shadow-md hover:shadow-green-200 active:scale-95'
    }`}
>
    {cargando ? (
        <span className="flex items-center justify-center gap-2">
            <Loader className="animate-spin" size={20} /> Procesando...
        </span>
    ) : (
        "Confirmar y Pagar ahora"
    )}
</button>
            </div>
            
        </div>
    </div>
)}
        </div>
        </AppLayout>
    );
}