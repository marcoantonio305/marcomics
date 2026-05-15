import { useForm } from '@inertiajs/react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import React from 'react';
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
    imagen: string | null,
    preview1: File | null,
    preview2: File | null
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
    comic: Comic;
    todos_los_autores: Autor[];
    todas_las_categorias: Categoria[];
    todas_las_editoras: Editora[]
}

//Sincronización de contratos para que TypeScript no se queje: separación de modelos (lectura y escritura), method spoofing (enviar petición como post pero se le añade un campo oculto llamado _method:post) y sincronización de los campos multi-select (antes el servidor recibía objetos, pero solo necesitaba numbers/id en el formulario, por lo que se ha modificado los nombre en la interfaza autors_ids y categorias_ids)
export default function Edit({ comic, todos_los_autores, todas_las_categorias, todas_las_editoras }: Props) {
    
    const { data, setData, put, errors, post } = useForm<FormDataType>({
        _method: 'put',
        titulo: comic.titulo || '',
        precio: comic.precio || '',
        lanzamiento: comic.lanzamiento || '',
        descripcion: comic.descripcion || '',
        // Cargamos los IDs actuales para que no salgan vacíos al entrar
        autors_ids: comic.autors ? comic.autors.map(a => a.id) : [],
        categorias_ids: comic.categorias ? comic.categorias.map(c => c.id) : [],
        editora_id: comic.editora_id || '',
        imagen: null,
        preview1: null,
    preview2: null
    });

    //Se pone post porque el protocolo HTTP estándar no soporta el envío de archivos mediante el método PUT
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/comics/${comic.id}`);
    };

    return (
        <AppLayout>
            <div className="p-8 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-primary">Editar: {comic.titulo}</h1>
                
                <form onSubmit={submit} className='space-y-4 bg-base-100 p-6 rounded-xl shadow-md border border-base-300'>
                    
                
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold'>Título</label>
                        <input type="text" className='input input-bordered w-full'
                            value={data.titulo} onChange={e => setData('titulo', e.target.value)} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-semibold'>Precio (€)</label>
                            <input type="number" step="0.01" className='input input-bordered w-full'
                                value={data.precio} onChange={e => setData('precio', e.target.value)} />
                        </div>

                        
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-semibold'>Lanzamiento</label>
                            <input type="date" className='input input-bordered w-full'
                                value={data.lanzamiento} onChange={e => setData('lanzamiento', e.target.value)} />
                        </div>
                    </div>

                    
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold'>Descripción</label>
                        <textarea className='textarea textarea-bordered h-24'
                            value={data.descripcion} onChange={e => setData('descripcion', e.target.value)} />
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
    <label htmlFor="imagen" className="text-sm font-semibold">Portada del Cómic</label>
    <input 
        type="file" 
        id="imagen"
        className="file-input file-input-sm file-input-bordered w-full"
        // 3. Así se captura el archivo en Inertia
        onChange={e => setData('imagen', e.target.files ? e.target.files[0] : null)} 
    />
    {errors.imagen && <div className="text-red-500">{errors.imagen}</div>}
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-base-300 pt-4 mt-2">
    <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Preview 1</label>
        <input 
            type="file" 
            className="file-input file-input-sm file-input-bordered w-full"
            onChange={e => setData('preview1', e.target.files ? e.target.files[0] : null)} 
        />
    </div>

    <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Preview 2</label>
        <input 
            type="file" 
            className="file-input file-input-sm file-input-bordered w-full"
            onChange={e => setData('preview2', e.target.files ? e.target.files[0] : null)} 
        />
    </div>
</div>

                    <button type='submit' className='btn btn-primary w-full mt-4'>Actualizar Cómic</button>
                </form>
            </div>
        </AppLayout>
    );
}