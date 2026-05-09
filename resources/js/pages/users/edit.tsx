import AppLayout from '@/layouts/app-layout';
import appLayout from '@/layouts/app-layout';
import {useForm}from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    biografia: string | null;
    foto_perfil: string | null;
    nombre: string;
    apellido1: string;
    apellido2: string;
    direccion: string;
}

export default function Edit({user}: {user: User}) {
    const {data, setData, post, errors, processing} = useForm({
        name: user.name,
        biografia: user.biografia || "",
        foto_perfil: null as File | null,
        nombre: user.nombre,
        apellido1: user.apellido1,
        apellido2: user.apellido2,
        direccion: user.direccion,
        _method: 'PATCH', //Solo se envia el dato a cambiar
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/users/${user.id}`);
    };

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Editar mi Perfil</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="text-blue-500 font-medium">Nombre de Usuario</label>
                        <input 
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full border border-black mb-5" />
                            <label className="text-blue-500 font-medium">Nombre</label>
                        <input 
                            type="text"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            className="w-full border border-black mb-5" />
                            <label className="text-blue-500 font-medium">Primer Apellido</label>
                        <input 
                            type="text"
                            value={data.apellido1}
                            onChange={(e) => setData('apellido1', e.target.value)}
                            className="w-full border border-black mb-5" />
                            <label className="text-blue-500 font-medium">Segundo Apellido</label>
                        <input 
                            type="text"
                            value={data.apellido2}
                            onChange={(e) => setData('apellido2', e.target.value)}
                            className="w-full border border-black mb-5" />
                        <label className="text-blue-500 font-medium">Dirección</label>
                        <input 
                            type="text"
                            value={data.direccion}
                            onChange={(e) => setData('direccion', e.target.value)}
                            className="w-full border border-black mb-5" />
                            <label className="block font-medium text-blue-500">Biografía</label>
                        <textarea
                            value={data.biografia}
                            onChange={(e) => setData('biografia', e.target.value)}
                            className="w-full border-black border rounded-lg mb-5" />
                        <label className="block text-sm font-medium text-blue-500">Foto de Perfil</label>
                        <input 
        type="file" 
        id="foto_perfil"
        className="border p-2"
        onChange={e => setData('foto_perfil', e.target.files ? e.target.files[0] : null)} 
    />
    {errors.foto_perfil && <div className="text-red-500">{errors.foto_perfil}</div>}
                    </div>
                    <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-500 mt-3 text-white rounded">
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
