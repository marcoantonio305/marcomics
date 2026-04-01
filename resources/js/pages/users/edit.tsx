import AppLayout from '@/layouts/app-layout';
import appLayout from '@/layouts/app-layout';
import {useForm}from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    biografia: string | null;
    foto_perfil: string | null;
}

export default function Edit({user}: {user: User}) {
    const {data, setData, post, errors, processing} = useForm({
        name: user.name,
        biografia: user.biografia || "",
        foto_perfil: null as File | null,
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
                        <label className="block text-sm font-medium text-gray-700">Biografía</label>
                        <textarea
                            value={data.biografia}
                            onChange={(e) => setData('biografia', e.target.value)}
                            className="w-full border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Foto de Perfil</label>
                        <input 
        type="file" 
        id="foto_perfil"
        className="border p-2"
        onChange={e => setData('foto_perfil', e.target.files ? e.target.files[0] : null)} 
    />
    {errors.foto_perfil && <div className="text-red-500">{errors.foto_perfil}</div>}
                    </div>
                    <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
