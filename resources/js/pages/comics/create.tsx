import { useForm } from '@inertiajs/react';
import React from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import AppLayout from '@/layouts/app-layout';

interface Autor {
    id: number;
    nombre: string;
}

interface Categoria {
    id: number;
    nombre: string;
}

interface Editora {
    id: number;
    nombre: string;
}

// representa lo que viene del servidor
interface Comic {
    id: number,
    titulo: string,
    precio: number,
    lanzamiento: string,
    descripcion: string,
    autors: Autor[];
    categorias: Categoria[];
    editora_id: number,
    imagen: string | null
}

//representa lo que el formulario va a manejar
interface FormDataType {
    _method: string,
    titulo: string,
    precio: string | number,
    lanzamiento: string,
    descripcion: string,
    autors_ids: number[];
    categorias_ids: number[];
    editora_id: string | number,
    imagen: File | null,
    preview1: File | null,
    preview2: File | null
}

interface Props {
    comic?: Comic;
    todos_los_autores: Autor[];
    todas_las_categorias: Categoria[];
    todas_las_editoras: Editora[];
}

export default function Create({todos_los_autores, todas_las_categorias, todas_las_editoras}:Props) {
    const { data, setData, post, errors } = useForm<FormDataType>({
        _method: 'post',
        titulo: '',
        precio: '',
        lanzamiento: '',
        descripcion: '',
        autors_ids: [] as number[],
        categorias_ids: [] as number[],
        editora_id: '',
        imagen: null,
        preview1: null,
    preview2: null  
    });
    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/comics')
    }
    return (
        <AppLayout>
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
                <div className='form-control w-full'>
                        <label className='label font-bold text-sm'>Autores</label>
                        <select className='select select-bordered w-full' value=""
                            onChange={e => {
                                const id = parseInt(e.target.value);
                                if (!data.autors_ids.includes(id)) {
                                    setData('autors_ids', [...data.autors_ids, id]);
                                }
                            }}>
                            <option value="" disabled>Selecciona autor...</option>
                            {todos_los_autores.map(autor => (
                                <option key={autor.id} value={autor.id}>{autor.nombre}</option>
                            ))}
                        </select>
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {data.autors_ids.map(id => (
                                <div key={id} className='badge badge-primary p-3 gap-2'>
                                    {todos_los_autores.find(a => a.id === id)?.nombre}
                                    <button type="button" onClick={() => setData('autors_ids', data.autors_ids.filter(i => i !== id))}>✕</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    
                    <div className='form-control w-full'>
                        <label className='label font-bold text-sm'>Categorías</label>
                        <select className='select select-bordered w-full' value=""
                            onChange={e => {
                                const id = parseInt(e.target.value);
                                if (!data.categorias_ids.includes(id)) {
                                    setData('categorias_ids', [...data.categorias_ids, id]);
                                }
                            }}>
                            <option value="" disabled>Selecciona categoría...</option>
                            {todas_las_categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                            ))}
                        </select>
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {data.categorias_ids.map(id => (
                                <div key={id} className='badge badge-secondary p-3 gap-2'>
                                    {todas_las_categorias.find(c => c.id === id)?.nombre}
                                    <button type="button" onClick={() => setData('categorias_ids', data.categorias_ids.filter(i => i !== id))}>✕</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='form-control w-full'>
                        <label className='label font-bold text-sm'>Editora</label>
                        <select className='select select-bordered w-full' value={data.editora_id}
                            onChange={e => {
                                    setData('editora_id', e.target.value);
                            }}>
                            <option value="" disabled>Selecciona la editora...</option>
                            {todas_las_editoras.map(edit => (
                                <option key={edit.id} value={edit.id}>{edit.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
    <label htmlFor="imagen" className="font-bold text-sm">Portada del Cómic</label>
    <input 
        type="file" 
        id="imagen"
        className="file-input file-input-sm file-input-bordered w-full"
        // Así se captura el archivo en Inertia
        onChange={e => setData('imagen', e.target.files ? e.target.files[0] : null)} 
    />
    {errors.imagen && <div className="text-red-500">{errors.imagen}</div>}
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex flex-col gap-2">
        <label htmlFor="preview1" className="font-bold text-sm">Preview 1</label>
        <input 
            type="file" 
            id="preview1"
            className="file-input file-input-bordered w-full"
            onChange={e => setData('preview1', e.target.files ? e.target.files[0] : null)} 
        />
        {errors.preview1 && <div className="text-red-500 text-xs">{errors.preview1}</div>}
    </div>

    <div className="flex flex-col gap-2">
        <label htmlFor="preview2" className="font-bold text-sm">Preview 2</label>
        <input 
            type="file" 
            id="preview2"
            className="file-input file-input-bordered w-full"
            onChange={e => setData('preview2', e.target.files ? e.target.files[0] : null)} 
        />
        {errors.preview2 && <div className="text-red-500 text-xs">{errors.preview2}</div>}
    </div>
</div>

                <div className="md:col-span-2 mt-4">
                    <button type='submit' className='w-full md:w-auto rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600'>
                        Añadir cómic
                    </button>
                </div>
            </form>
        </div>
        </AppLayout>
    )
}