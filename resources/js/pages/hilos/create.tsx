import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Create() {
    const { auth }: any = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        titulo: '',
        contenido: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/hilos');
    };

    return (
        <AppLayout>
            <div className="p-8 max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-black uppercase">Nuevo Hilo</h1>
                </div>
                
                <form onSubmit={submit} className="bg-white border-4 border-black p-8 flex flex-col gap-6">
                    <div>
                        <label className="block font-black uppercase text-sm mb-2">Título del tema</label>
                        <input 
                            type="text" 
                            placeholder="Ej. Top 10 cómics"
                            className="w-full border-4 border-black p-4 text-xl font-bold focus:bg-violet-50 outline-none transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            value={data.titulo}
                            onChange={e => setData('titulo', e.target.value)}
                            required
                        />
                        {errors.titulo && <div className="text-red-600 font-black mt-2 uppercase text-xs italic">{errors.titulo}</div>}
                    </div>

                    <div>
                        <label className="block font-black uppercase text-sm mb-2">Primer hilo</label>
                        <textarea 
                            rows={8}
                            placeholder="Escribe aquí los detalles de tu publicación..."
                            className="w-full border-4 border-black p-4 text-lg focus:bg-violet-50 outline-none transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            value={data.contenido}
                            onChange={e => setData('contenido', e.target.value)}
                            required
                        />
                        {errors.contenido && <div className="text-red-600 font-black mt-2 uppercase text-xs italic">{errors.contenido}</div>}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <Link href="/foro" className="mr-7 bg-red-500 text-white border-4 border-black px-12 py-4 font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all disabled:opacity-50">
                            Cancelar
                        </Link>
                        <button 
                            disabled={processing}
                            className="bg-green-400 border-4 border-black px-12 py-4 font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all disabled:opacity-50"
                        >
                            {processing ? 'Publicando...' : 'Crear hilo'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}