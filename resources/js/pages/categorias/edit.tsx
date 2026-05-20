import { useForm } from '@inertiajs/react';
import React from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import AppLayout from '@/layouts/app-layout';
import { BotonBase } from '@/components/ui/Cuerpo/BotonBase';

interface Categoria {
    id: number,
    nombre: string,
    imagen?: string
}

interface FormDataType {
    _method: string,
    nombre: string,
    imagen: File | null
}

interface Props {
    categoria: Categoria
}

export default function Create({categoria}:Props) {
    const { data, setData, post, errors } = useForm<FormDataType>({
        _method: 'put',
        nombre: categoria.nombre || '',
        imagen: null
    });
    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post(`/categorias/${categoria.id}`)
    }
    return (
        <AppLayout>
        <div className="p-8 max-w-xl">
            <h1 className="text-2xl font-bold mb-4">Editar la categoría</h1>
            <form onSubmit={submit} className='space-y-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='nombre' className='text-sm font-medium'>Nombre de la categoría</label>
                    <input id="nombre" type="text" className='rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700'
                        value={data.nombre} onChange={e => setData('nombre', e.target.value)}></input>
                </div>
                <div className="flex flex-col gap-2">
    <label htmlFor="imagen" className="font-bold">Imagen conjunta</label>
    <input 
        type="file" 
        id="imagen"
        className="border p-2"
        // 3. Así se captura el archivo en Inertia
        onChange={e => setData('imagen', e.target.files ? e.target.files[0] : null)} 
    />
    {errors.imagen && <div className="text-red-500">{errors.imagen}</div>}
</div>

                <div className="md:col-span-2 mt-4">
                    <BotonBase
                        texto="Editar Categoría"
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