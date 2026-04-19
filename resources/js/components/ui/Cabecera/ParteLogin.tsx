import { User } from "lucide-react"
import { usePage, Link } from "@inertiajs/react"

export default function ParteLogin() {
    const {auth} = usePage().props as any;
    const user = auth?.user;
    if (!user) {
    return (
        <div className="flex bg-[#d00000] items-center gap-3 p-2 hover:bg-white/10 rounded-lg transition-colors group">
            <User size={35} className="text-white mt-4 mr-4 ml-4" />
            <Link href="/login"><h1 className="text-2xl hover:underline text-white font-bold mr-4 mt-4">Iniciar sesión</h1></Link>
        </div>
    )
}
else {
    return (
        <div className="w-full h-16 bg-[#d00000] text-white flex items-center justify-center">
            {(auth.user.foto_perfil) ? (
                <img 
            src={`/storage/${auth.user.foto_perfil}`} 
            alt={`Foto de perfil de ${auth.user.name}`} 
            className="w-full h-full object-cover rounded-full mt-6 mr-4 ml-4" 
        />
    ) : (
                <div className="w-full h-full bg-black/20 flex items-center justify-center">
            <User size={35} className="text-white mt-4 mr-4 ml-4" strokeWidth={1.5} />
        </div>
            )}
            <Link href={`/users/${auth.user.id}`}>
                <h1 className="text-2xl font-bold hover:underline mr-8 ml-4 mt-4">{auth.user.name}</h1>
            </Link>
        </div>
    )
}
}