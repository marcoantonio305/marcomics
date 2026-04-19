import { useForm } from '@inertiajs/react';
import React from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import AppLayout from '@/layouts/app-layout';

interface Coleccion {
    id: number,
    nombre: string,
    imagen?: string
}

interface Props {
    coleccions: Coleccion
}

export default function Create({coleccions}:Props) {
    const { data, setData, post, errors } = useForm({
        _method: 'put',
        nombre: coleccions.nombre || '',
    });
    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post(`/coleccions/${coleccions.id}`)
    }
    return (
        <AppLayout>
        <div className="p-8 max-w-xl">
            <h1 className="text-2xl font-bold mb-4">Editar la categoría</h1>
            <form onSubmit={submit} className='space-y-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='nombre' className='text-sm font-medium'>Nombre de la categoría</label>
                    <input id="nombre" type="text" className='rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700'
                        value={data.nombre} onChange={e => setData('nombre', e.target.value)}></input>
                </div>

                <div className="md:col-span-2 mt-4">
                    <button type='submit' className='w-full md:w-auto rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600'>
                        Editar categoría
                    </button>
                </div>
            </form>
        </div>
        </AppLayout>
    )
}