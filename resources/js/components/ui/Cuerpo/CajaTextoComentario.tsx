import { useForm } from "@inertiajs/react";

export default function CajaTextoComentario({comicId}: {comicId: number}) {
    const { data, setData, post, processing, reset, errors } = useForm({
        contenido: '',
        puntuacion: 5,
        comic_id: comicId
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/comentarios/${comicId}`, {
            preserveScroll: true,
            onSuccess: () => {
                reset('contenido');
                alert('Comentario publicado con éxito');
            }
        });
    }

    return (
        <div className="card bg-base-100 border border-black border-2 p-4 mb-4 shadow-sm">
            <h3 className="text-lg font-bold mb-2">Escribe un comentario</h3>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <div className="font-semibold flex flex-row">
                        <span className="text-yellow-600 mt-2">Puntuación:</span>
                    <select
                        className="select select-bordered w-full max-w-xs"
                        value={data.puntuacion}
                        onChange={(e) => setData('puntuacion', parseInt(e.target.value))}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    </div>
                <textarea
                    className="textarea w-160 h-25"
                    placeholder="Mi opinión sobre este comic es que..."
                    value={data.contenido}
                    onChange={(e) => setData('contenido', e.target.value)}
                ></textarea>
                <button type="submit"
                    disabled={processing}
                    className="btn bg-red-500 hover:bg-red-600 text-white mt-2 w-50">{processing ? 'Enviando...' : 'Publicar Comentario'}</button>
                    </div>
            </form>
        </div>
    );
}
