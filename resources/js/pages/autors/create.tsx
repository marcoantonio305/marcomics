import { useForm } from '@inertiajs/react';
import React from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { BotonBase } from '@/components/ui/Cuerpo/BotonBase';

interface Autor {
    id: number,
    nombre: string,
}

interface Props {
    autor: Autor
}

export default function Create({autor}:Props) {
    const { data, setData, post, errors } = useForm({
        nombre: '',
    });
    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/autors')
    }
    return (
        <AppLayout>
        <div className="p-8 max-w-xl">
            <h1 className="text-2xl font-bold mb-4">Añadir el nombre del autor</h1>
            <form onSubmit={submit} className='space-y-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='nombre' className='text-sm font-medium'>Título</label>
                    <input id="nombre" type="text" className='rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700'
                        value={data.nombre} onChange={e => setData('nombre', e.target.value)}></input>
                        <InputError message={errors.nombre} className="text-xl text-red-600" />
                </div>
                <div className="md:col-span-2 mt-4">
                    <BotonBase
                                                                texto="Añadir Categoría"
                                                                colorFondo="bg-blue-600"
                                                                hoverFondo="hover:bg-white"
                                                                hoverTexto='hover:text-blue-600'
                                                                colorTexto="text-white"
                                                                borderClass="border-blue-700"
                                                                tamano="sm"
                                                                className="gap-2"
                                                                onClick={submit}
                                                            />
                </div>
            </form>
        </div>
        </AppLayout>
    )
}