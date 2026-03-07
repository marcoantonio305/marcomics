import { useForm } from '@inertiajs/react';
import React from 'react';

export default function Create() {
    const { data, setData, post, errors } = useForm({
        titulo: '',
        precio: '',
        lanzamiento: '',
        descripcion: '',
    });
    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/comics')
    }
    return (
        <div className="p-8 max-w-xl">
            <h1 className="text-2xl font-bold mb-4">Añadir nuevo nómic</h1>
            <form onSubmit={submit} className='space-y-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='titulo' className='text-sm font-medium'>Título</label>
                    <input id="titulo" type="text" className='rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700'
                        value={data.titulo} onChange={e => setData('titulo', e.target.value)}></input>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='precio' className='text-sm font-medium'>Precio</label>
                    <input id="precio" type="number" className='rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700'
                        step={'0.01'} value={data.precio} onChange={e => setData('precio', e.target.value)}></input>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='lanzamiento' className='text-sm font-medium'>Fecha de lanzamiento</label>
                    <input id="lanzamiento" type="date" className='rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700'
                        value={data.lanzamiento} onChange={e => setData('lanzamiento', e.target.value)}></input>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='descripcion' className='text-sm font-medium'>Descripción</label>
                    <textarea id="descripcion" className='rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700'
                        value={data.descripcion} onChange={e => setData('descripcion', e.target.value)}></textarea>
                </div>
                <div className="md:col-span-2 mt-4">
                    <button type='submit' className='w-full md:w-auto rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600'>
                        Añadir cómic
                    </button>
                </div>
            </form>
        </div>
    )
}