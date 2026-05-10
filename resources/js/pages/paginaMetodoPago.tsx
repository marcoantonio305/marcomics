import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from "@/layouts/app-layout";
import Swal from "sweetalert2";

// cargar stripe fuera del componente
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


function FormularioTarjeta() {
    const stripe = useStripe();
    const elements = useElements();
    const { auth } = usePage().props as any;

    const [procesando, setProcesando] = useState(false);
    const [nombreTitular, setNombreTitular] = useState(
    `${auth.user.nombre} ${auth.user.apellido1 || ''} ${auth.user.apellido2 || ''}`.trim()
);
const [emailFacturacion, setEmailFacturacion] = useState(auth.user.email || ''); 
const [telefono, setTelefono] = useState('');
const [direccion, setDireccion] = useState(auth.user.direccion || '');
const [ciudad, setCiudad] = useState('');
const [cp, setCp] = useState('');

    const guardarTarjeta = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setProcesando(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement!,
            billing_details: {
                name: nombreTitular,
                email: emailFacturacion, 
                phone: telefono,
                address: {
                    line1: direccion,
                    city: ciudad,
                    postal_code: cp,
                },
            },
        });

        if (error) {
            Swal.fire('Error', error.message, 'error');
            setProcesando(false);
        } else {
            router.post('/usuario/guardar-tarjeta', {
    payment_method_id: paymentMethod.id,
    last4: paymentMethod.card?.last4
}, {
    onSuccess: () => {
        Swal.fire('¡Éxito!', 'Tarjeta guardada correctamente', 'success');
    },
    onFinish: () => setProcesando(false)
});
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-10 p-8 bg-white shadow-xl rounded-xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Método de Pago</h2>
            <p className="text-gray-500 mb-6 text-sm">Introduce los datos de facturación del titular de la tarjeta.</p>
            
            <form onSubmit={guardarTarjeta} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Nombre completo del Titular</label>
                    <input type="text" required className="w-full mt-1 p-2 border rounded-md" 
                           placeholder="Paco Sánchez Rivera"
                           value={nombreTitular} onChange={e => setNombreTitular(e.target.value)} />
                </div>

                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Email de Facturación</label>
                    <input type="email" required className="w-full mt-1 p-2 border rounded-md" 
                           placeholder="ejemplo@email.com"
                           value={emailFacturacion} onChange={e => setEmailFacturacion(e.target.value)} />
                </div>

                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Teléfono de contacto</label>
                    <input type="text" placeholder='123 456 789' required className="w-full mt-1 p-2 border rounded-md" 
                           value={telefono} onChange={e => setTelefono(e.target.value)} />
                </div>

                <div className="md:col-span-2 mt-2">
                    <label className="block text-sm font-medium text-gray-700">Dirección de la Tarjeta</label>
                    <input type="text" required className="w-full mt-1 p-2 border rounded-md" 
                           placeholder="Calle patata S/N"
                           value={direccion} onChange={e => setDireccion(e.target.value)} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                    <input type="text" placeholder='Sanlúcar de Barrameda' required className="w-full mt-1 p-2 border rounded-md" 
                           value={ciudad} onChange={e => setCiudad(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Código Postal</label>
                    <input type="text" placeholder='12345' required className="w-full mt-1 p-2 border rounded-md" 
                           value={cp} onChange={e => setCp(e.target.value)} />
                </div>

                <div className="md:col-span-2 mt-6 p-5 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Datos de seguridad de la tarjeta</label>
                    <div className="p-3 bg-white border border-gray-300 rounded-md shadow-sm">
                        <CardElement options={{ 
                            style: { 
                                base: { 
                                    fontSize: '16px',
                                    color: '#32325d',
                                    '::placeholder': { color: '#aab7c4' }
                                } 
                            } 
                        }} />
                    </div>
                </div>

                <button 
                    disabled={procesando}
                    className={`md:col-span-2 mt-6 w-full py-4 rounded-lg font-bold text-white shadow-md transition-all ${
                        procesando ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {procesando ? 'Verificando...' : 'Guardar los datos de la tarjeta'}
                </button>
            </form>
        </div>
    );
}

export default function PaginaMetodoPago() {
    return (
        <AppLayout>
            <Elements stripe={stripePromise}>
                <FormularioTarjeta />
            </Elements>
        </AppLayout>
    );
}