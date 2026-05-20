import { useForm } from '@inertiajs/react';
import React from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { BotonBase } from '@/components/ui/Cuerpo/BotonBase';

interface FormData {
    _method: string;
    nombre: string;
    imagen: File | null;
}

interface Coleccion {
    id: number,
    nombre: string,
    imagen?: string
}

interface Props {
    coleccion: Coleccion
}

export default function Create({coleccion}:Props) {
    const { data, setData, post, errors } = useForm<FormData>({
        _method: 'put',
        nombre: coleccion.nombre || '',
        imagen: null,
    });
    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post(`/coleccions/${coleccion.id}`)
    }
    return (
        <AppLayout>
        <div className="p-8 max-w-xl">
            <h1 className="text-2xl font-bold mb-4 text-pink-700">Editar la colección</h1>
            <form onSubmit={submit} className='space-y-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='nombre' className='text-sm font-medium'>Nombre de la colección</label>
                    <input id="nombre" type="text" className='rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700'
                        value={data.nombre} onChange={e => setData('nombre', e.target.value)}></input>
                        <InputError message={errors.nombre} className="text-xl text-red-600" />
                        <div>
                            <label htmlFor='imagen' className='text-sm font-medium'>Imagen de la colección: </label>
                            <input type="file" id="imagen" onChange={e => setData('imagen', e.target.files ? e.target.files[0] : null)} className='mt-2' />
                            <InputError message={errors.imagen} className="text-xl text-red-600" />
                        </div>
                </div>

                <div className="md:col-span-2 mt-4">
                    <BotonBase
                                            texto="Editar Colección"
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