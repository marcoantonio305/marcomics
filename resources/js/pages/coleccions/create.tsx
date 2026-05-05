import { useForm } from '@inertiajs/react';
import React from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';

interface FormData {
    nombre: string;
    imagen: File | null;
}

interface Coleccion {
    id: number,
    nombre: string,
    imagen: string | null,
}

interface Props {
    coleccion?: Coleccion
}

export default function Create({coleccion}:Props) {
    const { data, setData, post, errors, processing } = useForm<FormData>({
        nombre: '',
        imagen: null,
    });
    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/coleccions')
    }
    return (
        <AppLayout>
        <div className="p-8 max-w-xl">
            <h1 className="text-2xl font-bold mb-4">Añadir el nombre de la colección</h1>
            <form onSubmit={submit} className='space-y-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='nombre' className='text-sm font-medium'>Título</label>
                    <input id="nombre" type="text" className='rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700'
                        value={data.nombre} onChange={e => setData('nombre', e.target.value)}></input>
                        <InputError message={errors.nombre} className="text-xl text-red-600" />
                        <div>
                            <label htmlFor='imagen' className='text-sm font-medium'>Imagen de la colección</label>
                            <input type="file" id="imagen" onChange={e => setData('imagen', e.target.files ? e.target.files[0] : null)} className='mt-2' />
                            <InputError message={errors.imagen} className="text-xl text-red-600" />
                        </div>
                </div>
                <div className="md:col-span-2 mt-4">
                    <button type='submit' className='w-full md:w-auto rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600'>
                        {processing ? 'Guardando...' : 'Añadir colección'}
                    </button>
                </div>
            </form>
        </div>
        </AppLayout>
    )
}